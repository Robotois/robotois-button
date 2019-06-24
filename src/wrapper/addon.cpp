// addon.cc
#include <node.h>
#include "MyObject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(ButtonModule, InitAll)

}  // namespace demo