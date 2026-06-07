import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.util.js";

const Prisma = new PrismaClient({
  log: ["warn", "error"],
});

export default Prisma;
