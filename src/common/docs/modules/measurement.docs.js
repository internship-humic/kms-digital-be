export default {
  "GET /measurement/": {
    summary: "Get All Measurements",
    description: "Retrieve a paginated list of all children measurements",

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
      childrenId: {
        type: "string",
        description: "Filter measurements by children ID",
        example: "uuid-child-1",
      },
      startDate: {
        type: "string",
        description: "Filter measurements from this date (ISO format: YYYY-MM-DD)",
        example: "2026-01-01",
      },
      endDate: {
        type: "string",
        description: "Filter measurements until this date (ISO format: YYYY-MM-DD)",
        example: "2026-12-31",
      },
    },

    response: {
      success: true,
      status: "OK",
      message: "Measurements retrieved successfully",
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
      },
      data: [
        {
          id: "uuid-measurement-1",
          children_id: "uuid-child-1",
          clinic_id: "uuid-clinic-1",
          measurement_date: "2026-06-30T00:00:00.000Z",
          age_month: 8,
          description: "Pengukuran rutin",
          body_weight: 8.5,
          body_height: 70.0,
          head_circumference: 44.0,
          zscore_bb: -0.24,
          zscore_tb: 0.13,
          zscore_lk: -0.55,
          zscore_gizi: 0.42,
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
        },
      ],
    },
  },

  "GET /measurement/graph/:childrenId": {
    summary: "Get Measurement Graph Data",
    description: "Retrieve history measurements of a child for graph visualization",

    params: {
      childrenId: "uuid-child-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Measurement graph retrieved successfully",
      pagination: null,
      data: [
        {
          id: "uuid-measurement-1",
          age_month: 8,
          body_weight: 8.5,
          body_height: 70.0,
          head_circumference: 44.0,
          measurement_date: "2026-06-30T00:00:00.000Z",
        },
      ],
    },
  },

  "GET /measurement/:id": {
    summary: "Get Measurement by ID",
    description: "Retrieve details of a single measurement record by ID",

    params: {
      id: "uuid-measurement-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Measurement retrieved successfully",
      pagination: null,
      data: {
        id: "uuid-measurement-1",
        children_id: "uuid-child-1",
        clinic_id: "uuid-clinic-1",
        measurement_date: "2026-06-30T00:00:00.000Z",
        age_month: 8,
        description: "Pengukuran rutin",
        body_weight: 8.5,
        body_height: 70.0,
        head_circumference: 44.0,
        zscore_bb: -0.24,
        zscore_tb: 0.13,
        zscore_lk: -0.55,
        zscore_gizi: 0.42,
        created_at: "2026-06-30T00:00:00.000Z",
        updated_at: "2026-06-30T00:00:00.000Z",
      },
    },
  },

  "POST /measurement/": {
    summary: "Create Measurement",
    description: "Register a new measurement and calculate its z-scores automatically",
    request: {
      children_id: "uuid-child-1",
      clinic_id: "uuid-clinic-1",
      measurement_date: "2026-06-30",
      description: "Pengukuran rutin",
      body_weight: 8.5,
      body_height: 70.0,
      head_circumference: 44.0,
    },
    response: {
      success: true,
      status: "OK",
      message: "Measurement created successfully",
      pagination: null,
      data: {
        id: "uuid-measurement-1",
        children_id: "uuid-child-1",
        clinic_id: "uuid-clinic-1",
        measurement_date: "2026-06-30T00:00:00.000Z",
        age_month: 8,
        description: "Pengukuran rutin",
        body_weight: 8.5,
        body_height: 70.0,
        head_circumference: 44.0,
        zscore_bb: -0.24,
        zscore_tb: 0.13,
        zscore_lk: -0.55,
        zscore_gizi: 0.42,
        created_at: "2026-06-30T00:00:00.000Z",
        updated_at: "2026-06-30T00:00:00.000Z",
      },
    },
  },

  "PUT /measurement/:id": {
    summary: "Update Measurement",
    description: "Update details of an existing measurement record and recalculate its z-scores",

    params: {
      id: "uuid-measurement-1",
    },

    request: {
      children_id: "uuid-child-1",
      clinic_id: "uuid-clinic-1",
      measurement_date: "2026-06-30",
      description: "Pengukuran rutin terupdate",
      body_weight: 8.6,
      body_height: 70.5,
      head_circumference: 44.0,
    },
    response: {
      success: true,
      status: "OK",
      message: "Measurement updated successfully",
      pagination: null,
      data: {
        id: "uuid-measurement-1",
        children_id: "uuid-child-1",
        clinic_id: "uuid-clinic-1",
        measurement_date: "2026-06-30T00:00:00.000Z",
        age_month: 8,
        description: "Pengukuran rutin terupdate",
        body_weight: 8.6,
        body_height: 70.5,
        head_circumference: 44.0,
        zscore_bb: -0.21,
        zscore_tb: 0.15,
        zscore_lk: -0.55,
        zscore_gizi: 0.45,
        created_at: "2026-06-30T00:00:00.000Z",
        updated_at: "2026-06-30T00:00:00.000Z",
      },
    },
  },

  "DELETE /measurement/:id": {
    summary: "Delete Measurement",
    description: "Delete an existing measurement record by ID",

    params: {
      id: "uuid-measurement-1",
    },

    response: {
      success: true,
      status: "OK",
      message: "Measurement deleted successfully",
      pagination: null,
      data: null,
    },
  },
};
