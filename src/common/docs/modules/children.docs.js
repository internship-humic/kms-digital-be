export default {
  "GET /children/": {
    summary: "Get All Children",
    description: "Retrieve a paginated list of all children records (Admin and Cadre only)",

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

  "GET /children/:parentId": {
    summary: "Get Children by Parent ID",
    description: "Retrieve a list of children records associated with a specific parent ID",

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

  "POST /children/": {
    summary: "Create Child Profile",
    description: "Add a new child profile and register the initial birth measurement",
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

  "DELETE /children/:id": {
    summary: "Delete Child Profile",
    description: "Remove a child profile and all associated measurements from the database",

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
};
