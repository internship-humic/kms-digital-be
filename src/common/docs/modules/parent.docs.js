export default {
  "GET /parent/": {
    summary: "Get All Parents",
    description: "Retrieve a paginated list of all parents registered in the system (Admin only)",
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
