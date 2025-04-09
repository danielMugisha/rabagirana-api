/**
 * Simple logger utility to replace console.log
 */
class Logger {
  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  }

  static error(message, error = null) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    if (error) {
      console.error(error);
    }
  }

  static warn(message) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  }

  static debug(message, object = null) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`);
      if (object) {
        console.log(object);
      }
    }
  }
}

module.exports = Logger;
