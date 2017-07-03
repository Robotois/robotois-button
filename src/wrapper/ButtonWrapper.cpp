#include <node.h>
#include "ButtonWrapper.h"

using namespace v8;

Persistent<Function> ButtonWrapper::constructor;

ButtonWrapper::ButtonWrapper(uint8_t _header){
  button = new Button(_header);
}

ButtonWrapper::~ButtonWrapper(){
}

void ButtonWrapper::release(const v8::FunctionCallbackInfo<v8::Value>& args){
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  ButtonWrapper* temp_obj = ObjectWrap::Unwrap<ButtonWrapper>(args.Holder());
  temp_obj->button->release();
  delete temp_obj->button;
}


void ButtonWrapper::Init(){
  Isolate* isolate = Isolate::GetCurrent();
  // Prepare consructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate,New);
  tpl->SetClassName(String::NewFromUtf8(isolate,"ButtonWrapper"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl,"getValue",getValue);
  NODE_SET_PROTOTYPE_METHOD(tpl,"release",release);

  constructor.Reset(isolate,tpl->GetFunction());
}

void ButtonWrapper::New(const FunctionCallbackInfo<Value>& args){
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  uint8_t _header = 0x01;
  ButtonWrapper* obj;
  uint8_t _argc = args.Length();
  if(args.IsConstructCall()){
    // Invoked as constructor: `new MyObject(...)`
    if(_argc == 1){
      _header = (uint8_t) args[0]->NumberValue();
      obj = new ButtonWrapper(_header);
      obj->Wrap(args.This());
      args.GetReturnValue().Set(args.This());
    }else{
      isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "Wrong arguments...")));
      return;
    }
  }else{
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    if(_argc != 1){
      isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "Wrong arguments...")));
      return;
    }
    Local<Value>* argv = new Local<Value>[_argc];
    for(uint8_t i = 0; i < _argc; i++){
      argv[i] = args[i];
    }
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    args.GetReturnValue().Set(cons->NewInstance(_argc, argv));
  }
}

void ButtonWrapper::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  uint8_t _argc = args.Length();
  if(_argc != 1){
    isolate->ThrowException(Exception::TypeError(
    String::NewFromUtf8(isolate, "Wrong arguments...")));
    return;
  }
  Handle<Value>* argv = new Handle<Value>[_argc];
  for(uint8_t i = 0; i < _argc; i++){
    argv[i] = args[i];
  }
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Object> instance = cons->NewInstance(_argc, argv);

  args.GetReturnValue().Set(instance);
}

void ButtonWrapper::getValue(const FunctionCallbackInfo<Value>& args){
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  ButtonWrapper* temp_obj = ObjectWrap::Unwrap<ButtonWrapper>(args.Holder());

  args.GetReturnValue().Set(Number::New(isolate,temp_obj->button->getValue()));
}
