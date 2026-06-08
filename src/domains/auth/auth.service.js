import BaseService from "../../common/base_classes/base-service.js";
import {
  hashPassword,
  matchPassword,
  generateToken,
} from "../../utils/auth.util.js";
import Roles from "../../common/enums/user-roles.enum.js";

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
      user = await this.db.cadre.findUnique({ where: { email } });
      role = Roles.Cadre;
    }

    if (!user) {
      user = await this.db.admin.findUnique({ where: { email } });
      role = Roles.Admin;
    }

    if (!user) throw this.error.notFound("Email not found");

    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) throw this.error.unauthorized("Invalid password");

    const accessToken = generateToken({ id: user.id, role });
    delete user.password;

    return { user, role, accessToken };
  }

  async register(info) {
    const { name, email, password, address, clinic_id, phone_number } = info;

    const existing = await this.db.parents.findUnique({ where: { email } });
    if (existing) throw this.error.badRequest("Email already registered");

    const newUser = await this.db.parents.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        address,
        clinic_id,
        phone_number,
      },
    });

    delete newUser.password;
    return { user: newUser };
  }

  async activateCadre(info) {
    const { name, email, password } = info;

    const existingCadre = await this.db.cadre.findUnique({ where: { email } });
    if (existingCadre)
      throw this.error.badRequest("Email already registered as Cadre");

    const existingParents = await this.db.parents.findUnique({
      where: { email },
    });
    if (existingParents)
      throw this.error.badRequest("Email already registered as Parents");

    const newCadre = await this.db.cadre.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });

    delete newCadre.password;
    return { cadre: newCadre };
  }
}

export default new AuthService();
