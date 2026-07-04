export default {
  "GET /parent/": {
    summary: "Get All Parents",
    description: "Retrieve a paginated list of all parents registered in the system (Admin only)",

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
        description: "Search keyword to filter parents by name",
        example: "Jane",
      },
      name: {
        type: "string",
        description: "Filter by exact name match (case-insensitive)",
        example: "Jane Doe",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Parents retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
      },
      data: [
        {
          id: "uuid-parent-1",
          name: "Jane Doe",
          email: "jane@example.com",
          address: "Jl. Merdeka No. 10",
          clinic_id: "uuid-clinic-1",
          phone_number: "08123456789",
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
        },
      ],
    },
  },

  "GET /parent/:clinicId": {
    summary: "Get Parents by Clinic ID",
    description: "Retrieve a paginated list of all parents registered under a specific clinic (Admin and Cadre only)",

    params: {
      clinicId: "uuid-clinic-1",
    },

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
        description: "Search keyword to filter parents by name",
        example: "Jane",
      },
      name: {
        type: "string",
        description: "Filter by exact name match (case-insensitive)",
        example: "Jane Doe",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Parents retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
      },
      data: [
        {
          id: "uuid-parent-1",
          name: "Jane Doe",
          email: "jane@example.com",
          address: "Jl. Merdeka No. 10",
          clinic_id: "uuid-clinic-1",
          phone_number: "08123456789",
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
        },
      ],
    },
  },
};
