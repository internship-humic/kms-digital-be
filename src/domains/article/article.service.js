import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";
import NotificationService from "../notification/notification.service.js";
import Roles from "../../common/enums/user-roles.enum.js";

class ArticleService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async notifyParents(payload) {
    const parents = await this.db.parents.findMany({
      select: {
        id: true,
      },
    });

    if (parents.length === 0) {
      return [];
    }

    return await Promise.all(
      parents.map((parent) =>
        NotificationService.createNotification({
          recipient_id: parent.id,
          recipient_role: Roles.Parents,
          title: payload.title,
          message: payload.message,
          category: payload.category,
          reference_id: payload.reference_id,
          reference_type: payload.reference_type,
        }),
      ),
    );
  }

  async getAllArticles(query) {
    const { page, limit, offset } = getPagination(query);

    const filter =
      ORMfilterable(query, [
        "title",
        "writer_name",
        "writer_identity",
        "type",
      ]) || {};

    const q = (query.search || "").trim();

    if (q) {
      filter.OR = [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q,
            mode: "insensitive",
          },
        },
      ];
    }

    const total = await this.db.article.count({
      where: filter,
    });

    const data = await this.db.article.findMany({
      where: filter,
      skip: offset,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const pagination = getMeta(total, page, limit);

    return {
      data,
      pagination,
    };
  }

  async getArticleById(id) {
    const article = await this.db.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw this.error.notFound("Article not found");
    }

    return article;
  }

  async createArticle(info, files) {
    const content =
      typeof info.content === "string"
        ? JSON.parse(info.content)
        : info.content;

    const coverImage = files?.cover_image?.[0]
      ? `/images/${files.cover_image[0].filename}`
      : null;

    const article = await this.db.article.create({
      data: {
        title: info.title,
        description: info.description,
        content,
        writer_name: info.writer_name,
        writer_identity: info.writer_identity,
        type: info.type,
        cover_image: coverImage,
      },
    });

    await this.notifyParents({
      title: "Artikel baru tersedia",
      message: "Ada artikel baru yang bisa Anda baca.",
      category: "ARTICLE",
      reference_id: article.id,
      reference_type: "acticle",
    });

    return article;
  }

  async updateArticle(id, info, files) {
    const existing = await this.db.article.findUnique({
      where: { id },
    });

    if (!existing) {
      throw this.error.notFound("Article not found");
    }

    const content =
      typeof info.content === "string"
        ? JSON.parse(info.content)
        : info.content;

    let coverImage = existing.cover_image;

    if (files?.cover_image?.length) {
      coverImage = `/images/${files.cover_image[0].filename}`;
    }

    const article = await this.db.article.update({
      where: { id },
      data: {
        title: info.title,
        description: info.description,
        content,
        writer_name: info.writer_name,
        writer_identity: info.writer_identity,
        type: info.type,
        cover_image: coverImage,
      },
    });

    return article;
  }

  async deleteArticle(id) {
    const article = await this.db.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw this.error.notFound("Article not found");
    }

    await this.db.article.delete({
      where: { id },
    });

    return true;
  }

  async uploadImage(file) {
    if (!file) {
      throw this.error.badRequest("Image is required");
    }

    return {
      url: `/images/${file.filename}`,
    };
  }
}

export default new ArticleService();
