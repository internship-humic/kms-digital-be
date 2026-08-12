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
    description:
      "Update name, email, address, phone number, or clinic for the currently authenticated user. All fields are optional.",

    request: {
      name: "John Doe",
      email: "john@example.com",
      address: "Jl. Mawar No. 12",
      phone_number: "08123456789",
      clinic_id: "clinic-uuid",
    },

    response: {
      success: true,
      status: "OK",
      message: "Profile updated successfully",
      pagination: null,
      data: {
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
        role: "PARENTS",
      },
    },
  },

  "PATCH /auth/change-password": {
    summary: "Change Password",
    description:
      "Change the password of the currently authenticated user. Requires providing the current password for verification.",

    request: {
      current_password: "OldPassword123!",
      new_password: "NewPassword456!",
      password_confirmation: "NewPassword456!",
    },

    response: {
      success: true,
      status: "OK",
      message: "Password changed successfully",
      pagination: null,
      data: {
        updated: true,
      },
    },
  },

  "POST /auth/forgot-password": {
    summary: "Request Password Reset",
    description:
      "Send a password reset link to the provided email address. The link is valid for a limited time.",

    request: {
      email: "john@example.com",
    },

    response: {
      success: true,
      status: "OK",
      message: "Password reset email sent",
      pagination: null,
      data: {
        sent: true,
      },
    },
  },

  "POST /auth/reset-password": {
    summary: "Reset Password",
    description:
      "Reset the user's password using a valid reset token obtained from the forgot-password email.",

    request: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      new_password: "NewPassword456!",
      password_confirmation: "NewPassword456!",
    },

    response: {
      success: true,
      status: "OK",
      message: "Password reset successfully",
      pagination: null,
      data: {
        updated: true,
      },
    },
  },
};
