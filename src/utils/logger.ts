import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";

export class Logger {
  private logger: WinstonLogger;
  private location: string;
  constructor(location: string) {
    this.location = location;
    this.logger = this.setLogger(this.location);
  }

  private setLogger(location: string) {
    return createLogger({
      format: format.combine(
        format.label({ label: location }),
        format.prettyPrint({ colorize: true }),
        format.timestamp()
      ),
      transports: [new transports.Console()],
    });
  }

  error = (message: string) => {
    this.logger.error(message);
  };

  info = (message: string) => {
    this.logger.info(`${message}`);
  };

  alert = (message: string) => {
    this.logger.alert(message);
  };

  warn = (message: string) => {
    this.logger.warn(message);
  };
}
