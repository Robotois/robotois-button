const BtnModule = require('bindings')('ButtonModule');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

const statusMap = ['Liberado', 'Presionado'];

/**
 * Creates an instance of ButtonModule.
 * @param {int} port The port number where this component us connected.
 * @returns {ButtonModule} The ButtonModule object.
 */
function ButtonModule(port) {
  const self = this;
  EventEmitter.call(this);
  this.button = new BtnModule(port);
  this.prevState = false;

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
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      const value = this.button.getValue();
      this.emit('state', value, statusMap[value]);
    }, 200); // Tomar mediciones cada 250ms
  }
};

ButtonModule.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.button.release();
};

inherits(ButtonModule, EventEmitter);

module.exports = ButtonModule;
