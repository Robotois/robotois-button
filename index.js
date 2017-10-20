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
  this.mqttClient.publish(this.myTopic, this.button.getValue().toString());
};

ButtonModule.prototype.enableEvents = function enableEvents(mqttConfig) {
  let prevValue = this.button.getValue();
  if (mqttConfig) {
    this.mqttClient = mqttConfig.mqttClient;
    this.myTopic = `digitalInputs/button${mqttConfig.instance}`;
    this.mqttClient.publish('registerTopic', this.myTopic);
    this.mqttClient.publish(this.myTopic, prevValue.toString());
  }
  const self = this;
  function run() {
    const currentValue = self.button.getValue();
    if (prevValue !== currentValue) {
      self.emit('change', currentValue, statusMap[currentValue]);
      if (self.mqttClient) {
        self.mqttClient.publish(self.myTopic, currentValue.toString());
      }
      prevValue = currentValue;
    }
    setImmediate(run);
  }
  this.emit('change', prevValue, statusMap[prevValue]);
  run();
};

ButtonModule.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.button.release();
};

inherits(ButtonModule, EventEmitter);

module.exports = ButtonModule;
