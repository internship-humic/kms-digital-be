
export default {
  "GET /article": {
    summary: "Get All Article",
    response: {},
  },

  "GET /article/:id": {
    summary: "Get Article By Id",

    params: {
      id: "article-uuid",
    },

    response: {},
  },

  "POST /article": {
    summary: "Create Article",
    request: {},
    response: {},
  },

  "PATCH /article/:id": {
    summary: "Update Article",

    params: {
      id: "article-uuid",
    },

    request: {},
    response: {},
  },

  "DELETE /article/:id": {
    summary: "Delete Article",

    params: {
      id: "article-uuid",
    },

    response: true,
  },
};
