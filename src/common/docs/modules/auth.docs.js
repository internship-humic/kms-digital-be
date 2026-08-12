export default {
  "POST /auth/login": {
    summary: "User Login",
    description:
      "Authenticate user using email and password, returning JWT token",
    request: {
      email: "admin@jagacilik.com",
      password: "Password123!",
    },
    response: {
      success: true,
      status: "OK",
      message: "Login Successful",
      pagination: null,
      data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "uuid-cadre-1",
          name: "John Doe",
          email: "john@example.com",
          role: "CADRE",
          clinic_id: "clinic-uuid-1",
        },
      },
    },
  },

  "POST /auth/register": {
    summary: "Register Parent",
    description:
      "Register a new Parent account associated with a specific clinic",
    request: {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "Password123!",
      password_confirmation: "Password123!",
      address: "Jl. Merdeka No. 10",
      clinic_id: "clinic-uuid-1",
      phone_number: "08123456789",
    },
    response: {
      success: true,
      status: "CREATED",
      message: "Registration Successful",
      pagination: null,
      data: {
        id: "uuid-parent-1",
        name: "Jane Doe",
        email: "jane@example.com",
        address: "Jl. Merdeka No. 10",
        clinic_id: "clinic-uuid-1",
        phone_number: "08123456789",
      },
    },
  },

  "GET /auth/me": {
    summary: "Get Current User Profile",
    description:
      "Retrieve profile information of the currently authenticated user based on their JWT token",
    response: {
      success: true,
      status: "OK",
      message: "Profile retrieved successfully",
      pagination: null,
      data: {
        user: {
          id: "uuid-cadre-1",
          name: "John Doe",
          email: "john@example.com",
          clinic_id: "clinic-uuid-1",
          clinic: {
            id: "clinic-uuid-1",
            name: "Posyandu Melati",
            address: "Jl. Melati",
          },
        },
        role: "CADRE",
      },
    },
  },

  "POST /auth/activation": {
    summary: "Activate Cadre",
    description:
      "Activate a new Cadre account by assigning name, email, password, and clinic ID (Admin only)",
    request: {
      name: "John Doe",
      email: "john@example.com",
      password: "Password123!",
      password_confirmation: "Password123!",
      clinic_id: "clinic-uuid-1",
    },
    response: {
      success: true,
      status: "CREATED",
      message: "Cadre Activated Successfully",
      pagination: null,
      data: {
        id: "uuid-cadre-1",
        name: "John Doe",
        email: "john@example.com",
        clinic_id: "clinic-uuid-1",
      },
    },
  },

  "PATCH /auth/profile": {
    summary: "Update Current User Profile",

    request: {
      name: "John Doe",
      email: "john@example.com",
      address: "Jl. Mawar No. 12",
      phone_number: "08123456789",
      clinic_id: "clinic-uuid",
    },

    response: {
      user: {
        id: "user-uuid",
        name: "John Doe",
        email: "john@example.com",
        address: "Jl. Mawar No. 12",
        phone_number: "08123456789",
        clinic: {
          id: "clinic-uuid",
          name: "Posyandu Melati",
          address: "Jl. Melati",
        },
      },
      role: "Parents",
    },
  },

  "PATCH /auth/change-password": {
    summary: "Change Password",

    request: {
      current_password: "OldPassword123",
      new_password: "NewPassword123",
      password_confirmation: "NewPassword123",
    },

    response: {
      updated: true,
    },
  },

  "POST /auth/forgot-password": {
    summary: "Request Password Reset",

    request: {
      email: "john@example.com",
    },

    response: {
      sent: true,
    },
  },

  "POST /auth/reset-password": {
    summary: "Reset Password",

    request: {
      token: "jwt-reset-token",
      new_password: "NewPassword123",
      password_confirmation: "NewPassword123",
    },

    response: {
      updated: true,
    },
  },
};
