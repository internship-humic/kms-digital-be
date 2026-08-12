export default {
  "GET /cadre/": {
    summary: "Get All Cadres",
    description: "Retrieve a paginated list of all cadres registered in the system. (Admin only)",

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
      success: true,
      status: "OK",
      message: "Cadres retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
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
    description: "Update cadre profile details. All fields are optional — send only the fields you want to change. (Admin only)",

    params: {
      id: "cadre-uuid",
    },

    request: {
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@mail.com",
      clinic_id: "clinic-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Cadre updated successfully",
      pagination: null,
      data: {
        id: "cadre-uuid",
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@mail.com",
        clinic: {
          id: "clinic-uuid",
          name: "Posyandu Melati",
          address: "Jl. Melati",
        },
      },
    },
  },

  "DELETE /cadre/:id": {
    summary: "Delete Cadre",
    description: "Permanently delete a cadre account from the system. (Admin only)",

    params: {
      id: "cadre-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Cadre deleted successfully",
      pagination: null,
      data: true,
    },
  },
};
