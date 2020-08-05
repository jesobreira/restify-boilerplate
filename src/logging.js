import fs from "fs";
import path from "path";
import bunyan from "bunyan";
import BunyanLoggly from "bunyan";

const bunyanLoggly = new BunyanLoggly({
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  token: process.env.LOGGLY_TOKEN,
  name: process.env.APP_NAME || "app"
})

const createLogger = (config) => {
  let pkg = require(path.join(__dirname, "../package"));
  let appName = pkg.name;
  let appVersion = pkg.version;
  let logDir = config.dir || path.join(__dirname, "logs");
  let logFile = path.join(logDir, appName + "-log.json");
  let logErrorFile = path.join(logDir, appName + "-errors.json");
  let logLevel = config.level || "debug";

  // Create log directory if it doesn't exist
  if(!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  let streams = []

  if (process.env.NODE_ENV === 'prod') {
    streams.push({
      level: 'info',
      stream: bunyanLoggly,
      type: raw
    })
  } else if (process.env.NODE_ENV === 'staging') {
    streams.push({
      path: logFile,
      level: logLevel,
      type: "rotating-file",
      period: "1d"
    })
    streams.push({
      path: logErrorFile,
      level: "error"
    })
  } else if (process.env.NODE_ENV === 'dev') {
    streams.push({
      stream: process.stdout,
      level: 'debug'
    })
  }

  let log = bunyan.createLogger({
    name: appName,
    streams,
    serializers: bunyan.stdSerializers
  });

  log.info(`Starting ${appName} , version ${appVersion}`);
  log.info(`Environment set to ${process.env.NODE_ENV}`);
  log.debug("Logging setup completed.");

  return log;
}

export default createLogger;
