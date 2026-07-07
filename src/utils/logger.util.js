import winston from "winston";
import chalk from "chalk";
import moment from "moment-timezone";

const customFormat = winston.format.printf((info) => {
  const { timestamp, level, message, ...meta } = info;

  let msg = message;

  if (level === "warn") {
    msg = chalk.yellow(message);
  } else if (level === "error") {
    msg = chalk.red(message);
  } else if (level === "info") {
    msg = chalk.green(message);
  }

  const indoTime = moment(timestamp)
    .tz("Asia/Jakarta")
    .format("DD-MM-YYYY HH:mm:ss");

  let log = `[${indoTime}] ${level.toUpperCase()}: ${msg}`;

  if (Object.keys(meta).length) {
    log += `\n${JSON.stringify(meta, null, 2)}`;
  }

  return log;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    customFormat,
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
