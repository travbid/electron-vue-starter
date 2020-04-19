#include "add.hpp"
#include <node.h>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value> &args) {
	Isolate *isolate = args.GetIsolate();
	args.GetReturnValue().Set(
	    String::NewFromUtf8(isolate, "world", NewStringType::kNormal).ToLocalChecked());
}

void Add(const FunctionCallbackInfo<Value> &args) {
	Isolate *isolate = args.GetIsolate();
   Local<v8::Context> context = isolate->GetCurrentContext();

	if (args.Length() < 2) {
		v8::Isolate::GetCurrent()->ThrowException(
		    v8::Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")
                                   .ToLocalChecked()));
		return;
	}

	if (not args[0]->IsNumber() or not args[1]->IsNumber()) {
		v8::Isolate::GetCurrent()->ThrowException(v8::Exception::TypeError(
		    String::NewFromUtf8(isolate, "Wrong arguments. Arguments must both be numbers")
          .ToLocalChecked()));
        return;
	}

	double a = args[0]->NumberValue(context).FromJust();
	double b = args[1]->NumberValue(context).FromJust();

	int ires = add(a, b);

	v8::Local<v8::Number> vres = v8::Number::New(isolate, static_cast<double>(ires));

	args.GetReturnValue().Set(vres);
}

void Initialize(Local<Object> exports) { NODE_SET_METHOD(exports, "add", Add); }

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
