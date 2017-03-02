var _buttons = require('../index.js'),
  buttons = new _buttons(5);
buttons.enableEvents();

buttons.on('change',(_state) => {
  console.log("Button changed: " +_state);
});

setInterval(()=>{ // Proceso en estado ocioso
  true;
},10000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
