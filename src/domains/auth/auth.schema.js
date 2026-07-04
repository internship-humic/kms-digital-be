import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

const registerSchema = Joi.object({
  name: Joi.string().required().min(4).messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 4 characters long.",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Z]).{8,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least 1 uppercase letter.",
    }),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Password confirmation is required.",
      "any.only": "Password confirmation does not match password.",
    }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
  }),
  clinic_id: Joi.string().required().messages({
    "string.empty": "Clinic ID is required.",
  }),
  phone_number: Joi.string().required().messages({
    "string.empty": "Phone number is required.",
  }),
});

const activationSchema = Joi.object({
  name: Joi.string().required().min(4).messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 4 characters long.",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must be at least 8 characters, contain at least 1 uppercase letter, and 1 special character.",
    }),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Password confirmation is required.",
      "any.only": "Password confirmation does not match password.",
    }),
  clinic_id: Joi.string().required().messages({
    "string.empty": "Clinic ID is required.",
  }),
});

const profileSchema = Joi.object({
  name: Joi.string().min(4).messages({
    "string.min": "Name must be at least 4 characters long.",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email address.",
  }),

  address: Joi.string(),

  clinic_id: Joi.string(),

  phone_number: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided.",
  });

const changePasswordSchema = Joi.object({
  current_password: Joi.string().required().messages({
    "string.empty": "Current password is required.",
  }),

  new_password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Z]).{8,}$/)
    .messages({
      "string.empty": "New password is required.",
      "string.min": "New password must be at least 8 characters long.",
      "string.pattern.base":
        "New password must contain at least 1 uppercase letter.",
    }),

  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .messages({
      "string.empty": "Password confirmation is required.",
      "any.only": "Password confirmation does not match new password.",
    }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Reset token is required.",
  }),

  new_password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Z]).{8,}$/)
    .messages({
      "string.empty": "New password is required.",
      "string.min": "New password must be at least 8 characters long.",
      "string.pattern.base":
        "New password must contain at least 1 uppercase letter.",
    }),

  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .messages({
      "string.empty": "Password confirmation is required.",
      "any.only": "Password confirmation does not match new password.",
    }),
});

export {
  loginSchema,
  registerSchema,
  activationSchema,
  profileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
