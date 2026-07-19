export default {
  "GET /children/": {
    summary: "Get All Children",
    description:
      "Retrieve a paginated list of all children records (Admin and Cadre only)",

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
        description: "Search keyword to filter children by name",
        example: "Ahmad",
      },
      name: {
        type: "string",
        description: "Filter by exact name match (case-insensitive)",
        example: "Ahmad",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Childrens retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
      },
      data: [
        {
          id: "uuid-child-1",
          name: "Ahmad",
          birth_date: "2025-01-01T00:00:00.000Z",
          parent_id: "uuid-parent-1",
          gender: "MALE",
          address: "Jl. Sudirman No. 5",
          status: "NORMAL",
          parent: {
            id: "uuid-parent-1",
            name: "Jane Doe",
            phone_number: "08123456789",
          },
        },
      ],
    },
  },

  "GET /children/risky": {
    summary: "Get All Risky Children",
    description:
      "Retrieve all low risk and high risk children with the latest measurement",

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
        description: "Search keyword to filter children by name",
        example: "Ahmad",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Risky childrens retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
      },
      data: {
        items: [
          {
            id: "uuid-child-1",
            name: "Ahmad",
            birth_date: "2025-01-01T00:00:00.000Z",
            parent_id: "uuid-parent-1",
            gender: "MALE",
            address: "Jl. Sudirman No. 5",
            status: "LOWRISK",
            parent: {
              id: "uuid-parent-1",
              name: "Jane Doe",
              phone_number: "08123456789",
            },
            measurements: [
              {
                id: "uuid-measurement-1",
                measurement_date: "2026-07-01T00:00:00.000Z",
                age_month: 18,
                body_weight: 9.4,
                body_height: 74,
                head_circumference: 45,
                zscore_bb: -1.2,
                zscore_tb: -0.8,
                zscore_lk: null,
                zscore_gizi: -1.1,
              },
            ],
          },
        ],
        total_case: 2,
        need_referral: 1,
      },
    },
  },

  "GET /children/:parentId": {
    summary: "Get Children by Parent ID",
    description:
      "Retrieve a list of children records associated with a specific parent ID",

    params: {
      parentId: "uuid-parent-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Childrens retrieved successfully",
      pagination: null,
      data: [
        {
          id: "uuid-child-1",
          name: "Ahmad",
          birth_date: "2025-01-01T00:00:00.000Z",
          parent_id: "uuid-parent-1",
          gender: "MALE",
          address: "Jl. Sudirman No. 5",
          status: "NORMAL",
        },
      ],
    },
  },

  "GET /children/:id/intervention": {
    summary: "Get Intervention by Children ID",
    description: "Retrieve intervention record for a child",

    params: {
      id: "uuid-child-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Intervention retrieved successfully",
      pagination: null,
      data: {
        id: "uuid-intervention-1",
        children_id: "uuid-child-1",
        cadre_id: "uuid-cadre-1",
        is_intervented: true,
        referral: false,
        supplement: true,
        education: false,
        created_at: "2026-07-01T00:00:00.000Z",
        updated_at: "2026-07-19T00:00:00.000Z",
      },
    },
  },

  "POST /children/": {
    summary: "Create Child Profile",
    description:
      "Add a new child profile and register the initial birth measurement",
    request: {
      name: "Ahmad",
      birth_date: "2025-01-01",
      parent_id: "uuid-parent-1",
      gender: "MALE",
      address: "Jl. Sudirman No. 5",
      status: "NORMAL",
      body_weight: 3.2,
      body_height: 50,
      head_circumference: 34.5,
    },
    response: {
      success: true,
      status: "OK",
      message: "Children created successfully",
      pagination: null,
      data: {
        id: "uuid-child-1",
        name: "Ahmad",
        birth_date: "2025-01-01T00:00:00.000Z",
        parent_id: "uuid-parent-1",
        gender: "MALE",
        address: "Jl. Sudirman No. 5",
        status: "NORMAL",
      },
    },
  },

  "PUT /children/:id": {
    summary: "Update Child Profile",
    description: "Update the profile details of an existing child record by ID",

    params: {
      id: "uuid-child-1",
    },

    request: {
      name: "Ahmad Updated",
      birth_date: "2025-01-01",
      parent_id: "uuid-parent-1",
      gender: "MALE",
      address: "Jl. Sudirman No. 10",
      status: "NORMAL",
    },
    response: {
      success: true,
      status: "OK",
      message: "Children updated successfully",
      pagination: null,
      data: {
        id: "uuid-child-1",
        name: "Ahmad Updated",
        birth_date: "2025-01-01T00:00:00.000Z",
        parent_id: "uuid-parent-1",
        gender: "MALE",
        address: "Jl. Sudirman No. 10",
        status: "NORMAL",
      },
    },
  },

  "PATCH /children/:id/intervention": {
    summary: "Update Intervention",
    description: "Patch one or more intervention flags for a child. Providing cadre_id records which cadre managed the intervention.",

    params: {
      id: "uuid-child-1",
    },

    request: {
      referral: true,
      supplement: false,
      education: true,
    },
    response: {
      success: true,
      status: "OK",
      message: "Intervention updated successfully",
      pagination: null,
      data: {
        id: "uuid-intervention-1",
        children_id: "uuid-child-1",
        cadre_id: "uuid-cadre-1",
        is_intervented: true,
        referral: true,
        supplement: false,
        education: true,
      },
    },
  },

  "DELETE /children/:id": {
    summary: "Delete Child Profile",
    description:
      "Remove a child profile and all associated measurements from the database",

    params: {
      id: "uuid-child-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Children deleted successfully",
      pagination: null,
      data: null,
    },
  },

  "GET /children/clinic/:clinicId": {
    summary: "Get All Children by Clinic",
    description:
      "Retrieve a paginated list of all children records that have measurements in a specific clinic (Admin and Cadre only)",

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
        description: "Search keyword to filter children by name",
        example: "Ahmad",
      },
      name: {
        type: "string",
        description: "Filter by exact name match (case-insensitive)",
        example: "Ahmad",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Children by clinic retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
      },
      data: {
        items: [
          {
            id: "uuid-child-1",
            name: "Ahmad",
            birth_date: "2025-01-01T00:00:00.000Z",
            parent_id: "uuid-parent-1",
            gender: "MALE",
            address: "Jl. Sudirman No. 5",
            status: "NORMAL",
            parent: {
              id: "uuid-parent-1",
              name: "Jane Doe",
              phone_number: "08123456789",
            },
            measurements: [
              {
                id: "uuid-measurement-1",
                measurement_date: "2026-07-01T00:00:00.000Z",
                age_month: 18,
                body_weight: 9.4,
                body_height: 74,
                head_circumference: 45,
                zscore_bb: -1.2,
                zscore_tb: -0.8,
                zscore_lk: null,
                zscore_gizi: -1.1,
              },
            ],
          },
        ],
        total_case: 1,
      },
    },
  },

  "GET /children/clinic/:clinicId/risky": {
    summary: "Get All Risky Children by Clinic",
    description:
      "Retrieve all low risk and high risk children for a specific clinic with the latest measurement (Admin and Cadre only)",

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
        description: "Search keyword to filter children by name",
        example: "Ahmad",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Risky children by clinic retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
      },
      data: {
        items: [
          {
            id: "uuid-child-1",
            name: "Ahmad",
            birth_date: "2025-01-01T00:00:00.000Z",
            parent_id: "uuid-parent-1",
            gender: "MALE",
            address: "Jl. Sudirman No. 5",
            status: "LOWRISK",
            parent: {
              id: "uuid-parent-1",
              name: "Jane Doe",
              phone_number: "08123456789",
            },
            measurements: [
              {
                id: "uuid-measurement-1",
                measurement_date: "2026-07-01T00:00:00.000Z",
                age_month: 18,
                body_weight: 9.4,
                body_height: 74,
                head_circumference: 45,
                zscore_bb: -1.2,
                zscore_tb: -0.8,
                zscore_lk: null,
                zscore_gizi: -1.1,
              },
            ],
          },
        ],
        total_case: 2,
        need_referral: 1,
      },
    },
  },

  "GET /children/:id/export": {
    summary: "Export Child Growth Report to PDF",
    description: "Generates and downloads a beautifully designed PDF growth report containing child details, status, and historical measurements (Parents, Cadres, and Admins).",
    params: {
      id: "uuid-child-1"
    },
    response: {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=\"KMS_Digital_Ahmad_2026-07-14.pdf\""
      },
      description: "Binary PDF stream containing the growth chart report"
    }
  },

  "GET /children/clinic/:clinicId/export": {
    summary: "Export Clinic Children List to PDF",
    description: "Generates and downloads a PDF table of all registered children under a specific clinic (Cadre and Admin only).",
    params: {
      clinicId: "uuid-clinic-1"
    },
    response: {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=\"Laporan_Posyandu_Mawar_2026-07-14.pdf\""
      },
      description: "Binary PDF stream containing the clinic children overview report"
    }
  }
};
