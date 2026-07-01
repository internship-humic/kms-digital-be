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
};
