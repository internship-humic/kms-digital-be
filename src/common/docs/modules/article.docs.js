export default {
  "GET /article/": {
    summary: "Get All Articles",
    description:
      "Retrieve a paginated list of all published articles. Accessible by all users (public).",

    query: {
      page: {
        type: "integer",
        description: "Page number for pagination",
        example: 1,
      },
      limit: {
        type: "integer",
        description: "Number of items per page",
        example: 10,
      },
      search: {
        type: "string",
        description: "Search keyword to filter articles by title",
        example: "Imunisasi",
      },
      type: {
        type: "string",
        description: "Filter articles by type: ACTIVITY, NUTRITION, or HEALTH",
        example: "HEALTH",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Articles retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
      data: [
        {
          id: "article-uuid",
          title: "Pentingnya Imunisasi Balita",
          description: "Imunisasi melindungi anak dari berbagai penyakit.",
          cover_image: "/images/cover-1.png",
          writer_name: "Dr. Andi",
          writer_identity: "Dokter Anak",
          type: "HEALTH",
          created_at: "2026-07-06T10:00:00.000Z",
          updated_at: "2026-07-06T10:00:00.000Z",
        },
      ],
    },
  },

  "GET /article/:id": {
    summary: "Get Article By Id",
    description: "Retrieve full content of a specific article by its ID. Accessible by all users (public).",

    params: {
      id: "article-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Article retrieved successfully",
      pagination: null,
      data: {
        id: "article-uuid",
        title: "Pentingnya Imunisasi Balita",
        description: "Imunisasi melindungi anak dari berbagai penyakit.",
        cover_image: "/images/cover-1.png",
        writer_name: "Dr. Andi",
        writer_identity: "Dokter Anak",
        type: "HEALTH",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Imunisasi merupakan langkah penting untuk melindungi anak dari berbagai penyakit menular.",
                },
              ],
            },
            {
              type: "image",
              attrs: {
                src: "/images/content-image.png",
              },
            },
          ],
        },
        created_at: "2026-07-06T10:00:00.000Z",
        updated_at: "2026-07-06T10:00:00.000Z",
      },
    },
  },

  "POST /article/": {
    summary: "Create Article",
    description:
      "Create a new article with optional cover image upload. Accepts multipart/form-data. The 'content' field must be a valid JSON string in TipTap format. (Admin only)",

    request: {
      title: "Pentingnya Imunisasi Balita",
      description: "Imunisasi melindungi anak dari berbagai penyakit.",
      content:
        '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Imunisasi adalah proses yang membuat seseorang kebal terhadap penyakit menular."}]}]}',
      writer_name: "Dr. Andi",
      writer_identity: "Dokter Anak",
      type: "HEALTH",
      cover_image: "<binary file>",
    },

    response: {
      success: true,
      status: "CREATED",
      message: "Article created successfully",
      pagination: null,
      data: {
        id: "article-uuid",
        title: "Pentingnya Imunisasi Balita",
        description: "Imunisasi melindungi anak dari berbagai penyakit.",
        cover_image: "/images/cover-1.png",
        writer_name: "Dr. Andi",
        writer_identity: "Dokter Anak",
        type: "HEALTH",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Imunisasi adalah proses yang membuat seseorang kebal terhadap penyakit menular." }],
            },
          ],
        },
        created_at: "2026-07-06T10:00:00.000Z",
        updated_at: "2026-07-06T10:00:00.000Z",
      },
    },
  },

  "PATCH /article/:id": {
    summary: "Update Article",
    description:
      "Update an existing article. All fields are optional — send only the fields you want to change. Accepts multipart/form-data. (Admin only)",

    params: {
      id: "article-uuid",
    },

    request: {
      title: "Pentingnya Imunisasi Balita (Updated)",
      description: "Deskripsi terbaru tentang imunisasi.",
      content:
        '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Isi artikel terbaru"}]}]}',
      writer_name: "Dr. Andi",
      writer_identity: "Dokter Anak",
      type: "HEALTH",
      cover_image: "<binary file>",
    },

    response: {
      success: true,
      status: "OK",
      message: "Article updated successfully",
      pagination: null,
      data: {
        id: "article-uuid",
        title: "Pentingnya Imunisasi Balita (Updated)",
        description: "Deskripsi terbaru tentang imunisasi.",
        cover_image: "/images/cover-1.png",
        writer_name: "Dr. Andi",
        writer_identity: "Dokter Anak",
        type: "HEALTH",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Isi artikel terbaru" }],
            },
          ],
        },
        created_at: "2026-07-06T10:00:00.000Z",
        updated_at: "2026-07-06T12:00:00.000Z",
      },
    },
  },

  "DELETE /article/:id": {
    summary: "Delete Article",
    description: "Permanently delete an article and its associated cover image. (Admin only)",

    params: {
      id: "article-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Article deleted successfully",
      pagination: null,
      data: true,
    },
  },

  "POST /article/upload-image": {
    summary: "Upload Content Image",
    description:
      "Upload a single image to be embedded inside article content. Returns the public URL of the uploaded image. Accepts multipart/form-data with field name 'image'. (Admin only)",

    request: {
      image: "<binary file>",
    },

    response: {
      success: true,
      status: "CREATED",
      message: "Image uploaded successfully",
      pagination: null,
      data: {
        url: "/images/1720678231231-image.png",
      },
    },
  },
};
