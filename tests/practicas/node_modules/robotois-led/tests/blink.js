const LED = require('../index');

const led = new LED(6);

led.blink();

setTimeout(() => {
  led.turnOff();
}, 5000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
