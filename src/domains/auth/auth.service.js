import BaseService from "../../common/base_classes/base-service.js";
import {
  hashPassword,
  matchPassword,
  generateToken,
} from "../../utils/auth.util.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";
import Roles from "../../common/enums/user-roles.enum.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utils/mail.util.js";

class AuthService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async login(info) {
    const { email, password } = info;

    let user = await this.db.parents.findUnique({ where: { email } });
    let role = Roles.Parents;

    if (!user) {
      user = await this.db.cadre.findUnique({
        where: { email },
        include: {
          clinic: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      });
      role = Roles.Cadre;
    }

    if (!user) {
      user = await this.db.admin.findUnique({ where: { email } });
      role = Roles.Admin;
    }

    if (!user) throw this.error.notFound("Email not found");

    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) throw this.error.unauthorized("Invalid password");

    const accessToken = generateToken({
      id: user.id,
      role,
      clinic_id: user.clinic_id ?? null,
    });

    const responseUser = { ...user };
    delete responseUser.password;

    if (role === Roles.Cadre) {
      responseUser.clinic_id = user.clinic_id;
    }

    if (role === Roles.Parents) {
      responseUser.clinic_id = user.clinic_id;
    }

    return { user: responseUser, role, accessToken };
  }

  async register(info) {
    const { name, email, password, address, clinic_id, phone_number } = info;

    const existingEmail = await this.db.parents.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw this.error.badRequest("Email already registered");
    }

    const existingPhone = await this.db.parents.findUnique({
      where: {
        phone_number,
      },
    });

    if (existingPhone) {
      throw this.error.badRequest("Phone number already registered");
    }

    const clinic = await this.db.clinic.findUnique({
      where: {
        id: clinic_id,
      },
    });

    if (!clinic) {
      throw this.error.notFound("Clinic not found");
    }

    const user = await this.db.parents.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        address,
        clinic_id,
        phone_number,
      },
    });

    delete user.password;

    return {
      user,
    };
  }

  async activateCadre(info) {
    const { name, email, password, clinic_id } = info;

    const cadre = await this.db.cadre.findUnique({
      where: {
        email,
      },
    });

    if (cadre) {
      throw this.error.badRequest("Email already registered as Cadre");
    }

    const parent = await this.db.parents.findUnique({
      where: {
        email,
      },
    });

    if (parent) {
      throw this.error.badRequest("Email already registered as Parents");
    }

    const clinic = await this.db.clinic.findUnique({
      where: {
        id: clinic_id,
      },
    });

    if (!clinic) {
      throw this.error.notFound("Clinic not found");
    }

    const newCadre = await this.db.cadre.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        clinic_id,
      },
    });

    delete newCadre.password;

    return {
      cadre: newCadre,
    };
  }

  async getMe(user) {
    const { id, role } = user;

    let profile;

    if (role === Roles.Admin) {
      profile = await this.db.admin.findUnique({
        where: {
          id,
        },
      });
    } else if (role === Roles.Parents) {
      profile = await this.db.parents.findUnique({
        where: {
          id,
        },
        include: {
          clinic: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      });
    } else if (role === Roles.Cadre) {
      profile = await this.db.cadre.findUnique({
        where: {
          id,
        },
        include: {
          clinic: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      });
    } else {
      throw this.error.forbidden("Invalid role");
    }

    if (!profile) {
      throw this.error.notFound("User not found");
    }

    delete profile.password;

    return {
      user: profile,
      role,
    };
  }

  async updateProfile(user, body) {
    const { id, role } = user;

    const allowedFields = {
      [Roles.Admin]: ["email"],
      [Roles.Parents]: [
        "name",
        "email",
        "address",
        "phone_number",
        "clinic_id",
      ],
      [Roles.Cadre]: ["name", "email", "clinic_id"],
    }[role];

    if (!allowedFields) {
      throw this.error.forbidden("Invalid role");
    }

    const data = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    if (!Object.keys(data).length) {
      throw this.error.badRequest("No valid fields to update");
    }

    if (data.email) {
      const [parent, cadre, admin] = await Promise.all([
        this.db.parents.findUnique({ where: { email: data.email } }),
        this.db.cadre.findUnique({ where: { email: data.email } }),
        this.db.admin.findUnique({ where: { email: data.email } }),
      ]);

      if (parent && !(role === Roles.Parents && parent.id === id))
        throw this.error.badRequest("Email already registered as Parents");

      if (cadre && !(role === Roles.Cadre && cadre.id === id))
        throw this.error.badRequest("Email already registered as Cadre");

      if (admin && !(role === Roles.Admin && admin.id === id))
        throw this.error.badRequest("Email already registered as Admin");
    }

    if (role === Roles.Parents && data.phone_number) {
      const phone = await this.db.parents.findUnique({
        where: {
          phone_number: data.phone_number,
        },
      });

      if (phone && phone.id !== id) {
        throw this.error.badRequest("Phone number already registered");
      }
    }

    if (data.clinic_id) {
      const clinic = await this.db.clinic.findUnique({
        where: {
          id: data.clinic_id,
        },
      });

      if (!clinic) {
        throw this.error.notFound("Clinic not found");
      }
    }

    let model;

    switch (role) {
      case Roles.Admin:
        model = this.db.admin;
        break;
      case Roles.Parents:
        model = this.db.parents;
        break;
      case Roles.Cadre:
        model = this.db.cadre;
        break;
      default:
        throw this.error.forbidden("Invalid role");
    }

    await model.update({
      where: {
        id,
      },
      data,
    });

    return this.getMe(user);
  }

  async changePassword(user, body) {
    const { id, role } = user;
    const { current_password, new_password } = body;

    let model;

    switch (role) {
      case Roles.Admin:
        model = this.db.admin;
        break;

      case Roles.Parents:
        model = this.db.parents;
        break;

      case Roles.Cadre:
        model = this.db.cadre;
        break;

      default:
        throw this.error.forbidden("Invalid role");
    }

    const account = await model.findUnique({
      where: {
        id,
      },
    });

    if (!account) {
      throw this.error.notFound("User not found");
    }

    const isMatch = await matchPassword(current_password, account.password);

    if (!isMatch) {
      throw this.error.unauthorized("Current password is incorrect");
    }

    await model.update({
      where: {
        id,
      },
      data: {
        password: await hashPassword(new_password),
      },
    });

    return {
      updated: true,
    };
  }

  async requestPasswordReset(body) {
    const { email } = body;

    if (!RESET_PASSWORD_SECRET) {
      throw this.error.badRequest("RESET_PASSWORD_SECRET is not configured");
    }

    let user = await this.db.parents.findUnique({
      where: {
        email,
      },
    });

    let role = Roles.Parents;

    if (!user) {
      user = await this.db.cadre.findUnique({
        where: {
          email,
        },
      });

      role = Roles.Cadre;
    }

    if (!user) {
      user = await this.db.admin.findUnique({
        where: {
          email,
        },
      });

      role = Roles.Admin;
    }

    if (!user) {
      return {
        sent: true,
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
        role,
        email: user.email,
      },
      RESET_PASSWORD_SECRET,
      {
        expiresIn: RESET_PASSWORD_EXPIRES_IN,
      },
    );

    const resetUrl = FRONTEND_URL
      ? `${FRONTEND_URL.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(token)}`
      : token;

    await sendMail({
      to: user.email,
      subject: "Reset Password JagaCilik",
      text: `Gunakan link berikut untuk reset password:\n${resetUrl}`,
      html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Reset Password JagaCilik</h2>

        <p>Kami menerima permintaan untuk mengatur ulang password akun Anda.</p>

        <p>
          Klik link berikut untuk mengatur password baru:
        </p>

        <p>
          <a href="${resetUrl}">
            ${resetUrl}
          </a>
        </p>

        <p>
          Jika Anda tidak melakukan permintaan ini, abaikan email ini.
        </p>
      </div>
    `,
    });

    return {
      sent: true,
    };
  }

  async resetPassword(body) {
    const { token, new_password } = body;
    if (!RESET_PASSWORD_SECRET) {
      throw this.error.badRequest("RESET_PASSWORD_SECRET is not configured");
    }

    let payload;

    try {
      payload = jwt.verify(token, RESET_PASSWORD_SECRET);
    } catch {
      throw this.error.forbidden("Reset password token is invalid or expired");
    }

    let model;

    switch (payload.role) {
      case Roles.Admin:
        model = this.db.admin;
        break;

      case Roles.Parents:
        model = this.db.parents;
        break;

      case Roles.Cadre:
        model = this.db.cadre;
        break;

      default:
        throw this.error.forbidden("Invalid role");
    }

    const user = await model.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user || user.email !== payload.email) {
      throw this.error.forbidden("Reset password token is invalid or expired");
    }

    await model.update({
      where: {
        id: payload.id,
      },
      data: {
        password: await hashPassword(newPassword),
      },
    });

    return {
      updated: true,
    };
  }
}

export default new AuthService();
