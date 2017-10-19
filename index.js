const BtnModule = require('bindings')('ButtonModule');
// const mqtt = require('mqtt');

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
  this.prevValue = 0;

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

ButtonModule.prototype.publishNow = function publishNow() {
  this.mqttConfig.mqttClient.publish(`digitalInputs/button${this.mqttConfig.instance}`, this.button.getValue());
};

ButtonModule.prototype.enableEvents = function enableEvents(mqttConfig) {
  this.prevValue = this.button.getValue();
  if (mqttConfig) {
    this.mqttConfig = mqttConfig;
    mqttConfig.mqttClient.publish('registerTopic', `digitalInputs/button${mqttConfig.instance}`);
  }
  const self = this;
  function run() {
    const currentValue = self.button.getValue();
    if (self.prevValue !== currentValue) {
      self.emit('change', currentValue, statusMap[currentValue]);
      if (mqttConfig) {
        mqttConfig.mqttClient.publish(`digitalInputs/button${mqttConfig.instance}`, `${currentValue}`);
      }
      self.prevValue = currentValue;
    }
    setImmediate(run);
  }
  run();
};

ButtonModule.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.button.release();
};

inherits(ButtonModule, EventEmitter);

module.exports = ButtonModule;
