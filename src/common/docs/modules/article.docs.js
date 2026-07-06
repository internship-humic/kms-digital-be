export default {
  "GET /article": {
    summary: "Get All Articles",

    response: {
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

    params: {
      id: "article-uuid",
    },

    response: {
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
                text: "Imunisasi merupakan langkah penting...",
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

  "POST /article": {
    summary: "Create Article",

    request: {
      title: "Pentingnya Imunisasi Balita",
      description: "Imunisasi melindungi anak dari berbagai penyakit.",
      content:
        '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Isi artikel"}]}]}',
      writer_name: "Dr. Andi",
      writer_identity: "Dokter Anak",
      type: "HEALTH",

      cover_image: "<binary file>",
      content_images: ["<binary file>", "<binary file>"],
    },

    response: {
      id: "article-uuid",
      title: "Pentingnya Imunisasi Balita",
      description: "Imunisasi melindungi anak dari berbagai penyakit.",
      cover_image: "/images/cover-1.png",
      writer_name: "Dr. Andi",
      writer_identity: "Dokter Anak",
      type: "HEALTH",
      content: {},
      created_at: "2026-07-06T10:00:00.000Z",
      updated_at: "2026-07-06T10:00:00.000Z",
    },
  },

  "PATCH /article/:id": {
    summary: "Update Article",

    params: {
      id: "article-uuid",
    },

    request: {
      title: "Pentingnya Imunisasi Balita (Updated)",
      description: "Deskripsi terbaru.",
      content:
        '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Isi artikel terbaru"}]}]}',
      writer_name: "Dr. Andi",
      writer_identity: "Dokter Anak",
      type: "HEALTH",

      cover_image: "<binary file>",
      content_images: ["<binary file>"],
    },

    response: {
      id: "article-uuid",
      title: "Pentingnya Imunisasi Balita (Updated)",
      description: "Deskripsi terbaru.",
      cover_image: "/images/cover-1.png",
      writer_name: "Dr. Andi",
      writer_identity: "Dokter Anak",
      type: "HEALTH",
      content: {},
      created_at: "2026-07-06T10:00:00.000Z",
      updated_at: "2026-07-06T12:00:00.000Z",
    },
  },

  "DELETE /article/:id": {
    summary: "Delete Article",

    params: {
      id: "article-uuid",
    },

    response: true,
  },

  "POST /article/upload-image": {
    summary: "Upload Content Image",

    request: {},

    response: {
      url: "/images/1720678231231-image.png",
    },
  },
};
