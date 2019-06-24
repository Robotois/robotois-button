const Button = require('../index.js');

const mqttConfig = {
  host: 'localhost',
  instance: 1,
};

const buttons = new Button(6);
buttons.enableEvents(mqttConfig);

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
