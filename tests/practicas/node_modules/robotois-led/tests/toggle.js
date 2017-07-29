const LED = require('../index');

const led = new LED(5);

setInterval(() => {
  led.toggle();
}, 1000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
