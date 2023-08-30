import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import config from "../config/index.js";

const logger = winston.createLogger({
  level: "info", // Log level threshold
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log to CloudWatch
    new WinstonCloudWatch({
      level: "info",
      logGroupName: "console",
      logStreamName: "test",
      awsAccessKeyId: config.AWS_ACCESS_KEY,
      awsSecretKey: config.AWS_SECRET_KEY,
      awsRegion: "us-east-1",
    }),
  ],
});

export default logger;
