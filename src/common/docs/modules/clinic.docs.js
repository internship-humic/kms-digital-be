export default {
  "GET /clinic/village/:villageId": {
    summary: "Get Clinics by Village ID",
    description: "Retrieve all clinics registered within a specific village ID",

    params: {
      villageId: "uuid-village-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Clinics by Village retrieved successfully",
      pagination: null,
      data: [
        {
          id: "uuid-clinic-1",
          name: "Posyandu Mawar 1",
          address: "Jl. Melati No. 3",
          village_id: "uuid-village-1",
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
        },
      ],
    },
  },

  "GET /clinic": {
    summary: "Get All Clinics",

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
        description: "Search keyword to filter clinics by name",
        example: "Melati",
      },
      name: {
        type: "string",
        description: "Filter by exact name match (case-insensitive)",
        example: "Posyandu Melati",
      },
    },

    response: {
      data: [
        {
          id: "clinic-uuid",
          name: "Posyandu Melati",
          address: "Jl. Melati No.1",
          village: {
            id: "village-uuid",
            name: "Kelurahan A",
          },
          _count: {
            parents: 15,
            Cadre: 4,
          },
        },
      ],
    },
  },

  "GET /clinic/:id": {
    summary: "Get Clinic By Id",

    params: {
      id: "clinic-uuid",
    },

    response: {
      id: "clinic-uuid",
      name: "Posyandu Melati",
      address: "Jl. Melati No.1",

      village: {
        id: "village-uuid",
        name: "Kelurahan A",
      },

      parents: [
        {
          id: "parent-uuid",
          name: "Budi",
          phone_number: "08123456789",
        },
      ],

      Cadre: [
        {
          id: "cadre-uuid",
          name: "Siti",
          email: "siti@mail.com",
        },
      ],
    },
  },

  "POST /clinic": {
    summary: "Create Clinic",
    request: {
      name: "Posyandu Melati",
      address: "Jl. Melati No.1",
      village_id: "village-uuid",
    },

    response: {
      id: "clinic-uuid",
      name: "Posyandu Melati",
      address: "Jl. Melati No.1",
      village_id: "village-uuid",
    },
  },

  "PATCH /clinic/:id": {
    summary: "Update Clinic",

    params: {
      id: "clinic-uuid",
    },

    request: {
      name: "Posyandu Melati Baru",
      address: "Jl. Mawar No.2",
    },

    response: {
      id: "clinic-uuid",
      name: "Posyandu Melati Baru",
      address: "Jl. Mawar No.2",
      village_id: "village-uuid",
    },
  },

  "DELETE /clinic/:id": {
    summary: "Delete Clinic",

    params: {
      id: "clinic-uuid",
    },

    response: true,
  },
};
