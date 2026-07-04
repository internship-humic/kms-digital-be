export default {
  "GET /cadre": {
    summary: "Get All Cadres",

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
        description: "Search keyword to filter cadres by name",
        example: "Siti",
      },
      name: {
        type: "string",
        description: "Filter by exact name match (case-insensitive)",
        example: "Siti Aminah",
      },
    },

    response: {
      data: [
        {
          id: "cadre-uuid",
          name: "Siti Aminah",
          email: "siti@mail.com",

          clinic: {
            id: "clinic-uuid",
            name: "Posyandu Melati",
            address: "Jl. Melati",
          },
        },
      ],
    },
  },

  "PATCH /cadre/:id": {
    summary: "Update Cadre",

    params: {
      id: "cadre-uuid",
    },

    request: {
      name: "Siti Nurhaliza",
      email: "siti@mail.com",
      clinic_id: "clinic-uuid",
    },

    response: {
      id: "cadre-uuid",
      name: "Siti Nurhaliza",
      email: "siti@mail.com",

      clinic: {
        id: "clinic-uuid",
        name: "Posyandu Melati",
        address: "Jl. Melati",
      },
    },
  },

  "DELETE /cadre/:id": {
    summary: "Delete Cadre",

    params: {
      id: "cadre-uuid",
    },

    response: true,
  },
};
