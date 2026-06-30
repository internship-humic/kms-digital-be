export default {
  "GET /clinic/:villageId": {
    summary: "Get Clinics by Village ID",
    description: "Retrieve all clinics registered within a specific village ID",
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
};
