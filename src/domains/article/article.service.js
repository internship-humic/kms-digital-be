import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";

class ArticleService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
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
      where: {
        id,
      },
    });

    if (!article) {
      throw this.error.notFound("Article not found");
    }

    return article;
  }

  async createArticle(info, file) {
    const article = await this.db.article.create({
      data: {
        title: info.title,
        description: info.description,
        content: info.content,
        writer_name: info.writer_name,
        writer_identity: info.writer_identity,
        type: info.type,
        cover_image: file ? `/images/${file.filename}` : null,
      },
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

    let content =
      typeof info.content === "string"
        ? JSON.parse(info.content)
        : info.content;

    let coverImage = existing.cover_image;

    if (files?.cover_image?.length) {
      coverImage = `/images/${files.cover_image[0].filename}`;
    }

    const contentImages =
      files?.content_images?.map((file) => `/images/${file.filename}`) || [];

    if (content && contentImages.length) {
      let imageIndex = 0;

      const replaceImage = (node) => {
        if (!node || typeof node !== "object") return;

        if (
          node.type === "image" &&
          node.attrs &&
          typeof node.attrs.src === "string" &&
          node.attrs.src.startsWith("image-")
        ) {
          node.attrs.src = contentImages[imageIndex++] || node.attrs.src;
        }

        if (Array.isArray(node.content)) {
          node.content.forEach(replaceImage);
        }
      };

      replaceImage(content);
    }

    const article = await this.db.article.update({
      where: {
        id,
      },
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
      where: {
        id,
      },
    });

    if (!article) {
      throw this.error.notFound("Article not found");
    }

    await this.db.article.delete({
      where: {
        id,
      },
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
