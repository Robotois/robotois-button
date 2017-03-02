const Button = require('../index.js');

const buttons = new Button(5);
buttons.enableEvents();

buttons.on('change', (_state) => {
  /* eslint-disable no-console */
  console.log(`Button changed: ${_state}`);
});

setInterval(() => {}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
