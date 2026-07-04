export default {
  "GET /cadre": {
    summary: "Get All Cadres",

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

    response: true,
  },
};
