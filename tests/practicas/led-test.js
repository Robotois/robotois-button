const LED = require('robotois-led');
const Button = require('../../index.js');

const led = new LED(4);

const buttons = new Button(6);
buttons.enableEvents();

buttons.on('change', (value, state) => {
  /* eslint-disable no-console */
  console.log(`Button State: ${value} - ${state}`);
  led.write(value);
});

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
