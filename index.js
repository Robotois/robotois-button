const BtnModule = require('bindings')('ButtonModule');
const mqtt = require('mqtt');

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
  this.connected = false;
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

ButtonModule.prototype.enableMqtt = function enableMqtt(mqttConfig) {
  // console.log(mqttConfig);
  this.mqttClient = mqtt.connect({ host: mqttConfig.host, port: 1883 });
  const self = this;
  this.mqttClient.on('connect', () => {
    // console.log('Button connected to', mqttConfig.host);
    self.mqttClient.publish(`digitalInputs/button${mqttConfig.instance}`, `${self.prevValue}`);
    self.connected = true;
  });
};

ButtonModule.prototype.enableEvents = function enableEvents(mqttConfig) {
  this.prevValue = this.button.getValue();
  if (mqttConfig) {
    this.enableMqtt(mqttConfig);
  }
  const self = this;
  function run() {
    const currentValue = self.button.getValue();
    if (self.prevValue !== currentValue) {
      self.emit('change', currentValue, statusMap[currentValue]);
      if (self.connected) {
        self.mqttClient.publish(`digitalInputs/button${mqttConfig.instance}`, `${currentValue}`);
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
