const asleep = require("await-sleep");

const DEFAULT_RETRY_LIMIT = 5;
const DEFAULT_LOGGER = console;
const DEFAULT_LOG_ENABLED = false;
/**
 * @return {number}
 */
const DEFAULT_WAIT_FUNC = function () {
  return (this.retryCount * this.retryCount) * 1000
};

class ExponentialRequestDriver {
  static getInstance(options) {
    return new ExponentialRequestDriver(options);
  }

  constructor(options = {}) {
    this.retryCount = 0;
    this.errors = [];

    // set options
    this.limit = options.limit || DEFAULT_RETRY_LIMIT;
    this.logging = options.logging || DEFAULT_LOG_ENABLED;
    this.logger = options.logger || DEFAULT_LOGGER;
    this.weight = options.weight || DEFAULT_WAIT_FUNC;
  }

  async run(func, ...arg) {
    for (this.retryCount = 0; this.retryCount < this.limit; this.retryCount++) {
      const sleepSec = this.weight();
      try {
        // It cause exception when status code is not 200.
        return await func(...arg);
      } catch (e) {
        this.logger.info(`${this.retryCount}/${this.limit}, it will retry automatically within ${sleepSec / 1000} sec. ${e}`);
        this.errors.push(e);
      }

      await asleep(sleepSec);
    }
    throw new Error("retry limit exceed");
  }
}

module.exports = ExponentialRequestDriver;
