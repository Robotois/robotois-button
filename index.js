var buttonModule = require('bindings')('ButtonModule');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

function ButtonModule(header){
  EventEmitter.call(this);
  var _self = this;
  this.button = new buttonModule(header);

  process.on('SIGINT', function () {
    _self.button.release();
  });

  process.on('SIGTERM', function () {
    _self.button.release();
  });
}

ButtonModule.prototype.getValue = function () {
  return this.button.getValue();
};

ButtonModule.prototype.enableEvents = function () {
  var _self = this;
  var prevState = _self.button.getValue(),currentState;

  if(!this.eventInterval){
    this.eventInterval = setInterval(()=>{
      currentState = _self.button.getValue();
      if(currentState !== prevState){
        _self.emit('change', currentState);
        prevState = currentState;
      }
    }, 100); // Tomar mediciones cada 100ms
  }
}

ButtonModule.prototype.when = function(callback){
  this.enableEvents();
  this.on('change', (state) => {
    if (state) {
      console.log('Botón: ' + state);
      callback();
    }
  });
}

ButtonModule.prototype.release = function () {
  clearInterval(this.eventInterval);
  this.button.release();
}

inherits(ButtonModule,EventEmitter);

module.exports = ButtonModule;
