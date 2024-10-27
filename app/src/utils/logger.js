import { createLogger, format, transports } from 'winston';
import a9_0x2f1d74 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x4c2955,
  message: _0x31d292,
  timestamp: _0x4ca579
}) => {
  return _0x4ca579 + " [" + _0x4c2955 + "]: " + _0x31d292;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': 'debug',
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': 'log/app.log'
      })],
      'exceptionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })],
      'rejectionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })]
    });
  }
  ['info'](_0x5130e1) {
    this.logger.info(_0x5130e1);
  }
  ['warn'](_0xe8b55b) {
    this.logger.warn(_0xe8b55b);
  }
  ['error'](_0x44f2a3) {
    this.logger.error(_0x44f2a3);
  }
  ["debug"](_0x1568ad) {
    this.logger.debug(_0x1568ad);
  }
  ["setLevel"](_0x56467c) {
    this.logger.level = _0x56467c;
  }
  ['clear']() {
    a9_0x2f1d74.truncate('log/app.log', 0x0, _0xefd94a => {
      if (_0xefd94a) {
        this.logger.error("Failed to clear the log file: " + _0xefd94a.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();