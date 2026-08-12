export default {
  "GET /clinic/village/:villageId": {
    summary: "Get Clinics by Village ID",
    description:
      "Retrieve all clinics registered within a specific village ID. Accessible by all users (public).",

    params: {
      villageId: "1101010001",
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
          village_id: "1101010001",
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
        },
      ],
    },
  },

  "GET /clinic/": {
    summary: "Get All Clinics",
    description: "Retrieve a paginated list of all clinics in the system. Requires authentication.",

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
      success: true,
      status: "OK",
      message: "Clinics retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
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
    description: "Retrieve full details of a clinic including its registered parents and cadres. Requires authentication.",

    params: {
      id: "clinic-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Clinic retrieved successfully",
      pagination: null,
      data: {
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
  },

  "POST /clinic/": {
    summary: "Create Clinic",
    description: "Register a new posyandu clinic and associate it with a specific village. (Admin only)",

    request: {
      name: "Posyandu Melati",
      address: "Jl. Melati No.1",
      village_id: "1101010001",
    },

    response: {
      success: true,
      status: "CREATED",
      message: "Clinic created successfully",
      pagination: null,
      data: {
        id: "clinic-uuid",
        name: "Posyandu Melati",
        address: "Jl. Melati No.1",
        village_id: "1101010001",
        created_at: "2026-07-01T08:00:00.000Z",
        updated_at: "2026-07-01T08:00:00.000Z",
      },
    },
  },

  "PATCH /clinic/:id": {
    summary: "Update Clinic",
    description: "Update clinic details. All fields are optional — send only the fields you want to change. (Admin only)",

    params: {
      id: "clinic-uuid",
    },

    request: {
      name: "Posyandu Melati Baru",
      address: "Jl. Mawar No.2",
      village_id: "1101010001",
    },

    response: {
      success: true,
      status: "OK",
      message: "Clinic updated successfully",
      pagination: null,
      data: {
        id: "clinic-uuid",
        name: "Posyandu Melati Baru",
        address: "Jl. Mawar No.2",
        village_id: "1101010001",
        created_at: "2026-07-01T08:00:00.000Z",
        updated_at: "2026-07-07T09:30:00.000Z",
      },
    },
  },

  "DELETE /clinic/:id": {
    summary: "Delete Clinic",
    description: "Permanently delete a clinic by ID. (Admin only)",

    params: {
      id: "clinic-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Clinic deleted successfully",
      pagination: null,
      data: true,
    },
  },
};
