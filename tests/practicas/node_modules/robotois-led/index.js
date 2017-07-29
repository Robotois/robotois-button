const LedModule = require('bindings')('LEDModule');
/**
 * Creates an instance of LEDModule.
 * @param {int} port The port number where this component us connected.
 * @returns {LEDModule} LEDModule object
 */
function LEDModule(port) {
  const selft = this;
  this.led = new LedModule(port);
  this.ledStatus = 0;
  this.blinkStatus = false;
  this.blinkInterval = false;

  process.on('SIGINT', () => {
    selft.led.release();
  });

  process.on('SIGTERM', () => {
    selft.led.release();
  });
}

LEDModule.prototype.write = function write(ledValue) {
  this.ledStatus = ledValue;
  this.led.write(ledValue);
};

LEDModule.prototype.flash = function flash() {
  this.write(1);
  setTimeout(() => {
    this.write(0);
  }, 3000);
  // sleep.usleep(300000); // Stops the execution for 3 secs
};

LEDModule.prototype.blink = function blink() {
  if (!this.blinkInterval) {
    this.blinkInterval = setInterval(() => {
      this.toggle();
    }, 500); // cambiar estado cada 500ms
  }
};

LEDModule.prototype.turnOn = function turnOn() {
  clearInterval(this.blinkInterval);
  this.blinkInterval = false;
  this.write(1);
};

LEDModule.prototype.turnOff = function turnOff() {
  clearInterval(this.blinkInterval);
  this.blinkInterval = false;
  this.write(0);
};

LEDModule.prototype.toggle = function toggle() {
  if (this.ledStatus === 1) {
    this.write(0);
  } else {
    this.write(1);
  }
};

LEDModule.prototype.release = function release() {
  clearInterval(this.blinkInterval);
  this.led.release();
};

module.exports = LEDModule;
