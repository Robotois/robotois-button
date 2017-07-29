const LED = require('../index');

const led = new LED(5);

led.write(1);
setTimeout(() => {
  led.write(0);
}, 2000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
