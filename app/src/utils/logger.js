  import { createLogger, format, transports } from 'winston';
  import a9_0x5970da from 'fs';
  const {
    combine,
    timestamp,
    printf,
    colorize
  } = format;
  const customFormat = printf(({
    level: _0x40d55c,
    message: _0xaa336f,
    timestamp: _0x631755
  }) => {
    return _0x631755 + " [" + _0x40d55c + "]: " + _0xaa336f;
  });
  class Logger {
    constructor() {
      this.logger = createLogger({
        'level': "debug",
        'format': combine(timestamp({
          'format': "YYYY-MM-DD HH:mm:ss"
        }), colorize(), customFormat),
        'transports': [new transports.File({
          'filename': "log/app.log"
        })],
        'exceptionHandlers': [new transports.File({
          'filename': 'log/app.log'
        })],
        'rejectionHandlers': [new transports.File({
          'filename': "log/app.log"
        })]
      });
    }
    ['info'](_0x8d739e) {
      this.logger.info(_0x8d739e);
    }
    ['warn'](_0x3a23e2) {
      this.logger.warn(_0x3a23e2);
    }
    ['error'](_0x591547) {
      this.logger.error(_0x591547);
    }
    ['debug'](_0xb5c6b9) {
      this.logger.debug(_0xb5c6b9);
    }
    ["setLevel"](_0xb04f4a) {
      this.logger.level = _0xb04f4a;
    }
    ['clear']() {
      a9_0x5970da.truncate('log/app.log', 0x0, _0x59ef5d => {
        if (_0x59ef5d) {
          this.logger.error("Failed to clear the log file: " + _0x59ef5d.message);
        } else {
          this.logger.info("Log file cleared");
        }
      });
    }
  }
  export default new Logger();
