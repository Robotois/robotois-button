const BtnModule = require('bindings')('ButtonModule');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;
/**
 * Creates an instance of TemperatureSensor.
 * @param {int} port The port number where this component us connected.
 * @returns {ButtonModule}.
 */
function ButtonModule(port) {
  const self = this;
  EventEmitter.call(this);
  this.button = new BtnModule(port);

  process.on('SIGINT', () => {
    self.button.release();
  });

  process.on('SIGTERM', () => {
    self.button.release();
  });
}

ButtonModule.prototype.getValue = function getValue() {
  return this.button.getValue();
};

ButtonModule.prototype.enableEvents = function enableEvents() {
  const self = this;
  let prevState = self.button.getValue();
  let currentState;

  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      currentState = self.button.getValue();
      if (currentState !== prevState) {
        self.emit('change', currentState);
        prevState = currentState;
      }
    }, 100); // Tomar mediciones cada 100ms
  }
};

ButtonModule.prototype.when = function when(callback) {
  this.enableEvents();
  this.on('change', (state) => {
    if (state) {
      /* eslint-disable no-console */
      console.log(`Botón: ${state}`);
      callback();
    }
  });
};

ButtonModule.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.button.release();
};

inherits(ButtonModule, EventEmitter);

module.exports = ButtonModule;
