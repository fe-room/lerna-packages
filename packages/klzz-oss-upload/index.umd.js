(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream'), require('events'), require('timers'), require('util'), require('url'), require('http'), require('https'), require('constants'), require('path'), require('querystring'), require('assert'), require('os'), require('fs'), require('child_process')) :
	typeof define === 'function' && define.amd ? define(['exports', 'stream', 'events', 'timers', 'util', 'url', 'http', 'https', 'constants', 'path', 'querystring', 'assert', 'os', 'fs', 'child_process'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.axios = {}, global.require$$0, global.require$$1, global.require$$4, global.util$1, global.urlutil, global.http, global.https, global.require$$1$1, global.path, global.querystring$1, global.assert, global.os, global.fs$1, global.child));
}(this, (function (exports, require$$0, require$$1, require$$4, util$1, urlutil, http, https, require$$1$1, path, querystring$1, assert, os, fs$1, child) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
	var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
	var util__default = /*#__PURE__*/_interopDefaultLegacy(util$1);
	var urlutil__default = /*#__PURE__*/_interopDefaultLegacy(urlutil);
	var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
	var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
	var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
	var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
	var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring$1);
	var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
	var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
	var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);
	var child__default = /*#__PURE__*/_interopDefaultLegacy(child);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var asyncToGenerator = createCommonjsModule(function (module) {
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	module.exports = _asyncToGenerator;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _asyncToGenerator = /*@__PURE__*/getDefaultExportFromCjs(asyncToGenerator);

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	var debug$2 = () => {
	  return () => {}
	};

	var streamWormhole = (stream, throwError) => {
	  return new Promise((resolve, reject) => {
	    if (typeof stream.resume !== 'function') {
	      return resolve();
	    }

	    // unpipe it
	    stream.unpipe && stream.unpipe();
	    // enable resume first
	    stream.resume();

	    if (stream._readableState && stream._readableState.ended) {
	      return resolve();
	    }
	    if (!stream.readable || stream.destroyed) {
	      return resolve();
	    }

	    function cleanup() {
	      stream.removeListener('end', onEnd);
	      stream.removeListener('close', onEnd);
	      stream.removeListener('error', onError);
	    }

	    function onEnd() {
	      cleanup();
	      resolve();
	    }

	    function onError(err) {
	      cleanup();
	      // don't throw error by default
	      if (throwError) {
	        reject(err);
	      } else {
	        resolve();
	      }
	    }

	    stream.on('end', onEnd);
	    stream.on('close', onEnd);
	    stream.on('error', onError);
	  });
	};

	var defaults = createCommonjsModule(function (module, exports) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  exports.defaults = {
	    "0.1": {
	      explicitCharkey: false,
	      trim: true,
	      normalize: true,
	      normalizeTags: false,
	      attrkey: "@",
	      charkey: "#",
	      explicitArray: false,
	      ignoreAttrs: false,
	      mergeAttrs: false,
	      explicitRoot: false,
	      validator: null,
	      xmlns: false,
	      explicitChildren: false,
	      childkey: '@@',
	      charsAsChildren: false,
	      includeWhiteChars: false,
	      async: false,
	      strict: true,
	      attrNameProcessors: null,
	      attrValueProcessors: null,
	      tagNameProcessors: null,
	      valueProcessors: null,
	      emptyTag: ''
	    },
	    "0.2": {
	      explicitCharkey: false,
	      trim: false,
	      normalize: false,
	      normalizeTags: false,
	      attrkey: "$",
	      charkey: "_",
	      explicitArray: true,
	      ignoreAttrs: false,
	      mergeAttrs: false,
	      explicitRoot: true,
	      validator: null,
	      xmlns: false,
	      explicitChildren: false,
	      preserveChildrenOrder: false,
	      childkey: '$$',
	      charsAsChildren: false,
	      includeWhiteChars: false,
	      async: false,
	      strict: true,
	      attrNameProcessors: null,
	      attrValueProcessors: null,
	      tagNameProcessors: null,
	      valueProcessors: null,
	      rootName: 'root',
	      xmldec: {
	        'version': '1.0',
	        'encoding': 'UTF-8',
	        'standalone': true
	      },
	      doctype: null,
	      renderOpts: {
	        'pretty': true,
	        'indent': '  ',
	        'newline': '\n'
	      },
	      headless: false,
	      chunkSize: 10000,
	      emptyTag: '',
	      cdata: false
	    }
	  };

	}).call(commonjsGlobal);
	});

	var Utility = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject,
	    slice = [].slice,
	    hasProp = {}.hasOwnProperty;

	  assign = function() {
	    var i, key, len, source, sources, target;
	    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (isFunction(Object.assign)) {
	      Object.assign.apply(null, arguments);
	    } else {
	      for (i = 0, len = sources.length; i < len; i++) {
	        source = sources[i];
	        if (source != null) {
	          for (key in source) {
	            if (!hasProp.call(source, key)) continue;
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };

	  isFunction = function(val) {
	    return !!val && Object.prototype.toString.call(val) === '[object Function]';
	  };

	  isObject = function(val) {
	    var ref;
	    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
	  };

	  isArray = function(val) {
	    if (isFunction(Array.isArray)) {
	      return Array.isArray(val);
	    } else {
	      return Object.prototype.toString.call(val) === '[object Array]';
	    }
	  };

	  isEmpty = function(val) {
	    var key;
	    if (isArray(val)) {
	      return !val.length;
	    } else {
	      for (key in val) {
	        if (!hasProp.call(val, key)) continue;
	        return false;
	      }
	      return true;
	    }
	  };

	  isPlainObject = function(val) {
	    var ctor, proto;
	    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
	  };

	  getValue = function(obj) {
	    if (isFunction(obj.valueOf)) {
	      return obj.valueOf();
	    } else {
	      return obj;
	    }
	  };

	  module.exports.assign = assign;

	  module.exports.isFunction = isFunction;

	  module.exports.isObject = isObject;

	  module.exports.isArray = isArray;

	  module.exports.isEmpty = isEmpty;

	  module.exports.isPlainObject = isPlainObject;

	  module.exports.getValue = getValue;

	}).call(commonjsGlobal);
	});

	var XMLDOMImplementation = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {

	  module.exports = (function() {
	    function XMLDOMImplementation() {}

	    XMLDOMImplementation.prototype.hasFeature = function(feature, version) {
	      return true;
	    };

	    XMLDOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    XMLDOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    XMLDOMImplementation.prototype.createHTMLDocument = function(title) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    XMLDOMImplementation.prototype.getFeature = function(feature, version) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    return XMLDOMImplementation;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLDOMErrorHandler = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {

	  module.exports = (function() {
	    function XMLDOMErrorHandler() {}

	    XMLDOMErrorHandler.prototype.handleError = function(error) {
	      throw new Error(error);
	    };

	    return XMLDOMErrorHandler;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLDOMStringList = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {

	  module.exports = (function() {
	    function XMLDOMStringList(arr) {
	      this.arr = arr || [];
	    }

	    Object.defineProperty(XMLDOMStringList.prototype, 'length', {
	      get: function() {
	        return this.arr.length;
	      }
	    });

	    XMLDOMStringList.prototype.item = function(index) {
	      return this.arr[index] || null;
	    };

	    XMLDOMStringList.prototype.contains = function(str) {
	      return this.arr.indexOf(str) !== -1;
	    };

	    return XMLDOMStringList;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLDOMConfiguration = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDOMErrorHandler$1, XMLDOMStringList$1;

	  XMLDOMErrorHandler$1 = XMLDOMErrorHandler;

	  XMLDOMStringList$1 = XMLDOMStringList;

	  module.exports = (function() {
	    function XMLDOMConfiguration() {
	      this.defaultParams = {
	        "canonical-form": false,
	        "cdata-sections": false,
	        "comments": false,
	        "datatype-normalization": false,
	        "element-content-whitespace": true,
	        "entities": true,
	        "error-handler": new XMLDOMErrorHandler$1(),
	        "infoset": true,
	        "validate-if-schema": false,
	        "namespaces": true,
	        "namespace-declarations": true,
	        "normalize-characters": false,
	        "schema-location": '',
	        "schema-type": '',
	        "split-cdata-sections": true,
	        "validate": false,
	        "well-formed": true
	      };
	      this.params = Object.create(this.defaultParams);
	    }

	    Object.defineProperty(XMLDOMConfiguration.prototype, 'parameterNames', {
	      get: function() {
	        return new XMLDOMStringList$1(Object.keys(this.defaultParams));
	      }
	    });

	    XMLDOMConfiguration.prototype.getParameter = function(name) {
	      if (this.params.hasOwnProperty(name)) {
	        return this.params[name];
	      } else {
	        return null;
	      }
	    };

	    XMLDOMConfiguration.prototype.canSetParameter = function(name, value) {
	      return true;
	    };

	    XMLDOMConfiguration.prototype.setParameter = function(name, value) {
	      if (value != null) {
	        return this.params[name] = value;
	      } else {
	        return delete this.params[name];
	      }
	    };

	    return XMLDOMConfiguration;

	  })();

	}).call(commonjsGlobal);
	});

	var NodeType$1 = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  module.exports = {
	    Element: 1,
	    Attribute: 2,
	    Text: 3,
	    CData: 4,
	    EntityReference: 5,
	    EntityDeclaration: 6,
	    ProcessingInstruction: 7,
	    Comment: 8,
	    Document: 9,
	    DocType: 10,
	    DocumentFragment: 11,
	    NotationDeclaration: 12,
	    Declaration: 201,
	    Raw: 202,
	    AttributeDeclaration: 203,
	    ElementDeclaration: 204,
	    Dummy: 205
	  };

	}).call(commonjsGlobal);
	});

	var XMLAttribute = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType;

	  NodeType = NodeType$1;

	  module.exports = (function() {
	    function XMLAttribute(parent, name, value) {
	      this.parent = parent;
	      if (this.parent) {
	        this.options = this.parent.options;
	        this.stringify = this.parent.stringify;
	      }
	      if (name == null) {
	        throw new Error("Missing attribute name. " + this.debugInfo(name));
	      }
	      this.name = this.stringify.name(name);
	      this.value = this.stringify.attValue(value);
	      this.type = NodeType.Attribute;
	      this.isId = false;
	      this.schemaTypeInfo = null;
	    }

	    Object.defineProperty(XMLAttribute.prototype, 'nodeType', {
	      get: function() {
	        return this.type;
	      }
	    });

	    Object.defineProperty(XMLAttribute.prototype, 'ownerElement', {
	      get: function() {
	        return this.parent;
	      }
	    });

	    Object.defineProperty(XMLAttribute.prototype, 'textContent', {
	      get: function() {
	        return this.value;
	      },
	      set: function(value) {
	        return this.value = value || '';
	      }
	    });

	    Object.defineProperty(XMLAttribute.prototype, 'namespaceURI', {
	      get: function() {
	        return '';
	      }
	    });

	    Object.defineProperty(XMLAttribute.prototype, 'prefix', {
	      get: function() {
	        return '';
	      }
	    });

	    Object.defineProperty(XMLAttribute.prototype, 'localName', {
	      get: function() {
	        return this.name;
	      }
	    });

	    Object.defineProperty(XMLAttribute.prototype, 'specified', {
	      get: function() {
	        return true;
	      }
	    });

	    XMLAttribute.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLAttribute.prototype.toString = function(options) {
	      return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
	    };

	    XMLAttribute.prototype.debugInfo = function(name) {
	      name = name || this.name;
	      if (name == null) {
	        return "parent: <" + this.parent.name + ">";
	      } else {
	        return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
	      }
	    };

	    XMLAttribute.prototype.isEqualNode = function(node) {
	      if (node.namespaceURI !== this.namespaceURI) {
	        return false;
	      }
	      if (node.prefix !== this.prefix) {
	        return false;
	      }
	      if (node.localName !== this.localName) {
	        return false;
	      }
	      if (node.value !== this.value) {
	        return false;
	      }
	      return true;
	    };

	    return XMLAttribute;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLNamedNodeMap = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {

	  module.exports = (function() {
	    function XMLNamedNodeMap(nodes) {
	      this.nodes = nodes;
	    }

	    Object.defineProperty(XMLNamedNodeMap.prototype, 'length', {
	      get: function() {
	        return Object.keys(this.nodes).length || 0;
	      }
	    });

	    XMLNamedNodeMap.prototype.clone = function() {
	      return this.nodes = null;
	    };

	    XMLNamedNodeMap.prototype.getNamedItem = function(name) {
	      return this.nodes[name];
	    };

	    XMLNamedNodeMap.prototype.setNamedItem = function(node) {
	      var oldNode;
	      oldNode = this.nodes[node.nodeName];
	      this.nodes[node.nodeName] = node;
	      return oldNode || null;
	    };

	    XMLNamedNodeMap.prototype.removeNamedItem = function(name) {
	      var oldNode;
	      oldNode = this.nodes[name];
	      delete this.nodes[name];
	      return oldNode || null;
	    };

	    XMLNamedNodeMap.prototype.item = function(index) {
	      return this.nodes[Object.keys(this.nodes)[index]] || null;
	    };

	    XMLNamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    XMLNamedNodeMap.prototype.setNamedItemNS = function(node) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    XMLNamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented.");
	    };

	    return XMLNamedNodeMap;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLElement = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLAttribute$1, XMLNamedNodeMap$1, XMLNode$1, getValue, isFunction, isObject, ref,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  ref = Utility, isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  XMLAttribute$1 = XMLAttribute;

	  XMLNamedNodeMap$1 = XMLNamedNodeMap;

	  module.exports = (function(superClass) {
	    extend(XMLElement, superClass);

	    function XMLElement(parent, name, attributes) {
	      var child, j, len, ref1;
	      XMLElement.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing element name. " + this.debugInfo());
	      }
	      this.name = this.stringify.name(name);
	      this.type = NodeType.Element;
	      this.attribs = {};
	      this.schemaTypeInfo = null;
	      if (attributes != null) {
	        this.attribute(attributes);
	      }
	      if (parent.type === NodeType.Document) {
	        this.isRoot = true;
	        this.documentObject = parent;
	        parent.rootObject = this;
	        if (parent.children) {
	          ref1 = parent.children;
	          for (j = 0, len = ref1.length; j < len; j++) {
	            child = ref1[j];
	            if (child.type === NodeType.DocType) {
	              child.name = this.name;
	              break;
	            }
	          }
	        }
	      }
	    }

	    Object.defineProperty(XMLElement.prototype, 'tagName', {
	      get: function() {
	        return this.name;
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'namespaceURI', {
	      get: function() {
	        return '';
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'prefix', {
	      get: function() {
	        return '';
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'localName', {
	      get: function() {
	        return this.name;
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'id', {
	      get: function() {
	        throw new Error("This DOM method is not implemented." + this.debugInfo());
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'className', {
	      get: function() {
	        throw new Error("This DOM method is not implemented." + this.debugInfo());
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'classList', {
	      get: function() {
	        throw new Error("This DOM method is not implemented." + this.debugInfo());
	      }
	    });

	    Object.defineProperty(XMLElement.prototype, 'attributes', {
	      get: function() {
	        if (!this.attributeMap || !this.attributeMap.nodes) {
	          this.attributeMap = new XMLNamedNodeMap$1(this.attribs);
	        }
	        return this.attributeMap;
	      }
	    });

	    XMLElement.prototype.clone = function() {
	      var att, attName, clonedSelf, ref1;
	      clonedSelf = Object.create(this);
	      if (clonedSelf.isRoot) {
	        clonedSelf.documentObject = null;
	      }
	      clonedSelf.attribs = {};
	      ref1 = this.attribs;
	      for (attName in ref1) {
	        if (!hasProp.call(ref1, attName)) continue;
	        att = ref1[attName];
	        clonedSelf.attribs[attName] = att.clone();
	      }
	      clonedSelf.children = [];
	      this.children.forEach(function(child) {
	        var clonedChild;
	        clonedChild = child.clone();
	        clonedChild.parent = clonedSelf;
	        return clonedSelf.children.push(clonedChild);
	      });
	      return clonedSelf;
	    };

	    XMLElement.prototype.attribute = function(name, value) {
	      var attName, attValue;
	      if (name != null) {
	        name = getValue(name);
	      }
	      if (isObject(name)) {
	        for (attName in name) {
	          if (!hasProp.call(name, attName)) continue;
	          attValue = name[attName];
	          this.attribute(attName, attValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        if (this.options.keepNullAttributes && (value == null)) {
	          this.attribs[name] = new XMLAttribute$1(this, name, "");
	        } else if (value != null) {
	          this.attribs[name] = new XMLAttribute$1(this, name, value);
	        }
	      }
	      return this;
	    };

	    XMLElement.prototype.removeAttribute = function(name) {
	      var attName, j, len;
	      if (name == null) {
	        throw new Error("Missing attribute name. " + this.debugInfo());
	      }
	      name = getValue(name);
	      if (Array.isArray(name)) {
	        for (j = 0, len = name.length; j < len; j++) {
	          attName = name[j];
	          delete this.attribs[attName];
	        }
	      } else {
	        delete this.attribs[name];
	      }
	      return this;
	    };

	    XMLElement.prototype.toString = function(options) {
	      return this.options.writer.element(this, this.options.writer.filterOptions(options));
	    };

	    XMLElement.prototype.att = function(name, value) {
	      return this.attribute(name, value);
	    };

	    XMLElement.prototype.a = function(name, value) {
	      return this.attribute(name, value);
	    };

	    XMLElement.prototype.getAttribute = function(name) {
	      if (this.attribs.hasOwnProperty(name)) {
	        return this.attribs[name].value;
	      } else {
	        return null;
	      }
	    };

	    XMLElement.prototype.setAttribute = function(name, value) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getAttributeNode = function(name) {
	      if (this.attribs.hasOwnProperty(name)) {
	        return this.attribs[name];
	      } else {
	        return null;
	      }
	    };

	    XMLElement.prototype.setAttributeNode = function(newAttr) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.removeAttributeNode = function(oldAttr) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getElementsByTagName = function(name) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getAttributeNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.removeAttributeNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.setAttributeNodeNS = function(newAttr) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.hasAttribute = function(name) {
	      return this.attribs.hasOwnProperty(name);
	    };

	    XMLElement.prototype.hasAttributeNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.setIdAttribute = function(name, isId) {
	      if (this.attribs.hasOwnProperty(name)) {
	        return this.attribs[name].isId;
	      } else {
	        return isId;
	      }
	    };

	    XMLElement.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.setIdAttributeNode = function(idAttr, isId) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getElementsByTagName = function(tagname) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.getElementsByClassName = function(classNames) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLElement.prototype.isEqualNode = function(node) {
	      var i, j, ref1;
	      if (!XMLElement.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
	        return false;
	      }
	      if (node.namespaceURI !== this.namespaceURI) {
	        return false;
	      }
	      if (node.prefix !== this.prefix) {
	        return false;
	      }
	      if (node.localName !== this.localName) {
	        return false;
	      }
	      if (node.attribs.length !== this.attribs.length) {
	        return false;
	      }
	      for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
	        if (!this.attribs[i].isEqualNode(node.attribs[i])) {
	          return false;
	        }
	      }
	      return true;
	    };

	    return XMLElement;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLCharacterData = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLNode$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode$1 = XMLNode;

	  module.exports = (function(superClass) {
	    extend(XMLCharacterData, superClass);

	    function XMLCharacterData(parent) {
	      XMLCharacterData.__super__.constructor.call(this, parent);
	      this.value = '';
	    }

	    Object.defineProperty(XMLCharacterData.prototype, 'data', {
	      get: function() {
	        return this.value;
	      },
	      set: function(value) {
	        return this.value = value || '';
	      }
	    });

	    Object.defineProperty(XMLCharacterData.prototype, 'length', {
	      get: function() {
	        return this.value.length;
	      }
	    });

	    Object.defineProperty(XMLCharacterData.prototype, 'textContent', {
	      get: function() {
	        return this.value;
	      },
	      set: function(value) {
	        return this.value = value || '';
	      }
	    });

	    XMLCharacterData.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLCharacterData.prototype.substringData = function(offset, count) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLCharacterData.prototype.appendData = function(arg) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLCharacterData.prototype.insertData = function(offset, arg) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLCharacterData.prototype.deleteData = function(offset, count) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLCharacterData.prototype.replaceData = function(offset, count, arg) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLCharacterData.prototype.isEqualNode = function(node) {
	      if (!XMLCharacterData.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
	        return false;
	      }
	      if (node.data !== this.data) {
	        return false;
	      }
	      return true;
	    };

	    return XMLCharacterData;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLCData = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLCharacterData$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  NodeType = NodeType$1;

	  XMLCharacterData$1 = XMLCharacterData;

	  module.exports = (function(superClass) {
	    extend(XMLCData, superClass);

	    function XMLCData(parent, text) {
	      XMLCData.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing CDATA text. " + this.debugInfo());
	      }
	      this.name = "#cdata-section";
	      this.type = NodeType.CData;
	      this.value = this.stringify.cdata(text);
	    }

	    XMLCData.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLCData.prototype.toString = function(options) {
	      return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
	    };

	    return XMLCData;

	  })(XMLCharacterData$1);

	}).call(commonjsGlobal);
	});

	var XMLComment = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLCharacterData$1, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  NodeType = NodeType$1;

	  XMLCharacterData$1 = XMLCharacterData;

	  module.exports = (function(superClass) {
	    extend(XMLComment, superClass);

	    function XMLComment(parent, text) {
	      XMLComment.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing comment text. " + this.debugInfo());
	      }
	      this.name = "#comment";
	      this.type = NodeType.Comment;
	      this.value = this.stringify.comment(text);
	    }

	    XMLComment.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLComment.prototype.toString = function(options) {
	      return this.options.writer.comment(this, this.options.writer.filterOptions(options));
	    };

	    return XMLComment;

	  })(XMLCharacterData$1);

	}).call(commonjsGlobal);
	});

	var XMLDeclaration = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1, isObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isObject = Utility.isObject;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  module.exports = (function(superClass) {
	    extend(XMLDeclaration, superClass);

	    function XMLDeclaration(parent, version, encoding, standalone) {
	      var ref;
	      XMLDeclaration.__super__.constructor.call(this, parent);
	      if (isObject(version)) {
	        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
	      }
	      if (!version) {
	        version = '1.0';
	      }
	      this.type = NodeType.Declaration;
	      this.version = this.stringify.xmlVersion(version);
	      if (encoding != null) {
	        this.encoding = this.stringify.xmlEncoding(encoding);
	      }
	      if (standalone != null) {
	        this.standalone = this.stringify.xmlStandalone(standalone);
	      }
	    }

	    XMLDeclaration.prototype.toString = function(options) {
	      return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
	    };

	    return XMLDeclaration;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLDTDAttList = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  module.exports = (function(superClass) {
	    extend(XMLDTDAttList, superClass);

	    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      XMLDTDAttList.__super__.constructor.call(this, parent);
	      if (elementName == null) {
	        throw new Error("Missing DTD element name. " + this.debugInfo());
	      }
	      if (attributeName == null) {
	        throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
	      }
	      if (!attributeType) {
	        throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
	      }
	      if (!defaultValueType) {
	        throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
	      }
	      if (defaultValueType.indexOf('#') !== 0) {
	        defaultValueType = '#' + defaultValueType;
	      }
	      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
	        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
	      }
	      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
	        throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
	      }
	      this.elementName = this.stringify.name(elementName);
	      this.type = NodeType.AttributeDeclaration;
	      this.attributeName = this.stringify.name(attributeName);
	      this.attributeType = this.stringify.dtdAttType(attributeType);
	      if (defaultValue) {
	        this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
	      }
	      this.defaultValueType = defaultValueType;
	    }

	    XMLDTDAttList.prototype.toString = function(options) {
	      return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
	    };

	    return XMLDTDAttList;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLDTDEntity = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1, isObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isObject = Utility.isObject;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  module.exports = (function(superClass) {
	    extend(XMLDTDEntity, superClass);

	    function XMLDTDEntity(parent, pe, name, value) {
	      XMLDTDEntity.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing DTD entity name. " + this.debugInfo(name));
	      }
	      if (value == null) {
	        throw new Error("Missing DTD entity value. " + this.debugInfo(name));
	      }
	      this.pe = !!pe;
	      this.name = this.stringify.name(name);
	      this.type = NodeType.EntityDeclaration;
	      if (!isObject(value)) {
	        this.value = this.stringify.dtdEntityValue(value);
	        this.internal = true;
	      } else {
	        if (!value.pubID && !value.sysID) {
	          throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
	        }
	        if (value.pubID && !value.sysID) {
	          throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
	        }
	        this.internal = false;
	        if (value.pubID != null) {
	          this.pubID = this.stringify.dtdPubID(value.pubID);
	        }
	        if (value.sysID != null) {
	          this.sysID = this.stringify.dtdSysID(value.sysID);
	        }
	        if (value.nData != null) {
	          this.nData = this.stringify.dtdNData(value.nData);
	        }
	        if (this.pe && this.nData) {
	          throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
	        }
	      }
	    }

	    Object.defineProperty(XMLDTDEntity.prototype, 'publicId', {
	      get: function() {
	        return this.pubID;
	      }
	    });

	    Object.defineProperty(XMLDTDEntity.prototype, 'systemId', {
	      get: function() {
	        return this.sysID;
	      }
	    });

	    Object.defineProperty(XMLDTDEntity.prototype, 'notationName', {
	      get: function() {
	        return this.nData || null;
	      }
	    });

	    Object.defineProperty(XMLDTDEntity.prototype, 'inputEncoding', {
	      get: function() {
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDTDEntity.prototype, 'xmlEncoding', {
	      get: function() {
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDTDEntity.prototype, 'xmlVersion', {
	      get: function() {
	        return null;
	      }
	    });

	    XMLDTDEntity.prototype.toString = function(options) {
	      return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
	    };

	    return XMLDTDEntity;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLDTDElement = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  module.exports = (function(superClass) {
	    extend(XMLDTDElement, superClass);

	    function XMLDTDElement(parent, name, value) {
	      XMLDTDElement.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing DTD element name. " + this.debugInfo());
	      }
	      if (!value) {
	        value = '(#PCDATA)';
	      }
	      if (Array.isArray(value)) {
	        value = '(' + value.join(',') + ')';
	      }
	      this.name = this.stringify.name(name);
	      this.type = NodeType.ElementDeclaration;
	      this.value = this.stringify.dtdElementValue(value);
	    }

	    XMLDTDElement.prototype.toString = function(options) {
	      return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
	    };

	    return XMLDTDElement;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLDTDNotation = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  module.exports = (function(superClass) {
	    extend(XMLDTDNotation, superClass);

	    function XMLDTDNotation(parent, name, value) {
	      XMLDTDNotation.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing DTD notation name. " + this.debugInfo(name));
	      }
	      if (!value.pubID && !value.sysID) {
	        throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
	      }
	      this.name = this.stringify.name(name);
	      this.type = NodeType.NotationDeclaration;
	      if (value.pubID != null) {
	        this.pubID = this.stringify.dtdPubID(value.pubID);
	      }
	      if (value.sysID != null) {
	        this.sysID = this.stringify.dtdSysID(value.sysID);
	      }
	    }

	    Object.defineProperty(XMLDTDNotation.prototype, 'publicId', {
	      get: function() {
	        return this.pubID;
	      }
	    });

	    Object.defineProperty(XMLDTDNotation.prototype, 'systemId', {
	      get: function() {
	        return this.sysID;
	      }
	    });

	    XMLDTDNotation.prototype.toString = function(options) {
	      return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
	    };

	    return XMLDTDNotation;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLDocType = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLDTDAttList$1, XMLDTDElement$1, XMLDTDEntity$1, XMLDTDNotation$1, XMLNamedNodeMap$1, XMLNode$1, isObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isObject = Utility.isObject;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  XMLDTDAttList$1 = XMLDTDAttList;

	  XMLDTDEntity$1 = XMLDTDEntity;

	  XMLDTDElement$1 = XMLDTDElement;

	  XMLDTDNotation$1 = XMLDTDNotation;

	  XMLNamedNodeMap$1 = XMLNamedNodeMap;

	  module.exports = (function(superClass) {
	    extend(XMLDocType, superClass);

	    function XMLDocType(parent, pubID, sysID) {
	      var child, i, len, ref, ref1, ref2;
	      XMLDocType.__super__.constructor.call(this, parent);
	      this.type = NodeType.DocType;
	      if (parent.children) {
	        ref = parent.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          if (child.type === NodeType.Element) {
	            this.name = child.name;
	            break;
	          }
	        }
	      }
	      this.documentObject = parent;
	      if (isObject(pubID)) {
	        ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
	      }
	      if (sysID == null) {
	        ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
	      }
	      if (pubID != null) {
	        this.pubID = this.stringify.dtdPubID(pubID);
	      }
	      if (sysID != null) {
	        this.sysID = this.stringify.dtdSysID(sysID);
	      }
	    }

	    Object.defineProperty(XMLDocType.prototype, 'entities', {
	      get: function() {
	        var child, i, len, nodes, ref;
	        nodes = {};
	        ref = this.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          if ((child.type === NodeType.EntityDeclaration) && !child.pe) {
	            nodes[child.name] = child;
	          }
	        }
	        return new XMLNamedNodeMap$1(nodes);
	      }
	    });

	    Object.defineProperty(XMLDocType.prototype, 'notations', {
	      get: function() {
	        var child, i, len, nodes, ref;
	        nodes = {};
	        ref = this.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          if (child.type === NodeType.NotationDeclaration) {
	            nodes[child.name] = child;
	          }
	        }
	        return new XMLNamedNodeMap$1(nodes);
	      }
	    });

	    Object.defineProperty(XMLDocType.prototype, 'publicId', {
	      get: function() {
	        return this.pubID;
	      }
	    });

	    Object.defineProperty(XMLDocType.prototype, 'systemId', {
	      get: function() {
	        return this.sysID;
	      }
	    });

	    Object.defineProperty(XMLDocType.prototype, 'internalSubset', {
	      get: function() {
	        throw new Error("This DOM method is not implemented." + this.debugInfo());
	      }
	    });

	    XMLDocType.prototype.element = function(name, value) {
	      var child;
	      child = new XMLDTDElement$1(this, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      var child;
	      child = new XMLDTDAttList$1(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.entity = function(name, value) {
	      var child;
	      child = new XMLDTDEntity$1(this, false, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.pEntity = function(name, value) {
	      var child;
	      child = new XMLDTDEntity$1(this, true, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.notation = function(name, value) {
	      var child;
	      child = new XMLDTDNotation$1(this, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.toString = function(options) {
	      return this.options.writer.docType(this, this.options.writer.filterOptions(options));
	    };

	    XMLDocType.prototype.ele = function(name, value) {
	      return this.element(name, value);
	    };

	    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
	    };

	    XMLDocType.prototype.ent = function(name, value) {
	      return this.entity(name, value);
	    };

	    XMLDocType.prototype.pent = function(name, value) {
	      return this.pEntity(name, value);
	    };

	    XMLDocType.prototype.not = function(name, value) {
	      return this.notation(name, value);
	    };

	    XMLDocType.prototype.up = function() {
	      return this.root() || this.documentObject;
	    };

	    XMLDocType.prototype.isEqualNode = function(node) {
	      if (!XMLDocType.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
	        return false;
	      }
	      if (node.name !== this.name) {
	        return false;
	      }
	      if (node.publicId !== this.publicId) {
	        return false;
	      }
	      if (node.systemId !== this.systemId) {
	        return false;
	      }
	      return true;
	    };

	    return XMLDocType;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLRaw = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  NodeType = NodeType$1;

	  XMLNode$1 = XMLNode;

	  module.exports = (function(superClass) {
	    extend(XMLRaw, superClass);

	    function XMLRaw(parent, text) {
	      XMLRaw.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing raw text. " + this.debugInfo());
	      }
	      this.type = NodeType.Raw;
	      this.value = this.stringify.raw(text);
	    }

	    XMLRaw.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLRaw.prototype.toString = function(options) {
	      return this.options.writer.raw(this, this.options.writer.filterOptions(options));
	    };

	    return XMLRaw;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLText = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLCharacterData$1, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  NodeType = NodeType$1;

	  XMLCharacterData$1 = XMLCharacterData;

	  module.exports = (function(superClass) {
	    extend(XMLText, superClass);

	    function XMLText(parent, text) {
	      XMLText.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing element text. " + this.debugInfo());
	      }
	      this.name = "#text";
	      this.type = NodeType.Text;
	      this.value = this.stringify.text(text);
	    }

	    Object.defineProperty(XMLText.prototype, 'isElementContentWhitespace', {
	      get: function() {
	        throw new Error("This DOM method is not implemented." + this.debugInfo());
	      }
	    });

	    Object.defineProperty(XMLText.prototype, 'wholeText', {
	      get: function() {
	        var next, prev, str;
	        str = '';
	        prev = this.previousSibling;
	        while (prev) {
	          str = prev.data + str;
	          prev = prev.previousSibling;
	        }
	        str += this.data;
	        next = this.nextSibling;
	        while (next) {
	          str = str + next.data;
	          next = next.nextSibling;
	        }
	        return str;
	      }
	    });

	    XMLText.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLText.prototype.toString = function(options) {
	      return this.options.writer.text(this, this.options.writer.filterOptions(options));
	    };

	    XMLText.prototype.splitText = function(offset) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLText.prototype.replaceWholeText = function(content) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    return XMLText;

	  })(XMLCharacterData$1);

	}).call(commonjsGlobal);
	});

	var XMLProcessingInstruction = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLCharacterData$1, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  NodeType = NodeType$1;

	  XMLCharacterData$1 = XMLCharacterData;

	  module.exports = (function(superClass) {
	    extend(XMLProcessingInstruction, superClass);

	    function XMLProcessingInstruction(parent, target, value) {
	      XMLProcessingInstruction.__super__.constructor.call(this, parent);
	      if (target == null) {
	        throw new Error("Missing instruction target. " + this.debugInfo());
	      }
	      this.type = NodeType.ProcessingInstruction;
	      this.target = this.stringify.insTarget(target);
	      this.name = this.target;
	      if (value) {
	        this.value = this.stringify.insValue(value);
	      }
	    }

	    XMLProcessingInstruction.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLProcessingInstruction.prototype.toString = function(options) {
	      return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
	    };

	    XMLProcessingInstruction.prototype.isEqualNode = function(node) {
	      if (!XMLProcessingInstruction.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
	        return false;
	      }
	      if (node.target !== this.target) {
	        return false;
	      }
	      return true;
	    };

	    return XMLProcessingInstruction;

	  })(XMLCharacterData$1);

	}).call(commonjsGlobal);
	});

	var XMLDummy = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLNode$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  module.exports = (function(superClass) {
	    extend(XMLDummy, superClass);

	    function XMLDummy(parent) {
	      XMLDummy.__super__.constructor.call(this, parent);
	      this.type = NodeType.Dummy;
	    }

	    XMLDummy.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLDummy.prototype.toString = function(options) {
	      return '';
	    };

	    return XMLDummy;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLNodeList = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {

	  module.exports = (function() {
	    function XMLNodeList(nodes) {
	      this.nodes = nodes;
	    }

	    Object.defineProperty(XMLNodeList.prototype, 'length', {
	      get: function() {
	        return this.nodes.length || 0;
	      }
	    });

	    XMLNodeList.prototype.clone = function() {
	      return this.nodes = null;
	    };

	    XMLNodeList.prototype.item = function(index) {
	      return this.nodes[index] || null;
	    };

	    return XMLNodeList;

	  })();

	}).call(commonjsGlobal);
	});

	var DocumentPosition = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  module.exports = {
	    Disconnected: 1,
	    Preceding: 2,
	    Following: 4,
	    Contains: 8,
	    ContainedBy: 16,
	    ImplementationSpecific: 32
	  };

	}).call(commonjsGlobal);
	});

	var XMLNode = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var DocumentPosition$1, NodeType, XMLCData$1, XMLComment$1, XMLDeclaration$1, XMLDocType$1, XMLDummy$1, XMLElement$1, XMLNodeList$1, XMLProcessingInstruction$1, XMLRaw$1, XMLText$1, getValue, isEmpty, isFunction, isObject, ref1,
	    hasProp = {}.hasOwnProperty;

	  ref1 = Utility, isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;

	  XMLElement$1 = null;

	  XMLCData$1 = null;

	  XMLComment$1 = null;

	  XMLDeclaration$1 = null;

	  XMLDocType$1 = null;

	  XMLRaw$1 = null;

	  XMLText$1 = null;

	  XMLProcessingInstruction$1 = null;

	  XMLDummy$1 = null;

	  NodeType = null;

	  XMLNodeList$1 = null;

	  DocumentPosition$1 = null;

	  module.exports = (function() {
	    function XMLNode(parent1) {
	      this.parent = parent1;
	      if (this.parent) {
	        this.options = this.parent.options;
	        this.stringify = this.parent.stringify;
	      }
	      this.value = null;
	      this.children = [];
	      this.baseURI = null;
	      if (!XMLElement$1) {
	        XMLElement$1 = XMLElement;
	        XMLCData$1 = XMLCData;
	        XMLComment$1 = XMLComment;
	        XMLDeclaration$1 = XMLDeclaration;
	        XMLDocType$1 = XMLDocType;
	        XMLRaw$1 = XMLRaw;
	        XMLText$1 = XMLText;
	        XMLProcessingInstruction$1 = XMLProcessingInstruction;
	        XMLDummy$1 = XMLDummy;
	        NodeType = NodeType$1;
	        XMLNodeList$1 = XMLNodeList;
	        DocumentPosition$1 = DocumentPosition;
	      }
	    }

	    Object.defineProperty(XMLNode.prototype, 'nodeName', {
	      get: function() {
	        return this.name;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'nodeType', {
	      get: function() {
	        return this.type;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'nodeValue', {
	      get: function() {
	        return this.value;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'parentNode', {
	      get: function() {
	        return this.parent;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'childNodes', {
	      get: function() {
	        if (!this.childNodeList || !this.childNodeList.nodes) {
	          this.childNodeList = new XMLNodeList$1(this.children);
	        }
	        return this.childNodeList;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'firstChild', {
	      get: function() {
	        return this.children[0] || null;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'lastChild', {
	      get: function() {
	        return this.children[this.children.length - 1] || null;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'previousSibling', {
	      get: function() {
	        var i;
	        i = this.parent.children.indexOf(this);
	        return this.parent.children[i - 1] || null;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'nextSibling', {
	      get: function() {
	        var i;
	        i = this.parent.children.indexOf(this);
	        return this.parent.children[i + 1] || null;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'ownerDocument', {
	      get: function() {
	        return this.document() || null;
	      }
	    });

	    Object.defineProperty(XMLNode.prototype, 'textContent', {
	      get: function() {
	        var child, j, len, ref2, str;
	        if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
	          str = '';
	          ref2 = this.children;
	          for (j = 0, len = ref2.length; j < len; j++) {
	            child = ref2[j];
	            if (child.textContent) {
	              str += child.textContent;
	            }
	          }
	          return str;
	        } else {
	          return null;
	        }
	      },
	      set: function(value) {
	        throw new Error("This DOM method is not implemented." + this.debugInfo());
	      }
	    });

	    XMLNode.prototype.setParent = function(parent) {
	      var child, j, len, ref2, results;
	      this.parent = parent;
	      if (parent) {
	        this.options = parent.options;
	        this.stringify = parent.stringify;
	      }
	      ref2 = this.children;
	      results = [];
	      for (j = 0, len = ref2.length; j < len; j++) {
	        child = ref2[j];
	        results.push(child.setParent(this));
	      }
	      return results;
	    };

	    XMLNode.prototype.element = function(name, attributes, text) {
	      var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
	      lastChild = null;
	      if (attributes === null && (text == null)) {
	        ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
	      }
	      if (attributes == null) {
	        attributes = {};
	      }
	      attributes = getValue(attributes);
	      if (!isObject(attributes)) {
	        ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
	      }
	      if (name != null) {
	        name = getValue(name);
	      }
	      if (Array.isArray(name)) {
	        for (j = 0, len = name.length; j < len; j++) {
	          item = name[j];
	          lastChild = this.element(item);
	        }
	      } else if (isFunction(name)) {
	        lastChild = this.element(name.apply());
	      } else if (isObject(name)) {
	        for (key in name) {
	          if (!hasProp.call(name, key)) continue;
	          val = name[key];
	          if (isFunction(val)) {
	            val = val.apply();
	          }
	          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
	            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
	          } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
	            lastChild = this.dummy();
	          } else if (isObject(val) && isEmpty(val)) {
	            lastChild = this.element(key);
	          } else if (!this.options.keepNullNodes && (val == null)) {
	            lastChild = this.dummy();
	          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
	            for (k = 0, len1 = val.length; k < len1; k++) {
	              item = val[k];
	              childNode = {};
	              childNode[key] = item;
	              lastChild = this.element(childNode);
	            }
	          } else if (isObject(val)) {
	            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
	              lastChild = this.element(val);
	            } else {
	              lastChild = this.element(key);
	              lastChild.element(val);
	            }
	          } else {
	            lastChild = this.element(key, val);
	          }
	        }
	      } else if (!this.options.keepNullNodes && text === null) {
	        lastChild = this.dummy();
	      } else {
	        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
	          lastChild = this.text(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
	          lastChild = this.cdata(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
	          lastChild = this.comment(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
	          lastChild = this.raw(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
	          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
	        } else {
	          lastChild = this.node(name, attributes, text);
	        }
	      }
	      if (lastChild == null) {
	        throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
	      }
	      return lastChild;
	    };

	    XMLNode.prototype.insertBefore = function(name, attributes, text) {
	      var child, i, newChild, refChild, removed;
	      if (name != null ? name.type : void 0) {
	        newChild = name;
	        refChild = attributes;
	        newChild.setParent(this);
	        if (refChild) {
	          i = children.indexOf(refChild);
	          removed = children.splice(i);
	          children.push(newChild);
	          Array.prototype.push.apply(children, removed);
	        } else {
	          children.push(newChild);
	        }
	        return newChild;
	      } else {
	        if (this.isRoot) {
	          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
	        }
	        i = this.parent.children.indexOf(this);
	        removed = this.parent.children.splice(i);
	        child = this.parent.element(name, attributes, text);
	        Array.prototype.push.apply(this.parent.children, removed);
	        return child;
	      }
	    };

	    XMLNode.prototype.insertAfter = function(name, attributes, text) {
	      var child, i, removed;
	      if (this.isRoot) {
	        throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
	      }
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      child = this.parent.element(name, attributes, text);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return child;
	    };

	    XMLNode.prototype.remove = function() {
	      var i, ref2;
	      if (this.isRoot) {
	        throw new Error("Cannot remove the root element. " + this.debugInfo());
	      }
	      i = this.parent.children.indexOf(this);
	      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref2 = [])), ref2;
	      return this.parent;
	    };

	    XMLNode.prototype.node = function(name, attributes, text) {
	      var child, ref2;
	      if (name != null) {
	        name = getValue(name);
	      }
	      attributes || (attributes = {});
	      attributes = getValue(attributes);
	      if (!isObject(attributes)) {
	        ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
	      }
	      child = new XMLElement$1(this, name, attributes);
	      if (text != null) {
	        child.text(text);
	      }
	      this.children.push(child);
	      return child;
	    };

	    XMLNode.prototype.text = function(value) {
	      var child;
	      if (isObject(value)) {
	        this.element(value);
	      }
	      child = new XMLText$1(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.cdata = function(value) {
	      var child;
	      child = new XMLCData$1(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.comment = function(value) {
	      var child;
	      child = new XMLComment$1(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.commentBefore = function(value) {
	      var i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i);
	      this.parent.comment(value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.commentAfter = function(value) {
	      var i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      this.parent.comment(value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.raw = function(value) {
	      var child;
	      child = new XMLRaw$1(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.dummy = function() {
	      var child;
	      child = new XMLDummy$1(this);
	      return child;
	    };

	    XMLNode.prototype.instruction = function(target, value) {
	      var insTarget, insValue, instruction, j, len;
	      if (target != null) {
	        target = getValue(target);
	      }
	      if (value != null) {
	        value = getValue(value);
	      }
	      if (Array.isArray(target)) {
	        for (j = 0, len = target.length; j < len; j++) {
	          insTarget = target[j];
	          this.instruction(insTarget);
	        }
	      } else if (isObject(target)) {
	        for (insTarget in target) {
	          if (!hasProp.call(target, insTarget)) continue;
	          insValue = target[insTarget];
	          this.instruction(insTarget, insValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        instruction = new XMLProcessingInstruction$1(this, target, value);
	        this.children.push(instruction);
	      }
	      return this;
	    };

	    XMLNode.prototype.instructionBefore = function(target, value) {
	      var i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i);
	      this.parent.instruction(target, value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.instructionAfter = function(target, value) {
	      var i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      this.parent.instruction(target, value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.declaration = function(version, encoding, standalone) {
	      var doc, xmldec;
	      doc = this.document();
	      xmldec = new XMLDeclaration$1(doc, version, encoding, standalone);
	      if (doc.children.length === 0) {
	        doc.children.unshift(xmldec);
	      } else if (doc.children[0].type === NodeType.Declaration) {
	        doc.children[0] = xmldec;
	      } else {
	        doc.children.unshift(xmldec);
	      }
	      return doc.root() || doc;
	    };

	    XMLNode.prototype.dtd = function(pubID, sysID) {
	      var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
	      doc = this.document();
	      doctype = new XMLDocType$1(doc, pubID, sysID);
	      ref2 = doc.children;
	      for (i = j = 0, len = ref2.length; j < len; i = ++j) {
	        child = ref2[i];
	        if (child.type === NodeType.DocType) {
	          doc.children[i] = doctype;
	          return doctype;
	        }
	      }
	      ref3 = doc.children;
	      for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
	        child = ref3[i];
	        if (child.isRoot) {
	          doc.children.splice(i, 0, doctype);
	          return doctype;
	        }
	      }
	      doc.children.push(doctype);
	      return doctype;
	    };

	    XMLNode.prototype.up = function() {
	      if (this.isRoot) {
	        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
	      }
	      return this.parent;
	    };

	    XMLNode.prototype.root = function() {
	      var node;
	      node = this;
	      while (node) {
	        if (node.type === NodeType.Document) {
	          return node.rootObject;
	        } else if (node.isRoot) {
	          return node;
	        } else {
	          node = node.parent;
	        }
	      }
	    };

	    XMLNode.prototype.document = function() {
	      var node;
	      node = this;
	      while (node) {
	        if (node.type === NodeType.Document) {
	          return node;
	        } else {
	          node = node.parent;
	        }
	      }
	    };

	    XMLNode.prototype.end = function(options) {
	      return this.document().end(options);
	    };

	    XMLNode.prototype.prev = function() {
	      var i;
	      i = this.parent.children.indexOf(this);
	      if (i < 1) {
	        throw new Error("Already at the first node. " + this.debugInfo());
	      }
	      return this.parent.children[i - 1];
	    };

	    XMLNode.prototype.next = function() {
	      var i;
	      i = this.parent.children.indexOf(this);
	      if (i === -1 || i === this.parent.children.length - 1) {
	        throw new Error("Already at the last node. " + this.debugInfo());
	      }
	      return this.parent.children[i + 1];
	    };

	    XMLNode.prototype.importDocument = function(doc) {
	      var clonedRoot;
	      clonedRoot = doc.root().clone();
	      clonedRoot.parent = this;
	      clonedRoot.isRoot = false;
	      this.children.push(clonedRoot);
	      return this;
	    };

	    XMLNode.prototype.debugInfo = function(name) {
	      var ref2, ref3;
	      name = name || this.name;
	      if ((name == null) && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
	        return "";
	      } else if (name == null) {
	        return "parent: <" + this.parent.name + ">";
	      } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
	        return "node: <" + name + ">";
	      } else {
	        return "node: <" + name + ">, parent: <" + this.parent.name + ">";
	      }
	    };

	    XMLNode.prototype.ele = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLNode.prototype.nod = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLNode.prototype.txt = function(value) {
	      return this.text(value);
	    };

	    XMLNode.prototype.dat = function(value) {
	      return this.cdata(value);
	    };

	    XMLNode.prototype.com = function(value) {
	      return this.comment(value);
	    };

	    XMLNode.prototype.ins = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLNode.prototype.doc = function() {
	      return this.document();
	    };

	    XMLNode.prototype.dec = function(version, encoding, standalone) {
	      return this.declaration(version, encoding, standalone);
	    };

	    XMLNode.prototype.e = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLNode.prototype.n = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLNode.prototype.t = function(value) {
	      return this.text(value);
	    };

	    XMLNode.prototype.d = function(value) {
	      return this.cdata(value);
	    };

	    XMLNode.prototype.c = function(value) {
	      return this.comment(value);
	    };

	    XMLNode.prototype.r = function(value) {
	      return this.raw(value);
	    };

	    XMLNode.prototype.i = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLNode.prototype.u = function() {
	      return this.up();
	    };

	    XMLNode.prototype.importXMLBuilder = function(doc) {
	      return this.importDocument(doc);
	    };

	    XMLNode.prototype.replaceChild = function(newChild, oldChild) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.removeChild = function(oldChild) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.appendChild = function(newChild) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.hasChildNodes = function() {
	      return this.children.length !== 0;
	    };

	    XMLNode.prototype.cloneNode = function(deep) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.normalize = function() {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.isSupported = function(feature, version) {
	      return true;
	    };

	    XMLNode.prototype.hasAttributes = function() {
	      return this.attribs.length !== 0;
	    };

	    XMLNode.prototype.compareDocumentPosition = function(other) {
	      var ref, res;
	      ref = this;
	      if (ref === other) {
	        return 0;
	      } else if (this.document() !== other.document()) {
	        res = DocumentPosition$1.Disconnected | DocumentPosition$1.ImplementationSpecific;
	        if (Math.random() < 0.5) {
	          res |= DocumentPosition$1.Preceding;
	        } else {
	          res |= DocumentPosition$1.Following;
	        }
	        return res;
	      } else if (ref.isAncestor(other)) {
	        return DocumentPosition$1.Contains | DocumentPosition$1.Preceding;
	      } else if (ref.isDescendant(other)) {
	        return DocumentPosition$1.Contains | DocumentPosition$1.Following;
	      } else if (ref.isPreceding(other)) {
	        return DocumentPosition$1.Preceding;
	      } else {
	        return DocumentPosition$1.Following;
	      }
	    };

	    XMLNode.prototype.isSameNode = function(other) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.lookupPrefix = function(namespaceURI) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.isDefaultNamespace = function(namespaceURI) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.lookupNamespaceURI = function(prefix) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.isEqualNode = function(node) {
	      var i, j, ref2;
	      if (node.nodeType !== this.nodeType) {
	        return false;
	      }
	      if (node.children.length !== this.children.length) {
	        return false;
	      }
	      for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
	        if (!this.children[i].isEqualNode(node.children[i])) {
	          return false;
	        }
	      }
	      return true;
	    };

	    XMLNode.prototype.getFeature = function(feature, version) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.setUserData = function(key, data, handler) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.getUserData = function(key) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLNode.prototype.contains = function(other) {
	      if (!other) {
	        return false;
	      }
	      return other === this || this.isDescendant(other);
	    };

	    XMLNode.prototype.isDescendant = function(node) {
	      var child, isDescendantChild, j, len, ref2;
	      ref2 = this.children;
	      for (j = 0, len = ref2.length; j < len; j++) {
	        child = ref2[j];
	        if (node === child) {
	          return true;
	        }
	        isDescendantChild = child.isDescendant(node);
	        if (isDescendantChild) {
	          return true;
	        }
	      }
	      return false;
	    };

	    XMLNode.prototype.isAncestor = function(node) {
	      return node.isDescendant(this);
	    };

	    XMLNode.prototype.isPreceding = function(node) {
	      var nodePos, thisPos;
	      nodePos = this.treePosition(node);
	      thisPos = this.treePosition(this);
	      if (nodePos === -1 || thisPos === -1) {
	        return false;
	      } else {
	        return nodePos < thisPos;
	      }
	    };

	    XMLNode.prototype.isFollowing = function(node) {
	      var nodePos, thisPos;
	      nodePos = this.treePosition(node);
	      thisPos = this.treePosition(this);
	      if (nodePos === -1 || thisPos === -1) {
	        return false;
	      } else {
	        return nodePos > thisPos;
	      }
	    };

	    XMLNode.prototype.treePosition = function(node) {
	      var found, pos;
	      pos = 0;
	      found = false;
	      this.foreachTreeNode(this.document(), function(childNode) {
	        pos++;
	        if (!found && childNode === node) {
	          return found = true;
	        }
	      });
	      if (found) {
	        return pos;
	      } else {
	        return -1;
	      }
	    };

	    XMLNode.prototype.foreachTreeNode = function(node, func) {
	      var child, j, len, ref2, res;
	      node || (node = this.document());
	      ref2 = node.children;
	      for (j = 0, len = ref2.length; j < len; j++) {
	        child = ref2[j];
	        if (res = func(child)) {
	          return res;
	        } else {
	          res = this.foreachTreeNode(child, func);
	          if (res) {
	            return res;
	          }
	        }
	      }
	    };

	    return XMLNode;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLStringifier = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    hasProp = {}.hasOwnProperty;

	  module.exports = (function() {
	    function XMLStringifier(options) {
	      this.assertLegalName = bind(this.assertLegalName, this);
	      this.assertLegalChar = bind(this.assertLegalChar, this);
	      var key, ref, value;
	      options || (options = {});
	      this.options = options;
	      if (!this.options.version) {
	        this.options.version = '1.0';
	      }
	      ref = options.stringify || {};
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this[key] = value;
	      }
	    }

	    XMLStringifier.prototype.name = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalName('' + val || '');
	    };

	    XMLStringifier.prototype.text = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar(this.textEscape('' + val || ''));
	    };

	    XMLStringifier.prototype.cdata = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      val = '' + val || '';
	      val = val.replace(']]>', ']]]]><![CDATA[>');
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.comment = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      val = '' + val || '';
	      if (val.match(/--/)) {
	        throw new Error("Comment text cannot contain double-hypen: " + val);
	      }
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.raw = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.attValue = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar(this.attEscape(val = '' + val || ''));
	    };

	    XMLStringifier.prototype.insTarget = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.insValue = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      val = '' + val || '';
	      if (val.match(/\?>/)) {
	        throw new Error("Invalid processing instruction value: " + val);
	      }
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.xmlVersion = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      val = '' + val || '';
	      if (!val.match(/1\.[0-9]+/)) {
	        throw new Error("Invalid version number: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlEncoding = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      val = '' + val || '';
	      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
	        throw new Error("Invalid encoding: " + val);
	      }
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.xmlStandalone = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      if (val) {
	        return "yes";
	      } else {
	        return "no";
	      }
	    };

	    XMLStringifier.prototype.dtdPubID = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.dtdSysID = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.dtdElementValue = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.dtdAttType = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.dtdAttDefault = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.dtdEntityValue = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.dtdNData = function(val) {
	      if (this.options.noValidation) {
	        return val;
	      }
	      return this.assertLegalChar('' + val || '');
	    };

	    XMLStringifier.prototype.convertAttKey = '@';

	    XMLStringifier.prototype.convertPIKey = '?';

	    XMLStringifier.prototype.convertTextKey = '#text';

	    XMLStringifier.prototype.convertCDataKey = '#cdata';

	    XMLStringifier.prototype.convertCommentKey = '#comment';

	    XMLStringifier.prototype.convertRawKey = '#raw';

	    XMLStringifier.prototype.assertLegalChar = function(str) {
	      var regex, res;
	      if (this.options.noValidation) {
	        return str;
	      }
	      regex = '';
	      if (this.options.version === '1.0') {
	        regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	        if (res = str.match(regex)) {
	          throw new Error("Invalid character in string: " + str + " at index " + res.index);
	        }
	      } else if (this.options.version === '1.1') {
	        regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	        if (res = str.match(regex)) {
	          throw new Error("Invalid character in string: " + str + " at index " + res.index);
	        }
	      }
	      return str;
	    };

	    XMLStringifier.prototype.assertLegalName = function(str) {
	      var regex;
	      if (this.options.noValidation) {
	        return str;
	      }
	      this.assertLegalChar(str);
	      regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
	      if (!str.match(regex)) {
	        throw new Error("Invalid character in name");
	      }
	      return str;
	    };

	    XMLStringifier.prototype.textEscape = function(str) {
	      var ampregex;
	      if (this.options.noValidation) {
	        return str;
	      }
	      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
	      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
	    };

	    XMLStringifier.prototype.attEscape = function(str) {
	      var ampregex;
	      if (this.options.noValidation) {
	        return str;
	      }
	      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
	      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
	    };

	    return XMLStringifier;

	  })();

	}).call(commonjsGlobal);
	});

	var WriterState = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  module.exports = {
	    None: 0,
	    OpenTag: 1,
	    InsideTag: 2,
	    CloseTag: 3
	  };

	}).call(commonjsGlobal);
	});

	var XMLWriterBase = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, WriterState$1, assign,
	    hasProp = {}.hasOwnProperty;

	  assign = Utility.assign;

	  NodeType = NodeType$1;

	  WriterState$1 = WriterState;

	  module.exports = (function() {
	    function XMLWriterBase(options) {
	      var key, ref, value;
	      options || (options = {});
	      this.options = options;
	      ref = options.writer || {};
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this["_" + key] = this[key];
	        this[key] = value;
	      }
	    }

	    XMLWriterBase.prototype.filterOptions = function(options) {
	      var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
	      options || (options = {});
	      options = assign({}, this.options, options);
	      filteredOptions = {
	        writer: this
	      };
	      filteredOptions.pretty = options.pretty || false;
	      filteredOptions.allowEmpty = options.allowEmpty || false;
	      filteredOptions.indent = (ref = options.indent) != null ? ref : '  ';
	      filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : '\n';
	      filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
	      filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
	      filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : '';
	      if (filteredOptions.spaceBeforeSlash === true) {
	        filteredOptions.spaceBeforeSlash = ' ';
	      }
	      filteredOptions.suppressPrettyCount = 0;
	      filteredOptions.user = {};
	      filteredOptions.state = WriterState$1.None;
	      return filteredOptions;
	    };

	    XMLWriterBase.prototype.indent = function(node, options, level) {
	      var indentLevel;
	      if (!options.pretty || options.suppressPrettyCount) {
	        return '';
	      } else if (options.pretty) {
	        indentLevel = (level || 0) + options.offset + 1;
	        if (indentLevel > 0) {
	          return new Array(indentLevel).join(options.indent);
	        }
	      }
	      return '';
	    };

	    XMLWriterBase.prototype.endline = function(node, options, level) {
	      if (!options.pretty || options.suppressPrettyCount) {
	        return '';
	      } else {
	        return options.newline;
	      }
	    };

	    XMLWriterBase.prototype.attribute = function(att, options, level) {
	      var r;
	      this.openAttribute(att, options, level);
	      r = ' ' + att.name + '="' + att.value + '"';
	      this.closeAttribute(att, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.cdata = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<![CDATA[';
	      options.state = WriterState$1.InsideTag;
	      r += node.value;
	      options.state = WriterState$1.CloseTag;
	      r += ']]>' + this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.comment = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<!-- ';
	      options.state = WriterState$1.InsideTag;
	      r += node.value;
	      options.state = WriterState$1.CloseTag;
	      r += ' -->' + this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.declaration = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<?xml';
	      options.state = WriterState$1.InsideTag;
	      r += ' version="' + node.version + '"';
	      if (node.encoding != null) {
	        r += ' encoding="' + node.encoding + '"';
	      }
	      if (node.standalone != null) {
	        r += ' standalone="' + node.standalone + '"';
	      }
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '?>';
	      r += this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.docType = function(node, options, level) {
	      var child, i, len, r, ref;
	      level || (level = 0);
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level);
	      r += '<!DOCTYPE ' + node.root().name;
	      if (node.pubID && node.sysID) {
	        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	      } else if (node.sysID) {
	        r += ' SYSTEM "' + node.sysID + '"';
	      }
	      if (node.children.length > 0) {
	        r += ' [';
	        r += this.endline(node, options, level);
	        options.state = WriterState$1.InsideTag;
	        ref = node.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          r += this.writeChildNode(child, options, level + 1);
	        }
	        options.state = WriterState$1.CloseTag;
	        r += ']';
	      }
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '>';
	      r += this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.element = function(node, options, level) {
	      var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
	      level || (level = 0);
	      prettySuppressed = false;
	      r = '';
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r += this.indent(node, options, level) + '<' + node.name;
	      ref = node.attribs;
	      for (name in ref) {
	        if (!hasProp.call(ref, name)) continue;
	        att = ref[name];
	        r += this.attribute(att, options, level);
	      }
	      childNodeCount = node.children.length;
	      firstChildNode = childNodeCount === 0 ? null : node.children[0];
	      if (childNodeCount === 0 || node.children.every(function(e) {
	        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
	      })) {
	        if (options.allowEmpty) {
	          r += '>';
	          options.state = WriterState$1.CloseTag;
	          r += '</' + node.name + '>' + this.endline(node, options, level);
	        } else {
	          options.state = WriterState$1.CloseTag;
	          r += options.spaceBeforeSlash + '/>' + this.endline(node, options, level);
	        }
	      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
	        r += '>';
	        options.state = WriterState$1.InsideTag;
	        options.suppressPrettyCount++;
	        prettySuppressed = true;
	        r += this.writeChildNode(firstChildNode, options, level + 1);
	        options.suppressPrettyCount--;
	        prettySuppressed = false;
	        options.state = WriterState$1.CloseTag;
	        r += '</' + node.name + '>' + this.endline(node, options, level);
	      } else {
	        if (options.dontPrettyTextNodes) {
	          ref1 = node.children;
	          for (i = 0, len = ref1.length; i < len; i++) {
	            child = ref1[i];
	            if ((child.type === NodeType.Text || child.type === NodeType.Raw) && (child.value != null)) {
	              options.suppressPrettyCount++;
	              prettySuppressed = true;
	              break;
	            }
	          }
	        }
	        r += '>' + this.endline(node, options, level);
	        options.state = WriterState$1.InsideTag;
	        ref2 = node.children;
	        for (j = 0, len1 = ref2.length; j < len1; j++) {
	          child = ref2[j];
	          r += this.writeChildNode(child, options, level + 1);
	        }
	        options.state = WriterState$1.CloseTag;
	        r += this.indent(node, options, level) + '</' + node.name + '>';
	        if (prettySuppressed) {
	          options.suppressPrettyCount--;
	        }
	        r += this.endline(node, options, level);
	        options.state = WriterState$1.None;
	      }
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.writeChildNode = function(node, options, level) {
	      switch (node.type) {
	        case NodeType.CData:
	          return this.cdata(node, options, level);
	        case NodeType.Comment:
	          return this.comment(node, options, level);
	        case NodeType.Element:
	          return this.element(node, options, level);
	        case NodeType.Raw:
	          return this.raw(node, options, level);
	        case NodeType.Text:
	          return this.text(node, options, level);
	        case NodeType.ProcessingInstruction:
	          return this.processingInstruction(node, options, level);
	        case NodeType.Dummy:
	          return '';
	        case NodeType.Declaration:
	          return this.declaration(node, options, level);
	        case NodeType.DocType:
	          return this.docType(node, options, level);
	        case NodeType.AttributeDeclaration:
	          return this.dtdAttList(node, options, level);
	        case NodeType.ElementDeclaration:
	          return this.dtdElement(node, options, level);
	        case NodeType.EntityDeclaration:
	          return this.dtdEntity(node, options, level);
	        case NodeType.NotationDeclaration:
	          return this.dtdNotation(node, options, level);
	        default:
	          throw new Error("Unknown XML node type: " + node.constructor.name);
	      }
	    };

	    XMLWriterBase.prototype.processingInstruction = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<?';
	      options.state = WriterState$1.InsideTag;
	      r += node.target;
	      if (node.value) {
	        r += ' ' + node.value;
	      }
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '?>';
	      r += this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.raw = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level);
	      options.state = WriterState$1.InsideTag;
	      r += node.value;
	      options.state = WriterState$1.CloseTag;
	      r += this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.text = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level);
	      options.state = WriterState$1.InsideTag;
	      r += node.value;
	      options.state = WriterState$1.CloseTag;
	      r += this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.dtdAttList = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<!ATTLIST';
	      options.state = WriterState$1.InsideTag;
	      r += ' ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
	      if (node.defaultValueType !== '#DEFAULT') {
	        r += ' ' + node.defaultValueType;
	      }
	      if (node.defaultValue) {
	        r += ' "' + node.defaultValue + '"';
	      }
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.dtdElement = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<!ELEMENT';
	      options.state = WriterState$1.InsideTag;
	      r += ' ' + node.name + ' ' + node.value;
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.dtdEntity = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<!ENTITY';
	      options.state = WriterState$1.InsideTag;
	      if (node.pe) {
	        r += ' %';
	      }
	      r += ' ' + node.name;
	      if (node.value) {
	        r += ' "' + node.value + '"';
	      } else {
	        if (node.pubID && node.sysID) {
	          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	        } else if (node.sysID) {
	          r += ' SYSTEM "' + node.sysID + '"';
	        }
	        if (node.nData) {
	          r += ' NDATA ' + node.nData;
	        }
	      }
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.dtdNotation = function(node, options, level) {
	      var r;
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      r = this.indent(node, options, level) + '<!NOTATION';
	      options.state = WriterState$1.InsideTag;
	      r += ' ' + node.name;
	      if (node.pubID && node.sysID) {
	        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	      } else if (node.pubID) {
	        r += ' PUBLIC "' + node.pubID + '"';
	      } else if (node.sysID) {
	        r += ' SYSTEM "' + node.sysID + '"';
	      }
	      options.state = WriterState$1.CloseTag;
	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
	      options.state = WriterState$1.None;
	      this.closeNode(node, options, level);
	      return r;
	    };

	    XMLWriterBase.prototype.openNode = function(node, options, level) {};

	    XMLWriterBase.prototype.closeNode = function(node, options, level) {};

	    XMLWriterBase.prototype.openAttribute = function(att, options, level) {};

	    XMLWriterBase.prototype.closeAttribute = function(att, options, level) {};

	    return XMLWriterBase;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLStringWriter = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLWriterBase$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLWriterBase$1 = XMLWriterBase;

	  module.exports = (function(superClass) {
	    extend(XMLStringWriter, superClass);

	    function XMLStringWriter(options) {
	      XMLStringWriter.__super__.constructor.call(this, options);
	    }

	    XMLStringWriter.prototype.document = function(doc, options) {
	      var child, i, len, r, ref;
	      options = this.filterOptions(options);
	      r = '';
	      ref = doc.children;
	      for (i = 0, len = ref.length; i < len; i++) {
	        child = ref[i];
	        r += this.writeChildNode(child, options, 0);
	      }
	      if (options.pretty && r.slice(-options.newline.length) === options.newline) {
	        r = r.slice(0, -options.newline.length);
	      }
	      return r;
	    };

	    return XMLStringWriter;

	  })(XMLWriterBase$1);

	}).call(commonjsGlobal);
	});

	var XMLDocument = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, XMLDOMConfiguration$1, XMLDOMImplementation$1, XMLNode$1, XMLStringWriter$1, XMLStringifier$1, isPlainObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isPlainObject = Utility.isPlainObject;

	  XMLDOMImplementation$1 = XMLDOMImplementation;

	  XMLDOMConfiguration$1 = XMLDOMConfiguration;

	  XMLNode$1 = XMLNode;

	  NodeType = NodeType$1;

	  XMLStringifier$1 = XMLStringifier;

	  XMLStringWriter$1 = XMLStringWriter;

	  module.exports = (function(superClass) {
	    extend(XMLDocument, superClass);

	    function XMLDocument(options) {
	      XMLDocument.__super__.constructor.call(this, null);
	      this.name = "#document";
	      this.type = NodeType.Document;
	      this.documentURI = null;
	      this.domConfig = new XMLDOMConfiguration$1();
	      options || (options = {});
	      if (!options.writer) {
	        options.writer = new XMLStringWriter$1();
	      }
	      this.options = options;
	      this.stringify = new XMLStringifier$1(options);
	    }

	    Object.defineProperty(XMLDocument.prototype, 'implementation', {
	      value: new XMLDOMImplementation$1()
	    });

	    Object.defineProperty(XMLDocument.prototype, 'doctype', {
	      get: function() {
	        var child, i, len, ref;
	        ref = this.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          if (child.type === NodeType.DocType) {
	            return child;
	          }
	        }
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'documentElement', {
	      get: function() {
	        return this.rootObject || null;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'inputEncoding', {
	      get: function() {
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'strictErrorChecking', {
	      get: function() {
	        return false;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'xmlEncoding', {
	      get: function() {
	        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
	          return this.children[0].encoding;
	        } else {
	          return null;
	        }
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'xmlStandalone', {
	      get: function() {
	        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
	          return this.children[0].standalone === 'yes';
	        } else {
	          return false;
	        }
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'xmlVersion', {
	      get: function() {
	        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
	          return this.children[0].version;
	        } else {
	          return "1.0";
	        }
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'URL', {
	      get: function() {
	        return this.documentURI;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'origin', {
	      get: function() {
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'compatMode', {
	      get: function() {
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'characterSet', {
	      get: function() {
	        return null;
	      }
	    });

	    Object.defineProperty(XMLDocument.prototype, 'contentType', {
	      get: function() {
	        return null;
	      }
	    });

	    XMLDocument.prototype.end = function(writer) {
	      var writerOptions;
	      writerOptions = {};
	      if (!writer) {
	        writer = this.options.writer;
	      } else if (isPlainObject(writer)) {
	        writerOptions = writer;
	        writer = this.options.writer;
	      }
	      return writer.document(this, writer.filterOptions(writerOptions));
	    };

	    XMLDocument.prototype.toString = function(options) {
	      return this.options.writer.document(this, this.options.writer.filterOptions(options));
	    };

	    XMLDocument.prototype.createElement = function(tagName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createDocumentFragment = function() {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createTextNode = function(data) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createComment = function(data) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createCDATASection = function(data) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createProcessingInstruction = function(target, data) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createAttribute = function(name) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createEntityReference = function(name) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.getElementsByTagName = function(tagname) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.importNode = function(importedNode, deep) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createElementNS = function(namespaceURI, qualifiedName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.getElementById = function(elementId) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.adoptNode = function(source) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.normalizeDocument = function() {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.getElementsByClassName = function(classNames) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createEvent = function(eventInterface) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createRange = function() {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createNodeIterator = function(root, whatToShow, filter) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    XMLDocument.prototype.createTreeWalker = function(root, whatToShow, filter) {
	      throw new Error("This DOM method is not implemented." + this.debugInfo());
	    };

	    return XMLDocument;

	  })(XMLNode$1);

	}).call(commonjsGlobal);
	});

	var XMLDocumentCB = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, WriterState$1, XMLAttribute$1, XMLCData$1, XMLComment$1, XMLDTDAttList$1, XMLDTDElement$1, XMLDTDEntity$1, XMLDTDNotation$1, XMLDeclaration$1, XMLDocType$1, XMLDocument$1, XMLElement$1, XMLProcessingInstruction$1, XMLRaw$1, XMLStringWriter$1, XMLStringifier$1, XMLText$1, getValue, isFunction, isObject, isPlainObject, ref,
	    hasProp = {}.hasOwnProperty;

	  ref = Utility, isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;

	  NodeType = NodeType$1;

	  XMLDocument$1 = XMLDocument;

	  XMLElement$1 = XMLElement;

	  XMLCData$1 = XMLCData;

	  XMLComment$1 = XMLComment;

	  XMLRaw$1 = XMLRaw;

	  XMLText$1 = XMLText;

	  XMLProcessingInstruction$1 = XMLProcessingInstruction;

	  XMLDeclaration$1 = XMLDeclaration;

	  XMLDocType$1 = XMLDocType;

	  XMLDTDAttList$1 = XMLDTDAttList;

	  XMLDTDEntity$1 = XMLDTDEntity;

	  XMLDTDElement$1 = XMLDTDElement;

	  XMLDTDNotation$1 = XMLDTDNotation;

	  XMLAttribute$1 = XMLAttribute;

	  XMLStringifier$1 = XMLStringifier;

	  XMLStringWriter$1 = XMLStringWriter;

	  WriterState$1 = WriterState;

	  module.exports = (function() {
	    function XMLDocumentCB(options, onData, onEnd) {
	      var writerOptions;
	      this.name = "?xml";
	      this.type = NodeType.Document;
	      options || (options = {});
	      writerOptions = {};
	      if (!options.writer) {
	        options.writer = new XMLStringWriter$1();
	      } else if (isPlainObject(options.writer)) {
	        writerOptions = options.writer;
	        options.writer = new XMLStringWriter$1();
	      }
	      this.options = options;
	      this.writer = options.writer;
	      this.writerOptions = this.writer.filterOptions(writerOptions);
	      this.stringify = new XMLStringifier$1(options);
	      this.onDataCallback = onData || function() {};
	      this.onEndCallback = onEnd || function() {};
	      this.currentNode = null;
	      this.currentLevel = -1;
	      this.openTags = {};
	      this.documentStarted = false;
	      this.documentCompleted = false;
	      this.root = null;
	    }

	    XMLDocumentCB.prototype.createChildNode = function(node) {
	      var att, attName, attributes, child, i, len, ref1, ref2;
	      switch (node.type) {
	        case NodeType.CData:
	          this.cdata(node.value);
	          break;
	        case NodeType.Comment:
	          this.comment(node.value);
	          break;
	        case NodeType.Element:
	          attributes = {};
	          ref1 = node.attribs;
	          for (attName in ref1) {
	            if (!hasProp.call(ref1, attName)) continue;
	            att = ref1[attName];
	            attributes[attName] = att.value;
	          }
	          this.node(node.name, attributes);
	          break;
	        case NodeType.Dummy:
	          this.dummy();
	          break;
	        case NodeType.Raw:
	          this.raw(node.value);
	          break;
	        case NodeType.Text:
	          this.text(node.value);
	          break;
	        case NodeType.ProcessingInstruction:
	          this.instruction(node.target, node.value);
	          break;
	        default:
	          throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
	      }
	      ref2 = node.children;
	      for (i = 0, len = ref2.length; i < len; i++) {
	        child = ref2[i];
	        this.createChildNode(child);
	        if (child.type === NodeType.Element) {
	          this.up();
	        }
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.dummy = function() {
	      return this;
	    };

	    XMLDocumentCB.prototype.node = function(name, attributes, text) {
	      var ref1;
	      if (name == null) {
	        throw new Error("Missing node name.");
	      }
	      if (this.root && this.currentLevel === -1) {
	        throw new Error("Document can only have one root node. " + this.debugInfo(name));
	      }
	      this.openCurrent();
	      name = getValue(name);
	      if (attributes == null) {
	        attributes = {};
	      }
	      attributes = getValue(attributes);
	      if (!isObject(attributes)) {
	        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
	      }
	      this.currentNode = new XMLElement$1(this, name, attributes);
	      this.currentNode.children = false;
	      this.currentLevel++;
	      this.openTags[this.currentLevel] = this.currentNode;
	      if (text != null) {
	        this.text(text);
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.element = function(name, attributes, text) {
	      var child, i, len, oldValidationFlag, ref1, root;
	      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
	        this.dtdElement.apply(this, arguments);
	      } else {
	        if (Array.isArray(name) || isObject(name) || isFunction(name)) {
	          oldValidationFlag = this.options.noValidation;
	          this.options.noValidation = true;
	          root = new XMLDocument$1(this.options).element('TEMP_ROOT');
	          root.element(name);
	          this.options.noValidation = oldValidationFlag;
	          ref1 = root.children;
	          for (i = 0, len = ref1.length; i < len; i++) {
	            child = ref1[i];
	            this.createChildNode(child);
	            if (child.type === NodeType.Element) {
	              this.up();
	            }
	          }
	        } else {
	          this.node(name, attributes, text);
	        }
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.attribute = function(name, value) {
	      var attName, attValue;
	      if (!this.currentNode || this.currentNode.children) {
	        throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
	      }
	      if (name != null) {
	        name = getValue(name);
	      }
	      if (isObject(name)) {
	        for (attName in name) {
	          if (!hasProp.call(name, attName)) continue;
	          attValue = name[attName];
	          this.attribute(attName, attValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        if (this.options.keepNullAttributes && (value == null)) {
	          this.currentNode.attribs[name] = new XMLAttribute$1(this, name, "");
	        } else if (value != null) {
	          this.currentNode.attribs[name] = new XMLAttribute$1(this, name, value);
	        }
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.text = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLText$1(this, value);
	      this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.cdata = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLCData$1(this, value);
	      this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.comment = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLComment$1(this, value);
	      this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.raw = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLRaw$1(this, value);
	      this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.instruction = function(target, value) {
	      var i, insTarget, insValue, len, node;
	      this.openCurrent();
	      if (target != null) {
	        target = getValue(target);
	      }
	      if (value != null) {
	        value = getValue(value);
	      }
	      if (Array.isArray(target)) {
	        for (i = 0, len = target.length; i < len; i++) {
	          insTarget = target[i];
	          this.instruction(insTarget);
	        }
	      } else if (isObject(target)) {
	        for (insTarget in target) {
	          if (!hasProp.call(target, insTarget)) continue;
	          insValue = target[insTarget];
	          this.instruction(insTarget, insValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        node = new XMLProcessingInstruction$1(this, target, value);
	        this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
	      var node;
	      this.openCurrent();
	      if (this.documentStarted) {
	        throw new Error("declaration() must be the first node.");
	      }
	      node = new XMLDeclaration$1(this, version, encoding, standalone);
	      this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
	      this.openCurrent();
	      if (root == null) {
	        throw new Error("Missing root node name.");
	      }
	      if (this.root) {
	        throw new Error("dtd() must come before the root node.");
	      }
	      this.currentNode = new XMLDocType$1(this, pubID, sysID);
	      this.currentNode.rootNodeName = root;
	      this.currentNode.children = false;
	      this.currentLevel++;
	      this.openTags[this.currentLevel] = this.currentNode;
	      return this;
	    };

	    XMLDocumentCB.prototype.dtdElement = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDElement$1(this, name, value);
	      this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDAttList$1(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
	      this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.entity = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDEntity$1(this, false, name, value);
	      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.pEntity = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDEntity$1(this, true, name, value);
	      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.notation = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDNotation$1(this, name, value);
	      this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
	      return this;
	    };

	    XMLDocumentCB.prototype.up = function() {
	      if (this.currentLevel < 0) {
	        throw new Error("The document node has no parent.");
	      }
	      if (this.currentNode) {
	        if (this.currentNode.children) {
	          this.closeNode(this.currentNode);
	        } else {
	          this.openNode(this.currentNode);
	        }
	        this.currentNode = null;
	      } else {
	        this.closeNode(this.openTags[this.currentLevel]);
	      }
	      delete this.openTags[this.currentLevel];
	      this.currentLevel--;
	      return this;
	    };

	    XMLDocumentCB.prototype.end = function() {
	      while (this.currentLevel >= 0) {
	        this.up();
	      }
	      return this.onEnd();
	    };

	    XMLDocumentCB.prototype.openCurrent = function() {
	      if (this.currentNode) {
	        this.currentNode.children = true;
	        return this.openNode(this.currentNode);
	      }
	    };

	    XMLDocumentCB.prototype.openNode = function(node) {
	      var att, chunk, name, ref1;
	      if (!node.isOpen) {
	        if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
	          this.root = node;
	        }
	        chunk = '';
	        if (node.type === NodeType.Element) {
	          this.writerOptions.state = WriterState$1.OpenTag;
	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<' + node.name;
	          ref1 = node.attribs;
	          for (name in ref1) {
	            if (!hasProp.call(ref1, name)) continue;
	            att = ref1[name];
	            chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
	          }
	          chunk += (node.children ? '>' : '/>') + this.writer.endline(node, this.writerOptions, this.currentLevel);
	          this.writerOptions.state = WriterState$1.InsideTag;
	        } else {
	          this.writerOptions.state = WriterState$1.OpenTag;
	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<!DOCTYPE ' + node.rootNodeName;
	          if (node.pubID && node.sysID) {
	            chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	          } else if (node.sysID) {
	            chunk += ' SYSTEM "' + node.sysID + '"';
	          }
	          if (node.children) {
	            chunk += ' [';
	            this.writerOptions.state = WriterState$1.InsideTag;
	          } else {
	            this.writerOptions.state = WriterState$1.CloseTag;
	            chunk += '>';
	          }
	          chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
	        }
	        this.onData(chunk, this.currentLevel);
	        return node.isOpen = true;
	      }
	    };

	    XMLDocumentCB.prototype.closeNode = function(node) {
	      var chunk;
	      if (!node.isClosed) {
	        chunk = '';
	        this.writerOptions.state = WriterState$1.CloseTag;
	        if (node.type === NodeType.Element) {
	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '</' + node.name + '>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
	        } else {
	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + ']>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
	        }
	        this.writerOptions.state = WriterState$1.None;
	        this.onData(chunk, this.currentLevel);
	        return node.isClosed = true;
	      }
	    };

	    XMLDocumentCB.prototype.onData = function(chunk, level) {
	      this.documentStarted = true;
	      return this.onDataCallback(chunk, level + 1);
	    };

	    XMLDocumentCB.prototype.onEnd = function() {
	      this.documentCompleted = true;
	      return this.onEndCallback();
	    };

	    XMLDocumentCB.prototype.debugInfo = function(name) {
	      if (name == null) {
	        return "";
	      } else {
	        return "node: <" + name + ">";
	      }
	    };

	    XMLDocumentCB.prototype.ele = function() {
	      return this.element.apply(this, arguments);
	    };

	    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLDocumentCB.prototype.txt = function(value) {
	      return this.text(value);
	    };

	    XMLDocumentCB.prototype.dat = function(value) {
	      return this.cdata(value);
	    };

	    XMLDocumentCB.prototype.com = function(value) {
	      return this.comment(value);
	    };

	    XMLDocumentCB.prototype.ins = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
	      return this.declaration(version, encoding, standalone);
	    };

	    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
	      return this.doctype(root, pubID, sysID);
	    };

	    XMLDocumentCB.prototype.e = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLDocumentCB.prototype.n = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLDocumentCB.prototype.t = function(value) {
	      return this.text(value);
	    };

	    XMLDocumentCB.prototype.d = function(value) {
	      return this.cdata(value);
	    };

	    XMLDocumentCB.prototype.c = function(value) {
	      return this.comment(value);
	    };

	    XMLDocumentCB.prototype.r = function(value) {
	      return this.raw(value);
	    };

	    XMLDocumentCB.prototype.i = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLDocumentCB.prototype.att = function() {
	      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
	        return this.attList.apply(this, arguments);
	      } else {
	        return this.attribute.apply(this, arguments);
	      }
	    };

	    XMLDocumentCB.prototype.a = function() {
	      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
	        return this.attList.apply(this, arguments);
	      } else {
	        return this.attribute.apply(this, arguments);
	      }
	    };

	    XMLDocumentCB.prototype.ent = function(name, value) {
	      return this.entity(name, value);
	    };

	    XMLDocumentCB.prototype.pent = function(name, value) {
	      return this.pEntity(name, value);
	    };

	    XMLDocumentCB.prototype.not = function(name, value) {
	      return this.notation(name, value);
	    };

	    return XMLDocumentCB;

	  })();

	}).call(commonjsGlobal);
	});

	var XMLStreamWriter = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, WriterState$1, XMLWriterBase$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  NodeType = NodeType$1;

	  XMLWriterBase$1 = XMLWriterBase;

	  WriterState$1 = WriterState;

	  module.exports = (function(superClass) {
	    extend(XMLStreamWriter, superClass);

	    function XMLStreamWriter(stream, options) {
	      this.stream = stream;
	      XMLStreamWriter.__super__.constructor.call(this, options);
	    }

	    XMLStreamWriter.prototype.endline = function(node, options, level) {
	      if (node.isLastRootNode && options.state === WriterState$1.CloseTag) {
	        return '';
	      } else {
	        return XMLStreamWriter.__super__.endline.call(this, node, options, level);
	      }
	    };

	    XMLStreamWriter.prototype.document = function(doc, options) {
	      var child, i, j, k, len, len1, ref, ref1, results;
	      ref = doc.children;
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        child = ref[i];
	        child.isLastRootNode = i === doc.children.length - 1;
	      }
	      options = this.filterOptions(options);
	      ref1 = doc.children;
	      results = [];
	      for (k = 0, len1 = ref1.length; k < len1; k++) {
	        child = ref1[k];
	        results.push(this.writeChildNode(child, options, 0));
	      }
	      return results;
	    };

	    XMLStreamWriter.prototype.attribute = function(att, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.attribute.call(this, att, options, level));
	    };

	    XMLStreamWriter.prototype.cdata = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.cdata.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.comment = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.comment.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.declaration = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.declaration.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.docType = function(node, options, level) {
	      var child, j, len, ref;
	      level || (level = 0);
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      this.stream.write(this.indent(node, options, level));
	      this.stream.write('<!DOCTYPE ' + node.root().name);
	      if (node.pubID && node.sysID) {
	        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
	      } else if (node.sysID) {
	        this.stream.write(' SYSTEM "' + node.sysID + '"');
	      }
	      if (node.children.length > 0) {
	        this.stream.write(' [');
	        this.stream.write(this.endline(node, options, level));
	        options.state = WriterState$1.InsideTag;
	        ref = node.children;
	        for (j = 0, len = ref.length; j < len; j++) {
	          child = ref[j];
	          this.writeChildNode(child, options, level + 1);
	        }
	        options.state = WriterState$1.CloseTag;
	        this.stream.write(']');
	      }
	      options.state = WriterState$1.CloseTag;
	      this.stream.write(options.spaceBeforeSlash + '>');
	      this.stream.write(this.endline(node, options, level));
	      options.state = WriterState$1.None;
	      return this.closeNode(node, options, level);
	    };

	    XMLStreamWriter.prototype.element = function(node, options, level) {
	      var att, child, childNodeCount, firstChildNode, j, len, name, ref, ref1;
	      level || (level = 0);
	      this.openNode(node, options, level);
	      options.state = WriterState$1.OpenTag;
	      this.stream.write(this.indent(node, options, level) + '<' + node.name);
	      ref = node.attribs;
	      for (name in ref) {
	        if (!hasProp.call(ref, name)) continue;
	        att = ref[name];
	        this.attribute(att, options, level);
	      }
	      childNodeCount = node.children.length;
	      firstChildNode = childNodeCount === 0 ? null : node.children[0];
	      if (childNodeCount === 0 || node.children.every(function(e) {
	        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
	      })) {
	        if (options.allowEmpty) {
	          this.stream.write('>');
	          options.state = WriterState$1.CloseTag;
	          this.stream.write('</' + node.name + '>');
	        } else {
	          options.state = WriterState$1.CloseTag;
	          this.stream.write(options.spaceBeforeSlash + '/>');
	        }
	      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
	        this.stream.write('>');
	        options.state = WriterState$1.InsideTag;
	        options.suppressPrettyCount++;
	        this.writeChildNode(firstChildNode, options, level + 1);
	        options.suppressPrettyCount--;
	        options.state = WriterState$1.CloseTag;
	        this.stream.write('</' + node.name + '>');
	      } else {
	        this.stream.write('>' + this.endline(node, options, level));
	        options.state = WriterState$1.InsideTag;
	        ref1 = node.children;
	        for (j = 0, len = ref1.length; j < len; j++) {
	          child = ref1[j];
	          this.writeChildNode(child, options, level + 1);
	        }
	        options.state = WriterState$1.CloseTag;
	        this.stream.write(this.indent(node, options, level) + '</' + node.name + '>');
	      }
	      this.stream.write(this.endline(node, options, level));
	      options.state = WriterState$1.None;
	      return this.closeNode(node, options, level);
	    };

	    XMLStreamWriter.prototype.processingInstruction = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.processingInstruction.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.raw = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.raw.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.text = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.text.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.dtdAttList = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.dtdAttList.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.dtdElement = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.dtdElement.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.dtdEntity = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.dtdEntity.call(this, node, options, level));
	    };

	    XMLStreamWriter.prototype.dtdNotation = function(node, options, level) {
	      return this.stream.write(XMLStreamWriter.__super__.dtdNotation.call(this, node, options, level));
	    };

	    return XMLStreamWriter;

	  })(XMLWriterBase$1);

	}).call(commonjsGlobal);
	});

	var lib = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var NodeType, WriterState$1, XMLDOMImplementation$1, XMLDocument$1, XMLDocumentCB$1, XMLStreamWriter$1, XMLStringWriter$1, assign, isFunction, ref;

	  ref = Utility, assign = ref.assign, isFunction = ref.isFunction;

	  XMLDOMImplementation$1 = XMLDOMImplementation;

	  XMLDocument$1 = XMLDocument;

	  XMLDocumentCB$1 = XMLDocumentCB;

	  XMLStringWriter$1 = XMLStringWriter;

	  XMLStreamWriter$1 = XMLStreamWriter;

	  NodeType = NodeType$1;

	  WriterState$1 = WriterState;

	  module.exports.create = function(name, xmldec, doctype, options) {
	    var doc, root;
	    if (name == null) {
	      throw new Error("Root element needs a name.");
	    }
	    options = assign({}, xmldec, doctype, options);
	    doc = new XMLDocument$1(options);
	    root = doc.element(name);
	    if (!options.headless) {
	      doc.declaration(options);
	      if ((options.pubID != null) || (options.sysID != null)) {
	        doc.dtd(options);
	      }
	    }
	    return root;
	  };

	  module.exports.begin = function(options, onData, onEnd) {
	    var ref1;
	    if (isFunction(options)) {
	      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
	      options = {};
	    }
	    if (onData) {
	      return new XMLDocumentCB$1(options, onData, onEnd);
	    } else {
	      return new XMLDocument$1(options);
	    }
	  };

	  module.exports.stringWriter = function(options) {
	    return new XMLStringWriter$1(options);
	  };

	  module.exports.streamWriter = function(stream, options) {
	    return new XMLStreamWriter$1(stream, options);
	  };

	  module.exports.implementation = new XMLDOMImplementation$1();

	  module.exports.nodeType = NodeType;

	  module.exports.writerState = WriterState$1;

	}).call(commonjsGlobal);
	});

	var builder = createCommonjsModule(function (module, exports) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var builder, defaults$1, escapeCDATA, requiresCDATA, wrapCDATA,
	    hasProp = {}.hasOwnProperty;

	  builder = lib;

	  defaults$1 = defaults.defaults;

	  requiresCDATA = function(entry) {
	    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
	  };

	  wrapCDATA = function(entry) {
	    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
	  };

	  escapeCDATA = function(entry) {
	    return entry.replace(']]>', ']]]]><![CDATA[>');
	  };

	  exports.Builder = (function() {
	    function Builder(opts) {
	      var key, ref, value;
	      this.options = {};
	      ref = defaults$1["0.2"];
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this.options[key] = value;
	      }
	      for (key in opts) {
	        if (!hasProp.call(opts, key)) continue;
	        value = opts[key];
	        this.options[key] = value;
	      }
	    }

	    Builder.prototype.buildObject = function(rootObj) {
	      var attrkey, charkey, render, rootElement, rootName;
	      attrkey = this.options.attrkey;
	      charkey = this.options.charkey;
	      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults$1['0.2'].rootName)) {
	        rootName = Object.keys(rootObj)[0];
	        rootObj = rootObj[rootName];
	      } else {
	        rootName = this.options.rootName;
	      }
	      render = (function(_this) {
	        return function(element, obj) {
	          var attr, child, entry, index, key, value;
	          if (typeof obj !== 'object') {
	            if (_this.options.cdata && requiresCDATA(obj)) {
	              element.raw(wrapCDATA(obj));
	            } else {
	              element.txt(obj);
	            }
	          } else if (Array.isArray(obj)) {
	            for (index in obj) {
	              if (!hasProp.call(obj, index)) continue;
	              child = obj[index];
	              for (key in child) {
	                entry = child[key];
	                element = render(element.ele(key), entry).up();
	              }
	            }
	          } else {
	            for (key in obj) {
	              if (!hasProp.call(obj, key)) continue;
	              child = obj[key];
	              if (key === attrkey) {
	                if (typeof child === "object") {
	                  for (attr in child) {
	                    value = child[attr];
	                    element = element.att(attr, value);
	                  }
	                }
	              } else if (key === charkey) {
	                if (_this.options.cdata && requiresCDATA(child)) {
	                  element = element.raw(wrapCDATA(child));
	                } else {
	                  element = element.txt(child);
	                }
	              } else if (Array.isArray(child)) {
	                for (index in child) {
	                  if (!hasProp.call(child, index)) continue;
	                  entry = child[index];
	                  if (typeof entry === 'string') {
	                    if (_this.options.cdata && requiresCDATA(entry)) {
	                      element = element.ele(key).raw(wrapCDATA(entry)).up();
	                    } else {
	                      element = element.ele(key, entry).up();
	                    }
	                  } else {
	                    element = render(element.ele(key), entry).up();
	                  }
	                }
	              } else if (typeof child === "object") {
	                element = render(element.ele(key), child).up();
	              } else {
	                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
	                  element = element.ele(key).raw(wrapCDATA(child)).up();
	                } else {
	                  if (child == null) {
	                    child = '';
	                  }
	                  element = element.ele(key, child.toString()).up();
	                }
	              }
	            }
	          }
	          return element;
	        };
	      })(this);
	      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
	        headless: this.options.headless,
	        allowSurrogateChars: this.options.allowSurrogateChars
	      });
	      return render(rootElement, rootObj).end(this.options.renderOpts);
	    };

	    return Builder;

	  })();

	}).call(commonjsGlobal);
	});

	var byteLength_1 = byteLength;
	var toByteArray_1 = toByteArray;
	var fromByteArray_1 = fromByteArray;

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i];
	  revLookup[code.charCodeAt(i)] = i;
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62;
	revLookup['_'.charCodeAt(0)] = 63;

	function getLens (b64) {
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=');
	  if (validLen === -1) validLen = len;

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4);

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64);
	  var validLen = lens[0];
	  var placeHoldersLen = lens[1];
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp;
	  var lens = getLens(b64);
	  var validLen = lens[0];
	  var placeHoldersLen = lens[1];

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

	  var curByte = 0;

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen;

	  var i;
	  for (i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)];
	    arr[curByte++] = (tmp >> 16) & 0xFF;
	    arr[curByte++] = (tmp >> 8) & 0xFF;
	    arr[curByte++] = tmp & 0xFF;
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[curByte++] = tmp & 0xFF;
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[curByte++] = (tmp >> 8) & 0xFF;
	    arr[curByte++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    );
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    );
	  }

	  return parts.join('')
	}

	var base64Js = {
		byteLength: byteLength_1,
		toByteArray: toByteArray_1,
		fromByteArray: fromByteArray_1
	};

	/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
	var read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = (nBytes * 8) - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	};

	var write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = (nBytes * 8) - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

	var ieee754 = {
		read: read,
		write: write
	};

	var buffer$1 = createCommonjsModule(function (module, exports) {



	var customInspectSymbol =
	  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
	    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
	    : null;

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;

	var K_MAX_LENGTH = 0x7fffffff;
	exports.kMaxLength = K_MAX_LENGTH;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
	 *               implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * We report that the browser does not support typed arrays if the are not subclassable
	 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
	 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
	 * for __proto__ and has a buggy typed array implementation.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

	if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
	    typeof console.error === 'function') {
	  console.error(
	    'This browser lacks typed array (Uint8Array) support which is required by ' +
	    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
	  );
	}

	function typedArraySupport () {
	  // Can typed array instances can be augmented?
	  try {
	    var arr = new Uint8Array(1);
	    var proto = { foo: function () { return 42 } };
	    Object.setPrototypeOf(proto, Uint8Array.prototype);
	    Object.setPrototypeOf(arr, proto);
	    return arr.foo() === 42
	  } catch (e) {
	    return false
	  }
	}

	Object.defineProperty(Buffer.prototype, 'parent', {
	  enumerable: true,
	  get: function () {
	    if (!Buffer.isBuffer(this)) return undefined
	    return this.buffer
	  }
	});

	Object.defineProperty(Buffer.prototype, 'offset', {
	  enumerable: true,
	  get: function () {
	    if (!Buffer.isBuffer(this)) return undefined
	    return this.byteOffset
	  }
	});

	function createBuffer (length) {
	  if (length > K_MAX_LENGTH) {
	    throw new RangeError('The value "' + length + '" is invalid for option "size"')
	  }
	  // Return an augmented `Uint8Array` instance
	  var buf = new Uint8Array(length);
	  Object.setPrototypeOf(buf, Buffer.prototype);
	  return buf
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new TypeError(
	        'The "string" argument must be of type string. Received type number'
	      )
	    }
	    return allocUnsafe(arg)
	  }
	  return from(arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	function from (value, encodingOrOffset, length) {
	  if (typeof value === 'string') {
	    return fromString(value, encodingOrOffset)
	  }

	  if (ArrayBuffer.isView(value)) {
	    return fromArrayView(value)
	  }

	  if (value == null) {
	    throw new TypeError(
	      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
	      'or Array-like Object. Received type ' + (typeof value)
	    )
	  }

	  if (isInstance(value, ArrayBuffer) ||
	      (value && isInstance(value.buffer, ArrayBuffer))) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof SharedArrayBuffer !== 'undefined' &&
	      (isInstance(value, SharedArrayBuffer) ||
	      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof value === 'number') {
	    throw new TypeError(
	      'The "value" argument must not be of type number. Received type number'
	    )
	  }

	  var valueOf = value.valueOf && value.valueOf();
	  if (valueOf != null && valueOf !== value) {
	    return Buffer.from(valueOf, encodingOrOffset, length)
	  }

	  var b = fromObject(value);
	  if (b) return b

	  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
	      typeof value[Symbol.toPrimitive] === 'function') {
	    return Buffer.from(
	      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
	    )
	  }

	  throw new TypeError(
	    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
	    'or Array-like Object. Received type ' + (typeof value)
	  )
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(value, encodingOrOffset, length)
	};

	// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
	// https://github.com/feross/buffer/pull/148
	Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
	Object.setPrototypeOf(Buffer, Uint8Array);

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be of type number')
	  } else if (size < 0) {
	    throw new RangeError('The value "' + size + '" is invalid for option "size"')
	  }
	}

	function alloc (size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpreted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(size).fill(fill, encoding)
	      : createBuffer(size).fill(fill)
	  }
	  return createBuffer(size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(size, fill, encoding)
	};

	function allocUnsafe (size) {
	  assertSize(size);
	  return createBuffer(size < 0 ? 0 : checked(size) | 0)
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(size)
	};

	function fromString (string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('Unknown encoding: ' + encoding)
	  }

	  var length = byteLength(string, encoding) | 0;
	  var buf = createBuffer(length);

	  var actual = buf.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    buf = buf.slice(0, actual);
	  }

	  return buf
	}

	function fromArrayLike (array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  var buf = createBuffer(length);
	  for (var i = 0; i < length; i += 1) {
	    buf[i] = array[i] & 255;
	  }
	  return buf
	}

	function fromArrayView (arrayView) {
	  if (isInstance(arrayView, Uint8Array)) {
	    var copy = new Uint8Array(arrayView);
	    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
	  }
	  return fromArrayLike(arrayView)
	}

	function fromArrayBuffer (array, byteOffset, length) {
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('"offset" is outside of buffer bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('"length" is outside of buffer bounds')
	  }

	  var buf;
	  if (byteOffset === undefined && length === undefined) {
	    buf = new Uint8Array(array);
	  } else if (length === undefined) {
	    buf = new Uint8Array(array, byteOffset);
	  } else {
	    buf = new Uint8Array(array, byteOffset, length);
	  }

	  // Return an augmented `Uint8Array` instance
	  Object.setPrototypeOf(buf, Buffer.prototype);

	  return buf
	}

	function fromObject (obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    var buf = createBuffer(len);

	    if (buf.length === 0) {
	      return buf
	    }

	    obj.copy(buf, 0, 0, len);
	    return buf
	  }

	  if (obj.length !== undefined) {
	    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
	      return createBuffer(0)
	    }
	    return fromArrayLike(obj)
	  }

	  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
	    return fromArrayLike(obj.data)
	  }
	}

	function checked (length) {
	  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= K_MAX_LENGTH) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return b != null && b._isBuffer === true &&
	    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
	};

	Buffer.compare = function compare (a, b) {
	  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
	  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError(
	      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
	    )
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!Array.isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (isInstance(buf, Uint8Array)) {
	      if (pos + buf.length > buffer.length) {
	        Buffer.from(buf).copy(buffer, pos);
	      } else {
	        Uint8Array.prototype.set.call(
	          buffer,
	          buf,
	          pos
	        );
	      }
	    } else if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    } else {
	      buf.copy(buffer, pos);
	    }
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    throw new TypeError(
	      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
	      'Received type ' + typeof string
	    )
	  }

	  var len = string.length;
	  var mustMatch = (arguments.length > 2 && arguments[2] === true);
	  if (!mustMatch && len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) {
	          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
	        }
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
	// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
	// reliably in a browserify context because there could be multiple different
	// copies of the 'buffer' package in use. This method works even for Buffer
	// instances that were created from another copy of the `buffer` package.
	// See: https://github.com/feross/buffer/issues/154
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.toLocaleString = Buffer.prototype.toString;

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
	  if (this.length > max) str += ' ... ';
	  return '<Buffer ' + str + '>'
	};
	if (customInspectSymbol) {
	  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (isInstance(target, Uint8Array)) {
	    target = Buffer.from(target, target.offset, target.byteLength);
	  }
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError(
	      'The "target" argument must be one of type Buffer or Uint8Array. ' +
	      'Received type ' + (typeof target)
	    )
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset; // Coerce to Number.
	  if (numberIsNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  var strLen = string.length;

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (numberIsNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset >>> 0;
	    if (isFinite(length)) {
	      length = length >>> 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return asciiWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64Js.fromByteArray(buf)
	  } else {
	    return base64Js.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF)
	      ? 4
	      : (firstByte > 0xDF)
	          ? 3
	          : (firstByte > 0xBF)
	              ? 2
	              : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += hexSliceLookupTable[buf[i]];
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
	  for (var i = 0; i < bytes.length - 1; i += 2) {
	    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf = this.subarray(start, end);
	  // Return an augmented `Uint8Array` instance
	  Object.setPrototypeOf(newBuf, Buffer.prototype);

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUintLE =
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUintBE =
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUint8 =
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUint16LE =
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUint16BE =
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUint32LE =
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUint32BE =
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUintLE =
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUintBE =
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUint8 =
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeUint16LE =
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  return offset + 2
	};

	Buffer.prototype.writeUint16BE =
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  this[offset] = (value >>> 8);
	  this[offset + 1] = (value & 0xff);
	  return offset + 2
	};

	Buffer.prototype.writeUint32LE =
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  this[offset + 3] = (value >>> 24);
	  this[offset + 2] = (value >>> 16);
	  this[offset + 1] = (value >>> 8);
	  this[offset] = (value & 0xff);
	  return offset + 4
	};

	Buffer.prototype.writeUint32BE =
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  this[offset] = (value >>> 24);
	  this[offset + 1] = (value >>> 16);
	  this[offset + 2] = (value >>> 8);
	  this[offset + 3] = (value & 0xff);
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, (8 * byteLength) - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, (8 * byteLength) - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  this[offset] = (value >>> 8);
	  this[offset + 1] = (value & 0xff);
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  this[offset + 2] = (value >>> 16);
	  this[offset + 3] = (value >>> 24);
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  this[offset] = (value >>> 24);
	  this[offset + 1] = (value >>> 16);
	  this[offset + 2] = (value >>> 8);
	  this[offset + 3] = (value & 0xff);
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;

	  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
	    // Use built-in when available, missing from IE11
	    this.copyWithin(targetStart, start, end);
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, end),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if ((encoding === 'utf8' && code < 128) ||
	          encoding === 'latin1') {
	        // Fast path: If `val` fits into a single byte, use that numeric value.
	        val = code;
	      }
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  } else if (typeof val === 'boolean') {
	    val = Number(val);
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : Buffer.from(val, encoding);
	    var len = bytes.length;
	    if (len === 0) {
	      throw new TypeError('The value "' + val +
	        '" is invalid for argument "value"')
	    }
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node takes equal signs as end of the Base64 encoding
	  str = str.split('=')[0];
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = str.trim().replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64Js.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
	// the `instanceof` check but they should be treated as of that type.
	// See: https://github.com/feross/buffer/issues/166
	function isInstance (obj, type) {
	  return obj instanceof type ||
	    (obj != null && obj.constructor != null && obj.constructor.name != null &&
	      obj.constructor.name === type.name)
	}
	function numberIsNaN (obj) {
	  // For IE11 support
	  return obj !== obj // eslint-disable-line no-self-compare
	}

	// Create lookup table for `toString('hex')`
	// See: https://github.com/feross/buffer/issues/219
	var hexSliceLookupTable = (function () {
	  var alphabet = '0123456789abcdef';
	  var table = new Array(256);
	  for (var i = 0; i < 16; ++i) {
	    var i16 = i * 16;
	    for (var j = 0; j < 16; ++j) {
	      table[i16 + j] = alphabet[i] + alphabet[j];
	    }
	  }
	  return table
	})();
	});

	var safeBuffer = createCommonjsModule(function (module, exports) {
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	/* eslint-disable node/no-deprecated-api */

	var Buffer = buffer$1.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer$1;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer$1, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.prototype = Object.create(Buffer.prototype);

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer$1.SlowBuffer(size)
	};
	});

	/*<replacement>*/

	var Buffer$3 = safeBuffer.Buffer;
	/*</replacement>*/

	var isEncoding = Buffer$3.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	}
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer$3.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	var StringDecoder_1 = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer$3.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}

	var string_decoder = {
		StringDecoder: StringDecoder_1
	};

	var sax$1 = createCommonjsModule(function (module, exports) {
	(function (sax) { // wrapper for non-node envs
	  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) };
	  sax.SAXParser = SAXParser;
	  sax.SAXStream = SAXStream;
	  sax.createStream = createStream;

	  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
	  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
	  // since that's the earliest that a buffer overrun could occur.  This way, checks are
	  // as rare as required, but as often as necessary to ensure never crossing this bound.
	  // Furthermore, buffers are only tested at most once per write(), so passing a very
	  // large string into write() might have undesirable effects, but this is manageable by
	  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
	  // edge case, result in creating at most one complete copy of the string passed in.
	  // Set to Infinity to have unlimited buffers.
	  sax.MAX_BUFFER_LENGTH = 64 * 1024;

	  var buffers = [
	    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
	    'procInstName', 'procInstBody', 'entity', 'attribName',
	    'attribValue', 'cdata', 'script'
	  ];

	  sax.EVENTS = [
	    'text',
	    'processinginstruction',
	    'sgmldeclaration',
	    'doctype',
	    'comment',
	    'opentagstart',
	    'attribute',
	    'opentag',
	    'closetag',
	    'opencdata',
	    'cdata',
	    'closecdata',
	    'error',
	    'end',
	    'ready',
	    'script',
	    'opennamespace',
	    'closenamespace'
	  ];

	  function SAXParser (strict, opt) {
	    if (!(this instanceof SAXParser)) {
	      return new SAXParser(strict, opt)
	    }

	    var parser = this;
	    clearBuffers(parser);
	    parser.q = parser.c = '';
	    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
	    parser.opt = opt || {};
	    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
	    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase';
	    parser.tags = [];
	    parser.closed = parser.closedRoot = parser.sawRoot = false;
	    parser.tag = parser.error = null;
	    parser.strict = !!strict;
	    parser.noscript = !!(strict || parser.opt.noscript);
	    parser.state = S.BEGIN;
	    parser.strictEntities = parser.opt.strictEntities;
	    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
	    parser.attribList = [];

	    // namespaces form a prototype chain.
	    // it always points at the current tag,
	    // which protos to its parent tag.
	    if (parser.opt.xmlns) {
	      parser.ns = Object.create(rootNS);
	    }

	    // mostly just for error reporting
	    parser.trackPosition = parser.opt.position !== false;
	    if (parser.trackPosition) {
	      parser.position = parser.line = parser.column = 0;
	    }
	    emit(parser, 'onready');
	  }

	  if (!Object.create) {
	    Object.create = function (o) {
	      function F () {}
	      F.prototype = o;
	      var newf = new F();
	      return newf
	    };
	  }

	  if (!Object.keys) {
	    Object.keys = function (o) {
	      var a = [];
	      for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
	      return a
	    };
	  }

	  function checkBufferLength (parser) {
	    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
	    var maxActual = 0;
	    for (var i = 0, l = buffers.length; i < l; i++) {
	      var len = parser[buffers[i]].length;
	      if (len > maxAllowed) {
	        // Text/cdata nodes can get big, and since they're buffered,
	        // we can get here under normal conditions.
	        // Avoid issues by emitting the text node now,
	        // so at least it won't get any bigger.
	        switch (buffers[i]) {
	          case 'textNode':
	            closeText(parser);
	            break

	          case 'cdata':
	            emitNode(parser, 'oncdata', parser.cdata);
	            parser.cdata = '';
	            break

	          case 'script':
	            emitNode(parser, 'onscript', parser.script);
	            parser.script = '';
	            break

	          default:
	            error(parser, 'Max buffer length exceeded: ' + buffers[i]);
	        }
	      }
	      maxActual = Math.max(maxActual, len);
	    }
	    // schedule the next check for the earliest possible buffer overrun.
	    var m = sax.MAX_BUFFER_LENGTH - maxActual;
	    parser.bufferCheckPosition = m + parser.position;
	  }

	  function clearBuffers (parser) {
	    for (var i = 0, l = buffers.length; i < l; i++) {
	      parser[buffers[i]] = '';
	    }
	  }

	  function flushBuffers (parser) {
	    closeText(parser);
	    if (parser.cdata !== '') {
	      emitNode(parser, 'oncdata', parser.cdata);
	      parser.cdata = '';
	    }
	    if (parser.script !== '') {
	      emitNode(parser, 'onscript', parser.script);
	      parser.script = '';
	    }
	  }

	  SAXParser.prototype = {
	    end: function () { end(this); },
	    write: write,
	    resume: function () { this.error = null; return this },
	    close: function () { return this.write(null) },
	    flush: function () { flushBuffers(this); }
	  };

	  var Stream;
	  try {
	    Stream = require$$0__default['default'].Stream;
	  } catch (ex) {
	    Stream = function () {};
	  }

	  var streamWraps = sax.EVENTS.filter(function (ev) {
	    return ev !== 'error' && ev !== 'end'
	  });

	  function createStream (strict, opt) {
	    return new SAXStream(strict, opt)
	  }

	  function SAXStream (strict, opt) {
	    if (!(this instanceof SAXStream)) {
	      return new SAXStream(strict, opt)
	    }

	    Stream.apply(this);

	    this._parser = new SAXParser(strict, opt);
	    this.writable = true;
	    this.readable = true;

	    var me = this;

	    this._parser.onend = function () {
	      me.emit('end');
	    };

	    this._parser.onerror = function (er) {
	      me.emit('error', er);

	      // if didn't throw, then means error was handled.
	      // go ahead and clear error, so we can write again.
	      me._parser.error = null;
	    };

	    this._decoder = null;

	    streamWraps.forEach(function (ev) {
	      Object.defineProperty(me, 'on' + ev, {
	        get: function () {
	          return me._parser['on' + ev]
	        },
	        set: function (h) {
	          if (!h) {
	            me.removeAllListeners(ev);
	            me._parser['on' + ev] = h;
	            return h
	          }
	          me.on(ev, h);
	        },
	        enumerable: true,
	        configurable: false
	      });
	    });
	  }

	  SAXStream.prototype = Object.create(Stream.prototype, {
	    constructor: {
	      value: SAXStream
	    }
	  });

	  SAXStream.prototype.write = function (data) {
	    if (typeof Buffer === 'function' &&
	      typeof Buffer.isBuffer === 'function' &&
	      Buffer.isBuffer(data)) {
	      if (!this._decoder) {
	        var SD = string_decoder.StringDecoder;
	        this._decoder = new SD('utf8');
	      }
	      data = this._decoder.write(data);
	    }

	    this._parser.write(data.toString());
	    this.emit('data', data);
	    return true
	  };

	  SAXStream.prototype.end = function (chunk) {
	    if (chunk && chunk.length) {
	      this.write(chunk);
	    }
	    this._parser.end();
	    return true
	  };

	  SAXStream.prototype.on = function (ev, handler) {
	    var me = this;
	    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
	      me._parser['on' + ev] = function () {
	        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
	        args.splice(0, 0, ev);
	        me.emit.apply(me, args);
	      };
	    }

	    return Stream.prototype.on.call(me, ev, handler)
	  };

	  // this really needs to be replaced with character classes.
	  // XML allows all manner of ridiculous numbers and digits.
	  var CDATA = '[CDATA[';
	  var DOCTYPE = 'DOCTYPE';
	  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
	  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
	  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };

	  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
	  // This implementation works on strings, a single character at a time
	  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
	  // without a significant breaking change to either this  parser, or the
	  // JavaScript language.  Implementation of an emoji-capable xml parser
	  // is left as an exercise for the reader.
	  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;

	  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

	  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
	  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

	  function isWhitespace (c) {
	    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
	  }

	  function isQuote (c) {
	    return c === '"' || c === '\''
	  }

	  function isAttribEnd (c) {
	    return c === '>' || isWhitespace(c)
	  }

	  function isMatch (regex, c) {
	    return regex.test(c)
	  }

	  function notMatch (regex, c) {
	    return !isMatch(regex, c)
	  }

	  var S = 0;
	  sax.STATE = {
	    BEGIN: S++, // leading byte order mark or whitespace
	    BEGIN_WHITESPACE: S++, // leading whitespace
	    TEXT: S++, // general stuff
	    TEXT_ENTITY: S++, // &amp and such.
	    OPEN_WAKA: S++, // <
	    SGML_DECL: S++, // <!BLARG
	    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
	    DOCTYPE: S++, // <!DOCTYPE
	    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
	    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
	    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
	    COMMENT_STARTING: S++, // <!-
	    COMMENT: S++, // <!--
	    COMMENT_ENDING: S++, // <!-- blah -
	    COMMENT_ENDED: S++, // <!-- blah --
	    CDATA: S++, // <![CDATA[ something
	    CDATA_ENDING: S++, // ]
	    CDATA_ENDING_2: S++, // ]]
	    PROC_INST: S++, // <?hi
	    PROC_INST_BODY: S++, // <?hi there
	    PROC_INST_ENDING: S++, // <?hi "there" ?
	    OPEN_TAG: S++, // <strong
	    OPEN_TAG_SLASH: S++, // <strong /
	    ATTRIB: S++, // <a
	    ATTRIB_NAME: S++, // <a foo
	    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
	    ATTRIB_VALUE: S++, // <a foo=
	    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
	    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
	    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
	    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
	    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
	    CLOSE_TAG: S++, // </a
	    CLOSE_TAG_SAW_WHITE: S++, // </a   >
	    SCRIPT: S++, // <script> ...
	    SCRIPT_ENDING: S++ // <script> ... <
	  };

	  sax.XML_ENTITIES = {
	    'amp': '&',
	    'gt': '>',
	    'lt': '<',
	    'quot': '"',
	    'apos': "'"
	  };

	  sax.ENTITIES = {
	    'amp': '&',
	    'gt': '>',
	    'lt': '<',
	    'quot': '"',
	    'apos': "'",
	    'AElig': 198,
	    'Aacute': 193,
	    'Acirc': 194,
	    'Agrave': 192,
	    'Aring': 197,
	    'Atilde': 195,
	    'Auml': 196,
	    'Ccedil': 199,
	    'ETH': 208,
	    'Eacute': 201,
	    'Ecirc': 202,
	    'Egrave': 200,
	    'Euml': 203,
	    'Iacute': 205,
	    'Icirc': 206,
	    'Igrave': 204,
	    'Iuml': 207,
	    'Ntilde': 209,
	    'Oacute': 211,
	    'Ocirc': 212,
	    'Ograve': 210,
	    'Oslash': 216,
	    'Otilde': 213,
	    'Ouml': 214,
	    'THORN': 222,
	    'Uacute': 218,
	    'Ucirc': 219,
	    'Ugrave': 217,
	    'Uuml': 220,
	    'Yacute': 221,
	    'aacute': 225,
	    'acirc': 226,
	    'aelig': 230,
	    'agrave': 224,
	    'aring': 229,
	    'atilde': 227,
	    'auml': 228,
	    'ccedil': 231,
	    'eacute': 233,
	    'ecirc': 234,
	    'egrave': 232,
	    'eth': 240,
	    'euml': 235,
	    'iacute': 237,
	    'icirc': 238,
	    'igrave': 236,
	    'iuml': 239,
	    'ntilde': 241,
	    'oacute': 243,
	    'ocirc': 244,
	    'ograve': 242,
	    'oslash': 248,
	    'otilde': 245,
	    'ouml': 246,
	    'szlig': 223,
	    'thorn': 254,
	    'uacute': 250,
	    'ucirc': 251,
	    'ugrave': 249,
	    'uuml': 252,
	    'yacute': 253,
	    'yuml': 255,
	    'copy': 169,
	    'reg': 174,
	    'nbsp': 160,
	    'iexcl': 161,
	    'cent': 162,
	    'pound': 163,
	    'curren': 164,
	    'yen': 165,
	    'brvbar': 166,
	    'sect': 167,
	    'uml': 168,
	    'ordf': 170,
	    'laquo': 171,
	    'not': 172,
	    'shy': 173,
	    'macr': 175,
	    'deg': 176,
	    'plusmn': 177,
	    'sup1': 185,
	    'sup2': 178,
	    'sup3': 179,
	    'acute': 180,
	    'micro': 181,
	    'para': 182,
	    'middot': 183,
	    'cedil': 184,
	    'ordm': 186,
	    'raquo': 187,
	    'frac14': 188,
	    'frac12': 189,
	    'frac34': 190,
	    'iquest': 191,
	    'times': 215,
	    'divide': 247,
	    'OElig': 338,
	    'oelig': 339,
	    'Scaron': 352,
	    'scaron': 353,
	    'Yuml': 376,
	    'fnof': 402,
	    'circ': 710,
	    'tilde': 732,
	    'Alpha': 913,
	    'Beta': 914,
	    'Gamma': 915,
	    'Delta': 916,
	    'Epsilon': 917,
	    'Zeta': 918,
	    'Eta': 919,
	    'Theta': 920,
	    'Iota': 921,
	    'Kappa': 922,
	    'Lambda': 923,
	    'Mu': 924,
	    'Nu': 925,
	    'Xi': 926,
	    'Omicron': 927,
	    'Pi': 928,
	    'Rho': 929,
	    'Sigma': 931,
	    'Tau': 932,
	    'Upsilon': 933,
	    'Phi': 934,
	    'Chi': 935,
	    'Psi': 936,
	    'Omega': 937,
	    'alpha': 945,
	    'beta': 946,
	    'gamma': 947,
	    'delta': 948,
	    'epsilon': 949,
	    'zeta': 950,
	    'eta': 951,
	    'theta': 952,
	    'iota': 953,
	    'kappa': 954,
	    'lambda': 955,
	    'mu': 956,
	    'nu': 957,
	    'xi': 958,
	    'omicron': 959,
	    'pi': 960,
	    'rho': 961,
	    'sigmaf': 962,
	    'sigma': 963,
	    'tau': 964,
	    'upsilon': 965,
	    'phi': 966,
	    'chi': 967,
	    'psi': 968,
	    'omega': 969,
	    'thetasym': 977,
	    'upsih': 978,
	    'piv': 982,
	    'ensp': 8194,
	    'emsp': 8195,
	    'thinsp': 8201,
	    'zwnj': 8204,
	    'zwj': 8205,
	    'lrm': 8206,
	    'rlm': 8207,
	    'ndash': 8211,
	    'mdash': 8212,
	    'lsquo': 8216,
	    'rsquo': 8217,
	    'sbquo': 8218,
	    'ldquo': 8220,
	    'rdquo': 8221,
	    'bdquo': 8222,
	    'dagger': 8224,
	    'Dagger': 8225,
	    'bull': 8226,
	    'hellip': 8230,
	    'permil': 8240,
	    'prime': 8242,
	    'Prime': 8243,
	    'lsaquo': 8249,
	    'rsaquo': 8250,
	    'oline': 8254,
	    'frasl': 8260,
	    'euro': 8364,
	    'image': 8465,
	    'weierp': 8472,
	    'real': 8476,
	    'trade': 8482,
	    'alefsym': 8501,
	    'larr': 8592,
	    'uarr': 8593,
	    'rarr': 8594,
	    'darr': 8595,
	    'harr': 8596,
	    'crarr': 8629,
	    'lArr': 8656,
	    'uArr': 8657,
	    'rArr': 8658,
	    'dArr': 8659,
	    'hArr': 8660,
	    'forall': 8704,
	    'part': 8706,
	    'exist': 8707,
	    'empty': 8709,
	    'nabla': 8711,
	    'isin': 8712,
	    'notin': 8713,
	    'ni': 8715,
	    'prod': 8719,
	    'sum': 8721,
	    'minus': 8722,
	    'lowast': 8727,
	    'radic': 8730,
	    'prop': 8733,
	    'infin': 8734,
	    'ang': 8736,
	    'and': 8743,
	    'or': 8744,
	    'cap': 8745,
	    'cup': 8746,
	    'int': 8747,
	    'there4': 8756,
	    'sim': 8764,
	    'cong': 8773,
	    'asymp': 8776,
	    'ne': 8800,
	    'equiv': 8801,
	    'le': 8804,
	    'ge': 8805,
	    'sub': 8834,
	    'sup': 8835,
	    'nsub': 8836,
	    'sube': 8838,
	    'supe': 8839,
	    'oplus': 8853,
	    'otimes': 8855,
	    'perp': 8869,
	    'sdot': 8901,
	    'lceil': 8968,
	    'rceil': 8969,
	    'lfloor': 8970,
	    'rfloor': 8971,
	    'lang': 9001,
	    'rang': 9002,
	    'loz': 9674,
	    'spades': 9824,
	    'clubs': 9827,
	    'hearts': 9829,
	    'diams': 9830
	  };

	  Object.keys(sax.ENTITIES).forEach(function (key) {
	    var e = sax.ENTITIES[key];
	    var s = typeof e === 'number' ? String.fromCharCode(e) : e;
	    sax.ENTITIES[key] = s;
	  });

	  for (var s in sax.STATE) {
	    sax.STATE[sax.STATE[s]] = s;
	  }

	  // shorthand
	  S = sax.STATE;

	  function emit (parser, event, data) {
	    parser[event] && parser[event](data);
	  }

	  function emitNode (parser, nodeType, data) {
	    if (parser.textNode) closeText(parser);
	    emit(parser, nodeType, data);
	  }

	  function closeText (parser) {
	    parser.textNode = textopts(parser.opt, parser.textNode);
	    if (parser.textNode) emit(parser, 'ontext', parser.textNode);
	    parser.textNode = '';
	  }

	  function textopts (opt, text) {
	    if (opt.trim) text = text.trim();
	    if (opt.normalize) text = text.replace(/\s+/g, ' ');
	    return text
	  }

	  function error (parser, er) {
	    closeText(parser);
	    if (parser.trackPosition) {
	      er += '\nLine: ' + parser.line +
	        '\nColumn: ' + parser.column +
	        '\nChar: ' + parser.c;
	    }
	    er = new Error(er);
	    parser.error = er;
	    emit(parser, 'onerror', er);
	    return parser
	  }

	  function end (parser) {
	    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag');
	    if ((parser.state !== S.BEGIN) &&
	      (parser.state !== S.BEGIN_WHITESPACE) &&
	      (parser.state !== S.TEXT)) {
	      error(parser, 'Unexpected end');
	    }
	    closeText(parser);
	    parser.c = '';
	    parser.closed = true;
	    emit(parser, 'onend');
	    SAXParser.call(parser, parser.strict, parser.opt);
	    return parser
	  }

	  function strictFail (parser, message) {
	    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
	      throw new Error('bad call to strictFail')
	    }
	    if (parser.strict) {
	      error(parser, message);
	    }
	  }

	  function newTag (parser) {
	    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
	    var parent = parser.tags[parser.tags.length - 1] || parser;
	    var tag = parser.tag = { name: parser.tagName, attributes: {} };

	    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
	    if (parser.opt.xmlns) {
	      tag.ns = parent.ns;
	    }
	    parser.attribList.length = 0;
	    emitNode(parser, 'onopentagstart', tag);
	  }

	  function qname (name, attribute) {
	    var i = name.indexOf(':');
	    var qualName = i < 0 ? [ '', name ] : name.split(':');
	    var prefix = qualName[0];
	    var local = qualName[1];

	    // <x "xmlns"="http://foo">
	    if (attribute && name === 'xmlns') {
	      prefix = 'xmlns';
	      local = '';
	    }

	    return { prefix: prefix, local: local }
	  }

	  function attrib (parser) {
	    if (!parser.strict) {
	      parser.attribName = parser.attribName[parser.looseCase]();
	    }

	    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
	      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
	      parser.attribName = parser.attribValue = '';
	      return
	    }

	    if (parser.opt.xmlns) {
	      var qn = qname(parser.attribName, true);
	      var prefix = qn.prefix;
	      var local = qn.local;

	      if (prefix === 'xmlns') {
	        // namespace binding attribute. push the binding into scope
	        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
	          strictFail(parser,
	            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
	            'Actual: ' + parser.attribValue);
	        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
	          strictFail(parser,
	            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
	            'Actual: ' + parser.attribValue);
	        } else {
	          var tag = parser.tag;
	          var parent = parser.tags[parser.tags.length - 1] || parser;
	          if (tag.ns === parent.ns) {
	            tag.ns = Object.create(parent.ns);
	          }
	          tag.ns[local] = parser.attribValue;
	        }
	      }

	      // defer onattribute events until all attributes have been seen
	      // so any new bindings can take effect. preserve attribute order
	      // so deferred events can be emitted in document order
	      parser.attribList.push([parser.attribName, parser.attribValue]);
	    } else {
	      // in non-xmlns mode, we can emit the event right away
	      parser.tag.attributes[parser.attribName] = parser.attribValue;
	      emitNode(parser, 'onattribute', {
	        name: parser.attribName,
	        value: parser.attribValue
	      });
	    }

	    parser.attribName = parser.attribValue = '';
	  }

	  function openTag (parser, selfClosing) {
	    if (parser.opt.xmlns) {
	      // emit namespace binding events
	      var tag = parser.tag;

	      // add namespace info to tag
	      var qn = qname(parser.tagName);
	      tag.prefix = qn.prefix;
	      tag.local = qn.local;
	      tag.uri = tag.ns[qn.prefix] || '';

	      if (tag.prefix && !tag.uri) {
	        strictFail(parser, 'Unbound namespace prefix: ' +
	          JSON.stringify(parser.tagName));
	        tag.uri = qn.prefix;
	      }

	      var parent = parser.tags[parser.tags.length - 1] || parser;
	      if (tag.ns && parent.ns !== tag.ns) {
	        Object.keys(tag.ns).forEach(function (p) {
	          emitNode(parser, 'onopennamespace', {
	            prefix: p,
	            uri: tag.ns[p]
	          });
	        });
	      }

	      // handle deferred onattribute events
	      // Note: do not apply default ns to attributes:
	      //   http://www.w3.org/TR/REC-xml-names/#defaulting
	      for (var i = 0, l = parser.attribList.length; i < l; i++) {
	        var nv = parser.attribList[i];
	        var name = nv[0];
	        var value = nv[1];
	        var qualName = qname(name, true);
	        var prefix = qualName.prefix;
	        var local = qualName.local;
	        var uri = prefix === '' ? '' : (tag.ns[prefix] || '');
	        var a = {
	          name: name,
	          value: value,
	          prefix: prefix,
	          local: local,
	          uri: uri
	        };

	        // if there's any attributes with an undefined namespace,
	        // then fail on them now.
	        if (prefix && prefix !== 'xmlns' && !uri) {
	          strictFail(parser, 'Unbound namespace prefix: ' +
	            JSON.stringify(prefix));
	          a.uri = prefix;
	        }
	        parser.tag.attributes[name] = a;
	        emitNode(parser, 'onattribute', a);
	      }
	      parser.attribList.length = 0;
	    }

	    parser.tag.isSelfClosing = !!selfClosing;

	    // process the tag
	    parser.sawRoot = true;
	    parser.tags.push(parser.tag);
	    emitNode(parser, 'onopentag', parser.tag);
	    if (!selfClosing) {
	      // special case for <script> in non-strict mode.
	      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
	        parser.state = S.SCRIPT;
	      } else {
	        parser.state = S.TEXT;
	      }
	      parser.tag = null;
	      parser.tagName = '';
	    }
	    parser.attribName = parser.attribValue = '';
	    parser.attribList.length = 0;
	  }

	  function closeTag (parser) {
	    if (!parser.tagName) {
	      strictFail(parser, 'Weird empty close tag.');
	      parser.textNode += '</>';
	      parser.state = S.TEXT;
	      return
	    }

	    if (parser.script) {
	      if (parser.tagName !== 'script') {
	        parser.script += '</' + parser.tagName + '>';
	        parser.tagName = '';
	        parser.state = S.SCRIPT;
	        return
	      }
	      emitNode(parser, 'onscript', parser.script);
	      parser.script = '';
	    }

	    // first make sure that the closing tag actually exists.
	    // <a><b></c></b></a> will close everything, otherwise.
	    var t = parser.tags.length;
	    var tagName = parser.tagName;
	    if (!parser.strict) {
	      tagName = tagName[parser.looseCase]();
	    }
	    var closeTo = tagName;
	    while (t--) {
	      var close = parser.tags[t];
	      if (close.name !== closeTo) {
	        // fail the first time in strict mode
	        strictFail(parser, 'Unexpected close tag');
	      } else {
	        break
	      }
	    }

	    // didn't find it.  we already failed for strict, so just abort.
	    if (t < 0) {
	      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName);
	      parser.textNode += '</' + parser.tagName + '>';
	      parser.state = S.TEXT;
	      return
	    }
	    parser.tagName = tagName;
	    var s = parser.tags.length;
	    while (s-- > t) {
	      var tag = parser.tag = parser.tags.pop();
	      parser.tagName = parser.tag.name;
	      emitNode(parser, 'onclosetag', parser.tagName);

	      var x = {};
	      for (var i in tag.ns) {
	        x[i] = tag.ns[i];
	      }

	      var parent = parser.tags[parser.tags.length - 1] || parser;
	      if (parser.opt.xmlns && tag.ns !== parent.ns) {
	        // remove namespace bindings introduced by tag
	        Object.keys(tag.ns).forEach(function (p) {
	          var n = tag.ns[p];
	          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n });
	        });
	      }
	    }
	    if (t === 0) parser.closedRoot = true;
	    parser.tagName = parser.attribValue = parser.attribName = '';
	    parser.attribList.length = 0;
	    parser.state = S.TEXT;
	  }

	  function parseEntity (parser) {
	    var entity = parser.entity;
	    var entityLC = entity.toLowerCase();
	    var num;
	    var numStr = '';

	    if (parser.ENTITIES[entity]) {
	      return parser.ENTITIES[entity]
	    }
	    if (parser.ENTITIES[entityLC]) {
	      return parser.ENTITIES[entityLC]
	    }
	    entity = entityLC;
	    if (entity.charAt(0) === '#') {
	      if (entity.charAt(1) === 'x') {
	        entity = entity.slice(2);
	        num = parseInt(entity, 16);
	        numStr = num.toString(16);
	      } else {
	        entity = entity.slice(1);
	        num = parseInt(entity, 10);
	        numStr = num.toString(10);
	      }
	    }
	    entity = entity.replace(/^0+/, '');
	    if (isNaN(num) || numStr.toLowerCase() !== entity) {
	      strictFail(parser, 'Invalid character entity');
	      return '&' + parser.entity + ';'
	    }

	    return String.fromCodePoint(num)
	  }

	  function beginWhiteSpace (parser, c) {
	    if (c === '<') {
	      parser.state = S.OPEN_WAKA;
	      parser.startTagPosition = parser.position;
	    } else if (!isWhitespace(c)) {
	      // have to process this as a text node.
	      // weird, but happens.
	      strictFail(parser, 'Non-whitespace before first tag.');
	      parser.textNode = c;
	      parser.state = S.TEXT;
	    }
	  }

	  function charAt (chunk, i) {
	    var result = '';
	    if (i < chunk.length) {
	      result = chunk.charAt(i);
	    }
	    return result
	  }

	  function write (chunk) {
	    var parser = this;
	    if (this.error) {
	      throw this.error
	    }
	    if (parser.closed) {
	      return error(parser,
	        'Cannot write after close. Assign an onready handler.')
	    }
	    if (chunk === null) {
	      return end(parser)
	    }
	    if (typeof chunk === 'object') {
	      chunk = chunk.toString();
	    }
	    var i = 0;
	    var c = '';
	    while (true) {
	      c = charAt(chunk, i++);
	      parser.c = c;

	      if (!c) {
	        break
	      }

	      if (parser.trackPosition) {
	        parser.position++;
	        if (c === '\n') {
	          parser.line++;
	          parser.column = 0;
	        } else {
	          parser.column++;
	        }
	      }

	      switch (parser.state) {
	        case S.BEGIN:
	          parser.state = S.BEGIN_WHITESPACE;
	          if (c === '\uFEFF') {
	            continue
	          }
	          beginWhiteSpace(parser, c);
	          continue

	        case S.BEGIN_WHITESPACE:
	          beginWhiteSpace(parser, c);
	          continue

	        case S.TEXT:
	          if (parser.sawRoot && !parser.closedRoot) {
	            var starti = i - 1;
	            while (c && c !== '<' && c !== '&') {
	              c = charAt(chunk, i++);
	              if (c && parser.trackPosition) {
	                parser.position++;
	                if (c === '\n') {
	                  parser.line++;
	                  parser.column = 0;
	                } else {
	                  parser.column++;
	                }
	              }
	            }
	            parser.textNode += chunk.substring(starti, i - 1);
	          }
	          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
	            parser.state = S.OPEN_WAKA;
	            parser.startTagPosition = parser.position;
	          } else {
	            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
	              strictFail(parser, 'Text data outside of root node.');
	            }
	            if (c === '&') {
	              parser.state = S.TEXT_ENTITY;
	            } else {
	              parser.textNode += c;
	            }
	          }
	          continue

	        case S.SCRIPT:
	          // only non-strict
	          if (c === '<') {
	            parser.state = S.SCRIPT_ENDING;
	          } else {
	            parser.script += c;
	          }
	          continue

	        case S.SCRIPT_ENDING:
	          if (c === '/') {
	            parser.state = S.CLOSE_TAG;
	          } else {
	            parser.script += '<' + c;
	            parser.state = S.SCRIPT;
	          }
	          continue

	        case S.OPEN_WAKA:
	          // either a /, ?, !, or text is coming next.
	          if (c === '!') {
	            parser.state = S.SGML_DECL;
	            parser.sgmlDecl = '';
	          } else if (isWhitespace(c)) ; else if (isMatch(nameStart, c)) {
	            parser.state = S.OPEN_TAG;
	            parser.tagName = c;
	          } else if (c === '/') {
	            parser.state = S.CLOSE_TAG;
	            parser.tagName = '';
	          } else if (c === '?') {
	            parser.state = S.PROC_INST;
	            parser.procInstName = parser.procInstBody = '';
	          } else {
	            strictFail(parser, 'Unencoded <');
	            // if there was some whitespace, then add that in.
	            if (parser.startTagPosition + 1 < parser.position) {
	              var pad = parser.position - parser.startTagPosition;
	              c = new Array(pad).join(' ') + c;
	            }
	            parser.textNode += '<' + c;
	            parser.state = S.TEXT;
	          }
	          continue

	        case S.SGML_DECL:
	          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
	            emitNode(parser, 'onopencdata');
	            parser.state = S.CDATA;
	            parser.sgmlDecl = '';
	            parser.cdata = '';
	          } else if (parser.sgmlDecl + c === '--') {
	            parser.state = S.COMMENT;
	            parser.comment = '';
	            parser.sgmlDecl = '';
	          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
	            parser.state = S.DOCTYPE;
	            if (parser.doctype || parser.sawRoot) {
	              strictFail(parser,
	                'Inappropriately located doctype declaration');
	            }
	            parser.doctype = '';
	            parser.sgmlDecl = '';
	          } else if (c === '>') {
	            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl);
	            parser.sgmlDecl = '';
	            parser.state = S.TEXT;
	          } else if (isQuote(c)) {
	            parser.state = S.SGML_DECL_QUOTED;
	            parser.sgmlDecl += c;
	          } else {
	            parser.sgmlDecl += c;
	          }
	          continue

	        case S.SGML_DECL_QUOTED:
	          if (c === parser.q) {
	            parser.state = S.SGML_DECL;
	            parser.q = '';
	          }
	          parser.sgmlDecl += c;
	          continue

	        case S.DOCTYPE:
	          if (c === '>') {
	            parser.state = S.TEXT;
	            emitNode(parser, 'ondoctype', parser.doctype);
	            parser.doctype = true; // just remember that we saw it.
	          } else {
	            parser.doctype += c;
	            if (c === '[') {
	              parser.state = S.DOCTYPE_DTD;
	            } else if (isQuote(c)) {
	              parser.state = S.DOCTYPE_QUOTED;
	              parser.q = c;
	            }
	          }
	          continue

	        case S.DOCTYPE_QUOTED:
	          parser.doctype += c;
	          if (c === parser.q) {
	            parser.q = '';
	            parser.state = S.DOCTYPE;
	          }
	          continue

	        case S.DOCTYPE_DTD:
	          parser.doctype += c;
	          if (c === ']') {
	            parser.state = S.DOCTYPE;
	          } else if (isQuote(c)) {
	            parser.state = S.DOCTYPE_DTD_QUOTED;
	            parser.q = c;
	          }
	          continue

	        case S.DOCTYPE_DTD_QUOTED:
	          parser.doctype += c;
	          if (c === parser.q) {
	            parser.state = S.DOCTYPE_DTD;
	            parser.q = '';
	          }
	          continue

	        case S.COMMENT:
	          if (c === '-') {
	            parser.state = S.COMMENT_ENDING;
	          } else {
	            parser.comment += c;
	          }
	          continue

	        case S.COMMENT_ENDING:
	          if (c === '-') {
	            parser.state = S.COMMENT_ENDED;
	            parser.comment = textopts(parser.opt, parser.comment);
	            if (parser.comment) {
	              emitNode(parser, 'oncomment', parser.comment);
	            }
	            parser.comment = '';
	          } else {
	            parser.comment += '-' + c;
	            parser.state = S.COMMENT;
	          }
	          continue

	        case S.COMMENT_ENDED:
	          if (c !== '>') {
	            strictFail(parser, 'Malformed comment');
	            // allow <!-- blah -- bloo --> in non-strict mode,
	            // which is a comment of " blah -- bloo "
	            parser.comment += '--' + c;
	            parser.state = S.COMMENT;
	          } else {
	            parser.state = S.TEXT;
	          }
	          continue

	        case S.CDATA:
	          if (c === ']') {
	            parser.state = S.CDATA_ENDING;
	          } else {
	            parser.cdata += c;
	          }
	          continue

	        case S.CDATA_ENDING:
	          if (c === ']') {
	            parser.state = S.CDATA_ENDING_2;
	          } else {
	            parser.cdata += ']' + c;
	            parser.state = S.CDATA;
	          }
	          continue

	        case S.CDATA_ENDING_2:
	          if (c === '>') {
	            if (parser.cdata) {
	              emitNode(parser, 'oncdata', parser.cdata);
	            }
	            emitNode(parser, 'onclosecdata');
	            parser.cdata = '';
	            parser.state = S.TEXT;
	          } else if (c === ']') {
	            parser.cdata += ']';
	          } else {
	            parser.cdata += ']]' + c;
	            parser.state = S.CDATA;
	          }
	          continue

	        case S.PROC_INST:
	          if (c === '?') {
	            parser.state = S.PROC_INST_ENDING;
	          } else if (isWhitespace(c)) {
	            parser.state = S.PROC_INST_BODY;
	          } else {
	            parser.procInstName += c;
	          }
	          continue

	        case S.PROC_INST_BODY:
	          if (!parser.procInstBody && isWhitespace(c)) {
	            continue
	          } else if (c === '?') {
	            parser.state = S.PROC_INST_ENDING;
	          } else {
	            parser.procInstBody += c;
	          }
	          continue

	        case S.PROC_INST_ENDING:
	          if (c === '>') {
	            emitNode(parser, 'onprocessinginstruction', {
	              name: parser.procInstName,
	              body: parser.procInstBody
	            });
	            parser.procInstName = parser.procInstBody = '';
	            parser.state = S.TEXT;
	          } else {
	            parser.procInstBody += '?' + c;
	            parser.state = S.PROC_INST_BODY;
	          }
	          continue

	        case S.OPEN_TAG:
	          if (isMatch(nameBody, c)) {
	            parser.tagName += c;
	          } else {
	            newTag(parser);
	            if (c === '>') {
	              openTag(parser);
	            } else if (c === '/') {
	              parser.state = S.OPEN_TAG_SLASH;
	            } else {
	              if (!isWhitespace(c)) {
	                strictFail(parser, 'Invalid character in tag name');
	              }
	              parser.state = S.ATTRIB;
	            }
	          }
	          continue

	        case S.OPEN_TAG_SLASH:
	          if (c === '>') {
	            openTag(parser, true);
	            closeTag(parser);
	          } else {
	            strictFail(parser, 'Forward-slash in opening tag not followed by >');
	            parser.state = S.ATTRIB;
	          }
	          continue

	        case S.ATTRIB:
	          // haven't read the attribute name yet.
	          if (isWhitespace(c)) {
	            continue
	          } else if (c === '>') {
	            openTag(parser);
	          } else if (c === '/') {
	            parser.state = S.OPEN_TAG_SLASH;
	          } else if (isMatch(nameStart, c)) {
	            parser.attribName = c;
	            parser.attribValue = '';
	            parser.state = S.ATTRIB_NAME;
	          } else {
	            strictFail(parser, 'Invalid attribute name');
	          }
	          continue

	        case S.ATTRIB_NAME:
	          if (c === '=') {
	            parser.state = S.ATTRIB_VALUE;
	          } else if (c === '>') {
	            strictFail(parser, 'Attribute without value');
	            parser.attribValue = parser.attribName;
	            attrib(parser);
	            openTag(parser);
	          } else if (isWhitespace(c)) {
	            parser.state = S.ATTRIB_NAME_SAW_WHITE;
	          } else if (isMatch(nameBody, c)) {
	            parser.attribName += c;
	          } else {
	            strictFail(parser, 'Invalid attribute name');
	          }
	          continue

	        case S.ATTRIB_NAME_SAW_WHITE:
	          if (c === '=') {
	            parser.state = S.ATTRIB_VALUE;
	          } else if (isWhitespace(c)) {
	            continue
	          } else {
	            strictFail(parser, 'Attribute without value');
	            parser.tag.attributes[parser.attribName] = '';
	            parser.attribValue = '';
	            emitNode(parser, 'onattribute', {
	              name: parser.attribName,
	              value: ''
	            });
	            parser.attribName = '';
	            if (c === '>') {
	              openTag(parser);
	            } else if (isMatch(nameStart, c)) {
	              parser.attribName = c;
	              parser.state = S.ATTRIB_NAME;
	            } else {
	              strictFail(parser, 'Invalid attribute name');
	              parser.state = S.ATTRIB;
	            }
	          }
	          continue

	        case S.ATTRIB_VALUE:
	          if (isWhitespace(c)) {
	            continue
	          } else if (isQuote(c)) {
	            parser.q = c;
	            parser.state = S.ATTRIB_VALUE_QUOTED;
	          } else {
	            strictFail(parser, 'Unquoted attribute value');
	            parser.state = S.ATTRIB_VALUE_UNQUOTED;
	            parser.attribValue = c;
	          }
	          continue

	        case S.ATTRIB_VALUE_QUOTED:
	          if (c !== parser.q) {
	            if (c === '&') {
	              parser.state = S.ATTRIB_VALUE_ENTITY_Q;
	            } else {
	              parser.attribValue += c;
	            }
	            continue
	          }
	          attrib(parser);
	          parser.q = '';
	          parser.state = S.ATTRIB_VALUE_CLOSED;
	          continue

	        case S.ATTRIB_VALUE_CLOSED:
	          if (isWhitespace(c)) {
	            parser.state = S.ATTRIB;
	          } else if (c === '>') {
	            openTag(parser);
	          } else if (c === '/') {
	            parser.state = S.OPEN_TAG_SLASH;
	          } else if (isMatch(nameStart, c)) {
	            strictFail(parser, 'No whitespace between attributes');
	            parser.attribName = c;
	            parser.attribValue = '';
	            parser.state = S.ATTRIB_NAME;
	          } else {
	            strictFail(parser, 'Invalid attribute name');
	          }
	          continue

	        case S.ATTRIB_VALUE_UNQUOTED:
	          if (!isAttribEnd(c)) {
	            if (c === '&') {
	              parser.state = S.ATTRIB_VALUE_ENTITY_U;
	            } else {
	              parser.attribValue += c;
	            }
	            continue
	          }
	          attrib(parser);
	          if (c === '>') {
	            openTag(parser);
	          } else {
	            parser.state = S.ATTRIB;
	          }
	          continue

	        case S.CLOSE_TAG:
	          if (!parser.tagName) {
	            if (isWhitespace(c)) {
	              continue
	            } else if (notMatch(nameStart, c)) {
	              if (parser.script) {
	                parser.script += '</' + c;
	                parser.state = S.SCRIPT;
	              } else {
	                strictFail(parser, 'Invalid tagname in closing tag.');
	              }
	            } else {
	              parser.tagName = c;
	            }
	          } else if (c === '>') {
	            closeTag(parser);
	          } else if (isMatch(nameBody, c)) {
	            parser.tagName += c;
	          } else if (parser.script) {
	            parser.script += '</' + parser.tagName;
	            parser.tagName = '';
	            parser.state = S.SCRIPT;
	          } else {
	            if (!isWhitespace(c)) {
	              strictFail(parser, 'Invalid tagname in closing tag');
	            }
	            parser.state = S.CLOSE_TAG_SAW_WHITE;
	          }
	          continue

	        case S.CLOSE_TAG_SAW_WHITE:
	          if (isWhitespace(c)) {
	            continue
	          }
	          if (c === '>') {
	            closeTag(parser);
	          } else {
	            strictFail(parser, 'Invalid characters in closing tag');
	          }
	          continue

	        case S.TEXT_ENTITY:
	        case S.ATTRIB_VALUE_ENTITY_Q:
	        case S.ATTRIB_VALUE_ENTITY_U:
	          var returnState;
	          var buffer;
	          switch (parser.state) {
	            case S.TEXT_ENTITY:
	              returnState = S.TEXT;
	              buffer = 'textNode';
	              break

	            case S.ATTRIB_VALUE_ENTITY_Q:
	              returnState = S.ATTRIB_VALUE_QUOTED;
	              buffer = 'attribValue';
	              break

	            case S.ATTRIB_VALUE_ENTITY_U:
	              returnState = S.ATTRIB_VALUE_UNQUOTED;
	              buffer = 'attribValue';
	              break
	          }

	          if (c === ';') {
	            parser[buffer] += parseEntity(parser);
	            parser.entity = '';
	            parser.state = returnState;
	          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
	            parser.entity += c;
	          } else {
	            strictFail(parser, 'Invalid character in entity name');
	            parser[buffer] += '&' + parser.entity + c;
	            parser.entity = '';
	            parser.state = returnState;
	          }

	          continue

	        default:
	          throw new Error(parser, 'Unknown state: ' + parser.state)
	      }
	    } // while

	    if (parser.position >= parser.bufferCheckPosition) {
	      checkBufferLength(parser);
	    }
	    return parser
	  }

	  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
	  /* istanbul ignore next */
	  if (!String.fromCodePoint) {
	    (function () {
	      var stringFromCharCode = String.fromCharCode;
	      var floor = Math.floor;
	      var fromCodePoint = function () {
	        var MAX_SIZE = 0x4000;
	        var codeUnits = [];
	        var highSurrogate;
	        var lowSurrogate;
	        var index = -1;
	        var length = arguments.length;
	        if (!length) {
	          return ''
	        }
	        var result = '';
	        while (++index < length) {
	          var codePoint = Number(arguments[index]);
	          if (
	            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
	            codePoint < 0 || // not a valid Unicode code point
	            codePoint > 0x10FFFF || // not a valid Unicode code point
	            floor(codePoint) !== codePoint // not an integer
	          ) {
	            throw RangeError('Invalid code point: ' + codePoint)
	          }
	          if (codePoint <= 0xFFFF) { // BMP code point
	            codeUnits.push(codePoint);
	          } else { // Astral code point; split in surrogate halves
	            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	            codePoint -= 0x10000;
	            highSurrogate = (codePoint >> 10) + 0xD800;
	            lowSurrogate = (codePoint % 0x400) + 0xDC00;
	            codeUnits.push(highSurrogate, lowSurrogate);
	          }
	          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
	            result += stringFromCharCode.apply(null, codeUnits);
	            codeUnits.length = 0;
	          }
	        }
	        return result
	      };
	      /* istanbul ignore next */
	      if (Object.defineProperty) {
	        Object.defineProperty(String, 'fromCodePoint', {
	          value: fromCodePoint,
	          configurable: true,
	          writable: true
	        });
	      } else {
	        String.fromCodePoint = fromCodePoint;
	      }
	    }());
	  }
	})(exports);
	});

	var bom = createCommonjsModule(function (module, exports) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  exports.stripBOM = function(str) {
	    if (str[0] === '\uFEFF') {
	      return str.substring(1);
	    } else {
	      return str;
	    }
	  };

	}).call(commonjsGlobal);
	});

	var processors = createCommonjsModule(function (module, exports) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var prefixMatch;

	  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

	  exports.normalize = function(str) {
	    return str.toLowerCase();
	  };

	  exports.firstCharLowerCase = function(str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	  };

	  exports.stripPrefix = function(str) {
	    return str.replace(prefixMatch, '');
	  };

	  exports.parseNumbers = function(str) {
	    if (!isNaN(str)) {
	      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
	    }
	    return str;
	  };

	  exports.parseBooleans = function(str) {
	    if (/^(?:true|false)$/i.test(str)) {
	      str = str.toLowerCase() === 'true';
	    }
	    return str;
	  };

	}).call(commonjsGlobal);
	});

	var parser = createCommonjsModule(function (module, exports) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var bom$1, defaults$1, events, isEmpty, processItem, processors$1, sax, setImmediate,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  sax = sax$1;

	  events = require$$1__default['default'];

	  bom$1 = bom;

	  processors$1 = processors;

	  setImmediate = require$$4__default['default'].setImmediate;

	  defaults$1 = defaults.defaults;

	  isEmpty = function(thing) {
	    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
	  };

	  processItem = function(processors, item, key) {
	    var i, len, process;
	    for (i = 0, len = processors.length; i < len; i++) {
	      process = processors[i];
	      item = process(item, key);
	    }
	    return item;
	  };

	  exports.Parser = (function(superClass) {
	    extend(Parser, superClass);

	    function Parser(opts) {
	      this.parseStringPromise = bind(this.parseStringPromise, this);
	      this.parseString = bind(this.parseString, this);
	      this.reset = bind(this.reset, this);
	      this.assignOrPush = bind(this.assignOrPush, this);
	      this.processAsync = bind(this.processAsync, this);
	      var key, ref, value;
	      if (!(this instanceof exports.Parser)) {
	        return new exports.Parser(opts);
	      }
	      this.options = {};
	      ref = defaults$1["0.2"];
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this.options[key] = value;
	      }
	      for (key in opts) {
	        if (!hasProp.call(opts, key)) continue;
	        value = opts[key];
	        this.options[key] = value;
	      }
	      if (this.options.xmlns) {
	        this.options.xmlnskey = this.options.attrkey + "ns";
	      }
	      if (this.options.normalizeTags) {
	        if (!this.options.tagNameProcessors) {
	          this.options.tagNameProcessors = [];
	        }
	        this.options.tagNameProcessors.unshift(processors$1.normalize);
	      }
	      this.reset();
	    }

	    Parser.prototype.processAsync = function() {
	      var chunk, err;
	      try {
	        if (this.remaining.length <= this.options.chunkSize) {
	          chunk = this.remaining;
	          this.remaining = '';
	          this.saxParser = this.saxParser.write(chunk);
	          return this.saxParser.close();
	        } else {
	          chunk = this.remaining.substr(0, this.options.chunkSize);
	          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
	          this.saxParser = this.saxParser.write(chunk);
	          return setImmediate(this.processAsync);
	        }
	      } catch (error1) {
	        err = error1;
	        if (!this.saxParser.errThrown) {
	          this.saxParser.errThrown = true;
	          return this.emit(err);
	        }
	      }
	    };

	    Parser.prototype.assignOrPush = function(obj, key, newValue) {
	      if (!(key in obj)) {
	        if (!this.options.explicitArray) {
	          return obj[key] = newValue;
	        } else {
	          return obj[key] = [newValue];
	        }
	      } else {
	        if (!(obj[key] instanceof Array)) {
	          obj[key] = [obj[key]];
	        }
	        return obj[key].push(newValue);
	      }
	    };

	    Parser.prototype.reset = function() {
	      var attrkey, charkey, ontext, stack;
	      this.removeAllListeners();
	      this.saxParser = sax.parser(this.options.strict, {
	        trim: false,
	        normalize: false,
	        xmlns: this.options.xmlns
	      });
	      this.saxParser.errThrown = false;
	      this.saxParser.onerror = (function(_this) {
	        return function(error) {
	          _this.saxParser.resume();
	          if (!_this.saxParser.errThrown) {
	            _this.saxParser.errThrown = true;
	            return _this.emit("error", error);
	          }
	        };
	      })(this);
	      this.saxParser.onend = (function(_this) {
	        return function() {
	          if (!_this.saxParser.ended) {
	            _this.saxParser.ended = true;
	            return _this.emit("end", _this.resultObject);
	          }
	        };
	      })(this);
	      this.saxParser.ended = false;
	      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
	      this.resultObject = null;
	      stack = [];
	      attrkey = this.options.attrkey;
	      charkey = this.options.charkey;
	      this.saxParser.onopentag = (function(_this) {
	        return function(node) {
	          var key, newValue, obj, processedKey, ref;
	          obj = {};
	          obj[charkey] = "";
	          if (!_this.options.ignoreAttrs) {
	            ref = node.attributes;
	            for (key in ref) {
	              if (!hasProp.call(ref, key)) continue;
	              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
	                obj[attrkey] = {};
	              }
	              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
	              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
	              if (_this.options.mergeAttrs) {
	                _this.assignOrPush(obj, processedKey, newValue);
	              } else {
	                obj[attrkey][processedKey] = newValue;
	              }
	            }
	          }
	          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
	          if (_this.options.xmlns) {
	            obj[_this.options.xmlnskey] = {
	              uri: node.uri,
	              local: node.local
	            };
	          }
	          return stack.push(obj);
	        };
	      })(this);
	      this.saxParser.onclosetag = (function(_this) {
	        return function() {
	          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
	          obj = stack.pop();
	          nodeName = obj["#name"];
	          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
	            delete obj["#name"];
	          }
	          if (obj.cdata === true) {
	            cdata = obj.cdata;
	            delete obj.cdata;
	          }
	          s = stack[stack.length - 1];
	          if (obj[charkey].match(/^\s*$/) && !cdata) {
	            emptyStr = obj[charkey];
	            delete obj[charkey];
	          } else {
	            if (_this.options.trim) {
	              obj[charkey] = obj[charkey].trim();
	            }
	            if (_this.options.normalize) {
	              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
	            }
	            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
	            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
	              obj = obj[charkey];
	            }
	          }
	          if (isEmpty(obj)) {
	            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
	          }
	          if (_this.options.validator != null) {
	            xpath = "/" + ((function() {
	              var i, len, results;
	              results = [];
	              for (i = 0, len = stack.length; i < len; i++) {
	                node = stack[i];
	                results.push(node["#name"]);
	              }
	              return results;
	            })()).concat(nodeName).join("/");
	            (function() {
	              var err;
	              try {
	                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
	              } catch (error1) {
	                err = error1;
	                return _this.emit("error", err);
	              }
	            })();
	          }
	          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
	            if (!_this.options.preserveChildrenOrder) {
	              node = {};
	              if (_this.options.attrkey in obj) {
	                node[_this.options.attrkey] = obj[_this.options.attrkey];
	                delete obj[_this.options.attrkey];
	              }
	              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
	                node[_this.options.charkey] = obj[_this.options.charkey];
	                delete obj[_this.options.charkey];
	              }
	              if (Object.getOwnPropertyNames(obj).length > 0) {
	                node[_this.options.childkey] = obj;
	              }
	              obj = node;
	            } else if (s) {
	              s[_this.options.childkey] = s[_this.options.childkey] || [];
	              objClone = {};
	              for (key in obj) {
	                if (!hasProp.call(obj, key)) continue;
	                objClone[key] = obj[key];
	              }
	              s[_this.options.childkey].push(objClone);
	              delete obj["#name"];
	              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
	                obj = obj[charkey];
	              }
	            }
	          }
	          if (stack.length > 0) {
	            return _this.assignOrPush(s, nodeName, obj);
	          } else {
	            if (_this.options.explicitRoot) {
	              old = obj;
	              obj = {};
	              obj[nodeName] = old;
	            }
	            _this.resultObject = obj;
	            _this.saxParser.ended = true;
	            return _this.emit("end", _this.resultObject);
	          }
	        };
	      })(this);
	      ontext = (function(_this) {
	        return function(text) {
	          var charChild, s;
	          s = stack[stack.length - 1];
	          if (s) {
	            s[charkey] += text;
	            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
	              s[_this.options.childkey] = s[_this.options.childkey] || [];
	              charChild = {
	                '#name': '__text__'
	              };
	              charChild[charkey] = text;
	              if (_this.options.normalize) {
	                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
	              }
	              s[_this.options.childkey].push(charChild);
	            }
	            return s;
	          }
	        };
	      })(this);
	      this.saxParser.ontext = ontext;
	      return this.saxParser.oncdata = (function(_this) {
	        return function(text) {
	          var s;
	          s = ontext(text);
	          if (s) {
	            return s.cdata = true;
	          }
	        };
	      })();
	    };

	    Parser.prototype.parseString = function(str, cb) {
	      var err;
	      if ((cb != null) && typeof cb === "function") {
	        this.on("end", function(result) {
	          this.reset();
	          return cb(null, result);
	        });
	        this.on("error", function(err) {
	          this.reset();
	          return cb(err);
	        });
	      }
	      try {
	        str = str.toString();
	        if (str.trim() === '') {
	          this.emit("end", null);
	          return true;
	        }
	        str = bom$1.stripBOM(str);
	        if (this.options.async) {
	          this.remaining = str;
	          setImmediate(this.processAsync);
	          return this.saxParser;
	        }
	        return this.saxParser.write(str).close();
	      } catch (error1) {
	        err = error1;
	        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
	          this.emit('error', err);
	          return this.saxParser.errThrown = true;
	        } else if (this.saxParser.ended) {
	          throw err;
	        }
	      }
	    };

	    Parser.prototype.parseStringPromise = function(str) {
	      return new Promise((function(_this) {
	        return function(resolve, reject) {
	          return _this.parseString(str, function(err, value) {
	            if (err) {
	              return reject(err);
	            } else {
	              return resolve(value);
	            }
	          });
	        };
	      })(this));
	    };

	    return Parser;

	  })(events);

	  exports.parseString = function(str, a, b) {
	    var cb, options, parser;
	    if (b != null) {
	      if (typeof b === 'function') {
	        cb = b;
	      }
	      if (typeof a === 'object') {
	        options = a;
	      }
	    } else {
	      if (typeof a === 'function') {
	        cb = a;
	      }
	      options = {};
	    }
	    parser = new exports.Parser(options);
	    return parser.parseString(str, cb);
	  };

	  exports.parseStringPromise = function(str, a) {
	    var options, parser;
	    if (typeof a === 'object') {
	      options = a;
	    }
	    parser = new exports.Parser(options);
	    return parser.parseStringPromise(str);
	  };

	}).call(commonjsGlobal);
	});

	var xml2js = createCommonjsModule(function (module, exports) {
	// Generated by CoffeeScript 1.12.7
	(function() {
	  var builder$1, defaults$1, parser$1, processors$1,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  defaults$1 = defaults;

	  builder$1 = builder;

	  parser$1 = parser;

	  processors$1 = processors;

	  exports.defaults = defaults$1.defaults;

	  exports.processors = processors$1;

	  exports.ValidationError = (function(superClass) {
	    extend(ValidationError, superClass);

	    function ValidationError(message) {
	      this.message = message;
	    }

	    return ValidationError;

	  })(Error);

	  exports.Builder = builder$1.Builder;

	  exports.Parser = parser$1.Parser;

	  exports.parseString = parser$1.parseString;

	  exports.parseStringPromise = parser$1.parseStringPromise;

	}).call(commonjsGlobal);
	});

	var browser$1 = noop$3;
	var HttpsAgent = noop$3;

	// Noop function for browser since native api's don't use agents.
	function noop$3 () {}
	browser$1.HttpsAgent = HttpsAgent;

	/*!
	 * merge-descriptors
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * Module exports.
	 * @public
	 */

	var mergeDescriptors = merge;

	/**
	 * Module variables.
	 * @private
	 */

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Merge the property descriptors of `src` into `dest`
	 *
	 * @param {object} dest Object to add descriptors to
	 * @param {object} src Object to clone descriptors from
	 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
	 * @returns {object} Reference to dest
	 * @public
	 */

	function merge(dest, src, redefine) {
	  if (!dest) {
	    throw new TypeError('argument dest is required')
	  }

	  if (!src) {
	    throw new TypeError('argument src is required')
	  }

	  if (redefine === undefined) {
	    // Default to true
	    redefine = true;
	  }

	  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
	    if (!redefine && hasOwnProperty.call(dest, name)) {
	      // Skip desriptor
	      return
	    }

	    // Copy descriptor
	    var descriptor = Object.getOwnPropertyDescriptor(src, name);
	    Object.defineProperty(dest, name, descriptor);
	  });

	  return dest
	}

	var platform = createCommonjsModule(function (module, exports) {
	(function() {

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Used as a reference to the global object. */
	  var root = (objectTypes[typeof window] && window) || this;

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes['object'] && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes['object'] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
	  var freeGlobal = freeExports && freeModule && typeof commonjsGlobal == 'object' && commonjsGlobal;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
	    root = freeGlobal;
	  }

	  /**
	   * Used as the maximum length of an array-like object.
	   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   */
	  var maxSafeInteger = Math.pow(2, 53) - 1;

	  /** Regular expression to detect Opera. */
	  var reOpera = /\bOpera/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check for own properties of an object. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Used to resolve the internal `[[Class]]` of values. */
	  var toString = objectProto.toString;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Capitalizes a string value.
	   *
	   * @private
	   * @param {string} string The string to capitalize.
	   * @returns {string} The capitalized string.
	   */
	  function capitalize(string) {
	    string = String(string);
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }

	  /**
	   * A utility function to clean up the OS name.
	   *
	   * @private
	   * @param {string} os The OS name to clean up.
	   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
	   * @param {string} [label] A label for the OS.
	   */
	  function cleanupOS(os, pattern, label) {
	    // Platform tokens are defined at:
	    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    var data = {
	      '10.0': '10',
	      '6.4':  '10 Technical Preview',
	      '6.3':  '8.1',
	      '6.2':  '8',
	      '6.1':  'Server 2008 R2 / 7',
	      '6.0':  'Server 2008 / Vista',
	      '5.2':  'Server 2003 / XP 64-bit',
	      '5.1':  'XP',
	      '5.01': '2000 SP1',
	      '5.0':  '2000',
	      '4.0':  'NT',
	      '4.90': 'ME'
	    };
	    // Detect Windows version from platform tokens.
	    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
	        (data = data[/[\d.]+$/.exec(os)])) {
	      os = 'Windows ' + data;
	    }
	    // Correct character case and cleanup string.
	    os = String(os);

	    if (pattern && label) {
	      os = os.replace(RegExp(pattern, 'i'), label);
	    }

	    os = format(
	      os.replace(/ ce$/i, ' CE')
	        .replace(/\bhpw/i, 'web')
	        .replace(/\bMacintosh\b/, 'Mac OS')
	        .replace(/_PowerPC\b/i, ' OS')
	        .replace(/\b(OS X) [^ \d]+/i, '$1')
	        .replace(/\bMac (OS X)\b/, '$1')
	        .replace(/\/(\d)/, ' $1')
	        .replace(/_/g, '.')
	        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
	        .replace(/\bx86\.64\b/gi, 'x86_64')
	        .replace(/\b(Windows Phone) OS\b/, '$1')
	        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
	        .split(' on ')[0]
	    );

	    return os;
	  }

	  /**
	   * An iteration utility for arrays and objects.
	   *
	   * @private
	   * @param {Array|Object} object The object to iterate over.
	   * @param {Function} callback The function called per iteration.
	   */
	  function each(object, callback) {
	    var index = -1,
	        length = object ? object.length : 0;

	    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
	      while (++index < length) {
	        callback(object[index], index, object);
	      }
	    } else {
	      forOwn(object, callback);
	    }
	  }

	  /**
	   * Trim and conditionally capitalize string values.
	   *
	   * @private
	   * @param {string} string The string to format.
	   * @returns {string} The formatted string.
	   */
	  function format(string) {
	    string = trim(string);
	    return /^(?:webOS|i(?:OS|P))/.test(string)
	      ? string
	      : capitalize(string);
	  }

	  /**
	   * Iterates over an object's own properties, executing the `callback` for each.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} callback The function executed per own property.
	   */
	  function forOwn(object, callback) {
	    for (var key in object) {
	      if (hasOwnProperty.call(object, key)) {
	        callback(object[key], key, object);
	      }
	    }
	  }

	  /**
	   * Gets the internal `[[Class]]` of a value.
	   *
	   * @private
	   * @param {*} value The value.
	   * @returns {string} The `[[Class]]`.
	   */
	  function getClassOf(value) {
	    return value == null
	      ? capitalize(value)
	      : toString.call(value).slice(8, -1);
	  }

	  /**
	   * Host objects can return type values that are different from their actual
	   * data type. The objects we are concerned with usually return non-primitive
	   * types of "object", "function", or "unknown".
	   *
	   * @private
	   * @param {*} object The owner of the property.
	   * @param {string} property The property to check.
	   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
	   */
	  function isHostType(object, property) {
	    var type = object != null ? typeof object[property] : 'number';
	    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
	      (type == 'object' ? !!object[property] : true);
	  }

	  /**
	   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
	   *
	   * @private
	   * @param {string} string The string to qualify.
	   * @returns {string} The qualified string.
	   */
	  function qualify(string) {
	    return String(string).replace(/([ -])(?!$)/g, '$1?');
	  }

	  /**
	   * A bare-bones `Array#reduce` like utility function.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} callback The function called per iteration.
	   * @returns {*} The accumulated result.
	   */
	  function reduce(array, callback) {
	    var accumulator = null;
	    each(array, function(value, index) {
	      accumulator = callback(accumulator, value, index, array);
	    });
	    return accumulator;
	  }

	  /**
	   * Removes leading and trailing whitespace from a string.
	   *
	   * @private
	   * @param {string} string The string to trim.
	   * @returns {string} The trimmed string.
	   */
	  function trim(string) {
	    return String(string).replace(/^ +| +$/g, '');
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a new platform object.
	   *
	   * @memberOf platform
	   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
	   *  context object.
	   * @returns {Object} A platform object.
	   */
	  function parse(ua) {

	    /** The environment context object. */
	    var context = root;

	    /** Used to flag when a custom context is provided. */
	    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

	    // Juggle arguments.
	    if (isCustomContext) {
	      context = ua;
	      ua = null;
	    }

	    /** Browser navigator object. */
	    var nav = context.navigator || {};

	    /** Browser user agent string. */
	    var userAgent = nav.userAgent || '';

	    ua || (ua = userAgent);

	    /** Used to detect if browser is like Chrome. */
	    var likeChrome = isCustomContext
	      ? !!nav.likeChrome
	      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

	    /** Internal `[[Class]]` value shortcuts. */
	    var objectClass = 'Object',
	        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
	        enviroClass = isCustomContext ? objectClass : 'Environment',
	        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
	        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

	    /** Detect Java environments. */
	    var java = /\bJava/.test(javaClass) && context.java;

	    /** Detect Rhino. */
	    var rhino = java && getClassOf(context.environment) == enviroClass;

	    /** A character to represent alpha. */
	    var alpha = java ? 'a' : '\u03b1';

	    /** A character to represent beta. */
	    var beta = java ? 'b' : '\u03b2';

	    /** Browser document object. */
	    var doc = context.document || {};

	    /**
	     * Detect Opera browser (Presto-based).
	     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
	     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
	     */
	    var opera = context.operamini || context.opera;

	    /** Opera `[[Class]]`. */
	    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
	      ? operaClass
	      : (opera = null);

	    /*------------------------------------------------------------------------*/

	    /** Temporary variable used over the script's lifetime. */
	    var data;

	    /** The CPU architecture. */
	    var arch = ua;

	    /** Platform description array. */
	    var description = [];

	    /** Platform alpha/beta indicator. */
	    var prerelease = null;

	    /** A flag to indicate that environment features should be used to resolve the platform. */
	    var useFeatures = ua == userAgent;

	    /** The browser/environment version. */
	    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

	    /** A flag to indicate if the OS ends with "/ Version" */
	    var isSpecialCasedOS;

	    /* Detectable layout engines (order is important). */
	    var layout = getLayout([
	      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
	      'Trident',
	      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
	      'iCab',
	      'Presto',
	      'NetFront',
	      'Tasman',
	      'KHTML',
	      'Gecko'
	    ]);

	    /* Detectable browser names (order is important). */
	    var name = getName([
	      'Adobe AIR',
	      'Arora',
	      'Avant Browser',
	      'Breach',
	      'Camino',
	      'Electron',
	      'Epiphany',
	      'Fennec',
	      'Flock',
	      'Galeon',
	      'GreenBrowser',
	      'iCab',
	      'Iceweasel',
	      'K-Meleon',
	      'Konqueror',
	      'Lunascape',
	      'Maxthon',
	      { 'label': 'Microsoft Edge', 'pattern': '(?:Edge|Edg|EdgA|EdgiOS)' },
	      'Midori',
	      'Nook Browser',
	      'PaleMoon',
	      'PhantomJS',
	      'Raven',
	      'Rekonq',
	      'RockMelt',
	      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
	      'SeaMonkey',
	      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Sleipnir',
	      'SlimBrowser',
	      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
	      'Sunrise',
	      'Swiftfox',
	      'Vivaldi',
	      'Waterfox',
	      'WebPositive',
	      { 'label': 'Yandex Browser', 'pattern': 'YaBrowser' },
	      { 'label': 'UC Browser', 'pattern': 'UCBrowser' },
	      'Opera Mini',
	      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
	      'Opera',
	      { 'label': 'Opera', 'pattern': 'OPR' },
	      'Chromium',
	      'Chrome',
	      { 'label': 'Chrome', 'pattern': '(?:HeadlessChrome)' },
	      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
	      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
	      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
	      { 'label': 'IE', 'pattern': 'IEMobile' },
	      { 'label': 'IE', 'pattern': 'MSIE' },
	      'Safari'
	    ]);

	    /* Detectable products (order is important). */
	    var product = getProduct([
	      { 'label': 'BlackBerry', 'pattern': 'BB10' },
	      'BlackBerry',
	      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
	      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
	      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
	      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
	      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
	      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
	      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
	      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
	      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
	      'Google TV',
	      'Lumia',
	      'iPad',
	      'iPod',
	      'iPhone',
	      'Kindle',
	      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Nexus',
	      'Nook',
	      'PlayBook',
	      'PlayStation Vita',
	      'PlayStation',
	      'TouchPad',
	      'Transformer',
	      { 'label': 'Wii U', 'pattern': 'WiiU' },
	      'Wii',
	      'Xbox One',
	      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
	      'Xoom'
	    ]);

	    /* Detectable manufacturers. */
	    var manufacturer = getManufacturer({
	      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
	      'Alcatel': {},
	      'Archos': {},
	      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
	      'Asus': { 'Transformer': 1 },
	      'Barnes & Noble': { 'Nook': 1 },
	      'BlackBerry': { 'PlayBook': 1 },
	      'Google': { 'Google TV': 1, 'Nexus': 1 },
	      'HP': { 'TouchPad': 1 },
	      'HTC': {},
	      'Huawei': {},
	      'Lenovo': {},
	      'LG': {},
	      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
	      'Motorola': { 'Xoom': 1 },
	      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
	      'Nokia': { 'Lumia': 1 },
	      'Oppo': {},
	      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
	      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 },
	      'Xiaomi': { 'Mi': 1, 'Redmi': 1 }
	    });

	    /* Detectable operating systems (order is important). */
	    var os = getOS([
	      'Windows Phone',
	      'KaiOS',
	      'Android',
	      'CentOS',
	      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
	      'Debian',
	      { 'label': 'DragonFly BSD', 'pattern': 'DragonFly' },
	      'Fedora',
	      'FreeBSD',
	      'Gentoo',
	      'Haiku',
	      'Kubuntu',
	      'Linux Mint',
	      'OpenBSD',
	      'Red Hat',
	      'SuSE',
	      'Ubuntu',
	      'Xubuntu',
	      'Cygwin',
	      'Symbian OS',
	      'hpwOS',
	      'webOS ',
	      'webOS',
	      'Tablet OS',
	      'Tizen',
	      'Linux',
	      'Mac OS X',
	      'Macintosh',
	      'Mac',
	      'Windows 98;',
	      'Windows '
	    ]);

	    /*------------------------------------------------------------------------*/

	    /**
	     * Picks the layout engine from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected layout engine.
	     */
	    function getLayout(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }

	    /**
	     * Picks the manufacturer from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An object of guesses.
	     * @returns {null|string} The detected manufacturer.
	     */
	    function getManufacturer(guesses) {
	      return reduce(guesses, function(result, value, key) {
	        // Lookup the manufacturer by product or scan the UA for the manufacturer.
	        return result || (
	          value[product] ||
	          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
	          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
	        ) && key;
	      });
	    }

	    /**
	     * Picks the browser name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected browser name.
	     */
	    function getName(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }

	    /**
	     * Picks the OS name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected OS name.
	     */
	    function getOS(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
	            )) {
	          result = cleanupOS(result, pattern, guess.label || guess);
	        }
	        return result;
	      });
	    }

	    /**
	     * Picks the product name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected product name.
	     */
	    function getProduct(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
	              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
	              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
	            )) {
	          // Split by forward slash and append product version if needed.
	          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
	            result[0] += ' ' + result[1];
	          }
	          // Correct character case and cleanup string.
	          guess = guess.label || guess;
	          result = format(result[0]
	            .replace(RegExp(pattern, 'i'), guess)
	            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
	            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
	        }
	        return result;
	      });
	    }

	    /**
	     * Resolves the version using an array of UA patterns.
	     *
	     * @private
	     * @param {Array} patterns An array of UA patterns.
	     * @returns {null|string} The detected version.
	     */
	    function getVersion(patterns) {
	      return reduce(patterns, function(result, pattern) {
	        return result || (RegExp(pattern +
	          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
	      });
	    }

	    /**
	     * Returns `platform.description` when the platform object is coerced to a string.
	     *
	     * @name toString
	     * @memberOf platform
	     * @returns {string} Returns `platform.description` if available, else an empty string.
	     */
	    function toStringPlatform() {
	      return this.description || '';
	    }

	    /*------------------------------------------------------------------------*/

	    // Convert layout to an array so we can add extra details.
	    layout && (layout = [layout]);

	    // Detect Android products.
	    // Browsers on Android devices typically provide their product IDS after "Android;"
	    // up to "Build" or ") AppleWebKit".
	    // Example:
	    // "Mozilla/5.0 (Linux; Android 8.1.0; Moto G (5) Plus) AppleWebKit/537.36
	    // (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36"
	    if (/\bAndroid\b/.test(os) && !product &&
	        (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
	      product = trim(data[1])
	        // Replace any language codes (eg. "en-US").
	        .replace(/^[a-z]{2}-[a-z]{2};\s*/i, '')
	        || null;
	    }
	    // Detect product names that contain their manufacturer's name.
	    if (manufacturer && !product) {
	      product = getProduct([manufacturer]);
	    } else if (manufacturer && product) {
	      product = product
	        .replace(RegExp('^(' + qualify(manufacturer) + ')[-_.\\s]', 'i'), manufacturer + ' ')
	        .replace(RegExp('^(' + qualify(manufacturer) + ')[-_.]?(\\w)', 'i'), manufacturer + ' $2');
	    }
	    // Clean up Google TV.
	    if ((data = /\bGoogle TV\b/.exec(product))) {
	      product = data[0];
	    }
	    // Detect simulators.
	    if (/\bSimulator\b/i.test(ua)) {
	      product = (product ? product + ' ' : '') + 'Simulator';
	    }
	    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
	    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
	      description.push('running in Turbo/Uncompressed mode');
	    }
	    // Detect IE Mobile 11.
	    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
	      data = parse(ua.replace(/like iPhone OS/, ''));
	      manufacturer = data.manufacturer;
	      product = data.product;
	    }
	    // Detect iOS.
	    else if (/^iP/.test(product)) {
	      name || (name = 'Safari');
	      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
	        ? ' ' + data[1].replace(/_/g, '.')
	        : '');
	    }
	    // Detect Kubuntu.
	    else if (name == 'Konqueror' && /^Linux\b/i.test(os)) {
	      os = 'Kubuntu';
	    }
	    // Detect Android browsers.
	    else if ((manufacturer && manufacturer != 'Google' &&
	        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
	        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
	      name = 'Android Browser';
	      os = /\bAndroid\b/.test(os) ? os : 'Android';
	    }
	    // Detect Silk desktop/accelerated modes.
	    else if (name == 'Silk') {
	      if (!/\bMobi/i.test(ua)) {
	        os = 'Android';
	        description.unshift('desktop mode');
	      }
	      if (/Accelerated *= *true/i.test(ua)) {
	        description.unshift('accelerated');
	      }
	    }
	    // Detect UC Browser speed mode.
	    else if (name == 'UC Browser' && /\bUCWEB\b/.test(ua)) {
	      description.push('speed mode');
	    }
	    // Detect PaleMoon identifying as Firefox.
	    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
	      description.push('identifying as Firefox ' + data[1]);
	    }
	    // Detect Firefox OS and products running Firefox.
	    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
	      os || (os = 'Firefox OS');
	      product || (product = data[1]);
	    }
	    // Detect false positives for Firefox/Safari.
	    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
	      // Escape the `/` for Firefox 1.
	      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
	        // Clear name of false positives.
	        name = null;
	      }
	      // Reassign a generic name.
	      if ((data = product || manufacturer || os) &&
	          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
	        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
	      }
	    }
	    // Add Chrome version to description for Electron.
	    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
	      description.push('Chromium ' + data);
	    }
	    // Detect non-Opera (Presto-based) versions (order is important).
	    if (!version) {
	      version = getVersion([
	        '(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)',
	        'Version',
	        qualify(name),
	        '(?:Firefox|Minefield|NetFront)'
	      ]);
	    }
	    // Detect stubborn layout engines.
	    if ((data =
	          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
	          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
	          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
	          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
	          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
	        )) {
	      layout = [data];
	    }
	    // Detect Windows Phone 7 desktop mode.
	    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
	      name += ' Mobile';
	      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
	      description.unshift('desktop mode');
	    }
	    // Detect Windows Phone 8.x desktop mode.
	    else if (/\bWPDesktop\b/i.test(ua)) {
	      name = 'IE Mobile';
	      os = 'Windows Phone 8.x';
	      description.unshift('desktop mode');
	      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
	    }
	    // Detect IE 11 identifying as other browsers.
	    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
	      if (name) {
	        description.push('identifying as ' + name + (version ? ' ' + version : ''));
	      }
	      name = 'IE';
	      version = data[1];
	    }
	    // Leverage environment features.
	    if (useFeatures) {
	      // Detect server-side environments.
	      // Rhino has a global function while others have a global object.
	      if (isHostType(context, 'global')) {
	        if (java) {
	          data = java.lang.System;
	          arch = data.getProperty('os.arch');
	          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
	        }
	        if (rhino) {
	          try {
	            version = context.require('ringo/engine').version.join('.');
	            name = 'RingoJS';
	          } catch(e) {
	            if ((data = context.system) && data.global.system == context.system) {
	              name = 'Narwhal';
	              os || (os = data[0].os || null);
	            }
	          }
	          if (!name) {
	            name = 'Rhino';
	          }
	        }
	        else if (
	          typeof context.process == 'object' && !context.process.browser &&
	          (data = context.process)
	        ) {
	          if (typeof data.versions == 'object') {
	            if (typeof data.versions.electron == 'string') {
	              description.push('Node ' + data.versions.node);
	              name = 'Electron';
	              version = data.versions.electron;
	            } else if (typeof data.versions.nw == 'string') {
	              description.push('Chromium ' + version, 'Node ' + data.versions.node);
	              name = 'NW.js';
	              version = data.versions.nw;
	            }
	          }
	          if (!name) {
	            name = 'Node.js';
	            arch = data.arch;
	            os = data.platform;
	            version = /[\d.]+/.exec(data.version);
	            version = version ? version[0] : null;
	          }
	        }
	      }
	      // Detect Adobe AIR.
	      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
	        name = 'Adobe AIR';
	        os = data.flash.system.Capabilities.os;
	      }
	      // Detect PhantomJS.
	      else if (getClassOf((data = context.phantom)) == phantomClass) {
	        name = 'PhantomJS';
	        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
	      }
	      // Detect IE compatibility modes.
	      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
	        // We're in compatibility mode when the Trident version + 4 doesn't
	        // equal the document mode.
	        version = [version, doc.documentMode];
	        if ((data = +data[1] + 4) != version[1]) {
	          description.push('IE ' + version[1] + ' mode');
	          layout && (layout[1] = '');
	          version[1] = data;
	        }
	        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
	      }
	      // Detect IE 11 masking as other browsers.
	      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
	        description.push('masking as ' + name + ' ' + version);
	        name = 'IE';
	        version = '11.0';
	        layout = ['Trident'];
	        os = 'Windows';
	      }
	      os = os && format(os);
	    }
	    // Detect prerelease phases.
	    if (version && (data =
	          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
	          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
	          /\bMinefield\b/i.test(ua) && 'a'
	        )) {
	      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
	      version = version.replace(RegExp(data + '\\+?$'), '') +
	        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
	    }
	    // Detect Firefox Mobile.
	    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
	      name = 'Firefox Mobile';
	    }
	    // Obscure Maxthon's unreliable version.
	    else if (name == 'Maxthon' && version) {
	      version = version.replace(/\.[\d.]+/, '.x');
	    }
	    // Detect Xbox 360 and Xbox One.
	    else if (/\bXbox\b/i.test(product)) {
	      if (product == 'Xbox 360') {
	        os = null;
	      }
	      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
	        description.unshift('mobile mode');
	      }
	    }
	    // Add mobile postfix.
	    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
	        (os == 'Windows CE' || /Mobi/i.test(ua))) {
	      name += ' Mobile';
	    }
	    // Detect IE platform preview.
	    else if (name == 'IE' && useFeatures) {
	      try {
	        if (context.external === null) {
	          description.unshift('platform preview');
	        }
	      } catch(e) {
	        description.unshift('embedded');
	      }
	    }
	    // Detect BlackBerry OS version.
	    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
	    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
	          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
	          version
	        )) {
	      data = [data, /BB10/.test(ua)];
	      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
	      version = null;
	    }
	    // Detect Opera identifying/masking itself as another browser.
	    // http://www.opera.com/support/kb/view/843/
	    else if (this != forOwn && product != 'Wii' && (
	          (useFeatures && opera) ||
	          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
	          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
	          (name == 'IE' && (
	            (os && !/^Win/.test(os) && version > 5.5) ||
	            /\bWindows XP\b/.test(os) && version > 8 ||
	            version == 8 && !/\bTrident\b/.test(ua)
	          ))
	        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
	      // When "identifying", the UA contains both Opera and the other browser's name.
	      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
	      if (reOpera.test(name)) {
	        if (/\bIE\b/.test(data) && os == 'Mac OS') {
	          os = null;
	        }
	        data = 'identify' + data;
	      }
	      // When "masking", the UA contains only the other browser's name.
	      else {
	        data = 'mask' + data;
	        if (operaClass) {
	          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
	        } else {
	          name = 'Opera';
	        }
	        if (/\bIE\b/.test(data)) {
	          os = null;
	        }
	        if (!useFeatures) {
	          version = null;
	        }
	      }
	      layout = ['Presto'];
	      description.push(data);
	    }
	    // Detect WebKit Nightly and approximate Chrome/Safari versions.
	    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	      // Correct build number for numeric comparison.
	      // (e.g. "532.5" becomes "532.05")
	      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
	      // Nightly builds are postfixed with a "+".
	      if (name == 'Safari' && data[1].slice(-1) == '+') {
	        name = 'WebKit Nightly';
	        prerelease = 'alpha';
	        version = data[1].slice(0, -1);
	      }
	      // Clear incorrect browser versions.
	      else if (version == data[1] ||
	          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	        version = null;
	      }
	      // Use the full Chrome version when available.
	      data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
	      // Detect Blink layout engine.
	      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
	        layout = ['Blink'];
	      }
	      // Detect JavaScriptCore.
	      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
	      if (!useFeatures || (!likeChrome && !data[1])) {
	        layout && (layout[1] = 'like Safari');
	        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : '12');
	      } else {
	        layout && (layout[1] = 'like Chrome');
	        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
	      }
	      // Add the postfix of ".x" or "+" for approximate versions.
	      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
	      // Obscure version for some Safari 1-2 releases.
	      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
	        version = data;
	      } else if (name == 'Chrome' && /\bHeadlessChrome/i.test(ua)) {
	        description.unshift('headless');
	      }
	    }
	    // Detect Opera desktop modes.
	    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
	      name += ' ';
	      description.unshift('desktop mode');
	      if (data == 'zvav') {
	        name += 'Mini';
	        version = null;
	      } else {
	        name += 'Mobile';
	      }
	      os = os.replace(RegExp(' *' + data + '$'), '');
	    }
	    // Detect Chrome desktop mode.
	    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
	      description.unshift('desktop mode');
	      name = 'Chrome Mobile';
	      version = null;

	      if (/\bOS X\b/.test(os)) {
	        manufacturer = 'Apple';
	        os = 'iOS 4.3+';
	      } else {
	        os = null;
	      }
	    }
	    // Newer versions of SRWare Iron uses the Chrome tag to indicate its version number.
	    else if (/\bSRWare Iron\b/.test(name) && !version) {
	      version = getVersion('Chrome');
	    }
	    // Strip incorrect OS versions.
	    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
	        ua.indexOf('/' + data + '-') > -1) {
	      os = trim(os.replace(data, ''));
	    }
	    // Ensure OS does not include the browser name.
	    if (os && os.indexOf(name) != -1 && !RegExp(name + ' OS').test(os)) {
	      os = os.replace(RegExp(' *' + qualify(name) + ' *'), '');
	    }
	    // Add layout engine.
	    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
	        /Browser|Lunascape|Maxthon/.test(name) ||
	        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
	        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
	      // Don't add layout details to description if they are falsey.
	      (data = layout[layout.length - 1]) && description.push(data);
	    }
	    // Combine contextual information.
	    if (description.length) {
	      description = ['(' + description.join('; ') + ')'];
	    }
	    // Append manufacturer to description.
	    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
	      description.push('on ' + manufacturer);
	    }
	    // Append product to description.
	    if (product) {
	      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
	    }
	    // Parse the OS into an object.
	    if (os) {
	      data = / ([\d.+]+)$/.exec(os);
	      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
	      os = {
	        'architecture': 32,
	        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
	        'version': data ? data[1] : null,
	        'toString': function() {
	          var version = this.version;
	          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
	        }
	      };
	    }
	    // Add browser/OS architecture.
	    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
	      if (os) {
	        os.architecture = 64;
	        os.family = os.family.replace(RegExp(' *' + data), '');
	      }
	      if (
	          name && (/\bWOW64\b/i.test(ua) ||
	          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
	      ) {
	        description.unshift('32-bit');
	      }
	    }
	    // Chrome 39 and above on OS X is always 64-bit.
	    else if (
	        os && /^OS X/.test(os.family) &&
	        name == 'Chrome' && parseFloat(version) >= 39
	    ) {
	      os.architecture = 64;
	    }

	    ua || (ua = null);

	    /*------------------------------------------------------------------------*/

	    /**
	     * The platform object.
	     *
	     * @name platform
	     * @type Object
	     */
	    var platform = {};

	    /**
	     * The platform description.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.description = ua;

	    /**
	     * The name of the browser's layout engine.
	     *
	     * The list of common layout engines include:
	     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.layout = layout && layout[0];

	    /**
	     * The name of the product's manufacturer.
	     *
	     * The list of manufacturers include:
	     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
	     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
	     * "Nokia", "Samsung" and "Sony"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.manufacturer = manufacturer;

	    /**
	     * The name of the browser/environment.
	     *
	     * The list of common browser names include:
	     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
	     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
	     * "Opera Mini" and "Opera"
	     *
	     * Mobile versions of some browsers have "Mobile" appended to their name:
	     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.name = name;

	    /**
	     * The alpha/beta release indicator.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.prerelease = prerelease;

	    /**
	     * The name of the product hosting the browser.
	     *
	     * The list of common products include:
	     *
	     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
	     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.product = product;

	    /**
	     * The browser's user agent string.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.ua = ua;

	    /**
	     * The browser/environment version.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.version = name && version;

	    /**
	     * The name of the operating system.
	     *
	     * @memberOf platform
	     * @type Object
	     */
	    platform.os = os || {

	      /**
	       * The CPU architecture the OS is built for.
	       *
	       * @memberOf platform.os
	       * @type number|null
	       */
	      'architecture': null,

	      /**
	       * The family of the OS.
	       *
	       * Common values include:
	       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
	       * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
	       * "SuSE", "Android", "iOS" and "Windows Phone"
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'family': null,

	      /**
	       * The version of the OS.
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'version': null,

	      /**
	       * Returns the OS string.
	       *
	       * @memberOf platform.os
	       * @returns {string} The OS string.
	       */
	      'toString': function() { return 'null'; }
	    };

	    platform.parse = parse;
	    platform.toString = toStringPlatform;

	    if (platform.version) {
	      description.unshift(version);
	    }
	    if (platform.name) {
	      description.unshift(name);
	    }
	    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
	      description.push(product ? '(' + os + ')' : 'on ' + os);
	    }
	    if (description.length) {
	      platform.description = description.join(' ');
	    }
	    return platform;
	  }

	  /*--------------------------------------------------------------------------*/

	  // Export platform.
	  var platform = parse();

	  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
	  if (freeExports && freeModule) {
	    // Export for CommonJS support.
	    forOwn(platform, function(value, key) {
	      freeExports[key] = value;
	    });
	  }
	  else {
	    // Export to the global object.
	    root.platform = platform;
	  }
	}.call(commonjsGlobal));
	});

	/*!
	 * escape-html
	 * Copyright(c) 2012-2013 TJ Holowaychuk
	 * Copyright(c) 2015 Andreas Lubbe
	 * Copyright(c) 2015 Tiancheng "Timothy" Gu
	 * MIT Licensed
	 */

	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Module exports.
	 * @public
	 */

	var escapeHtml_1 = escapeHtml;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}

	// copy from https://github.com/node-modules/utility for browser

	var _encodeURIComponent = function (text) {
	  try {
	    return encodeURIComponent(text);
	  } catch (e) {
	    return text;
	  }
	};

	var _escape = escapeHtml_1;

	var timestamp = function timestamp(t) {
	  if (t) {
	    var v = t;
	    if (typeof v === 'string') {
	      v = Number(v);
	    }
	    if (String(t).length === 10) {
	      v *= 1000;
	    }
	    return new Date(v);
	  }
	  return Math.round(Date.now() / 1000);
	};

	var utility = {
		encodeURIComponent: _encodeURIComponent,
		escape: _escape,
		timestamp: timestamp
	};

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	var ms = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse$1(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse$1(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}

	/**
	 * Module dependencies.
	 */




	var humanizeMs = function (t) {
	  if (typeof t === 'number') return t;
	  var r = ms(t);
	  if (r === undefined) {
	    var err = new Error(util__default['default'].format('humanize-ms(%j) result undefined', t));
	    console.warn(err.stack);
	  }
	  return r;
	};

	var xhr = createCommonjsModule(function (module, exports) {





	var debug = debug$2();

	var REQUEST_ID = 0;
	var MAX_VALUE = Math.pow(2, 31) - 10;
	var PROTO_RE = /^https?:\/\//i;

	function getAgent(agent, defaultAgent) {
	  return agent === undefined ? defaultAgent : agent;
	}

	function makeCallback(resolve, reject) {
	  return function (err, data, res) {
	    if (err) {
	      return reject(err);
	    }
	    resolve({
	      data: data,
	      status: res.statusCode,
	      headers: res.headers,
	      res: res
	    });
	  };
	}

	// exports.TIMEOUT = ms('5s');
	exports.TIMEOUTS = [humanizeMs('300s'), humanizeMs('300s')];

	var TEXT_DATA_TYPES = [
	  'json',
	  'text'
	];

	exports.request = function request(url, args, callback) {
	  // request(url, callback)
	  if (arguments.length === 2 && typeof args === 'function') {
	    callback = args;
	    args = null;
	  }
	  if (typeof callback === 'function') {
	    return exports.requestWithCallback(url, args, callback);
	  }

	  return new Promise(function (resolve, reject) {
	    exports.requestWithCallback(url, args, makeCallback(resolve, reject));
	  });
	};


	exports.requestWithCallback = function requestWithCallback(url, args, callback) {
	  // requestWithCallback(url, callback)
	  if (!url || (typeof url !== 'string' && typeof url !== 'object')) {
	    var msg = util__default['default'].format('expect request url to be a string or a http request options, but got %j', url);
	    throw new Error(msg);
	  }

	  if (arguments.length === 2 && typeof args === 'function') {
	    callback = args;
	    args = null;
	  }

	  args = args || {};
	  if (REQUEST_ID >= MAX_VALUE) {
	    REQUEST_ID = 0;
	  }
	  var reqId = ++REQUEST_ID;

	  args.requestUrls = args.requestUrls || [];

	  var reqMeta = {
	    requestId: reqId,
	    url: url,
	    args: args,
	    ctx: args.ctx,
	  };
	  if (args.emitter) {
	    args.emitter.emit('request', reqMeta);
	  }

	  args.timeout = args.timeout || exports.TIMEOUTS;
	  args.maxRedirects = args.maxRedirects || 10;
	  args.streaming = args.streaming || args.customResponse;
	  var requestStartTime = Date.now();
	  var parsedUrl;

	  if (typeof url === 'string') {
	    if (!PROTO_RE.test(url)) {
	      // Support `request('www.server.com')`
	      url = 'http://' + url;
	    }
	    parsedUrl = urlutil__default['default'].parse(url);
	  } else {
	    parsedUrl = url;
	  }

	  var method = (args.type || args.method || parsedUrl.method || 'GET').toUpperCase();
	  var port = parsedUrl.port || 80;
	  var httplib = http__default['default'];
	  var agent = getAgent(args.agent, exports.agent);
	  var fixJSONCtlChars = args.fixJSONCtlChars;

	  if (parsedUrl.protocol === 'https:') {
	    httplib = https__default['default'];
	    agent = getAgent(args.httpsAgent, exports.httpsAgent);

	    if (!parsedUrl.port) {
	      port = 443;
	    }
	  }

	  // request through proxy tunnel
	  // var proxyTunnelAgent = detectProxyAgent(parsedUrl, args);
	  // if (proxyTunnelAgent) {
	  //   agent = proxyTunnelAgent;
	  // }

	  var options = {
	    host: parsedUrl.hostname || parsedUrl.host || 'localhost',
	    path: parsedUrl.path || '/',
	    method: method,
	    port: port,
	    agent: agent,
	    headers: args.headers || {},
	    // default is dns.lookup
	    // https://github.com/nodejs/node/blob/master/lib/net.js#L986
	    // custom dnslookup require node >= 4.0.0
	    // https://github.com/nodejs/node/blob/archived-io.js-v0.12/lib/net.js#L952
	    lookup: args.lookup,
	  };

	  if (Array.isArray(args.timeout)) {
	    options.requestTimeout = args.timeout[args.timeout.length - 1];
	  } else if (typeof args.timeout !== 'undefined') {
	    options.requestTimeout = args.timeout;
	  }

	  var sslNames = [
	    'pfx',
	    'key',
	    'passphrase',
	    'cert',
	    'ca',
	    'ciphers',
	    'rejectUnauthorized',
	    'secureProtocol',
	    'secureOptions',
	  ];
	  for (var i = 0; i < sslNames.length; i++) {
	    var name = sslNames[i];
	    if (args.hasOwnProperty(name)) {
	      options[name] = args[name];
	    }
	  }

	  // don't check ssl
	  if (options.rejectUnauthorized === false && !options.hasOwnProperty('secureOptions')) {
	    options.secureOptions = require$$1__default$1['default'].SSL_OP_NO_TLSv1_2;
	  }

	  var auth = args.auth || parsedUrl.auth;
	  if (auth) {
	    options.auth = auth;
	  }

	  var body = args.content || args.data;
	  var dataAsQueryString = method === 'GET' || method === 'HEAD' || args.dataAsQueryString;
	  if (!args.content) {
	    if (body && !(typeof body === 'string' || Buffer.isBuffer(body))) {
	      if (dataAsQueryString) {
	        // read: GET, HEAD, use query string
	        body = args.nestedQuerystring ? qs.stringify(body) : querystring.stringify(body);
	      } else {
	        var contentType = options.headers['Content-Type'] || options.headers['content-type'];
	        // auto add application/x-www-form-urlencoded when using urlencode form request
	        if (!contentType) {
	          if (args.contentType === 'json') {
	            contentType = 'application/json';
	          } else {
	            contentType = 'application/x-www-form-urlencoded';
	          }
	          options.headers['Content-Type'] = contentType;
	        }

	        if (parseContentType(contentType).type === 'application/json') {
	          body = JSON.stringify(body);
	        } else {
	          // 'application/x-www-form-urlencoded'
	          body = args.nestedQuerystring ? qs.stringify(body) : querystring.stringify(body);
	        }
	      }
	    }
	  }

	  // if it's a GET or HEAD request, data should be sent as query string
	  if (dataAsQueryString && body) {
	    options.path += (parsedUrl.query ? '&' : '?') + body;
	    body = null;
	  }

	  var requestSize = 0;
	  if (body) {
	    var length = body.length;
	    if (!Buffer.isBuffer(body)) {
	      length = Buffer.byteLength(body);
	    }
	    requestSize = options.headers['Content-Length'] = length;
	  }

	  if (args.dataType === 'json') {
	    options.headers.Accept = 'application/json';
	  }

	  if (typeof args.beforeRequest === 'function') {
	    // you can use this hook to change every thing.
	    args.beforeRequest(options);
	  }
	  var connectTimer = null;
	  var responseTimer = null;
	  var __err = null;
	  var connected = false; // socket connected or not
	  var keepAliveSocket = false; // request with keepalive socket
	  var responseSize = 0;
	  var statusCode = -1;
	  var responseAborted = false;
	  var remoteAddress = '';
	  var remotePort = '';
	  var timing = null;
	  if (args.timing) {
	    timing = {
	      // socket assigned
	      queuing: 0,
	      // dns lookup time
	      dnslookup: 0,
	      // socket connected
	      connected: 0,
	      // request sent
	      requestSent: 0,
	      // Time to first byte (TTFB)
	      waiting: 0,
	      contentDownload: 0,
	    };
	  }

	  function cancelConnectTimer() {
	    if (connectTimer) {
	      clearTimeout(connectTimer);
	      connectTimer = null;
	    }
	  }
	  function cancelResponseTimer() {
	    if (responseTimer) {
	      clearTimeout(responseTimer);
	      responseTimer = null;
	    }
	  }

	  function done(err, data, res) {
	    cancelResponseTimer();
	    if (!callback) {
	      console.warn('[urllib:warn] [%s] [%s] [worker:%s] %s %s callback twice!!!',
	        Date(), reqId, process.pid, options.method, url);
	      // https://github.com/node-modules/urllib/pull/30
	      if (err) {
	        console.warn('[urllib:warn] [%s] [%s] [worker:%s] %s: %s\nstack: %s',
	          Date(), reqId, process.pid, err.name, err.message, err.stack);
	      }
	      return;
	    }
	    var cb = callback;
	    callback = null;
	    var headers = {};
	    if (res) {
	      statusCode = res.statusCode;
	      headers = res.headers;
	    }

	    // handle digest auth
	    if (statusCode === 401 && headers['www-authenticate']
	      && (!args.headers || !args.headers.Authorization) && args.digestAuth) {
	      var authenticate = headers['www-authenticate'];
	      if (authenticate.indexOf('Digest ') >= 0) {
	        args.headers = args.headers || {};
	        args.headers.Authorization = digestAuthHeader(options.method, options.path, authenticate, args.digestAuth);
	        debug('Request#%d %s: auth with digest header: %s', reqId, url, args.headers.Authorization);
	        if (res.headers['set-cookie']) {
	          args.headers.Cookie = res.headers['set-cookie'].join(';');
	        }
	        return exports.requestWithCallback(url, args, cb);
	      }
	    }

	    var requestUseTime = Date.now() - requestStartTime;
	    if (timing) {
	      timing.contentDownload = requestUseTime;
	    }

	    var response = {
	      status: statusCode,
	      statusCode: statusCode,
	      headers: headers,
	      size: responseSize,
	      aborted: responseAborted,
	      rt: requestUseTime,
	      keepAliveSocket: keepAliveSocket,
	      data: data,
	      requestUrls: args.requestUrls,
	      timing: timing,
	      remoteAddress: remoteAddress,
	      remotePort: remotePort,
	    };

	    if (err) {
	      var agentStatus = '';
	      if (agent && typeof agent.getCurrentStatus === 'function') {
	        // add current agent status to error message for logging and debug
	        agentStatus = ', agent status: ' + JSON.stringify(agent.getCurrentStatus());
	      }
	      err.message += ', ' + options.method + ' ' + url + ' ' + statusCode
	        + ' (connected: ' + connected + ', keepalive socket: ' + keepAliveSocket + agentStatus + ')'
	        + '\nheaders: ' + JSON.stringify(headers);
	      err.data = data;
	      err.path = options.path;
	      err.status = statusCode;
	      err.headers = headers;
	      err.res = response;
	    }

	    cb(err, data, args.streaming ? res : response);

	    if (args.emitter) {
	      // keep to use the same reqMeta object on request event before
	      reqMeta.url = url;
	      reqMeta.socket = req && req.connection;
	      reqMeta.options = options;
	      reqMeta.size = requestSize;

	      args.emitter.emit('response', {
	        requestId: reqId,
	        error: err,
	        ctx: args.ctx,
	        req: reqMeta,
	        res: response,
	      });
	    }
	  }

	  function handleRedirect(res) {
	    var err = null;
	    if (args.followRedirect && statuses.redirect[res.statusCode]) {  // handle redirect
	      args._followRedirectCount = (args._followRedirectCount || 0) + 1;
	      var location = res.headers.location;
	      if (!location) {
	        err = new Error('Got statusCode ' + res.statusCode + ' but cannot resolve next location from headers');
	        err.name = 'FollowRedirectError';
	      } else if (args._followRedirectCount > args.maxRedirects) {
	        err = new Error('Exceeded maxRedirects. Probably stuck in a redirect loop ' + url);
	        err.name = 'MaxRedirectError';
	      } else {
	        var newUrl = args.formatRedirectUrl ? args.formatRedirectUrl(url, location) : urlutil__default['default'].resolve(url, location);
	        // make sure timer stop
	        cancelResponseTimer();
	        // should clean up headers.Host on `location: http://other-domain/url`
	        if (args.headers && args.headers.Host && PROTO_RE.test(location)) {
	          args.headers.Host = null;
	        }
	        // avoid done will be execute in the future change.
	        var cb = callback;
	        callback = null;
	        exports.requestWithCallback(newUrl, args, cb);
	        return {
	          redirect: true,
	          error: null
	        };
	      }
	    }
	    return {
	      redirect: false,
	      error: err
	    };
	  }


	  if (args.gzip) {
	    if (!options.headers['Accept-Encoding'] && !options.headers['accept-encoding']) {
	      options.headers['Accept-Encoding'] = 'gzip';
	    }
	  }

	  function decodeContent(res, body, cb) {
	    var encoding = res.headers['content-encoding'];
	    // if (body.length === 0) {
	    //   return cb(null, body, encoding);
	    // }

	    // if (!encoding || encoding.toLowerCase() !== 'gzip') {
	      return cb(null, body, encoding);
	    // }

	    // debug('gunzip %d length body', body.length);
	    // zlib.gunzip(body, cb);
	  }

	  var writeStream = args.writeStream;

	  args.requestUrls.push(url);

	  function onResponse(res) {
	    if (timing) {
	      timing.waiting = Date.now() - requestStartTime;
	    }
	    debug('Request#%d %s `req response` event emit: status %d, headers: %j',
	      reqId, url, res.statusCode, res.headers);

	    if (args.streaming) {
	      var result = handleRedirect(res);
	      if (result.redirect) {
	        res.resume();
	        return;
	      }
	      if (result.error) {
	        res.resume();
	        return done(result.error, null, res);
	      }

	      return done(null, null, res);
	    }

	    res.on('close', function () {
	    });

	    res.on('error', function () {
	    });

	    res.on('aborted', function () {
	      responseAborted = true;
	    });

	    if (writeStream) {
	      // If there's a writable stream to recieve the response data, just pipe the
	      // response stream to that writable stream and call the callback when it has
	      // finished writing.
	      //
	      // NOTE that when the response stream `res` emits an 'end' event it just
	      // means that it has finished piping data to another stream. In the
	      // meanwhile that writable stream may still writing data to the disk until
	      // it emits a 'close' event.
	      //
	      // That means that we should not apply callback until the 'close' of the
	      // writable stream is emited.
	      //
	      // See also:
	      // - https://github.com/TBEDP/urllib/commit/959ac3365821e0e028c231a5e8efca6af410eabb
	      // - http://nodejs.org/api/stream.html#stream_event_end
	      // - http://nodejs.org/api/stream.html#stream_event_close_1
	      var result = handleRedirect(res);
	      if (result.redirect) {
	        res.resume();
	        return;
	      }
	      if (result.error) {
	        res.resume();
	        // end ths stream first
	        writeStream.end();
	        return done(result.error, null, res);
	      }
	      // you can set consumeWriteStream false that only wait response end
	      if (args.consumeWriteStream === false) {
	        res.on('end', done.bind(null, null, null, res));
	      } else {
	        // node 0.10, 0.12: only emit res aborted, writeStream close not fired
	        if (isNode010 || isNode012) {
	          first([
	            [ writeStream, 'close' ],
	            [ res, 'aborted' ],
	          ], function(_, stream, event) {
	            done(__err || null, null, res);
	          });
	        } else {
	          writeStream.on('close', function() {
	            done(__err || null, null, res);
	          });
	        }
	      }
	      return res.pipe(writeStream);
	    }

	    // Otherwise, just concat those buffers.
	    //
	    // NOTE that the `chunk` is not a String but a Buffer. It means that if
	    // you simply concat two chunk with `+` you're actually converting both
	    // Buffers into Strings before concating them. It'll cause problems when
	    // dealing with multi-byte characters.
	    //
	    // The solution is to store each chunk in an array and concat them with
	    // 'buffer-concat' when all chunks is recieved.
	    //
	    // See also:
	    // http://cnodejs.org/topic/4faf65852e8fb5bc65113403

	    var chunks = [];

	    res.on('data', function (chunk) {
	      debug('Request#%d %s: `res data` event emit, size %d', reqId, url, chunk.length);
	      responseSize += chunk.length;
	      chunks.push(chunk);
	    });

	    res.on('end', function () {
	      var body = Buffer.concat(chunks, responseSize);
	      debug('Request#%d %s: `res end` event emit, total size %d, _dumped: %s',
	        reqId, url, responseSize, res._dumped);

	      if (__err) {
	        // req.abort() after `res data` event emit.
	        return done(__err, body, res);
	      }

	      var result = handleRedirect(res);
	      if (result.error) {
	        return done(result.error, body, res);
	      }
	      if (result.redirect) {
	        return;
	      }

	      decodeContent(res, body, function (err, data, encoding) {
	        if (err) {
	          return done(err, body, res);
	        }
	        // if body not decode, dont touch it
	        if (!encoding && TEXT_DATA_TYPES.indexOf(args.dataType) >= 0) {
	          // try to decode charset
	          try {
	            data = decodeBodyByCharset(data, res);
	          } catch (e) {
	            // if error, dont touch it
	            return done(null, data, res);
	          }

	          if (args.dataType === 'json') {
	            if (responseSize === 0) {
	              data = null;
	            } else {
	              var r = parseJSON(data, fixJSONCtlChars);
	              if (r.error) {
	                err = r.error;
	              } else {
	                data = r.data;
	              }
	            }
	          }
	        }

	        done(err, data, res);
	      });
	    });
	  }

	  var connectTimeout, responseTimeout;
	  if (Array.isArray(args.timeout)) {
	    connectTimeout = humanizeMs(args.timeout[0]);
	    responseTimeout = humanizeMs(args.timeout[1]);
	  } else {  // set both timeout equal
	    connectTimeout = responseTimeout = humanizeMs(args.timeout);
	  }

	  function startConnectTimer() {
	    connectTimer = setTimeout(function () {
	      connectTimer = null;
	      if (statusCode === -1) {
	        statusCode = -2;
	      }
	      var msg = 'Connect timeout for ' + connectTimeout + 'ms';
	      var errorName = 'ConnectionTimeoutError';
	      if (!req.socket) {
	        errorName = 'SocketAssignTimeoutError';
	        msg += ', working sockets is full';
	      }
	      __err = new Error(msg);
	      __err.name = errorName;
	      __err.requestId = reqId;
	      debug('ConnectTimeout: Request#%d %s %s: %s, connected: %s', reqId, url, __err.name, msg, connected);
	      abortRequest();
	    }, connectTimeout);
	  }

	  function startResposneTimer() {
	    responseTimer = setTimeout(function () {
	      responseTimer = null;
	      var msg = 'Response timeout for ' + responseTimeout + 'ms';
	      var errorName = 'ResponseTimeoutError';
	      __err = new Error(msg);
	      __err.name = errorName;
	      __err.requestId = reqId;
	      debug('ResponseTimeout: Request#%d %s %s: %s, connected: %s', reqId, url, __err.name, msg, connected);
	      abortRequest();
	    }, responseTimeout);
	  }

	  var req;
	  // request headers checker will throw error
	  options.mode = args.mode ? args.mode : '';
	  try {
	    req = httplib.request(options, onResponse);
	  } catch (err) {
	    return done(err);
	  }

	  // environment detection: browser or nodejs
	  if (typeof(window) === 'undefined') {
	    // start connect timer just after `request` return, and just in nodejs environment
	    startConnectTimer();
	  } else {
	    req.on('requestTimeout', function () {
	      if (statusCode === -1) {
	        statusCode = -2;
	      }
	      var msg = 'Connect timeout for ' + connectTimeout + 'ms';
	      var errorName = 'ConnectionTimeoutError';
	      __err = new Error(msg);
	      __err.name = errorName;
	      __err.requestId = reqId;
	      abortRequest();
	    });
	  }

	  function abortRequest() {
	    // it wont case error event when req haven't been assigned a socket yet.
	    if (!req.socket) {
	      __err.noSocket = true;
	      done(__err);
	    }
	    req.abort();
	  }

	  if (timing) {
	    // request sent
	    req.on('finish', function() {
	      timing.requestSent = Date.now() - requestStartTime;
	    });
	  }

	  req.once('socket', function (socket) {
	    if (timing) {
	      // socket queuing time
	      timing.queuing = Date.now() - requestStartTime;
	    }

	    // https://github.com/nodejs/node/blob/master/lib/net.js#L377
	    // https://github.com/nodejs/node/blob/v0.10.40-release/lib/net.js#L352
	    // should use socket.socket on 0.10.x
	    if (isNode010 && socket.socket) {
	      socket = socket.socket;
	    }

	    var readyState = socket.readyState;
	    if (readyState === 'opening') {
	      socket.once('lookup', function(err, ip, addressType) {
	        if (timing) {
	          timing.dnslookup = Date.now() - requestStartTime;
	        }
	        if (ip) {
	          remoteAddress = ip;
	        }
	      });
	      socket.once('connect', function() {
	        if (timing) {
	          // socket connected
	          timing.connected = Date.now() - requestStartTime;
	        }

	        // cancel socket timer at first and start tick for TTFB
	        cancelConnectTimer();
	        startResposneTimer();
	        connected = true;
	        if (!remoteAddress) {
	          remoteAddress = socket.remoteAddress;
	        }
	        remotePort = socket.remotePort;
	      });
	      return;
	    }
	    connected = true;
	    keepAliveSocket = true;
	    if (!remoteAddress) {
	      remoteAddress = socket.remoteAddress;
	    }
	    remotePort = socket.remotePort;

	    // reuse socket, timer should be canceled.
	    cancelConnectTimer();
	    startResposneTimer();
	  });

	  req.on('error', function (err) {
	    //TypeError for browser fetch api, Error for browser xmlhttprequest api
	    if (err.name === 'Error' || err.name === 'TypeError') {
	      err.name = connected ? 'ResponseError' : 'RequestError';
	    }
	    err.message += ' (req "error")';
	    debug('Request#%d %s `req error` event emit, %s: %s', reqId, url, err.name, err.message);
	    done(__err || err);
	  });

	  if (writeStream) {
	    writeStream.once('error', function (err) {
	      err.message += ' (writeStream "error")';
	      __err = err;
	      debug('Request#%d %s `writeStream error` event emit, %s: %s', reqId, url, err.name, err.message);
	      abortRequest();
	    });
	  }

	  if (args.stream) {
	    args.stream.pipe(req);
	    args.stream.once('error', function (err) {
	      err.message += ' (stream "error")';
	      __err = err;
	      debug('Request#%d %s `readStream error` event emit, %s: %s', reqId, url, err.name, err.message);
	      abortRequest();
	    });
	  } else {
	    req.end(body);
	  }

	  req.requestId = reqId;
	  return req;
	};
	});

	var _from = "ali-oss";
	var _id = "ali-oss@6.15.0";
	var _inBundle = false;
	var _integrity = "sha1-FUonGfCh4uWjChoPWA+5koGRH6M=";
	var _location = "/ali-oss";
	var _phantomChildren = {
	};
	var _requested = {
		type: "tag",
		registry: true,
		raw: "ali-oss",
		name: "ali-oss",
		escapedName: "ali-oss",
		rawSpec: "",
		saveSpec: null,
		fetchSpec: "latest"
	};
	var _requiredBy = [
		"#USER",
		"/"
	];
	var _resolved = "http://nexus-op.vipthink.cn/repository/npm-group/ali-oss/-/ali-oss-6.15.0.tgz";
	var _shasum = "154a2719f0a1e2e5a30a1a0f580fb99281911fa3";
	var _spec = "ali-oss";
	var _where = "/Users/chen/doc/wandou/tslib-template";
	var author = {
		name: "dead_horse"
	};
	var browser = {
		"lib/client.js": "./dist/aliyun-oss-sdk.js",
		mime: "mime/lite",
		urllib: "./shims/xhr.js",
		utility: "./shims/utility.js",
		crypto: "./shims/crypto/crypto.js",
		debug: "./shims/debug",
		fs: false,
		child_process: false,
		"is-type-of": "./shims/is-type-of.js"
	};
	var bugs = {
		url: "https://github.com/aliyun/oss-nodejs-sdk/issues"
	};
	var bundleDependencies = false;
	var dependencies = {
		address: "^1.0.0",
		agentkeepalive: "^3.4.1",
		bowser: "^1.6.0",
		"co-defer": "^1.0.0",
		"copy-to": "^2.0.1",
		dateformat: "^2.0.0",
		debug: "^2.2.0",
		destroy: "^1.0.4",
		"end-or-error": "^1.0.1",
		"get-ready": "^1.0.0",
		"humanize-ms": "^1.2.0",
		"is-type-of": "^1.0.0",
		"js-base64": "^2.5.2",
		jstoxml: "^0.2.3",
		"merge-descriptors": "^1.0.1",
		mime: "^2.4.5",
		"mz-modules": "^2.1.0",
		platform: "^1.3.1",
		pump: "^3.0.0",
		"sdk-base": "^2.0.1",
		"stream-http": "2.8.2",
		"stream-wormhole": "^1.0.4",
		urllib: "^2.33.1",
		utility: "^1.8.0",
		xml2js: "^0.4.16"
	};
	var deprecated = false;
	var description = "aliyun oss(object storage service) node client";
	var devDependencies = {
		"@babel/core": "^7.11.6",
		"@babel/plugin-transform-regenerator": "^7.10.4",
		"@babel/plugin-transform-runtime": "^7.11.5",
		"@babel/preset-env": "^7.11.5",
		"@babel/runtime": "^7.11.2",
		"@types/node": "^14.0.12",
		"@typescript-eslint/eslint-plugin": "^2.34.0",
		"@typescript-eslint/parser": "^2.34.0",
		aliasify: "^2.0.0",
		autod: "^2.6.1",
		babelify: "^10.0.0",
		"beautify-benchmark": "^0.2.4",
		benchmark: "^2.1.1",
		bluebird: "^3.1.5",
		browserify: "^16.5.2",
		"co-fs": "^1.2.0",
		"co-mocha": "^1.2.1",
		"core-js": "^3.6.5",
		"crypto-js": "^3.1.9-1",
		dotenv: "^8.2.0",
		eslint: "^6.8.0",
		"eslint-config-airbnb": "^16.1.0",
		"eslint-config-ali": "^9.0.2",
		"eslint-plugin-import": "^2.21.1",
		"eslint-plugin-jsx-a11y": "^6.0.3",
		"eslint-plugin-react": "^7.7.0",
		filereader: "^0.10.3",
		"git-pre-hooks": "^1.2.0",
		immediate: "^3.3.0",
		karma: "^1.7.1",
		"karma-browserify": "^5.1.1",
		"karma-chrome-launcher": "^2.2.0",
		"karma-firefox-launcher": "^1.0.1",
		"karma-ie-launcher": "^1.0.0",
		"karma-mocha": "^1.3.0",
		"karma-safari-launcher": "^1.0.0",
		"lint-staged": "^9.5.0",
		mm: "^2.0.0",
		mocha: "^3.5.3",
		nyc: "^13.3.0",
		"promise-polyfill": "^6.0.2",
		request: "^2.88.0",
		should: "^11.0.0",
		sinon: "^1.17.7",
		snyk: "1.454.0",
		"standard-version": "^8.0.1",
		"stream-equal": "^1.1.0",
		"thunk-mocha": "^1.0.3",
		timemachine: "^0.3.0",
		typescript: "^3.9.5",
		"uglify-js": "^2.8.29",
		watchify: "^3.9.0"
	};
	var engines = {
		node: ">=8"
	};
	var files = [
		"lib",
		"shims",
		"dist"
	];
	var homepage = "https://github.com/aliyun/oss-nodejs-sdk";
	var keywords = [
		"oss",
		"client",
		"file",
		"aliyun"
	];
	var license = "MIT";
	var main = "lib/client.js";
	var name = "ali-oss";
	var repository = {
		type: "git",
		url: "git://github.com/aliyun/oss-nodejs-sdk.git"
	};
	var scripts = {
		autod: "autod",
		"browser-test": "npm run build-test && karma start",
		"build-change-log": "standard-version",
		"build-dist": "npm run tsc && node browser-build.js > dist/aliyun-oss-sdk.js && MINIFY=1 node browser-build.js > dist/aliyun-oss-sdk.min.js",
		"build-test": "MINIFY=1 node browser-build.js > test/browser/build/aliyun-oss-sdk.min.js && node -r dotenv/config task/browser-test-build.js > test/browser/build/tests.js",
		"detect-secrets": "node task/detect-secrets",
		jshint: "jshint .",
		"lint-staged": "lint-staged",
		prepublish: "npm run snyk-protect",
		"publish-to-cdn": "node publish.js",
		"publish-to-npm": "node publish-npm-check.js && npm publish",
		"snyk-protect": "snyk protect",
		test: "mocha -t 60000 -r thunk-mocha -r should -r dotenv/config test/node/*.test.js test/node/**/*.test.js",
		"test-cov": "nyc --reporter=lcov node_modules/.bin/_mocha -t 60000 -r thunk-mocha -r should test/node/*.test.js test/node/**/*.test.js",
		tsc: "npm run tsc:clean && npm run tsc:build",
		"tsc:build": "tsc -b tsconfig.json tsconfig-cjs.json",
		"tsc:clean": "tsc -b tsconfig.json tsconfig-cjs.json --clean ",
		"tsc:watch": "tsc -b tsconfig.json tsconfig-cjs.json --watch"
	};
	var snyk = true;
	var version = "6.15.0";
	var pkg = {
		_from: _from,
		_id: _id,
		_inBundle: _inBundle,
		_integrity: _integrity,
		_location: _location,
		_phantomChildren: _phantomChildren,
		_requested: _requested,
		_requiredBy: _requiredBy,
		_resolved: _resolved,
		_shasum: _shasum,
		_spec: _spec,
		_where: _where,
		author: author,
		browser: browser,
		bugs: bugs,
		bundleDependencies: bundleDependencies,
		dependencies: dependencies,
		deprecated: deprecated,
		description: description,
		devDependencies: devDependencies,
		engines: engines,
		files: files,
		"git-pre-hooks": {
		"pre-release": "npm run build-dist",
		"post-release": [
			"npm run publish-to-npm",
			"npm run publish-to-cdn"
		],
		"pre-commit": "npm run lint-staged"
	},
		homepage: homepage,
		keywords: keywords,
		license: license,
		"lint-staged": {
		"**/!(dist)/*": [
			"npm run detect-secrets --"
		]
	},
		main: main,
		name: name,
		repository: repository,
		scripts: scripts,
		snyk: snyk,
		version: version
	};

	var bowser = createCommonjsModule(function (module) {
	/*!
	 * Bowser - a browser detector
	 * https://github.com/ded/bowser
	 * MIT License | (c) Dustin Diaz 2015
	 */

	!function (root, name, definition) {
	  if (module.exports) module.exports = definition();
	  else root[name] = definition();
	}(commonjsGlobal, 'bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */

	  var t = true;

	  function detect(ua) {

	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[1]) || '';
	    }

	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[2]) || '';
	    }

	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
	      , likeAndroid = /like android/i.test(ua)
	      , android = !likeAndroid && /android/i.test(ua)
	      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
	      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
	      , chromeos = /CrOS/.test(ua)
	      , silk = /silk/i.test(ua)
	      , sailfish = /sailfish/i.test(ua)
	      , tizen = /tizen/i.test(ua)
	      , webos = /(web|hpw)(o|0)s/i.test(ua)
	      , windowsphone = /windows phone/i.test(ua)
	      ; /SamsungBrowser/i.test(ua)
	      ; var windows = !windowsphone && /windows/i.test(ua)
	      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
	      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
	      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
	      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
	      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
	      , mobile = !tablet && /[^-]mobi/i.test(ua)
	      , xbox = /xbox/i.test(ua)
	      , result;

	    if (/opera/i.test(ua)) {
	      //  an old Opera
	      result = {
	        name: 'Opera'
	      , opera: t
	      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
	      };
	    } else if (/opr\/|opios/i.test(ua)) {
	      // a new Opera
	      result = {
	        name: 'Opera'
	        , opera: t
	        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/SamsungBrowser/i.test(ua)) {
	      result = {
	        name: 'Samsung Internet for Android'
	        , samsungBrowser: t
	        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/Whale/i.test(ua)) {
	      result = {
	        name: 'NAVER Whale browser'
	        , whale: t
	        , version: getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/MZBrowser/i.test(ua)) {
	      result = {
	        name: 'MZ Browser'
	        , mzbrowser: t
	        , version: getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/coast/i.test(ua)) {
	      result = {
	        name: 'Opera Coast'
	        , coast: t
	        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/focus/i.test(ua)) {
	      result = {
	        name: 'Focus'
	        , focus: t
	        , version: getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser'
	      , yandexbrowser: t
	      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/ucbrowser/i.test(ua)) {
	      result = {
	          name: 'UC Browser'
	        , ucbrowser: t
	        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/mxios/i.test(ua)) {
	      result = {
	        name: 'Maxthon'
	        , maxthon: t
	        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/epiphany/i.test(ua)) {
	      result = {
	        name: 'Epiphany'
	        , epiphany: t
	        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/puffin/i.test(ua)) {
	      result = {
	        name: 'Puffin'
	        , puffin: t
	        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
	      };
	    }
	    else if (/sleipnir/i.test(ua)) {
	      result = {
	        name: 'Sleipnir'
	        , sleipnir: t
	        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/k-meleon/i.test(ua)) {
	      result = {
	        name: 'K-Meleon'
	        , kMeleon: t
	        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (windowsphone) {
	      result = {
	        name: 'Windows Phone'
	      , osname: 'Windows Phone'
	      , windowsphone: t
	      };
	      if (edgeVersion) {
	        result.msedge = t;
	        result.version = edgeVersion;
	      }
	      else {
	        result.msie = t;
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
	      }
	    }
	    else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer'
	      , msie: t
	      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      };
	    } else if (chromeos) {
	      result = {
	        name: 'Chrome'
	      , osname: 'Chrome OS'
	      , chromeos: t
	      , chromeBook: t
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/edg([ea]|ios)/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge'
	      , msedge: t
	      , version: edgeVersion
	      };
	    }
	    else if (/vivaldi/i.test(ua)) {
	      result = {
	        name: 'Vivaldi'
	        , vivaldi: t
	        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (sailfish) {
	      result = {
	        name: 'Sailfish'
	      , osname: 'Sailfish OS'
	      , sailfish: t
	      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey'
	      , seamonkey: t
	      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/firefox|iceweasel|fxios/i.test(ua)) {
	      result = {
	        name: 'Firefox'
	      , firefox: t
	      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
	      };
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t;
	        result.osname = 'Firefox OS';
	      }
	    }
	    else if (silk) {
	      result =  {
	        name: 'Amazon Silk'
	      , silk: t
	      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS'
	      , phantom: t
	      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/slimerjs/i.test(ua)) {
	      result = {
	        name: 'SlimerJS'
	        , slimer: t
	        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry'
	      , osname: 'BlackBerry OS'
	      , blackberry: t
	      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (webos) {
	      result = {
	        name: 'WebOS'
	      , osname: 'WebOS'
	      , webos: t
	      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t);
	    }
	    else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada'
	      , osname: 'Bada'
	      , bada: t
	      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (tizen) {
	      result = {
	        name: 'Tizen'
	      , osname: 'Tizen'
	      , tizen: t
	      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/qupzilla/i.test(ua)) {
	      result = {
	        name: 'QupZilla'
	        , qupzilla: t
	        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
	      };
	    }
	    else if (/chromium/i.test(ua)) {
	      result = {
	        name: 'Chromium'
	        , chromium: t
	        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome'
	        , chrome: t
	        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (android) {
	      result = {
	        name: 'Android'
	        , version: versionIdentifier
	      };
	    }
	    else if (/safari|applewebkit/i.test(ua)) {
	      result = {
	        name: 'Safari'
	      , safari: t
	      };
	      if (versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    }
	    else if (iosdevice) {
	      result = {
	        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      };
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    }
	    else if(/googlebot/i.test(ua)) {
	      result = {
	        name: 'Googlebot'
	      , googlebot: t
	      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
	      };
	    }
	    else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	     };
	   }

	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      if (/(apple)?webkit\/537\.36/i.test(ua)) {
	        result.name = result.name || "Blink";
	        result.blink = t;
	      } else {
	        result.name = result.name || "Webkit";
	        result.webkit = t;
	      }
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko";
	      result.gecko = t;
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
	    }

	    // set OS flags for platforms that have multiple browsers
	    if (!result.windowsphone && (android || result.silk)) {
	      result.android = t;
	      result.osname = 'Android';
	    } else if (!result.windowsphone && iosdevice) {
	      result[iosdevice] = t;
	      result.ios = t;
	      result.osname = 'iOS';
	    } else if (mac) {
	      result.mac = t;
	      result.osname = 'macOS';
	    } else if (xbox) {
	      result.xbox = t;
	      result.osname = 'Xbox';
	    } else if (windows) {
	      result.windows = t;
	      result.osname = 'Windows';
	    } else if (linux) {
	      result.linux = t;
	      result.osname = 'Linux';
	    }

	    function getWindowsVersion (s) {
	      switch (s) {
	        case 'NT': return 'NT'
	        case 'XP': return 'XP'
	        case 'NT 5.0': return '2000'
	        case 'NT 5.1': return 'XP'
	        case 'NT 5.2': return '2003'
	        case 'NT 6.0': return 'Vista'
	        case 'NT 6.1': return '7'
	        case 'NT 6.2': return '8'
	        case 'NT 6.3': return '8.1'
	        case 'NT 10.0': return '10'
	        default: return undefined
	      }
	    }

	    // OS version extraction
	    var osVersion = '';
	    if (result.windows) {
	      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i));
	    } else if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (result.mac) {
	      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }

	    // device type extraction
	    var osMajorVersion = !result.windows && osVersion.split('.')[0];
	    if (
	         tablet
	      || nexusTablet
	      || iosdevice == 'ipad'
	      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
	      || result.silk
	    ) {
	      result.tablet = t;
	    } else if (
	         mobile
	      || iosdevice == 'iphone'
	      || iosdevice == 'ipod'
	      || android
	      || nexusMobile
	      || result.blackberry
	      || result.webos
	      || result.bada
	    ) {
	      result.mobile = t;
	    }

	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge ||
	        (result.msie && result.version >= 10) ||
	        (result.yandexbrowser && result.version >= 15) ||
			    (result.vivaldi && result.version >= 1.0) ||
	        (result.chrome && result.version >= 20) ||
	        (result.samsungBrowser && result.version >= 4) ||
	        (result.whale && compareVersions([result.version, '1.0']) === 1) ||
	        (result.mzbrowser && compareVersions([result.version, '6.0']) === 1) ||
	        (result.focus && compareVersions([result.version, '1.0']) === 1) ||
	        (result.firefox && result.version >= 20.0) ||
	        (result.safari && result.version >= 6) ||
	        (result.opera && result.version >= 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
	        (result.blackberry && result.version >= 10.1)
	        || (result.chromium && result.version >= 20)
	        ) {
	      result.a = t;
	    }
	    else if ((result.msie && result.version < 10) ||
	        (result.chrome && result.version < 20) ||
	        (result.firefox && result.version < 20.0) ||
	        (result.safari && result.version < 6) ||
	        (result.opera && result.version < 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
	        || (result.chromium && result.version < 20)
	        ) {
	      result.c = t;
	    } else result.x = t;

	    return result
	  }

	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');

	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem=== 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  /**
	   * Get version precisions count
	   *
	   * @example
	   *   getVersionPrecision("1.10.3") // 3
	   *
	   * @param  {string} version
	   * @return {number}
	   */
	  function getVersionPrecision(version) {
	    return version.split(".").length;
	  }

	  /**
	   * Array::map polyfill
	   *
	   * @param  {Array} arr
	   * @param  {Function} iterator
	   * @return {Array}
	   */
	  function map(arr, iterator) {
	    var result = [], i;
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, iterator);
	    }
	    for (i = 0; i < arr.length; i++) {
	      result.push(iterator(arr[i]));
	    }
	    return result;
	  }

	  /**
	   * Calculate browser version weight
	   *
	   * @example
	   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
	   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
	   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
	   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
	   *
	   * @param  {Array<String>} versions versions to compare
	   * @return {Number} comparison result
	   */
	  function compareVersions(versions) {
	    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
	    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
	    var chunks = map(versions, function (version) {
	      var delta = precision - getVersionPrecision(version);

	      // 2) "9" -> "9.0" (for precision = 2)
	      version = version + new Array(delta + 1).join(".0");

	      // 3) "9.0" -> ["000000000"", "000000009"]
	      return map(version.split("."), function (chunk) {
	        return new Array(20 - chunk.length).join("0") + chunk;
	      }).reverse();
	    });

	    // iterate in reverse order by reversed chunks array
	    while (--precision >= 0) {
	      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
	      if (chunks[0][precision] > chunks[1][precision]) {
	        return 1;
	      }
	      else if (chunks[0][precision] === chunks[1][precision]) {
	        if (precision === 0) {
	          // all version chunks are same
	          return 0;
	        }
	      }
	      else {
	        return -1;
	      }
	    }
	  }

	  /**
	   * Check if browser is unsupported
	   *
	   * @example
	   *   bowser.isUnsupportedBrowser({
	   *     msie: "10",
	   *     firefox: "23",
	   *     chrome: "29",
	   *     safari: "5.1",
	   *     opera: "16",
	   *     phantom: "534"
	   *   });
	   *
	   * @param  {Object}  minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function isUnsupportedBrowser(minVersions, strictMode, ua) {
	    var _bowser = bowser;

	    // make strictMode param optional with ua param usage
	    if (typeof strictMode === 'string') {
	      ua = strictMode;
	      strictMode = void(0);
	    }

	    if (strictMode === void(0)) {
	      strictMode = false;
	    }
	    if (ua) {
	      _bowser = detect(ua);
	    }

	    var version = "" + _bowser.version;
	    for (var browser in minVersions) {
	      if (minVersions.hasOwnProperty(browser)) {
	        if (_bowser[browser]) {
	          if (typeof minVersions[browser] !== 'string') {
	            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
	          }

	          // browser version and min supported version.
	          return compareVersions([version, minVersions[browser]]) < 0;
	        }
	      }
	    }

	    return strictMode; // not found
	  }

	  /**
	   * Check if browser is supported
	   *
	   * @param  {Object} minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function check(minVersions, strictMode, ua) {
	    return !isUnsupportedBrowser(minVersions, strictMode, ua);
	  }

	  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
	  bowser.compareVersions = compareVersions;
	  bowser.check = check;

	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;

	  /*
	   * Set our detect public method to the main bowser object
	   * This is needed to implement bowser in server side
	   */
	  bowser.detect = detect;
	  return bowser
	});
	});

	var Buffer$2 = buffer$1.Buffer;
	var intSize = 4;
	var zeroBuffer$1 = Buffer$2.alloc(intSize); zeroBuffer$1.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer$2.concat([buf, zeroBuffer$1], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = Buffer$2.alloc(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash$1(buf, fn, hashSize, bigEndian) {
	  if (!Buffer$2.isBuffer(buf)) buf = Buffer$2.from(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	var helpers = { hash: hash$1 };

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */



	/*
	 * Calculate the SHA-1 of an array of big-endian words, and a bit length
	 */
	function core_sha1(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << (24 - len % 32);
	  x[((len + 64 >> 9) << 4) + 15] = len;

	  var w = Array(80);
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	  var e = -1009589776;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;
	    var olde = e;

	    for(var j = 0; j < 80; j++)
	    {
	      if(j < 16) w[j] = x[i + j];
	      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
	      var t = safe_add$1(safe_add$1(rol(a, 5), sha1_ft(j, b, c, d)),
	        safe_add$1(safe_add$1(e, w[j]), sha1_kt(j)));
	      e = d;
	      d = c;
	      c = rol(b, 30);
	      b = a;
	      a = t;
	    }

	    a = safe_add$1(a, olda);
	    b = safe_add$1(b, oldb);
	    c = safe_add$1(c, oldc);
	    d = safe_add$1(d, oldd);
	    e = safe_add$1(e, olde);
	  }
	  return Array(a, b, c, d, e);

	}

	/*
	 * Perform the appropriate triplet combination function for the current
	 * iteration
	 */
	function sha1_ft(t, b, c, d)
	{
	  if(t < 20) return (b & c) | ((~b) & d);
	  if(t < 40) return b ^ c ^ d;
	  if(t < 60) return (b & c) | (b & d) | (c & d);
	  return b ^ c ^ d;
	}

	/*
	 * Determine the appropriate additive constant for the current iteration
	 */
	function sha1_kt(t)
	{
	  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	    (t < 60) ? -1894007588 : -899497514;
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add$1(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	var sha = function sha1(buf) {
	  return helpers.hash(buf, core_sha1, 20, true);
	};

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	var md5$1 = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};

	var Buffer$1 = buffer$1.Buffer;



	var algorithms = {
	  sha1: sha,
	  md5: md5$1
	};

	var blocksize = 64;
	var zeroBuffer = Buffer$1.alloc(blocksize);
	zeroBuffer.fill(0);

	function hmac(fn, key, data) {
	  if(!Buffer$1.isBuffer(key)) key = Buffer$1.from(key);
	  if(!Buffer$1.isBuffer(data)) data = Buffer$1.from(data);

	  if(key.length > blocksize) {
	    key = fn(key);
	  } else if(key.length < blocksize) {
	    key = Buffer$1.concat([key, zeroBuffer], blocksize);
	  }

	  var ipad = Buffer$1.alloc(blocksize), opad = Buffer$1.alloc(blocksize);
	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36;
	    opad[i] = key[i] ^ 0x5C;
	  }

	  var hash = fn(Buffer$1.concat([ipad, data]));
	  return fn(Buffer$1.concat([opad, hash]))
	}

	function hash(alg, key) {
	  alg = alg || 'sha1';
	  var fn = algorithms[alg];
	  var bufs = [];
	  var length = 0;
	  if(!fn) error$1('algorithm:', alg, 'is not yet supported');
	  return {
	    update: function (data) {
	      if(!Buffer$1.isBuffer(data)) data = Buffer$1.from(data);

	      bufs.push(data);
	      length += data.length;
	      return this
	    },
	    digest: function (enc) {
	      var buf = Buffer$1.concat(bufs);
	      var r = key ? hmac(fn, key, buf) : fn(buf);
	      bufs = null;
	      return enc ? r.toString(enc) : r
	    }
	  }
	}

	function error$1 () {
	  var m = [].slice.call(arguments).join(' ');
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	  ].join('\n'))
	}

	var createHash = function (alg) { return hash(alg) };
	var createHmac = function (alg, key) { return hash(alg, key) };

	var createCredentials = () => {
	  error$1('sorry,createCredentials is not implemented yet');
	};
	var createCipher = () => {
	  error$1('sorry,createCipher is not implemented yet');
	};
	var createCipheriv = () => {
	  error$1('sorry,createCipheriv is not implemented yet');
	};
	var createDecipher = () => {
	  error$1('sorry,createDecipher is not implemented yet');
	};
	var createDecipheriv = () => {
	  error$1('sorry,createDecipheriv is not implemented yet');
	};
	var createSign = () => {
	  error$1('sorry,createSign is not implemented yet');
	};
	var createVerify = () => {
	  error$1('sorry,createVerify is not implemented yet');
	};
	var createDiffieHellman = () => {
	  error$1('sorry,createDiffieHellman is not implemented yet');
	};
	var pbkdf2 = () => {
	  error$1('sorry,pbkdf2 is not implemented yet');
	};

	var crypto$1 = {
		createHash: createHash,
		createHmac: createHmac,
		createCredentials: createCredentials,
		createCipher: createCipher,
		createCipheriv: createCipheriv,
		createDecipher: createDecipher,
		createDecipheriv: createDecipheriv,
		createSign: createSign,
		createVerify: createVerify,
		createDiffieHellman: createDiffieHellman,
		pbkdf2: pbkdf2
	};

	var isArray$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isArray = void 0;
	exports.isArray = (obj) => {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	};
	});

	const { Stream } = require$$0__default['default'];
	const { isArray: isArray$1 } = isArray$2;

	var string = function isString(obj) {
	  return typeof obj === 'string';
	};

	var array = isArray$1;

	var buffer = Buffer.isBuffer;

	function isStream(obj) {
	  return obj instanceof Stream;
	}

	var writableStream = function isWritableStream(obj) {
	  return (
	    isStream(obj) &&
	    typeof obj._write === 'function' &&
	    typeof obj._writableState === 'object'
	  );
	};

	var isTypeOf = {
		string: string,
		array: array,
		buffer: buffer,
		writableStream: writableStream
	};

	var isObject = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isObject = void 0;
	exports.isObject = (obj) => {
	    return Object.prototype.toString.call(obj) === '[object Object]';
	};
	});

	var lowercaseKeyHeader_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.lowercaseKeyHeader = void 0;

	function lowercaseKeyHeader(headers) {
	    const lowercaseHeader = {};
	    if (isObject.isObject(headers)) {
	        Object.keys(headers).forEach(key => {
	            lowercaseHeader[key.toLowerCase()] = headers[key];
	        });
	    }
	    return lowercaseHeader;
	}
	exports.lowercaseKeyHeader = lowercaseKeyHeader;
	});

	const { lowercaseKeyHeader } = lowercaseKeyHeader_1;

	/**
	 *
	 * @param {String} resourcePath
	 * @param {Object} parameters
	 * @return
	 */
	var buildCanonicalizedResource = function buildCanonicalizedResource(resourcePath, parameters) {
	  let canonicalizedResource = `${resourcePath}`;
	  let separatorString = '?';

	  if (isTypeOf.string(parameters) && parameters.trim() !== '') {
	    canonicalizedResource += separatorString + parameters;
	  } else if (isTypeOf.array(parameters)) {
	    parameters.sort();
	    canonicalizedResource += separatorString + parameters.join('&');
	  } else if (parameters) {
	    const compareFunc = (entry1, entry2) => {
	      if (entry1[0] > entry2[0]) {
	        return 1;
	      } else if (entry1[0] < entry2[0]) {
	        return -1;
	      }
	      return 0;
	    };
	    const processFunc = (key) => {
	      canonicalizedResource += separatorString + key;
	      if (parameters[key]) {
	        canonicalizedResource += `=${parameters[key]}`;
	      }
	      separatorString = '&';
	    };
	    Object.keys(parameters).sort(compareFunc).forEach(processFunc);
	  }

	  return canonicalizedResource;
	};

	/**
	 * @param {String} method
	 * @param {String} resourcePath
	 * @param {Object} request
	 * @param {String} expires
	 * @return {String} canonicalString
	 */
	var buildCanonicalString = function canonicalString(method, resourcePath, request, expires) {
	  request = request || {};
	  const headers = lowercaseKeyHeader(request.headers);
	  const OSS_PREFIX = 'x-oss-';
	  const ossHeaders = [];
	  const headersToSign = {};

	  let signContent = [
	    method.toUpperCase(),
	    headers['content-md5'] || '',
	    headers['content-type'],
	    expires || headers['x-oss-date']
	  ];

	  Object.keys(headers).forEach((key) => {
	    const lowerKey = key.toLowerCase();
	    if (lowerKey.indexOf(OSS_PREFIX) === 0) {
	      headersToSign[lowerKey] = String(headers[key]).trim();
	    }
	  });

	  Object.keys(headersToSign).sort().forEach((key) => {
	    ossHeaders.push(`${key}:${headersToSign[key]}`);
	  });

	  signContent = signContent.concat(ossHeaders);

	  signContent.push(this.buildCanonicalizedResource(resourcePath, request.parameters));

	  return signContent.join('\n');
	};

	/**
	 * @param {String} accessKeySecret
	 * @param {String} canonicalString
	 */
	var computeSignature = function computeSignature(accessKeySecret, canonicalString, headerEncoding = 'utf-8') {
	  const signature = crypto$1.createHmac('sha1', accessKeySecret);
	  return signature.update(Buffer.from(canonicalString, headerEncoding)).digest('base64');
	};

	/**
	 * @param {String} accessKeyId
	 * @param {String} accessKeySecret
	 * @param {String} canonicalString
	 */
	var authorization = function authorization(accessKeyId, accessKeySecret, canonicalString, headerEncoding) {
	  return `OSS ${accessKeyId}:${this.computeSignature(accessKeySecret, canonicalString, headerEncoding)}`;
	};

	/**
	 *
	 * @param {String} accessKeySecret
	 * @param {Object} options
	 * @param {String} resource
	 * @param {Number} expires
	 */
	var _signatureForURL = function _signatureForURL(accessKeySecret, options = {}, resource, expires, headerEncoding) {
	  const headers = {};
	  const { subResource = {} } = options;

	  if (options.process) {
	    const processKeyword = 'x-oss-process';
	    subResource[processKeyword] = options.process;
	  }

	  if (options.trafficLimit) {
	    const trafficLimitKey = 'x-oss-traffic-limit';
	    subResource[trafficLimitKey] = options.trafficLimit;
	  }

	  if (options.response) {
	    Object.keys(options.response).forEach((k) => {
	      const key = `response-${k.toLowerCase()}`;
	      subResource[key] = options.response[k];
	    });
	  }

	  Object.keys(options).forEach((key) => {
	    const lowerKey = key.toLowerCase();
	    const value = options[key];
	    if (lowerKey.indexOf('x-oss-') === 0) {
	      headers[lowerKey] = value;
	    } else if (lowerKey.indexOf('content-md5') === 0) {
	      headers[key] = value;
	    } else if (lowerKey.indexOf('content-type') === 0) {
	      headers[key] = value;
	    }
	  });

	  if (Object.prototype.hasOwnProperty.call(options, 'security-token')) {
	    subResource['security-token'] = options['security-token'];
	  }

	  if (Object.prototype.hasOwnProperty.call(options, 'callback')) {
	    const json = {
	      callbackUrl: encodeURI(options.callback.url),
	      callbackBody: options.callback.body
	    };
	    if (options.callback.host) {
	      json.callbackHost = options.callback.host;
	    }
	    if (options.callback.contentType) {
	      json.callbackBodyType = options.callback.contentType;
	    }
	    subResource.callback = Buffer.from(JSON.stringify(json)).toString('base64');

	    if (options.callback.customValue) {
	      const callbackVar = {};
	      Object.keys(options.callback.customValue).forEach((key) => {
	        callbackVar[`x:${key}`] = options.callback.customValue[key];
	      });
	      subResource['callback-var'] = Buffer.from(JSON.stringify(callbackVar)).toString('base64');
	    }
	  }

	  const canonicalString = this.buildCanonicalString(options.method, resource, {
	    headers,
	    parameters: subResource
	  }, expires.toString());

	  return {
	    Signature: this.computeSignature(accessKeySecret, canonicalString, headerEncoding),
	    subResource
	  };
	};

	var signUtils = {
		buildCanonicalizedResource: buildCanonicalizedResource,
		buildCanonicalString: buildCanonicalString,
		computeSignature: computeSignature,
		authorization: authorization,
		_signatureForURL: _signatureForURL
	};

	var checkBucketName = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkBucketName = void 0;
	exports.checkBucketName = (name, createBucket = false) => {
	    const bucketRegex = createBucket ? /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/ : /^[a-z0-9_][a-z0-9-_]{1,61}[a-z0-9_]$/;
	    if (!bucketRegex.test(name)) {
	        throw new Error('The bucket must be conform to the specifications');
	    }
	};
	});

	var checkConfigValid$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkConfigValid = void 0;
	const checkConfigMap = {
	    endpoint: checkEndpoint,
	    region: /^[a-zA-Z0-9\-_]+$/,
	};
	function checkEndpoint(endpoint) {
	    if (typeof endpoint === 'string') {
	        return /^[a-zA-Z0-9._:/-]+$/.test(endpoint);
	    }
	    else if (endpoint.host) {
	        return /^[a-zA-Z0-9._:/-]+$/.test(endpoint.host);
	    }
	    return false;
	}
	exports.checkConfigValid = (conf, key) => {
	    if (checkConfigMap[key]) {
	        let isConfigValid = true;
	        if (checkConfigMap[key] instanceof Function) {
	            isConfigValid = checkConfigMap[key](conf);
	        }
	        else {
	            isConfigValid = checkConfigMap[key].test(conf);
	        }
	        if (!isConfigValid) {
	            throw new Error(`The ${key} must be conform to the specifications`);
	        }
	    }
	};
	});

	var setRegion_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.setRegion = void 0;
	const url_1 = __importDefault(urlutil__default['default']);

	function setRegion(region, internal = false, secure = false) {
	    checkConfigValid$1.checkConfigValid(region, 'region');
	    const protocol = secure ? 'https://' : 'http://';
	    let suffix = internal ? '-internal.aliyuncs.com' : '.aliyuncs.com';
	    const prefix = 'vpc100-oss-cn-';
	    // aliyun VPC region: https://help.aliyun.com/knowledge_detail/38740.html
	    if (region.substr(0, prefix.length) === prefix) {
	        suffix = '.aliyuncs.com';
	    }
	    return url_1.default.parse(protocol + region + suffix);
	}
	exports.setRegion = setRegion;
	});

	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { setRegion } = setRegion_1;
	const { checkConfigValid } = checkConfigValid$1;

	function setEndpoint(endpoint, secure) {
	  checkConfigValid(endpoint, 'endpoint');
	  let url = urlutil__default['default'].parse(endpoint);

	  if (!url.protocol) {
	    url = urlutil__default['default'].parse(`http${secure ? 's' : ''}://${endpoint}`);
	  }

	  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
	    throw new Error('Endpoint protocol must be http or https.');
	  }

	  return url;
	}

	var initOptions = function (options) {
	  if (!options || !options.accessKeyId || !options.accessKeySecret) {
	    throw new Error('require accessKeyId, accessKeySecret');
	  }
	  if (options.stsToken && !options.refreshSTSToken) {
	    console.warn(
	      "It's recommended to set `refreshSTSToken` to refresh stsToken、accessKeyId、accessKeySecret automatically when sts info expires"
	    );
	  }
	  if (options.bucket) {
	    _checkBucketName(options.bucket);
	  }
	  const opts = Object.assign(
	    {
	      region: 'oss-cn-hangzhou',
	      internal: false,
	      secure: false,
	      timeout: 60000,
	      bucket: null,
	      endpoint: null,
	      cname: false,
	      isRequestPay: false,
	      sldEnable: false,
	      headerEncoding: 'utf-8',
	      refreshSTSToken: null,
	      retryMax: 0
	    },
	    options
	  );

	  opts.accessKeyId = opts.accessKeyId.trim();
	  opts.accessKeySecret = opts.accessKeySecret.trim();

	  if (opts.timeout) {
	    opts.timeout = humanizeMs(opts.timeout);
	  }

	  if (opts.endpoint) {
	    opts.endpoint = setEndpoint(opts.endpoint, opts.secure);
	  } else if (opts.region) {
	    opts.endpoint = setRegion(opts.region, opts.internal, opts.secure);
	  } else {
	    throw new Error('require options.endpoint or options.region');
	  }

	  opts.inited = true;
	  return opts;
	};

	/**
	 * @param typeMap [Object] Map of MIME type -> Array[extensions]
	 * @param ...
	 */
	function Mime() {
	  this._types = Object.create(null);
	  this._extensions = Object.create(null);

	  for (let i = 0; i < arguments.length; i++) {
	    this.define(arguments[i]);
	  }

	  this.define = this.define.bind(this);
	  this.getType = this.getType.bind(this);
	  this.getExtension = this.getExtension.bind(this);
	}

	/**
	 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
	 * to an array of extensions associated with the type.  The first extension is
	 * used as the default extension for the type.
	 *
	 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
	 *
	 * If a type declares an extension that has already been defined, an error will
	 * be thrown.  To suppress this error and force the extension to be associated
	 * with the new type, pass `force`=true.  Alternatively, you may prefix the
	 * extension with "*" to map the type to extension, without mapping the
	 * extension to the type.
	 *
	 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
	 *
	 *
	 * @param map (Object) type definitions
	 * @param force (Boolean) if true, force overriding of existing definitions
	 */
	Mime.prototype.define = function(typeMap, force) {
	  for (let type in typeMap) {
	    let extensions = typeMap[type].map(function(t) {
	      return t.toLowerCase();
	    });
	    type = type.toLowerCase();

	    for (let i = 0; i < extensions.length; i++) {
	      const ext = extensions[i];

	      // '*' prefix = not the preferred type for this extension.  So fixup the
	      // extension, and skip it.
	      if (ext[0] === '*') {
	        continue;
	      }

	      if (!force && (ext in this._types)) {
	        throw new Error(
	          'Attempt to change mapping for "' + ext +
	          '" extension from "' + this._types[ext] + '" to "' + type +
	          '". Pass `force=true` to allow this, otherwise remove "' + ext +
	          '" from the list of extensions for "' + type + '".'
	        );
	      }

	      this._types[ext] = type;
	    }

	    // Use first extension as default
	    if (force || !this._extensions[type]) {
	      const ext = extensions[0];
	      this._extensions[type] = (ext[0] !== '*') ? ext : ext.substr(1);
	    }
	  }
	};

	/**
	 * Lookup a mime type based on extension
	 */
	Mime.prototype.getType = function(path) {
	  path = String(path);
	  let last = path.replace(/^.*[/\\]/, '').toLowerCase();
	  let ext = last.replace(/^.*\./, '').toLowerCase();

	  let hasPath = last.length < path.length;
	  let hasDot = ext.length < last.length - 1;

	  return (hasDot || !hasPath) && this._types[ext] || null;
	};

	/**
	 * Return file extension associated with a mime type
	 */
	Mime.prototype.getExtension = function(type) {
	  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
	  return type && this._extensions[type.toLowerCase()] || null;
	};

	var Mime_1 = Mime;

	var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avif":["avif"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

	var lite = new Mime_1(standard);

	var dateformat = createCommonjsModule(function (module, exports) {
	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? 'a'  : 'p',
	          tt:   H < 12 ? 'am' : 'pm',
	          T:    H < 12 ? 'A'  : 'P',
	          TT:   H < 12 ? 'AM' : 'PM',
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occurred and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	}


	  {
	    module.exports = dateFormat;
	  }
	})();
	});

	/*!
	 * copy-to - index.js
	 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
	 * MIT Licensed
	 */

	/**
	 * slice() reference.
	 */

	var slice = Array.prototype.slice;

	/**
	 * Expose copy
	 *
	 * ```
	 * copy({foo: 'nar', hello: 'copy'}).to({hello: 'world'});
	 * copy({foo: 'nar', hello: 'copy'}).toCover({hello: 'world'});
	 * ```
	 *
	 * @param {Object} src
	 * @return {Copy}
	 */

	var copyTo = Copy;


	/**
	 * Copy
	 * @param {Object} src
	 * @param {Boolean} withAccess
	 */

	function Copy(src, withAccess) {
	  if (!(this instanceof Copy)) return new Copy(src, withAccess);
	  this.src = src;
	  this._withAccess = withAccess;
	}

	/**
	 * copy properties include getter and setter
	 * @param {[type]} val [description]
	 * @return {[type]} [description]
	 */

	Copy.prototype.withAccess = function (w) {
	  this._withAccess = w !== false;
	  return this;
	};

	/**
	 * pick keys in src
	 *
	 * @api: public
	 */

	Copy.prototype.pick = function(keys) {
	  if (!Array.isArray(keys)) {
	    keys = slice.call(arguments);
	  }
	  if (keys.length) {
	    this.keys = keys;
	  }
	  return this;
	};

	/**
	 * copy src to target,
	 * do not cover any property target has
	 * @param {Object} to
	 *
	 * @api: public
	 */

	Copy.prototype.to = function(to) {
	  to = to || {};

	  if (!this.src) return to;
	  var keys = this.keys || Object.keys(this.src);

	  if (!this._withAccess) {
	    for (var i = 0; i < keys.length; i++) {
	      key = keys[i];
	      if (to[key] !== undefined) continue;
	      to[key] = this.src[key];
	    }
	    return to;
	  }

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!notDefined(to, key)) continue;
	    var getter = this.src.__lookupGetter__(key);
	    var setter = this.src.__lookupSetter__(key);
	    if (getter) to.__defineGetter__(key, getter);
	    if (setter) to.__defineSetter__(key, setter);

	    if (!getter && !setter) {
	      to[key] = this.src[key];
	    }
	  }
	  return to;
	};

	/**
	 * copy src to target,
	 * override any property target has
	 * @param {Object} to
	 *
	 * @api: public
	 */

	Copy.prototype.toCover = function(to) {
	  var keys = this.keys || Object.keys(this.src);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    delete to[key];
	    var getter = this.src.__lookupGetter__(key);
	    var setter = this.src.__lookupSetter__(key);
	    if (getter) to.__defineGetter__(key, getter);
	    if (setter) to.__defineSetter__(key, setter);

	    if (!getter && !setter) {
	      to[key] = this.src[key];
	    }
	  }
	};

	Copy.prototype.override = Copy.prototype.toCover;

	/**
	 * append another object to src
	 * @param {Obj} obj
	 * @return {Copy}
	 */

	Copy.prototype.and = function (obj) {
	  var src = {};
	  this.to(src);
	  this.src = obj;
	  this.to(src);
	  this.src = src;

	  return this;
	};

	/**
	 * check obj[key] if not defiend
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function notDefined(obj, key) {
	  return obj[key] === undefined
	    && obj.__lookupGetter__(key) === undefined
	    && obj.__lookupSetter__(key) === undefined;
	}

	var encoder_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.encoder = void 0;
	function encoder(str, encoding = 'utf-8') {
	    if (encoding === 'utf-8')
	        return str;
	    return Buffer.from(str).toString('latin1');
	}
	exports.encoder = encoder;
	});

	var isIP = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isIP = void 0;
	// it provide commont methods for node and browser , we will add more solutions later in this file
	/**
	 * Judge isIP include ipv4 or ipv6
	 * @param {String} options
	 * @return {Array} the multipart uploads
	 */
	exports.isIP = (host) => {
	    const ipv4Regex = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
	    const ipv6Regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
	    return ipv4Regex.test(host) || ipv6Regex.test(host);
	};
	});

	var getReqUrl_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getReqUrl = void 0;
	const copy_to_1 = __importDefault(copyTo);
	const url_1 = __importDefault(urlutil__default['default']);
	const merge_descriptors_1 = __importDefault(mergeDescriptors);
	const is_type_of_1 = __importDefault(isTypeOf);


	function getReqUrl(params) {
	    const ep = {};
	    const isCname = this.options.cname;
	    checkConfigValid$1.checkConfigValid(this.options.endpoint, 'endpoint');
	    copy_to_1.default(this.options.endpoint, false).to(ep);
	    if (params.bucket && !isCname && !isIP.isIP(ep.hostname) && !this.options.sldEnable) {
	        ep.host = `${params.bucket}.${ep.host}`;
	    }
	    let resourcePath = '/';
	    if (params.bucket && (this.options.sldEnable)) {
	        resourcePath += `${params.bucket}/`;
	    }
	    if (params.object) {
	        // Preserve '/' in result url
	        resourcePath += this._escape(params.object).replace(/\+/g, '%2B');
	    }
	    ep.pathname = resourcePath;
	    const query = {};
	    if (params.query) {
	        merge_descriptors_1.default(query, params.query);
	    }
	    if (params.subres) {
	        let subresAsQuery = {};
	        if (is_type_of_1.default.string(params.subres)) {
	            subresAsQuery[params.subres] = '';
	        }
	        else if (is_type_of_1.default.array(params.subres)) {
	            params.subres.forEach((k) => {
	                subresAsQuery[k] = '';
	            });
	        }
	        else {
	            subresAsQuery = params.subres;
	        }
	        merge_descriptors_1.default(query, subresAsQuery);
	    }
	    ep.query = query;
	    return url_1.default.format(ep);
	}
	exports.getReqUrl = getReqUrl;
	});

	var createRequest_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createRequest = void 0;

	const debug = debug$2();




	const { encoder } = encoder_1;
	const { isIP: isIP$1 } = isIP;
	const { setRegion } = setRegion_1;
	const { getReqUrl } = getReqUrl_1;
	function getHeader(headers, name) {
	    return headers[name] || headers[name.toLowerCase()];
	}
	function delHeader(headers, name) {
	    delete headers[name];
	    delete headers[name.toLowerCase()];
	}
	function createRequest(params) {
	    let date = new Date();
	    if (this.options.amendTimeSkewed) {
	        date = +new Date() + this.options.amendTimeSkewed;
	    }
	    const headers = {
	        'x-oss-date': dateformat(date, 'UTC:ddd, dd mmm yyyy HH:MM:ss \'GMT\''),
	        'x-oss-user-agent': this.userAgent
	    };
	    if (this.userAgent.includes('nodejs')) {
	        headers['User-Agent'] = this.userAgent;
	    }
	    if (this.options.isRequestPay) {
	        Object.assign(headers, { 'x-oss-request-payer': 'requester' });
	    }
	    if (this.options.stsToken) {
	        headers['x-oss-security-token'] = this.options.stsToken;
	    }
	    copyTo(params.headers).to(headers);
	    if (!getHeader(headers, 'Content-Type')) {
	        if (params.mime && params.mime.indexOf('/') > 0) {
	            headers['Content-Type'] = params.mime;
	        }
	        else {
	            headers['Content-Type'] = lite.getType(params.mime || path__default['default'].extname(params.object || ''));
	        }
	    }
	    if (!getHeader(headers, 'Content-Type')) {
	        delHeader(headers, 'Content-Type');
	    }
	    if (params.content) {
	        if (!params.disabledMD5) {
	            headers['Content-MD5'] = crypto$1
	                .createHash('md5')
	                .update(Buffer.from(params.content, 'utf8'))
	                .digest('base64');
	        }
	        if (!headers['Content-Length']) {
	            headers['Content-Length'] = params.content.length;
	        }
	    }
	    const { hasOwnProperty } = Object.prototype;
	    for (const k in headers) {
	        if (headers[k] && hasOwnProperty.call(headers, k)) {
	            headers[k] = encoder(String(headers[k]), this.options.headerEncoding);
	        }
	    }
	    const authResource = this._getResource(params);
	    headers.authorization = this.authorization(params.method, authResource, params.subres, headers, this.options.headerEncoding);
	    // const url = this._getReqUrl(params);
	    if (isIP$1(this.options.endpoint.hostname)) {
	        const { region, internal, secure } = this.options;
	        const hostInfo = setRegion(region, internal, secure);
	        headers.host = `${params.bucket}.${hostInfo.host}`;
	    }
	    const url = getReqUrl.bind(this)(params);
	    debug('request %s %s, with headers %j, !!stream: %s', params.method, url, headers, !!params.stream);
	    const timeout = params.timeout || this.options.timeout;
	    const reqParams = {
	        method: params.method,
	        content: params.content,
	        stream: params.stream,
	        headers,
	        timeout,
	        writeStream: params.writeStream,
	        customResponse: params.customResponse,
	        ctx: params.ctx || this.ctx
	    };
	    if (this.agent) {
	        reqParams.agent = this.agent;
	    }
	    if (this.httpsAgent) {
	        reqParams.httpsAgent = this.httpsAgent;
	    }
	    reqParams.enableProxy = !!this.options.enableProxy;
	    reqParams.proxy = this.options.proxy ? this.options.proxy : null;
	    return {
	        url,
	        params: reqParams
	    };
	}
	exports.createRequest = createRequest;
	});

	var formatObjKey_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.formatObjKey = void 0;
	function formatObjKey(obj, type, options) {
	    if (obj === null || typeof obj !== 'object') {
	        return obj;
	    }
	    let o;
	    if (Array.isArray(obj)) {
	        o = [];
	        for (let i = 0; i < obj.length; i++) {
	            o.push(formatObjKey(obj[i], type, options));
	        }
	    }
	    else {
	        o = {};
	        Object.keys(obj).forEach((key) => {
	            o[handelFormat(key, type, options)] = formatObjKey(obj[key], type, options);
	        });
	    }
	    return o;
	}
	exports.formatObjKey = formatObjKey;
	function handelFormat(key, type, options) {
	    var _a;
	    if (options && ((_a = options.exclude) === null || _a === void 0 ? void 0 : _a.includes(key)))
	        return key;
	    if (type === 'firstUpperCase') {
	        key = key.replace(/^./, (_) => _.toUpperCase());
	    }
	    else if (type === 'firstLowerCase') {
	        key = key.replace(/^./, (_) => _.toLowerCase());
	    }
	    return key;
	}
	});

	var setSTSToken_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.setSTSToken = void 0;

	async function setSTSToken() {
	    if (!this.options)
	        this.options = {};
	    let credentials = await this.options.refreshSTSToken();
	    credentials = formatObjKey_1.formatObjKey(credentials, 'firstLowerCase');
	    if (credentials.securityToken) {
	        credentials.stsToken = credentials.securityToken;
	    }
	    checkCredentials(credentials);
	    Object.assign(this.options, credentials);
	}
	exports.setSTSToken = setSTSToken;
	function checkCredentials(obj) {
	    const stsTokenKey = ['accessKeySecret', 'accessKeyId', 'stsToken'];
	    const objKeys = Object.keys(obj);
	    stsTokenKey.forEach(_ => {
	        if (!objKeys.find(key => key === _)) {
	            throw Error(`refreshSTSToken must return contains ${_}`);
	        }
	    });
	}
	});

	var retry_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.retry = void 0;
	function retry(func, retryMax, config = {}) {
	    let retryNum = 0;
	    const { retryDelay = 500, errorHandler = () => true } = config;
	    const funcR = (...arg) => {
	        return new Promise((resolve, reject) => {
	            func(...arg)
	                .then(result => {
	                retryNum = 0;
	                resolve(result);
	            })
	                .catch(err => {
	                if (retryNum < retryMax && errorHandler(err)) {
	                    retryNum++;
	                    setTimeout(() => {
	                        resolve(funcR(...arg));
	                    }, retryDelay);
	                }
	                else {
	                    retryNum = 0;
	                    reject(err);
	                }
	            });
	        });
	    };
	    return funcR;
	}
	exports.retry = retry;
	});

	var getSymlink = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * getSymlink
	 * @param {String} name - object name
	 * @param {Object} options
	 * @param {{res}}
	 */

	proto.getSymlink = async function getSymlink(name, options = {}) {
	  options.subres = Object.assign({ symlink: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  name = this._objectName(name);
	  const params = this._objectRequestParams('GET', name, options);
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  const target = result.res.headers['x-oss-symlink-target'];
	  return {
	    targetName: decodeURIComponent(target),
	    res: result.res
	  };
	};
	});

	var putSymlink = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * putSymlink
	 * @param {String} name - object name
	 * @param {String} targetName - target name
	 * @param {Object} options
	 * @param {{res}}
	 */

	proto.putSymlink = async function putSymlink(name, targetName, options) {
	  options = options || {};
	  options.headers = options.headers || {};
	  targetName = this._escape(this._objectName(targetName));
	  this._convertMetaToHeaders(options.meta, options.headers);
	  options.headers['x-oss-symlink-target'] = targetName;
	  options.subres = Object.assign({ symlink: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }

	  if (options.storageClass) {
	    options.headers['x-oss-storage-class'] = options.storageClass;
	  }

	  name = this._objectName(name);
	  const params = this._objectRequestParams('PUT', name, options);

	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};
	});

	var getObjectMeta = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * getObjectMeta
	 * @param {String} name - object name
	 * @param {Object} options
	 * @param {{res}}
	 */

	proto.getObjectMeta = async function getObjectMeta(name, options) {
	  options = options || {};
	  name = this._objectName(name);
	  options.subres = Object.assign({ objectMeta: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  const params = this._objectRequestParams('HEAD', name, options);
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var copyObject = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;

	const REPLACE_HEDERS = [
	  'content-type',
	  'content-encoding',
	  'content-language',
	  'content-disposition',
	  'cache-control',
	  'expires',
	];

	proto.copy = async function copy(name, sourceName, bucketName, options) {
	  if (typeof bucketName === 'object') {
	    options = bucketName; // 兼容旧版本，旧版本第三个参数为options
	  }
	  options = options || {};
	  options.headers = options.headers || {};

	  Object.keys(options.headers).forEach((key) => {
	    options.headers[`x-oss-copy-source-${key.toLowerCase()}`] = options.headers[key];
	  });
	  if (options.meta || Object.keys(options.headers).find(_ => REPLACE_HEDERS.includes(_.toLowerCase()))) {
	    options.headers['x-oss-metadata-directive'] = 'REPLACE';
	  }
	  this._convertMetaToHeaders(options.meta, options.headers);

	  sourceName = this._getSourceName(sourceName, bucketName);

	  if (options.versionId) {
	    sourceName = `${sourceName}?versionId=${options.versionId}`;
	  }

	  options.headers['x-oss-copy-source'] = sourceName;

	  const params = this._objectRequestParams('PUT', name, options);
	  params.xmlResponse = true;
	  params.successStatuses = [200, 304];

	  const result = await this.request(params);

	  let { data } = result;
	  if (data) {
	    data = {
	      etag: data.ETag,
	      lastModified: data.LastModified
	    };
	  }

	  return {
	    data,
	    res: result.res
	  };
	};

	// todo delete
	proto._getSourceName = function _getSourceName(sourceName, bucketName) {
	  if (typeof bucketName === 'string') {
	    sourceName = this._objectName(sourceName);
	  } else if (sourceName[0] !== '/') {
	    bucketName = this.options.bucket;
	  } else {
	    bucketName = sourceName.replace(/\/(.+?)(\/.*)/, '$1');
	    sourceName = sourceName.replace(/(\/.+?\/)(.*)/, '$2');
	  }

	  _checkBucketName(bucketName);

	  sourceName = encodeURIComponent(sourceName);

	  sourceName = `/${bucketName}/${sourceName}`;
	  return sourceName;
	};
	});

	var policy2Str_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.policy2Str = void 0;
	function policy2Str(policy) {
	    let policyStr;
	    if (policy) {
	        if (typeof policy === 'string') {
	            try {
	                policyStr = JSON.stringify(JSON.parse(policy));
	            }
	            catch (err) {
	                throw new Error(`Policy string is not a valid JSON: ${err.message}`);
	            }
	        }
	        else {
	            policyStr = JSON.stringify(policy);
	        }
	    }
	    return policyStr;
	}
	exports.policy2Str = policy2Str;
	});

	var calculatePostSignature = createCommonjsModule(function (module, exports) {
	const { policy2Str } = policy2Str_1;

	const { isObject: isObject$1 } = isObject;

	const proto = exports;

	/**
	 * @param {Object or JSON} policy specifies the validity of the fields in the request.
	 * @return {Object} params
	 *         {String} params.OSSAccessKeyId
	 *         {String} params.Signature
	 *         {String} params.policy JSON text encoded with UTF-8 and Base64.
	 */
	proto.calculatePostSignature = function calculatePostSignature(policy) {
	  if (!isObject$1(policy) && typeof policy !== 'string') {
	    throw new Error('policy must be JSON string or Object');
	  }
	  if (!isObject$1(policy)) {
	    try {
	      JSON.stringify(JSON.parse(policy));
	    } catch (error) {
	      throw new Error('policy must be JSON string or Object');
	    }
	  }
	  policy = Buffer.from(policy2Str(policy), 'utf8').toString('base64');

	  const Signature = signUtils.computeSignature(this.options.accessKeySecret, policy);

	  const query = {
	    OSSAccessKeyId: this.options.accessKeyId,
	    Signature,
	    policy
	  };
	  return query;
	};
	});

	var getObjectTagging$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;
	const { isObject: isObject$1 } = isObject;
	/**
	 * getObjectTagging
	 * @param {String} name - object name
	 * @param {Object} options
	 * @return {Object}
	 */

	proto.getObjectTagging = async function getObjectTagging(name, options = {}) {
	  options.subres = Object.assign({ tagging: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  name = this._objectName(name);
	  const params = this._objectRequestParams('GET', name, options);
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  const Tagging = await this.parseXML(result.data);
	  let { Tag } = Tagging.TagSet;
	  Tag = Tag && isObject$1(Tag) ? [Tag] : Tag || [];

	  const tag = {};

	  Tag.forEach((item) => {
	    tag[item.Key] = item.Value;
	  });

	  return {
	    status: result.status,
	    res: result.res,
	    tag
	  };
	};
	});

	var obj2xml_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.obj2xml = void 0;

	function type(params) {
	    return Object.prototype.toString
	        .call(params)
	        .replace(/(.*? |])/g, '')
	        .toLowerCase();
	}
	function obj2xml(obj, options) {
	    let s = '';
	    if (options && options.headers) {
	        s = '<?xml version="1.0" encoding="UTF-8"?>\n';
	    }
	    if (options && options.firstUpperCase) {
	        obj = formatObjKey_1.formatObjKey(obj, 'firstUpperCase');
	    }
	    if (type(obj) === 'object') {
	        Object.keys(obj).forEach(key => {
	            // filter undefined or null
	            if (type(obj[key]) !== 'undefined' && type(obj[key]) !== 'null') {
	                if (type(obj[key]) === 'string' || type(obj[key]) === 'number') {
	                    s += `<${key}>${obj[key]}</${key}>`;
	                }
	                else if (type(obj[key]) === 'object') {
	                    s += `<${key}>${obj2xml(obj[key])}</${key}>`;
	                }
	                else if (type(obj[key]) === 'array') {
	                    s += obj[key]
	                        .map(keyChild => `<${key}>${obj2xml(keyChild)}</${key}>`)
	                        .join('');
	                }
	                else {
	                    s += `<${key}>${obj[key].toString()}</${key}>`;
	                }
	            }
	        });
	    }
	    else {
	        s += obj.toString();
	    }
	    return s;
	}
	exports.obj2xml = obj2xml;
	});

	var checkValid_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkValid = void 0;
	function checkValid(_value, _rules) {
	    _rules.forEach((rule) => {
	        if (rule.validator) {
	            rule.validator(_value);
	        }
	        else if (rule.pattern && !rule.pattern.test(_value)) {
	            throw new Error(rule.msg);
	        }
	    });
	}
	exports.checkValid = checkValid;
	});

	var checkObjectTag_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkObjectTag = void 0;
	const { checkValid } = checkValid_1;
	const { isObject: isObject$1 } = isObject;
	const commonRules = [
	    {
	        validator: (value) => {
	            if (typeof value !== 'string') {
	                throw new Error('the key and value of the tag must be String');
	            }
	        }
	    },
	    {
	        pattern: /^[a-zA-Z0-9 +-=._:/]+$/,
	        msg: 'tag can contain letters, numbers, spaces, and the following symbols: plus sign (+), hyphen (-), equal sign (=), period (.), underscore (_), colon (:), and forward slash (/)'
	    }
	];
	const rules = {
	    key: [
	        ...commonRules,
	        {
	            pattern: /^.{1,128}$/,
	            msg: 'tag key can be a maximum of 128 bytes in length'
	        }
	    ],
	    value: [
	        ...commonRules,
	        {
	            pattern: /^.{0,256}$/,
	            msg: 'tag value can be a maximum of 256 bytes in length'
	        }
	    ]
	};
	function checkObjectTag(tag) {
	    if (!isObject$1(tag)) {
	        throw new Error('tag must be Object');
	    }
	    const entries = Object.entries(tag);
	    if (entries.length > 10) {
	        throw new Error('maximum of 10 tags for a object');
	    }
	    const rulesIndexKey = ['key', 'value'];
	    entries.forEach((keyValue) => {
	        keyValue.forEach((item, index) => {
	            checkValid(item, rules[rulesIndexKey[index]]);
	        });
	    });
	}
	exports.checkObjectTag = checkObjectTag;
	});

	var putObjectTagging$1 = createCommonjsModule(function (module, exports) {
	const { obj2xml } = obj2xml_1;
	const { checkObjectTag } = checkObjectTag_1;

	const proto = exports;
	/**
	 * putObjectTagging
	 * @param {String} name - object name
	 * @param {Object} tag -  object tag, eg: `{a: "1", b: "2"}`
	 * @param {Object} options
	 */

	proto.putObjectTagging = async function putObjectTagging(name, tag, options = {}) {
	  checkObjectTag(tag);

	  options.subres = Object.assign({ tagging: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  name = this._objectName(name);
	  const params = this._objectRequestParams('PUT', name, options);
	  params.successStatuses = [200];
	  tag = Object.keys(tag).map(key => ({
	    Key: key,
	    Value: tag[key]
	  }));

	  const paramXMLObj = {
	    Tagging: {
	      TagSet: {
	        Tag: tag
	      }
	    }
	  };

	  params.mime = 'xml';
	  params.content = obj2xml(paramXMLObj);

	  const result = await this.request(params);
	  return {
	    res: result.res,
	    status: result.status
	  };
	};
	});

	var deleteObjectTagging$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * deleteObjectTagging
	 * @param {String} name - object name
	 * @param {Object} options
	 */

	proto.deleteObjectTagging = async function deleteObjectTagging(
	  name,
	  options = {}
	) {
	  options.subres = Object.assign({ tagging: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  name = this._objectName(name);
	  const params = this._objectRequestParams('DELETE', name, options);
	  params.successStatuses = [204];
	  const result = await this.request(params);

	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var getBucketVersions_1 = createCommonjsModule(function (module, exports) {
	/* eslint-disable no-use-before-define */
	const proto = exports;
	const { isObject: isObject$1 } = isObject;
	const { isArray } = isArray$2;


	proto.getBucketVersions = getBucketVersions;
	proto.listObjectVersions = getBucketVersions;

	async function getBucketVersions(query = {}, options = {}) {
	  // prefix, key-marker, max-keys, delimiter, encoding-type, version-id-marker
	  if (query.versionIdMarker && query.keyMarker === undefined) {
	    throw new Error('A version-id marker cannot be specified without a key marker');
	  }

	  options.subres = Object.assign({ versions: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  const params = this._objectRequestParams('GET', '', options);
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  params.query = formatQuery(query);

	  const result = await this.request(params);
	  let objects = result.data.Version || [];
	  let deleteMarker = result.data.DeleteMarker || [];
	  const that = this;
	  if (objects) {
	    if (!Array.isArray(objects)) {
	      objects = [objects];
	    }
	    objects = objects.map(obj => ({
	      name: obj.Key,
	      url: that._objectUrl(obj.Key),
	      lastModified: obj.LastModified,
	      isLatest: obj.IsLatest === 'true',
	      versionId: obj.VersionId,
	      etag: obj.ETag,
	      type: obj.Type,
	      size: Number(obj.Size),
	      storageClass: obj.StorageClass,
	      owner: {
	        id: obj.Owner.ID,
	        displayName: obj.Owner.DisplayName
	      }
	    }));
	  }
	  if (deleteMarker) {
	    if (!isArray(deleteMarker)) {
	      deleteMarker = [deleteMarker];
	    }
	    deleteMarker = deleteMarker.map(obj => ({
	      name: obj.Key,
	      lastModified: obj.LastModified,
	      versionId: obj.VersionId,
	      owner: {
	        id: obj.Owner.ID,
	        displayName: obj.Owner.DisplayName
	      }
	    }));
	  }
	  let prefixes = result.data.CommonPrefixes || null;
	  if (prefixes) {
	    if (!isArray(prefixes)) {
	      prefixes = [prefixes];
	    }
	    prefixes = prefixes.map(item => item.Prefix);
	  }
	  return {
	    res: result.res,
	    objects,
	    deleteMarker,
	    prefixes,
	    // attirbute of legacy error
	    nextMarker: result.data.NextKeyMarker || null,
	    // attirbute of legacy error
	    NextVersionIdMarker: result.data.NextVersionIdMarker || null,
	    nextKeyMarker: result.data.NextKeyMarker || null,
	    nextVersionIdMarker: result.data.NextVersionIdMarker || null,
	    isTruncated: result.data.IsTruncated === 'true'
	  };
	}


	function camel2Line(name) {
	  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
	}

	function formatQuery(query = {}) {
	  const obj = {};
	  if (isObject$1(query)) {
	    Object.keys(query).forEach((key) => {
	      obj[camel2Line(key)] = query[key];
	    });
	  }

	  return obj;
	}
	});

	var deleteMulti = createCommonjsModule(function (module, exports) {
	/* eslint-disable object-curly-newline */

	const { obj2xml } = obj2xml_1;

	const proto = exports;

	proto.deleteMulti = async function deleteMulti(names, options = {}) {
	  const objects = [];
	  if (!names || !names.length) {
	    throw new Error('names is required');
	  }
	  for (let i = 0; i < names.length; i++) {
	    const object = {};
	    if (typeof names[i] === 'string') {
	      object.Key = utility.escape(this._objectName(names[i]));
	    } else {
	      const { key, versionId } = names[i];
	      object.Key = utility.escape(this._objectName(key));
	      object.VersionId = versionId;
	    }
	    objects.push(object);
	  }

	  const paramXMLObj = {
	    Delete: {
	      Quiet: !!options.quiet,
	      Object: objects
	    }
	  };

	  const paramXML = obj2xml(paramXMLObj, {
	    headers: true
	  });

	  options.subres = Object.assign({ delete: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  const params = this._objectRequestParams('POST', '', options);
	  params.mime = 'xml';
	  params.content = paramXML;
	  params.xmlResponse = true;
	  params.successStatuses = [200];
	  const result = await this.request(params);

	  const r = result.data;
	  let deleted = (r && r.Deleted) || null;
	  if (deleted) {
	    if (!Array.isArray(deleted)) {
	      deleted = [deleted];
	    }
	  }
	  return {
	    res: result.res,
	    deleted: deleted || []
	  };
	};
	});

	var getACL = createCommonjsModule(function (module, exports) {
	const proto = exports;

	/*
	 * Get object's ACL
	 * @param {String} name the object key
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.getACL = async function getACL(name, options = {}) {
	  options.subres = Object.assign({ acl: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  name = this._objectName(name);

	  const params = this._objectRequestParams('GET', name, options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;

	  const result = await this.request(params);

	  return {
	    acl: result.data.AccessControlList.Grant,
	    owner: {
	      id: result.data.Owner.ID,
	      displayName: result.data.Owner.DisplayName
	    },
	    res: result.res
	  };
	};
	});

	var putACL = createCommonjsModule(function (module, exports) {
	const proto = exports;

	/*
	 * Set object's ACL
	 * @param {String} name the object key
	 * @param {String} acl the object ACL
	 * @param {Object} options
	 */
	proto.putACL = async function putACL(name, acl, options) {
	  options = options || {};
	  options.subres = Object.assign({ acl: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  options.headers = options.headers || {};
	  options.headers['x-oss-object-acl'] = acl;
	  name = this._objectName(name);

	  const params = this._objectRequestParams('PUT', name, options);
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    res: result.res
	  };
	};
	});

	var head = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * head
	 * @param {String} name - object name
	 * @param {Object} options
	 * @param {{res}}
	 */

	proto.head = async function head(name, options = {}) {
	  options.subres = Object.assign({}, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  const params = this._objectRequestParams('HEAD', name, options);
	  params.successStatuses = [200, 304];

	  const result = await this.request(params);

	  const data = {
	    meta: null,
	    res: result.res,
	    status: result.status
	  };

	  if (result.status === 200) {
	    Object.keys(result.headers).forEach((k) => {
	      if (k.indexOf('x-oss-meta-') === 0) {
	        if (!data.meta) {
	          data.meta = {};
	        }
	        data.meta[k.substring(11)] = result.headers[k];
	      }
	    });
	  }
	  return data;
	};
	});

	var _delete = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * delete
	 * @param {String} name - object name
	 * @param {Object} options
	 * @param {{res}}
	 */

	proto.delete = async function _delete(name, options = {}) {
	  options.subres = Object.assign({}, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  const params = this._objectRequestParams('DELETE', name, options);
	  params.successStatuses = [204];

	  const result = await this.request(params);

	  return {
	    res: result.res
	  };
	};
	});

	var _nodeResolve_empty = {};

	var _nodeResolve_empty$1 = {
		__proto__: null,
		'default': _nodeResolve_empty
	};

	var fs = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

	var get = createCommonjsModule(function (module, exports) {
	const proto = exports;
	/**
	 * get
	 * @param {String} name - object name
	 * @param {String | Stream} file
	 * @param {Object} options
	 * @param {{res}}
	 */
	proto.get = async function get(name, file, options = {}) {
	  let writeStream = null;
	  let needDestroy = false;

	  if (isTypeOf.writableStream(file)) {
	    writeStream = file;
	  } else if (isTypeOf.string(file)) {
	    writeStream = fs.createWriteStream(file);
	    needDestroy = true;
	  } else {
	    // get(name, options)
	    options = file;
	  }

	  options = options || {};
	  const isBrowserEnv = process && process.browser;
	  const responseCacheControl = options.responseCacheControl === null ? '' : 'no-cache';
	  const defaultSubresOptions =
	    isBrowserEnv && responseCacheControl ? { 'response-cache-control': responseCacheControl } : {};
	  options.subres = Object.assign(defaultSubresOptions, options.subres);

	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  if (options.process) {
	    options.subres['x-oss-process'] = options.process;
	  }

	  let result;
	  try {
	    const params = this._objectRequestParams('GET', name, options);
	    params.writeStream = writeStream;
	    params.successStatuses = [200, 206, 304];

	    result = await this.request(params);

	    if (needDestroy) {
	      writeStream.destroy();
	    }
	  } catch (err) {
	    if (needDestroy) {
	      writeStream.destroy();
	      // should delete the exists file before throw error
	      await this._deleteFileSafe(file);
	    }
	    throw err;
	  }

	  return {
	    res: result.res,
	    content: result.data
	  };
	};
	});

	var postAsyncFetch_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.postAsyncFetch = void 0;

	/*
	 * postAsyncFetch
	 * @param {String} name the object key
	 * @param {String} url
	 * @param {Object} options
	 *        {String} options.host
	 *        {String} options.contentMD5
	 *        {String} options.callback
	 *        {String} options.storageClass Standard/IA/Archive
	 *        {Boolean} options.ignoreSameKey  default value true
	 */
	async function postAsyncFetch(object, url, options = {}) {
	    options.subres = Object.assign({ asyncFetch: '' }, options.subres);
	    options.headers = options.headers || {};
	    object = this._objectName(object);
	    const { host = '', contentMD5 = '', callback = '', storageClass = '', ignoreSameKey = true } = options;
	    const paramXMLObj = {
	        AsyncFetchTaskConfiguration: {
	            Url: url,
	            Object: object,
	            Host: host,
	            ContentMD5: contentMD5,
	            Callback: callback,
	            StorageClass: storageClass,
	            IgnoreSameKey: ignoreSameKey
	        }
	    };
	    const params = this._objectRequestParams('POST', '', options);
	    params.mime = 'xml';
	    params.xmlResponse = true;
	    params.successStatuses = [200];
	    params.content = obj2xml_1.obj2xml(paramXMLObj);
	    const result = await this.request(params);
	    return {
	        res: result.res,
	        status: result.status,
	        taskId: result.data.TaskId
	    };
	}
	exports.postAsyncFetch = postAsyncFetch;
	});

	var getAsyncFetch_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAsyncFetch = void 0;

	/*
	 * getAsyncFetch
	 * @param {String} asyncFetch taskId
	 * @param {Object} options
	 */
	async function getAsyncFetch(taskId, options = {}) {
	    options.subres = Object.assign({ asyncFetch: '' }, options.subres);
	    options.headers = options.headers || {};
	    const params = this._objectRequestParams('GET', '', options);
	    params.headers['x-oss-task-id'] = taskId;
	    params.successStatuses = [200];
	    params.xmlResponse = true;
	    const result = await this.request(params);
	    const taskInfo = formatObjKey_1.formatObjKey(result.data.TaskInfo, 'firstLowerCase');
	    return {
	        res: result.res,
	        status: result.status,
	        state: result.data.State,
	        taskInfo
	    };
	}
	exports.getAsyncFetch = getAsyncFetch;
	});

	var generateObjectUrl = createCommonjsModule(function (module, exports) {
	const { isIP: isIP$1 } = isIP;

	const proto = exports;

	/**
	 * Get Object url by name
	 * @param {String} name - object name
	 * @param {String} [baseUrl] - If provide `baseUrl`, will use `baseUrl` instead the default `endpoint and bucket`.
	 * @return {String} object url include bucket
	 */
	proto.generateObjectUrl = function generateObjectUrl(name, baseUrl) {
	  if (isIP$1(this.options.endpoint.hostname)) {
	    throw new Error('can not get the object URL when endpoint is IP');
	  }
	  if (!baseUrl) {
	    baseUrl = this.options.endpoint.format();
	    const copyUrl = urlutil__default['default'].parse(baseUrl);
	    const { bucket } = this.options;

	    copyUrl.hostname = `${bucket}.${copyUrl.hostname}`;
	    copyUrl.host = `${bucket}.${copyUrl.host}`;
	    baseUrl = copyUrl.format();
	  } else if (baseUrl[baseUrl.length - 1] !== '/') {
	    baseUrl += '/';
	  }
	  return baseUrl + this._escape(this._objectName(name));
	};
	});

	var getObjectUrl$1 = createCommonjsModule(function (module, exports) {
	const { isIP: isIP$1 } = isIP;

	const proto = exports;
	/**
	 * Get Object url by name
	 * @param {String} name - object name
	 * @param {String} [baseUrl] - If provide `baseUrl`,
	 *        will use `baseUrl` instead the default `endpoint`.
	 * @return {String} object url
	 */
	proto.getObjectUrl = function getObjectUrl(name, baseUrl) {
	  if (isIP$1(this.options.endpoint.hostname)) {
	    throw new Error('can not get the object URL when endpoint is IP');
	  }
	  if (!baseUrl) {
	    baseUrl = this.options.endpoint.format();
	  } else if (baseUrl[baseUrl.length - 1] !== '/') {
	    baseUrl += '/';
	  }
	  return baseUrl + this._escape(this._objectName(name));
	};
	});

	var signatureUrl = createCommonjsModule(function (module, exports) {
	const { isIP: isIP$1 } = isIP;

	const proto = exports;

	proto.signatureUrl = function signatureUrl(name, options) {
	  if (isIP$1(this.options.endpoint.hostname)) {
	    throw new Error('can not get the object URL when endpoint is IP');
	  }
	  options = options || {};
	  name = this._objectName(name);
	  options.method = options.method || 'GET';
	  const expires = utility.timestamp() + (options.expires || 1800);
	  const params = {
	    bucket: this.options.bucket,
	    object: name
	  };

	  const resource = this._getResource(params);

	  if (this.options.stsToken) {
	    options['security-token'] = this.options.stsToken;
	  }

	  const signRes = signUtils._signatureForURL(this.options.accessKeySecret, options, resource, expires);

	  const url = urlutil__default['default'].parse(this._getReqUrl(params));
	  url.query = {
	    OSSAccessKeyId: this.options.accessKeyId,
	    Expires: expires,
	    Signature: signRes.Signature
	  };

	  copyTo(signRes.subResource).to(url.query);

	  return url.format();
	};
	});

	var object$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;

	mergeDescriptors(proto, getSymlink);
	mergeDescriptors(proto, putSymlink);
	mergeDescriptors(proto, getObjectMeta);
	mergeDescriptors(proto, copyObject);
	mergeDescriptors(proto, calculatePostSignature);
	mergeDescriptors(proto, getObjectTagging$1);
	mergeDescriptors(proto, putObjectTagging$1);
	mergeDescriptors(proto, deleteObjectTagging$1);
	mergeDescriptors(proto, getBucketVersions_1);
	mergeDescriptors(proto, deleteMulti);
	mergeDescriptors(proto, getACL);
	mergeDescriptors(proto, putACL);
	mergeDescriptors(proto, head);
	mergeDescriptors(proto, _delete);
	mergeDescriptors(proto, get);
	mergeDescriptors(proto, postAsyncFetch_1);
	mergeDescriptors(proto, getAsyncFetch_1);
	mergeDescriptors(proto, generateObjectUrl);
	mergeDescriptors(proto, getObjectUrl$1);
	mergeDescriptors(proto, signatureUrl);
	});

	var encodeCallback = function encodeCallback(reqParams, options) {
	  reqParams.headers = reqParams.headers || {};
	  if (!Object.prototype.hasOwnProperty.call(reqParams.headers, 'x-oss-callback')) {
	    if (options.callback) {
	      const json = {
	        callbackUrl: encodeURI(options.callback.url),
	        callbackBody: options.callback.body
	      };
	      if (options.callback.host) {
	        json.callbackHost = options.callback.host;
	      }
	      if (options.callback.contentType) {
	        json.callbackBodyType = options.callback.contentType;
	      }
	      const callback = Buffer.from(JSON.stringify(json)).toString('base64');
	      reqParams.headers['x-oss-callback'] = callback;

	      if (options.callback.customValue) {
	        const callbackVar = {};
	        Object.keys(options.callback.customValue).forEach((key) => {
	          callbackVar[`x:${key}`] = options.callback.customValue[key];
	        });
	        reqParams.headers['x-oss-callback-var'] = Buffer.from(JSON.stringify(callbackVar)).toString('base64');
	      }
	    }
	  }
	};

	var callback = {
		encodeCallback: encodeCallback
	};

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	var wrappy_1 = wrappy;
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k];
	  });

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    var ret = fn.apply(this, args);
	    var cb = args[args.length-1];
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k];
	      });
	    }
	    return ret
	  }
	}

	var once_1 = wrappy_1(once);
	var strict = wrappy_1(onceStrict);

	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  });

	  Object.defineProperty(Function.prototype, 'onceStrict', {
	    value: function () {
	      return onceStrict(this)
	    },
	    configurable: true
	  });
	});

	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true;
	    return f.value = fn.apply(this, arguments)
	  };
	  f.called = false;
	  return f
	}

	function onceStrict (fn) {
	  var f = function () {
	    if (f.called)
	      throw new Error(f.onceError)
	    f.called = true;
	    return f.value = fn.apply(this, arguments)
	  };
	  var name = fn.name || 'Function wrapped with `once`';
	  f.onceError = name + " shouldn't be called more than once";
	  f.called = false;
	  return f
	}
	once_1.strict = strict;

	var noop$2 = function() {};

	var isRequest$1 = function(stream) {
		return stream.setHeader && typeof stream.abort === 'function';
	};

	var isChildProcess = function(stream) {
		return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
	};

	var eos = function(stream, opts, callback) {
		if (typeof opts === 'function') return eos(stream, null, opts);
		if (!opts) opts = {};

		callback = once_1(callback || noop$2);

		var ws = stream._writableState;
		var rs = stream._readableState;
		var readable = opts.readable || (opts.readable !== false && stream.readable);
		var writable = opts.writable || (opts.writable !== false && stream.writable);
		var cancelled = false;

		var onlegacyfinish = function() {
			if (!stream.writable) onfinish();
		};

		var onfinish = function() {
			writable = false;
			if (!readable) callback.call(stream);
		};

		var onend = function() {
			readable = false;
			if (!writable) callback.call(stream);
		};

		var onexit = function(exitCode) {
			callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
		};

		var onerror = function(err) {
			callback.call(stream, err);
		};

		var onclose = function() {
			process.nextTick(onclosenexttick);
		};

		var onclosenexttick = function() {
			if (cancelled) return;
			if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
			if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
		};

		var onrequest = function() {
			stream.req.on('finish', onfinish);
		};

		if (isRequest$1(stream)) {
			stream.on('complete', onfinish);
			stream.on('abort', onclose);
			if (stream.req) onrequest();
			else stream.on('request', onrequest);
		} else if (writable && !ws) { // legacy streams
			stream.on('end', onlegacyfinish);
			stream.on('close', onlegacyfinish);
		}

		if (isChildProcess(stream)) stream.on('exit', onexit);

		stream.on('end', onend);
		stream.on('finish', onfinish);
		if (opts.error !== false) stream.on('error', onerror);
		stream.on('close', onclose);

		return function() {
			cancelled = true;
			stream.removeListener('complete', onfinish);
			stream.removeListener('abort', onclose);
			stream.removeListener('request', onrequest);
			if (stream.req) stream.req.removeListener('finish', onfinish);
			stream.removeListener('end', onlegacyfinish);
			stream.removeListener('close', onlegacyfinish);
			stream.removeListener('finish', onfinish);
			stream.removeListener('exit', onexit);
			stream.removeListener('end', onend);
			stream.removeListener('error', onerror);
			stream.removeListener('close', onclose);
		};
	};

	var endOfStream = eos;

	// we only need fs to get the ReadStream and WriteStream prototypes

	var noop$1 = function () {};
	var ancient = /^v?\.0/.test(process.version);

	var isFn = function (fn) {
	  return typeof fn === 'function'
	};

	var isFS = function (stream) {
	  if (!ancient) return false // newer node version do not need to care about fs is a special way
	  if (!fs) return false // browser
	  return (stream instanceof (fs.ReadStream || noop$1) || stream instanceof (fs.WriteStream || noop$1)) && isFn(stream.close)
	};

	var isRequest = function (stream) {
	  return stream.setHeader && isFn(stream.abort)
	};

	var destroyer = function (stream, reading, writing, callback) {
	  callback = once_1(callback);

	  var closed = false;
	  stream.on('close', function () {
	    closed = true;
	  });

	  endOfStream(stream, {readable: reading, writable: writing}, function (err) {
	    if (err) return callback(err)
	    closed = true;
	    callback();
	  });

	  var destroyed = false;
	  return function (err) {
	    if (closed) return
	    if (destroyed) return
	    destroyed = true;

	    if (isFS(stream)) return stream.close(noop$1) // use close for fs streams to avoid fd leaks
	    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

	    if (isFn(stream.destroy)) return stream.destroy()

	    callback(err || new Error('stream was destroyed'));
	  }
	};

	var call = function (fn) {
	  fn();
	};

	var pipe = function (from, to) {
	  return from.pipe(to)
	};

	var pump = function () {
	  var streams = Array.prototype.slice.call(arguments);
	  var callback = isFn(streams[streams.length - 1] || noop$1) && streams.pop() || noop$1;

	  if (Array.isArray(streams[0])) streams = streams[0];
	  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

	  var error;
	  var destroys = streams.map(function (stream, i) {
	    var reading = i < streams.length - 1;
	    var writing = i > 0;
	    return destroyer(stream, reading, writing, function (err) {
	      if (!error) error = err;
	      if (err) destroys.forEach(call);
	      if (reading) return
	      destroys.forEach(call);
	      callback(error);
	    })
	  });

	  return streams.reduce(pipe)
	};

	var pump_1 = pump;

	var isBuffer_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isBuffer = void 0;
	function isBuffer(obj) {
	    return Buffer.isBuffer(obj);
	}
	exports.isBuffer = isBuffer;
	});

	var object = createCommonjsModule(function (module, exports) {






	const { Transform } = require$$0__default['default'];

	const { isBuffer } = isBuffer_1;
	const { retry } = retry_1;

	const proto = exports;

	/**
	 * Object operations
	 */

	/**
	 * append an object from String(file path)/Buffer/ReadableStream
	 * @param {String} name the object key
	 * @param {Mixed} file String(file path)/Buffer/ReadableStream
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.append = async function append(name, file, options) {
	  options = options || {};
	  if (options.position === undefined) options.position = '0';
	  options.subres = {
	    append: '',
	    position: options.position
	  };
	  options.method = 'POST';

	  const result = await this.put(name, file, options);
	  result.nextAppendPosition = result.res.headers['x-oss-next-append-position'];
	  return result;
	};

	/**
	 * put an object from String(file path)/Buffer/ReadableStream
	 * @param {String} name the object key
	 * @param {Mixed} file String(file path)/Buffer/ReadableStream
	 * @param {Object} options
	 *        {Object} options.callback The callback parameter is composed of a JSON string encoded in Base64
	 *        {String} options.callback.url  the OSS sends a callback request to this URL
	 *        {String} options.callback.host  The host header value for initiating callback requests
	 *        {String} options.callback.body  The value of the request body when a callback is initiated
	 *        {String} options.callback.contentType  The Content-Type of the callback requests initiatiated
	 *        {Object} options.callback.customValue  Custom parameters are a map of key-values, e.g:
	 *                  customValue = {
	 *                    key1: 'value1',
	 *                    key2: 'value2'
	 *                  }
	 * @return {Object}
	 */
	proto.put = async function put(name, file, options) {
	  let content;
	  options = options || {};
	  name = this._objectName(name);

	  if (isBuffer(file)) {
	    content = file;
	  } else if (isTypeOf.string(file)) {
	    const stats = fs.statSync(file);
	    if (!stats.isFile()) {
	      throw new Error(`${file} is not file`);
	    }
	    options.mime = options.mime || lite.getType(path__default['default'].extname(file));
	    options.contentLength = await this._getFileSize(file);
	    const getStream = () => fs.createReadStream(file);
	    const putStreamStb = (objectName, makeStream, configOption) => {
	      return this.putStream(objectName, makeStream(), configOption);
	    };
	    return await retry(putStreamStb, this.options.retryMax, {
	      errorHandler: err => {
	        const _errHandle = _err => {
	          const statusErr = [-1, -2].includes(_err.status);
	          const requestErrorRetryHandle = this.options.requestErrorRetryHandle || (() => true);
	          return statusErr && requestErrorRetryHandle(_err);
	        };
	        if (_errHandle(err)) return true;
	        return false;
	      }
	    })(name, getStream, options);
	  } else if (isTypeOf.readableStream(file)) {
	    return await this.putStream(name, file, options);
	  } else {
	    throw new TypeError('Must provide String/Buffer/ReadableStream for put.');
	  }

	  options.headers = options.headers || {};
	  this._convertMetaToHeaders(options.meta, options.headers);

	  const method = options.method || 'PUT';
	  const params = this._objectRequestParams(method, name, options);

	  callback.encodeCallback(params, options);

	  params.mime = options.mime;
	  params.content = content;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  const ret = {
	    name,
	    url: this._objectUrl(name),
	    res: result.res
	  };

	  if (params.headers && params.headers['x-oss-callback']) {
	    ret.data = JSON.parse(result.data.toString());
	  }

	  return ret;
	};

	/**
	 * put an object from ReadableStream. If `options.contentLength` is
	 * not provided, chunked encoding is used.
	 * @param {String} name the object key
	 * @param {Readable} stream the ReadableStream
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.putStream = async function putStream(name, stream, options) {
	  options = options || {};
	  options.headers = options.headers || {};
	  name = this._objectName(name);
	  if (options.contentLength) {
	    options.headers['Content-Length'] = options.contentLength;
	  } else {
	    options.headers['Transfer-Encoding'] = 'chunked';
	  }
	  this._convertMetaToHeaders(options.meta, options.headers);

	  const method = options.method || 'PUT';
	  const params = this._objectRequestParams(method, name, options);
	  callback.encodeCallback(params, options);
	  params.mime = options.mime;
	  const transform = new Transform();
	  // must remove http stream header for signature
	  transform._transform = function _transform(chunk, encoding, done) {
	    this.push(chunk);
	    done();
	  };
	  params.stream = pump_1(stream, transform);
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  const ret = {
	    name,
	    url: this._objectUrl(name),
	    res: result.res
	  };

	  if (params.headers && params.headers['x-oss-callback']) {
	    ret.data = JSON.parse(result.data.toString());
	  }

	  return ret;
	};

	proto.getStream = async function getStream(name, options) {
	  options = options || {};

	  if (options.process) {
	    options.subres = options.subres || {};
	    options.subres['x-oss-process'] = options.process;
	  }

	  const params = this._objectRequestParams('GET', name, options);
	  params.customResponse = true;
	  params.successStatuses = [200, 206, 304];

	  const result = await this.request(params);

	  return {
	    stream: result.res,
	    res: {
	      status: result.status,
	      headers: result.headers
	    }
	  };
	};

	proto.putMeta = async function putMeta(name, meta, options) {
	  return await this.copy(name, name, {
	    meta: meta || {},
	    timeout: options && options.timeout,
	    ctx: options && options.ctx
	  });
	};

	proto.list = async function list(query, options) {
	  // prefix, marker, max-keys, delimiter

	  const params = this._objectRequestParams('GET', '', options);
	  params.query = query;
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);
	  let objects = result.data.Contents;
	  const that = this;
	  if (objects) {
	    if (!Array.isArray(objects)) {
	      objects = [objects];
	    }
	    objects = objects.map(obj => ({
	      name: obj.Key,
	      url: that._objectUrl(obj.Key),
	      lastModified: obj.LastModified,
	      etag: obj.ETag,
	      type: obj.Type,
	      size: Number(obj.Size),
	      storageClass: obj.StorageClass,
	      owner: {
	        id: obj.Owner.ID,
	        displayName: obj.Owner.DisplayName
	      }
	    }));
	  }
	  let prefixes = result.data.CommonPrefixes || null;
	  if (prefixes) {
	    if (!Array.isArray(prefixes)) {
	      prefixes = [prefixes];
	    }
	    prefixes = prefixes.map(item => item.Prefix);
	  }
	  return {
	    res: result.res,
	    objects,
	    prefixes,
	    nextMarker: result.data.NextMarker || null,
	    isTruncated: result.data.IsTruncated === 'true'
	  };
	};

	proto.listV2 = async function listV2(query, options = {}) {
	  const continuation_token = query['continuation-token'] || query.continuationToken;
	  delete query['continuation-token'];
	  delete query.continuationToken;
	  if (continuation_token) {
	    options.subres = Object.assign(
	      {
	        'continuation-token': continuation_token
	      },
	      options.subres
	    );
	  }
	  const params = this._objectRequestParams('GET', '', options);
	  params.query = Object.assign({ 'list-type': 2 }, query);
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);
	  let objects = result.data.Contents;
	  const that = this;
	  if (objects) {
	    if (!Array.isArray(objects)) {
	      objects = [objects];
	    }
	    objects = objects.map(obj => ({
	      name: obj.Key,
	      url: that._objectUrl(obj.Key),
	      lastModified: obj.LastModified,
	      etag: obj.ETag,
	      type: obj.Type,
	      size: Number(obj.Size),
	      storageClass: obj.StorageClass,
	      owner: obj.Owner
	        ? {
	            id: obj.Owner.ID,
	            displayName: obj.Owner.DisplayName
	          }
	        : null
	    }));
	  }
	  let prefixes = result.data.CommonPrefixes || null;
	  if (prefixes) {
	    if (!Array.isArray(prefixes)) {
	      prefixes = [prefixes];
	    }
	    prefixes = prefixes.map(item => item.Prefix);
	  }
	  return {
	    res: result.res,
	    objects,
	    prefixes,
	    isTruncated: result.data.IsTruncated === 'true',
	    keyCount: +result.data.KeyCount,
	    continuationToken: result.data.ContinuationToken || null,
	    nextContinuationToken: result.data.NextContinuationToken || null
	  };
	};

	/**
	 * Restore Object
	 * @param {String} name the object key
	 * @param {Object} options
	 * @returns {{res}}
	 */
	proto.restore = async function restore(name, options) {
	  options = options || {};
	  options.subres = Object.assign({ restore: '' }, options.subres);
	  if (options.versionId) {
	    options.subres.versionId = options.versionId;
	  }
	  const params = this._objectRequestParams('POST', name, options);
	  params.successStatuses = [202];

	  const result = await this.request(params);

	  return {
	    res: result.res
	  };
	};

	proto._objectUrl = function _objectUrl(name) {
	  return this._getReqUrl({ bucket: this.options.bucket, object: name });
	};

	/**
	 * generator request params
	 * @return {Object} params
	 *
	 * @api private
	 */

	proto._objectRequestParams = function (method, name, options) {
	  if (!this.options.bucket && !this.options.cname) {
	    throw new Error('Please create a bucket first');
	  }

	  options = options || {};
	  name = this._objectName(name);
	  const params = {
	    object: name,
	    bucket: this.options.bucket,
	    method,
	    subres: options && options.subres,
	    timeout: options && options.timeout,
	    ctx: options && options.ctx
	  };

	  if (options.headers) {
	    params.headers = {};
	    copyTo(options.headers).to(params.headers);
	  }
	  return params;
	};

	proto._objectName = function (name) {
	  return name.replace(/^\/+/, '');
	};

	proto._statFile = function (filepath) {
	  return new Promise((resolve, reject) => {
	    fs.stat(filepath, (err, stats) => {
	      if (err) {
	        reject(err);
	      } else {
	        resolve(stats);
	      }
	    });
	  });
	};

	proto._convertMetaToHeaders = function (meta, headers) {
	  if (!meta) {
	    return;
	  }

	  Object.keys(meta).forEach(k => {
	    headers[`x-oss-meta-${k}`] = meta[k];
	  });
	};

	proto._deleteFileSafe = function (filepath) {
	  return new Promise(resolve => {
	    fs.exists(filepath, exists => {
	      if (!exists) {
	        resolve();
	      } else {
	        fs.unlink(filepath, err => {
	          resolve();
	        });
	      }
	    });
	  });
	};
	});

	var base64 = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	    module.exports = factory(global)
	        ;
	}((
	    typeof self !== 'undefined' ? self
	        : typeof window !== 'undefined' ? window
	        : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal
	: commonjsGlobal
	), function(global) {
	    // existing version for noConflict()
	    global = global || {};
	    var _Base64 = global.Base64;
	    var version = "2.6.4";
	    // constants
	    var b64chars
	        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	    var b64tab = function(bin) {
	        var t = {};
	        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
	        return t;
	    }(b64chars);
	    var fromCharCode = String.fromCharCode;
	    // encoder stuff
	    var cb_utob = function(c) {
	        if (c.length < 2) {
	            var cc = c.charCodeAt(0);
	            return cc < 0x80 ? c
	                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
	                                + fromCharCode(0x80 | (cc & 0x3f)))
	                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
	                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                    + fromCharCode(0x80 | ( cc         & 0x3f)));
	        } else {
	            var cc = 0x10000
	                + (c.charCodeAt(0) - 0xD800) * 0x400
	                + (c.charCodeAt(1) - 0xDC00);
	            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
	                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
	                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                    + fromCharCode(0x80 | ( cc         & 0x3f)));
	        }
	    };
	    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	    var utob = function(u) {
	        return u.replace(re_utob, cb_utob);
	    };
	    var cb_encode = function(ccc) {
	        var padlen = [0, 2, 1][ccc.length % 3],
	        ord = ccc.charCodeAt(0) << 16
	            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
	            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
	        chars = [
	            b64chars.charAt( ord >>> 18),
	            b64chars.charAt((ord >>> 12) & 63),
	            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
	            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
	        ];
	        return chars.join('');
	    };
	    var btoa = global.btoa && typeof global.btoa == 'function'
	        ? function(b){ return global.btoa(b) } : function(b) {
	        if (b.match(/[^\x00-\xFF]/)) throw new RangeError(
	            'The string contains invalid characters.'
	        );
	        return b.replace(/[\s\S]{1,3}/g, cb_encode);
	    };
	    var _encode = function(u) {
	        return btoa(utob(String(u)));
	    };
	    var mkUriSafe = function (b64) {
	        return b64.replace(/[+\/]/g, function(m0) {
	            return m0 == '+' ? '-' : '_';
	        }).replace(/=/g, '');
	    };
	    var encode = function(u, urisafe) {
	        return urisafe ? mkUriSafe(_encode(u)) : _encode(u);
	    };
	    var encodeURI = function(u) { return encode(u, true) };
	    var fromUint8Array;
	    if (global.Uint8Array) fromUint8Array = function(a, urisafe) {
	        // return btoa(fromCharCode.apply(null, a));
	        var b64 = '';
	        for (var i = 0, l = a.length; i < l; i += 3) {
	            var a0 = a[i], a1 = a[i+1], a2 = a[i+2];
	            var ord = a0 << 16 | a1 << 8 | a2;
	            b64 +=    b64chars.charAt( ord >>> 18)
	                +     b64chars.charAt((ord >>> 12) & 63)
	                + ( typeof a1 != 'undefined'
	                    ? b64chars.charAt((ord >>>  6) & 63) : '=')
	                + ( typeof a2 != 'undefined'
	                    ? b64chars.charAt( ord         & 63) : '=');
	        }
	        return urisafe ? mkUriSafe(b64) : b64;
	    };
	    // decoder stuff
	    var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
	    var cb_btou = function(cccc) {
	        switch(cccc.length) {
	        case 4:
	            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
	                |    ((0x3f & cccc.charCodeAt(1)) << 12)
	                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
	                |     (0x3f & cccc.charCodeAt(3)),
	            offset = cp - 0x10000;
	            return (fromCharCode((offset  >>> 10) + 0xD800)
	                    + fromCharCode((offset & 0x3FF) + 0xDC00));
	        case 3:
	            return fromCharCode(
	                ((0x0f & cccc.charCodeAt(0)) << 12)
	                    | ((0x3f & cccc.charCodeAt(1)) << 6)
	                    |  (0x3f & cccc.charCodeAt(2))
	            );
	        default:
	            return  fromCharCode(
	                ((0x1f & cccc.charCodeAt(0)) << 6)
	                    |  (0x3f & cccc.charCodeAt(1))
	            );
	        }
	    };
	    var btou = function(b) {
	        return b.replace(re_btou, cb_btou);
	    };
	    var cb_decode = function(cccc) {
	        var len = cccc.length,
	        padlen = len % 4,
	        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
	            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
	            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
	            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
	        chars = [
	            fromCharCode( n >>> 16),
	            fromCharCode((n >>>  8) & 0xff),
	            fromCharCode( n         & 0xff)
	        ];
	        chars.length -= [0, 0, 2, 1][padlen];
	        return chars.join('');
	    };
	    var _atob = global.atob && typeof global.atob == 'function'
	        ? function(a){ return global.atob(a) } : function(a){
	        return a.replace(/\S{1,4}/g, cb_decode);
	    };
	    var atob = function(a) {
	        return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
	    };
	    var _decode = function(a) { return btou(_atob(a)) };
	    var _fromURI = function(a) {
	        return String(a).replace(/[-_]/g, function(m0) {
	            return m0 == '-' ? '+' : '/'
	        }).replace(/[^A-Za-z0-9\+\/]/g, '');
	    };
	    var decode = function(a){
	        return _decode(_fromURI(a));
	    };
	    var toUint8Array;
	    if (global.Uint8Array) toUint8Array = function(a) {
	        return Uint8Array.from(atob(_fromURI(a)), function(c) {
	            return c.charCodeAt(0);
	        });
	    };
	    var noConflict = function() {
	        var Base64 = global.Base64;
	        global.Base64 = _Base64;
	        return Base64;
	    };
	    // export Base64
	    global.Base64 = {
	        VERSION: version,
	        atob: atob,
	        btoa: btoa,
	        fromBase64: decode,
	        toBase64: encode,
	        utob: utob,
	        encode: encode,
	        encodeURI: encodeURI,
	        btou: btou,
	        decode: decode,
	        noConflict: noConflict,
	        fromUint8Array: fromUint8Array,
	        toUint8Array: toUint8Array
	    };
	    // if ES5 is available, make Base64.extendString() available
	    if (typeof Object.defineProperty === 'function') {
	        var noEnum = function(v){
	            return {value:v,enumerable:false,writable:true,configurable:true};
	        };
	        global.Base64.extendString = function () {
	            Object.defineProperty(
	                String.prototype, 'fromBase64', noEnum(function () {
	                    return decode(this)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64', noEnum(function (urisafe) {
	                    return encode(this, urisafe)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64URI', noEnum(function () {
	                    return encode(this, true)
	                }));
	        };
	    }
	    //
	    // export Base64 to the namespace
	    //
	    if (global['Meteor']) { // Meteor.js
	        Base64 = global.Base64;
	    }
	    // module.exports and AMD are mutually exclusive.
	    // module.exports has precedence.
	    if (module.exports) {
	        module.exports.Base64 = global.Base64;
	    }
	    // that's it!
	    return {Base64: global.Base64}
	}));
	});

	var processObjectSave = createCommonjsModule(function (module, exports) {
	/* eslint-disable no-use-before-define */
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const { Base64: { encode: str2Base64 } } = base64;

	const proto = exports;

	proto.processObjectSave = async function processObjectSave(sourceObject, targetObject, process, targetBucket) {
	  checkArgs(sourceObject, 'sourceObject');
	  checkArgs(targetObject, 'targetObject');
	  checkArgs(process, 'process');
	  targetObject = this._objectName(targetObject);
	  if (targetBucket) {
	    _checkBucketName(targetBucket);
	  }

	  const params = this._objectRequestParams('POST', sourceObject, {
	    subres: 'x-oss-process'
	  });

	  const bucketParam = targetBucket ? `,b_${str2Base64(targetBucket)}` : '';
	  targetObject = str2Base64(targetObject);

	  const content = {
	    'x-oss-process': `${process}|sys/saveas,o_${targetObject}${bucketParam}`
	  };
	  params.content = querystring__default['default'].stringify(content);

	  const result = await this.request(params);
	  return {
	    res: result.res,
	    status: result.res.status
	  };
	};

	function checkArgs(name, key) {
	  if (!name) {
	    throw new Error(`${key} is required`);
	  }
	  if (typeof name !== 'string') {
	    throw new Error(`${key} must be String`);
	  }
	}
	});

	var image$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;

	mergeDescriptors(proto, processObjectSave);
	});

	var getBucketRequestPayment = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	/**
	 * getBucketRequestPayment
	 * @param {String} bucketName - bucket name
	 * @param {Object} options
	 */

	proto.getBucketRequestPayment = async function getBucketRequestPayment(bucketName, options) {
	  options = options || {};

	  _checkBucketName(bucketName);
	  const params = this._bucketRequestParams('GET', bucketName, 'requestPayment', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;

	  const result = await this.request(params);

	  return {
	    status: result.status,
	    res: result.res,
	    payer: result.data.Payer
	  };
	};
	});

	var putBucketRequestPayment = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { obj2xml } = obj2xml_1;

	const proto = exports;
	/**
	 * putBucketRequestPayment
	 * @param {String} bucketName
	 * @param {String} payer
	 * @param {Object} options
	 */
	const payerAll = ['BucketOwner', 'Requester'];

	proto.putBucketRequestPayment = async function putBucketRequestPayment(
	  bucketName,
	  payer,
	  options
	) {
	  options = options || {};
	  if (!payer || payerAll.indexOf(payer) < 0) {
	    throw new Error('payer must be BucketOwner or Requester');
	  }

	  _checkBucketName(bucketName);
	  const params = this._bucketRequestParams(
	    'PUT',
	    bucketName,
	    'requestPayment',
	    options
	  );
	  params.successStatuses = [200];

	  const paramXMLObj = {
	    RequestPaymentConfiguration: {
	      Payer: payer
	    }
	  };
	  const paramXML = obj2xml(paramXMLObj, {
	    headers: true
	  });

	  params.mime = 'xml';
	  params.content = paramXML;

	  const result = await this.request(params);
	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var putBucketEncryption$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;
	// const jstoxml = require('jstoxml');
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { obj2xml } = obj2xml_1;
	/**
	 * putBucketEncryption
	 * @param {String} bucketName - bucket name
	 * @param {Object} options
	 */

	proto.putBucketEncryption = async function putBucketEncryption(bucketName, options) {
	  options = options || {};
	  _checkBucketName(bucketName);
	  const params = this._bucketRequestParams('PUT', bucketName, 'encryption', options);
	  params.successStatuses = [200];
	  const paramXMLObj = {
	    ServerSideEncryptionRule: {
	      ApplyServerSideEncryptionByDefault: {
	        SSEAlgorithm: options.SSEAlgorithm
	      }
	    }
	  };
	  if (options.KMSMasterKeyID !== undefined) {
	    paramXMLObj.ServerSideEncryptionRule.ApplyServerSideEncryptionByDefault.KMSMasterKeyID = options.KMSMasterKeyID;
	  }
	  const paramXML = obj2xml(paramXMLObj, {
	    headers: true
	  });
	  params.mime = 'xml';
	  params.content = paramXML;
	  const result = await this.request(params);
	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var getBucketEncryption$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	/**
	 * getBucketEncryption
	 * @param {String} bucketName - bucket name
	 */

	proto.getBucketEncryption = async function getBucketEncryption(bucketName) {
	  _checkBucketName(bucketName);
	  const params = this._bucketRequestParams('GET', bucketName, 'encryption');
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  const encryption = result.data.ApplyServerSideEncryptionByDefault;
	  return {
	    encryption,
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var deleteBucketEncryption$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	// const jstoxml = require('jstoxml');
	/**
	 * deleteBucketEncryption
	 * @param {String} bucketName - bucket name
	 */

	proto.deleteBucketEncryption = async function deleteBucketEncryption(bucketName) {
	  _checkBucketName(bucketName);
	  const params = this._bucketRequestParams('DELETE', bucketName, 'encryption');
	  params.successStatuses = [204];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var formatTag_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.formatTag = void 0;

	function formatTag(obj) {
	    if (obj.Tagging !== undefined) {
	        obj = obj.Tagging.TagSet.Tag;
	    }
	    else if (obj.TagSet !== undefined) {
	        obj = obj.TagSet.Tag;
	    }
	    else if (obj.Tag !== undefined) {
	        obj = obj.Tag;
	    }
	    obj = obj && isObject.isObject(obj) ? [obj] : obj || [];
	    const tag = {};
	    obj.forEach((item) => {
	        tag[item.Key] = item.Value;
	    });
	    return tag;
	}
	exports.formatTag = formatTag;
	});

	var getBucketTags = createCommonjsModule(function (module, exports) {
	const proto = exports;
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { formatTag } = formatTag_1;
	/**
	 * getBucketTags
	 * @param {String} name - bucket name
	 * @param {Object} options
	 * @return {Object}
	 */

	proto.getBucketTags = async function getBucketTags(name, options = {}) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'tagging', options);
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  const Tagging = await this.parseXML(result.data);


	  return {
	    status: result.status,
	    res: result.res,
	    tag: formatTag(Tagging)
	  };
	};
	});

	var checkBucketTag = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkBucketTag = void 0;
	const { checkValid } = checkValid_1;
	const { isObject: isObject$1 } = isObject;
	const commonRules = [
	    {
	        validator: (value) => {
	            if (typeof value !== 'string') {
	                throw new Error('the key and value of the tag must be String');
	            }
	        }
	    }
	];
	const rules = {
	    key: [
	        ...commonRules,
	        {
	            pattern: /^.{1,64}$/,
	            msg: 'tag key can be a maximum of 64 bytes in length'
	        },
	        {
	            pattern: /^(?!https*:\/\/|Aliyun)/,
	            msg: 'tag key can not startsWith: http://, https://, Aliyun'
	        }
	    ],
	    value: [
	        ...commonRules,
	        {
	            pattern: /^.{0,128}$/,
	            msg: 'tag value can be a maximum of 128 bytes in length'
	        }
	    ]
	};
	exports.checkBucketTag = (tag) => {
	    if (!isObject$1(tag)) {
	        throw new Error('bucket tag must be Object');
	    }
	    const entries = Object.entries(tag);
	    if (entries.length > 20) {
	        throw new Error('maximum of 20 tags for a bucket');
	    }
	    const rulesIndexKey = ['key', 'value'];
	    entries.forEach((keyValue) => {
	        keyValue.forEach((item, index) => {
	            checkValid(item, rules[rulesIndexKey[index]]);
	        });
	    });
	};
	});

	var putBucketTags = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { obj2xml } = obj2xml_1;
	const { checkBucketTag: checkBucketTag$1 } = checkBucketTag;

	const proto = exports;
	/**
	 * putBucketTags
	 * @param {String} name - bucket name
	 * @param {Object} tag -  bucket tag, eg: `{a: "1", b: "2"}`
	 * @param {Object} options
	 */

	proto.putBucketTags = async function putBucketTags(name, tag, options = {}) {
	  _checkBucketName(name);
	  checkBucketTag$1(tag);
	  const params = this._bucketRequestParams('PUT', name, 'tagging', options);
	  params.successStatuses = [200];
	  tag = Object.keys(tag).map(key => ({
	    Key: key,
	    Value: tag[key]
	  }));

	  const paramXMLObj = {
	    Tagging: {
	      TagSet: {
	        Tag: tag
	      }
	    }
	  };

	  params.mime = 'xml';
	  params.content = obj2xml(paramXMLObj);

	  const result = await this.request(params);
	  return {
	    res: result.res,
	    status: result.status
	  };
	};
	});

	var deleteBucketTags = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	/**
	 * deleteBucketTags
	 * @param {String} name - bucket name
	 * @param {Object} options
	 */

	proto.deleteBucketTags = async function deleteBucketTags(name, options = {}) {
	  _checkBucketName(name);

	  const params = this._bucketRequestParams('DELETE', name, 'tagging', options);
	  params.successStatuses = [204];
	  const result = await this.request(params);

	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var putBucket$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { obj2xml } = obj2xml_1;

	proto.putBucket = async function putBucket(name, options = {}) {
	  _checkBucketName(name, true);
	  const params = this._bucketRequestParams('PUT', name, '', options);

	  const CreateBucketConfiguration = {};
	  const paramlXMLObJ = {
	    CreateBucketConfiguration
	  };

	  const storageClass = options.StorageClass || options.storageClass;
	  const dataRedundancyType = options.DataRedundancyType || options.dataRedundancyType;
	  if (storageClass || dataRedundancyType) {
	    storageClass && (CreateBucketConfiguration.StorageClass = storageClass);
	    dataRedundancyType && (CreateBucketConfiguration.DataRedundancyType = dataRedundancyType);
	    params.mime = 'xml';
	    params.content = obj2xml(paramlXMLObJ, { headers: true });
	  }
	  const { acl, headers = {} } = options;
	  acl && (headers['x-oss-acl'] = acl);
	  params.headers = headers;
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    bucket: (result.headers.location && result.headers.location.substring(1)) || null,
	    res: result.res
	  };
	};
	});

	var getBucketWebsite$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { isObject: isObject$1 } = isObject;

	const proto = exports;

	proto.getBucketWebsite = async function getBucketWebsite(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'website', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  let routingRules = [];
	  if (result.data.RoutingRules && result.data.RoutingRules.RoutingRule) {
	    if (isObject$1(result.data.RoutingRules.RoutingRule)) {
	      routingRules = [result.data.RoutingRules.RoutingRule];
	    } else {
	      routingRules = result.data.RoutingRules.RoutingRule;
	    }
	  }
	  return {
	    index: (result.data.IndexDocument && result.data.IndexDocument.Suffix) || '',
	    supportSubDir: (result.data.IndexDocument && result.data.IndexDocument.SupportSubDir) || 'false',
	    type: (result.data.IndexDocument && result.data.IndexDocument.Type),
	    routingRules,
	    error: (result.data.ErrorDocument && result.data.ErrorDocument.Key) || null,
	    res: result.res
	  };
	};
	});

	var putBucketWebsite$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { obj2xml } = obj2xml_1;
	const { isArray } = isArray$2;

	const proto = exports;
	proto.putBucketWebsite = async function putBucketWebsite(name, config = {}, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('PUT', name, 'website', options);
	  const IndexDocument = {
	    Suffix: config.index || 'index.html'
	  };
	  const WebsiteConfiguration = {
	    IndexDocument
	  };
	  let website = {
	    WebsiteConfiguration
	  };

	  if (config.supportSubDir) {
	    IndexDocument.SupportSubDir = config.supportSubDir;
	  }

	  if (config.type) {
	    IndexDocument.Type = config.type;
	  }

	  if (config.error) {
	    WebsiteConfiguration.ErrorDocument = {
	      Key: config.error
	    };
	  }

	  if (config.routingRules !== undefined) {
	    if (!isArray(config.routingRules)) {
	      throw new Error('RoutingRules must be Array');
	    }
	    WebsiteConfiguration.RoutingRules = {
	      RoutingRule: config.routingRules
	    };
	  }

	  website = obj2xml(website);
	  params.content = website;
	  params.mime = 'xml';
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};
	});

	var deleteBucketWebsite$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;

	proto.deleteBucketWebsite = async function deleteBucketWebsite(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('DELETE', name, 'website', options);
	  params.successStatuses = [204];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};
	});

	var getBucketLifecycle$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { isArray } = isArray$2;
	const { formatObjKey } = formatObjKey_1;

	const proto = exports;

	proto.getBucketLifecycle = async function getBucketLifecycle(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'lifecycle', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  let rules = result.data.Rule || null;
	  if (rules) {
	    if (!isArray(rules)) {
	      rules = [rules];
	    }
	    rules = rules.map((_) => {
	      if (_.ID) {
	        _.id = _.ID;
	        delete _.ID;
	      }
	      if (_.Tag && !isArray(_.Tag)) {
	        _.Tag = [_.Tag];
	      }
	      return formatObjKey(_, 'firstLowerCase');
	    });
	  }
	  return {
	    rules,
	    res: result.res
	  };
	};
	});

	var deepCopy = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.deepCopyWith = exports.deepCopy = void 0;

	exports.deepCopy = (obj) => {
	    if (obj === null || typeof obj !== 'object') {
	        return obj;
	    }
	    if (isBuffer_1.isBuffer(obj)) {
	        return obj.slice();
	    }
	    const copy = Array.isArray(obj) ? [] : {};
	    Object.keys(obj).forEach((key) => {
	        copy[key] = exports.deepCopy(obj[key]);
	    });
	    return copy;
	};
	exports.deepCopyWith = (obj, customizer) => {
	    function deepCopyWithHelper(value, innerKey, innerObject) {
	        const result = customizer(value, innerKey, innerObject);
	        if (result !== undefined)
	            return result;
	        if (value === null || typeof value !== 'object') {
	            return value;
	        }
	        if (isBuffer_1.isBuffer(value)) {
	            return value.slice();
	        }
	        const copy = Array.isArray(value) ? [] : {};
	        Object.keys(value).forEach((k) => {
	            copy[k] = deepCopyWithHelper(value[k], k, value);
	        });
	        return copy;
	    }
	    if (customizer) {
	        return deepCopyWithHelper(obj, '', null);
	    }
	    else {
	        return exports.deepCopy(obj);
	    }
	};
	});

	var getStrBytesCount_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getStrBytesCount = void 0;
	function getStrBytesCount(str) {
	    let bytesCount = 0;
	    for (let i = 0; i < str.length; i++) {
	        const c = str.charAt(i);
	        if (/^[\u00-\uff]$/.test(c)) {
	            bytesCount += 1;
	        }
	        else {
	            bytesCount += 2;
	        }
	    }
	    return bytesCount;
	}
	exports.getStrBytesCount = getStrBytesCount;
	});

	var putBucketLifecycle$1 = createCommonjsModule(function (module, exports) {
	/* eslint-disable no-use-before-define */
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { isArray } = isArray$2;
	const { deepCopy: deepCopy$1 } = deepCopy;
	const { isObject: isObject$1 } = isObject;
	const { obj2xml } = obj2xml_1;
	const { checkObjectTag } = checkObjectTag_1;
	const { getStrBytesCount } = getStrBytesCount_1;

	const proto = exports;


	proto.putBucketLifecycle = async function putBucketLifecycle(name, rules, options) {
	  _checkBucketName(name);

	  if (!isArray(rules)) {
	    throw new Error('rules must be Array');
	  }

	  const params = this._bucketRequestParams('PUT', name, 'lifecycle', options);
	  const Rule = [];
	  const paramXMLObj = {
	    LifecycleConfiguration: {
	      Rule
	    }
	  };

	  rules.forEach((_) => {
	    defaultDaysAndDate2Expiration(_); // todo delete, 兼容旧版本
	    checkRule(_);
	    if (_.id) {
	      _.ID = _.id;
	      delete _.id;
	    }
	    Rule.push(_);
	  });

	  const paramXML = obj2xml(paramXMLObj, {
	    headers: true,
	    firstUpperCase: true
	  });

	  params.content = paramXML;
	  params.mime = 'xml';
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	// todo delete, 兼容旧版本
	function defaultDaysAndDate2Expiration(obj) {
	  if (obj.days) {
	    obj.expiration = {
	      days: obj.days
	    };
	  }
	  if (obj.date) {
	    obj.expiration = {
	      createdBeforeDate: obj.date
	    };
	  }
	}

	function checkDaysAndDate(obj, key) {
	  const { days, createdBeforeDate } = obj;
	  if (!days && !createdBeforeDate) {
	    throw new Error(`${key} must includes days or createdBeforeDate`);
	  } else if (days && !/^[1-9][0-9]*$/.test(days)) {
	    throw new Error('days must be a positive integer');
	  } else if (createdBeforeDate && !/\d{4}-\d{2}-\d{2}T00:00:00.000Z/.test(createdBeforeDate)) {
	    throw new Error('createdBeforeDate must be date and conform to iso8601 format');
	  }
	}

	function handleCheckTag(tag) {
	  if (!isArray(tag) && !isObject$1(tag)) {
	    throw new Error('tag must be Object or Array');
	  }
	  tag = isObject$1(tag) ? [tag] : tag;
	  const tagObj = {};
	  const tagClone = deepCopy$1(tag);
	  tagClone.forEach((v) => {
	    tagObj[v.key] = v.value;
	  });

	  checkObjectTag(tagObj);
	}

	function checkRule(rule) {
	  if (rule.id && getStrBytesCount(rule.id) > 255) throw new Error('ID is composed of 255 bytes at most');

	  if (rule.prefix === undefined) throw new Error('Rule must includes prefix');

	  if (!['Enabled', 'Disabled'].includes(rule.status)) throw new Error('Status must be  Enabled or Disabled');

	  if (rule.transition) {
	    if (!['IA', 'Archive'].includes(rule.transition.storageClass)) throw new Error('StorageClass must be  IA or Archive');
	    checkDaysAndDate(rule.transition, 'Transition');
	  }

	  if (rule.expiration) {
	    if (!rule.expiration.expiredObjectDeleteMarker) {
	      checkDaysAndDate(rule.expiration, 'Expiration');
	    } else if (rule.expiration.days || rule.expiration.createdBeforeDate) {
	      throw new Error('expiredObjectDeleteMarker cannot be used with days or createdBeforeDate');
	    }
	  }

	  if (rule.abortMultipartUpload) {
	    checkDaysAndDate(rule.abortMultipartUpload, 'AbortMultipartUpload');
	  }

	  if (!rule.expiration && !rule.abortMultipartUpload && !rule.transition && !rule.noncurrentVersionTransition) {
	    throw new Error('Rule must includes expiration or abortMultipartUpload or transition or noncurrentVersionTransition');
	  }

	  if (rule.tag) {
	    if (rule.abortMultipartUpload) {
	      throw new Error('Tag cannot be used with abortMultipartUpload');
	    }
	    handleCheckTag(rule.tag);
	  }
	}
	});

	var deleteBucketLifecycle$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;

	proto.deleteBucketLifecycle = async function deleteBucketLifecycle(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('DELETE', name, 'lifecycle', options);
	  params.successStatuses = [204];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};
	});

	var getBucketPolicy$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	/**
	 * getBucketPolicy
	 * @param {String} bucketName - bucket name
	 * @param {Object} options
	 */

	proto.getBucketPolicy = async function getBucketPolicy(bucketName, options = {}) {
	  _checkBucketName(bucketName);

	  const params = this._bucketRequestParams('GET', bucketName, 'policy', options);

	  const result = await this.request(params);
	  params.successStatuses = [200];
	  let policy = null;

	  if (result.res.status === 200) {
	    policy = JSON.parse(result.res.data.toString());
	  }

	  return {
	    policy,
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var putBucketPolicy$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { policy2Str } = policy2Str_1;
	const { isObject: isObject$1 } = isObject;

	const proto = exports;
	/**
	 * putBucketPolicy
	 * @param {String} bucketName - bucket name
	 * @param {Object} policy - bucket policy
	 * @param {Object} options
	 */

	proto.putBucketPolicy = async function putBucketPolicy(bucketName, policy, options = {}) {
	  _checkBucketName(bucketName);

	  if (!isObject$1(policy)) {
	    throw new Error('policy is not Object');
	  }
	  const params = this._bucketRequestParams('PUT', bucketName, 'policy', options);
	  params.content = policy2Str(policy);
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var deleteBucketPolicy$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	/**
	 * deleteBucketPolicy
	 * @param {String} bucketName - bucket name
	 * @param {Object} options
	 */

	proto.deleteBucketPolicy = async function deleteBucketPolicy(bucketName, options = {}) {
	  _checkBucketName(bucketName);

	  const params = this._bucketRequestParams('DELETE', bucketName, 'policy', options);
	  params.successStatuses = [204];
	  const result = await this.request(params);

	  return {
	    status: result.status,
	    res: result.res
	  };
	};
	});

	var getBucketVersioning$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;

	const proto = exports;
	/**
	 * getBucketVersioning
	 * @param {String} bucketName - bucket name
	 */

	proto.getBucketVersioning = async function getBucketVersioning(bucketName, options) {
	  _checkBucketName(bucketName);
	  const params = this._bucketRequestParams('GET', bucketName, 'versioning', options);
	  params.xmlResponse = true;
	  params.successStatuses = [200];
	  const result = await this.request(params);

	  const versionStatus = result.data.Status;
	  return {
	    status: result.status,
	    versionStatus,
	    res: result.res
	  };
	};
	});

	var putBucketVersioning$1 = createCommonjsModule(function (module, exports) {
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { obj2xml } = obj2xml_1;

	const proto = exports;
	/**
	 * putBucketVersioning
	 * @param {String} name - bucket name
	 * @param {String} status
	 * @param {Object} options
	 */

	proto.putBucketVersioning = async function putBucketVersioning(name, status, options = {}) {
	  _checkBucketName(name);
	  if (!['Enabled', 'Suspended'].includes(status)) {
	    throw new Error('status must be Enabled or Suspended');
	  }
	  const params = this._bucketRequestParams('PUT', name, 'versioning', options);

	  const paramXMLObj = {
	    VersioningConfiguration: {
	      Status: status
	    }
	  };

	  params.mime = 'xml';
	  params.content = obj2xml(paramXMLObj, {
	    headers: true
	  });

	  const result = await this.request(params);
	  return {
	    res: result.res,
	    status: result.status
	  };
	};
	});

	var dataFix_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dataFix = void 0;

	const TRUE = ['true', 'TRUE', '1', 1];
	const FALSE = ['false', 'FALSE', '0', 0];
	function dataFix(o, conf, finalKill) {
	    if (!isObject.isObject(o))
	        return;
	    const { remove = [], rename = {}, camel = [], bool = [], lowerFirst = false, } = conf;
	    // 删除不需要的数据
	    remove.forEach(v => delete o[v]);
	    // 重命名
	    Object.entries(rename).forEach(v => {
	        if (!o[v[0]])
	            return;
	        if (o[v[1]])
	            return;
	        o[v[1]] = o[v[0]];
	        delete o[v[0]];
	    });
	    // 驼峰化
	    camel.forEach(v => {
	        if (!o[v])
	            return;
	        const afterKey = v
	            .replace(/^(.)/, $0 => $0.toLowerCase())
	            .replace(/-(\w)/g, (_, $1) => $1.toUpperCase());
	        if (o[afterKey])
	            return;
	        o[afterKey] = o[v];
	        // todo 暂时兼容以前数据，不做删除
	        // delete o[v];
	    });
	    // 转换值为布尔值
	    bool.forEach(v => {
	        o[v] = fixBool(o[v]);
	    });
	    // finalKill
	    if (typeof finalKill === 'function') {
	        finalKill(o);
	    }
	    // 首字母转小写
	    fixLowerFirst(o, lowerFirst);
	    return dataFix;
	}
	exports.dataFix = dataFix;
	function fixBool(value) {
	    if (!value)
	        return false;
	    if (TRUE.includes(value))
	        return true;
	    return FALSE.includes(value) ? false : value;
	}
	function fixLowerFirst(o, lowerFirst) {
	    if (lowerFirst) {
	        Object.keys(o).forEach(key => {
	            const lowerK = key.replace(/^\w/, match => match.toLowerCase());
	            if (typeof o[lowerK] === 'undefined') {
	                o[lowerK] = o[key];
	                delete o[key];
	            }
	        });
	    }
	}
	});

	var formatInventoryConfig_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.formatInventoryConfig = void 0;




	function formatInventoryConfig(inventoryConfig, toArray = false) {
	    if (toArray && isObject.isObject(inventoryConfig))
	        inventoryConfig = [inventoryConfig];
	    if (isArray$2.isArray(inventoryConfig)) {
	        inventoryConfig = inventoryConfig.map(formatFn);
	    }
	    else {
	        inventoryConfig = formatFn(inventoryConfig);
	    }
	    return inventoryConfig;
	}
	exports.formatInventoryConfig = formatInventoryConfig;
	function formatFn(_) {
	    dataFix_1.dataFix(_, { bool: ['IsEnabled'] }, conf => {
	        var _a, _b;
	        // prefix
	        conf.prefix = conf.Filter.Prefix;
	        delete conf.Filter;
	        // OSSBucketDestination
	        conf.OSSBucketDestination = conf.Destination.OSSBucketDestination;
	        // OSSBucketDestination.rolename
	        conf.OSSBucketDestination.rolename = conf.OSSBucketDestination.RoleArn.replace(/.*\//, '');
	        delete conf.OSSBucketDestination.RoleArn;
	        // OSSBucketDestination.bucket
	        conf.OSSBucketDestination.bucket = conf.OSSBucketDestination.Bucket.replace(/.*:::/, '');
	        delete conf.OSSBucketDestination.Bucket;
	        delete conf.Destination;
	        // frequency
	        conf.frequency = conf.Schedule.Frequency;
	        delete conf.Schedule.Frequency;
	        // optionalFields
	        if (((_a = conf === null || conf === void 0 ? void 0 : conf.OptionalFields) === null || _a === void 0 ? void 0 : _a.Field) && !isArray$2.isArray((_b = conf.OptionalFields) === null || _b === void 0 ? void 0 : _b.Field))
	            conf.OptionalFields.Field = [conf.OptionalFields.Field];
	    });
	    // firstLowerCase
	    _ = formatObjKey_1.formatObjKey(_, 'firstLowerCase', { exclude: ['OSSBucketDestination', 'SSE-OSS', 'SSE-KMS'] });
	    return _;
	}
	});

	var getBucketInventory_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getBucketInventory = void 0;


	/**
	 * getBucketInventory
	 * @param {String} bucketName - bucket name
	 * @param {String} inventoryId
	 * @param {Object} options
	 */
	async function getBucketInventory(bucketName, inventoryId, options = {}) {
	    const subres = Object.assign({ inventory: '', inventoryId }, options.subres);
	    checkBucketName.checkBucketName(bucketName);
	    const params = this._bucketRequestParams('GET', bucketName, subres, options);
	    params.successStatuses = [200];
	    params.xmlResponse = true;
	    const result = await this.request(params);
	    return {
	        status: result.status,
	        res: result.res,
	        inventory: formatInventoryConfig_1.formatInventoryConfig(result.data)
	    };
	}
	exports.getBucketInventory = getBucketInventory;
	});

	var deleteBucketInventory_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.deleteBucketInventory = void 0;

	/**
	 * deleteBucketInventory
	 * @param {String} bucketName - bucket name
	 * @param {String} inventoryId
	 * @param {Object} options
	 */
	async function deleteBucketInventory(bucketName, inventoryId, options = {}) {
	    const subres = Object.assign({ inventory: '', inventoryId }, options.subres);
	    checkBucketName.checkBucketName(bucketName);
	    const params = this._bucketRequestParams('DELETE', bucketName, subres, options);
	    params.successStatuses = [204];
	    const result = await this.request(params);
	    return {
	        status: result.status,
	        res: result.res,
	    };
	}
	exports.deleteBucketInventory = deleteBucketInventory;
	});

	var listBucketInventory_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.listBucketInventory = void 0;


	/**
	 * listBucketInventory
	 * @param {String} bucketName - bucket name
	 * @param {String} inventoryId
	 * @param {Object} options
	 */
	async function listBucketInventory(bucketName, options = {}) {
	    const { continuationToken } = options;
	    const subres = Object.assign({ inventory: '' }, continuationToken && { 'continuation-token': continuationToken }, options.subres);
	    checkBucketName.checkBucketName(bucketName);
	    const params = this._bucketRequestParams('GET', bucketName, subres, options);
	    params.successStatuses = [200];
	    params.xmlResponse = true;
	    const result = await this.request(params);
	    const { data, res, status } = result;
	    return {
	        isTruncated: data.IsTruncated === 'true',
	        nextContinuationToken: data.NextContinuationToken,
	        inventoryList: formatInventoryConfig_1.formatInventoryConfig(data.InventoryConfiguration, true),
	        status,
	        res,
	    };
	}
	exports.listBucketInventory = listBucketInventory;
	});

	var putBucketInventory_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.putBucketInventory = void 0;


	/**
	 * putBucketInventory
	 * @param {String} bucketName - bucket name
	 * @param {Inventory} inventory
	 * @param {Object} options
	 */
	async function putBucketInventory(bucketName, inventory, options = {}) {
	    const subres = Object.assign({ inventory: '', inventoryId: inventory.id }, options.subres);
	    checkBucketName.checkBucketName(bucketName);
	    const { OSSBucketDestination, optionalFields, includedObjectVersions } = inventory;
	    const destinationBucketPrefix = 'acs:oss:::';
	    const rolePrefix = `acs:ram::${OSSBucketDestination.accountId}:role/`;
	    const paramXMLObj = {
	        InventoryConfiguration: {
	            Id: inventory.id,
	            IsEnabled: inventory.isEnabled,
	            Filter: {
	                Prefix: inventory.prefix || '',
	            },
	            Destination: {
	                OSSBucketDestination: {
	                    Format: OSSBucketDestination.format,
	                    AccountId: OSSBucketDestination.accountId,
	                    RoleArn: `${rolePrefix}${OSSBucketDestination.rolename}`,
	                    Bucket: `${destinationBucketPrefix}${OSSBucketDestination.bucket}`,
	                    Prefix: OSSBucketDestination.prefix || '',
	                    Encryption: OSSBucketDestination.encryption || '',
	                },
	            },
	            Schedule: {
	                Frequency: inventory.frequency,
	            },
	            IncludedObjectVersions: includedObjectVersions,
	            OptionalFields: {
	                Field: (optionalFields === null || optionalFields === void 0 ? void 0 : optionalFields.field) || [],
	            },
	        },
	    };
	    const paramXML = obj2xml_1.obj2xml(paramXMLObj, {
	        headers: true,
	        firstUpperCase: true,
	    });
	    const params = this._bucketRequestParams('PUT', bucketName, subres, options);
	    params.successStatuses = [200];
	    params.mime = 'xml';
	    params.content = paramXML;
	    const result = await this.request(params);
	    return {
	        status: result.status,
	        res: result.res,
	    };
	}
	exports.putBucketInventory = putBucketInventory;
	});

	var abortBucketWorm_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.abortBucketWorm = void 0;

	async function abortBucketWorm(name, options) {
	    checkBucketName.checkBucketName(name);
	    const params = this._bucketRequestParams('DELETE', name, 'worm', options);
	    const result = await this.request(params);
	    return {
	        res: result.res,
	        status: result.status
	    };
	}
	exports.abortBucketWorm = abortBucketWorm;
	});

	var completeBucketWorm_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.completeBucketWorm = void 0;

	async function completeBucketWorm(name, wormId, options) {
	    checkBucketName.checkBucketName(name);
	    const params = this._bucketRequestParams('POST', name, { wormId }, options);
	    const result = await this.request(params);
	    return {
	        res: result.res,
	        status: result.status
	    };
	}
	exports.completeBucketWorm = completeBucketWorm;
	});

	var extendBucketWorm_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.extendBucketWorm = void 0;


	async function extendBucketWorm(name, wormId, days, options) {
	    checkBucketName.checkBucketName(name);
	    const params = this._bucketRequestParams('POST', name, { wormExtend: '', wormId }, options);
	    const paramlXMLObJ = {
	        ExtendWormConfiguration: {
	            RetentionPeriodInDays: days
	        }
	    };
	    params.mime = 'xml';
	    params.content = obj2xml_1.obj2xml(paramlXMLObJ, { headers: true });
	    params.successStatuses = [200];
	    const result = await this.request(params);
	    return {
	        res: result.res,
	        status: result.status
	    };
	}
	exports.extendBucketWorm = extendBucketWorm;
	});

	var getBucketWorm_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getBucketWorm = void 0;


	async function getBucketWorm(name, options) {
	    checkBucketName.checkBucketName(name);
	    const params = this._bucketRequestParams('GET', name, 'worm', options);
	    params.successStatuses = [200];
	    params.xmlResponse = true;
	    const result = await this.request(params);
	    dataFix_1.dataFix(result.data, {
	        lowerFirst: true,
	        rename: {
	            RetentionPeriodInDays: 'days'
	        }
	    });
	    return Object.assign(Object.assign({}, result.data), { res: result.res, status: result.status });
	}
	exports.getBucketWorm = getBucketWorm;
	});

	var initiateBucketWorm_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.initiateBucketWorm = void 0;


	async function initiateBucketWorm(name, days, options) {
	    checkBucketName.checkBucketName(name);
	    const params = this._bucketRequestParams('POST', name, 'worm', options);
	    const paramlXMLObJ = {
	        InitiateWormConfiguration: {
	            RetentionPeriodInDays: days
	        }
	    };
	    params.mime = 'xml';
	    params.content = obj2xml_1.obj2xml(paramlXMLObJ, { headers: true });
	    params.successStatuses = [200];
	    const result = await this.request(params);
	    return {
	        res: result.res,
	        wormId: result.res.headers['x-oss-worm-id'],
	        status: result.status
	    };
	}
	exports.initiateBucketWorm = initiateBucketWorm;
	});

	var bucket$1 = createCommonjsModule(function (module, exports) {
	const proto = exports;

	mergeDescriptors(proto, getBucketRequestPayment);
	mergeDescriptors(proto, putBucketRequestPayment);
	mergeDescriptors(proto, putBucketEncryption$1);
	mergeDescriptors(proto, getBucketEncryption$1);
	mergeDescriptors(proto, deleteBucketEncryption$1);
	mergeDescriptors(proto, getBucketTags);
	mergeDescriptors(proto, putBucketTags);
	mergeDescriptors(proto, deleteBucketTags);
	mergeDescriptors(proto, putBucket$1);
	mergeDescriptors(proto, getBucketWebsite$1);
	mergeDescriptors(proto, putBucketWebsite$1);
	mergeDescriptors(proto, deleteBucketWebsite$1);
	mergeDescriptors(proto, getBucketLifecycle$1);
	mergeDescriptors(proto, putBucketLifecycle$1);
	mergeDescriptors(proto, deleteBucketLifecycle$1);
	mergeDescriptors(proto, getBucketPolicy$1);
	mergeDescriptors(proto, putBucketPolicy$1);
	mergeDescriptors(proto, deleteBucketPolicy$1);
	mergeDescriptors(proto, getBucketVersioning$1);
	mergeDescriptors(proto, putBucketVersioning$1);
	mergeDescriptors(proto, getBucketInventory_1);
	mergeDescriptors(proto, deleteBucketInventory_1);
	mergeDescriptors(proto, listBucketInventory_1);
	mergeDescriptors(proto, putBucketInventory_1);
	mergeDescriptors(proto, abortBucketWorm_1);
	mergeDescriptors(proto, completeBucketWorm_1);
	mergeDescriptors(proto, extendBucketWorm_1);
	mergeDescriptors(proto, getBucketWorm_1);
	mergeDescriptors(proto, initiateBucketWorm_1);
	});

	var bucket = createCommonjsModule(function (module, exports) {
	const { isArray } = isArray$2;
	const { checkBucketName: _checkBucketName } = checkBucketName;
	const { formatTag } = formatTag_1;

	const proto = exports;


	function toArray(obj) {
	  if (!obj) return [];
	  if (isArray(obj)) return obj;
	  return [obj];
	}

	/**
	 * Bucket opertaions
	 */

	proto.listBuckets = async function listBuckets(query = {}, options = {}) {
	  // prefix, marker, max-keys

	  const { subres = {} } = query;
	  const rest = {};
	  for (const key in query) {
	    if (key !== 'subres') {
	      rest[key] = query[key];
	    }
	  }
	  const params = this._bucketRequestParams(
	    'GET',
	    '',
	    Object.assign(subres, options.subres),
	    options
	  );

	  params.query = rest;

	  const result = await this.request(params);

	  if (result.status === 200) {
	    const data = await this.parseXML(result.data);
	    let buckets = data.Buckets || null;
	    if (buckets) {
	      if (buckets.Bucket) {
	        buckets = buckets.Bucket;
	      }
	      if (!isArray(buckets)) {
	        buckets = [buckets];
	      }
	      buckets = buckets.map(item => ({
	        name: item.Name,
	        region: item.Location,
	        creationDate: item.CreationDate,
	        storageClass: item.StorageClass,
	        StorageClass: item.StorageClass,
	        tag: formatTag(item)
	      }));
	    }
	    return {
	      buckets,
	      owner: {
	        id: data.Owner.ID,
	        displayName: data.Owner.DisplayName
	      },
	      isTruncated: data.IsTruncated === 'true',
	      nextMarker: data.NextMarker || null,
	      res: result.res
	    };
	  }

	  throw await this.requestError(result);
	};

	proto.useBucket = function useBucket(name) {
	  _checkBucketName(name);
	  return this.setBucket(name);
	};

	proto.setBucket = function useBucket(name) {
	  _checkBucketName(name);
	  this.options.bucket = name;
	  return this;
	};

	proto.getBucket = function getBucket() {
	  return this.options.bucket;
	};

	proto.getBucketLocation = async function getBucketLocation(name, options) {
	  _checkBucketName(name);
	  name = name || this.getBucket();
	  const params = this._bucketRequestParams('GET', name, 'location', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  return {
	    location: result.data,
	    res: result.res
	  };
	};

	proto.getBucketInfo = async function getBucketInfo(name, options) {
	  _checkBucketName(name);
	  name = name || this.getBucket();
	  const params = this._bucketRequestParams('GET', name, 'bucketInfo', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  return {
	    bucket: result.data.Bucket,
	    res: result.res
	  };
	};

	proto.deleteBucket = async function deleteBucket(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('DELETE', name, '', options);
	  const result = await this.request(params);
	  if (result.status === 200 || result.status === 204) {
	    return {
	      res: result.res
	    };
	  }
	  throw await this.requestError(result);
	};

	// acl

	proto.putBucketACL = async function putBucketACL(name, acl, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('PUT', name, 'acl', options);
	  params.headers = {
	    'x-oss-acl': acl
	  };
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    bucket: (result.headers.location && result.headers.location.substring(1)) || null,
	    res: result.res
	  };
	};

	proto.getBucketACL = async function getBucketACL(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'acl', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  return {
	    acl: result.data.AccessControlList.Grant,
	    owner: {
	      id: result.data.Owner.ID,
	      displayName: result.data.Owner.DisplayName
	    },
	    res: result.res
	  };
	};

	// logging

	proto.putBucketLogging = async function putBucketLogging(name, prefix, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('PUT', name, 'logging', options);
	  let xml = `${'<?xml version="1.0" encoding="UTF-8"?>\n<BucketLoggingStatus>\n' +
    '<LoggingEnabled>\n<TargetBucket>'}${name}</TargetBucket>\n`;
	  if (prefix) {
	    xml += `<TargetPrefix>${prefix}</TargetPrefix>\n`;
	  }
	  xml += '</LoggingEnabled>\n</BucketLoggingStatus>';
	  params.content = xml;
	  params.mime = 'xml';
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	proto.getBucketLogging = async function getBucketLogging(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'logging', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  const enable = result.data.LoggingEnabled;
	  return {
	    enable: !!enable,
	    prefix: (enable && enable.TargetPrefix) || null,
	    res: result.res
	  };
	};

	proto.deleteBucketLogging = async function deleteBucketLogging(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('DELETE', name, 'logging', options);
	  params.successStatuses = [204, 200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	proto.putBucketCORS = async function putBucketCORS(name, rules, options) {
	  _checkBucketName(name);
	  rules = rules || [];
	  assert__default['default'](rules.length, 'rules is required');
	  rules.forEach((rule) => {
	    assert__default['default'](rule.allowedOrigin, 'allowedOrigin is required');
	    assert__default['default'](rule.allowedMethod, 'allowedMethod is required');
	  });

	  const params = this._bucketRequestParams('PUT', name, 'cors', options);
	  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<CORSConfiguration>';
	  const parseOrigin = (val) => {
	    xml += `<AllowedOrigin>${val}</AllowedOrigin>`;
	  };
	  const parseMethod = (val) => {
	    xml += `<AllowedMethod>${val}</AllowedMethod>`;
	  };
	  const parseHeader = (val) => {
	    xml += `<AllowedHeader>${val}</AllowedHeader>`;
	  };
	  const parseExposeHeader = (val) => {
	    xml += `<ExposeHeader>${val}</ExposeHeader>`;
	  };
	  for (let i = 0, l = rules.length; i < l; i++) {
	    const rule = rules[i];
	    xml += '<CORSRule>';

	    toArray(rule.allowedOrigin).forEach(parseOrigin);
	    toArray(rule.allowedMethod).forEach(parseMethod);
	    toArray(rule.allowedHeader).forEach(parseHeader);
	    toArray(rule.exposeHeader).forEach(parseExposeHeader);
	    if (rule.maxAgeSeconds) {
	      xml += `<MaxAgeSeconds>${rule.maxAgeSeconds}</MaxAgeSeconds>`;
	    }
	    xml += '</CORSRule>';
	  }
	  xml += '</CORSConfiguration>';
	  params.content = xml;
	  params.mime = 'xml';
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	proto.getBucketCORS = async function getBucketCORS(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'cors', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  const rules = [];
	  if (result.data && result.data.CORSRule) {
	    let { CORSRule } = result.data;
	    if (!isArray(CORSRule)) CORSRule = [CORSRule];
	    CORSRule.forEach((rule) => {
	      const r = {};
	      Object.keys(rule).forEach((key) => {
	        r[key.slice(0, 1).toLowerCase() + key.slice(1, key.length)] = rule[key];
	      });
	      rules.push(r);
	    });
	  }
	  return {
	    rules,
	    res: result.res
	  };
	};

	proto.deleteBucketCORS = async function deleteBucketCORS(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('DELETE', name, 'cors', options);
	  params.successStatuses = [204];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	// referer

	proto.putBucketReferer = async function putBucketReferer(name, allowEmpty, referers, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('PUT', name, 'referer', options);
	  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<RefererConfiguration>\n';
	  xml += `  <AllowEmptyReferer>${allowEmpty ? 'true' : 'false'}</AllowEmptyReferer>\n`;
	  if (referers && referers.length > 0) {
	    xml += '  <RefererList>\n';
	    for (let i = 0; i < referers.length; i++) {
	      xml += `    <Referer>${referers[i]}</Referer>\n`;
	    }
	    xml += '  </RefererList>\n';
	  } else {
	    xml += '  <RefererList />\n';
	  }
	  xml += '</RefererConfiguration>';
	  params.content = xml;
	  params.mime = 'xml';
	  params.successStatuses = [200];
	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	proto.getBucketReferer = async function getBucketReferer(name, options) {
	  _checkBucketName(name);
	  const params = this._bucketRequestParams('GET', name, 'referer', options);
	  params.successStatuses = [200];
	  params.xmlResponse = true;
	  const result = await this.request(params);
	  let referers = result.data.RefererList.Referer || null;
	  if (referers) {
	    if (!isArray(referers)) {
	      referers = [referers];
	    }
	  }
	  return {
	    allowEmpty: result.data.AllowEmptyReferer === 'true',
	    referers,
	    res: result.res
	  };
	};

	proto.deleteBucketReferer = async function deleteBucketReferer(name, options) {
	  _checkBucketName(name);
	  return await this.putBucketReferer(name, true, null, options);
	};

	// private apis

	proto._bucketRequestParams = function _bucketRequestParams(method, bucket, subres, options) {
	  return {
	    method,
	    bucket,
	    subres,
	    timeout: options && options.timeout,
	    ctx: options && options.ctx
	  };
	};
	});

	var isFile = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isFile = void 0;
	exports.isFile = (obj) => {
	    return typeof (File) !== 'undefined' && obj instanceof File;
	};
	});

	var managedUpload = createCommonjsModule(function (module, exports) {
	const { isFile: isFile$1 } = isFile;
	const { isArray } = isArray$2;
	const { isBuffer } = isBuffer_1;
	const { retry } = retry_1;

	const proto = exports;

	/**
	 * Multipart operations
	 */

	/**
	 * Upload a file to OSS using multipart uploads
	 * @param {String} name
	 * @param {String|File|Buffer} file
	 * @param {Object} options
	 *        {Object} options.callback The callback parameter is composed of a JSON string encoded in Base64
	 *        {String} options.callback.url the OSS sends a callback request to this URL
	 *        {String} options.callback.host The host header value for initiating callback requests
	 *        {String} options.callback.body The value of the request body when a callback is initiated
	 *        {String} options.callback.contentType The Content-Type of the callback requests initiatiated
	 *        {Object} options.callback.customValue Custom parameters are a map of key-values, e.g:
	 *                  customValue = {
	 *                    key1: 'value1',
	 *                    key2: 'value2'
	 *                  }
	 */
	proto.multipartUpload = async function multipartUpload(name, file, options) {
	  this.resetCancelFlag();
	  options = options || {};
	  if (options.checkpoint && options.checkpoint.uploadId) {
	    return await this._resumeMultipart(options.checkpoint, options);
	  }

	  const minPartSize = 100 * 1024;
	  if (!options.mime) {
	    if (isFile$1(file)) {
	      options.mime = lite.getType(path__default['default'].extname(file.name));
	    } else if (isBuffer(file)) {
	      options.mime = '';
	    } else {
	      options.mime = lite.getType(path__default['default'].extname(file));
	    }
	  }
	  options.headers = options.headers || {};
	  this._convertMetaToHeaders(options.meta, options.headers);

	  const fileSize = await this._getFileSize(file);
	  if (fileSize < minPartSize) {
	    options.contentLength = fileSize;
	    const result = await this.put(name, file, options);
	    if (options && options.progress) {
	      await options.progress(1);
	    }

	    const ret = {
	      res: result.res,
	      bucket: this.options.bucket,
	      name,
	      etag: result.res.headers.etag
	    };

	    if ((options.headers && options.headers['x-oss-callback']) || options.callback) {
	      ret.data = result.data;
	    }

	    return ret;
	  }

	  if (options.partSize && !(parseInt(options.partSize, 10) === options.partSize)) {
	    throw new Error('partSize must be int number');
	  }

	  if (options.partSize && options.partSize < minPartSize) {
	    throw new Error(`partSize must not be smaller than ${minPartSize}`);
	  }

	  const initResult = await this.initMultipartUpload(name, options);
	  const { uploadId } = initResult;
	  const partSize = this._getPartSize(fileSize, options.partSize);

	  const checkpoint = {
	    file,
	    name,
	    fileSize,
	    partSize,
	    uploadId,
	    doneParts: []
	  };

	  if (options && options.progress) {
	    await options.progress(0, checkpoint, initResult.res);
	  }

	  return await this._resumeMultipart(checkpoint, options);
	};

	/*
	 * Resume multipart upload from checkpoint. The checkpoint will be
	 * updated after each successful part upload.
	 * @param {Object} checkpoint the checkpoint
	 * @param {Object} options
	 */
	proto._resumeMultipart = async function _resumeMultipart(checkpoint, options) {
	  if (this.isCancel()) {
	    throw this._makeCancelEvent();
	  }
	  const { file, fileSize, partSize, uploadId, doneParts, name } = checkpoint;

	  const partOffs = this._divideParts(fileSize, partSize);
	  const numParts = partOffs.length;
	  let uploadPartJob = retry(
	    (self, partNo) => {
	      // eslint-disable-next-line no-async-promise-executor
	      return new Promise(async (resolve, reject) => {
	        try {
	          if (!self.isCancel()) {
	            const pi = partOffs[partNo - 1];
	            const stream = await self._createStream(file, pi.start, pi.end);
	            const data = {
	              stream,
	              size: pi.end - pi.start
	            };

	            if (isArray(self.multipartUploadStreams)) {
	              self.multipartUploadStreams.push(data.stream);
	            } else {
	              self.multipartUploadStreams = [data.stream];
	            }

	            const removeStreamFromMultipartUploadStreams = function () {
	              if (!stream.destroyed) {
	                stream.destroy();
	              }
	              const index = self.multipartUploadStreams.indexOf(stream);
	              if (index !== -1) {
	                self.multipartUploadStreams.splice(index, 1);
	              }
	            };

	            stream.on('close', removeStreamFromMultipartUploadStreams);
	            stream.on('error', removeStreamFromMultipartUploadStreams);

	            let result;
	            try {
	              result = await self._uploadPart(name, uploadId, partNo, data, {
	                timeout: options.timeout
	              });
	            } catch (error) {
	              removeStreamFromMultipartUploadStreams();
	              if (error.status === 404) {
	                throw self._makeAbortEvent();
	              }
	              throw error;
	            }
	            if (!self.isCancel()) {
	              doneParts.push({
	                number: partNo,
	                etag: result.res.headers.etag
	              });
	              checkpoint.doneParts = doneParts;

	              if (options.progress) {
	                await options.progress(doneParts.length / numParts, checkpoint, result.res);
	              }
	            }
	          }
	          resolve();
	        } catch (err) {
	          err.partNum = partNo;
	          reject(err);
	        }
	      });
	    },
	    this.options.retryMax,
	    {
	      errorHandler: err => {
	        const _errHandle = _err => {
	          const statusErr = [-1, -2].includes(_err.status);
	          const requestErrorRetryHandle = this.options.requestErrorRetryHandle || (() => true);
	          return statusErr && requestErrorRetryHandle(_err);
	        };
	        return !!_errHandle(err);
	      }
	    }
	  );

	  const all = Array.from(new Array(numParts), (x, i) => i + 1);
	  const done = doneParts.map(p => p.number);
	  const todo = all.filter(p => done.indexOf(p) < 0);

	  const defaultParallel = 5;
	  const parallel = options.parallel || defaultParallel;

	  if (this.checkBrowserAndVersion('Internet Explorer', '10') || parallel === 1) {
	    for (let i = 0; i < todo.length; i++) {
	      if (this.isCancel()) {
	        throw this._makeCancelEvent();
	      }
	      /* eslint no-await-in-loop: [0] */
	      await uploadPartJob(this, todo[i]);
	    }
	  } else {
	    // upload in parallel
	    const jobErr = await this._parallelNode(todo, parallel, uploadPartJob);

	    const abortEvent = jobErr.find(err => err.name === 'abort');
	    if (abortEvent) throw abortEvent;

	    if (this.isCancel()) {
	      uploadPartJob = null;
	      throw this._makeCancelEvent();
	    }

	    if (jobErr && jobErr.length > 0) {
	      jobErr[0].message = `Failed to upload some parts with error: ${jobErr[0].toString()} part_num: ${
        jobErr[0].partNum
      }`;
	      throw jobErr[0];
	    }
	  }

	  return await this.completeMultipartUpload(name, uploadId, doneParts, options);
	};

	/**
	 * Get file size
	 */
	proto._getFileSize = async function _getFileSize(file) {
	  if (isBuffer(file)) {
	    return file.length;
	  } else if (isFile$1(file)) {
	    return file.size;
	  } else if (isTypeOf.string(file)) {
	    const stat = await this._statFile(file);
	    return stat.size;
	  }

	  throw new Error('_getFileSize requires Buffer/File/String.');
	};

	/*
	 * Readable stream for Web File
	 */
	const { Readable } = require$$0__default['default'];

	function WebFileReadStream(file, options) {
	  if (!(this instanceof WebFileReadStream)) {
	    return new WebFileReadStream(file, options);
	  }

	  Readable.call(this, options);

	  this.file = file;
	  this.reader = new FileReader();
	  this.start = 0;
	  this.finish = false;
	  this.fileBuffer = null;
	}
	util__default['default'].inherits(WebFileReadStream, Readable);

	WebFileReadStream.prototype.readFileAndPush = function readFileAndPush(size) {
	  if (this.fileBuffer) {
	    let pushRet = true;
	    while (pushRet && this.fileBuffer && this.start < this.fileBuffer.length) {
	      const { start } = this;
	      let end = start + size;
	      end = end > this.fileBuffer.length ? this.fileBuffer.length : end;
	      this.start = end;
	      pushRet = this.push(this.fileBuffer.slice(start, end));
	    }
	  }
	};

	WebFileReadStream.prototype._read = function _read(size) {
	  if (
	    (this.file && this.start >= this.file.size) ||
	    (this.fileBuffer && this.start >= this.fileBuffer.length) ||
	    this.finish ||
	    (this.start === 0 && !this.file)
	  ) {
	    if (!this.finish) {
	      this.fileBuffer = null;
	      this.finish = true;
	    }
	    this.push(null);
	    return;
	  }

	  const defaultReadSize = 16 * 1024;
	  size = size || defaultReadSize;

	  const that = this;
	  this.reader.onload = function (e) {
	    that.fileBuffer = Buffer.from(new Uint8Array(e.target.result));
	    that.file = null;
	    that.readFileAndPush(size);
	  };
	  this.reader.onerror = function onload(e) {
	    const error = e.srcElement && e.srcElement.error;
	    if (error) {
	      throw error;
	    }
	    throw e;
	  };

	  if (this.start === 0) {
	    this.reader.readAsArrayBuffer(this.file);
	  } else {
	    this.readFileAndPush(size);
	  }
	};

	proto._createStream = function _createStream(file, start, end) {
	  if (isTypeOf.readableStream(file)) {
	    return file;
	  } else if (isFile$1(file)) {
	    return new WebFileReadStream(file.slice(start, end));
	  } else if (isBuffer(file)) {
	    const iterable = file.subarray(start, end);
	    // we can't use Readable.from() since it is only support in Node v10
	    return new Readable({
	      read() {
	        this.push(iterable);
	        this.push(null);
	      }
	    });
	  } else if (isTypeOf.string(file)) {
	    return fs.createReadStream(file, {
	      start,
	      end: end - 1
	    });
	  }
	  throw new Error('_createStream requires Buffer/File/String.');
	};

	proto._getPartSize = function _getPartSize(fileSize, partSize) {
	  const maxNumParts = 10 * 1000;
	  const defaultPartSize = 1 * 1024 * 1024;

	  if (!partSize) partSize = defaultPartSize;
	  const safeSize = Math.ceil(fileSize / maxNumParts);

	  if (partSize < safeSize) {
	    partSize = safeSize;
	    console.warn(
	      `partSize has been set to ${partSize}, because the partSize you provided causes partNumber to be greater than 10,000`
	    );
	  }
	  return partSize;
	};

	proto._divideParts = function _divideParts(fileSize, partSize) {
	  const numParts = Math.ceil(fileSize / partSize);

	  const partOffs = [];
	  for (let i = 0; i < numParts; i++) {
	    const start = partSize * i;
	    const end = Math.min(start + partSize, fileSize);

	    partOffs.push({
	      start,
	      end
	    });
	  }

	  return partOffs;
	};
	});

	var toXML = function(obj, config){
	  // include XML header
	  config = config || {};
	  var out = '';
	  if(config.header) {
	    if(typeof config.header == 'string') {
	      out = config.header;
	    } else {
	      out = '<?xml version="1.0" encoding="UTF-8"?>\n';
	    }
	  }
	  
	  var origIndent = config.indent || '';
	  var indent = '';

	  var filter = function customFilter(txt) {
	    if(!config.filter) return txt;
	    var mappings = config.filter;
	    var replacements = [];
	    for(var map in mappings) {
	      if(!mappings.hasOwnProperty(map)) continue;
	      replacements.push(map);
	    }
	    return String(txt).replace(new RegExp('(' + replacements.join('|') + ')', 'g'), function(str, entity) {
	      return mappings[entity] || '';
	    });
	  };
	  
	  // helper function to push a new line to the output
	  var push = function(string){
	    out += string + (origIndent ? '\n' : '');
	  };
	  
	  /* create a tag and add it to the output
	     Example:
	     outputTag({
	       name: 'myTag',      // creates a tag <myTag>
	       indent: '  ',       // indent string to prepend
	       closeTag: true,     // starts and closes a tag on the same line
	       selfCloseTag: true,
	       attrs: {            // attributes
	         foo: 'bar',       // results in <myTag foo="bar">
	         foo2: 'bar2'
	       }
	     });
	  */
	  var outputTag = function(tag){
	    var attrsString = '';
	    var outputString = '';
	    var attrs = tag.attrs || '';
	    
	    // turn the attributes object into a string with key="value" pairs
	    for(var attr in attrs){
	      if(attrs.hasOwnProperty(attr)) {
	        attrsString += ' ' + attr + '="' + attrs[attr] + '"';
	      }
	    }

	    // assemble the tag
	    outputString += (tag.indent || '') + '<' + (tag.closeTag ? '/' : '') + tag.name + (!tag.closeTag ? attrsString : '') + (tag.selfCloseTag ? '/' : '') + '>';
	    
	    // if the tag only contains a text string, output it and close the tag
	    if(tag.text || tag.text === ''){
	      outputString += filter(tag.text) + '</' + tag.name + '>';
	    }
	    
	    push(outputString);
	  };
	  
	  // custom-tailored iterator for input arrays/objects (NOT a general purpose iterator)
	  var every = function(obj, fn, indent){
	    // array
	    if(Array.isArray(obj)){
	      obj.every(function(elt){  // for each element in the array
	        fn(elt, indent);
	        return true;            // continue to iterate
	      });
	      
	      return;
	    }
	    
	    // object with tag name
	    if(obj._name){
	      fn(obj, indent);
	      return;
	    }
	    
	    // iterable object
	    for(var key in obj){
	      var type = typeof obj[key];

	      if(obj.hasOwnProperty(key) && (obj[key] || type === 'boolean' || type === 'number')){
	        fn({_name: key, _content: obj[key]}, indent);
	      //} else if(!obj[key]) {   // null value (foo:'')
	      } else if(obj.hasOwnProperty(key) && obj[key] === null) {   // null value (foo:null)
	        fn(key, indent);       // output the keyname as a string ('foo')
	      } else if(obj.hasOwnProperty(key) && obj[key] === '') {
	        // blank string
	        outputTag({
	          name: key,
	          text: ''
	        });
	      }
	    }
	  };
	  
	  var convert = function convert(input, indent){
	    var type = typeof input;
	    
	    if(!indent) indent = '';
	    
	    if(Array.isArray(input)) type = 'array';
	    
	    var path = {
	      'string': function(){
	        push(indent + filter(input));
	      },

	      'boolean': function(){
	        push(indent + (input ? 'true' : 'false'));
	      },
	      
	      'number': function(){
	        push(indent + input);
	      },
	      
	      'array': function(){
	        every(input, convert, indent);
	      },
	      
	      'function': function(){
	        push(indent + input());
	      },
	      
	      'object': function(){
	        if(!input._name){
	          every(input, convert, indent);
	          return;
	        }
	        
	        var outputTagObj = {
	          name: input._name,
	          indent: indent,
	          attrs: input._attrs
	        };
	        
	        var type = typeof input._content;

	        if(type === 'undefined' || input._content._selfCloseTag === true){
	          if (input._content && input._content._attrs) {
	            outputTagObj.attrs = input._content._attrs;
	          }
	          outputTagObj.selfCloseTag = true;
	          outputTag(outputTagObj);
	          return;
	        }
	        
	        var objContents = {
	          'string': function(){
	            outputTagObj.text = input._content;
	            outputTag(outputTagObj);
	          },

	          'boolean': function(){
	            outputTagObj.text = (input._content ? 'true' : 'false');
	            outputTag(outputTagObj);
	          },
	          
	          'number': function(){
	            outputTagObj.text = input._content.toString();
	            outputTag(outputTagObj);
	          },
	          
	          'object': function(){  // or Array
	            outputTag(outputTagObj);
	            
	            every(input._content, convert, indent + origIndent);
	            
	            outputTagObj.closeTag = true;
	            outputTag(outputTagObj);
	          },
	          
	          'function': function(){
	            outputTagObj.text = input._content();  // () to execute the fn
	            outputTag(outputTagObj);
	          }
	        };
	        
	        if(objContents[type]) objContents[type]();
	      }
	      
	    };
	    
	    if(path[type]) path[type]();
	  };
	  
	  convert(obj, indent);
	  
	  return out;
	};

	var toXML_1 = toXML;

	var jstoxml = {
		toXML: toXML_1
	};

	var rtmp = createCommonjsModule(function (module, exports) {
	/**
	 * Copyright(c) ali-sdk and other contributors.
	 * MIT Licensed
	 *
	 * Authors:
	 *   rockuw <rockuw@gmail.com> (http://rockuw.com)
	 */


	/**
	 * Module dependencies.
	 */






	const proto = exports;

	/**
	 * RTMP operations
	 */

	/**
	 * Create a live channel
	 * @param {String} id the channel id
	 * @param {Object} conf the channel configuration
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.putChannel = async function putChannel(id, conf, options) {
	  options = options || {};
	  options.subres = 'live';

	  const params = this._objectRequestParams('PUT', id, options);
	  params.xmlResponse = true;
	  params.content = jstoxml.toXML({
	    LiveChannelConfiguration: conf
	  });
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  let publishUrls = result.data.PublishUrls.Url;
	  if (!Array.isArray(publishUrls)) {
	    publishUrls = [publishUrls];
	  }
	  let playUrls = result.data.PlayUrls.Url;
	  if (!Array.isArray(playUrls)) {
	    playUrls = [playUrls];
	  }

	  return {
	    publishUrls,
	    playUrls,
	    res: result.res
	  };
	};

	/**
	 * Get the channel info
	 * @param {String} id the channel id
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.getChannel = async function getChannel(id, options) {
	  options = options || {};
	  options.subres = 'live';

	  const params = this._objectRequestParams('GET', id, options);
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    data: result.data,
	    res: result.res
	  };
	};

	/**
	 * Delete the channel
	 * @param {String} id the channel id
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.deleteChannel = async function deleteChannel(id, options) {
	  options = options || {};
	  options.subres = 'live';

	  const params = this._objectRequestParams('DELETE', id, options);
	  params.successStatuses = [204];

	  const result = await this.request(params);

	  return {
	    res: result.res
	  };
	};

	/**
	 * Set the channel status
	 * @param {String} id the channel id
	 * @param {String} status the channel status
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.putChannelStatus = async function putChannelStatus(id, status, options) {
	  options = options || {};
	  options.subres = {
	    live: null,
	    status
	  };

	  const params = this._objectRequestParams('PUT', id, options);
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    res: result.res
	  };
	};

	/**
	 * Get the channel status
	 * @param {String} id the channel id
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.getChannelStatus = async function getChannelStatus(id, options) {
	  options = options || {};
	  options.subres = {
	    live: null,
	    comp: 'stat'
	  };

	  const params = this._objectRequestParams('GET', id, options);
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    data: result.data,
	    res: result.res
	  };
	};

	/**
	 * List the channels
	 * @param {Object} query the query parameters
	 *  filter options:
	 *   - prefix {String}: the channel id prefix (returns channels with this prefix)
	 *   - marker {String}: the channle id marker (returns channels after this id)
	 *   - max-keys {Number}: max number of channels to return
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.listChannels = async function listChannels(query, options) {
	  // prefix, marker, max-keys

	  options = options || {};
	  options.subres = 'live';

	  const params = this._objectRequestParams('GET', '', options);
	  params.query = query;
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  let channels = result.data.LiveChannel || [];
	  if (!Array.isArray(channels)) {
	    channels = [channels];
	  }

	  channels = channels.map((x) => {
	    x.PublishUrls = x.PublishUrls.Url;
	    if (!Array.isArray(x.PublishUrls)) {
	      x.PublishUrls = [x.PublishUrls];
	    }
	    x.PlayUrls = x.PlayUrls.Url;
	    if (!Array.isArray(x.PlayUrls)) {
	      x.PlayUrls = [x.PlayUrls];
	    }

	    return x;
	  });

	  return {
	    channels,
	    nextMarker: result.data.NextMarker || null,
	    isTruncated: result.data.IsTruncated === 'true',
	    res: result.res
	  };
	};

	/**
	 * Get the channel history
	 * @param {String} id the channel id
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.getChannelHistory = async function getChannelHistory(id, options) {
	  options = options || {};
	  options.subres = {
	    live: null,
	    comp: 'history'
	  };

	  const params = this._objectRequestParams('GET', id, options);
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  let records = result.data.LiveRecord || [];
	  if (!Array.isArray(records)) {
	    records = [records];
	  }
	  return {
	    records,
	    res: result.res
	  };
	};

	/**
	 * Create vod playlist
	 * @param {String} id the channel id
	 * @param {String} name the playlist name
	 * @param {Object} time the begin and end time
	 *  time:
	 *   - startTime {Number}: the begin time in epoch seconds
	 *   - endTime {Number}: the end time in epoch seconds
	 * @param {Object} options
	 * @return {Object}
	 */
	proto.createVod = async function createVod(id, name, time, options) {
	  options = options || {};
	  options.subres = {
	    vod: null
	  };
	  copyTo(time).to(options.subres);

	  const params = this._objectRequestParams('POST', `${id}/${name}`, options);
	  params.query = time;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    res: result.res
	  };
	};

	/**
	 * Get RTMP Url
	 * @param {String} channelId the channel id
	 * @param {Object} options
	 *  options:
	 *   - expires {Number}: expire time in seconds
	 *   - params {Object}: the parameters such as 'playlistName'
	 * @return {String} the RTMP url
	 */
	proto.getRtmpUrl = function (channelId, options) {
	  options = options || {};
	  const expires = utility.timestamp() + (options.expires || 1800);
	  const res = {
	    bucket: this.options.bucket,
	    object: this._objectName(`live/${channelId}`)
	  };
	  const resource = `/${res.bucket}/${channelId}`;

	  options.params = options.params || {};
	  const query = Object.keys(options.params).sort().map(x => `${x}:${options.params[x]}\n`).join('');

	  const stringToSign = `${expires}\n${query}${resource}`;
	  const signature = this.signature(stringToSign);

	  const url = urlutil__default['default'].parse(this._getReqUrl(res));
	  url.protocol = 'rtmp:';
	  url.query = {
	    OSSAccessKeyId: this.options.accessKeyId,
	    Expires: expires,
	    Signature: signature
	  };
	  copyTo(options.params).to(url.query);

	  return url.format();
	};
	});

	var multipartCopy = createCommonjsModule(function (module, exports) {
	/* eslint-disable no-async-promise-executor */

	const debug = debug$2();


	const proto = exports;


	/**
	 * Upload a part copy in a multipart from the source bucket/object
	 * used with initMultipartUpload and completeMultipartUpload.
	 * @param {String} name copy object name
	 * @param {String} uploadId the upload id
	 * @param {Number} partNo the part number
	 * @param {String} range  like 0-102400  part size need to copy
	 * @param {Object} sourceData
	 *        {String} sourceData.sourceKey  the source object name
	 *        {String} sourceData.sourceBucketName  the source bucket name
	 * @param {Object} options
	 */
	/* eslint max-len: [0] */
	proto.uploadPartCopy = async function uploadPartCopy(name, uploadId, partNo, range, sourceData, options = {}) {
	  options.headers = options.headers || {};
	  const versionId = options.versionId || (options.subres && options.subres.versionId) || null;
	  let copySource;
	  if (versionId) {
	    copySource = `/${sourceData.sourceBucketName}/${encodeURIComponent(sourceData.sourceKey)}?versionId=${versionId}`;
	  } else {
	    copySource = `/${sourceData.sourceBucketName}/${encodeURIComponent(sourceData.sourceKey)}`;
	  }

	  options.headers['x-oss-copy-source'] = copySource;
	  if (range) {
	    options.headers['x-oss-copy-source-range'] = `bytes=${range}`;
	  }

	  options.subres = {
	    partNumber: partNo,
	    uploadId
	  };
	  const params = this._objectRequestParams('PUT', name, options);
	  params.mime = options.mime;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    name,
	    etag: result.res.headers.etag,
	    res: result.res
	  };
	};

	/**
	 * @param {String} name copy object name
	 * @param {Object} sourceData
	 *        {String} sourceData.sourceKey  the source object name
	 *        {String} sourceData.sourceBucketName  the source bucket name
	 *        {Number} sourceData.startOffset  data copy start byte offset, e.g: 0
	 *        {Number} sourceData.endOffset  data copy end byte offset, e.g: 102400
	 * @param {Object} options
	 *        {Number} options.partSize
	 */
	proto.multipartUploadCopy = async function multipartUploadCopy(name, sourceData, options = {}) {
	  this.resetCancelFlag();
	  const { versionId = null } = options;
	  const metaOpt = {
	    versionId
	  };
	  const objectMeta = await this._getObjectMeta(sourceData.sourceBucketName, sourceData.sourceKey, metaOpt);
	  const fileSize = objectMeta.res.headers['content-length'];
	  sourceData.startOffset = sourceData.startOffset || 0;
	  sourceData.endOffset = sourceData.endOffset || fileSize;

	  if (options.checkpoint && options.checkpoint.uploadId) {
	    return await this._resumeMultipartCopy(options.checkpoint, sourceData, options);
	  }

	  const minPartSize = 100 * 1024;

	  const copySize = sourceData.endOffset - sourceData.startOffset;
	  if (copySize < minPartSize) {
	    throw new Error(`copySize must not be smaller than ${minPartSize}`);
	  }

	  if (options.partSize && options.partSize < minPartSize) {
	    throw new Error(`partSize must not be smaller than ${minPartSize}`);
	  }

	  const init = await this.initMultipartUpload(name, options);
	  const { uploadId } = init;
	  const partSize = this._getPartSize(copySize, options.partSize);

	  const checkpoint = {
	    name,
	    copySize,
	    partSize,
	    uploadId,
	    doneParts: []
	  };

	  if (options && options.progress) {
	    await options.progress(0, checkpoint, init.res);
	  }

	  return await this._resumeMultipartCopy(checkpoint, sourceData, options);
	};

	/*
	 * Resume multipart copy from checkpoint. The checkpoint will be
	 * updated after each successful part copy.
	 * @param {Object} checkpoint the checkpoint
	 * @param {Object} options
	 */
	proto._resumeMultipartCopy = async function _resumeMultipartCopy(checkpoint, sourceData, options) {
	  if (this.isCancel()) {
	    throw this._makeCancelEvent();
	  }
	  const { versionId = null } = options;
	  const metaOpt = {
	    versionId
	  };
	  const {
	    copySize, partSize, uploadId, doneParts, name
	  } = checkpoint;

	  const partOffs = this._divideMultipartCopyParts(copySize, partSize, sourceData.startOffset);
	  const numParts = partOffs.length;

	  const uploadPartCopyOptions = {
	    headers: {}
	  };

	  if (options.copyheaders) {
	    copyTo(options.copyheaders).to(uploadPartCopyOptions.headers);
	  }
	  if (versionId) {
	    copyTo(metaOpt).to(uploadPartCopyOptions);
	  }

	  const uploadPartJob = function uploadPartJob(self, partNo, source) {
	    return new Promise(async (resolve, reject) => {
	      try {
	        if (!self.isCancel()) {
	          const pi = partOffs[partNo - 1];
	          const range = `${pi.start}-${pi.end - 1}`;

	          let result;
	          try {
	            result = await self.uploadPartCopy(name, uploadId, partNo, range, source, uploadPartCopyOptions);
	          } catch (error) {
	            if (error.status === 404) {
	              throw self._makeAbortEvent();
	            }
	            throw error;
	          }
	          if (!self.isCancel()) {
	            debug(`content-range ${result.res.headers['content-range']}`);
	            doneParts.push({
	              number: partNo,
	              etag: result.res.headers.etag
	            });
	            checkpoint.doneParts = doneParts;

	            if (options && options.progress) {
	              await options.progress(doneParts.length / numParts, checkpoint, result.res);
	            }
	          }
	        }
	        resolve();
	      } catch (err) {
	        err.partNum = partNo;
	        reject(err);
	      }
	    });
	  };

	  const all = Array.from(new Array(numParts), (x, i) => i + 1);
	  const done = doneParts.map(p => p.number);
	  const todo = all.filter(p => done.indexOf(p) < 0);
	  const defaultParallel = 5;
	  const parallel = options.parallel || defaultParallel;

	  if (this.checkBrowserAndVersion('Internet Explorer', '10') || parallel === 1) {
	    for (let i = 0; i < todo.length; i++) {
	      if (this.isCancel()) {
	        throw this._makeCancelEvent();
	      }
	      /* eslint no-await-in-loop: [0] */
	      await uploadPartJob(this, todo[i], sourceData);
	    }
	  } else {
	    // upload in parallel
	    const errors = await this._parallelNode(todo, parallel, uploadPartJob, sourceData);

	    const abortEvent = errors.find(err => err.name === 'abort');
	    if (abortEvent) throw abortEvent;

	    if (this.isCancel()) {
	      throw this._makeCancelEvent();
	    }

	    // check errors after all jobs are completed
	    if (errors && errors.length > 0) {
	      const err = errors[0];
	      err.message = `Failed to copy some parts with error: ${err.toString()} part_num: ${err.partNum}`;
	      throw err;
	    }
	  }

	  return await this.completeMultipartUpload(name, uploadId, doneParts, options);
	};

	proto._divideMultipartCopyParts = function _divideMultipartCopyParts(fileSize, partSize, startOffset) {
	  const numParts = Math.ceil(fileSize / partSize);

	  const partOffs = [];
	  for (let i = 0; i < numParts; i++) {
	    const start = (partSize * i) + startOffset;
	    const end = Math.min(start + partSize, fileSize + startOffset);

	    partOffs.push({
	      start,
	      end
	    });
	  }

	  return partOffs;
	};

	/**
	 * Get Object Meta
	 * @param {String} bucket  bucket name
	 * @param {String} name   object name
	 * @param {Object} options
	 */
	proto._getObjectMeta = async function _getObjectMeta(bucket, name, options) {
	  const currentBucket = this.getBucket();
	  this.setBucket(bucket);
	  const data = await this.head(name, options);
	  this.setBucket(currentBucket);
	  return data;
	};
	});

	var parallel = createCommonjsModule(function (module, exports) {
	const { isArray } = isArray$2;

	const proto = exports;

	proto._parallelNode = async function _parallelNode(todo, parallel, fn, sourceData) {
	  const that = this;
	  // upload in parallel
	  const jobErr = [];
	  let jobs = [];
	  const tempBatch = todo.length / parallel;
	  const remainder = todo.length % parallel;
	  const batch = remainder === 0 ? tempBatch : ((todo.length - remainder) / parallel) + 1;
	  let taskIndex = 1;
	  for (let i = 0; i < todo.length; i++) {
	    if (that.isCancel()) {
	      break;
	    }

	    if (sourceData) {
	      jobs.push(fn(that, todo[i], sourceData));
	    } else {
	      jobs.push(fn(that, todo[i]));
	    }

	    if (jobs.length === parallel || (taskIndex === batch && i === (todo.length - 1))) {
	      try {
	        taskIndex += 1;
	        /* eslint no-await-in-loop: [0] */
	        await Promise.all(jobs);
	      } catch (err) {
	        jobErr.push(err);
	      }
	      jobs = [];
	    }
	  }

	  return jobErr;
	};

	proto._parallel = function _parallel(todo, parallel, jobPromise) {
	  const that = this;
	  return new Promise((resolve) => {
	    const _jobErr = [];
	    if (parallel <= 0 || !todo) {
	      resolve(_jobErr);
	      return;
	    }

	    function onlyOnce(fn) {
	      return function (...args) {
	        if (fn === null) throw new Error('Callback was already called.');
	        const callFn = fn;
	        fn = null;
	        callFn.apply(this, args);
	      };
	    }

	    function createArrayIterator(coll) {
	      let i = -1;
	      const len = coll.length;
	      return function next() {
	        return (++i < len && !that.isCancel()) ? { value: coll[i], key: i } : null;
	      };
	    }

	    const nextElem = createArrayIterator(todo);
	    let done = false;
	    let running = 0;
	    let looping = false;

	    function iterateeCallback(err, value) {
	      running -= 1;
	      if (err) {
	        done = true;
	        _jobErr.push(err);
	        resolve(_jobErr);
	      } else if (value === {} || (done && running <= 0)) {
	        done = true;
	        resolve(_jobErr);
	      } else if (!looping) {
	        /* eslint no-use-before-define: [0] */
	        if (that.isCancel()) {
	          resolve(_jobErr);
	        } else {
	          replenish();
	        }
	      }
	    }

	    function iteratee(value, callback) {
	      jobPromise(value).then((result) => {
	        callback(null, result);
	      }).catch((err) => {
	        callback(err);
	      });
	    }

	    function replenish() {
	      looping = true;
	      while (running < parallel && !done && !that.isCancel()) {
	        const elem = nextElem();
	        if (elem === null || _jobErr.length > 0) {
	          done = true;
	          if (running <= 0) {
	            resolve(_jobErr);
	          }
	          return;
	        }
	        running += 1;
	        iteratee(elem.value, onlyOnce(iterateeCallback));
	      }
	      looping = false;
	    }

	    replenish();
	  });
	};

	/**
	 * cancel operation, now can use with multipartUpload
	 * @param {Object} abort
	 *        {String} anort.name object key
	 *        {String} anort.uploadId upload id
	 *        {String} anort.options timeout
	 */
	proto.cancel = function cancel(abort) {
	  this.options.cancelFlag = true;

	  if (isArray(this.multipartUploadStreams)) {
	    this.multipartUploadStreams.forEach(_ => {
	      if (_.destroyed === false) {
	        const err = {
	          name: 'cancel',
	          message: 'cancel'
	        };
	        _.destroy(err);
	      }
	    });
	  }
	  this.multipartUploadStreams = [];
	  if (abort) {
	    this.abortMultipartUpload(abort.name, abort.uploadId, abort.options);
	  }
	};

	proto.isCancel = function isCancel() {
	  return this.options.cancelFlag;
	};

	proto.resetCancelFlag = function resetCancelFlag() {
	  this.options.cancelFlag = false;
	};

	proto._stop = function _stop() {
	  this.options.cancelFlag = true;
	};

	// cancel is not error , so create an object
	proto._makeCancelEvent = function _makeCancelEvent() {
	  const cancelEvent = {
	    status: 0,
	    name: 'cancel'
	  };
	  return cancelEvent;
	};

	// abort is not error , so create an object
	proto._makeAbortEvent = function _makeAbortEvent() {
	  const abortEvent = {
	    status: 0,
	    name: 'abort',
	    message: 'upload task has been abort'
	  };
	  return abortEvent;
	};
	});

	var multipart = createCommonjsModule(function (module, exports) {
	const { deepCopyWith } = deepCopy;
	const { isBuffer } = isBuffer_1;

	const proto = exports;

	/**
	 * List the on-going multipart uploads
	 * https://help.aliyun.com/document_detail/31997.html
	 * @param {Object} options
	 * @return {Array} the multipart uploads
	 */
	proto.listUploads = async function listUploads(query, options) {
	  options = options || {};
	  const opt = {};
	  copyTo(options).to(opt);
	  opt.subres = 'uploads';
	  const params = this._objectRequestParams('GET', '', opt);
	  params.query = query;
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);
	  let uploads = result.data.Upload || [];
	  if (!Array.isArray(uploads)) {
	    uploads = [uploads];
	  }
	  uploads = uploads.map(up => ({
	    name: up.Key,
	    uploadId: up.UploadId,
	    initiated: up.Initiated
	  }));

	  return {
	    res: result.res,
	    uploads,
	    bucket: result.data.Bucket,
	    nextKeyMarker: result.data.NextKeyMarker,
	    nextUploadIdMarker: result.data.NextUploadIdMarker,
	    isTruncated: result.data.IsTruncated === 'true'
	  };
	};

	/**
	 * List the done uploadPart parts
	 * @param {String} name object name
	 * @param {String} uploadId multipart upload id
	 * @param {Object} query
	 * {Number} query.max-parts The maximum part number in the response of the OSS. Default value: 1000
	 * {Number} query.part-number-marker Starting position of a specific list.
	 * {String} query.encoding-type Specify the encoding of the returned content and the encoding type.
	 * @param {Object} options
	 * @return {Object} result
	 */
	proto.listParts = async function listParts(name, uploadId, query, options) {
	  options = options || {};
	  const opt = {};
	  copyTo(options).to(opt);
	  opt.subres = {
	    uploadId
	  };
	  const params = this._objectRequestParams('GET', name, opt);
	  params.query = query;
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    res: result.res,
	    uploadId: result.data.UploadId,
	    bucket: result.data.Bucket,
	    name: result.data.Key,
	    partNumberMarker: result.data.PartNumberMarker,
	    nextPartNumberMarker: result.data.NextPartNumberMarker,
	    maxParts: result.data.MaxParts,
	    isTruncated: result.data.IsTruncated,
	    parts: result.data.Part || []
	  };
	};

	/**
	 * Abort a multipart upload transaction
	 * @param {String} name the object name
	 * @param {String} uploadId the upload id
	 * @param {Object} options
	 */
	proto.abortMultipartUpload = async function abortMultipartUpload(name, uploadId, options) {
	  this._stop();
	  options = options || {};
	  const opt = {};
	  copyTo(options).to(opt);
	  opt.subres = { uploadId };
	  const params = this._objectRequestParams('DELETE', name, opt);
	  params.successStatuses = [204];

	  const result = await this.request(params);
	  return {
	    res: result.res
	  };
	};

	/**
	 * Initiate a multipart upload transaction
	 * @param {String} name the object name
	 * @param {Object} options
	 * @return {String} upload id
	 */
	proto.initMultipartUpload = async function initMultipartUpload(name, options) {
	  options = options || {};
	  const opt = {};
	  copyTo(options).to(opt);
	  opt.headers = opt.headers || {};
	  this._convertMetaToHeaders(options.meta, opt.headers);

	  opt.subres = 'uploads';
	  const params = this._objectRequestParams('POST', name, opt);
	  params.mime = options.mime;
	  params.xmlResponse = true;
	  params.successStatuses = [200];

	  const result = await this.request(params);

	  return {
	    res: result.res,
	    bucket: result.data.Bucket,
	    name: result.data.Key,
	    uploadId: result.data.UploadId
	  };
	};

	/**
	 * Upload a part in a multipart upload transaction
	 * @param {String} name the object name
	 * @param {String} uploadId the upload id
	 * @param {Integer} partNo the part number
	 * @param {File} file upload File, whole File
	 * @param {Integer} start  part start bytes  e.g: 102400
	 * @param {Integer} end  part end bytes  e.g: 204800
	 * @param {Object} options
	 */
	proto.uploadPart = async function uploadPart(name, uploadId, partNo, file, start, end, options) {
	  const data = {
	    size: end - start
	  };
	  const isBrowserEnv = process && process.browser;
	  isBrowserEnv
	    ? (data.content = await this._createBuffer(file, start, end))
	    : (data.stream = await this._createStream(file, start, end));
	  return await this._uploadPart(name, uploadId, partNo, data, options);
	};

	/**
	 * Complete a multipart upload transaction
	 * @param {String} name the object name
	 * @param {String} uploadId the upload id
	 * @param {Array} parts the uploaded parts, each in the structure:
	 *        {Integer} number partNo
	 *        {String} etag  part etag  uploadPartCopy result.res.header.etag
	 * @param {Object} options
	 *         {Object} options.callback The callback parameter is composed of a JSON string encoded in Base64
	 *         {String} options.callback.url  the OSS sends a callback request to this URL
	 *         {String} options.callback.host  The host header value for initiating callback requests
	 *         {String} options.callback.body  The value of the request body when a callback is initiated
	 *         {String} options.callback.contentType  The Content-Type of the callback requests initiatiated
	 *         {Object} options.callback.customValue  Custom parameters are a map of key-values, e.g:
	 *                   customValue = {
	 *                     key1: 'value1',
	 *                     key2: 'value2'
	 *                   }
	 */
	proto.completeMultipartUpload = async function completeMultipartUpload(name, uploadId, parts, options) {
	  const completeParts = parts
	    .concat()
	    .sort((a, b) => a.number - b.number)
	    .filter((item, index, arr) => !index || item.number !== arr[index - 1].number);
	  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<CompleteMultipartUpload>\n';
	  for (let i = 0; i < completeParts.length; i++) {
	    const p = completeParts[i];
	    xml += '<Part>\n';
	    xml += `<PartNumber>${p.number}</PartNumber>\n`;
	    xml += `<ETag>${p.etag}</ETag>\n`;
	    xml += '</Part>\n';
	  }
	  xml += '</CompleteMultipartUpload>';

	  options = options || {};
	  let opt = {};
	  opt = deepCopyWith(options, _ => {
	    if (isBuffer(_)) return null;
	  });
	  if (opt.headers) delete opt.headers['x-oss-server-side-encryption'];
	  opt.subres = { uploadId };

	  const params = this._objectRequestParams('POST', name, opt);
	  callback.encodeCallback(params, opt);
	  params.mime = 'xml';
	  params.content = xml;

	  if (!(params.headers && params.headers['x-oss-callback'])) {
	    params.xmlResponse = true;
	  }
	  params.successStatuses = [200];
	  const result = await this.request(params);

	  const ret = {
	    res: result.res,
	    bucket: params.bucket,
	    name,
	    etag: result.res.headers.etag
	  };

	  if (params.headers && params.headers['x-oss-callback']) {
	    ret.data = JSON.parse(result.data.toString());
	  }

	  return ret;
	};

	/**
	 * Upload a part in a multipart upload transaction
	 * @param {String} name the object name
	 * @param {String} uploadId the upload id
	 * @param {Integer} partNo the part number
	 * @param {Object} data the body data
	 * @param {Object} options
	 */
	proto._uploadPart = async function _uploadPart(name, uploadId, partNo, data, options) {
	  options = options || {};
	  const opt = {};
	  copyTo(options).to(opt);
	  opt.headers = {
	    'Content-Length': data.size
	  };

	  opt.subres = {
	    partNumber: partNo,
	    uploadId
	  };
	  const params = this._objectRequestParams('PUT', name, opt);
	  params.mime = opt.mime;
	  const isBrowserEnv = process && process.browser;
	  isBrowserEnv ? (params.content = data.content) : (params.stream = data.stream);
	  params.successStatuses = [200];
	  params.disabledMD5 = options.disabledMD5;

	  const result = await this.request(params);

	  if (!result.res.headers.etag) {
	    throw new Error(
	      'Please set the etag of expose-headers in OSS \n https://help.aliyun.com/document_detail/32069.html'
	    );
	  }
	  if (data.stream) {
	    data.stream = null;
	    params.stream = null;
	  }
	  return {
	    name,
	    etag: result.res.headers.etag,
	    res: result.res
	  };
	};
	});

	/* istanbul ignore next */
	var image = function (OssClient) {
	  /* istanbul ignore next */
	//   function objectRequestParams(method, name, options) {
	//     options = options || {};
	//     name = this._objectName(name);
	//     const authResource = `/${this.options.bucket}/${name}`;
	//     const params = {
	//       name,
	//       method,
	//       host: this.options.imageHost,
	//       resource: `/${name}`,
	//       timeout: options.timeout,
	//       authResource,
	//       ctx: options.ctx
	//     };
	//     if (options.headers) {
	//       params.headers = options.headers;
	//     }
	//     return params;
	//   }

	  function ImageClient(options) {
	    if (!(this instanceof ImageClient)) {
	      return new ImageClient(options);
	    }
	    if (!options.bucket) {
	      throw new Error('require bucket for image service instance');
	    }
	    if (!options.imageHost) {
	      throw new Error('require imageHost for image service instance');
	    }

	    options.endpoint = options.imageHost;
	    this.ossClient = new OssClient(options);
	    this.ossClient.options.imageHost = options.imageHost;
	    // this.ossClient._objectRequestParams = objectRequestParams;
	  }

	  /**
	   * Image operations
	   */

	  ImageClient.prototype.get = async function get(name, file, options) {
	    return await this.ossClient.get(name, file, options);
	  };

	  ImageClient.prototype.getStream = async function getStream(name, options) {
	    return await this.ossClient.getStream(name, options);
	  };

	  ImageClient.prototype.getExif = async function getExif(name, options) {
	    const params = this.ossClient._objectRequestParams('GET', `${name}@exif`, options);
	    params.successStatuses = [200];

	    let result = await this.ossClient.request(params);
	    result = await this._parseResponse(result);
	    return {
	      res: result.res,
	      data: result.data
	    };
	  };

	  ImageClient.prototype.getInfo = async function getInfo(name, options) {
	    const params = this.ossClient._objectRequestParams('GET', `${name}@infoexif`, options);
	    params.successStatuses = [200];

	    let result = await this.ossClient.request(params);
	    result = await this._parseResponse(result);
	    return {
	      res: result.res,
	      data: result.data
	    };
	  };

	  ImageClient.prototype.putStyle = async function putStyle(styleName, style, options) {
	    const params = this.ossClient._objectRequestParams('PUT', `/?style&styleName=${styleName}`, options);
	    params.successStatuses = [200];
	    params.content = `${'<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<Style><Content>'}${style}</Content></Style>`;

	    let result = await this.ossClient.request(params);
	    result = await this._parseResponse(result);
	    return {
	      res: result.res,
	      data: result.data
	    };
	  };

	  ImageClient.prototype.getStyle = async function getStyle(styleName, options) {
	    const params = this.ossClient._objectRequestParams('GET', `/?style&styleName=${styleName}`, options);
	    params.successStatuses = [200];

	    let result = await this.ossClient.request(params);
	    result = await this._parseResponse(result);
	    return {
	      res: result.res,
	      data: result.data
	    };
	  };

	  ImageClient.prototype.listStyle = async function listStyle(options) {
	    const params = this.ossClient._objectRequestParams('GET', '/?style', options);
	    params.successStatuses = [200];

	    let result = await this.ossClient.request(params);
	    result = await this._parseResponse(result);
	    return {
	      res: result.res,
	      data: result.data.Style
	    };
	  };

	  ImageClient.prototype.deleteStyle = async function deleteStyle(styleName, options) {
	    const params = this.ossClient._objectRequestParams('DELETE', `/?style&styleName=${styleName}`, options);
	    params.successStatuses = [204];

	    const result = await this.ossClient.request(params);
	    return {
	      res: result.res
	    };
	  };

	  ImageClient.prototype.signatureUrl = function signatureUrl(name) {
	    return this.ossClient.signatureUrl(name);
	  };

	  ImageClient.prototype._parseResponse = async function _parseResponse(result) {
	    const str = result.data.toString();
	    const type = result.res.headers['content-type'];

	    if (type === 'application/json') {
	      const data = JSON.parse(str);
	      result.data = {};
	      if (data) {
	        Object.keys(data).forEach((key) => {
	          result.data[key] = parseFloat(data[key].value, 10) || data[key].value;
	        });
	      }
	    } else if (type === 'application/xml') {
	      result.data = await this.ossClient.parseXML(str);
	    }
	    return result;
	  };

	  return ImageClient;
	};

	function ready(flagOrFunction) {
	  this._ready = !!this._ready;
	  this._readyCallbacks = this._readyCallbacks || [];

	  if (arguments.length === 0) {
	    // return a promise
	    // support `this.ready().then(onready);` and `yield this.ready()`;
	    return new Promise(function (resolve) {
	      if (this._ready) {
	        return resolve();
	      }
	      this._readyCallbacks.push(resolve);
	    }.bind(this));
	  } else if (typeof flagOrFunction === 'function') {
	    this._readyCallbacks.push(flagOrFunction);
	  } else {
	    this._ready = !!flagOrFunction;
	  }

	  if (this._ready) {
	    this._readyCallbacks.splice(0, Infinity).forEach(function(callback) {
	      process.nextTick(callback);
	    });
	  }
	}

	function mixin(object) {
	  object.ready = ready;
	}

	var getReady = mixin;
	var mixin_1 = mixin;
	getReady.mixin = mixin_1;

	/**
	 * Module dependencies.
	 */


	var EventEmitter = require$$1__default['default'].EventEmitter;


	var sdkBase = Base;

	function Base() {
	  EventEmitter.call(this);
	  this.on('error', this.defaultErrorHandler.bind(this));
	}

	/**
	 * inherits from EventEmitter
	 */

	util__default['default'].inherits(Base, EventEmitter);

	getReady.mixin(Base.prototype);

	Base.prototype.defaultErrorHandler = function (err) {
	  if (this.listeners('error').length > 1) {
	    // ignore defaultErrorHandler
	    return;
	  }
	  console.error('\n[%s][pid: %s][%s][%s] %s: %s \nError Stack:\n  %s',
	    Date(), process.pid, this.constructor.name, __filename, err.name,
	    err.message, err.stack);

	  // try to show addition property on the error object
	  // e.g.: `err.data = {url: '/foo'};`
	  var additions = [];
	  for (var key in err) {
	    if (key === 'name' || key === 'message') {
	      continue;
	    }

	    additions.push(util__default['default'].format('  %s: %j', key, err[key]));
	  }
	  if (additions.length) {
	    console.error('Error Additions:\n%s', additions.join('\n'));
	  }
	  console.error();
	};

	var DEFAULT_RESOLV_FILE = '/etc/resolv.conf';

	function getInterfaceName() {
	  var val = 'eth';
	  var platform = os__default['default'].platform();
	  if (platform === 'darwin') {
	    val = 'en';
	  } else if (platform === 'win32') {
	    val = null;
	  }
	  return val;
	}

	function getIfconfigCMD() {
	  if (os__default['default'].platform() === 'win32') {
	    return 'ipconfig/all';
	  }
	  return '/sbin/ifconfig';
	}

	/**
	 * Get all addresses.
	 *
	 * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
	 * @param {Function(err, addr)} callback
	 *  - {Object} addr {
	 *    - {String} ip
	 *    - {String} ipv6
	 *    - {String} mac
	 *  }
	 */
	function address(interfaceName, callback) {
	  if (typeof interfaceName === 'function') {
	    callback = interfaceName;
	    interfaceName = null;
	  }

	  var addr = {
	    ip: address.ip(interfaceName),
	    ipv6: address.ipv6(interfaceName),
	    mac: null
	  };
	  address.mac(interfaceName, function (err, mac) {
	    if (mac) {
	      addr.mac = mac;
	    }
	    callback(err, addr);
	  });
	}

	address.interface = function (family, name) {
	  var interfaces = os__default['default'].networkInterfaces();
	  var noName = !name;
	  name = name || getInterfaceName();
	  family = family || 'IPv4';
	  for (var i = -1; i < 8; i++) {
	    var interfaceName = name + (i >= 0 ? i : ''); // support 'lo' and 'lo0'
	    var items = interfaces[interfaceName];
	    if (items) {
	      for (var j = 0; j < items.length; j++) {
	        var item = items[j];
	        if (item.family === family) {
	          return item;
	        }
	      }
	    }
	  }

	  if (noName) {
	    // filter 127.0.0.1, get the first ip
	    for (var k in interfaces) {
	      var items = interfaces[k];
	      for (var i = 0; i < items.length; i++) {
	        var item = items[i];
	        if (item.family === family && item.address !== '127.0.0.1') {
	          return item;
	        }
	      }
	    }
	  }
	  return;
	};

	/**
	 * Get current machine IPv4
	 *
	 * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
	 * @return {String} IP address
	 */
	address.ip = function (interfaceName) {
	  var item = address.interface('IPv4', interfaceName);
	  return item && item.address;
	};

	/**
	 * Get current machine IPv6
	 *
	 * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
	 * @return {String} IP address
	 */
	address.ipv6 = function (interfaceName) {
	  var item = address.interface('IPv6', interfaceName);
	  return item && item.address;
	};

	// osx start line 'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500'
	// linux start line 'eth0      Link encap:Ethernet  HWaddr 00:16:3E:00:0A:29  '
	var MAC_OSX_START_LINE = /^(\w+)\:\s+flags=/;
	var MAC_LINUX_START_LINE = /^(\w+)\s{2,}link encap:\w+/i;

	// ether 78:ca:39:b0:e6:7d
	// HWaddr 00:16:3E:00:0A:29
	var MAC_RE = address.MAC_RE = /(?:ether|HWaddr)\s+((?:[a-z0-9]{2}\:){5}[a-z0-9]{2})/i;

	// osx: inet 192.168.2.104 netmask 0xffffff00 broadcast 192.168.2.255
	// linux: inet addr:10.125.5.202  Bcast:10.125.15.255  Mask:255.255.240.0
	var MAC_IP_RE = address.MAC_IP_RE = /inet\s(?:addr\:)?(\d+\.\d+\.\d+\.\d+)/;

	function getMAC(content, interfaceName, matchIP) {
	  var lines = content.split('\n');
	  for (var i = 0; i < lines.length; i++) {
	    var line = lines[i].trimRight();
	    var m = MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line);
	    if (!m) {
	      continue;
	    }

	    // check interface name
	    var name = m[1];
	    if (name.indexOf(interfaceName) !== 0) {
	      continue;
	    }

	    var ip = null;
	    var mac = null;
	    var match = MAC_RE.exec(line);
	    if (match) {
	      mac = match[1];
	    }

	    i++;
	    while (true) {
	      line = lines[i];
	      if (!line || MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line)) {
	        i--;
	        break; // hit next interface, handle next interface
	      }
	      if (!mac) {
	        match = MAC_RE.exec(line);
	        if (match) {
	          mac = match[1];
	        }
	      }

	      if (!ip) {
	        match = MAC_IP_RE.exec(line);
	        if (match) {
	          ip = match[1];
	        }
	      }

	      i++;
	    }

	    if (ip === matchIP) {
	      return mac;
	    }
	  }
	}

	/**
	 * Get current machine MAC address
	 *
	 * @param {String} [interfaceName] interface name, default is 'eth' on linux, 'en' on mac os.
	 * @param {Function(err, address)} callback
	 */
	address.mac = function (interfaceName, callback) {
	  if (typeof interfaceName === 'function') {
	    callback = interfaceName;
	    interfaceName = null;
	  }
	  interfaceName = interfaceName || getInterfaceName();
	  var item = address.interface('IPv4', interfaceName);
	  if (!item) {
	    return callback();
	  }

	  // https://github.com/nodejs/node/issues/13581
	  // bug in node 7.x and <= 8.4.0
	  if (!process.env.CI && (item.mac === 'ff:00:00:00:00:00' || item.mac === '00:00:00:00:00:00')) {
	    // wrong address, ignore it
	    item.mac = '';
	  }

	  if (item.mac) {
	    return callback(null, item.mac);
	  }

	  child__default['default'].exec(getIfconfigCMD(), {timeout: 5000}, function (err, stdout, stderr) {
	    if (err || !stdout) {
	      return callback(err);
	    }

	    var mac = getMAC(stdout || '', interfaceName, item.address);
	    callback(null, mac);
	  });
	};

	// nameserver 172.24.102.254
	var DNS_SERVER_RE = /^nameserver\s+(\d+\.\d+\.\d+\.\d+)$/i;

	/**
	 * Get DNS servers.
	 *
	 * @param {String} [filepath] resolv config file path. default is '/etc/resolv.conf'.
	 * @param {Function(err, servers)} callback
	 */
	address.dns = function (filepath, callback) {
	  if (typeof filepath === 'function') {
	    callback = filepath;
	    filepath = null;
	  }
	  filepath = filepath || DEFAULT_RESOLV_FILE;
	  fs__default['default'].readFile(filepath, 'utf8', function (err, content) {
	    if (err) {
	      return callback(err);
	    }
	    var servers = [];
	    content = content || '';
	    var lines = content.split('\n');
	    for (var i = 0; i < lines.length; i++) {
	      var line = lines[i].trim();
	      var m = DNS_SERVER_RE.exec(line);
	      if (m) {
	        servers.push(m[1]);
	      }
	    }

	    callback(null, servers);
	  });
	};

	var address_1 = address;

	const currentIP = address_1.ip();

	const RR = 'roundRobin';
	const MS = 'masterSlave';

	var cluster = function (OssClient) {
	  function Client(options) {
	    if (!(this instanceof Client)) {
	      return new Client(options);
	    }

	    if (!options || !Array.isArray(options.cluster)) {
	      throw new Error('require options.cluster to be an array');
	    }

	    sdkBase.call(this);

	    this.clients = [];
	    this.availables = {};

	    for (let i = 0; i < options.cluster.length; i++) {
	      const opt = options.cluster[i];
	      copyTo(options).pick('timeout', 'agent', 'urllib').to(opt);
	      this.clients.push(new OssClient(opt));
	      this.availables[i] = true;
	    }

	    this.schedule = options.schedule || RR;
	    // only read from master, default is false
	    this.masterOnly = !!options.masterOnly;
	    this.index = 0;

	    const heartbeatInterval = options.heartbeatInterval || 10000;
	    this._checkAvailableLock = false;
	    this._timerId = this._deferInterval(this._checkAvailable.bind(this, true), heartbeatInterval);
	    this._ignoreStatusFile = options.ignoreStatusFile || false;
	    this._init();
	  }

	  util__default['default'].inherits(Client, sdkBase);
	  const proto = Client.prototype;
	  getReady.mixin(proto);

	  const GET_METHODS = [
	    'head',
	    'get',
	    'getStream',
	    'list',
	    'getACL'
	  ];

	  const PUT_METHODS = [
	    'put',
	    'putStream',
	    'delete',
	    'deleteMulti',
	    'copy',
	    'putMeta',
	    'putACL'
	  ];

	  GET_METHODS.forEach((method) => {
	    proto[method] = async function (...args) {
	      const client = this.chooseAvailable();
	      let lastError;
	      try {
	        return await client[method](...args);
	      } catch (err) {
	        if (err.status && err.status >= 200 && err.status < 500) {
	          // 200 ~ 499 belong to normal response, don't try again
	          throw err;
	        }
	        // < 200 || >= 500 need to retry from other cluser node
	        lastError = err;
	      }

	      for (let i = 0; i < this.clients.length; i++) {
	        const c = this.clients[i];
	        if (c !== client) {
	          try {
	            return await c[method].apply(client, args);
	          } catch (err) {
	            if (err.status && err.status >= 200 && err.status < 500) {
	              // 200 ~ 499 belong to normal response, don't try again
	              throw err;
	            }
	            // < 200 || >= 500 need to retry from other cluser node
	            lastError = err;
	          }
	        }
	      }

	      lastError.message += ' (all clients are down)';
	      throw lastError;
	    };
	  });

	  // must cluster node write success
	  PUT_METHODS.forEach((method) => {
	    proto[method] = async function (...args) {
	      const res = await Promise.all(this.clients.map(client => client[method](...args)));
	      return res[0];
	    };
	  });

	  proto.signatureUrl = function signatureUrl(/* name */...args) {
	    const client = this.chooseAvailable();
	    return client.signatureUrl(...args);
	  };

	  proto.getObjectUrl = function getObjectUrl(/* name, baseUrl */...args) {
	    const client = this.chooseAvailable();
	    return client.getObjectUrl(...args);
	  };

	  proto._init = function _init() {
	    const that = this;
	    (async () => {
	      await that._checkAvailable(that._ignoreStatusFile);
	      that.ready(true);
	    })().catch((err) => {
	      that.emit('error', err);
	    });
	  };

	  proto._checkAvailable = async function _checkAvailable(ignoreStatusFile) {
	    const name = `._ali-oss/check.status.${currentIP}.txt`;
	    if (!ignoreStatusFile) {
	      // only start will try to write the file
	      await this.put(name, Buffer.from(`check available started at ${Date()}`));
	    }

	    if (this._checkAvailableLock) {
	      return;
	    }
	    this._checkAvailableLock = true;
	    const downStatusFiles = [];
	    for (let i = 0; i < this.clients.length; i++) {
	      const client = this.clients[i];
	      // check 3 times
	      let available = await this._checkStatus(client, name);
	      if (!available) {
	        // check again
	        available = await this._checkStatus(client, name);
	      }
	      if (!available) {
	        // check again
	        /* eslint no-await-in-loop: [0] */
	        available = await this._checkStatus(client, name);
	        if (!available) {
	          downStatusFiles.push(client._objectUrl(name));
	        }
	      }
	      this.availables[i] = available;
	    }
	    this._checkAvailableLock = false;

	    if (downStatusFiles.length > 0) {
	      const err = new Error(`${downStatusFiles.length} data node down, please check status file: ${downStatusFiles.join(', ')}`);
	      err.name = 'CheckAvailableError';
	      this.emit('error', err);
	    }
	  };

	  proto._checkStatus = async function _checkStatus(client, name) {
	    let available = true;
	    try {
	      await client.head(name);
	    } catch (err) {
	      // 404 will be available too
	      if (!err.status || err.status >= 500 || err.status < 200) {
	        available = false;
	      }
	    }
	    return available;
	  };

	  proto.chooseAvailable = function chooseAvailable() {
	    if (this.schedule === MS) {
	      // only read from master
	      if (this.masterOnly) {
	        return this.clients[0];
	      }
	      for (let i = 0; i < this.clients.length; i++) {
	        if (this.availables[i]) {
	          return this.clients[i];
	        }
	      }
	      // all down, try to use this first one
	      return this.clients[0];
	    }

	    // RR
	    let n = this.clients.length;
	    while (n > 0) {
	      const i = this._nextRRIndex();
	      if (this.availables[i]) {
	        return this.clients[i];
	      }
	      n--;
	    }
	    // all down, try to use this first one
	    return this.clients[0];
	  };

	  proto._nextRRIndex = function _nextRRIndex() {
	    const index = this.index++;
	    if (this.index >= this.clients.length) {
	      this.index = 0;
	    }
	    return index;
	  };

	  proto._error = function error(err) {
	    if (err) throw err;
	  };

	  proto._createCallback = function _createCallback(ctx, gen, cb) {
	    return () => {
	      cb = cb || this._error;
	      gen.call(ctx).then(() => {
	        cb();
	      }, cb);
	    };
	  };
	  proto._deferInterval = function _deferInterval(gen, timeout, cb) {
	    return setInterval(this._createCallback(this, gen, cb), timeout);
	  };

	  proto.close = function close() {
	    clearInterval(this._timerId);
	    this._timerId = null;
	  };

	  return Client;
	};

	const debug$1 = debug$2();








	const globalHttpAgent$1 = new browser$1();


	function STS(options) {
	  if (!(this instanceof STS)) {
	    return new STS(options);
	  }

	  if (!options
	    || !options.accessKeyId
	    || !options.accessKeySecret) {
	    throw new Error('require accessKeyId, accessKeySecret');
	  }

	  this.options = {
	    endpoint: options.endpoint || 'https://sts.aliyuncs.com',
	    format: 'JSON',
	    apiVersion: '2015-04-01',
	    sigMethod: 'HMAC-SHA1',
	    sigVersion: '1.0',
	    timeout: '60s'
	  };
	  copyTo(options).to(this.options);

	  // support custom agent and urllib client
	  if (this.options.urllib) {
	    this.urllib = this.options.urllib;
	  } else {
	    this.urllib = xhr;
	    this.agent = this.options.agent || globalHttpAgent$1;
	  }
	}

	var sts = STS;

	const proto$1 = STS.prototype;

	/**
	 * STS opertaions
	 */

	proto$1.assumeRole = async function assumeRole(role, policy, expiration, session, options) {
	  const opts = this.options;
	  const params = {
	    Action: 'AssumeRole',
	    RoleArn: role,
	    RoleSessionName: session || 'app',
	    DurationSeconds: expiration || 3600,

	    Format: opts.format,
	    Version: opts.apiVersion,
	    AccessKeyId: opts.accessKeyId,
	    SignatureMethod: opts.sigMethod,
	    SignatureVersion: opts.sigVersion,
	    SignatureNonce: Math.random(),
	    Timestamp: new Date().toISOString()
	  };

	  if (policy) {
	    let policyStr;
	    if (isTypeOf.string(policy)) {
	      try {
	        policyStr = JSON.stringify(JSON.parse(policy));
	      } catch (err) {
	        throw new Error(`Policy string is not a valid JSON: ${err.message}`);
	      }
	    } else {
	      policyStr = JSON.stringify(policy);
	    }
	    params.Policy = policyStr;
	  }

	  const signature = this._getSignature('POST', params, opts.accessKeySecret);
	  params.Signature = signature;

	  const reqUrl = opts.endpoint;
	  const reqParams = {
	    agent: this.agent,
	    timeout: humanizeMs((options && options.timeout) || opts.timeout),
	    method: 'POST',
	    content: querystring__default['default'].stringify(params),
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    ctx: options && options.ctx
	  };

	  const result = await this.urllib.request(reqUrl, reqParams);
	  debug$1(
	    'response %s %s, got %s, headers: %j',
	    reqParams.method, reqUrl, result.status, result.headers
	  );

	  if (Math.floor(result.status / 100) !== 2) {
	    const err = await this._requestError(result);
	    err.params = reqParams;
	    throw err;
	  }
	  result.data = JSON.parse(result.data);

	  return {
	    res: result.res,
	    credentials: result.data.Credentials
	  };
	};

	proto$1._requestError = async function _requestError(result) {
	  const err = new Error();
	  err.status = result.status;

	  try {
	    const resp = await JSON.parse(result.data) || {};
	    err.code = resp.Code;
	    err.message = `${resp.Code}: ${resp.Message}`;
	    err.requestId = resp.RequestId;
	  } catch (e) {
	    err.message = `UnknownError: ${String(result.data)}`;
	  }

	  return err;
	};

	proto$1._getSignature = function _getSignature(method, params, key) {
	  const that = this;
	  const canoQuery = Object.keys(params).sort().map(k => `${that._escape(k)}=${that._escape(params[k])}`).join('&');

	  const stringToSign =
	      `${method.toUpperCase()
      }&${this._escape('/')
      }&${this._escape(canoQuery)}`;

	  let signature = crypto$1.createHmac('sha1', `${key}&`);
	  signature = signature.update(stringToSign).digest('base64');

	  return signature;
	};

	/**
	 * Since `encodeURIComponent` doesn't encode '*', which causes
	 * 'SignatureDoesNotMatch'. We need do it ourselves.
	 */
	proto$1._escape = function _escape(str) {
	  return encodeURIComponent(str)
	    .replace(/!/g, '%21')
	    .replace(/'/g, '%27')
	    .replace(/\(/g, '%28')
	    .replace(/\)/g, '%29')
	    .replace(/\*/g, '%2A');
	};

	const debug = debug$2();



	const HttpsAgentKeepalive = browser$1.HttpsAgent;








	const { createRequest } = createRequest_1;
	const { encoder } = encoder_1;
	const { getReqUrl } = getReqUrl_1;
	const { setSTSToken } = setSTSToken_1;
	const { retry: retry$1 } = retry_1;

	const globalHttpAgent = new browser$1();
	const globalHttpsAgent = new HttpsAgentKeepalive();

	function Client(options, ctx) {
	  if (!(this instanceof Client)) {
	    return new Client(options, ctx);
	  }

	  if (options && options.inited) {
	    this.options = options;
	  } else {
	    this.options = Client.initOptions(options);
	  }

	  // support custom agent and urllib client
	  if (this.options.urllib) {
	    this.urllib = this.options.urllib;
	  } else {
	    this.urllib = xhr;
	    this.agent = this.options.agent || globalHttpAgent;
	    this.httpsAgent = this.options.httpsAgent || globalHttpsAgent;
	  }
	  this.ctx = ctx;
	  this.userAgent = this._getUserAgent();
	}

	/**
	 * Expose `Client`
	 */

	var client = Client;

	Client.initOptions = function initOptions$1(options) {
	  return initOptions(options);
	};

	/**
	 * prototype
	 */

	const proto = Client.prototype;

	/**
	 * Object operations
	 */
	mergeDescriptors(proto, object$1);
	mergeDescriptors(proto, object);
	mergeDescriptors(proto, image$1);
	/**
	 * Bucket operations
	 */
	mergeDescriptors(proto, bucket$1);
	mergeDescriptors(proto, bucket);
	// multipart upload
	mergeDescriptors(proto, managedUpload);
	/**
	 * RTMP operations
	 */
	mergeDescriptors(proto, rtmp);

	/**
	 * common multipart-copy support node and browser
	 */
	mergeDescriptors(proto, multipartCopy);
	/**
	 * Common module parallel
	 */
	mergeDescriptors(proto, parallel);
	/**
	 * Multipart operations
	 */
	mergeDescriptors(proto, multipart);
	/**
	 * ImageClient class
	 */
	Client.ImageClient = image(Client);
	/**
	 * Cluster Client class
	 */
	Client.ClusterClient = cluster(Client);

	/**
	 * STS Client class
	 */
	Client.STS = sts;

	/**
	 * get OSS signature
	 * @param {String} stringToSign
	 * @return {String} the signature
	 */
	proto.signature = function signature(stringToSign) {

	  return signUtils.computeSignature(this.options.accessKeySecret, stringToSign, this.options.headerEncoding);
	};

	proto._getReqUrl = getReqUrl;

	/**
	 * get author header
	 *
	 * "Authorization: OSS " + Access Key Id + ":" + Signature
	 *
	 * Signature = base64(hmac-sha1(Access Key Secret + "\n"
	 *  + VERB + "\n"
	 *  + CONTENT-MD5 + "\n"
	 *  + CONTENT-TYPE + "\n"
	 *  + DATE + "\n"
	 *  + CanonicalizedOSSHeaders
	 *  + CanonicalizedResource))
	 *
	 * @param {String} method
	 * @param {String} resource
	 * @param {Object} header
	 * @return {String}
	 *
	 * @api private
	 */

	proto.authorization = function authorization(method, resource, subres, headers) {
	  const stringToSign = signUtils.buildCanonicalString(method.toUpperCase(), resource, {
	    headers,
	    parameters: subres
	  });

	  return signUtils.authorization(this.options.accessKeyId, this.options.accessKeySecret, stringToSign, this.options.headerEncoding);
	};

	/**
	 * request oss server
	 * @param {Object} params
	 *   - {String} object
	 *   - {String} bucket
	 *   - {Object} [headers]
	 *   - {Object} [query]
	 *   - {Buffer} [content]
	 *   - {Stream} [stream]
	 *   - {Stream} [writeStream]
	 *   - {String} [mime]
	 *   - {Boolean} [xmlResponse]
	 *   - {Boolean} [customResponse]
	 *   - {Number} [timeout]
	 *   - {Object} [ctx] request context, default is `this.ctx`
	 *
	 * @api private
	 */

	proto.request = async function (params) {
	  if (this.options.retryMax) {
	    return await retry$1(request$2.bind(this), this.options.retryMax, {
	      errorHandler: err => {
	        const _errHandle = _err => {
	          if (params.stream) return false;
	          const statusErr = [-1, -2].includes(_err.status);
	          const requestErrorRetryHandle = this.options.requestErrorRetryHandle || (() => true);
	          return statusErr && requestErrorRetryHandle(_err);
	        };
	        if (_errHandle(err)) return true;
	        return false;
	      }
	    })(params);
	  } else {
	    return await request$2.call(this, params);
	  }
	};

	async function request$2(params) {
	  const reqParams = createRequest.call(this, params);
	  let result;
	  let reqErr;
	  try {
	    result = await this.urllib.request(reqParams.url, reqParams.params);
	    debug('response %s %s, got %s, headers: %j', params.method, reqParams.url, result.status, result.headers);
	  } catch (err) {
	    reqErr = err;
	  }
	  let err;
	  if (result && params.successStatuses && params.successStatuses.indexOf(result.status) === -1) {
	    err = await this.requestError(result);
	    err.params = params;
	  } else if (reqErr) {
	    err = await this.requestError(reqErr);
	  }

	  if (err) {
	    if (params.customResponse && result && result.res) {
	      // consume the response stream
	      await streamWormhole(result.res);
	    }

	    if (err.status === 403 && err.code === 'InvalidAccessKeyId' &&
	      this.options.accessKeyId.startsWith('STS.') &&
	      typeof this.options.refreshSTSToken === 'function') {
	      // prevent infinite loop, only trigger once within 10 seconds
	      if (!this._setOptions || Date.now() - this._setOptions > 10000) {
	        this._setOptions = Date.now();
	        await setSTSToken.call(this);
	        if (!params.stream) {
	          return this.request(params);
	        }
	      }
	    }

	    if (err.name === 'ResponseTimeoutError') {
	      err.message = `${err.message.split(',')[0]}, please increase the timeout or use multipartDownload.`;
	    }
	    throw err;
	  }

	  if (params.xmlResponse) {
	    result.data = await this.parseXML(result.data);
	  }
	  return result;
	}
	proto._getResource = function _getResource(params) {
	  let resource = '/';
	  if (params.bucket) resource += `${params.bucket}/`;
	  if (params.object) resource += encoder(params.object, this.options.headerEncoding);

	  return resource;
	};

	proto._escape = function _escape(name) {
	  return utility.encodeURIComponent(name).replace(/%2F/g, '/');
	};

	/*
	 * Get User-Agent for browser & node.js
	 * @example
	 *   aliyun-sdk-nodejs/4.1.2 Node.js 5.3.0 on Darwin 64-bit
	 *   aliyun-sdk-js/4.1.2 Safari 9.0 on Apple iPhone(iOS 9.2.1)
	 *   aliyun-sdk-js/4.1.2 Chrome 43.0.2357.134 32-bit on Windows Server 2008 R2 / 7 64-bit
	 */

	proto._getUserAgent = function _getUserAgent() {
	  const agent = (process && process.browser) ? 'js' : 'nodejs';
	  const sdk = `aliyun-sdk-${agent}/${pkg.version}`;
	  let plat = platform.description;
	  if (!plat && process) {
	    plat = `Node.js ${process.version.slice(1)} on ${process.platform} ${process.arch}`;
	  }

	  return this._checkUserAgent(`${sdk} ${plat}`);
	};

	proto._checkUserAgent = function _checkUserAgent(ua) {
	  const userAgent = ua.replace(/\u03b1/, 'alpha').replace(/\u03b2/, 'beta');
	  return userAgent;
	};

	/*
	 * Check Browser And Version
	 * @param {String} [name] browser name: like IE, Chrome, Firefox
	 * @param {String} [version] browser major version: like 10(IE 10.x), 55(Chrome 55.x), 50(Firefox 50.x)
	 * @return {Bool} true or false
	 * @api private
	 */

	proto.checkBrowserAndVersion = function checkBrowserAndVersion(name, version) {
	  return ((bowser.name === name) && (bowser.version.split('.')[0] === version));
	};

	/**
	 * thunkify xml.parseString
	 * @param {String|Buffer} str
	 *
	 * @api private
	 */

	proto.parseXML = function parseXMLThunk(str) {
	  return new Promise((resolve, reject) => {
	    if (Buffer.isBuffer(str)) {
	      str = str.toString();
	    }
	    xml2js.parseString(str, {
	      explicitRoot: false,
	      explicitArray: false
	    }, (err, result) => {
	      if (err) {
	        reject(err);
	      } else {
	        resolve(result);
	      }
	    });
	  });
	};

	/**
	 * generater a request error with request response
	 * @param {Object} result
	 *
	 * @api private
	 */

	proto.requestError = async function requestError(result) {
	  let err = null;
	  if (result.name === 'ResponseTimeoutError') {
	    err = new Error(result.message);
	    err.name = result.name;
	  } else if (!result.data || !result.data.length) {
	    if (result.status === -1 || result.status === -2) { // -1 is net error , -2 is timeout
	      err = new Error(result.message);
	      err.name = result.name;
	      err.status = result.status;
	      err.code = result.name;
	    } else {
	      // HEAD not exists resource
	      if (result.status === 404) {
	        err = new Error('Object not exists');
	        err.name = 'NoSuchKeyError';
	        err.status = 404;
	        err.code = 'NoSuchKey';
	      } else if (result.status === 412) {
	        err = new Error('Pre condition failed');
	        err.name = 'PreconditionFailedError';
	        err.status = 412;
	        err.code = 'PreconditionFailed';
	      } else {
	        err = new Error(`Unknow error, status: ${result.status}`);
	        err.name = 'UnknowError';
	        err.status = result.status;
	      }
	      err.requestId = result.headers['x-oss-request-id'];
	      err.host = '';
	    }
	  } else {
	    const message = String(result.data);

	    let info;
	    try {
	      info = await this.parseXML(message) || {};
	    } catch (error) {
	      error.message += `\nraw xml: ${message}`;
	      error.status = result.status;
	      error.requestId = result.headers['x-oss-request-id'];
	      return error;
	    }

	    let msg = info.Message || (`unknow request error, status: ${result.status}`);
	    if (info.Condition) {
	      msg += ` (condition: ${info.Condition})`;
	    }
	    err = new Error(msg);
	    err.name = info.Code ? `${info.Code}Error` : 'UnknowError';
	    err.status = result.status;
	    err.code = info.Code;
	    err.requestId = info.RequestId;
	    err.hostId = info.HostId;
	  }
	  return err;
	};

	proto.setSLDEnabled = function setSLDEnabled(enable) {
	  this.options.sldEnable = !!enable;
	  return this;
	};

	var md5 = createCommonjsModule(function (module) {
	/* https://github.com/emn178/js-md5 */
	(function () {

	    var ERROR = 'input is invalid type';
	    var WINDOW = typeof window === 'object';
	    var root = WINDOW ? window : {};
	    if (root.JS_MD5_NO_WINDOW) {
	        WINDOW = false;
	    }
	    var WEB_WORKER = !WINDOW && typeof self === 'object';
	    var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
	    if (NODE_JS) {
	        root = commonjsGlobal;
	    } else if (WEB_WORKER) {
	        root = self;
	    }
	    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && 'object' === 'object' && module.exports;
	    var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
	    var HEX_CHARS = '0123456789abcdef'.split('');
	    var EXTRA = [128, 32768, 8388608, -2147483648];
	    var SHIFT = [0, 8, 16, 24];
	    var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
	    var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	    var blocks = [], buffer8;
	    if (ARRAY_BUFFER) {
	        var buffer = new ArrayBuffer(68);
	        buffer8 = new Uint8Array(buffer);
	        blocks = new Uint32Array(buffer);
	    }

	    if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
	        Array.isArray = function (obj) {
	            return Object.prototype.toString.call(obj) === '[object Array]';
	        };
	    }

	    if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
	        ArrayBuffer.isView = function (obj) {
	            return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
	        };
	    }

	    /**
	     * @method hex
	     * @memberof md5
	     * @description Output hash as hex string
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {String} Hex string
	     * @example
	     * md5.hex('The quick brown fox jumps over the lazy dog');
	     * // equal to
	     * md5('The quick brown fox jumps over the lazy dog');
	     */
	    /**
	     * @method digest
	     * @memberof md5
	     * @description Output hash as bytes array
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {Array} Bytes array
	     * @example
	     * md5.digest('The quick brown fox jumps over the lazy dog');
	     */
	    /**
	     * @method array
	     * @memberof md5
	     * @description Output hash as bytes array
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {Array} Bytes array
	     * @example
	     * md5.array('The quick brown fox jumps over the lazy dog');
	     */
	    /**
	     * @method arrayBuffer
	     * @memberof md5
	     * @description Output hash as ArrayBuffer
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {ArrayBuffer} ArrayBuffer
	     * @example
	     * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
	     */
	    /**
	     * @method buffer
	     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
	     * @memberof md5
	     * @description Output hash as ArrayBuffer
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {ArrayBuffer} ArrayBuffer
	     * @example
	     * md5.buffer('The quick brown fox jumps over the lazy dog');
	     */
	    /**
	     * @method base64
	     * @memberof md5
	     * @description Output hash as base64 string
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {String} base64 string
	     * @example
	     * md5.base64('The quick brown fox jumps over the lazy dog');
	     */
	    var createOutputMethod = function (outputType) {
	        return function (message, isBinStr) {
	            return new Md5(true).update(message, isBinStr)[outputType]();
	        };
	    };

	    /**
	     * @method create
	     * @memberof md5
	     * @description Create Md5 object
	     * @returns {Md5} Md5 object.
	     * @example
	     * var hash = md5.create();
	     */
	    /**
	     * @method update
	     * @memberof md5
	     * @description Create and update Md5 object
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {Md5} Md5 object.
	     * @example
	     * var hash = md5.update('The quick brown fox jumps over the lazy dog');
	     * // equal to
	     * var hash = md5.create();
	     * hash.update('The quick brown fox jumps over the lazy dog');
	     */
	    var createMethod = function () {
	        var method = createOutputMethod('hex');
	        if (NODE_JS) {
	            method = nodeWrap(method);
	        }
	        method.getCtx = method.create = function () {
	            return new Md5();
	        };
	        method.update = function (message) {
	            return method.create().update(message);
	        };
	        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
	            var type = OUTPUT_TYPES[i];
	            method[type] = createOutputMethod(type);
	        }
	        return method;
	    };

	    var nodeWrap = function (method) {
	        var crypto = eval("require('crypto')");
	        var Buffer = eval("require('buffer').Buffer");
	        var nodeMethod = function (message) {
	            if (typeof message === 'string') {
	                return crypto.createHash('md5').update(message, 'utf8').digest('hex');
	            } else {
	                if (message === null || message === undefined) {
	                    throw ERROR;
	                } else if (message.constructor === ArrayBuffer) {
	                    message = new Uint8Array(message);
	                }
	            }
	            if (Array.isArray(message) || ArrayBuffer.isView(message) ||
	                message.constructor === Buffer) {
	                return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
	            } else {
	                return method(message);
	            }
	        };
	        return nodeMethod;
	    };

	    /**
	     * Md5 class
	     * @class Md5
	     * @description This is internal class.
	     * @see {@link md5.create}
	     */
	    function Md5(sharedMemory) {
	        if (sharedMemory) {
	            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
	                blocks[4] = blocks[5] = blocks[6] = blocks[7] =
	                    blocks[8] = blocks[9] = blocks[10] = blocks[11] =
	                        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	            this.blocks = blocks;
	            this.buffer8 = buffer8;
	        } else {
	            if (ARRAY_BUFFER) {
	                var buffer = new ArrayBuffer(68);
	                this.buffer8 = new Uint8Array(buffer);
	                this.blocks = new Uint32Array(buffer);
	            } else {
	                this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	            }
	        }
	        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
	        this.finalized = this.hashed = false;
	        this.first = true;
	    }

	    /**
	     * @method update
	     * @memberof Md5
	     * @instance
	     * @description Update hash
	     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	     * @returns {Md5} Md5 object.
	     * @see {@link md5.update}
	     */
	    Md5.prototype.update = function (message, isBinStr) {
	        if (this.finalized) {
	            return;
	        }

	        var code, index = 0, i, length = message.length, blocks = this.blocks;
	        var buffer8 = this.buffer8;

	        while (index < length) {
	            if (this.hashed) {
	                this.hashed = false;
	                blocks[0] = blocks[16];
	                blocks[16] = blocks[1] = blocks[2] = blocks[3] =
	                    blocks[4] = blocks[5] = blocks[6] = blocks[7] =
	                        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
	                            blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	            }

	            if (ARRAY_BUFFER) {
	                for (i = this.start; index < length && i < 64; ++index) {
	                    code = message.charCodeAt(index);
	                    if (isBinStr || code < 0x80) {
	                        buffer8[i++] = code;
	                    } else if (code < 0x800) {
	                        buffer8[i++] = 0xc0 | (code >> 6);
	                        buffer8[i++] = 0x80 | (code & 0x3f);
	                    } else if (code < 0xd800 || code >= 0xe000) {
	                        buffer8[i++] = 0xe0 | (code >> 12);
	                        buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
	                        buffer8[i++] = 0x80 | (code & 0x3f);
	                    } else {
	                        code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
	                        buffer8[i++] = 0xf0 | (code >> 18);
	                        buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
	                        buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
	                        buffer8[i++] = 0x80 | (code & 0x3f);
	                    }
	                }
	            } else {
	                for (i = this.start; index < length && i < 64; ++index) {
	                    code = message.charCodeAt(index);
	                    if (isBinStr || code < 0x80) {
	                        blocks[i >> 2] |= code << SHIFT[i++ & 3];
	                    } else if (code < 0x800) {
	                        blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
	                        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	                    } else if (code < 0xd800 || code >= 0xe000) {
	                        blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
	                        blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
	                        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	                    } else {
	                        code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
	                        blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
	                        blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
	                        blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
	                        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	                    }
	                }
	            }
	            this.lastByteIndex = i;
	            this.bytes += i - this.start;
	            if (i >= 64) {
	                this.start = i - 64;
	                this.hash();
	                this.hashed = true;
	            } else {
	                this.start = i;
	            }
	        }
	        if (this.bytes > 4294967295) {
	            this.hBytes += this.bytes / 4294967296 << 0;
	            this.bytes = this.bytes % 4294967296;
	        }
	        return this;
	    };

	    Md5.prototype.finalize = function () {
	        if (this.finalized) {
	            return;
	        }
	        this.finalized = true;
	        var blocks = this.blocks, i = this.lastByteIndex;
	        blocks[i >> 2] |= EXTRA[i & 3];
	        if (i >= 56) {
	            if (!this.hashed) {
	                this.hash();
	            }
	            blocks[0] = blocks[16];
	            blocks[16] = blocks[1] = blocks[2] = blocks[3] =
	                blocks[4] = blocks[5] = blocks[6] = blocks[7] =
	                    blocks[8] = blocks[9] = blocks[10] = blocks[11] =
	                        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	        }
	        blocks[14] = this.bytes << 3;
	        blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
	        this.hash();
	    };

	    Md5.prototype.hash = function () {
	        var a, b, c, d, bc, da, blocks = this.blocks;

	        if (this.first) {
	            a = blocks[0] - 680876937;
	            a = (a << 7 | a >>> 25) - 271733879 << 0;
	            d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
	            d = (d << 12 | d >>> 20) + a << 0;
	            c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
	            c = (c << 17 | c >>> 15) + d << 0;
	            b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
	            b = (b << 22 | b >>> 10) + c << 0;
	        } else {
	            a = this.h0;
	            b = this.h1;
	            c = this.h2;
	            d = this.h3;
	            a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
	            a = (a << 7 | a >>> 25) + b << 0;
	            d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
	            d = (d << 12 | d >>> 20) + a << 0;
	            c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
	            c = (c << 17 | c >>> 15) + d << 0;
	            b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
	            b = (b << 22 | b >>> 10) + c << 0;
	        }

	        a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
	        a = (a << 7 | a >>> 25) + b << 0;
	        d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
	        d = (d << 12 | d >>> 20) + a << 0;
	        c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
	        c = (c << 17 | c >>> 15) + d << 0;
	        b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
	        b = (b << 22 | b >>> 10) + c << 0;
	        a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
	        a = (a << 7 | a >>> 25) + b << 0;
	        d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
	        d = (d << 12 | d >>> 20) + a << 0;
	        c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
	        c = (c << 17 | c >>> 15) + d << 0;
	        b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
	        b = (b << 22 | b >>> 10) + c << 0;
	        a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
	        a = (a << 7 | a >>> 25) + b << 0;
	        d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
	        d = (d << 12 | d >>> 20) + a << 0;
	        c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
	        c = (c << 17 | c >>> 15) + d << 0;
	        b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
	        b = (b << 22 | b >>> 10) + c << 0;
	        a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
	        a = (a << 5 | a >>> 27) + b << 0;
	        d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
	        d = (d << 9 | d >>> 23) + a << 0;
	        c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
	        c = (c << 14 | c >>> 18) + d << 0;
	        b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
	        b = (b << 20 | b >>> 12) + c << 0;
	        a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
	        a = (a << 5 | a >>> 27) + b << 0;
	        d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
	        d = (d << 9 | d >>> 23) + a << 0;
	        c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
	        c = (c << 14 | c >>> 18) + d << 0;
	        b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
	        b = (b << 20 | b >>> 12) + c << 0;
	        a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
	        a = (a << 5 | a >>> 27) + b << 0;
	        d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
	        d = (d << 9 | d >>> 23) + a << 0;
	        c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
	        c = (c << 14 | c >>> 18) + d << 0;
	        b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
	        b = (b << 20 | b >>> 12) + c << 0;
	        a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
	        a = (a << 5 | a >>> 27) + b << 0;
	        d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
	        d = (d << 9 | d >>> 23) + a << 0;
	        c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
	        c = (c << 14 | c >>> 18) + d << 0;
	        b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
	        b = (b << 20 | b >>> 12) + c << 0;
	        bc = b ^ c;
	        a += (bc ^ d) + blocks[5] - 378558;
	        a = (a << 4 | a >>> 28) + b << 0;
	        d += (bc ^ a) + blocks[8] - 2022574463;
	        d = (d << 11 | d >>> 21) + a << 0;
	        da = d ^ a;
	        c += (da ^ b) + blocks[11] + 1839030562;
	        c = (c << 16 | c >>> 16) + d << 0;
	        b += (da ^ c) + blocks[14] - 35309556;
	        b = (b << 23 | b >>> 9) + c << 0;
	        bc = b ^ c;
	        a += (bc ^ d) + blocks[1] - 1530992060;
	        a = (a << 4 | a >>> 28) + b << 0;
	        d += (bc ^ a) + blocks[4] + 1272893353;
	        d = (d << 11 | d >>> 21) + a << 0;
	        da = d ^ a;
	        c += (da ^ b) + blocks[7] - 155497632;
	        c = (c << 16 | c >>> 16) + d << 0;
	        b += (da ^ c) + blocks[10] - 1094730640;
	        b = (b << 23 | b >>> 9) + c << 0;
	        bc = b ^ c;
	        a += (bc ^ d) + blocks[13] + 681279174;
	        a = (a << 4 | a >>> 28) + b << 0;
	        d += (bc ^ a) + blocks[0] - 358537222;
	        d = (d << 11 | d >>> 21) + a << 0;
	        da = d ^ a;
	        c += (da ^ b) + blocks[3] - 722521979;
	        c = (c << 16 | c >>> 16) + d << 0;
	        b += (da ^ c) + blocks[6] + 76029189;
	        b = (b << 23 | b >>> 9) + c << 0;
	        bc = b ^ c;
	        a += (bc ^ d) + blocks[9] - 640364487;
	        a = (a << 4 | a >>> 28) + b << 0;
	        d += (bc ^ a) + blocks[12] - 421815835;
	        d = (d << 11 | d >>> 21) + a << 0;
	        da = d ^ a;
	        c += (da ^ b) + blocks[15] + 530742520;
	        c = (c << 16 | c >>> 16) + d << 0;
	        b += (da ^ c) + blocks[2] - 995338651;
	        b = (b << 23 | b >>> 9) + c << 0;
	        a += (c ^ (b | ~d)) + blocks[0] - 198630844;
	        a = (a << 6 | a >>> 26) + b << 0;
	        d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
	        d = (d << 10 | d >>> 22) + a << 0;
	        c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
	        c = (c << 15 | c >>> 17) + d << 0;
	        b += (d ^ (c | ~a)) + blocks[5] - 57434055;
	        b = (b << 21 | b >>> 11) + c << 0;
	        a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
	        a = (a << 6 | a >>> 26) + b << 0;
	        d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
	        d = (d << 10 | d >>> 22) + a << 0;
	        c += (a ^ (d | ~b)) + blocks[10] - 1051523;
	        c = (c << 15 | c >>> 17) + d << 0;
	        b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
	        b = (b << 21 | b >>> 11) + c << 0;
	        a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
	        a = (a << 6 | a >>> 26) + b << 0;
	        d += (b ^ (a | ~c)) + blocks[15] - 30611744;
	        d = (d << 10 | d >>> 22) + a << 0;
	        c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
	        c = (c << 15 | c >>> 17) + d << 0;
	        b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
	        b = (b << 21 | b >>> 11) + c << 0;
	        a += (c ^ (b | ~d)) + blocks[4] - 145523070;
	        a = (a << 6 | a >>> 26) + b << 0;
	        d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
	        d = (d << 10 | d >>> 22) + a << 0;
	        c += (a ^ (d | ~b)) + blocks[2] + 718787259;
	        c = (c << 15 | c >>> 17) + d << 0;
	        b += (d ^ (c | ~a)) + blocks[9] - 343485551;
	        b = (b << 21 | b >>> 11) + c << 0;

	        if (this.first) {
	            this.h0 = a + 1732584193 << 0;
	            this.h1 = b - 271733879 << 0;
	            this.h2 = c - 1732584194 << 0;
	            this.h3 = d + 271733878 << 0;
	            this.first = false;
	        } else {
	            this.h0 = this.h0 + a << 0;
	            this.h1 = this.h1 + b << 0;
	            this.h2 = this.h2 + c << 0;
	            this.h3 = this.h3 + d << 0;
	        }
	    };

	    /**
	     * @method hex
	     * @memberof Md5
	     * @instance
	     * @description Output hash as hex string
	     * @returns {String} Hex string
	     * @see {@link md5.hex}
	     * @example
	     * hash.hex();
	     */
	    Md5.prototype.hex = function () {
	        this.finalize();

	        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

	        return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
	            HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
	            HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
	            HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
	            HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
	            HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
	            HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
	            HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
	            HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
	            HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
	            HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
	            HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
	            HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
	            HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
	            HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
	            HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
	    };

	    /**
	     * @method toString
	     * @memberof Md5
	     * @instance
	     * @description Output hash as hex string
	     * @returns {String} Hex string
	     * @see {@link md5.hex}
	     * @example
	     * hash.toString();
	     */
	    Md5.prototype.toString = Md5.prototype.hex;

	    /**
	     * @method digest
	     * @memberof Md5
	     * @instance
	     * @description Output hash as bytes array
	     * @returns {Array} Bytes array
	     * @see {@link md5.digest}
	     * @example
	     * hash.digest();
	     */
	    Md5.prototype.digest = function (format) {
	        if (format === 'hex') return this.hex();
	        this.finalize();

	        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
	        var res = [
	            h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
	            h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
	            h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
	            h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
	        ];
	        return res;
	    };

	    /**
	     * @method array
	     * @memberof Md5
	     * @instance
	     * @description Output hash as bytes array
	     * @returns {Array} Bytes array
	     * @see {@link md5.array}
	     * @example
	     * hash.array();
	     */
	    Md5.prototype.array = Md5.prototype.digest;

	    /**
	     * @method arrayBuffer
	     * @memberof Md5
	     * @instance
	     * @description Output hash as ArrayBuffer
	     * @returns {ArrayBuffer} ArrayBuffer
	     * @see {@link md5.arrayBuffer}
	     * @example
	     * hash.arrayBuffer();
	     */
	    Md5.prototype.arrayBuffer = function () {
	        this.finalize();

	        var buffer = new ArrayBuffer(16);
	        var blocks = new Uint32Array(buffer);
	        blocks[0] = this.h0;
	        blocks[1] = this.h1;
	        blocks[2] = this.h2;
	        blocks[3] = this.h3;
	        return buffer;
	    };

	    /**
	     * @method buffer
	     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
	     * @memberof Md5
	     * @instance
	     * @description Output hash as ArrayBuffer
	     * @returns {ArrayBuffer} ArrayBuffer
	     * @see {@link md5.buffer}
	     * @example
	     * hash.buffer();
	     */
	    Md5.prototype.buffer = Md5.prototype.arrayBuffer;

	    /**
	     * @method base64
	     * @memberof Md5
	     * @instance
	     * @description Output hash as base64 string
	     * @returns {String} base64 string
	     * @see {@link md5.base64}
	     * @example
	     * hash.base64();
	     */
	    Md5.prototype.base64 = function () {
	        var v1, v2, v3, base64Str = '', bytes = this.array();
	        for (var i = 0; i < 15;) {
	            v1 = bytes[i++];
	            v2 = bytes[i++];
	            v3 = bytes[i++];
	            base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
	                BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
	                BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
	                BASE64_ENCODE_CHAR[v3 & 63];
	        }
	        v1 = bytes[i];
	        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
	            BASE64_ENCODE_CHAR[(v1 << 4) & 63] +
	            '==';
	        return base64Str;
	    };

	    var exports = createMethod();

	    if (COMMON_JS) {
	        module.exports = exports;
	    } else {
	        /**
	         * @method md5
	         * @description Md5 hash function, export to global in browsers.
	         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
	         * @returns {String} md5 hashes
	         * @example
	         * md5(''); // d41d8cd98f00b204e9800998ecf8427e
	         * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
	         * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
	         *
	         * // It also supports UTF-8 encoding
	         * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
	         *
	         * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
	         * md5([]); // d41d8cd98f00b204e9800998ecf8427e
	         * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
	         */
	        root.md5 = exports;
	    }
	})();
	});

	var crypto = createCommonjsModule(function (module) {
	/*
	 CryptoJS v3.1.2
	 code.google.com/p/crypto-js
	 (c) 2009-2013 by Jeff Mott. All rights reserved.
	 code.google.com/p/crypto-js/wiki/License
	 */
	var CryptoJS=CryptoJS||function(g,l){var e={},d=e.lib={},m=function(){},k=d.Base={extend:function(a){m.prototype=this;var c=new m;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments);});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString);},clone:function(){return this.init.prototype.extend(this)}},
	        p=d.WordArray=k.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=l?c:4*a.length;},toString:function(a){return (a||n).stringify(this)},concat:function(a){var c=this.words,q=a.words,f=this.sigBytes;a=a.sigBytes;this.clamp();if(f%4)for(var b=0;b<a;b++)c[f+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((f+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[f+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
	            32-8*(c%4);a.length=g.ceil(c/4);},clone:function(){var a=k.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*g.random()|0);return new p.init(c,a)}}),b=e.enc={},n=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++){var d=c[f>>>2]>>>24-8*(f%4)&255;b.push((d>>>4).toString(16));b.push((d&15).toString(16));}return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f+=2)b[f>>>3]|=parseInt(a.substr(f,
	                2),16)<<24-4*(f%8);return new p.init(b,c/2)}},j=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++)b.push(String.fromCharCode(c[f>>>2]>>>24-8*(f%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f++)b[f>>>2]|=(a.charCodeAt(f)&255)<<24-8*(f%4);return new p.init(b,c)}},h=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},
	        r=d.BufferedBlockAlgorithm=k.extend({reset:function(){this._data=new p.init;this._nDataBytes=0;},_append:function(a){"string"==typeof a&&(a=h.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes;},_process:function(a){var c=this._data,b=c.words,f=c.sigBytes,d=this.blockSize,e=f/(4*d),e=a?g.ceil(e):g.max((e|0)-this._minBufferSize,0);a=e*d;f=g.min(4*a,f);if(a){for(var k=0;k<a;k+=d)this._doProcessBlock(b,k);k=b.splice(0,a);c.sigBytes-=f;}return new p.init(k,f)},clone:function(){var a=k.clone.call(this);
	            a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=r.extend({cfg:k.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset();},reset:function(){r.reset.call(this);this._doReset();},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return (new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return (new s.HMAC.init(a,
	        d)).finalize(b)}}});var s=e.algo={};return e}(Math);
	(function(){var g=CryptoJS,l=g.lib,e=l.WordArray,d=l.Hasher,m=[],l=g.algo.SHA1=d.extend({_doReset:function(){this._hash=new e.init([1732584193,4023233417,2562383102,271733878,3285377520]);},_doProcessBlock:function(d,e){for(var b=this._hash.words,n=b[0],j=b[1],h=b[2],g=b[3],l=b[4],a=0;80>a;a++){if(16>a)m[a]=d[e+a]|0;else {var c=m[a-3]^m[a-8]^m[a-14]^m[a-16];m[a]=c<<1|c>>>31;}c=(n<<5|n>>>27)+l+m[a];c=20>a?c+((j&h|~j&g)+1518500249):40>a?c+((j^h^g)+1859775393):60>a?c+((j&h|j&g|h&g)-1894007588):c+((j^h^
	g)-899497514);l=g;g=h;h=j<<30|j>>>2;j=n;n=c;}b[0]=b[0]+n|0;b[1]=b[1]+j|0;b[2]=b[2]+h|0;b[3]=b[3]+g|0;b[4]=b[4]+l|0;},_doFinalize:function(){var d=this._data,e=d.words,b=8*this._nDataBytes,g=8*d.sigBytes;e[g>>>5]|=128<<24-g%32;e[(g+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(g+64>>>9<<4)+15]=b;d.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=d.clone.call(this);e._hash=this._hash.clone();return e}});g.SHA1=d._createHelper(l);g.HmacSHA1=d._createHmacHelper(l);})();
	(function(){var g=CryptoJS,l=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(e,d){e=this._hasher=new e.init;"string"==typeof d&&(d=l.parse(d));var g=e.blockSize,k=4*g;d.sigBytes>k&&(d=e.finalize(d));d.clamp();for(var p=this._oKey=d.clone(),b=this._iKey=d.clone(),n=p.words,j=b.words,h=0;h<g;h++)n[h]^=1549556828,j[h]^=909522486;p.sigBytes=b.sigBytes=k;this.reset();},reset:function(){var e=this._hasher;e.reset();e.update(this._iKey);},update:function(e){this._hasher.update(e);return this},finalize:function(e){var d=
	    this._hasher;e=d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e))}});})();


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex != -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            var words = [];
	            var nBytes = 0;
	            for (var i = 0; i < base64StrLength; i++) {
	                if (i % 4) {
	                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
	                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
	                    words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	                    nBytes++;
	                }
	            }

	            return WordArray.create(words, nBytes);
	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };
	}());

	{
	    module.exports = CryptoJS;
	}
	});

	//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
	//[5]   	Name	   ::=   	NameStartChar (NameChar)*
	var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;//\u10000-\uEFFFF
	var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
	var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
	//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
	//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
	var S_TAG = 0;//tag name offerring
	var S_ATTR = 1;//attr name offerring 
	var S_ATTR_SPACE=2;//attr name end and space offer
	var S_EQ = 3;//=space?
	var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
	var S_ATTR_END = 5;//attr value end and no space(quot end)
	var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
	var S_TAG_CLOSE = 7;//closed el<el />

	function XMLReader(){
		
	}

	XMLReader.prototype = {
		parse:function(source,defaultNSMap,entityMap){
			var domBuilder = this.domBuilder;
			domBuilder.startDocument();
			_copy(defaultNSMap ,defaultNSMap = {});
			parse(source,defaultNSMap,entityMap,
					domBuilder,this.errorHandler);
			domBuilder.endDocument();
		}
	};
	function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
		function fixedFromCharCode(code) {
			// String.prototype.fromCharCode does not supports
			// > 2 bytes unicode chars directly
			if (code > 0xffff) {
				code -= 0x10000;
				var surrogate1 = 0xd800 + (code >> 10)
					, surrogate2 = 0xdc00 + (code & 0x3ff);

				return String.fromCharCode(surrogate1, surrogate2);
			} else {
				return String.fromCharCode(code);
			}
		}
		function entityReplacer(a){
			var k = a.slice(1,-1);
			if(k in entityMap){
				return entityMap[k]; 
			}else if(k.charAt(0) === '#'){
				return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
			}else {
				errorHandler.error('entity not found:'+a);
				return a;
			}
		}
		function appendText(end){//has some bugs
			if(end>start){
				var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
				locator&&position(start);
				domBuilder.characters(xt,0,end-start);
				start = end;
			}
		}
		function position(p,m){
			while(p>=lineEnd && (m = linePattern.exec(source))){
				lineStart = m.index;
				lineEnd = lineStart + m[0].length;
				locator.lineNumber++;
				//console.log('line++:',locator,startPos,endPos)
			}
			locator.columnNumber = p-lineStart+1;
		}
		var lineStart = 0;
		var lineEnd = 0;
		var linePattern = /.*(?:\r\n?|\n)|.*$/g;
		var locator = domBuilder.locator;
		
		var parseStack = [{currentNSMap:defaultNSMapCopy}];
		var closeMap = {};
		var start = 0;
		while(true){
			try{
				var tagStart = source.indexOf('<',start);
				if(tagStart<0){
					if(!source.substr(start).match(/^\s*$/)){
						var doc = domBuilder.doc;
		    			var text = doc.createTextNode(source.substr(start));
		    			doc.appendChild(text);
		    			domBuilder.currentElement = text;
					}
					return;
				}
				if(tagStart>start){
					appendText(tagStart);
				}
				switch(source.charAt(tagStart+1)){
				case '/':
					var end = source.indexOf('>',tagStart+3);
					var tagName = source.substring(tagStart+2,end);
					var config = parseStack.pop();
					if(end<0){
						
		        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
		        		//console.error('#@@@@@@'+tagName)
		        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
		        		end = tagStart+1+tagName.length;
		        	}else if(tagName.match(/\s</)){
		        		tagName = tagName.replace(/[\s<].*/,'');
		        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
		        		end = tagStart+1+tagName.length;
					}
					//console.error(parseStack.length,parseStack)
					//console.error(config);
					var localNSMap = config.localNSMap;
					var endMatch = config.tagName == tagName;
					var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase();
			        if(endIgnoreCaseMach){
			        	domBuilder.endElement(config.uri,config.localName,tagName);
						if(localNSMap){
							for(var prefix in localNSMap){
								domBuilder.endPrefixMapping(prefix) ;
							}
						}
						if(!endMatch){
			            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
						}
			        }else {
			        	parseStack.push(config);
			        }
					
					end++;
					break;
					// end elment
				case '?':// <?...?>
					locator&&position(tagStart);
					end = parseInstruction(source,tagStart,domBuilder);
					break;
				case '!':// <!doctype,<![CDATA,<!--
					locator&&position(tagStart);
					end = parseDCC(source,tagStart,domBuilder,errorHandler);
					break;
				default:
					locator&&position(tagStart);
					var el = new ElementAttributes();
					var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
					//elStartEnd
					var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
					var len = el.length;
					
					
					if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
						el.closed = true;
						if(!entityMap.nbsp){
							errorHandler.warning('unclosed xml attribute');
						}
					}
					if(locator && len){
						var locator2 = copyLocator(locator,{});
						//try{//attribute position fixed
						for(var i = 0;i<len;i++){
							var a = el[i];
							position(a.offset);
							a.locator = copyLocator(locator,{});
						}
						//}catch(e){console.error('@@@@@'+e)}
						domBuilder.locator = locator2;
						if(appendElement(el,domBuilder,currentNSMap)){
							parseStack.push(el);
						}
						domBuilder.locator = locator;
					}else {
						if(appendElement(el,domBuilder,currentNSMap)){
							parseStack.push(el);
						}
					}
					
					
					
					if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
						end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder);
					}else {
						end++;
					}
				}
			}catch(e){
				errorHandler.error('element parse error: '+e);
				//errorHandler.error('element parse error: '+e);
				end = -1;
				//throw e;
			}
			if(end>start){
				start = end;
			}else {
				//TODO: 这里有可能sax回退，有位置错误风险
				appendText(Math.max(tagStart,start)+1);
			}
		}
	}
	function copyLocator(f,t){
		t.lineNumber = f.lineNumber;
		t.columnNumber = f.columnNumber;
		return t;
	}

	/**
	 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
	 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
	 */
	function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
		var attrName;
		var value;
		var p = ++start;
		var s = S_TAG;//status
		while(true){
			var c = source.charAt(p);
			switch(c){
			case '=':
				if(s === S_ATTR){//attrName
					attrName = source.slice(start,p);
					s = S_EQ;
				}else if(s === S_ATTR_SPACE){
					s = S_EQ;
				}else {
					//fatalError: equal must after attrName or space after attrName
					throw new Error('attribute equal must after attrName');
				}
				break;
			case '\'':
			case '"':
				if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
					){//equal
					if(s === S_ATTR){
						errorHandler.warning('attribute value must after "="');
						attrName = source.slice(start,p);
					}
					start = p+1;
					p = source.indexOf(c,start);
					if(p>0){
						value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
						el.add(attrName,value,start-1);
						s = S_ATTR_END;
					}else {
						//fatalError: no end quot match
						throw new Error('attribute value no end \''+c+'\' match');
					}
				}else if(s == S_ATTR_NOQUOT_VALUE){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					//console.log(attrName,value,start,p)
					el.add(attrName,value,start);
					//console.dir(el)
					errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
					start = p+1;
					s = S_ATTR_END;
				}else {
					//fatalError: no equal before
					throw new Error('attribute value must after "="');
				}
				break;
			case '/':
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));
				case S_ATTR_END:
				case S_TAG_SPACE:
				case S_TAG_CLOSE:
					s =S_TAG_CLOSE;
					el.closed = true;
				case S_ATTR_NOQUOT_VALUE:
				case S_ATTR:
				case S_ATTR_SPACE:
					break;
				//case S_EQ:
				default:
					throw new Error("attribute invalid close char('/')")
				}
				break;
			case ''://end document
				//throw new Error('unexpected end of input')
				errorHandler.error('unexpected end of input');
				if(s == S_TAG){
					el.setTagName(source.slice(start,p));
				}
				return p;
			case '>':
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));
				case S_ATTR_END:
				case S_TAG_SPACE:
				case S_TAG_CLOSE:
					break;//normal
				case S_ATTR_NOQUOT_VALUE://Compatible state
				case S_ATTR:
					value = source.slice(start,p);
					if(value.slice(-1) === '/'){
						el.closed  = true;
						value = value.slice(0,-1);
					}
				case S_ATTR_SPACE:
					if(s === S_ATTR_SPACE){
						value = attrName;
					}
					if(s == S_ATTR_NOQUOT_VALUE){
						errorHandler.warning('attribute "'+value+'" missed quot(")!!');
						el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start);
					}else {
						if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
							errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!');
						}
						el.add(value,value,start);
					}
					break;
				case S_EQ:
					throw new Error('attribute value missed!!');
				}
	//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
				return p;
			/*xml space '\x20' | #x9 | #xD | #xA; */
			case '\u0080':
				c = ' ';
			default:
				if(c<= ' '){//space
					switch(s){
					case S_TAG:
						el.setTagName(source.slice(start,p));//tagName
						s = S_TAG_SPACE;
						break;
					case S_ATTR:
						attrName = source.slice(start,p);
						s = S_ATTR_SPACE;
						break;
					case S_ATTR_NOQUOT_VALUE:
						var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
						errorHandler.warning('attribute "'+value+'" missed quot(")!!');
						el.add(attrName,value,start);
					case S_ATTR_END:
						s = S_TAG_SPACE;
						break;
					//case S_TAG_SPACE:
					//case S_EQ:
					//case S_ATTR_SPACE:
					//	void();break;
					//case S_TAG_CLOSE:
						//ignore warning
					}
				}else {//not space
	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
					switch(s){
					//case S_TAG:void();break;
					//case S_ATTR:void();break;
					//case S_ATTR_NOQUOT_VALUE:void();break;
					case S_ATTR_SPACE:
						el.tagName;
						if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
							errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!');
						}
						el.add(attrName,attrName,start);
						start = p;
						s = S_ATTR;
						break;
					case S_ATTR_END:
						errorHandler.warning('attribute space is required"'+attrName+'"!!');
					case S_TAG_SPACE:
						s = S_ATTR;
						start = p;
						break;
					case S_EQ:
						s = S_ATTR_NOQUOT_VALUE;
						start = p;
						break;
					case S_TAG_CLOSE:
						throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
			}//end outer switch
			//console.log('p++',p)
			p++;
		}
	}
	/**
	 * @return true if has new namespace define
	 */
	function appendElement(el,domBuilder,currentNSMap){
		var tagName = el.tagName;
		var localNSMap = null;
		//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
		var i = el.length;
		while(i--){
			var a = el[i];
			var qName = a.qName;
			var value = a.value;
			var nsp = qName.indexOf(':');
			if(nsp>0){
				var prefix = a.prefix = qName.slice(0,nsp);
				var localName = qName.slice(nsp+1);
				var nsPrefix = prefix === 'xmlns' && localName;
			}else {
				localName = qName;
				prefix = null;
				nsPrefix = qName === 'xmlns' && '';
			}
			//can not set prefix,because prefix !== ''
			a.localName = localName ;
			//prefix == null for no ns prefix attribute 
			if(nsPrefix !== false){//hack!!
				if(localNSMap == null){
					localNSMap = {};
					//console.log(currentNSMap,0)
					_copy(currentNSMap,currentNSMap={});
					//console.log(currentNSMap,1)
				}
				currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
				a.uri = 'http://www.w3.org/2000/xmlns/';
				domBuilder.startPrefixMapping(nsPrefix, value); 
			}
		}
		var i = el.length;
		while(i--){
			a = el[i];
			var prefix = a.prefix;
			if(prefix){//no prefix attribute has no namespace
				if(prefix === 'xml'){
					a.uri = 'http://www.w3.org/XML/1998/namespace';
				}if(prefix !== 'xmlns'){
					a.uri = currentNSMap[prefix || ''];
					
					//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
				}
			}
		}
		var nsp = tagName.indexOf(':');
		if(nsp>0){
			prefix = el.prefix = tagName.slice(0,nsp);
			localName = el.localName = tagName.slice(nsp+1);
		}else {
			prefix = null;//important!!
			localName = el.localName = tagName;
		}
		//no prefix element has default namespace
		var ns = el.uri = currentNSMap[prefix || ''];
		domBuilder.startElement(ns,localName,tagName,el);
		//endPrefixMapping and startPrefixMapping have not any help for dom builder
		//localNSMap = null
		if(el.closed){
			domBuilder.endElement(ns,localName,tagName);
			if(localNSMap){
				for(prefix in localNSMap){
					domBuilder.endPrefixMapping(prefix); 
				}
			}
		}else {
			el.currentNSMap = currentNSMap;
			el.localNSMap = localNSMap;
			//parseStack.push(el);
			return true;
		}
	}
	function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
		if(/^(?:script|textarea)$/i.test(tagName)){
			var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
			var text = source.substring(elStartEnd+1,elEndStart);
			if(/[&<]/.test(text)){
				if(/^script$/i.test(tagName)){
					//if(!/\]\]>/.test(text)){
						//lexHandler.startCDATA();
						domBuilder.characters(text,0,text.length);
						//lexHandler.endCDATA();
						return elEndStart;
					//}
				}//}else{//text area
					text = text.replace(/&#?\w+;/g,entityReplacer);
					domBuilder.characters(text,0,text.length);
					return elEndStart;
				//}
				
			}
		}
		return elStartEnd+1;
	}
	function fixSelfClosed(source,elStartEnd,tagName,closeMap){
		//if(tagName in closeMap){
		var pos = closeMap[tagName];
		if(pos == null){
			//console.log(tagName)
			pos =  source.lastIndexOf('</'+tagName+'>');
			if(pos<elStartEnd){//忘记闭合
				pos = source.lastIndexOf('</'+tagName);
			}
			closeMap[tagName] =pos;
		}
		return pos<elStartEnd;
		//} 
	}
	function _copy(source,target){
		for(var n in source){target[n] = source[n];}
	}
	function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
		var next= source.charAt(start+2);
		switch(next){
		case '-':
			if(source.charAt(start + 3) === '-'){
				var end = source.indexOf('-->',start+4);
				//append comment source.substring(4,end)//<!--
				if(end>start){
					domBuilder.comment(source,start+4,end-start-4);
					return end+3;
				}else {
					errorHandler.error("Unclosed comment");
					return -1;
				}
			}else {
				//error
				return -1;
			}
		default:
			if(source.substr(start+3,6) == 'CDATA['){
				var end = source.indexOf(']]>',start+9);
				domBuilder.startCDATA();
				domBuilder.characters(source,start+9,end-start-9);
				domBuilder.endCDATA(); 
				return end+3;
			}
			//<!DOCTYPE
			//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
			var matchs = split(source,start);
			var len = matchs.length;
			if(len>1 && /!doctype/i.test(matchs[0][0])){
				var name = matchs[1][0];
				var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
				var sysid = len>4 && matchs[4][0];
				var lastMatch = matchs[len-1];
				domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
						sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
				domBuilder.endDTD();
				
				return lastMatch.index+lastMatch[0].length
			}
		}
		return -1;
	}



	function parseInstruction(source,start,domBuilder){
		var end = source.indexOf('?>',start);
		if(end){
			var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
			if(match){
				match[0].length;
				domBuilder.processingInstruction(match[1], match[2]) ;
				return end+2;
			}else {//error
				return -1;
			}
		}
		return -1;
	}

	/**
	 * @param source
	 */
	function ElementAttributes(source){
		
	}
	ElementAttributes.prototype = {
		setTagName:function(tagName){
			if(!tagNamePattern.test(tagName)){
				throw new Error('invalid tagName:'+tagName)
			}
			this.tagName = tagName;
		},
		add:function(qName,value,offset){
			if(!tagNamePattern.test(qName)){
				throw new Error('invalid attribute:'+qName)
			}
			this[this.length++] = {qName:qName,value:value,offset:offset};
		},
		length:0,
		getLocalName:function(i){return this[i].localName},
		getLocator:function(i){return this[i].locator},
		getQName:function(i){return this[i].qName},
		getURI:function(i){return this[i].uri},
		getValue:function(i){return this[i].value}
	//	,getIndex:function(uri, localName)){
	//		if(localName){
	//			
	//		}else{
	//			var qName = uri
	//		}
	//	},
	//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
	//	getType:function(uri,localName){}
	//	getType:function(i){},
	};




	function _set_proto_(thiz,parent){
		thiz.__proto__ = parent;
		return thiz;
	}
	if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
		_set_proto_ = function(thiz,parent){
			function p(){}		p.prototype = parent;
			p = new p();
			for(parent in thiz){
				p[parent] = thiz[parent];
			}
			return p;
		};
	}

	function split(source,start){
		var match;
		var buf = [];
		var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
		reg.lastIndex = start;
		reg.exec(source);//skip <
		while(match = reg.exec(source)){
			buf.push(match);
			if(match[1])return buf;
		}
	}

	var XMLReader_1 = XMLReader;

	var sax = {
		XMLReader: XMLReader_1
	};

	/*
	 * DOM Level 2
	 * Object DOMException
	 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
	 */

	function copy(src,dest){
		for(var p in src){
			dest[p] = src[p];
		}
	}
	/**
	^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
	^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
	 */
	function _extends(Class,Super){
		var pt = Class.prototype;
		if(Object.create){
			var ppt = Object.create(Super.prototype);
			pt.__proto__ = ppt;
		}
		if(!(pt instanceof Super)){
			function t(){}		t.prototype = Super.prototype;
			t = new t();
			copy(pt,t);
			Class.prototype = pt = t;
		}
		if(pt.constructor != Class){
			if(typeof Class != 'function'){
				console.error("unknow Class:"+Class);
			}
			pt.constructor = Class;
		}
	}
	var htmlns = 'http://www.w3.org/1999/xhtml' ;
	// Node Types
	var NodeType = {};
	var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
	var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
	var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
	var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
	var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
	var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
	var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
	var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
	var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
	var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
	var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
	var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

	// ExceptionCode
	var ExceptionCode = {};
	var ExceptionMessage = {};
	ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
	ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
	var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
	ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
	ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
	ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
	ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
	var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
	ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
	var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
	//level2
	ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
	ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
	ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
	ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
	ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


	function DOMException(code, message) {
		if(message instanceof Error){
			var error = message;
		}else {
			error = this;
			Error.call(this, ExceptionMessage[code]);
			this.message = ExceptionMessage[code];
			if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
		}
		error.code = code;
		if(message) this.message = this.message + ": " + message;
		return error;
	}DOMException.prototype = Error.prototype;
	copy(ExceptionCode,DOMException);
	/**
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
	 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
	 * The items in the NodeList are accessible via an integral index, starting from 0.
	 */
	function NodeList() {
	}NodeList.prototype = {
		/**
		 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
		 * @standard level1
		 */
		length:0, 
		/**
		 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
		 * @standard level1
		 * @param index  unsigned long 
		 *   Index into the collection.
		 * @return Node
		 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
		 */
		item: function(index) {
			return this[index] || null;
		},
		toString:function(isHTML,nodeFilter){
			for(var buf = [], i = 0;i<this.length;i++){
				serializeToString(this[i],buf,isHTML,nodeFilter);
			}
			return buf.join('');
		}
	};
	function LiveNodeList(node,refresh){
		this._node = node;
		this._refresh = refresh;
		_updateLiveList(this);
	}
	function _updateLiveList(list){
		var inc = list._node._inc || list._node.ownerDocument._inc;
		if(list._inc != inc){
			var ls = list._refresh(list._node);
			//console.log(ls.length)
			__set__(list,'length',ls.length);
			copy(ls,list);
			list._inc = inc;
		}
	}
	LiveNodeList.prototype.item = function(i){
		_updateLiveList(this);
		return this[i];
	};

	_extends(LiveNodeList,NodeList);
	/**
	 * 
	 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
	 * NamedNodeMap objects in the DOM are live.
	 * used for attributes or DocumentType entities 
	 */
	function NamedNodeMap() {
	}
	function _findNodeIndex(list,node){
		var i = list.length;
		while(i--){
			if(list[i] === node){return i}
		}
	}

	function _addNamedNode(el,list,newAttr,oldAttr){
		if(oldAttr){
			list[_findNodeIndex(list,oldAttr)] = newAttr;
		}else {
			list[list.length++] = newAttr;
		}
		if(el){
			newAttr.ownerElement = el;
			var doc = el.ownerDocument;
			if(doc){
				oldAttr && _onRemoveAttribute(doc,el,oldAttr);
				_onAddAttribute(doc,el,newAttr);
			}
		}
	}
	function _removeNamedNode(el,list,attr){
		//console.log('remove attr:'+attr)
		var i = _findNodeIndex(list,attr);
		if(i>=0){
			var lastIndex = list.length-1;
			while(i<lastIndex){
				list[i] = list[++i];
			}
			list.length = lastIndex;
			if(el){
				var doc = el.ownerDocument;
				if(doc){
					_onRemoveAttribute(doc,el,attr);
					attr.ownerElement = null;
				}
			}
		}else {
			throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
		}
	}
	NamedNodeMap.prototype = {
		length:0,
		item:NodeList.prototype.item,
		getNamedItem: function(key) {
	//		if(key.indexOf(':')>0 || key == 'xmlns'){
	//			return null;
	//		}
			//console.log()
			var i = this.length;
			while(i--){
				var attr = this[i];
				//console.log(attr.nodeName,key)
				if(attr.nodeName == key){
					return attr;
				}
			}
		},
		setNamedItem: function(attr) {
			var el = attr.ownerElement;
			if(el && el!=this._ownerElement){
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			var oldAttr = this.getNamedItem(attr.nodeName);
			_addNamedNode(this._ownerElement,this,attr,oldAttr);
			return oldAttr;
		},
		/* returns Node */
		setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
			var el = attr.ownerElement, oldAttr;
			if(el && el!=this._ownerElement){
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
			_addNamedNode(this._ownerElement,this,attr,oldAttr);
			return oldAttr;
		},

		/* returns Node */
		removeNamedItem: function(key) {
			var attr = this.getNamedItem(key);
			_removeNamedNode(this._ownerElement,this,attr);
			return attr;
			
			
		},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
		
		//for level2
		removeNamedItemNS:function(namespaceURI,localName){
			var attr = this.getNamedItemNS(namespaceURI,localName);
			_removeNamedNode(this._ownerElement,this,attr);
			return attr;
		},
		getNamedItemNS: function(namespaceURI, localName) {
			var i = this.length;
			while(i--){
				var node = this[i];
				if(node.localName == localName && node.namespaceURI == namespaceURI){
					return node;
				}
			}
			return null;
		}
	};
	/**
	 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
	 */
	function DOMImplementation(/* Object */ features) {
		this._features = {};
		if (features) {
			for (var feature in features) {
				 this._features = features[feature];
			}
		}
	}
	DOMImplementation.prototype = {
		hasFeature: function(/* string */ feature, /* string */ version) {
			var versions = this._features[feature.toLowerCase()];
			if (versions && (!version || version in versions)) {
				return true;
			} else {
				return false;
			}
		},
		// Introduced in DOM Level 2:
		createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
			var doc = new Document();
			doc.implementation = this;
			doc.childNodes = new NodeList();
			doc.doctype = doctype;
			if(doctype){
				doc.appendChild(doctype);
			}
			if(qualifiedName){
				var root = doc.createElementNS(namespaceURI,qualifiedName);
				doc.appendChild(root);
			}
			return doc;
		},
		// Introduced in DOM Level 2:
		createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
			var node = new DocumentType();
			node.name = qualifiedName;
			node.nodeName = qualifiedName;
			node.publicId = publicId;
			node.systemId = systemId;
			// Introduced in DOM Level 2:
			//readonly attribute DOMString        internalSubset;
			
			//TODO:..
			//  readonly attribute NamedNodeMap     entities;
			//  readonly attribute NamedNodeMap     notations;
			return node;
		}
	};


	/**
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
	 */

	function Node() {
	}
	Node.prototype = {
		firstChild : null,
		lastChild : null,
		previousSibling : null,
		nextSibling : null,
		attributes : null,
		parentNode : null,
		childNodes : null,
		ownerDocument : null,
		nodeValue : null,
		namespaceURI : null,
		prefix : null,
		localName : null,
		// Modified in DOM Level 2:
		insertBefore:function(newChild, refChild){//raises 
			return _insertBefore(this,newChild,refChild);
		},
		replaceChild:function(newChild, oldChild){//raises 
			this.insertBefore(newChild,oldChild);
			if(oldChild){
				this.removeChild(oldChild);
			}
		},
		removeChild:function(oldChild){
			return _removeChild(this,oldChild);
		},
		appendChild:function(newChild){
			return this.insertBefore(newChild,null);
		},
		hasChildNodes:function(){
			return this.firstChild != null;
		},
		cloneNode:function(deep){
			return cloneNode(this.ownerDocument||this,this,deep);
		},
		// Modified in DOM Level 2:
		normalize:function(){
			var child = this.firstChild;
			while(child){
				var next = child.nextSibling;
				if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
					this.removeChild(next);
					child.appendData(next.data);
				}else {
					child.normalize();
					child = next;
				}
			}
		},
	  	// Introduced in DOM Level 2:
		isSupported:function(feature, version){
			return this.ownerDocument.implementation.hasFeature(feature,version);
		},
	    // Introduced in DOM Level 2:
	    hasAttributes:function(){
	    	return this.attributes.length>0;
	    },
	    lookupPrefix:function(namespaceURI){
	    	var el = this;
	    	while(el){
	    		var map = el._nsMap;
	    		//console.dir(map)
	    		if(map){
	    			for(var n in map){
	    				if(map[n] == namespaceURI){
	    					return n;
	    				}
	    			}
	    		}
	    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
	    	}
	    	return null;
	    },
	    // Introduced in DOM Level 3:
	    lookupNamespaceURI:function(prefix){
	    	var el = this;
	    	while(el){
	    		var map = el._nsMap;
	    		//console.dir(map)
	    		if(map){
	    			if(prefix in map){
	    				return map[prefix] ;
	    			}
	    		}
	    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
	    	}
	    	return null;
	    },
	    // Introduced in DOM Level 3:
	    isDefaultNamespace:function(namespaceURI){
	    	var prefix = this.lookupPrefix(namespaceURI);
	    	return prefix == null;
	    }
	};


	function _xmlEncoder(c){
		return c == '<' && '&lt;' ||
	         c == '>' && '&gt;' ||
	         c == '&' && '&amp;' ||
	         c == '"' && '&quot;' ||
	         '&#'+c.charCodeAt()+';'
	}


	copy(NodeType,Node);
	copy(NodeType,Node.prototype);

	/**
	 * @param callback return true for continue,false for break
	 * @return boolean true: break visit;
	 */
	function _visitNode(node,callback){
		if(callback(node)){
			return true;
		}
		if(node = node.firstChild){
			do{
				if(_visitNode(node,callback)){return true}
	        }while(node=node.nextSibling)
	    }
	}



	function Document(){
	}
	function _onAddAttribute(doc,el,newAttr){
		doc && doc._inc++;
		var ns = newAttr.namespaceURI ;
		if(ns == 'http://www.w3.org/2000/xmlns/'){
			//update namespace
			el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value;
		}
	}
	function _onRemoveAttribute(doc,el,newAttr,remove){
		doc && doc._inc++;
		var ns = newAttr.namespaceURI ;
		if(ns == 'http://www.w3.org/2000/xmlns/'){
			//update namespace
			delete el._nsMap[newAttr.prefix?newAttr.localName:''];
		}
	}
	function _onUpdateChild(doc,el,newChild){
		if(doc && doc._inc){
			doc._inc++;
			//update childNodes
			var cs = el.childNodes;
			if(newChild){
				cs[cs.length++] = newChild;
			}else {
				//console.log(1)
				var child = el.firstChild;
				var i = 0;
				while(child){
					cs[i++] = child;
					child =child.nextSibling;
				}
				cs.length = i;
			}
		}
	}

	/**
	 * attributes;
	 * children;
	 * 
	 * writeable properties:
	 * nodeValue,Attr:value,CharacterData:data
	 * prefix
	 */
	function _removeChild(parentNode,child){
		var previous = child.previousSibling;
		var next = child.nextSibling;
		if(previous){
			previous.nextSibling = next;
		}else {
			parentNode.firstChild = next;
		}
		if(next){
			next.previousSibling = previous;
		}else {
			parentNode.lastChild = previous;
		}
		_onUpdateChild(parentNode.ownerDocument,parentNode);
		return child;
	}
	/**
	 * preformance key(refChild == null)
	 */
	function _insertBefore(parentNode,newChild,nextChild){
		var cp = newChild.parentNode;
		if(cp){
			cp.removeChild(newChild);//remove and update
		}
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			var newFirst = newChild.firstChild;
			if (newFirst == null) {
				return newChild;
			}
			var newLast = newChild.lastChild;
		}else {
			newFirst = newLast = newChild;
		}
		var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

		newFirst.previousSibling = pre;
		newLast.nextSibling = nextChild;
		
		
		if(pre){
			pre.nextSibling = newFirst;
		}else {
			parentNode.firstChild = newFirst;
		}
		if(nextChild == null){
			parentNode.lastChild = newLast;
		}else {
			nextChild.previousSibling = newLast;
		}
		do{
			newFirst.parentNode = parentNode;
		}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
		_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
		//console.log(parentNode.lastChild.nextSibling == null)
		if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
			newChild.firstChild = newChild.lastChild = null;
		}
		return newChild;
	}
	function _appendSingleChild(parentNode,newChild){
		var cp = newChild.parentNode;
		if(cp){
			var pre = parentNode.lastChild;
			cp.removeChild(newChild);//remove and update
			var pre = parentNode.lastChild;
		}
		var pre = parentNode.lastChild;
		newChild.parentNode = parentNode;
		newChild.previousSibling = pre;
		newChild.nextSibling = null;
		if(pre){
			pre.nextSibling = newChild;
		}else {
			parentNode.firstChild = newChild;
		}
		parentNode.lastChild = newChild;
		_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
		return newChild;
		//console.log("__aa",parentNode.lastChild.nextSibling == null)
	}
	Document.prototype = {
		//implementation : null,
		nodeName :  '#document',
		nodeType :  DOCUMENT_NODE,
		doctype :  null,
		documentElement :  null,
		_inc : 1,
		
		insertBefore :  function(newChild, refChild){//raises 
			if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
				var child = newChild.firstChild;
				while(child){
					var next = child.nextSibling;
					this.insertBefore(child,refChild);
					child = next;
				}
				return newChild;
			}
			if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
				this.documentElement = newChild;
			}
			
			return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
		},
		removeChild :  function(oldChild){
			if(this.documentElement == oldChild){
				this.documentElement = null;
			}
			return _removeChild(this,oldChild);
		},
		// Introduced in DOM Level 2:
		importNode : function(importedNode,deep){
			return importNode(this,importedNode,deep);
		},
		// Introduced in DOM Level 2:
		getElementById :	function(id){
			var rtv = null;
			_visitNode(this.documentElement,function(node){
				if(node.nodeType == ELEMENT_NODE){
					if(node.getAttribute('id') == id){
						rtv = node;
						return true;
					}
				}
			});
			return rtv;
		},
		
		//document factory method:
		createElement :	function(tagName){
			var node = new Element();
			node.ownerDocument = this;
			node.nodeName = tagName;
			node.tagName = tagName;
			node.childNodes = new NodeList();
			var attrs	= node.attributes = new NamedNodeMap();
			attrs._ownerElement = node;
			return node;
		},
		createDocumentFragment :	function(){
			var node = new DocumentFragment();
			node.ownerDocument = this;
			node.childNodes = new NodeList();
			return node;
		},
		createTextNode :	function(data){
			var node = new Text();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createComment :	function(data){
			var node = new Comment();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createCDATASection :	function(data){
			var node = new CDATASection();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createProcessingInstruction :	function(target,data){
			var node = new ProcessingInstruction();
			node.ownerDocument = this;
			node.tagName = node.target = target;
			node.nodeValue= node.data = data;
			return node;
		},
		createAttribute :	function(name){
			var node = new Attr();
			node.ownerDocument	= this;
			node.name = name;
			node.nodeName	= name;
			node.localName = name;
			node.specified = true;
			return node;
		},
		createEntityReference :	function(name){
			var node = new EntityReference();
			node.ownerDocument	= this;
			node.nodeName	= name;
			return node;
		},
		// Introduced in DOM Level 2:
		createElementNS :	function(namespaceURI,qualifiedName){
			var node = new Element();
			var pl = qualifiedName.split(':');
			var attrs	= node.attributes = new NamedNodeMap();
			node.childNodes = new NodeList();
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.tagName = qualifiedName;
			node.namespaceURI = namespaceURI;
			if(pl.length == 2){
				node.prefix = pl[0];
				node.localName = pl[1];
			}else {
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			attrs._ownerElement = node;
			return node;
		},
		// Introduced in DOM Level 2:
		createAttributeNS :	function(namespaceURI,qualifiedName){
			var node = new Attr();
			var pl = qualifiedName.split(':');
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.name = qualifiedName;
			node.namespaceURI = namespaceURI;
			node.specified = true;
			if(pl.length == 2){
				node.prefix = pl[0];
				node.localName = pl[1];
			}else {
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			return node;
		}
	};
	_extends(Document,Node);


	function Element() {
		this._nsMap = {};
	}Element.prototype = {
		nodeType : ELEMENT_NODE,
		hasAttribute : function(name){
			return this.getAttributeNode(name)!=null;
		},
		getAttribute : function(name){
			var attr = this.getAttributeNode(name);
			return attr && attr.value || '';
		},
		getAttributeNode : function(name){
			return this.attributes.getNamedItem(name);
		},
		setAttribute : function(name, value){
			var attr = this.ownerDocument.createAttribute(name);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		removeAttribute : function(name){
			var attr = this.getAttributeNode(name);
			attr && this.removeAttributeNode(attr);
		},
		
		//four real opeartion method
		appendChild:function(newChild){
			if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
				return this.insertBefore(newChild,null);
			}else {
				return _appendSingleChild(this,newChild);
			}
		},
		setAttributeNode : function(newAttr){
			return this.attributes.setNamedItem(newAttr);
		},
		setAttributeNodeNS : function(newAttr){
			return this.attributes.setNamedItemNS(newAttr);
		},
		removeAttributeNode : function(oldAttr){
			//console.log(this == oldAttr.ownerElement)
			return this.attributes.removeNamedItem(oldAttr.nodeName);
		},
		//get real attribute name,and remove it by removeAttributeNode
		removeAttributeNS : function(namespaceURI, localName){
			var old = this.getAttributeNodeNS(namespaceURI, localName);
			old && this.removeAttributeNode(old);
		},
		
		hasAttributeNS : function(namespaceURI, localName){
			return this.getAttributeNodeNS(namespaceURI, localName)!=null;
		},
		getAttributeNS : function(namespaceURI, localName){
			var attr = this.getAttributeNodeNS(namespaceURI, localName);
			return attr && attr.value || '';
		},
		setAttributeNS : function(namespaceURI, qualifiedName, value){
			var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		getAttributeNodeNS : function(namespaceURI, localName){
			return this.attributes.getNamedItemNS(namespaceURI, localName);
		},
		
		getElementsByTagName : function(tagName){
			return new LiveNodeList(this,function(base){
				var ls = [];
				_visitNode(base,function(node){
					if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
						ls.push(node);
					}
				});
				return ls;
			});
		},
		getElementsByTagNameNS : function(namespaceURI, localName){
			return new LiveNodeList(this,function(base){
				var ls = [];
				_visitNode(base,function(node){
					if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
						ls.push(node);
					}
				});
				return ls;
				
			});
		}
	};
	Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
	Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


	_extends(Element,Node);
	function Attr() {
	}Attr.prototype.nodeType = ATTRIBUTE_NODE;
	_extends(Attr,Node);


	function CharacterData() {
	}CharacterData.prototype = {
		data : '',
		substringData : function(offset, count) {
			return this.data.substring(offset, offset+count);
		},
		appendData: function(text) {
			text = this.data+text;
			this.nodeValue = this.data = text;
			this.length = text.length;
		},
		insertData: function(offset,text) {
			this.replaceData(offset,0,text);
		
		},
		appendChild:function(newChild){
			throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
		},
		deleteData: function(offset, count) {
			this.replaceData(offset,count,"");
		},
		replaceData: function(offset, count, text) {
			var start = this.data.substring(0,offset);
			var end = this.data.substring(offset+count);
			text = start + text + end;
			this.nodeValue = this.data = text;
			this.length = text.length;
		}
	};
	_extends(CharacterData,Node);
	function Text() {
	}Text.prototype = {
		nodeName : "#text",
		nodeType : TEXT_NODE,
		splitText : function(offset) {
			var text = this.data;
			var newText = text.substring(offset);
			text = text.substring(0, offset);
			this.data = this.nodeValue = text;
			this.length = text.length;
			var newNode = this.ownerDocument.createTextNode(newText);
			if(this.parentNode){
				this.parentNode.insertBefore(newNode, this.nextSibling);
			}
			return newNode;
		}
	};
	_extends(Text,CharacterData);
	function Comment() {
	}Comment.prototype = {
		nodeName : "#comment",
		nodeType : COMMENT_NODE
	};
	_extends(Comment,CharacterData);

	function CDATASection() {
	}CDATASection.prototype = {
		nodeName : "#cdata-section",
		nodeType : CDATA_SECTION_NODE
	};
	_extends(CDATASection,CharacterData);


	function DocumentType() {
	}DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
	_extends(DocumentType,Node);

	function Notation() {
	}Notation.prototype.nodeType = NOTATION_NODE;
	_extends(Notation,Node);

	function Entity() {
	}Entity.prototype.nodeType = ENTITY_NODE;
	_extends(Entity,Node);

	function EntityReference() {
	}EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
	_extends(EntityReference,Node);

	function DocumentFragment() {
	}DocumentFragment.prototype.nodeName =	"#document-fragment";
	DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
	_extends(DocumentFragment,Node);


	function ProcessingInstruction() {
	}
	ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
	_extends(ProcessingInstruction,Node);
	function XMLSerializer$1(){}
	XMLSerializer$1.prototype.serializeToString = function(node,isHtml,nodeFilter){
		return nodeSerializeToString.call(node,isHtml,nodeFilter);
	};
	Node.prototype.toString = nodeSerializeToString;
	function nodeSerializeToString(isHtml,nodeFilter){
		var buf = [];
		var refNode = this.nodeType == 9?this.documentElement:this;
		var prefix = refNode.prefix;
		var uri = refNode.namespaceURI;
		
		if(uri && prefix == null){
			//console.log(prefix)
			var prefix = refNode.lookupPrefix(uri);
			if(prefix == null){
				//isHTML = true;
				var visibleNamespaces=[
				{namespace:uri,prefix:null}
				//{namespace:uri,prefix:''}
				];
			}
		}
		serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
		//console.log('###',this.nodeType,uri,prefix,buf.join(''))
		return buf.join('');
	}
	function needNamespaceDefine(node,isHTML, visibleNamespaces) {
		var prefix = node.prefix||'';
		var uri = node.namespaceURI;
		if (!prefix && !uri){
			return false;
		}
		if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
			|| uri == 'http://www.w3.org/2000/xmlns/'){
			return false;
		}
		
		var i = visibleNamespaces.length; 
		//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
		while (i--) {
			var ns = visibleNamespaces[i];
			// get namespace prefix
			//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
			if (ns.prefix == prefix){
				return ns.namespace != uri;
			}
		}
		//console.log(isHTML,uri,prefix=='')
		//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
		//	return false;
		//}
		//node.flag = '11111'
		//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
		return true;
	}
	function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
		if(nodeFilter){
			node = nodeFilter(node);
			if(node){
				if(typeof node == 'string'){
					buf.push(node);
					return;
				}
			}else {
				return;
			}
			//buf.sort.apply(attrs, attributeSorter);
		}
		switch(node.nodeType){
		case ELEMENT_NODE:
			if (!visibleNamespaces) visibleNamespaces = [];
			visibleNamespaces.length;
			var attrs = node.attributes;
			var len = attrs.length;
			var child = node.firstChild;
			var nodeName = node.tagName;
			
			isHTML =  (htmlns === node.namespaceURI) ||isHTML; 
			buf.push('<',nodeName);
			
			
			
			for(var i=0;i<len;i++){
				// add namespaces for attributes
				var attr = attrs.item(i);
				if (attr.prefix == 'xmlns') {
					visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
				}else if(attr.nodeName == 'xmlns'){
					visibleNamespaces.push({ prefix: '', namespace: attr.value });
				}
			}
			for(var i=0;i<len;i++){
				var attr = attrs.item(i);
				if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
					var prefix = attr.prefix||'';
					var uri = attr.namespaceURI;
					var ns = prefix ? ' xmlns:' + prefix : " xmlns";
					buf.push(ns, '="' , uri , '"');
					visibleNamespaces.push({ prefix: prefix, namespace:uri });
				}
				serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
			}
			// add namespace for current node		
			if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
				var prefix = node.prefix||'';
				var uri = node.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			
			if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
				buf.push('>');
				//if is cdata child node
				if(isHTML && /^script$/i.test(nodeName)){
					while(child){
						if(child.data){
							buf.push(child.data);
						}else {
							serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
						}
						child = child.nextSibling;
					}
				}else
				{
					while(child){
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
						child = child.nextSibling;
					}
				}
				buf.push('</',nodeName,'>');
			}else {
				buf.push('/>');
			}
			// remove added visible namespaces
			//visibleNamespaces.length = startVisibleNamespaces;
			return;
		case DOCUMENT_NODE:
		case DOCUMENT_FRAGMENT_NODE:
			var child = node.firstChild;
			while(child){
				serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
				child = child.nextSibling;
			}
			return;
		case ATTRIBUTE_NODE:
			return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
		case TEXT_NODE:
			return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
		case CDATA_SECTION_NODE:
			return buf.push( '<![CDATA[',node.data,']]>');
		case COMMENT_NODE:
			return buf.push( "<!--",node.data,"-->");
		case DOCUMENT_TYPE_NODE:
			var pubid = node.publicId;
			var sysid = node.systemId;
			buf.push('<!DOCTYPE ',node.name);
			if(pubid){
				buf.push(' PUBLIC "',pubid);
				if (sysid && sysid!='.') {
					buf.push( '" "',sysid);
				}
				buf.push('">');
			}else if(sysid && sysid!='.'){
				buf.push(' SYSTEM "',sysid,'">');
			}else {
				var sub = node.internalSubset;
				if(sub){
					buf.push(" [",sub,"]");
				}
				buf.push(">");
			}
			return;
		case PROCESSING_INSTRUCTION_NODE:
			return buf.push( "<?",node.target," ",node.data,"?>");
		case ENTITY_REFERENCE_NODE:
			return buf.push( '&',node.nodeName,';');
		//case ENTITY_NODE:
		//case NOTATION_NODE:
		default:
			buf.push('??',node.nodeName);
		}
	}
	function importNode(doc,node,deep){
		var node2;
		switch (node.nodeType) {
		case ELEMENT_NODE:
			node2 = node.cloneNode(false);
			node2.ownerDocument = doc;
			//var attrs = node2.attributes;
			//var len = attrs.length;
			//for(var i=0;i<len;i++){
				//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
			//}
		case DOCUMENT_FRAGMENT_NODE:
			break;
		case ATTRIBUTE_NODE:
			deep = true;
			break;
		//case ENTITY_REFERENCE_NODE:
		//case PROCESSING_INSTRUCTION_NODE:
		////case TEXT_NODE:
		//case CDATA_SECTION_NODE:
		//case COMMENT_NODE:
		//	deep = false;
		//	break;
		//case DOCUMENT_NODE:
		//case DOCUMENT_TYPE_NODE:
		//cannot be imported.
		//case ENTITY_NODE:
		//case NOTATION_NODE：
		//can not hit in level3
		//default:throw e;
		}
		if(!node2){
			node2 = node.cloneNode(false);//false
		}
		node2.ownerDocument = doc;
		node2.parentNode = null;
		if(deep){
			var child = node.firstChild;
			while(child){
				node2.appendChild(importNode(doc,child,deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}
	//
	//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
	//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
	function cloneNode(doc,node,deep){
		var node2 = new node.constructor();
		for(var n in node){
			var v = node[n];
			if(typeof v != 'object' ){
				if(v != node2[n]){
					node2[n] = v;
				}
			}
		}
		if(node.childNodes){
			node2.childNodes = new NodeList();
		}
		node2.ownerDocument = doc;
		switch (node2.nodeType) {
		case ELEMENT_NODE:
			var attrs	= node.attributes;
			var attrs2	= node2.attributes = new NamedNodeMap();
			var len = attrs.length;
			attrs2._ownerElement = node2;
			for(var i=0;i<len;i++){
				node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
			}
			break;	case ATTRIBUTE_NODE:
			deep = true;
		}
		if(deep){
			var child = node.firstChild;
			while(child){
				node2.appendChild(cloneNode(doc,child,deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}

	function __set__(object,key,value){
		object[key] = value;
	}
	//do dynamic
	try{
		if(Object.defineProperty){
			Object.defineProperty(LiveNodeList.prototype,'length',{
				get:function(){
					_updateLiveList(this);
					return this.$$length;
				}
			});
			Object.defineProperty(Node.prototype,'textContent',{
				get:function(){
					return getTextContent(this);
				},
				set:function(data){
					switch(this.nodeType){
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						while(this.firstChild){
							this.removeChild(this.firstChild);
						}
						if(data || String(data)){
							this.appendChild(this.ownerDocument.createTextNode(data));
						}
						break;
					default:
						//TODO:
						this.data = data;
						this.value = data;
						this.nodeValue = data;
					}
				}
			});
			
			function getTextContent(node){
				switch(node.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					var buf = [];
					node = node.firstChild;
					while(node){
						if(node.nodeType!==7 && node.nodeType !==8){
							buf.push(getTextContent(node));
						}
						node = node.nextSibling;
					}
					return buf.join('');
				default:
					return node.nodeValue;
				}
			}
			__set__ = function(object,key,value){
				//console.log(value)
				object['$$'+key] = value;
			};
		}
	}catch(e){//ie8
	}

	//if(typeof require == 'function'){
		var DOMImplementation_1 = DOMImplementation;
		var XMLSerializer_1 = XMLSerializer$1;
	//}

	var dom = {
		DOMImplementation: DOMImplementation_1,
		XMLSerializer: XMLSerializer_1
	};

	var domParser = createCommonjsModule(function (module, exports) {
	function DOMParser(options){
		this.options = options ||{locator:{}};
		
	}
	DOMParser.prototype.parseFromString = function(source,mimeType){
		var options = this.options;
		var sax =  new XMLReader();
		var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
		var errorHandler = options.errorHandler;
		var locator = options.locator;
		var defaultNSMap = options.xmlns||{};
		var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"};
		if(locator){
			domBuilder.setDocumentLocator(locator);
		}
		
		sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
		sax.domBuilder = options.domBuilder || domBuilder;
		if(/\/x?html?$/.test(mimeType)){
			entityMap.nbsp = '\xa0';
			entityMap.copy = '\xa9';
			defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
		}
		defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
		if(source){
			sax.parse(source,defaultNSMap,entityMap);
		}else {
			sax.errorHandler.error("invalid doc source");
		}
		return domBuilder.doc;
	};
	function buildErrorHandler(errorImpl,domBuilder,locator){
		if(!errorImpl){
			if(domBuilder instanceof DOMHandler){
				return domBuilder;
			}
			errorImpl = domBuilder ;
		}
		var errorHandler = {};
		var isCallback = errorImpl instanceof Function;
		locator = locator||{};
		function build(key){
			var fn = errorImpl[key];
			if(!fn && isCallback){
				fn = errorImpl.length == 2?function(msg){errorImpl(key,msg);}:errorImpl;
			}
			errorHandler[key] = fn && function(msg){
				fn('[xmldom '+key+']\t'+msg+_locator(locator));
			}||function(){};
		}
		build('warning');
		build('error');
		build('fatalError');
		return errorHandler;
	}

	//console.log('#\n\n\n\n\n\n\n####')
	/**
	 * +ContentHandler+ErrorHandler
	 * +LexicalHandler+EntityResolver2
	 * -DeclHandler-DTDHandler 
	 * 
	 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
	 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
	 */
	function DOMHandler() {
	    this.cdata = false;
	}
	function position(locator,node){
		node.lineNumber = locator.lineNumber;
		node.columnNumber = locator.columnNumber;
	}
	/**
	 * @see org.xml.sax.ContentHandler#startDocument
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
	 */ 
	DOMHandler.prototype = {
		startDocument : function() {
	    	this.doc = new DOMImplementation().createDocument(null, null, null);
	    	if (this.locator) {
	        	this.doc.documentURI = this.locator.systemId;
	    	}
		},
		startElement:function(namespaceURI, localName, qName, attrs) {
			var doc = this.doc;
		    var el = doc.createElementNS(namespaceURI, qName||localName);
		    var len = attrs.length;
		    appendElement(this, el);
		    this.currentElement = el;
		    
			this.locator && position(this.locator,el);
		    for (var i = 0 ; i < len; i++) {
		        var namespaceURI = attrs.getURI(i);
		        var value = attrs.getValue(i);
		        var qName = attrs.getQName(i);
				var attr = doc.createAttributeNS(namespaceURI, qName);
				this.locator &&position(attrs.getLocator(i),attr);
				attr.value = attr.nodeValue = value;
				el.setAttributeNode(attr);
		    }
		},
		endElement:function(namespaceURI, localName, qName) {
			var current = this.currentElement;
			current.tagName;
			this.currentElement = current.parentNode;
		},
		startPrefixMapping:function(prefix, uri) {
		},
		endPrefixMapping:function(prefix) {
		},
		processingInstruction:function(target, data) {
		    var ins = this.doc.createProcessingInstruction(target, data);
		    this.locator && position(this.locator,ins);
		    appendElement(this, ins);
		},
		ignorableWhitespace:function(ch, start, length) {
		},
		characters:function(chars, start, length) {
			chars = _toString.apply(this,arguments);
			//console.log(chars)
			if(chars){
				if (this.cdata) {
					var charNode = this.doc.createCDATASection(chars);
				} else {
					var charNode = this.doc.createTextNode(chars);
				}
				if(this.currentElement){
					this.currentElement.appendChild(charNode);
				}else if(/^\s*$/.test(chars)){
					this.doc.appendChild(charNode);
					//process xml
				}
				this.locator && position(this.locator,charNode);
			}
		},
		skippedEntity:function(name) {
		},
		endDocument:function() {
			this.doc.normalize();
		},
		setDocumentLocator:function (locator) {
		    if(this.locator = locator){// && !('lineNumber' in locator)){
		    	locator.lineNumber = 0;
		    }
		},
		//LexicalHandler
		comment:function(chars, start, length) {
			chars = _toString.apply(this,arguments);
		    var comm = this.doc.createComment(chars);
		    this.locator && position(this.locator,comm);
		    appendElement(this, comm);
		},
		
		startCDATA:function() {
		    //used in characters() methods
		    this.cdata = true;
		},
		endCDATA:function() {
		    this.cdata = false;
		},
		
		startDTD:function(name, publicId, systemId) {
			var impl = this.doc.implementation;
		    if (impl && impl.createDocumentType) {
		        var dt = impl.createDocumentType(name, publicId, systemId);
		        this.locator && position(this.locator,dt);
		        appendElement(this, dt);
		    }
		},
		/**
		 * @see org.xml.sax.ErrorHandler
		 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
		 */
		warning:function(error) {
			console.warn('[xmldom warning]\t'+error,_locator(this.locator));
		},
		error:function(error) {
			console.error('[xmldom error]\t'+error,_locator(this.locator));
		},
		fatalError:function(error) {
			console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
		    throw error;
		}
	};
	function _locator(l){
		if(l){
			return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
		}
	}
	function _toString(chars,start,length){
		if(typeof chars == 'string'){
			return chars.substr(start,length)
		}else {//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
			if(chars.length >= start+length || start){
				return new java.lang.String(chars,start,length)+'';
			}
			return chars;
		}
	}

	/*
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
	 * used method of org.xml.sax.ext.LexicalHandler:
	 *  #comment(chars, start, length)
	 *  #startCDATA()
	 *  #endCDATA()
	 *  #startDTD(name, publicId, systemId)
	 *
	 *
	 * IGNORED method of org.xml.sax.ext.LexicalHandler:
	 *  #endDTD()
	 *  #startEntity(name)
	 *  #endEntity(name)
	 *
	 *
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
	 * IGNORED method of org.xml.sax.ext.DeclHandler
	 * 	#attributeDecl(eName, aName, type, mode, value)
	 *  #elementDecl(name, model)
	 *  #externalEntityDecl(name, publicId, systemId)
	 *  #internalEntityDecl(name, value)
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
	 * IGNORED method of org.xml.sax.EntityResolver2
	 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
	 *  #resolveEntity(publicId, systemId)
	 *  #getExternalSubset(name, baseURI)
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
	 * IGNORED method of org.xml.sax.DTDHandler
	 *  #notationDecl(name, publicId, systemId) {};
	 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
	 */
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
		DOMHandler.prototype[key] = function(){return null};
	});

	/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
	function appendElement (hander,node) {
	    if (!hander.currentElement) {
	        hander.doc.appendChild(node);
	    } else {
	        hander.currentElement.appendChild(node);
	    }
	}//appendChild and setAttributeNS are preformance key

	//if(typeof require == 'function'){
		var XMLReader = sax.XMLReader;
		var DOMImplementation = exports.DOMImplementation = dom.DOMImplementation;
		exports.XMLSerializer = dom.XMLSerializer ;
		exports.DOMParser = DOMParser;
	//}
	});

	/* Copyright 2015 William Summers, MetaTribal LLC
	 * adapted from https://developer.mozilla.org/en-US/docs/JXON
	 *
	 * Licensed under the MIT License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     https://opensource.org/licenses/MIT
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * @author William Summers
	 * https://github.com/metatribal/xmlToJSON
	 */
	var DOMParser = domParser.DOMParser;

	var xmlToJSON = (function () {

	    this.version = "1.3.5";

	    var options = { // set up the default options
	        mergeCDATA: true, // extract cdata and merge with text
	        normalize: true, // collapse multiple spaces to single space
	        stripElemPrefix: true, // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
	    };

	    var prefixMatch = new RegExp(/(?!xmlns)^.*:/);

	    this.grokType = function (sValue) {
	        if (/^\s*$/.test(sValue)) {
	            return null;
	        }
	        if (/^(?:true|false)$/i.test(sValue)) {
	            return sValue.toLowerCase() === "true";
	        }
	        if (isFinite(sValue)) {
	            return parseFloat(sValue);
	        }
	        return sValue;
	    };

	    this.parseString = function (xmlString, opt) {
	        if (xmlString) {
	            var xml = this.stringToXML(xmlString);
	            if (xml.getElementsByTagName('parsererror').length) {
	                return null;
	            } else {
	                return this.parseXML(xml, opt);
	            }
	        } else {
	            return null;
	        }
	    };

	    this.parseXML = function (oXMLParent, opt) {

	        // initialize options
	        for (var key in opt) {
	            options[key] = opt[key];
	        }

	        var vResult = {},
	            nLength = 0,
	            sCollectedTxt = "";

	        // iterate over the children
	        var childNum = oXMLParent.childNodes.length;
	        if (childNum) {
	            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
	                oNode = oXMLParent.childNodes.item(nItem);

	                if (oNode.nodeType === 4) {
	                    if (options.mergeCDATA) {
	                        sCollectedTxt += oNode.nodeValue;
	                    }
	                } /* nodeType is "CDATASection" (4) */
	                else if (oNode.nodeType === 3) {
	                    sCollectedTxt += oNode.nodeValue;
	                } /* nodeType is "Text" (3) */
	                else if (oNode.nodeType === 1) { /* nodeType is "Element" (1) */

	                    if (nLength === 0) {
	                        vResult = {};
	                    }

	                    // using nodeName to support browser (IE) implementation with no 'localName' property
	                    if (options.stripElemPrefix) {
	                        sProp = oNode.nodeName.replace(prefixMatch, '');
	                    } else {
	                        sProp = oNode.nodeName;
	                    }

	                    vContent = xmlToJSON.parseXML(oNode);

	                    if (vResult.hasOwnProperty(sProp)) {
	                        if (vResult[sProp].constructor !== Array) {
	                            vResult[sProp] = [vResult[sProp]];
	                        }
	                        vResult[sProp].push(vContent);

	                    } else {
	                        vResult[sProp] = vContent;
	                        nLength++;
	                    }
	                }
	            }
	        }

	        if (!Object.keys(vResult).length) {
	            // vResult = sCollectedTxt.replace(trimMatch, '') || ''; // by carsonxu 修复 getBucket返回的 Key 是 " /" 这种场景
	            vResult = sCollectedTxt || '';
	        }

	        return vResult;
	    };

	    // Convert xmlDocument to a string
	    // Returns null on failure
	    this.xmlToString = function (xmlDoc) {
	        try {
	            var xmlString = xmlDoc.xml ? xmlDoc.xml : (new XMLSerializer()).serializeToString(xmlDoc);
	            return xmlString;
	        } catch (err) {
	            return null;
	        }
	    };

	    // Convert a string to XML Node Structure
	    // Returns null on failure
	    this.stringToXML = function (xmlString) {
	        try {
	            var xmlDoc = null;

	            if (window.DOMParser) {

	                var parser = new DOMParser();
	                xmlDoc = parser.parseFromString(xmlString, "text/xml");

	                return xmlDoc;
	            } else {
	                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	                xmlDoc.async = false;
	                xmlDoc.loadXML(xmlString);

	                return xmlDoc;
	            }
	        } catch (e) {
	            return null;
	        }
	    };

	    return this;

	}).call({});

	var xml2json = function (xmlString) {
	    return xmlToJSON.parseString(xmlString);
	};

	var xml2json_1 = xml2json;

	//copyright Ryan Day 2010 <http://ryanday.org>, Joscha Feth 2013 <http://www.feth.com> [MIT Licensed]

	var element_start_char =
	    "a-zA-Z_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
	var element_non_start_char = "\-.0-9\u00B7\u0300-\u036F\u203F\u2040";
	var element_replace = new RegExp("^([^" + element_start_char + "])|^((x|X)(m|M)(l|L))|([^" + element_start_char + element_non_start_char + "])", "g");
	var not_safe_in_xml = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;

	var objKeys = function (obj) {
	    var l = [];
	    if (obj instanceof Object) {
	        for (var k in obj) {
	            if (obj.hasOwnProperty(k)) {
	                l.push(k);
	            }
	        }
	    }
	    return l;
	};
	var process_to_xml = function (node_data, options) {

	    var makeNode = function (name, content, attributes, level, hasSubNodes) {
	        var indent_value = options.indent !== undefined ? options.indent : "\t";
	        var indent = options.prettyPrint ? '\n' + new Array(level).join(indent_value) : '';
	        if (options.removeIllegalNameCharacters) {
	            name = name.replace(element_replace, '_');
	        }

	        var node = [indent, '<', name, (attributes || '')];
	        if (content && content.length > 0) {
	            node.push('>');
	            node.push(content);
	            hasSubNodes && node.push(indent);
	            node.push('</');
	            node.push(name);
	            node.push('>');
	        } else {
	            node.push('/>');
	        }
	        return node.join('');
	    };

	    return (function fn(node_data, node_descriptor, level) {
	        var type = typeof node_data;
	        if ((Array.isArray) ? Array.isArray(node_data) : node_data instanceof Array) {
	            type = 'array';
	        } else if (node_data instanceof Date) {
	            type = 'date';
	        }

	        switch (type) {
	            //if value is an array create child nodes from values
	            case 'array':
	                var ret = [];
	                node_data.map(function (v) {
	                    ret.push(fn(v, 1, level + 1));
	                    //entries that are values of an array are the only ones that can be special node descriptors
	                });
	                options.prettyPrint && ret.push('\n');
	                return ret.join('');

	            case 'date':
	                // cast dates to ISO 8601 date (soap likes it)
	                return node_data.toJSON ? node_data.toJSON() : node_data + '';

	            case 'object':
	                var nodes = [];
	                for (var name in node_data) {
	                    if (node_data.hasOwnProperty(name)) {
	                        if (node_data[name] instanceof Array) {
	                            for (var j = 0; j < node_data[name].length; j++) {
	                                if (node_data[name].hasOwnProperty(j)) {
	                                    nodes.push(makeNode(name, fn(node_data[name][j], 0, level + 1), null, level + 1, objKeys(node_data[name][j]).length));
	                                }
	                            }
	                        } else {
	                            nodes.push(makeNode(name, fn(node_data[name], 0, level + 1), null, level + 1));
	                        }
	                    }
	                }
	                options.prettyPrint && nodes.length > 0 && nodes.push('\n');
	                return nodes.join('');

	            case 'function':
	                return node_data();

	            default:
	                return options.escape ? esc(node_data) : '' + node_data;
	        }

	    }(node_data, 0, 0))
	};


	var xml_header = function (standalone) {
	    var ret = ['<?xml version="1.0" encoding="UTF-8"'];

	    if (standalone) {
	        ret.push(' standalone="yes"');
	    }
	    ret.push('?>');

	    return ret.join('');
	};

	function esc(str) {
	    return ('' + str).replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/'/g, '&apos;')
	        .replace(/"/g, '&quot;')
	        .replace(not_safe_in_xml, '');
	}

	var json2xml = function (obj, options) {
	    if (!options) {
	        options = {
	            xmlHeader: {
	                standalone: true
	            },
	            prettyPrint: true,
	            indent: "  ",
	            escape: true,
	        };
	    }

	    if (typeof obj == 'string') {
	        try {
	            obj = JSON.parse(obj.toString());
	        } catch (e) {
	            return false;
	        }
	    }

	    var xmlheader = '';
	    var docType = '';
	    if (options) {
	        if (typeof options == 'object') {
	            // our config is an object

	            if (options.xmlHeader) {
	                // the user wants an xml header
	                xmlheader = xml_header(!!options.xmlHeader.standalone);
	            }

	            if (typeof options.docType != 'undefined') {
	                docType = '<!DOCTYPE ' + options.docType + '>';
	            }
	        } else {
	            // our config is a boolean value, so just add xml header
	            xmlheader = xml_header();
	        }
	    }
	    options = options || {};

	    var ret = [
	        xmlheader,
	        (options.prettyPrint && docType ? '\n' : ''),
	        docType,
	        process_to_xml(obj, options)
	    ];
	    return ret.join('').replace(/\n{2,}/g, '\n').replace(/\s+$/g, '');
	};

	function camSafeUrlEncode(str) {
	    return encodeURIComponent(str)
	        .replace(/!/g, '%21')
	        .replace(/'/g, '%27')
	        .replace(/\(/g, '%28')
	        .replace(/\)/g, '%29')
	        .replace(/\*/g, '%2A');
	}

	//测试用的key后面可以去掉
	var getAuth$1 = function (opt) {
	    opt = opt || {};

	    var SecretId = opt.SecretId;
	    var SecretKey = opt.SecretKey;
	    var KeyTime = opt.KeyTime;
	    var method = (opt.method || opt.Method || 'get').toLowerCase();
	    var queryParams = clone(opt.Query || opt.params || {});
	    var headers = clone(opt.Headers || opt.headers || {});

	    var Key = opt.Key || '';
	    var pathname;
	    if (opt.UseRawKey) {
	        pathname = opt.Pathname || opt.pathname || '/' + Key;
	    } else {
	        pathname = opt.Pathname || opt.pathname || Key;
	        pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);
	    }

	    if (!SecretId) throw new Error('missing param SecretId');
	    if (!SecretKey) throw new Error('missing param SecretKey');

	    var getObjectKeys = function (obj, forKey) {
	        var list = [];
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                list.push(forKey ? camSafeUrlEncode(key).toLowerCase() : key);
	            }
	        }
	        return list.sort(function (a, b) {
	            a = a.toLowerCase();
	            b = b.toLowerCase();
	            return a === b ? 0 : (a > b ? 1 : -1);
	        });
	    };

	    var obj2str = function (obj) {
	        var i, key, val;
	        var list = [];
	        var keyList = getObjectKeys(obj);
	        for (i = 0; i < keyList.length; i++) {
	            key = keyList[i];
	            val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
	            key = camSafeUrlEncode(key).toLowerCase();
	            val = camSafeUrlEncode(val) || '';
	            list.push(key + '=' + val);
	        }
	        return list.join('&');
	    };

	    // 签名有效起止时间
	    var now = Math.round(getSkewTime(opt.SystemClockOffset) / 1000) - 1;
	    var exp = now;

	    var Expires = opt.Expires || opt.expires;
	    if (Expires === undefined) {
	        exp += 900; // 签名过期时间为当前 + 900s
	    } else {
	        exp += (Expires * 1) || 0;
	    }

	    // 要用到的 Authorization 参数列表
	    var qSignAlgorithm = 'sha1';
	    var qAk = SecretId;
	    var qSignTime = KeyTime || now + ';' + exp;
	    var qKeyTime = KeyTime || now + ';' + exp;
	    var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
	    var qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase();

	    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
	    // 步骤一：计算 SignKey
	    var signKey = crypto.HmacSHA1(qKeyTime, SecretKey).toString();

	    // 步骤二：构成 FormatString
	    var formatString = [method, pathname, obj2str(queryParams), obj2str(headers), ''].join('\n');

	    // 步骤三：计算 StringToSign
	    var stringToSign = ['sha1', qSignTime, crypto.SHA1(formatString).toString(), ''].join('\n');

	    // 步骤四：计算 Signature
	    var qSignature = crypto.HmacSHA1(stringToSign, signKey).toString();

	    // 步骤五：构造 Authorization
	    var authorization = [
	        'q-sign-algorithm=' + qSignAlgorithm,
	        'q-ak=' + qAk,
	        'q-sign-time=' + qSignTime,
	        'q-key-time=' + qKeyTime,
	        'q-header-list=' + qHeaderList,
	        'q-url-param-list=' + qUrlParamList,
	        'q-signature=' + qSignature
	    ].join('&');

	    return authorization;

	};

	var readIntBE = function (chunk, size, offset) {
	    var bytes = size / 8;
	    var buf = chunk.slice(offset, offset + bytes);
	    new Uint8Array(buf).reverse();
	    return new ({8: Uint8Array, 16: Uint16Array, 32: Uint32Array})[size](buf)[0];
	};
	var buf2str = function (chunk, start, end, isUtf8) {
	    var buf = chunk.slice(start, end);
	    var str = '';
	    new Uint8Array(buf).forEach(function (charCode) {
	        str += String.fromCharCode(charCode);
	    });
	    if (isUtf8) str = decodeURIComponent(escape(str));
	    return str;
	};
	var parseSelectPayload = function (chunk) {
	    var header = {};
	    var body = buf2str(chunk);
	    var result = {records:[]};
	    while (chunk.byteLength) {
	        var totalLength = readIntBE(chunk, 32, 0);
	        var headerLength = readIntBE(chunk, 32, 4);
	        var payloadRestLength = totalLength - headerLength - 16;
	        var offset = 0;
	        var content;
	        chunk = chunk.slice(12);
	        // 获取 Message 的 header 信息
	        while (offset < headerLength) {
	            var headerNameLength = readIntBE(chunk, 8, offset);
	            var headerName = buf2str(chunk, offset + 1, offset + 1 + headerNameLength);
	            var headerValueLength = readIntBE(chunk, 16, offset + headerNameLength + 2);
	            var headerValue = buf2str(chunk, offset + headerNameLength + 4, offset + headerNameLength + 4 + headerValueLength);
	            header[headerName] = headerValue;
	            offset += headerNameLength + 4 + headerValueLength;
	        }
	        if (header[':event-type'] === 'Records') {
	            content = buf2str(chunk, offset, offset + payloadRestLength, true);
	            result.records.push(content);
	        } else if (header[':event-type'] === 'Stats') {
	            content = buf2str(chunk, offset, offset + payloadRestLength, true);
	            result.stats = util.xml2json(content).Stats;
	        } else if (header[':event-type'] === 'error') {
	            var errCode = header[':error-code'];
	            var errMessage = header[':error-message'];
	            var err = new Error(errMessage);
	            err.message = errMessage;
	            err.name = err.code = errCode;
	            result.error = err;
	        } else ;
	        chunk = chunk.slice(offset + payloadRestLength + 4);
	    }
	    return {
	        payload: result.records.join(''),
	        body: body,
	    };
	};

	var noop = function () {

	};

	// 清除对象里值为的 undefined 或 null 的属性
	var clearKey = function (obj) {
	    var retObj = {};
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
	            retObj[key] = obj[key];
	        }
	    }
	    return retObj;
	};

	var readAsBinaryString = function (blob, callback) {
	    var readFun;
	    var fr = new FileReader();
	    if (FileReader.prototype.readAsBinaryString) {
	        readFun = FileReader.prototype.readAsBinaryString;
	        fr.onload = function () {
	            callback(this.result);
	        };
	    } else if (FileReader.prototype.readAsArrayBuffer) { // 在 ie11 添加 readAsBinaryString 兼容
	        readFun = function (fileData) {
	            var binary = "";
	            var reader = new FileReader();
	            reader.onload = function (e) {
	                var bytes = new Uint8Array(reader.result);
	                var length = bytes.byteLength;
	                for (var i = 0; i < length; i++) {
	                    binary += String.fromCharCode(bytes[i]);
	                }
	                callback(binary);
	            };
	            reader.readAsArrayBuffer(fileData);
	        };
	    } else {
	        console.error('FileReader not support readAsBinaryString');
	    }
	    readFun.call(fr, blob);
	};

	var fileSliceNeedCopy = (function () {
	    var compareVersion = function(a, b) {
	        a = a.split('.');
	        b = b.split('.');
	        for (var i = 0; i < b.length; i++) {
	            if (a[i] !== b[i]) {
	                return parseInt(a[i]) > parseInt(b[i]) ? 1 : -1;
	            }
	        }
	        return 0;
	    };
	    var check = function (ua) {
	        var ChromeVersion = (ua.match(/Chrome\/([.\d]+)/) || [])[1];
	        var QBCoreVersion = (ua.match(/QBCore\/([.\d]+)/) || [])[1];
	        var QQBrowserVersion = (ua.match(/QQBrowser\/([.\d]+)/) || [])[1];
	        var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0
	            && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0
	            && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;
	        return need;
	    };
	    return check(navigator && navigator.userAgent);
	})();

	// 获取文件分片
	var fileSlice = function (file, start, end, isUseToUpload, callback) {
	    var blob;
	    if (file.slice) {
	        blob = file.slice(start, end);
	    } else if (file.mozSlice) {
	        blob = file.mozSlice(start, end);
	    } else if (file.webkitSlice) {
	        blob = file.webkitSlice(start, end);
	    }
	    if (isUseToUpload && fileSliceNeedCopy) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            blob = null;
	            callback(new Blob([reader.result]));
	        };
	        reader.readAsArrayBuffer(blob);
	    } else {
	        callback(blob);
	    }
	};

	// 获取文件内容的 MD5
	var getBodyMd5 = function (UploadCheckContentMd5, Body, callback, onProgress) {
	    callback = callback || noop;
	    if (UploadCheckContentMd5) {
	        if (typeof Body === 'string') {
	            callback(util.md5(Body, true));
	        } else if (Blob && Body instanceof Blob) {
	            util.getFileMd5(Body, function (err, md5) {
	                callback(md5);
	            }, onProgress);
	        } else {
	            callback();
	        }
	    } else {
	        callback();
	    }
	};

	// 获取文件 md5 值
	var md5ChunkSize = 1024 * 1024;
	var getFileMd5 = function (blob, callback, onProgress) {
	    var size = blob.size;
	    var loaded = 0;
	    var md5ctx = md5.getCtx();
	    var next = function (start) {
	        if (start >= size) {
	            var hash = md5ctx.digest('hex');
	            callback(null, hash);
	            return;
	        }
	        var end = Math.min(size, start + md5ChunkSize);
	        util.fileSlice(blob, start, end, false, function (chunk) {
	            readAsBinaryString(chunk, function (content) {
	                chunk = null;
	                md5ctx = md5ctx.update(content, true);
	                loaded += content.length;
	                content = null;
	                if (onProgress) onProgress({loaded: loaded, total: size, percent: Math.round(loaded / size * 10000) / 10000});
	                next(start + md5ChunkSize);
	            });
	        });
	    };
	    next(0);
	};

	function clone(obj) {
	    return map(obj, function (v) {
	        return typeof v === 'object' && v !== null ? clone(v) : v;
	    });
	}

	function attr(obj, name, defaultValue) {
	    return obj && name in obj ? obj[name] : defaultValue;
	}

	function extend(target, source) {
	    each(source, function (val, key) {
	        target[key] = source[key];
	    });
	    return target;
	}

	function isArray(arr) {
	    return arr instanceof Array;
	}

	function isInArray(arr, item) {
	    var flag = false;
	    for (var i = 0; i < arr.length; i++) {
	        if (item === arr[i]) {
	            flag = true;
	            break;
	        }
	    }
	    return flag;
	}

	function makeArray(arr) {
	    return isArray(arr) ? arr : [arr];
	}

	function each(obj, fn) {
	    for (var i in obj) {
	        if (obj.hasOwnProperty(i)) {
	            fn(obj[i], i);
	        }
	    }
	}

	function map(obj, fn) {
	    var o = isArray(obj) ? [] : {};
	    for (var i in obj) {
	        if (obj.hasOwnProperty(i)) {
	            o[i] = fn(obj[i], i);
	        }
	    }
	    return o;
	}

	function filter(obj, fn) {
	    var iaArr = isArray(obj);
	    var o = iaArr ? [] : {};
	    for (var i in obj) {
	        if (obj.hasOwnProperty(i)) {
	            if (fn(obj[i], i)) {
	                if (iaArr) {
	                    o.push(obj[i]);
	                } else {
	                    o[i] = obj[i];
	                }
	            }
	        }
	    }
	    return o;
	}

	var binaryBase64 = function (str) {
	    var i, len, char, res = '';
	    for (i = 0, len = str.length / 2; i < len; i++) {
	        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
	        res += String.fromCharCode(char);
	    }
	    return btoa(res);
	};
	var uuid = function () {
	    var S4 = function () {
	        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    };
	    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	};

	var hasMissingParams = function (apiName, params) {
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {
	        if (!Bucket) return 'Bucket';
	        if (!Region) return 'Region';
	    } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {
	        if (!Bucket) return 'Bucket';
	        if (!Region) return 'Region';
	        if (!Key) return 'Key';
	    }
	    return false;
	};

	var formatParams = function (apiName, params) {

	    // 复制参数对象
	    params = extend({}, params);

	    // 统一处理 Headers
	    if (apiName !== 'getAuth' && apiName !== 'getV4Auth' && apiName !== 'getObjectUrl') {
	        var Headers = params.Headers || {};
	        if (params && typeof params === 'object') {
	            (function () {
	                for (var key in params) {
	                    if (params.hasOwnProperty(key) && key.indexOf('x-cos-') > -1) {
	                        Headers[key] = params[key];
	                    }
	                }
	            })();

	            var headerMap = {
	                // params headers
	                'x-cos-mfa': 'MFA',
	                'Content-MD5': 'ContentMD5',
	                'Content-Length': 'ContentLength',
	                'Content-Type': 'ContentType',
	                'Expect': 'Expect',
	                'Expires': 'Expires',
	                'Cache-Control': 'CacheControl',
	                'Content-Disposition': 'ContentDisposition',
	                'Content-Encoding': 'ContentEncoding',
	                'Range': 'Range',
	                'If-Modified-Since': 'IfModifiedSince',
	                'If-Unmodified-Since': 'IfUnmodifiedSince',
	                'If-Match': 'IfMatch',
	                'If-None-Match': 'IfNoneMatch',
	                'x-cos-copy-source': 'CopySource',
	                'x-cos-copy-source-Range': 'CopySourceRange',
	                'x-cos-metadata-directive': 'MetadataDirective',
	                'x-cos-copy-source-If-Modified-Since': 'CopySourceIfModifiedSince',
	                'x-cos-copy-source-If-Unmodified-Since': 'CopySourceIfUnmodifiedSince',
	                'x-cos-copy-source-If-Match': 'CopySourceIfMatch',
	                'x-cos-copy-source-If-None-Match': 'CopySourceIfNoneMatch',
	                'x-cos-acl': 'ACL',
	                'x-cos-grant-read': 'GrantRead',
	                'x-cos-grant-write': 'GrantWrite',
	                'x-cos-grant-full-control': 'GrantFullControl',
	                'x-cos-grant-read-acp': 'GrantReadAcp',
	                'x-cos-grant-write-acp': 'GrantWriteAcp',
	                'x-cos-storage-class': 'StorageClass',
	                'x-cos-traffic-limit': 'TrafficLimit',
	                // SSE-C
	                'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',
	                'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',
	                'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',
	                // SSE-COS、SSE-KMS
	                'x-cos-server-side-encryption': 'ServerSideEncryption',
	                'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',
	                'x-cos-server-side-encryption-context': 'SSEContext',
	            };
	            util.each(headerMap, function (paramKey, headerKey) {
	                if (params[paramKey] !== undefined) {
	                    Headers[headerKey] = params[paramKey];
	                }
	            });

	            params.Headers = clearKey(Headers);
	        }
	    }

	    return params;
	};

	var apiWrapper = function (apiName, apiFn) {
	    return function (params, callback) {

	        var self = this;

	        // 处理参数
	        if (typeof params === 'function') {
	            callback = params;
	            params = {};
	        }

	        // 整理参数格式
	        params = formatParams(apiName, params);

	        // 代理回调函数
	        var formatResult = function (result) {
	            if (result && result.headers) {
	                result.headers['x-cos-request-id'] && (result.RequestId = result.headers['x-cos-request-id']);
	                result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
	                result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
	            }
	            return result;
	        };
	        var _callback = function (err, data) {
	            callback && callback(formatResult(err), formatResult(data));
	        };

	        var checkParams = function () {
	            if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
	                // 判断参数是否完整
	                var missingResult = hasMissingParams(apiName, params);
	                if (missingResult) {
	                    return 'missing param ' + missingResult;
	                }
	                // 判断 region 格式
	                if (params.Region) {
	                    if (params.Region.indexOf('cos.') > -1) {
	                        return 'param Region should not be start with "cos."';
	                    } else if (!/^([a-z\d-]+)$/.test(params.Region)) {
	                        return 'Region format error.';
	                    }
	                    // 判断 region 格式
	                    if (!self.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default') {
	                        console.warn('warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');
	                    }
	                }
	                // 兼容不带 AppId 的 Bucket
	                if (params.Bucket) {
	                    if (!/^([a-z\d-]+)-(\d+)$/.test(params.Bucket)) {
	                        if (params.AppId) {
	                            params.Bucket = params.Bucket + '-' + params.AppId;
	                        } else if (self.options.AppId) {
	                            params.Bucket = params.Bucket + '-' + self.options.AppId;
	                        } else {
	                            return 'Bucket should format as "test-1250000000".';
	                        }
	                    }
	                    if (params.AppId) {
	                        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).');
	                        delete params.AppId;
	                    }
	                }
	                // 如果 Key 是 / 开头，强制去掉第一个 /
	                if (!self.options.UseRawKey && params.Key && params.Key.substr(0, 1) === '/') {
	                    params.Key = params.Key.substr(1);
	                }
	            }
	        };

	        var errMsg = checkParams();
	        var isSync = apiName === 'getAuth' || apiName === 'getObjectUrl';
	        if (Promise && !isSync && !callback) {
	            return new Promise(function (resolve, reject) {
	                callback = function (err, data) {
	                    err ? reject(err) : resolve(data);
	                };
	                if (errMsg) return _callback(util.error(new Error(errMsg)));
	                apiFn.call(self, params, _callback);
	            });
	        } else {
	            if (errMsg) return _callback(util.error(new Error(errMsg)));
	            var res = apiFn.call(self, params, _callback);
	            if (isSync) return res;
	        }
	    }
	};

	var throttleOnProgress = function (total, onProgress) {
	    var self = this;
	    var size0 = 0;
	    var size1 = 0;
	    var time0 = Date.now();
	    var time1;
	    var timer;

	    function update() {
	        timer = 0;
	        if (onProgress && (typeof onProgress === 'function')) {
	            time1 = Date.now();
	            var speed = Math.max(0, Math.round((size1 - size0) / ((time1 - time0) / 1000) * 100) / 100) || 0;
	            var percent;
	            if (size1 === 0 && total === 0) {
	                percent = 1;
	            } else {
	                percent = Math.floor(size1 / total * 100) / 100 || 0;
	            }
	            time0 = time1;
	            size0 = size1;
	            try {
	                onProgress({loaded: size1, total: total, speed: speed, percent: percent});
	            } catch (e) {
	            }
	        }
	    }

	    return function (info, immediately) {
	        if (info) {
	            size1 = info.loaded;
	            total = info.total;
	        }
	        if (immediately) {
	            clearTimeout(timer);
	            update();
	        } else {
	            if (timer) return;
	            timer = setTimeout(update, self.options.ProgressInterval);
	        }
	    };
	};

	var getFileSize = function (api, params, callback) {
	    var size;
	    if (typeof params.Body === 'string') {
	        params.Body = new Blob([params.Body], {type: 'text/plain'});
	    } else if (params.Body instanceof ArrayBuffer) {
	        params.Body = new Blob([params.Body]);
	    }
	    if ((params.Body && (params.Body instanceof Blob || params.Body.toString() === '[object File]' || params.Body.toString() === '[object Blob]'))) {
	        size = params.Body.size;
	    } else {
	        callback(util.error(new Error('params body format error, Only allow File|Blob|String.')));
	        return;
	    }
	    params.ContentLength = size;
	    callback(null, size);
	};

	// 获取调正的时间戳
	var getSkewTime = function (offset) {
	    return Date.now() + (offset || 0);
	};


	var error = function (err, opt) {
	    var sourceErr = err;
	    err.message = err.message || null;

	    if (typeof opt === 'string') {
	        err.error = opt;
	        err.message = opt;
	    } else if (typeof opt === 'object' && opt !== null) {
	        extend(err, opt);
	        if (opt.code || opt.name) err.code = opt.code || opt.name;
	        if (opt.message) err.message = opt.message;
	        if (opt.stack) err.stack = opt.stack;
	    }

	    if (typeof Object.defineProperty === 'function') {
	        Object.defineProperty(err, 'name', {writable: true, enumerable: false});
	        Object.defineProperty(err, 'message', {enumerable: true});
	    }

	    err.name = opt && opt.name || err.name || err.code || 'Error';
	    if (!err.code) err.code = err.name;
	    if (!err.error) err.error = clone(sourceErr); // 兼容老的错误格式

	    return err;
	};

	var util = {
	    noop: noop,
	    formatParams: formatParams,
	    apiWrapper: apiWrapper,
	    xml2json: xml2json_1,
	    json2xml: json2xml,
	    md5: md5,
	    clearKey: clearKey,
	    fileSlice: fileSlice,
	    getBodyMd5: getBodyMd5,
	    getFileMd5: getFileMd5,
	    binaryBase64: binaryBase64,
	    extend: extend,
	    isArray: isArray,
	    isInArray: isInArray,
	    makeArray: makeArray,
	    each: each,
	    map: map,
	    filter: filter,
	    clone: clone,
	    attr: attr,
	    uuid: uuid,
	    camSafeUrlEncode: camSafeUrlEncode,
	    throttleOnProgress: throttleOnProgress,
	    getFileSize: getFileSize,
	    getSkewTime: getSkewTime,
	    error: error,
	    getAuth: getAuth$1,
	    parseSelectPayload: parseSelectPayload,
	    isBrowser: true,
	};

	var util_1 = util;

	var initEvent = function (cos) {
	    var listeners = {};
	    var getList = function (action) {
	        !listeners[action] && (listeners[action] = []);
	        return listeners[action];
	    };
	    cos.on = function (action, callback) {
	        if (action === 'task-list-update') {
	            console.warn('warning: Event "' + action + '" has been deprecated. Please use "list-update" instead.');
	        }
	        getList(action).push(callback);
	    };
	    cos.off = function (action, callback) {
	        var list = getList(action);
	        for (var i = list.length - 1; i >= 0; i--) {
	            callback === list[i] && list.splice(i, 1);
	        }
	    };
	    cos.emit = function (action, data) {
	        var list = getList(action).map(function (cb) {
	            return cb;
	        });
	        for (var i = 0; i < list.length; i++) {
	            list[i](data);
	        }
	    };
	};

	var EventProxy$1 = function () {
	    initEvent(this);
	};

	var init$4 = initEvent;
	var EventProxy_1 = EventProxy$1;

	var event = {
		init: init$4,
		EventProxy: EventProxy_1
	};

	// 按照文件特征值，缓存 UploadId
	var cacheKey = 'cos_sdk_upload_cache';
	var expires = 30 * 24 * 3600;
	var cache;
	var timer;

	var getCache = function () {
	    try {
	        var val = JSON.parse(localStorage.getItem(cacheKey));
	    } catch (e) {
	    }
	    if (!val) val = [];
	    cache = val;
	};
	var setCache = function () {
	    try {
	        localStorage.setItem(cacheKey, JSON.stringify(cache));
	    } catch (e) {
	    }
	};

	var init$3 = function () {
	    if (cache) return;
	    getCache.call(this);
	    // 清理太老旧的数据
	    var changed = false;
	    var now = Math.round(Date.now() / 1000);
	    for (var i = cache.length - 1; i >= 0; i--) {
	        var mtime = cache[i][2];
	        if (!mtime || mtime + expires < now) {
	            cache.splice(i, 1);
	            changed = true;
	        }
	    }
	    changed && setCache();
	};

	// 把缓存存到本地
	var save = function () {
	    if (timer) return;
	    timer = setTimeout(function () {
	        setCache();
	        timer = null;
	    }, 400);
	};

	var mod = {
	    using: {},
	    // 标记 UploadId 正在使用
	    setUsing: function (uuid) {
	        mod.using[uuid] = true;
	    },
	    // 标记 UploadId 已经没在使用
	    removeUsing: function (uuid) {
	        delete mod.using[uuid];
	    },
	    // 用上传参数生成哈希值
	    getFileId: function (file, ChunkSize, Bucket, Key) {
	        if (file.name && file.size && file.lastModifiedDate && ChunkSize) {
	            return util_1.md5([file.name, file.size, file.lastModifiedDate, ChunkSize, Bucket, Key].join('::'));
	        } else {
	            return null;
	        }
	    },
	    // 获取文件对应的 UploadId 列表
	    getUploadIdList: function (uuid) {
	        if (!uuid) return null;
	        init$3.call(this);
	        var list = [];
	        for (var i = 0; i < cache.length; i++) {
	            if (cache[i][0] === uuid)
	                list.push(cache[i][1]);
	        }
	        return list.length ? list : null;
	    },
	    // 缓存 UploadId
	    saveUploadId: function (uuid, UploadId, limit) {
	        init$3.call(this);
	        if (!uuid) return;
	        // 清理没用的 UploadId，js 文件没有 FilePath ，只清理相同记录
	        for (var i = cache.length - 1; i >= 0; i--) {
	            var item = cache[i];
	            if (item[0] === uuid && item[1] === UploadId) {
	                cache.splice(i, 1);
	            }
	        }
	        cache.unshift([uuid, UploadId, Math.round(Date.now() / 1000)]);
	        if (cache.length > limit) cache.splice(limit);
	        save();
	    },
	    // UploadId 已用完，移除掉
	    removeUploadId: function (UploadId) {
	        init$3.call(this);
	        delete mod.using[UploadId];
	        for (var i = cache.length - 1; i >= 0; i--) {
	            if (cache[i][1] === UploadId) cache.splice(i, 1);
	        }
	        save();
	    },
	};

	var session = mod;

	var originApiMap = {};
	var transferToTaskMethod = function (apiMap, apiName) {
	    originApiMap[apiName] = apiMap[apiName];
	    apiMap[apiName] = function (params, callback) {
	        if (params.SkipTask) {
	            originApiMap[apiName].call(this, params, callback);
	        } else {
	            this._addTask(apiName, params, callback);
	        }
	    };
	};

	var initTask = function (cos) {

	    var queue = [];
	    var tasks = {};
	    var uploadingFileCount = 0;
	    var nextUploadIndex = 0;

	    // 接口返回简略的任务信息
	    var formatTask = function (task) {
	        var t = {
	            id: task.id,
	            Bucket: task.Bucket,
	            Region: task.Region,
	            Key: task.Key,
	            FilePath: task.FilePath,
	            state: task.state,
	            loaded: task.loaded,
	            size: task.size,
	            speed: task.speed,
	            percent: task.percent,
	            hashPercent: task.hashPercent,
	            error: task.error,
	        };
	        if (task.FilePath) t.FilePath = task.FilePath;
	        if (task._custom) t._custom = task._custom; // 控制台使用
	        return t;
	    };

	    var emitListUpdate = (function () {
	        var timer;
	        var emit = function () {
	            timer = 0;
	            cos.emit('task-list-update', {list: util_1.map(queue, formatTask)});
	            cos.emit('list-update', {list: util_1.map(queue, formatTask)});
	        };
	        return function () {
	            if (!timer) timer = setTimeout(emit);
	        }
	    })();

	    var clearQueue = function () {
	        if (queue.length <= cos.options.UploadQueueSize) return;
	        for (var i = 0;
	             i < nextUploadIndex && // 小于当前操作的 index 才清理
	             i < queue.length && // 大于队列才清理
	             queue.length > cos.options.UploadQueueSize // 如果还太多，才继续清理
	            ;) {
	            var isActive = queue[i].state === 'waiting' || queue[i].state === 'checking' || queue[i].state === 'uploading';
	            if (!queue[i] || !isActive) {
	                tasks[queue[i].id] && (delete tasks[queue[i].id]);
	                queue.splice(i, 1);
	                nextUploadIndex--;
	            } else {
	                i++;
	            }
	        }
	        emitListUpdate();
	    };

	    var startNextTask = function () {
	        // 检查是否允许增加执行进程
	        if (uploadingFileCount >= cos.options.FileParallelLimit) return;
	        // 跳过不可执行的任务
	        while (queue[nextUploadIndex] && queue[nextUploadIndex].state !== 'waiting') nextUploadIndex++;
	        // 检查是否已遍历结束
	        if (nextUploadIndex >= queue.length) return;
	        // 上传该遍历到的任务
	        var task = queue[nextUploadIndex];
	        nextUploadIndex++;
	        uploadingFileCount++;
	        task.state = 'checking';
	        task.params.onTaskStart && task.params.onTaskStart(formatTask(task));
	        !task.params.UploadData && (task.params.UploadData = {});
	        var apiParams = util_1.formatParams(task.api, task.params);
	        originApiMap[task.api].call(cos, apiParams, function (err, data) {
	            if (!cos._isRunningTask(task.id)) return;
	            if (task.state === 'checking' || task.state === 'uploading') {
	                task.state = err ? 'error' : 'success';
	                err && (task.error = err);
	                uploadingFileCount--;
	                emitListUpdate();
	                startNextTask();
	                task.callback && task.callback(err, data);
	                if (task.state === 'success') {
	                    if (task.params) {
	                        delete task.params.UploadData;
	                        delete task.params.Body;
	                        delete task.params;
	                    }
	                    delete task.callback;
	                }
	            }
	            clearQueue();
	        });
	        emitListUpdate();
	        // 异步执行下一个任务
	        setTimeout(startNextTask);
	    };

	    var killTask = function (id, switchToState) {
	        var task = tasks[id];
	        if (!task) return;
	        var waiting = task && task.state === 'waiting';
	        var running = task && (task.state === 'checking' || task.state === 'uploading');
	        if (switchToState === 'canceled' && task.state !== 'canceled' ||
	            switchToState === 'paused' && waiting ||
	            switchToState === 'paused' && running) {
	            if (switchToState === 'paused' && task.params.Body && typeof task.params.Body.pipe === 'function') {
	                console.error('stream not support pause');
	                return;
	            }
	            task.state = switchToState;
	            cos.emit('inner-kill-task', {TaskId: id, toState: switchToState});
	            try {
	                var UploadId = task && task.params && task.params.UploadData.UploadId;
	            } catch(e) {}
	            if (switchToState === 'canceled' && UploadId) session.removeUsing(UploadId);
	            emitListUpdate();
	            if (running) {
	                uploadingFileCount--;
	                startNextTask();
	            }
	            if (switchToState === 'canceled') {
	                if (task.params) {
	                    delete task.params.UploadData;
	                    delete task.params.Body;
	                    delete task.params;
	                }
	                delete task.callback;
	            }
	        }
	        clearQueue();
	    };

	    cos._addTasks = function (taskList) {
	        util_1.each(taskList, function (task) {
	            cos._addTask(task.api, task.params, task.callback, true);
	        });
	        emitListUpdate();
	    };

	    var isTaskReadyWarning = true;
	    cos._addTask = function (api, params, callback, ignoreAddEvent) {

	        // 复制参数对象
	        params = util_1.formatParams(api, params);

	        // 生成 id
	        var id = util_1.uuid();
	        params.TaskId = id;
	        params.onTaskReady && params.onTaskReady(id);
	        if (params.TaskReady) {
	            params.TaskReady(id);
	            isTaskReadyWarning && console.warn('warning: Param "TaskReady" has been deprecated. Please use "onTaskReady" instead.');
	            isTaskReadyWarning = false;
	        }

	        var task = {
	            // env
	            params: params,
	            callback: callback,
	            api: api,
	            index: queue.length,
	            // task
	            id: id,
	            Bucket: params.Bucket,
	            Region: params.Region,
	            Key: params.Key,
	            FilePath: params.FilePath || '',
	            state: 'waiting',
	            loaded: 0,
	            size: 0,
	            speed: 0,
	            percent: 0,
	            hashPercent: 0,
	            error: null,
	            _custom: params._custom,
	        };
	        var onHashProgress = params.onHashProgress;
	        params.onHashProgress = function (info) {
	            if (!cos._isRunningTask(task.id)) return;
	            task.hashPercent = info.percent;
	            onHashProgress && onHashProgress(info);
	            emitListUpdate();
	        };
	        var onProgress = params.onProgress;
	        params.onProgress = function (info) {
	            if (!cos._isRunningTask(task.id)) return;
	            task.state === 'checking' && (task.state = 'uploading');
	            task.loaded = info.loaded;
	            task.speed = info.speed;
	            task.percent = info.percent;
	            onProgress && onProgress(info);
	            emitListUpdate();
	        };

	        // 异步获取 filesize
	        util_1.getFileSize(api, params, function (err, size) {
	            // 开始处理上传
	            if (err) return callback(util_1.error(err)); // 如果获取大小出错，不加入队列
	            // 获取完文件大小再把任务加入队列
	            tasks[id] = task;
	            queue.push(task);
	            task.size = size;
	            !ignoreAddEvent && emitListUpdate();
	            startNextTask();
	            clearQueue();
	        });
	        return id;
	    };
	    cos._isRunningTask = function (id) {
	        var task = tasks[id];
	        return !!(task && (task.state === 'checking' || task.state === 'uploading'));
	    };
	    cos.getTaskList = function () {
	        return util_1.map(queue, formatTask);
	    };
	    cos.cancelTask = function (id) {
	        killTask(id, 'canceled');
	    };
	    cos.pauseTask = function (id) {
	        killTask(id, 'paused');
	    };
	    cos.restartTask = function (id) {
	        var task = tasks[id];
	        if (task && (task.state === 'paused' || task.state === 'error')) {
	            task.state = 'waiting';
	            emitListUpdate();
	            nextUploadIndex = Math.min(nextUploadIndex, task.index);
	            startNextTask();
	        }
	    };
	    cos.isUploadRunning = function () {
	        return uploadingFileCount || nextUploadIndex < queue.length;
	    };

	};

	var transferToTaskMethod_1 = transferToTaskMethod;
	var init$2 = initTask;

	var task = {
		transferToTaskMethod: transferToTaskMethod_1,
		init: init$2
	};

	var stringifyPrimitive = function(v) {
	    switch (typeof v) {
	        case 'string':
	            return v;
	        case 'boolean':
	            return v ? 'true' : 'false';
	        case 'number':
	            return isFinite(v) ? v : '';
	        default:
	            return '';
	    }
	};

	var queryStringify = function(obj, sep, eq, name) {
	    sep = sep || '&';
	    eq = eq || '=';
	    if (obj === null) {
	        obj = undefined;
	    }
	    if (typeof obj === 'object') {
	        return Object.keys(obj).map(function(k) {
	            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	            if (Array.isArray(obj[k])) {
	                return obj[k].map(function(v) {
	                    return ks + encodeURIComponent(stringifyPrimitive(v));
	                }).join(sep);
	            } else {
	                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	            }
	        }).filter(Boolean).join(sep);

	    }
	    if (!name) return '';
	    return encodeURIComponent(stringifyPrimitive(name)) + eq +
	        encodeURIComponent(stringifyPrimitive(obj));
	};

	var xhrRes = function (err, xhr, body) {
	    var headers = {};
	    xhr.getAllResponseHeaders().trim().split('\n').forEach(function (item) {
	        if (item) {
	            var index = item.indexOf(':');
	            var key = item.substr(0, index).trim().toLowerCase();
	            var val = item.substr(index + 1).trim();
	            headers[key] = val;
	        }
	    });
	    return {
	        error: err,
	        statusCode: xhr.status,
	        statusMessage: xhr.statusText,
	        headers: headers,
	        body: body,
	    };
	};

	var xhrBody = function (xhr, dataType) {
	    return !dataType && dataType === 'text' ? xhr.responseText : xhr.response;
	};

	var request$1 = function (opt, callback) {

	    // method
	    var method = (opt.method || 'GET').toUpperCase();

	    // url、qs
	    var url = opt.url;
	    if (opt.qs) {
	        var qsStr = queryStringify(opt.qs);
	        if (qsStr) {
	            url += (url.indexOf('?') === -1 ? '?' : '&') + qsStr;
	        }
	    }

	    // 创建 ajax 实例
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url, true);
	    xhr.responseType = opt.dataType || 'text';

	    // 处理 headers
	    var headers = opt.headers;
	    if (headers) {
	        for (var key in headers) {
	            if (headers.hasOwnProperty(key) &&
	                key.toLowerCase() !== 'content-length' &&
	                key.toLowerCase() !== 'user-agent' &&
	                key.toLowerCase() !== 'origin' &&
	                key.toLowerCase() !== 'host') {
	                xhr.setRequestHeader(key, headers[key]);
	            }
	        }
	    }

	    // onprogress
	    if (opt.onProgress && xhr.upload) xhr.upload.onprogress = opt.onProgress;
	    if (opt.onDownloadProgress) xhr.onprogress = opt.onDownloadProgress;

	    // success 2xx/3xx/4xx
	    xhr.onload = function () {
	        callback(xhrRes(null, xhr, xhrBody(xhr, opt.dataType)));
	    };

	    // error 5xx/0 (网络错误、跨域报错、Https connect-src 限制的报错时 statusCode 为 0)
	    xhr.onerror = function (err) {
	        var body = xhrBody(xhr, opt.dataType);
	        if (body) { // 5xx
	            callback(xhrRes(null, xhr, body));
	        } else { // 0
	            var error = xhr.statusText;
	            if (!error && xhr.status === 0) error = new Error('CORS blocked or network error');
	            callback(xhrRes(error, xhr, body));
	        }
	    };

	    // send
	    xhr.send(opt.body || '');

	    // 返回 ajax 实例，用于外部调用 xhr.abort
	    return xhr;
	};

	var request_1 = request$1;

	// Bucket 相关

	/**
	 * 获取用户的 bucket 列表
	 * @param  {Object}  params         回调函数，必须，下面为参数列表
	 * 无特殊参数
	 * @param  {Function}  callback     回调函数，必须
	 */
	function getService(params, callback) {

	    if (typeof params === 'function') {
	        callback = params;
	        params = {};
	    }
	    var protocol = this.options.Protocol || (util_1.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
	    var domain = this.options.ServiceDomain;
	    var appId = params.AppId || this.options.appId;
	    var region = params.Region;
	    if (domain) {
	        domain = domain.replace(/\{\{AppId\}\}/ig, appId || '')
	            .replace(/\{\{Region\}\}/ig, region || '').replace(/\{\{.*?\}\}/ig, '');
	        if (!/^[a-zA-Z]+:\/\//.test(domain)) {
	            domain = protocol + '//' + domain;
	        }
	        if (domain.slice(-1) === '/') {
	            domain = domain.slice(0, -1);
	        }
	    } else if (region) {
	        domain = protocol + '//cos.' + region + '.myqcloud.com';
	    } else {
	        domain = protocol + '//service.cos.myqcloud.com';
	    }

	    submitRequest.call(this, {
	        Action: 'name/cos:GetService',
	        url: domain,
	        method: 'GET',
	        headers: params.Headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var buckets = (data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Buckets
	            && data.ListAllMyBucketsResult.Buckets.Bucket) || [];
	        buckets = util_1.isArray(buckets) ? buckets : [buckets];
	        var owner = (data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Owner) || {};
	        callback(null, {
	            Buckets: buckets,
	            Owner: owner,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 创建 Bucket，并初始化访问权限
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
	 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
	 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
	 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          返回的数据
	 *     @return  {String}  data.Location             操作地址
	 */
	function putBucket(params, callback) {

	    var self = this;

	    var xml = '';
	    if(params['BucketAZConfig']){
	        var CreateBucketConfiguration = {
	            BucketAZConfig: params.BucketAZConfig
	        };
	        xml = util_1.json2xml({CreateBucketConfiguration: CreateBucketConfiguration});
	    }

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucket',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        body: xml,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var url = getUrl({
	            protocol: self.options.Protocol,
	            domain: self.options.Domain,
	            bucket: params.Bucket,
	            region: params.Region,
	            isLocation: true,
	        });
	        callback(null, {
	            Location: url,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 查看是否存在该Bucket，是否有权限访问
	 * @param  {Object}  params                     参数对象，必须
	 *     @param  {String}  params.Bucket          Bucket名称，必须
	 *     @param  {String}  params.Region          地域名称，必须
	 * @param  {Function}  callback                 回调函数，必须
	 * @return  {Object}  err                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                      返回的数据
	 *     @return  {Boolean}  data.BucketExist     Bucket是否存在
	 *     @return  {Boolean}  data.BucketAuth      是否有 Bucket 的访问权限
	 */
	function headBucket(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:HeadBucket',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        method: 'HEAD',
	    }, callback);
	}

	/**
	 * 获取 Bucket 下的 object 列表
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 *     @param  {String}  params.Prefix              前缀匹配，用来规定返回的文件前缀地址，非必须
	 *     @param  {String}  params.Delimiter           定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，非必须
	 *     @param  {String}  params.Marker              默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须
	 *     @param  {String}  params.MaxKeys             单次返回最大的条目数量，默认1000，非必须
	 *     @param  {String}  params.EncodingType        规定返回值的编码方式，非必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          返回的数据
	 *     @return  {Object}  data.ListBucketResult     返回的 object 列表信息
	 */
	function getBucket(params, callback) {
	    var reqParams = {};
	    reqParams['prefix'] = params['Prefix'] || '';
	    reqParams['delimiter'] = params['Delimiter'];
	    reqParams['marker'] = params['Marker'];
	    reqParams['max-keys'] = params['MaxKeys'];
	    reqParams['encoding-type'] = params['EncodingType'];

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucket',
	        ResourceKey: reqParams['prefix'],
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        qs: reqParams,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var ListBucketResult = data.ListBucketResult || {};
	        var Contents = ListBucketResult.Contents || [];
	        var CommonPrefixes = ListBucketResult.CommonPrefixes || [];

	        Contents = util_1.isArray(Contents) ? Contents : [Contents];
	        CommonPrefixes = util_1.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];

	        var result = util_1.clone(ListBucketResult);
	        util_1.extend(result, {
	            Contents: Contents,
	            CommonPrefixes: CommonPrefixes,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });

	        callback(null, result);
	    });
	}

	/**
	 * 删除 Bucket
	 * @param  {Object}  params                 参数对象，必须
	 *     @param  {String}  params.Bucket      Bucket名称，必须
	 *     @param  {String}  params.Region      地域名称，必须
	 * @param  {Function}  callback             回调函数，必须
	 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                  返回的数据
	 *     @return  {String}  data.Location     操作地址
	 */
	function deleteBucket(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucket',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        method: 'DELETE',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 的 权限列表
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
	 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
	 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
	 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          返回的数据
	 */
	function putBucketAcl(params, callback) {
	    var headers = params.Headers;

	    var xml = '';
	    if (params['AccessControlPolicy']) {
	        var AccessControlPolicy = util_1.clone(params['AccessControlPolicy'] || {});
	        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
	        Grants = util_1.isArray(Grants) ? Grants : [Grants];
	        delete AccessControlPolicy.Grant;
	        delete AccessControlPolicy.Grants;
	        AccessControlPolicy.AccessControlList = {Grant: Grants};
	        xml = util_1.json2xml({AccessControlPolicy: AccessControlPolicy});

	        headers['Content-Type'] = 'application/xml';
	        headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));
	    }

	    // Grant Header 去重
	    util_1.each(headers, function (val, key) {
	        if (key.indexOf('x-cos-grant-') === 0) {
	            headers[key] = uniqGrant(headers[key]);
	        }
	    });

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketACL',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: headers,
	        action: 'acl',
	        body: xml,
	    }, function (err, data) {
	        if (err) return callback(err);
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的 权限列表
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          返回的数据
	 *     @return  {Object}  data.AccessControlPolicy  访问权限信息
	 */
	function getBucketAcl(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketACL',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'acl',
	    }, function (err, data) {
	        if (err) return callback(err);
	        var AccessControlPolicy = data.AccessControlPolicy || {};
	        var Owner = AccessControlPolicy.Owner || {};
	        var Grant = AccessControlPolicy.AccessControlList.Grant || [];
	        Grant = util_1.isArray(Grant) ? Grant : [Grant];
	        var result = decodeAcl(AccessControlPolicy);
	        if (data.headers && data.headers['x-cos-acl']) {
	            result.ACL = data.headers['x-cos-acl'];
	        }
	        result = util_1.extend(result, {
	            Owner: Owner,
	            Grants: Grant,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	/**
	 * 设置 Bucket 的 跨域设置
	 * @param  {Object}  params                             参数对象，必须
	 *     @param  {String}  params.Bucket                  Bucket名称，必须
	 *     @param  {String}  params.Region                  地域名称，必须
	 *     @param  {Object}  params.CORSConfiguration       相关的跨域设置，必须
	 * @param  {Array}  params.CORSConfiguration.CORSRules  对应的跨域规则
	 * @param  {Function}  callback                         回调函数，必须
	 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                              返回的数据
	 */
	function putBucketCors(params, callback) {

	    var CORSConfiguration = params['CORSConfiguration'] || {};
	    var CORSRules = CORSConfiguration['CORSRules'] || params['CORSRules'] || [];
	    CORSRules = util_1.clone(util_1.isArray(CORSRules) ? CORSRules : [CORSRules]);
	    util_1.each(CORSRules, function (rule) {
	        util_1.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
	            var sKey = key + 's';
	            var val = rule[sKey] || rule[key] || [];
	            delete rule[sKey];
	            rule[key] = util_1.isArray(val) ? val : [val];
	        });
	    });

	    var xml = util_1.json2xml({CORSConfiguration: {CORSRule: CORSRules}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketCORS',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'cors',
	        headers: headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的 跨域设置
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          返回的数据
	 *     @return  {Object}  data.CORSRules            Bucket的跨域设置
	 */
	function getBucketCors(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketCORS',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'cors',
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchCORSConfiguration') {
	                var result = {
	                    CORSRules: [],
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }
	        var CORSConfiguration = data.CORSConfiguration || {};
	        var CORSRules = CORSConfiguration.CORSRules || CORSConfiguration.CORSRule || [];
	        CORSRules = util_1.clone(util_1.isArray(CORSRules) ? CORSRules : [CORSRules]);

	        util_1.each(CORSRules, function (rule) {
	            util_1.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
	                var sKey = key + 's';
	                var val = rule[sKey] || rule[key] || [];
	                delete rule[key];
	                rule[sKey] = util_1.isArray(val) ? val : [val];
	            });
	        });

	        callback(null, {
	            CORSRules: CORSRules,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Bucket 的 跨域设置
	 * @param  {Object}  params                 参数对象，必须
	 *     @param  {String}  params.Bucket      Bucket名称，必须
	 *     @param  {String}  params.Region      地域名称，必须
	 * @param  {Function}  callback             回调函数，必须
	 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                  返回的数据
	 */
	function deleteBucketCors(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketCORS',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'cors',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode || err.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的 地域信息
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据，包含地域信息 LocationConstraint
	 */
	function getBucketLocation(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketLocation',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'location',
	    }, callback);
	}

	function putBucketPolicy(params, callback) {
	    var Policy = params['Policy'];
	    try {
	        if (typeof Policy === 'string') Policy = JSON.parse(Policy);
	    } catch (e) {
	    }
	    if (!Policy || typeof Policy === 'string') return callback(util_1.error(new Error('Policy format error')));
	    var PolicyStr = JSON.stringify(Policy);
	    if (!Policy.version) Policy.version = '2.0';

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/json';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(PolicyStr));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketPolicy',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        action: 'policy',
	        body: PolicyStr,
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的读取权限策略
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketPolicy(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketPolicy',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'policy',
	        rawBody: true,
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode && err.statusCode === 403) {
	                return callback(util_1.error(err, {ErrorStatus: 'Access Denied'}));
	            }
	            if (err.statusCode && err.statusCode === 405) {
	                return callback(util_1.error(err, {ErrorStatus: 'Method Not Allowed'}));
	            }
	            if (err.statusCode && err.statusCode === 404) {
	                return callback(util_1.error(err, {ErrorStatus: 'Policy Not Found'}));
	            }
	            return callback(err);
	        }
	        var Policy = {};
	        try {
	            Policy = JSON.parse(data.body);
	        } catch (e) {
	        }
	        callback(null, {
	            Policy: Policy,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Bucket 的 跨域设置
	 * @param  {Object}  params                 参数对象，必须
	 *     @param  {String}  params.Bucket      Bucket名称，必须
	 *     @param  {String}  params.Region      地域名称，必须
	 * @param  {Function}  callback             回调函数，必须
	 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                  返回的数据
	 */
	function deleteBucketPolicy(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketPolicy',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'policy',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode || err.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 的标签
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 *     @param  {Array}   params.TagSet  标签设置，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function putBucketTagging(params, callback) {

	    var Tagging = params['Tagging'] || {};
	    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
	    Tags = util_1.clone(util_1.isArray(Tags) ? Tags : [Tags]);
	    var xml = util_1.json2xml({Tagging: {TagSet: {Tag: Tags}}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketTagging',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'tagging',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的标签设置
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketTagging(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketTagging',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'tagging',
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
	                var result = {
	                    Tags: [],
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }
	        var Tags = [];
	        try {
	            Tags = data.Tagging.TagSet.Tag || [];
	        } catch (e) {
	        }
	        Tags = util_1.clone(util_1.isArray(Tags) ? Tags : [Tags]);
	        callback(null, {
	            Tags: Tags,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Bucket 的 标签设置
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回的数据
	 */
	function deleteBucketTagging(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketTagging',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'tagging',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function putBucketLifecycle(params, callback) {

	    var LifecycleConfiguration = params['LifecycleConfiguration'] || {};
	    var Rules = LifecycleConfiguration.Rules || params.Rules || [];
	    Rules = util_1.clone(Rules);
	    var xml = util_1.json2xml({LifecycleConfiguration: {Rule: Rules}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketLifecycle',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'lifecycle',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function getBucketLifecycle(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketLifecycle',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'lifecycle',
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchLifecycleConfiguration') {
	                var result = {
	                    Rules: [],
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }
	        var Rules = [];
	        try {
	            Rules = data.LifecycleConfiguration.Rule || [];
	        } catch (e) {
	        }
	        Rules = util_1.clone(util_1.isArray(Rules) ? Rules : [Rules]);
	        callback(null, {
	            Rules: Rules,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function deleteBucketLifecycle(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketLifecycle',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'lifecycle',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function putBucketVersioning(params, callback) {

	    if (!params['VersioningConfiguration']) {
	        callback(util_1.error(new Error('missing param VersioningConfiguration')));
	        return;
	    }
	    var VersioningConfiguration = params['VersioningConfiguration'] || {};
	    var xml = util_1.json2xml({VersioningConfiguration: VersioningConfiguration});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketVersioning',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'versioning',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function getBucketVersioning(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketVersioning',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'versioning',
	    }, function (err, data) {
	        if (!err) {
	            !data.VersioningConfiguration && (data.VersioningConfiguration = {});
	        }
	        callback(err, data);
	    });
	}

	function putBucketReplication(params, callback) {
	    var ReplicationConfiguration = util_1.clone(params.ReplicationConfiguration);
	    var xml = util_1.json2xml({ReplicationConfiguration: ReplicationConfiguration});
	    xml = xml.replace(/<(\/?)Rules>/ig, '<$1Rule>');
	    xml = xml.replace(/<(\/?)Tags>/ig, '<$1Tag>');

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketReplication',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'replication',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function getBucketReplication(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketReplication',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'replication',
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'ReplicationConfigurationnotFoundError')) {
	                var result = {
	                    ReplicationConfiguration: {Rules: []},
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }
	        !data.ReplicationConfiguration && (data.ReplicationConfiguration = {});
	        if (data.ReplicationConfiguration.Rule) {
	            data.ReplicationConfiguration.Rules = util_1.makeArray(data.ReplicationConfiguration.Rule);
	            delete data.ReplicationConfiguration.Rule;
	        }
	        callback(err, data);
	    });
	}

	function deleteBucketReplication(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketReplication',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'replication',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 静态网站配置信息
	 * @param  {Object}  params                                                 参数对象，必须
	 *     @param  {String}  params.Bucket                                      Bucket名称，必须
	 *     @param  {String}  params.Region                                      地域名称，必须
	 *     @param  {Object}  params.WebsiteConfiguration                        地域名称，必须
	 *         @param  {Object}   WebsiteConfiguration.IndexDocument            索引文档，必须
	 *         @param  {Object}   WebsiteConfiguration.ErrorDocument            错误文档，非必须
	 *         @param  {Object}   WebsiteConfiguration.RedirectAllRequestsTo    重定向所有请求，非必须
	 *         @param  {Array}   params.RoutingRules                            重定向规则，非必须
	 * @param  {Function}  callback                                             回调函数，必须
	 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                                  返回数据
	 */
	function putBucketWebsite(params, callback) {

	    if (!params['WebsiteConfiguration']) {
	        callback(util_1.error(new Error('missing param WebsiteConfiguration')));
	        return;
	    }

	    var WebsiteConfiguration = util_1.clone(params['WebsiteConfiguration'] || {});
	    var RoutingRules = WebsiteConfiguration['RoutingRules'] || WebsiteConfiguration['RoutingRule'] || [];
	    RoutingRules = util_1.isArray(RoutingRules) ? RoutingRules : [RoutingRules];
	    delete WebsiteConfiguration.RoutingRule;
	    delete WebsiteConfiguration.RoutingRules;
	    if (RoutingRules.length) WebsiteConfiguration.RoutingRules = { RoutingRule: RoutingRules };
	    var xml = util_1.json2xml({ WebsiteConfiguration: WebsiteConfiguration });

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketWebsite',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'website',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的静态网站配置信息
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketWebsite(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketWebsite',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        action: 'website',
	    }, function (err, data) {
	        if (err) {
	            if(err.statusCode === 404 && err.error.Code === 'NoSuchWebsiteConfiguration'){
	                var result = {
	                    WebsiteConfiguration: {},
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }

	        var WebsiteConfiguration = data.WebsiteConfiguration || {};
	        if (WebsiteConfiguration['RoutingRules']) {
	            var RoutingRules = util_1.clone(WebsiteConfiguration['RoutingRules'].RoutingRule || []);
	            RoutingRules = util_1.makeArray(RoutingRules);
	            WebsiteConfiguration.RoutingRules = RoutingRules;
	        }

	        callback(null, {
	            WebsiteConfiguration: WebsiteConfiguration,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Bucket 的静态网站配置
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function deleteBucketWebsite(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketWebsite',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'website',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 的防盗链白名单或者黑名单
	 * @param  {Object}  params                                                 参数对象，必须
	 *     @param  {String}  params.Bucket                                      Bucket名称，必须
	 *     @param  {String}  params.Region                                      地域名称，必须
	 *     @param  {Object}  params.RefererConfiguration                        地域名称，必须
	 *         @param  {String}   RefererConfiguration.Status                   是否开启防盗链，枚举值：Enabled、Disabled
	 *         @param  {String}   RefererConfiguration.RefererType              防盗链类型，枚举值：Black-List、White-List，必须
	 *         @param  {Array}   RefererConfiguration.DomianList.Domain         生效域名，必须
	 *         @param  {String}   RefererConfiguration.EmptyReferConfiguration  ，非必须
	 * @param  {Function}  callback                                             回调函数，必须
	 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                                  返回数据
	 */
	function putBucketReferer(params, callback) {

	    if (!params['RefererConfiguration']) {
	        callback(util_1.error(new Error('missing param RefererConfiguration')));
	        return;
	    }

	    var RefererConfiguration = util_1.clone(params['RefererConfiguration'] || {});
	    var DomainList = RefererConfiguration['DomainList'] || {};
	    var Domains = DomainList['Domains'] || DomainList['Domain'] || [];
	    Domains = util_1.isArray(Domains) ? Domains : [Domains];
	    if (Domains.length) RefererConfiguration.DomainList = {Domain: Domains};
	    var xml = util_1.json2xml({ RefererConfiguration: RefererConfiguration });

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketReferer',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'referer',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的防盗链白名单或者黑名单
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketReferer(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketReferer',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        action: 'referer',
	    }, function (err, data) {
	        if (err) {
	            if(err.statusCode === 404 && err.error.Code === 'NoSuchRefererConfiguration'){
	                var result = {
	                    WebsiteConfiguration: {},
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }

	        var RefererConfiguration = data.RefererConfiguration || {};
	        if (RefererConfiguration['DomainList']) {
	            var Domains = util_1.clone(RefererConfiguration['DomainList'].Domain || []);
	            Domains = util_1.makeArray(Domains);
	            RefererConfiguration.DomainList = {Domains: Domains};
	        }

	        callback(null, {
	            RefererConfiguration: RefererConfiguration,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 自定义域名
	 * @param  {Object}  params                                                 参数对象，必须
	 *     @param  {String}  params.Bucket                                      Bucket名称，必须
	 *     @param  {String}  params.Region                                      地域名称，必须
	 * @param  {Function}  callback                                             回调函数，必须
	 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                                  返回数据
	 */
	function putBucketDomain(params, callback) {

	    var DomainConfiguration = params['DomainConfiguration'] || {};
	    var DomainRule = DomainConfiguration.DomainRule || params.DomainRule || [];
	    DomainRule = util_1.clone(DomainRule);
	    var xml = util_1.json2xml({DomainConfiguration: {DomainRule: DomainRule}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketDomain',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'domain',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的自定义域名
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketDomain(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketDomain',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'domain',
	    }, function (err, data) {
	        if (err) return callback(err);

	        var DomainRule = [];
	        try {
	            DomainRule = data.DomainConfiguration.DomainRule || [];
	        } catch (e) {
	        }
	        DomainRule = util_1.clone(util_1.isArray(DomainRule) ? DomainRule : [DomainRule]);
	        callback(null, {
	            DomainRule: DomainRule,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Bucket 自定义域名
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function deleteBucketDomain(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketDomain',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'domain',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 的回源
	 * @param  {Object}  params                                                 参数对象，必须
	 *     @param  {String}  params.Bucket                                      Bucket名称，必须
	 *     @param  {String}  params.Region                                      地域名称，必须
	 * @param  {Function}  callback                                             回调函数，必须
	 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                                  返回数据
	 */
	function putBucketOrigin(params, callback){
	    var OriginConfiguration = params['OriginConfiguration'] || {};
	    var OriginRule = OriginConfiguration.OriginRule || params.OriginRule || [];
	    OriginRule = util_1.clone(OriginRule);
	    var xml = util_1.json2xml({OriginConfiguration: {OriginRule: OriginRule}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketOrigin',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'origin',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的回源
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketOrigin(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketOrigin',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'origin',
	    }, function (err, data) {
	        if (err) return callback(err);

	        var OriginRule = [];
	        try {
	            OriginRule = data.OriginConfiguration.OriginRule || [];
	        } catch (e) {
	        }
	        OriginRule = util_1.clone(util_1.isArray(OriginRule) ? OriginRule : [OriginRule]);
	        callback(null, {
	            OriginRule: OriginRule,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Bucket 的回源
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function deleteBucketOrigin(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketOrigin',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'origin',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 设置 Bucket 的日志记录
	 * @param  {Object}  params                                                 参数对象，必须
	 *     @param  {String}  params.Bucket                                      Bucket名称，必须
	 *     @param  {String}  params.Region                                      地域名称，必须
	 *     @param  {(Object|String)}  params.BucketLoggingStatus                         说明日志记录配置的状态，如果无子节点信息则意为关闭日志记录，必须
	 * @param  {Function}  callback                                             回调函数，必须
	 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                                  返回数据
	 */
	function putBucketLogging(params, callback) {
	    var xml = util_1.json2xml({
	        BucketLoggingStatus: params['BucketLoggingStatus'] || ''
	    });

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketLogging',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'logging',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的日志记录
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketLogging(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketLogging',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'logging',
	    }, function (err, data) {
	        if (err) return callback(err);
	        callback(null, {
	            BucketLoggingStatus: data.BucketLoggingStatus,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 创建/编辑 Bucket 的清单任务
	 * @param  {Object}  params                                                 参数对象，必须
	 *     @param  {String}  params.Bucket                                      Bucket名称，必须
	 *     @param  {String}  params.Region                                      地域名称，必须
	 *     @param  {String}  params.Id                                          清单任务的名称，必须
	 *     @param  {Object}  params.InventoryConfiguration                      包含清单的配置参数，必须
	 * @param  {Function}  callback                                             回调函数，必须
	 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                                  返回数据
	 */
	function putBucketInventory(params, callback) {
	    var InventoryConfiguration = util_1.clone(params['InventoryConfiguration']);

	    if (InventoryConfiguration.OptionalFields) {
	        var Field = InventoryConfiguration.OptionalFields || [];
	        InventoryConfiguration.OptionalFields = {
	            Field: Field
	        };
	    }

	    if (InventoryConfiguration.Destination
	        && InventoryConfiguration.Destination.COSBucketDestination
	        && InventoryConfiguration.Destination.COSBucketDestination.Encryption
	    ) {
	        var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;
	        if (Object.keys(Encryption).indexOf('SSECOS') > -1) {
	            Encryption['SSE-COS'] = Encryption['SSECOS'];
	            delete Encryption['SSECOS'];
	        }
	    }

	    var xml = util_1.json2xml({
	        InventoryConfiguration: InventoryConfiguration
	    });

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketInventory',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'inventory',
	        qs: {
	            id: params['Id']
	        },
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的清单任务信息
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 *     @param  {String}  params.Id      清单任务的名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function getBucketInventory(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketInventory',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'inventory',
	        qs: {
	            id: params['Id']
	        }
	    }, function (err, data) {
	        if (err) return callback(err);

	        var InventoryConfiguration = data['InventoryConfiguration'];
	        if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {
	            var Field = InventoryConfiguration.OptionalFields.Field;
	            if (!util_1.isArray(Field)) {
	                Field = [Field];
	            }
	            InventoryConfiguration.OptionalFields = Field;
	        }
	        if (InventoryConfiguration.Destination
	            && InventoryConfiguration.Destination.COSBucketDestination
	            && InventoryConfiguration.Destination.COSBucketDestination.Encryption
	        ) {
	            var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;
	            if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {
	                Encryption['SSECOS'] = Encryption['SSE-COS'];
	                delete Encryption['SSE-COS'];
	            }
	        }

	        callback(null, {
	            InventoryConfiguration: InventoryConfiguration,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Bucket 的清单任务信息
	 * @param  {Object}  params                             参数对象，必须
	 *     @param  {String}  params.Bucket                  Bucket名称，必须
	 *     @param  {String}  params.Region                  地域名称，必须
	 *     @param  {String}  params.ContinuationToken       当 COS 响应体中 IsTruncated 为 true，且 NextContinuationToken 节点中存在参数值时，您可以将这个参数作为 continuation-token 参数值，以获取下一页的清单任务信息，非必须
	 * @param  {Function}  callback                         回调函数，必须
	 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                              返回数据
	 */
	function listBucketInventory(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:ListBucketInventory',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'inventory',
	        qs: {
	            'continuation-token': params['ContinuationToken']
	        }
	    }, function (err, data) {
	        if (err) return callback(err);
	        var ListInventoryConfigurationResult = data['ListInventoryConfigurationResult'];
	        var InventoryConfigurations = ListInventoryConfigurationResult.InventoryConfiguration || [];
	        InventoryConfigurations = util_1.isArray(InventoryConfigurations) ? InventoryConfigurations : [InventoryConfigurations];
	        delete ListInventoryConfigurationResult['InventoryConfiguration'];
	        util_1.each(InventoryConfigurations, function (InventoryConfiguration) {
	            if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {
	                var Field = InventoryConfiguration.OptionalFields.Field;
	                if (!util_1.isArray(Field)) {
	                    Field = [Field];
	                }
	                InventoryConfiguration.OptionalFields = Field;
	            }

	            if (InventoryConfiguration.Destination
	                && InventoryConfiguration.Destination.COSBucketDestination
	                && InventoryConfiguration.Destination.COSBucketDestination.Encryption
	            ) {
	                var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;
	                if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {
	                    Encryption['SSECOS'] = Encryption['SSE-COS'];
	                    delete Encryption['SSE-COS'];
	                }
	            }
	        });
	        ListInventoryConfigurationResult.InventoryConfigurations = InventoryConfigurations;
	        util_1.extend(ListInventoryConfigurationResult, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, ListInventoryConfigurationResult);
	    });
	}

	/**
	 * 删除 Bucket 的清单任务
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 *     @param  {String}  params.Id      清单任务的名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回数据
	 */
	function deleteBucketInventory(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketInventory',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'inventory',
	        qs: {
	            id: params['Id']
	        }
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/* 全球加速 */
	function putBucketAccelerate(params, callback) {

	    if (!params['AccelerateConfiguration']) {
	        callback(util_1.error(new Error('missing param AccelerateConfiguration')));
	        return;
	    }

	    var configuration = { AccelerateConfiguration: params.AccelerateConfiguration || {} };

	    var xml = util_1.json2xml(configuration);

	    var headers = {};
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketAccelerate',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'accelerate',
	        headers: headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function getBucketAccelerate(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketAccelerate',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        action: 'accelerate',
	    }, function (err, data) {
	        if (!err) {
	            !data.AccelerateConfiguration && (data.AccelerateConfiguration = {});
	        }
	        callback(err, data);
	    });
	}

	function putBucketEncryption(params, callback) {
	    var conf = params.ServerSideEncryptionConfiguration || {};
	    var Rules = conf.Rule || conf.Rules || [];
	    var xml = util_1.json2xml({ServerSideEncryptionConfiguration: {Rule:Rules}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutBucketEncryption',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'encryption',
	        headers: headers,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	function getBucketEncryption(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketEncryption',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'encryption',
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode === 404 && err.code === 'NoSuchEncryptionConfiguration') {
	                var result = {
	                    EncryptionConfiguration: {Rules: []},
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }
	        var Rules = util_1.makeArray(data.EncryptionConfiguration && data.EncryptionConfiguration.Rule || []);
	        data.EncryptionConfiguration = {Rules: Rules};
	        callback(err, data);
	    });
	}

	function deleteBucketEncryption(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteBucketReplication',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'encryption',
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	// Object 相关

	/**
	 * 取回对应Object的元数据，Head的权限与Get的权限一致
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 *     @param  {String}  params.Key                 文件名称，必须
	 *     @param  {String}  params.IfModifiedSince     当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          为指定 object 的元数据，如果设置了 IfModifiedSince ，且文件未修改，则返回一个对象，NotModified 属性为 true
	 *     @return  {Boolean}  data.NotModified         是否在 IfModifiedSince 时间点之后未修改该 object，则为 true
	 */
	function headObject(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:HeadObject',
	        method: 'HEAD',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        VersionId: params.VersionId,
	        headers: params.Headers,
	    }, function (err, data) {
	        if (err) {
	            var statusCode = err.statusCode;
	            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
	                return callback(null, {
	                    NotModified: true,
	                    statusCode: statusCode,
	                });
	            }
	            return callback(err);
	        }
	        data.ETag = util_1.attr(data.headers, 'etag', '');
	        callback(null, data);
	    });
	}


	function listObjectVersions(params, callback) {
	    var reqParams = {};
	    reqParams['prefix'] = params['Prefix'] || '';
	    reqParams['delimiter'] = params['Delimiter'];
	    reqParams['key-marker'] = params['KeyMarker'];
	    reqParams['version-id-marker'] = params['VersionIdMarker'];
	    reqParams['max-keys'] = params['MaxKeys'];
	    reqParams['encoding-type'] = params['EncodingType'];

	    submitRequest.call(this, {
	        Action: 'name/cos:GetBucketObjectVersions',
	        ResourceKey: reqParams['prefix'],
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        qs: reqParams,
	        action: 'versions',
	    }, function (err, data) {
	        if (err) return callback(err);
	        var ListVersionsResult = data.ListVersionsResult || {};
	        var DeleteMarkers = ListVersionsResult.DeleteMarker || [];
	        DeleteMarkers = util_1.isArray(DeleteMarkers) ? DeleteMarkers : [DeleteMarkers];
	        var Versions = ListVersionsResult.Version || [];
	        Versions = util_1.isArray(Versions) ? Versions : [Versions];

	        var result = util_1.clone(ListVersionsResult);
	        delete result.DeleteMarker;
	        delete result.Version;
	        util_1.extend(result, {
	            DeleteMarkers: DeleteMarkers,
	            Versions: Versions,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });

	        callback(null, result);
	    });
	}

	/**
	 * 下载 object
	 * @param  {Object}  params                                 参数对象，必须
	 *     @param  {String}  params.Bucket                      Bucket名称，必须
	 *     @param  {String}  params.Region                      地域名称，必须
	 *     @param  {String}  params.Key                         文件名称，必须
	 *     @param  {WriteStream}  params.Output                 文件写入流，非必须
	 *     @param  {String}  params.IfModifiedSince             当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须
	 *     @param  {String}  params.IfUnmodifiedSince           如果文件修改时间早于或等于指定时间，才返回文件内容。否则返回 412 (precondition failed)，非必须
	 *     @param  {String}  params.IfMatch                     当 ETag 与指定的内容一致，才返回文件。否则返回 412 (precondition failed)，非必须
	 *     @param  {String}  params.IfNoneMatch                 当 ETag 与指定的内容不一致，才返回文件。否则返回304 (not modified)，非必须
	 *     @param  {String}  params.ResponseContentType         设置返回头部中的 Content-Type 参数，非必须
	 *     @param  {String}  params.ResponseContentLanguage     设置返回头部中的 Content-Language 参数，非必须
	 *     @param  {String}  params.ResponseExpires             设置返回头部中的 Content-Expires 参数，非必须
	 *     @param  {String}  params.ResponseCacheControl        设置返回头部中的 Cache-Control 参数，非必须
	 *     @param  {String}  params.ResponseContentDisposition  设置返回头部中的 Content-Disposition 参数，非必须
	 *     @param  {String}  params.ResponseContentEncoding     设置返回头部中的 Content-Encoding 参数，非必须
	 * @param  {Function}  callback                             回调函数，必须
	 * @param  {Object}  err                                    请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @param  {Object}  data                                   为对应的 object 数据，包括 body 和 headers
	 */
	function getObject(params, callback) {
	    var reqParams = params.Query || {};
	    var onProgress = util_1.throttleOnProgress.call(this, 0, params.onProgress);

	    reqParams['response-content-type'] = params['ResponseContentType'];
	    reqParams['response-content-language'] = params['ResponseContentLanguage'];
	    reqParams['response-expires'] = params['ResponseExpires'];
	    reqParams['response-cache-control'] = params['ResponseCacheControl'];
	    reqParams['response-content-disposition'] = params['ResponseContentDisposition'];
	    reqParams['response-content-encoding'] = params['ResponseContentEncoding'];

	    // 如果用户自己传入了 output
	    submitRequest.call(this, {
	        Action: 'name/cos:GetObject',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        VersionId: params.VersionId,
	        DataType: params.DataType,
	        headers: params.Headers,
	        qs: reqParams,
	        rawBody: true,
	        onDownloadProgress: onProgress,
	    }, function (err, data) {
	        onProgress(null, true);
	        if (err) {
	            var statusCode = err.statusCode;
	            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
	                return callback(null, {
	                    NotModified: true
	                });
	            }
	            return callback(err);
	        }
	        callback(null, {
	            Body: data.body,
	            ETag: util_1.attr(data.headers, 'etag', ''),
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });

	}

	/**
	 * 上传 object
	 * @param  {Object} params                                          参数对象，必须
	 *     @param  {String}  params.Bucket                              Bucket名称，必须
	 *     @param  {String}  params.Region                              地域名称，必须
	 *     @param  {String}  params.Key                                 文件名称，必须
	 *     @param  {File || Blob || String}  params.Body                上传文件对象或字符串，必须
	 *     @param  {String}  params.CacheControl                        RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ContentDisposition                  RFC 2616 中定义的文件名称，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ContentEncoding                     RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ContentLength                       RFC 2616 中定义的 HTTP 请求内容长度（字节），必须
	 *     @param  {String}  params.ContentType                         RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.Expect                              当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
	 *     @param  {String}  params.Expires                             RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ACL                                 允许用户自定义文件权限，有效值：private | public-read，非必须
	 *     @param  {String}  params.GrantRead                           赋予被授权者读取对象的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
	 *     @param  {String}  params.GrantReadAcp                        赋予被授权者读取对象的访问控制列表（ACL）的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
	 *     @param  {String}  params.GrantWriteAcp                       赋予被授权者写入对象的访问控制列表（ACL）的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
	 *     @param  {String}  params.GrantFullControl                    赋予被授权者操作对象的所有权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
	 *     @param  {String}  params.StorageClass                        设置对象的存储级别，枚举值：STANDARD、STANDARD_IA、ARCHIVE，默认值：STANDARD，非必须
	 *     @param  {String}  params.x-cos-meta-*                        允许用户自定义的头部信息，将作为对象的元数据保存。大小限制2KB，非必须
	 *     @param  {String}  params.ContentSha1                         RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验，非必须
	 *     @param  {String}  params.ServerSideEncryption                支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
	 *     @param  {Function}  params.onProgress                        上传进度回调函数
	 * @param  {Function}  callback                                     回调函数，必须
	 * @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                          为对应的 object 数据
	 *     @return  {String}  data.ETag                                 为对应上传文件的 ETag 值
	 */
	function putObject(params, callback) {
	    var self = this;
	    var FileSize = params.ContentLength;
	    var onProgress = util_1.throttleOnProgress.call(self, FileSize, params.onProgress);

	    // 特殊处理 Cache-Control、Content-Type，避免代理更改这两个字段导致写入到 Object 属性里
	    var headers = params.Headers;
	    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
	    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';
	    var needCalcMd5 = params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5 || self.options.UploadCheckContentMd5;
	    util_1.getBodyMd5(needCalcMd5, params.Body, function (md5) {
	        if (md5) {
	            if (self.options.UploadCheckContentMd5) headers['Content-MD5'] = util_1.binaryBase64(md5);
	            if (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5) headers['x-cos-meta-md5'] = md5;
	        }
	        if (params.ContentLength !== undefined) headers['Content-Length'] = params.ContentLength;
	        onProgress(null, true); // 任务状态开始 uploading
	        submitRequest.call(self, {
	            Action: 'name/cos:PutObject',
	            TaskId: params.TaskId,
	            method: 'PUT',
	            Bucket: params.Bucket,
	            Region: params.Region,
	            Key: params.Key,
	            headers: params.Headers,
	            qs: params.Query,
	            body: params.Body,
	            onProgress: onProgress,
	        }, function (err, data) {
	            if (err) {
	                onProgress(null, true);
	                return callback(err);
	            }
	            onProgress({loaded: FileSize, total: FileSize}, true);
	            var url = getUrl({
	                ForcePathStyle: self.options.ForcePathStyle,
	                protocol: self.options.Protocol,
	                domain: self.options.Domain,
	                bucket: params.Bucket,
	                region: params.Region,
	                object: params.Key,
	            });
	            url = url.substr(url.indexOf('://') + 3);
	            data.Location = url;
	            data.ETag = util_1.attr(data.headers, 'etag', '');
	            callback(null, data);
	        });
	    }, params.onHashProgress);
	}

	/**
	 * 删除 object
	 * @param  {Object}  params                     参数对象，必须
	 *     @param  {String}  params.Bucket          Bucket名称，必须
	 *     @param  {String}  params.Region          地域名称，必须
	 *     @param  {String}  params.Key             object名称，必须
	 * @param  {Function}  callback                 回调函数，必须
	 * @param  {Object}  err                        请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @param  {Object}  data                       删除操作成功之后返回的数据
	 */
	function deleteObject(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteObject',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        VersionId: params.VersionId,
	    }, function (err, data) {
	        if (err) {
	            var statusCode = err.statusCode;
	            if (statusCode && statusCode === 404) {
	                return callback(null, {BucketNotFound: true, statusCode: statusCode,});
	            } else {
	                return callback(err);
	            }
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 object 的 权限列表
	 * @param  {Object}  params                         参数对象，必须
	 *     @param  {String}  params.Bucket              Bucket名称，必须
	 *     @param  {String}  params.Region              地域名称，必须
	 *     @param  {String}  params.Key                 object名称，必须
	 * @param  {Function}  callback                     回调函数，必须
	 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                          返回的数据
	 *     @return  {Object}  data.AccessControlPolicy  权限列表
	 */
	function getObjectAcl(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetObjectACL',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        action: 'acl',
	    }, function (err, data) {
	        if (err) return callback(err);
	        var AccessControlPolicy = data.AccessControlPolicy || {};
	        var Owner = AccessControlPolicy.Owner || {};
	        var Grant = AccessControlPolicy.AccessControlList && AccessControlPolicy.AccessControlList.Grant || [];
	        Grant = util_1.isArray(Grant) ? Grant : [Grant];
	        var result = decodeAcl(AccessControlPolicy);
	        delete result.GrantWrite;
	        if (data.headers && data.headers['x-cos-acl']) {
	            result.ACL = data.headers['x-cos-acl'];
	        }
	        result = util_1.extend(result, {
	            Owner: Owner,
	            Grants: Grant,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	/**
	 * 设置 object 的 权限列表
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 *     @param  {String}  params.Key     object名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回的数据
	 */
	function putObjectAcl(params, callback) {
	    var headers = params.Headers;

	    var xml = '';
	    if (params['AccessControlPolicy']) {
	        var AccessControlPolicy = util_1.clone(params['AccessControlPolicy'] || {});
	        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
	        Grants = util_1.isArray(Grants) ? Grants : [Grants];
	        delete AccessControlPolicy.Grant;
	        delete AccessControlPolicy.Grants;
	        AccessControlPolicy.AccessControlList = {Grant: Grants};
	        xml = util_1.json2xml({AccessControlPolicy: AccessControlPolicy});

	        headers['Content-Type'] = 'application/xml';
	        headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));
	    }

	    // Grant Header 去重
	    util_1.each(headers, function (val, key) {
	        if (key.indexOf('x-cos-grant-') === 0) {
	            headers[key] = uniqGrant(headers[key]);
	        }
	    });

	    submitRequest.call(this, {
	        Action: 'name/cos:PutObjectACL',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        action: 'acl',
	        headers: headers,
	        body: xml,
	    }, function (err, data) {
	        if (err) return callback(err);
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * Options Object请求实现跨域访问的预请求。即发出一个 OPTIONS 请求给服务器以确认是否可以进行跨域操作。
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 *     @param  {String}  params.Key     object名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data              返回的数据
	 */
	function optionsObject(params, callback) {

	    var headers = params.Headers;
	    headers['Origin'] = params['Origin'];
	    headers['Access-Control-Request-Method'] = params['AccessControlRequestMethod'];
	    headers['Access-Control-Request-Headers'] = params['AccessControlRequestHeaders'];

	    submitRequest.call(this, {
	        Action: 'name/cos:OptionsObject',
	        method: 'OPTIONS',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: headers,
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode && err.statusCode === 403) {
	                return callback(null, {
	                    OptionsForbidden: true,
	                    statusCode: err.statusCode
	                });
	            }
	            return callback(err);
	        }

	        var headers = data.headers || {};
	        callback(null, {
	            AccessControlAllowOrigin: headers['access-control-allow-origin'],
	            AccessControlAllowMethods: headers['access-control-allow-methods'],
	            AccessControlAllowHeaders: headers['access-control-allow-headers'],
	            AccessControlExposeHeaders: headers['access-control-expose-headers'],
	            AccessControlMaxAge: headers['access-control-max-age'],
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * @param  {Object}                                     参数列表
	 *     @param  {String}  Bucket                         Bucket 名称
	 *     @param  {String}  Region                         地域名称
	 *     @param  {String}  Key                            文件名称
	 *     @param  {String}  CopySource                     源文件URL绝对路径，可以通过versionid子资源指定历史版本
	 *     @param  {String}  ACL                            允许用户自定义文件权限。有效值：private，public-read默认值：private。
	 *     @param  {String}  GrantRead                      赋予被授权者读的权限，格式 x-cos-grant-read: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
	 *     @param  {String}  GrantWrite                     赋予被授权者写的权限，格式 x-cos-grant-write: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
	 *     @param  {String}  GrantFullControl               赋予被授权者读写权限，格式 x-cos-grant-full-control: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
	 *     @param  {String}  MetadataDirective              是否拷贝元数据，枚举值：Copy, Replaced，默认值Copy。假如标记为Copy，忽略Header中的用户元数据信息直接复制；假如标记为Replaced，按Header信息修改元数据。当目标路径和原路径一致，即用户试图修改元数据时，必须为Replaced
	 *     @param  {String}  CopySourceIfModifiedSince      当Object在指定时间后被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-None-Match一起使用，与其他条件联合使用返回冲突。
	 *     @param  {String}  CopySourceIfUnmodifiedSince    当Object在指定时间后未被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-Match一起使用，与其他条件联合使用返回冲突。
	 *     @param  {String}  CopySourceIfMatch              当Object的ETag和给定一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Unmodified-Since一起使用，与其他条件联合使用返回冲突。
	 *     @param  {String}  CopySourceIfNoneMatch          当Object的ETag和给定不一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Modified-Since一起使用，与其他条件联合使用返回冲突。
	 *     @param  {String}  StorageClass                   存储级别，枚举值：存储级别，枚举值：Standard, Standard_IA，Archive；默认值：Standard
	 *     @param  {String}  CacheControl                   指定所有缓存机制在整个请求/响应链中必须服从的指令。
	 *     @param  {String}  ContentDisposition             MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
	 *     @param  {String}  ContentEncoding                HTTP 中用来对「采用何种编码格式传输正文」进行协定的一对头部字段
	 *     @param  {String}  ContentLength                  设置响应消息的实体内容的大小，单位为字节
	 *     @param  {String}  ContentType                    RFC 2616 中定义的 HTTP 请求内容类型（MIME），例如text/plain
	 *     @param  {String}  Expect                         请求的特定的服务器行为
	 *     @param  {String}  Expires                        响应过期的日期和时间
	 *     @param  {String}  params.ServerSideEncryption   支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
	 *     @param  {String}  ContentLanguage                指定内容语言
	 *     @param  {String}  x-cos-meta-*                   允许用户自定义的头部信息，将作为 Object 元数据返回。大小限制2K。
	 */
	function putObjectCopy(params, callback) {

	    // 特殊处理 Cache-Control
	    var headers = params.Headers;
	    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';

	    var CopySource = params.CopySource || '';
	    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
	    if (!m) {
	        callback(util_1.error(new Error('CopySource format error')));
	        return;
	    }

	    var SourceBucket = m[1];
	    var SourceRegion = m[3];
	    var SourceKey = decodeURIComponent(m[4]);

	    submitRequest.call(this, {
	        Scope: [{
	            action: 'name/cos:GetObject',
	            bucket: SourceBucket,
	            region: SourceRegion,
	            prefix: SourceKey,
	        }, {
	            action: 'name/cos:PutObject',
	            bucket: params.Bucket,
	            region: params.Region,
	            prefix: params.Key,
	        }],
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        VersionId: params.VersionId,
	        headers: params.Headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var result = util_1.clone(data.CopyObjectResult || {});
	        util_1.extend(result, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	function uploadPartCopy(params, callback) {

	    var CopySource = params.CopySource || '';
	    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
	    if (!m) {
	        callback(util_1.error(new Error('CopySource format error')));
	        return;
	    }

	    var SourceBucket = m[1];
	    var SourceRegion = m[3];
	    var SourceKey = decodeURIComponent(m[4]);

	    submitRequest.call(this, {
	        Scope: [{
	            action: 'name/cos:GetObject',
	            bucket: SourceBucket,
	            region: SourceRegion,
	            prefix: SourceKey,
	        }, {
	            action: 'name/cos:PutObject',
	            bucket: params.Bucket,
	            region: params.Region,
	            prefix: params.Key,
	        }],
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        VersionId: params.VersionId,
	        qs: {
	            partNumber: params['PartNumber'],
	            uploadId: params['UploadId'],
	        },
	        headers: params.Headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var result = util_1.clone(data.CopyPartResult || {});
	        util_1.extend(result, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	function deleteMultipleObject(params, callback) {
	    var Objects = params.Objects || [];
	    var Quiet = params.Quiet;
	    Objects = util_1.isArray(Objects) ? Objects : [Objects];

	    var xml = util_1.json2xml({Delete: {Object: Objects, Quiet: Quiet || false}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    var Scope = util_1.map(Objects, function (v) {
	        return {
	            action: 'name/cos:DeleteObject',
	            bucket: params.Bucket,
	            region: params.Region,
	            prefix: v.Key,
	        };
	    });

	    submitRequest.call(this, {
	        Scope: Scope,
	        method: 'POST',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        body: xml,
	        action: 'delete',
	        headers: headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var DeleteResult = data.DeleteResult || {};
	        var Deleted = DeleteResult.Deleted || [];
	        var Errors = DeleteResult.Error || [];

	        Deleted = util_1.isArray(Deleted) ? Deleted : [Deleted];
	        Errors = util_1.isArray(Errors) ? Errors : [Errors];

	        var result = util_1.clone(DeleteResult);
	        util_1.extend(result, {
	            Error: Errors,
	            Deleted: Deleted,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	function restoreObject(params, callback) {
	    var headers = params.Headers;
	    if (!params['RestoreRequest']) {
	        callback(util_1.error(new Error('missing param RestoreRequest')));
	        return;
	    }

	    var RestoreRequest = params.RestoreRequest || {};
	    var xml = util_1.json2xml({RestoreRequest: RestoreRequest});

	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:RestoreObject',
	        method: 'POST',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        VersionId: params.VersionId,
	        body: xml,
	        action: 'restore',
	        headers: headers,
	    }, callback);
	}

	/**
	 * 设置 Object 的标签
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Object名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 *     @param  {Array}   params.TagSet  标签设置，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
	 * @return  {Object}  data              返回数据
	 */
	function putObjectTagging(params, callback) {

	    var Tagging = params['Tagging'] || {};
	    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
	    Tags = util_1.clone(util_1.isArray(Tags) ? Tags : [Tags]);
	    var xml = util_1.json2xml({Tagging: {TagSet: {Tag: Tags}}});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:PutObjectTagging',
	        method: 'PUT',
	        Bucket: params.Bucket,
	        Key: params.Key,
	        Region: params.Region,
	        body: xml,
	        action: 'tagging',
	        headers: headers,
	        VersionId: params.VersionId,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 获取 Object 的标签设置
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Bucket名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
	 * @return  {Object}  data              返回数据
	 */
	function getObjectTagging(params, callback) {

	    submitRequest.call(this, {
	        Action: 'name/cos:GetObjectTagging',
	        method: 'GET',
	        Key: params.Key,
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        action: 'tagging',
	        VersionId: params.VersionId,
	    }, function (err, data) {
	        if (err) {
	            if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
	                var result = {
	                    Tags: [],
	                    statusCode: err.statusCode,
	                };
	                err.headers && (result.headers = err.headers);
	                callback(null, result);
	            } else {
	                callback(err);
	            }
	            return;
	        }
	        var Tags = [];
	        try {
	            Tags = data.Tagging.TagSet.Tag || [];
	        } catch (e) {
	        }
	        Tags = util_1.clone(util_1.isArray(Tags) ? Tags : [Tags]);
	        callback(null, {
	            Tags: Tags,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 删除 Object 的 标签设置
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Bucket  Object名称，必须
	 *     @param  {String}  params.Region  地域名称，必须
	 * @param  {Function}  callback         回调函数，必须
	 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
	 * @return  {Object}  data              返回的数据
	 */
	function deleteObjectTagging(params, callback) {
	    submitRequest.call(this, {
	        Action: 'name/cos:DeleteObjectTagging',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        action: 'tagging',
	        VersionId: params.VersionId,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 使用 SQL 语句从指定对象（CSV 格式或者 JSON 格式）中检索内容
	 * @param  {Object}  params                   参数对象，必须
	 *     @param  {String}  params.Bucket        Object名称，必须
	 *     @param  {String}  params.Region        地域名称，必须
	 *     @param  {Object}  params.SelectRequest 地域名称，必须
	 * @param  {Function}  callback               回调函数，必须
	 * @return  {Object}  err                     请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
	 * @return  {Object}  data                    返回的数据
	 */
	function selectObjectContent(params, callback) {
	    var SelectType = params['SelectType'];
	    if (!SelectType) return callback(util_1.error(new Error('missing param SelectType')));

	    var SelectRequest = params['SelectRequest'] || {};
	    var xml = util_1.json2xml({SelectRequest: SelectRequest});

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:GetObject',
	        method: 'POST',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        action: 'select',
	        qs: {
	            'select-type': params['SelectType'],
	        },
	        VersionId: params.VersionId,
	        body: xml,
	        DataType: 'arraybuffer',
	        rawBody: true,
	    }, function (err, data) {
	        if (err && err.statusCode === 204) {
	            return callback(null, {statusCode: err.statusCode});
	        } else if (err) {
	            return callback(err);
	        }
	        var result = util_1.parseSelectPayload(data.body);
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	            Body: result.body,
	            Payload: result.payload,
	        });
	    });
	}


	// 分块上传


	/**
	 * 初始化分块上传
	 * @param  {Object}  params                                     参数对象，必须
	 *     @param  {String}  params.Bucket                          Bucket名称，必须
	 *     @param  {String}  params.Region                          地域名称，必须
	 *     @param  {String}  params.Key                             object名称，必须
	 *     @param  {String}  params.UploadId                        object名称，必须
	 *     @param  {String}  params.CacheControl                    RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ContentDisposition              RFC 2616 中定义的文件名称，将作为 Object 元数据保存    ，非必须
	 *     @param  {String}  params.ContentEncoding                 RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ContentType                     RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.Expires                         RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
	 *     @param  {String}  params.ACL                             允许用户自定义文件权限，非必须
	 *     @param  {String}  params.GrantRead                       赋予被授权者读的权限 ，非必须
	 *     @param  {String}  params.GrantWrite                      赋予被授权者写的权限 ，非必须
	 *     @param  {String}  params.GrantFullControl                赋予被授权者读写权限 ，非必须
	 *     @param  {String}  params.StorageClass                    设置Object的存储级别，枚举值：Standard，Standard_IA，Archive，非必须
	 *     @param  {String}  params.ServerSideEncryption           支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
	 * @param  {Function}  callback                                 回调函数，必须
	 * @return  {Object}  err                                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                      返回的数据
	 */
	function multipartInit(params, callback) {

	    var self = this;
	    // 特殊处理 Cache-Control
	    var headers = params.Headers;

	    // 特殊处理 Cache-Control、Content-Type
	    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
	    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';

	    util_1.getBodyMd5(params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5), params.Body, function (md5) {
	        if (md5) params.Headers['x-cos-meta-md5'] = md5;
	        submitRequest.call(self, {
	            Action: 'name/cos:InitiateMultipartUpload',
	            method: 'POST',
	            Bucket: params.Bucket,
	            Region: params.Region,
	            Key: params.Key,
	            action: 'uploads',
	            headers: params.Headers,
	            qs: params.Query,
	        }, function (err, data) {
	            if (err) return callback(err);
	            data = util_1.clone(data || {});
	            if (data && data.InitiateMultipartUploadResult) {
	                return callback(null, util_1.extend(data.InitiateMultipartUploadResult, {
	                    statusCode: data.statusCode,
	                    headers: data.headers,
	                }));
	            }
	            callback(null, data);
	        });
	    }, params.onHashProgress);
	}

	/**
	 * 分块上传
	 * @param  {Object}  params                                 参数对象，必须
	 *     @param  {String}  params.Bucket                      Bucket名称，必须
	 *     @param  {String}  params.Region                      地域名称，必须
	 *     @param  {String}  params.Key                         object名称，必须
	 *     @param  {File || Blob || String}  params.Body        上传文件对象或字符串
	 *     @param  {String} params.ContentLength                RFC 2616 中定义的 HTTP 请求内容长度（字节），非必须
	 *     @param  {String} params.Expect                       当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
	 *     @param  {String} params.ServerSideEncryption         支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
	 *     @param  {String} params.ContentSha1                  RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验值，非必须
	 * @param  {Function}  callback                             回调函数，必须
	 *     @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 *     @return  {Object}  data                              返回的数据
	 *     @return  {Object}  data.ETag                         返回的文件分块 sha1 值
	 */
	function multipartUpload$1(params, callback) {

	    var self = this;
	    util_1.getFileSize('multipartUpload', params, function () {
	        util_1.getBodyMd5(self.options.UploadCheckContentMd5, params.Body, function (md5) {
	            if (md5) params.Headers['Content-MD5'] = util_1.binaryBase64(md5);
	            submitRequest.call(self, {
	                Action: 'name/cos:UploadPart',
	                TaskId: params.TaskId,
	                method: 'PUT',
	                Bucket: params.Bucket,
	                Region: params.Region,
	                Key: params.Key,
	                qs: {
	                    partNumber: params['PartNumber'],
	                    uploadId: params['UploadId'],
	                },
	                headers: params.Headers,
	                onProgress: params.onProgress,
	                body: params.Body || null
	            }, function (err, data) {
	                if (err) return callback(err);
	                callback(null, {
	                    ETag: util_1.attr(data.headers, 'etag', ''),
	                    statusCode: data.statusCode,
	                    headers: data.headers,
	                });
	            });
	        });
	    });

	}

	/**
	 * 完成分块上传
	 * @param  {Object}  params                             参数对象，必须
	 *     @param  {String}  params.Bucket                  Bucket名称，必须
	 *     @param  {String}  params.Region                  地域名称，必须
	 *     @param  {String}  params.Key                     object名称，必须
	 *     @param  {Array}   params.Parts                   分块信息列表，必须
	 *     @param  {String}  params.Parts[i].PartNumber     块编号，必须
	 *     @param  {String}  params.Parts[i].ETag           分块的 sha1 校验值
	 * @param  {Function}  callback                         回调函数，必须
	 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                              返回的数据
	 *     @return  {Object}  data.CompleteMultipartUpload  完成分块上传后的文件信息，包括Location, Bucket, Key 和 ETag
	 */
	function multipartComplete(params, callback) {
	    var self = this;

	    var UploadId = params.UploadId;

	    var Parts = params['Parts'];

	    for (var i = 0, len = Parts.length; i < len; i++) {
	        if (Parts[i]['ETag'].indexOf('"') === 0) {
	            continue;
	        }
	        Parts[i]['ETag'] = '"' + Parts[i]['ETag'] + '"';
	    }

	    var xml = util_1.json2xml({CompleteMultipartUpload: {Part: Parts}});
	    // CSP/ceph CompleteMultipartUpload 接口 body 写死了限制 1MB，这里醉倒 10000 片时，xml 字符串去掉空格853KB
	    xml = xml.replace(/\n\s*/g, '');

	    var headers = params.Headers;
	    headers['Content-Type'] = 'application/xml';
	    headers['Content-MD5'] = util_1.binaryBase64(util_1.md5(xml));

	    submitRequest.call(this, {
	        Action: 'name/cos:CompleteMultipartUpload',
	        method: 'POST',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        qs: {
	            uploadId: UploadId
	        },
	        body: xml,
	        headers: headers,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var url = getUrl({
	            ForcePathStyle: self.options.ForcePathStyle,
	            protocol: self.options.Protocol,
	            domain: self.options.Domain,
	            bucket: params.Bucket,
	            region: params.Region,
	            object: params.Key,
	            isLocation: true,
	        });
	        var res = data.CompleteMultipartUploadResult || {};
	        if (res.ProcessResults) {
	            if (res && res.ProcessResults) {
	                res.UploadResult = {
	                    OriginalInfo: {
	                        Key: res.Key,
	                        Location: url,
	                        ETag: res.ETag,
	                        ImageInfo: res.ImageInfo,
	                    },
	                    ProcessResults: res.ProcessResults,
	                };
	                delete res.ImageInfo;
	                delete res.ProcessResults;
	            }
	        }
	        var result = util_1.extend(res, {
	            Location: url,
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	/**
	 * 分块上传任务列表查询
	 * @param  {Object}  params                                 参数对象，必须
	 *     @param  {String}  params.Bucket                      Bucket名称，必须
	 *     @param  {String}  params.Region                      地域名称，必须
	 *     @param  {String}  params.Delimiter                   定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，定义为Common Prefix，然后列出所有Common Prefix。如果没有Prefix，则从路径起点开始，非必须
	 *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须
	 *     @param  {String}  params.Prefix                      前缀匹配，用来规定返回的文件前缀地址，非必须
	 *     @param  {String}  params.MaxUploads                  单次返回最大的条目数量，默认1000，非必须
	 *     @param  {String}  params.KeyMarker                   与upload-id-marker一起使用 </Br>当upload-id-marker未被指定时，ObjectName字母顺序大于key-marker的条目将被列出 </Br>当upload-id-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须
	 *     @param  {String}  params.UploadIdMarker              与key-marker一起使用 </Br>当key-marker未被指定时，upload-id-marker将被忽略 </Br>当key-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须
	 * @param  {Function}  callback                             回调函数，必须
	 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                  返回的数据
	 *     @return  {Object}  data.ListMultipartUploadsResult   分块上传任务信息
	 */
	function multipartList(params, callback) {
	    var reqParams = {};

	    reqParams['delimiter'] = params['Delimiter'];
	    reqParams['encoding-type'] = params['EncodingType'];
	    reqParams['prefix'] = params['Prefix'] || '';

	    reqParams['max-uploads'] = params['MaxUploads'];

	    reqParams['key-marker'] = params['KeyMarker'];
	    reqParams['upload-id-marker'] = params['UploadIdMarker'];

	    reqParams = util_1.clearKey(reqParams);

	    submitRequest.call(this, {
	        Action: 'name/cos:ListMultipartUploads',
	        ResourceKey: reqParams['prefix'],
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        headers: params.Headers,
	        qs: reqParams,
	        action: 'uploads',
	    }, function (err, data) {
	        if (err) return callback(err);

	        if (data && data.ListMultipartUploadsResult) {
	            var Upload = data.ListMultipartUploadsResult.Upload || [];
	            Upload = util_1.isArray(Upload) ? Upload : [Upload];
	            data.ListMultipartUploadsResult.Upload = Upload;
	        }
	        var result = util_1.clone(data.ListMultipartUploadsResult || {});
	        util_1.extend(result, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	/**
	 * 上传的分块列表查询
	 * @param  {Object}  params                                 参数对象，必须
	 *     @param  {String}  params.Bucket                      Bucket名称，必须
	 *     @param  {String}  params.Region                      地域名称，必须
	 *     @param  {String}  params.Key                         object名称，必须
	 *     @param  {String}  params.UploadId                    标示本次分块上传的ID，必须
	 *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须
	 *     @param  {String}  params.MaxParts                    单次返回最大的条目数量，默认1000，非必须
	 *     @param  {String}  params.PartNumberMarker            默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须
	 * @param  {Function}  callback                             回调函数，必须
	 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 * @return  {Object}  data                                  返回的数据
	 *     @return  {Object}  data.ListMultipartUploadsResult   分块信息
	 */
	function multipartListPart(params, callback) {
	    var reqParams = {};

	    reqParams['uploadId'] = params['UploadId'];
	    reqParams['encoding-type'] = params['EncodingType'];
	    reqParams['max-parts'] = params['MaxParts'];
	    reqParams['part-number-marker'] = params['PartNumberMarker'];

	    submitRequest.call(this, {
	        Action: 'name/cos:ListParts',
	        method: 'GET',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        qs: reqParams,
	    }, function (err, data) {
	        if (err) return callback(err);
	        var ListPartsResult = data.ListPartsResult || {};
	        var Part = ListPartsResult.Part || [];
	        Part = util_1.isArray(Part) ? Part : [Part];

	        ListPartsResult.Part = Part;
	        var result = util_1.clone(ListPartsResult);
	        util_1.extend(result, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	        callback(null, result);
	    });
	}

	/**
	 * 抛弃分块上传
	 * @param  {Object}  params                 参数对象，必须
	 *     @param  {String}  params.Bucket      Bucket名称，必须
	 *     @param  {String}  params.Region      地域名称，必须
	 *     @param  {String}  params.Key         object名称，必须
	 *     @param  {String}  params.UploadId    标示本次分块上传的ID，必须
	 * @param  {Function}  callback             回调函数，必须
	 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 *     @return  {Object}    data            返回的数据
	 */
	function multipartAbort(params, callback) {
	    var reqParams = {};

	    reqParams['uploadId'] = params['UploadId'];
	    submitRequest.call(this, {
	        Action: 'name/cos:AbortMultipartUpload',
	        method: 'DELETE',
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        headers: params.Headers,
	        qs: reqParams,
	    }, function (err, data) {
	        if (err) return callback(err);
	        callback(null, {
	            statusCode: data.statusCode,
	            headers: data.headers,
	        });
	    });
	}

	/**
	 * 抛弃分块上传
	 * @param  {Object}  params                 参数对象，必须
	 *     @param  {String}  params.Bucket      Bucket名称，必须
	 *     @param  {String}  params.Region      地域名称，必须
	 *     @param  {String}  params.Key         object名称，必须
	 *     @param  {String}  params.UploadId    标示本次分块上传的ID，必须
	 * @param  {Function}  callback             回调函数，必须
	 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 *     @return  {Object}    data            返回的数据
	 */
	function request(params, callback) {
	    submitRequest.call(this, {
	        method: params.Method,
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        action: params.Action,
	        headers: params.Headers,
	        qs: params.Query,
	        body: params.Body,
	    }, function (err, data) {
	        if (err) return callback(err);
	        if (data && data.body) {
	            data.Body = data.body;
	            delete data.body;
	        }
	        callback(err, data);
	    });
	}

	/**
	 * 获取签名
	 * @param  {Object}  params             参数对象，必须
	 *     @param  {String}  params.Method  请求方法，必须
	 *     @param  {String}  params.Key     object名称，必须
	 *     @param  {String}  params.Expires 名超时时间，单位秒，可选
	 * @return  {String}  data              返回签名字符串
	 */
	function getAuth(params) {
	    var self = this;
	    return util_1.getAuth({
	        SecretId: params.SecretId || this.options.SecretId || '',
	        SecretKey: params.SecretKey || this.options.SecretKey || '',
	        Method: params.Method,
	        Key: params.Key,
	        Query: params.Query,
	        Headers: params.Headers,
	        Expires: params.Expires,
	        UseRawKey: self.options.UseRawKey,
	        SystemClockOffset: self.options.SystemClockOffset,
	    });
	}

	/**
	 * 获取文件下载链接
	 * @param  {Object}  params                 参数对象，必须
	 *     @param  {String}  params.Bucket      Bucket名称，必须
	 *     @param  {String}  params.Region      地域名称，必须
	 *     @param  {String}  params.Key         object名称，必须
	 *     @param  {String}  params.Method      请求的方法，可选
	 *     @param  {String}  params.Expires     签名超时时间，单位秒，可选
	 * @param  {Function}  callback             回调函数，必须
	 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
	 *     @return  {Object}    data            返回的数据
	 */
	function getObjectUrl(params, callback) {
	    var self = this;
	    var url = getUrl({
	        ForcePathStyle: self.options.ForcePathStyle,
	        protocol: params.Protocol || self.options.Protocol,
	        domain: params.Domain || self.options.Domain,
	        bucket: params.Bucket,
	        region: params.Region,
	        object: params.Key,
	    });
	    if (params.Sign !== undefined && !params.Sign) {
	        callback(null, {Url: url});
	        return url;
	    }
	    var AuthData = getAuthorizationAsync.call(this, {
	        Action: ((params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject'),
	        Bucket: params.Bucket || '',
	        Region: params.Region || '',
	        Method: params.Method || 'get',
	        Key: params.Key,
	        Expires: params.Expires,
	    }, function (err, AuthData) {
	        if (!callback) return;
	        if (err) {
	            callback(err);
	            return;
	        }
	        var signUrl = url;
	        signUrl += '?' + (AuthData.Authorization.indexOf('q-signature') > -1 ?
	            AuthData.Authorization : 'sign=' + encodeURIComponent(AuthData.Authorization));
	        AuthData.SecurityToken && (signUrl += '&x-cos-security-token=' + AuthData.SecurityToken);
	        AuthData.ClientIP && (signUrl += '&clientIP=' + AuthData.ClientIP);
	        AuthData.ClientUA && (signUrl += '&clientUA=' + AuthData.ClientUA);
	        AuthData.Token && (signUrl += '&token=' + AuthData.Token);
	        setTimeout(function () {
	            callback(null, {Url: signUrl});
	        });
	    });
	    if (AuthData) {
	        return url + '?' + AuthData.Authorization +
	            (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');
	    } else {
	        return url;
	    }
	}


	/**
	 * 私有方法
	 */
	function decodeAcl(AccessControlPolicy) {
	    var result = {
	        GrantFullControl: [],
	        GrantWrite: [],
	        GrantRead: [],
	        GrantReadAcp: [],
	        GrantWriteAcp: [],
	        ACL: '',
	    };
	    var GrantMap = {
	        'FULL_CONTROL': 'GrantFullControl',
	        'WRITE': 'GrantWrite',
	        'READ': 'GrantRead',
	        'READ_ACP': 'GrantReadAcp',
	        'WRITE_ACP': 'GrantWriteAcp',
	    };
	    var AccessControlList = AccessControlPolicy && AccessControlPolicy.AccessControlList || {};
	    var Grant = AccessControlList.Grant;
	    if (Grant) {
	        Grant = util_1.isArray(Grant) ? Grant : [Grant];
	    }
	    var PublicAcl = {READ: 0, WRITE: 0, FULL_CONTROL: 0};
	    Grant && Grant.length && util_1.each(Grant, function (item) {
	        if (item.Grantee.ID === 'qcs::cam::anyone:anyone' || item.Grantee.URI === 'http://cam.qcloud.com/groups/global/AllUsers') {
	            PublicAcl[item.Permission] = 1;
	        } else if (item.Grantee.ID !== AccessControlPolicy.Owner.ID) {
	            result[GrantMap[item.Permission]].push('id="' + item.Grantee.ID + '"');
	        }
	    });
	    if (PublicAcl.FULL_CONTROL || (PublicAcl.WRITE && PublicAcl.READ)) {
	        result.ACL = 'public-read-write';
	    } else if (PublicAcl.READ) {
	        result.ACL = 'public-read';
	    } else {
	        result.ACL = 'private';
	    }
	    util_1.each(GrantMap, function (item) {
	        result[item] = uniqGrant(result[item].join(','));
	    });
	    return result;
	}

	// Grant 去重
	function uniqGrant(str) {
	    var arr = str.split(',');
	    var exist = {};
	    var i, item;
	    for (i = 0; i < arr.length; ) {
	        item = arr[i].trim();
	        if (exist[item]) {
	            arr.splice(i, 1);
	        } else {
	            exist[item] = true;
	            arr[i] = item;
	            i++;
	        }
	    }
	    return arr.join(',');
	}

	// 生成操作 url
	function getUrl(params) {
	    var longBucket = params.bucket;
	    var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));
	    var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);
	    var domain = params.domain;
	    var region = params.region;
	    var object = params.object;
	    var protocol = params.protocol || (util_1.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
	    if (!domain) {
	        if (['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(region) > -1) {
	            domain = '{Region}.myqcloud.com';
	        } else {
	            domain = 'cos.{Region}.myqcloud.com';
	        }
	        if (!params.ForcePathStyle) {
	            domain = '{Bucket}.' + domain;
	        }
	    }
	    domain = domain.replace(/\{\{AppId\}\}/ig, appId)
	        .replace(/\{\{Bucket\}\}/ig, shortBucket)
	        .replace(/\{\{Region\}\}/ig, region)
	        .replace(/\{\{.*?\}\}/ig, '');
	    domain = domain.replace(/\{AppId\}/ig, appId)
	        .replace(/\{BucketName\}/ig, shortBucket)
	        .replace(/\{Bucket\}/ig, longBucket)
	        .replace(/\{Region\}/ig, region)
	        .replace(/\{.*?\}/ig, '');
	    if (!/^[a-zA-Z]+:\/\//.test(domain)) {
	        domain = protocol + '//' + domain;
	    }

	    // 去掉域名最后的斜杆
	    if (domain.slice(-1) === '/') {
	        domain = domain.slice(0, -1);
	    }
	    var url = domain;

	    if (params.ForcePathStyle) {
	        url += '/' + longBucket;
	    }
	    url += '/';
	    if (object) {
	        url += util_1.camSafeUrlEncode(object).replace(/%2F/g, '/');
	    }

	    if (params.isLocation) {
	        url = url.replace(/^https?:\/\//, '');
	    }
	    return url;
	}

	// 异步获取签名
	function getAuthorizationAsync(params, callback) {

	    var headers = util_1.clone(params.Headers);
	    util_1.each(headers, function (v, k) {
	        (v === '' || ['content-type', 'cache-control', 'expires'].indexOf(k.toLowerCase()) > -1) && delete headers[k];
	    });

	    // 获取凭证的回调，避免用户 callback 多次
	    var cbDone = false;
	    var cb = function (err, AuthData) {
	        if (cbDone) return;
	        cbDone = true;
	        if (AuthData && AuthData.XCosSecurityToken && !AuthData.SecurityToken) {
	            AuthData = util_1.clone(AuthData);
	            AuthData.SecurityToken = AuthData.XCosSecurityToken;
	            delete AuthData.XCosSecurityToken;
	        }
	        callback && callback(err, AuthData);
	    };

	    var self = this;
	    var Bucket = params.Bucket || '';
	    var Region = params.Region || '';

	    // PathName
	    var KeyName = params.Key || '';
	    if (self.options.ForcePathStyle && Bucket) {
	        KeyName = Bucket + '/' + KeyName;
	    }
	    var Pathname = '/' + KeyName;

	    // Action、ResourceKey
	    var StsData = {};
	    var Scope = params.Scope;
	    if (!Scope) {
	        var Action = params.Action || '';
	        var ResourceKey = params.ResourceKey || params.Key || '';
	        Scope = params.Scope || [{
	            action: Action,
	            bucket: Bucket,
	            region: Region,
	            prefix: ResourceKey,
	        }];
	    }
	    var ScopeKey  = util_1.md5(JSON.stringify(Scope));

	    // STS
	    self._StsCache = self._StsCache ||[];
	    (function () {
	        var i, AuthData;
	        for (i = self._StsCache.length - 1; i >= 0; i--) {
	            AuthData = self._StsCache[i];
	            var compareTime = Math.round(util_1.getSkewTime(self.options.SystemClockOffset) / 1000) + 30;
	            if (AuthData.StartTime && compareTime < AuthData.StartTime || compareTime >= AuthData.ExpiredTime) {
	                self._StsCache.splice(i, 1);
	                continue;
	            }
	            if (!AuthData.ScopeLimit || AuthData.ScopeLimit && AuthData.ScopeKey === ScopeKey) {
	                StsData = AuthData;
	                break;
	            }
	        }
	    })();

	    var calcAuthByTmpKey = function () {
	        var KeyTime = StsData.StartTime && StsData.ExpiredTime ? StsData.StartTime + ';' + StsData.ExpiredTime : '';
	        var Authorization = util_1.getAuth({
	            SecretId: StsData.TmpSecretId,
	            SecretKey: StsData.TmpSecretKey,
	            Method: params.Method,
	            Pathname: Pathname,
	            Query: params.Query,
	            Headers: headers,
	            Expires: params.Expires,
	            UseRawKey: self.options.UseRawKey,
	            SystemClockOffset: self.options.SystemClockOffset,
	            KeyTime: KeyTime
	        });
	        var AuthData = {
	            Authorization: Authorization,
	            SecurityToken: StsData.SecurityToken || StsData.XCosSecurityToken || '',
	            Token: StsData.Token || '',
	            ClientIP: StsData.ClientIP || '',
	            ClientUA: StsData.ClientUA || '',
	        };
	        cb(null, AuthData);
	    };
	    var checkAuthError = function (AuthData) {
	        if (AuthData.Authorization) {
	            // 检查签名格式
	            var formatAllow = false;
	            var auth = AuthData.Authorization;
	            if (auth) {
	                if (auth.indexOf(' ') > -1) {
	                    formatAllow = false;
	                } else if (auth.indexOf('q-sign-algorithm=') > -1 &&
	                    auth.indexOf('q-ak=') > -1 &&
	                    auth.indexOf('q-sign-time=') > -1 &&
	                    auth.indexOf('q-key-time=') > -1 &&
	                    auth.indexOf('q-url-param-list=') > -1) {
	                    formatAllow = true;
	                } else {
	                    try {
	                        auth = atob(auth);
	                        if (auth.indexOf('a=') > -1 &&
	                            auth.indexOf('k=') > -1 &&
	                            auth.indexOf('t=') > -1 &&
	                            auth.indexOf('r=') > -1 &&
	                            auth.indexOf('b=') > -1) {
	                            formatAllow = true;
	                        }
	                    } catch (e) {}
	                }
	            }
	            if (!formatAllow) return util_1.error(new Error('getAuthorization callback params format error'));
	        } else {
	            if (!AuthData.TmpSecretId) return util_1.error(new Error('getAuthorization callback params missing "TmpSecretId"'));
	            if (!AuthData.TmpSecretKey) return util_1.error(new Error('getAuthorization callback params missing "TmpSecretKey"'));
	            if (!AuthData.SecurityToken && !AuthData.XCosSecurityToken) return util_1.error(new Error('getAuthorization callback params missing "SecurityToken"'));
	            if (!AuthData.ExpiredTime) return util_1.error(new Error('getAuthorization callback params missing "ExpiredTime"'));
	            if (AuthData.ExpiredTime && AuthData.ExpiredTime.toString().length !== 10) return util_1.error(new Error('getAuthorization callback params "ExpiredTime" should be 10 digits'));
	            if (AuthData.StartTime && AuthData.StartTime.toString().length !== 10) return util_1.error(new Error('getAuthorization callback params "StartTime" should be 10 StartTime'));
	        }
	        return false;
	    };

	    // 先判断是否有临时密钥
	    if (StsData.ExpiredTime && StsData.ExpiredTime - (util_1.getSkewTime(self.options.SystemClockOffset) / 1000) > 60) { // 如果缓存的临时密钥有效，并还有超过60秒有效期就直接使用
	        calcAuthByTmpKey();
	    } else if (self.options.getAuthorization) { // 外部计算签名或获取临时密钥
	        self.options.getAuthorization.call(self, {
	            Bucket: Bucket,
	            Region: Region,
	            Method: params.Method,
	            Key: KeyName,
	            Pathname: Pathname,
	            Query: params.Query,
	            Headers: headers,
	            Scope: Scope,
	            SystemClockOffset: self.options.SystemClockOffset,
	        }, function (AuthData) {
	            if (typeof AuthData === 'string') AuthData = {Authorization: AuthData};
	            var AuthError = checkAuthError(AuthData);
	            if (AuthError) return cb(AuthError);
	            if (AuthData.Authorization) {
	                cb(null, AuthData);
	            } else {
	                StsData = AuthData || {};
	                StsData.Scope = Scope;
	                StsData.ScopeKey = ScopeKey;
	                self._StsCache.push(StsData);
	                calcAuthByTmpKey();
	            }
	        });
	    } else if (self.options.getSTS) { // 外部获取临时密钥
	        self.options.getSTS.call(self, {
	            Bucket: Bucket,
	            Region: Region,
	        }, function (data) {
	            StsData = data || {};
	            StsData.Scope = Scope;
	            StsData.ScopeKey = ScopeKey;
	            if (!StsData.TmpSecretId) StsData.TmpSecretId = StsData.SecretId;
	            if (!StsData.TmpSecretKey) StsData.TmpSecretKey = StsData.SecretKey;
	            var AuthError = checkAuthError(StsData);
	            if (AuthError) return cb(AuthError);
	            self._StsCache.push(StsData);
	            calcAuthByTmpKey();
	        });
	    } else { // 内部计算获取签名
	        return (function () {
	            var Authorization = util_1.getAuth({
	                SecretId: params.SecretId || self.options.SecretId,
	                SecretKey: params.SecretKey || self.options.SecretKey,
	                Method: params.Method,
	                Pathname: Pathname,
	                Query: params.Query,
	                Headers: headers,
	                Expires: params.Expires,
	                UseRawKey: self.options.UseRawKey,
	                SystemClockOffset: self.options.SystemClockOffset,
	            });
	            var AuthData = {
	                Authorization: Authorization,
	                SecurityToken: self.options.SecurityToken || self.options.XCosSecurityToken,
	            };
	            cb(null, AuthData);
	            return AuthData;
	        })();
	    }
	    return '';
	}

	// 调整时间偏差
	function allowRetry(err) {
	    var allowRetry = false;
	    var isTimeError = false;
	    var serverDate = (err.headers && (err.headers.date || err.headers.Date)) || (err.error && err.error.ServerTime);
	    try {
	        var errorCode = err.error.Code;
	        var errorMessage = err.error.Message;
	        if (errorCode === 'RequestTimeTooSkewed' ||
	            (errorCode === 'AccessDenied' && errorMessage === 'Request has expired')) {
	            isTimeError = true;
	        }
	    } catch (e) {
	    }
	    if (err) {
	        if (isTimeError && serverDate) {
	            var serverTime = Date.parse(serverDate);
	            if (this.options.CorrectClockSkew && Math.abs(util_1.getSkewTime(this.options.SystemClockOffset) - serverTime) >= 30000) {
	                console.error('error: Local time is too skewed.');
	                this.options.SystemClockOffset = serverTime - Date.now();
	                allowRetry = true;
	            }
	        } else if (Math.floor(err.statusCode / 100) === 5) {
	            allowRetry = true;
	        }
	    }
	    return allowRetry;
	}

	// 获取签名并发起请求
	function submitRequest(params, callback) {
	    var self = this;

	    // 处理 headers
	    !params.headers && (params.headers = {});

	    // 处理 query
	    !params.qs && (params.qs = {});
	    params.VersionId && (params.qs.versionId = params.VersionId);
	    params.qs = util_1.clearKey(params.qs);

	    // 清理 undefined 和 null 字段
	    params.headers && (params.headers = util_1.clearKey(params.headers));
	    params.qs && (params.qs = util_1.clearKey(params.qs));

	    var Query = util_1.clone(params.qs);
	    params.action && (Query[params.action] = '');

	    var next = function (tryTimes) {
	        var oldClockOffset = self.options.SystemClockOffset;
	        getAuthorizationAsync.call(self, {
	            Bucket: params.Bucket || '',
	            Region: params.Region || '',
	            Method: params.method,
	            Key: params.Key,
	            Query: Query,
	            Headers: params.headers,
	            Action: params.Action,
	            ResourceKey: params.ResourceKey,
	            Scope: params.Scope,
	        }, function (err, AuthData) {
	            if (err) {
	                callback(err);
	                return;
	            }
	            params.AuthData = AuthData;
	            _submitRequest.call(self, params, function (err, data) {
	                if (err && tryTimes < 2 && (oldClockOffset !== self.options.SystemClockOffset || allowRetry.call(self, err))) {
	                    if (params.headers) {
	                        delete params.headers.Authorization;
	                        delete params.headers['token'];
	                        delete params.headers['clientIP'];
	                        delete params.headers['clientUA'];
	                        delete params.headers['x-cos-security-token'];
	                    }
	                    next(tryTimes + 1);
	                } else {
	                    callback(err, data);
	                }
	            });
	        });
	    };
	    next(1);

	}

	// 发起请求
	function _submitRequest(params, callback) {
	    var self = this;
	    var TaskId = params.TaskId;
	    if (TaskId && !self._isRunningTask(TaskId)) return;

	    var bucket = params.Bucket;
	    var region = params.Region;
	    var object = params.Key;
	    var method = params.method || 'GET';
	    var url = params.url;
	    var body = params.body;
	    var rawBody = params.rawBody;

	    // url
	    url = url || getUrl({
	        ForcePathStyle: self.options.ForcePathStyle,
	        protocol: self.options.Protocol,
	        domain: self.options.Domain,
	        bucket: bucket,
	        region: region,
	        object: object,
	    });
	    if (params.action) {
	        url = url + '?' + params.action;
	    }

	    var opt = {
	        method: method,
	        url: url,
	        headers: params.headers,
	        qs: params.qs,
	        body: body,
	    };

	    // 获取签名
	    opt.headers.Authorization = params.AuthData.Authorization;
	    params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);
	    params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);
	    params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);
	    params.AuthData.SecurityToken && (opt.headers['x-cos-security-token'] = params.AuthData.SecurityToken);

	    // 清理 undefined 和 null 字段
	    opt.headers && (opt.headers = util_1.clearKey(opt.headers));
	    opt = util_1.clearKey(opt);

	    // progress
	    if (params.onProgress && typeof params.onProgress === 'function') {
	        var contentLength = body && (body.size || body.length) || 0;
	        opt.onProgress = function (e) {
	            if (TaskId && !self._isRunningTask(TaskId)) return;
	            var loaded = e ? e.loaded : 0;
	            params.onProgress({loaded: loaded, total: contentLength});
	        };
	    }
	    if (params.onDownloadProgress) {
	        opt.onDownloadProgress = params.onDownloadProgress;
	    }
	    if (params.DataType) {
	        opt.dataType = params.DataType;
	    }
	    if (this.options.Timeout) {
	        opt.timeout = this.options.Timeout;
	    }

	    self.options.ForcePathStyle && (opt.pathStyle = self.options.ForcePathStyle);
	    self.emit('before-send', opt);
	    var sender = (self.options.Request || request_1)(opt, function (r) {
	        if (r.error === 'abort') return;

	        // 抛出事件，允许修改返回值的 error、statusCode、statusMessage、body
	        self.emit('after-receive', r);
	        var response = {statusCode: r.statusCode, statusMessage: r.statusMessage, headers: r.headers};
	        var err = r.error;
	        var body = r.body;

	        // 返回内容添加 状态码 和 headers
	        var hasReturned;
	        var cb = function (err, data) {
	            TaskId && self.off('inner-kill-task', killTask);
	            if (hasReturned) return;
	            hasReturned = true;
	            var attrs = {};
	            response && response.statusCode && (attrs.statusCode = response.statusCode);
	            response && response.headers && (attrs.headers = response.headers);

	            if (err) {
	                err = util_1.extend(err || {}, attrs);
	                callback(err, null);
	            } else {
	                data = util_1.extend(data || {}, attrs);
	                callback(null, data);
	            }
	            sender = null;
	        };

	        // 请求错误，发生网络错误
	        if (err) return cb(util_1.error(err));

	        // 请求返回码不为 200
	        var statusCode = response.statusCode;
	        var statusSuccess = Math.floor(statusCode / 100) === 2; // 200 202 204 206

	        // 不对 body 进行转换，body 直接挂载返回
	        if (rawBody && statusSuccess) return cb(null, {body: body});

	        // 解析 xml body
	        var json;
	        try {
	            json = body && body.indexOf('<') > -1 && body.indexOf('>') > -1 && util_1.xml2json(body) || {};
	        } catch (e) {
	            json = {};
	        }

	        // 处理返回值
	        var xmlError = json && json.Error;
	        if (statusSuccess) { // 正确返回，状态码 2xx 时，body 不会有 Error
	            cb(null, json);
	        } else if (xmlError) { // 正常返回了 xml body，且有 Error 节点
	            cb(util_1.error(new Error(xmlError.Message), {code: xmlError.Code, error: xmlError}));
	        } else if (statusCode) { // 有错误的状态码
	            cb(util_1.error(new Error(response.statusMessage), {code: '' + statusCode}));
	        } else if (statusCode) { // 无状态码，或者获取不到状态码
	            cb(util_1.error(new Error('statusCode error')));
	        }
	    });

	    // kill task
	    var killTask = function (data) {
	        if (data.TaskId === TaskId) {
	            sender && sender.abort && sender.abort();
	            self.off('inner-kill-task', killTask);
	        }
	    };
	    TaskId && self.on('inner-kill-task', killTask);

	}


	var API_MAP$1 = {
	    // Bucket 相关方法
	    getService: getService,                      // Bucket
	    putBucket: putBucket,
	    headBucket: headBucket,                      // Bucket
	    getBucket: getBucket,
	    deleteBucket: deleteBucket,
	    putBucketAcl: putBucketAcl,                  // BucketACL
	    getBucketAcl: getBucketAcl,
	    putBucketCors: putBucketCors,                // BucketCors
	    getBucketCors: getBucketCors,
	    deleteBucketCors: deleteBucketCors,
	    getBucketLocation: getBucketLocation,        // BucketLocation
	    getBucketPolicy: getBucketPolicy,            // BucketPolicy
	    putBucketPolicy: putBucketPolicy,
	    deleteBucketPolicy: deleteBucketPolicy,
	    putBucketTagging: putBucketTagging,          // BucketTagging
	    getBucketTagging: getBucketTagging,
	    deleteBucketTagging: deleteBucketTagging,
	    putBucketLifecycle: putBucketLifecycle,      // BucketLifecycle
	    getBucketLifecycle: getBucketLifecycle,
	    deleteBucketLifecycle: deleteBucketLifecycle,
	    putBucketVersioning: putBucketVersioning,    // BucketVersioning
	    getBucketVersioning: getBucketVersioning,
	    putBucketReplication: putBucketReplication,  // BucketReplication
	    getBucketReplication: getBucketReplication,
	    deleteBucketReplication: deleteBucketReplication,
	    putBucketWebsite: putBucketWebsite,          // BucketWebsite
	    getBucketWebsite: getBucketWebsite,
	    deleteBucketWebsite: deleteBucketWebsite,
	    putBucketReferer: putBucketReferer,          // BucketReferer
	    getBucketReferer: getBucketReferer,
	    putBucketDomain: putBucketDomain,            // BucketDomain
	    getBucketDomain: getBucketDomain,
	    deleteBucketDomain: deleteBucketDomain,
	    putBucketOrigin: putBucketOrigin,            // BucketOrigin
	    getBucketOrigin: getBucketOrigin,
	    deleteBucketOrigin: deleteBucketOrigin,
	    putBucketLogging: putBucketLogging,             // BucketLogging
	    getBucketLogging: getBucketLogging,
	    putBucketInventory: putBucketInventory,         // BucketInventory
	    getBucketInventory: getBucketInventory,
	    listBucketInventory: listBucketInventory,
	    deleteBucketInventory: deleteBucketInventory,
	    putBucketAccelerate: putBucketAccelerate,
	    getBucketAccelerate: getBucketAccelerate,
	    putBucketEncryption: putBucketEncryption,
	    getBucketEncryption: getBucketEncryption,
	    deleteBucketEncryption: deleteBucketEncryption,

	    // Object 相关方法
	    getObject: getObject,
	    headObject: headObject,
	    listObjectVersions: listObjectVersions,
	    putObject: putObject,
	    deleteObject: deleteObject,
	    getObjectAcl: getObjectAcl,
	    putObjectAcl: putObjectAcl,
	    optionsObject: optionsObject,
	    putObjectCopy: putObjectCopy,
	    deleteMultipleObject: deleteMultipleObject,
	    restoreObject: restoreObject,
	    putObjectTagging: putObjectTagging,
	    getObjectTagging: getObjectTagging,
	    deleteObjectTagging: deleteObjectTagging,
	    selectObjectContent: selectObjectContent,

	    // 分块上传相关方法
	    uploadPartCopy: uploadPartCopy,
	    multipartInit: multipartInit,
	    multipartUpload: multipartUpload$1,
	    multipartComplete: multipartComplete,
	    multipartList: multipartList,
	    multipartListPart: multipartListPart,
	    multipartAbort: multipartAbort,

	    // 工具方法
	    request: request,
	    getObjectUrl: getObjectUrl,
	    getAuth: getAuth,
	};

	function warnOldApi(apiName, fn, proto) {
	    util_1.each(['Cors', 'Acl'], function (suffix) {
	        if (apiName.slice(-suffix.length) === suffix) {
	            var oldName = apiName.slice(0, -suffix.length) + suffix.toUpperCase();
	            var apiFn = util_1.apiWrapper(apiName, fn);
	            var warned = false;
	            proto[oldName] = function () {
	                !warned && console.warn('warning: cos.' + oldName + ' has been deprecated. Please Use cos.' + apiName + ' instead.');
	                warned = true;
	                apiFn.apply(this, arguments);
	            };
	        }
	    });
	}

	var init$1 = function (COS, task) {
	    task.transferToTaskMethod(API_MAP$1, 'putObject');
	    util_1.each(API_MAP$1, function (fn, apiName) {
	        COS.prototype[apiName] = util_1.apiWrapper(apiName, fn);
	        warnOldApi(apiName, fn, COS.prototype);
	    });
	};

	var base = {
		init: init$1
	};

	var eachLimit = function (arr, limit, iterator, callback) {
	    callback = callback || function () {};
	    if (!arr.length || limit <= 0) {
	        return callback();
	    }

	    var completed = 0;
	    var started = 0;
	    var running = 0;

	    (function replenish () {
	        if (completed >= arr.length) {
	            return callback();
	        }

	        while (running < limit && started < arr.length) {
	            started += 1;
	            running += 1;
	            iterator(arr[started - 1], function (err) {

	                if (err) {
	                    callback(err);
	                    callback = function () {};
	                } else {
	                    completed += 1;
	                    running -= 1;
	                    if (completed >= arr.length) {
	                        callback();
	                    } else {
	                        replenish();
	                    }
	                }
	            });
	        }
	    })();
	};

	var retry = function (times, iterator, callback) {
	    var next = function (index) {
	        iterator(function (err, data) {
	            if (err && index < times) {
	                next(index + 1);
	            } else {
	                callback(err, data);
	            }
	        });
	    };
	    if (times < 1) {
	        callback();
	    } else {
	        next(1);
	    }
	};

	var async = {
	    eachLimit: eachLimit,
	    retry: retry
	};

	var async_1 = async;

	var EventProxy = event.EventProxy;


	// 文件分块上传全过程，暴露的分块上传接口
	function sliceUploadFile(params, callback) {
	    var self = this;
	    var ep = new EventProxy();
	    var TaskId = params.TaskId;
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var Body = params.Body;
	    var ChunkSize = params.ChunkSize || params.SliceSize || self.options.ChunkSize;
	    var AsyncLimit = params.AsyncLimit;
	    var StorageClass = params.StorageClass;
	    var ServerSideEncryption = params.ServerSideEncryption;
	    var FileSize;

	    var onProgress;
	    var onHashProgress = params.onHashProgress;

	    // 上传过程中出现错误，返回错误
	    ep.on('error', function (err) {
	        if (!self._isRunningTask(TaskId)) return;
	        return callback(err);
	    });

	    // 上传分块完成，开始 uploadSliceComplete 操作
	    ep.on('upload_complete', function (UploadCompleteData) {
	        callback(null, UploadCompleteData);
	    });

	    // 上传分块完成，开始 uploadSliceComplete 操作
	    ep.on('upload_slice_complete', function (UploadData) {
	        var metaHeaders = {};
	        util_1.each(params.Headers, function (val, k) {
	            var shortKey = k.toLowerCase();
	            if (shortKey.indexOf('x-cos-meta-') === 0 || shortKey === 'pic-operations') metaHeaders[k] = val;
	        });
	        uploadSliceComplete.call(self, {
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            UploadId: UploadData.UploadId,
	            SliceList: UploadData.SliceList,
	            Headers: metaHeaders,
	        }, function (err, data) {
	            if (!self._isRunningTask(TaskId)) return;
	            session.removeUsing(UploadData.UploadId);
	            if (err) {
	                onProgress(null, true);
	                return ep.emit('error', err);
	            }
	            session.removeUploadId.call(self, UploadData.UploadId);
	            onProgress({loaded: FileSize, total: FileSize}, true);
	            ep.emit('upload_complete', data);
	        });
	    });

	    // 获取 UploadId 完成，开始上传每个分片
	    ep.on('get_upload_data_finish', function (UploadData) {

	        // 处理 UploadId 缓存
	        var uuid = session.getFileId(Body, params.ChunkSize, Bucket, Key);
	        uuid && session.saveUploadId.call(self, uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId
	        session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用

	        // 获取 UploadId
	        onProgress(null, true); // 任务状态开始 uploading
	        uploadSliceList.call(self, {
	            TaskId: TaskId,
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            Body: Body,
	            FileSize: FileSize,
	            SliceSize: ChunkSize,
	            AsyncLimit: AsyncLimit,
	            ServerSideEncryption: ServerSideEncryption,
	            UploadData: UploadData,
	            onProgress: onProgress
	        }, function (err, data) {
	            if (!self._isRunningTask(TaskId)) return;
	            if (err) {
	                onProgress(null, true);
	                return ep.emit('error', err);
	            }
	            ep.emit('upload_slice_complete', data);
	        });
	    });

	    // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传
	    ep.on('get_file_size_finish', function () {

	        onProgress = util_1.throttleOnProgress.call(self, FileSize, params.onProgress);

	        if (params.UploadData.UploadId) {
	            ep.emit('get_upload_data_finish', params.UploadData);
	        } else {
	            var _params = util_1.extend({
	                TaskId: TaskId,
	                Bucket: Bucket,
	                Region: Region,
	                Key: Key,
	                Headers: params.Headers,
	                StorageClass: StorageClass,
	                Body: Body,
	                FileSize: FileSize,
	                SliceSize: ChunkSize,
	                onHashProgress: onHashProgress,
	            }, params);
	            getUploadIdAndPartList.call(self, _params, function (err, UploadData) {
	                if (!self._isRunningTask(TaskId)) return;
	                if (err) return ep.emit('error', err);
	                params.UploadData.UploadId = UploadData.UploadId;
	                params.UploadData.PartList = UploadData.PartList;
	                ep.emit('get_upload_data_finish', params.UploadData);
	            });
	        }
	    });

	    // 获取上传文件大小
	    FileSize = params.ContentLength;
	    delete params.ContentLength;
	    !params.Headers && (params.Headers = {});
	    util_1.each(params.Headers, function (item, key) {
	        if (key.toLowerCase() === 'content-length') {
	            delete params.Headers[key];
	        }
	    });

	    // 控制分片大小
	    (function () {
	        var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
	        var AutoChunkSize = 1024 * 1024;
	        for (var i = 0; i < SIZE.length; i++) {
	            AutoChunkSize = SIZE[i] * 1024 * 1024;
	            if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
	        }
	        params.ChunkSize = params.SliceSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
	    })();

	    // 开始上传
	    if (FileSize === 0) {
	        params.Body = '';
	        params.ContentLength = 0;
	        params.SkipTask = true;
	        self.putObject(params, callback);
	    } else {
	        ep.emit('get_file_size_finish');
	    }

	}

	// 获取上传任务的 UploadId
	function getUploadIdAndPartList(params, callback) {
	    var TaskId = params.TaskId;
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var StorageClass = params.StorageClass;
	    var self = this;

	    // 计算 ETag
	    var ETagMap = {};
	    var FileSize = params.FileSize;
	    var SliceSize = params.SliceSize;
	    var SliceCount = Math.ceil(FileSize / SliceSize);
	    var FinishSize = 0;
	    var onHashProgress = util_1.throttleOnProgress.call(self, FileSize, params.onHashProgress);
	    var getChunkETag = function (PartNumber, callback) {
	        var start = SliceSize * (PartNumber - 1);
	        var end = Math.min(start + SliceSize, FileSize);
	        var ChunkSize = end - start;

	        if (ETagMap[PartNumber]) {
	            callback(null, {
	                PartNumber: PartNumber,
	                ETag: ETagMap[PartNumber],
	                Size: ChunkSize
	            });
	        } else {
	            util_1.fileSlice(params.Body, start, end, false, function (chunkItem) {
	                util_1.getFileMd5(chunkItem, function (err, md5) {
	                    if (err) return callback(util_1.error(err));
	                    var ETag = '"' + md5 + '"';
	                    ETagMap[PartNumber] = ETag;
	                    FinishSize += ChunkSize;
	                    onHashProgress({loaded: FinishSize, total: FileSize});
	                    callback(null, {
	                        PartNumber: PartNumber,
	                        ETag: ETag,
	                        Size: ChunkSize
	                    });
	                });
	            });
	        }
	    };

	    // 通过和文件的 md5 对比，判断 UploadId 是否可用
	    var isAvailableUploadList = function (PartList, callback) {
	        var PartCount = PartList.length;
	        // 如果没有分片，通过
	        if (PartCount === 0) {
	            return callback(null, true);
	        }
	        // 检查分片数量
	        if (PartCount > SliceCount) {
	            return callback(null, false);
	        }
	        // 检查分片大小
	        if (PartCount > 1) {
	            var PartSliceSize = Math.max(PartList[0].Size, PartList[1].Size);
	            if (PartSliceSize !== SliceSize) {
	                return callback(null, false);
	            }
	        }
	        // 逐个分片计算并检查 ETag 是否一致
	        var next = function (index) {
	            if (index < PartCount) {
	                var Part = PartList[index];
	                getChunkETag(Part.PartNumber, function (err, chunk) {
	                    if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {
	                        next(index + 1);
	                    } else {
	                        callback(null, false);
	                    }
	                });
	            } else {
	                callback(null, true);
	            }
	        };
	        next(0);
	    };

	    var ep = new EventProxy();
	    ep.on('error', function (errData) {
	        if (!self._isRunningTask(TaskId)) return;
	        return callback(errData);
	    });

	    // 存在 UploadId
	    ep.on('upload_id_available', function (UploadData) {
	        // 转换成 map
	        var map = {};
	        var list = [];
	        util_1.each(UploadData.PartList, function (item) {
	            map[item.PartNumber] = item;
	        });
	        for (var PartNumber = 1; PartNumber <= SliceCount; PartNumber++) {
	            var item = map[PartNumber];
	            if (item) {
	                item.PartNumber = PartNumber;
	                item.Uploaded = true;
	            } else {
	                item = {
	                    PartNumber: PartNumber,
	                    ETag: null,
	                    Uploaded: false
	                };
	            }
	            list.push(item);
	        }
	        UploadData.PartList = list;
	        callback(null, UploadData);
	    });

	    // 不存在 UploadId, 初始化生成 UploadId
	    ep.on('no_available_upload_id', function () {
	        if (!self._isRunningTask(TaskId)) return;
	        var _params = util_1.extend({
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            Headers: util_1.clone(params.Headers),
	            Query: util_1.clone(params.Query),
	            StorageClass: StorageClass,
	            Body: params.Body,
	        }, params);
	        self.multipartInit(_params, function (err, data) {
	            if (!self._isRunningTask(TaskId)) return;
	            if (err) return ep.emit('error', err);
	            var UploadId = data.UploadId;
	            if (!UploadId) {
	                return callback(util_1.error(new Error('no such upload id')));
	            }
	            ep.emit('upload_id_available', {UploadId: UploadId, PartList: []});
	        });
	    });

	    // 如果已存在 UploadId，找一个可以用的 UploadId
	    ep.on('has_and_check_upload_id', function (UploadIdList) {
	        // 串行地，找一个内容一致的 UploadId
	        UploadIdList = UploadIdList.reverse();
	        async_1.eachLimit(UploadIdList, 1, function (UploadId, asyncCallback) {
	            if (!self._isRunningTask(TaskId)) return;
	            // 如果正在上传，跳过
	            if (session.using[UploadId]) {
	                asyncCallback(); // 检查下一个 UploadId
	                return;
	            }
	            // 判断 UploadId 是否可用
	            wholeMultipartListPart.call(self, {
	                Bucket: Bucket,
	                Region: Region,
	                Key: Key,
	                UploadId: UploadId,
	            }, function (err, PartListData) {
	                if (!self._isRunningTask(TaskId)) return;
	                if (err) {
	                    session.removeUsing(UploadId);
	                    return ep.emit('error', err);
	                }
	                var PartList = PartListData.PartList;
	                PartList.forEach(function (item) {
	                    item.PartNumber *= 1;
	                    item.Size *= 1;
	                    item.ETag = item.ETag || '';
	                });
	                isAvailableUploadList(PartList, function (err, isAvailable) {
	                    if (!self._isRunningTask(TaskId)) return;
	                    if (err) return ep.emit('error', err);
	                    if (isAvailable) {
	                        asyncCallback({
	                            UploadId: UploadId,
	                            PartList: PartList
	                        }); // 马上结束
	                    } else {
	                        asyncCallback(); // 检查下一个 UploadId
	                    }
	                });
	            });
	        }, function (AvailableUploadData) {
	            if (!self._isRunningTask(TaskId)) return;
	            onHashProgress(null, true);
	            if (AvailableUploadData && AvailableUploadData.UploadId) {
	                ep.emit('upload_id_available', AvailableUploadData);
	            } else {
	                ep.emit('no_available_upload_id');
	            }
	        });
	    });

	    // 在本地缓存找可用的 UploadId
	    ep.on('seek_local_avail_upload_id', function (RemoteUploadIdList) {
	        // 在本地找可用的 UploadId
	        var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key);
	        var LocalUploadIdList = session.getUploadIdList.call(self, uuid);
	        if (!uuid || !LocalUploadIdList) {
	            ep.emit('has_and_check_upload_id', RemoteUploadIdList);
	            return;
	        }
	        var next = function (index) {
	            // 如果本地找不到可用 UploadId，再一个个遍历校验远端
	            if (index >= LocalUploadIdList.length) {
	                ep.emit('has_and_check_upload_id', RemoteUploadIdList);
	                return;
	            }
	            var UploadId = LocalUploadIdList[index];
	            // 如果不在远端 UploadId 列表里，跳过并删除
	            if (!util_1.isInArray(RemoteUploadIdList, UploadId)) {
	                session.removeUploadId.call(self, UploadId);
	                next(index + 1);
	                return;
	            }
	            // 如果正在上传，跳过
	            if (session.using[UploadId]) {
	                next(index + 1);
	                return;
	            }
	            // 判断 UploadId 是否存在线上
	            wholeMultipartListPart.call(self, {
	                Bucket: Bucket,
	                Region: Region,
	                Key: Key,
	                UploadId: UploadId,
	            }, function (err, PartListData) {
	                if (!self._isRunningTask(TaskId)) return;
	                if (err) {
	                    // 如果 UploadId 获取会出错，跳过并删除
	                    session.removeUploadId.call(self, UploadId);
	                    next(index + 1);
	                } else {
	                    // 找到可用 UploadId
	                    ep.emit('upload_id_available', {
	                        UploadId: UploadId,
	                        PartList: PartListData.PartList,
	                    });
	                }
	            });
	        };
	        next(0);
	    });

	    // 获取线上 UploadId 列表
	    ep.on('get_remote_upload_id_list', function () {
	        // 获取符合条件的 UploadId 列表，因为同一个文件可以有多个上传任务。
	        wholeMultipartList.call(self, {
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	        }, function (err, data) {
	            if (!self._isRunningTask(TaskId)) return;
	            if (err) return ep.emit('error', err);
	            // 整理远端 UploadId 列表
	            var RemoteUploadIdList = util_1.filter(data.UploadList, function (item) {
	                return item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase());
	            }).reverse().map(function (item) {
	                return item.UploadId || item.UploadID;
	            });
	            if (RemoteUploadIdList.length) {
	                ep.emit('seek_local_avail_upload_id', RemoteUploadIdList);
	            } else {
	                // 远端没有 UploadId，清理缓存的 UploadId
	                var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key), LocalUploadIdList;
	                if (uuid && (LocalUploadIdList = session.getUploadIdList.call(self, uuid))) {
	                    util_1.each(LocalUploadIdList, function (UploadId) {
	                        session.removeUploadId.call(self, UploadId);
	                    });
	                }
	                ep.emit('no_available_upload_id');
	            }
	        });
	    });

	    // 开始找可用 UploadId
	    ep.emit('get_remote_upload_id_list');

	}

	// 获取符合条件的全部上传任务 (条件包括 Bucket, Region, Prefix)
	function wholeMultipartList(params, callback) {
	    var self = this;
	    var UploadList = [];
	    var sendParams = {
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Prefix: params.Key
	    };
	    var next = function () {
	        self.multipartList(sendParams, function (err, data) {
	            if (err) return callback(err);
	            UploadList.push.apply(UploadList, data.Upload || []);
	            if (data.IsTruncated === 'true') { // 列表不完整
	                sendParams.KeyMarker = data.NextKeyMarker;
	                sendParams.UploadIdMarker = data.NextUploadIdMarker;
	                next();
	            } else {
	                callback(null, {UploadList: UploadList});
	            }
	        });
	    };
	    next();
	}

	// 获取指定上传任务的分块列表
	function wholeMultipartListPart(params, callback) {
	    var self = this;
	    var PartList = [];
	    var sendParams = {
	        Bucket: params.Bucket,
	        Region: params.Region,
	        Key: params.Key,
	        UploadId: params.UploadId
	    };
	    var next = function () {
	        self.multipartListPart(sendParams, function (err, data) {
	            if (err) return callback(err);
	            PartList.push.apply(PartList, data.Part || []);
	            if (data.IsTruncated === 'true') { // 列表不完整
	                sendParams.PartNumberMarker = data.NextPartNumberMarker;
	                next();
	            } else {
	                callback(null, {PartList: PartList});
	            }
	        });
	    };
	    next();
	}

	// 上传文件分块，包括
	/*
	 UploadId (上传任务编号)
	 AsyncLimit (并发量)，
	 SliceList (上传的分块数组)，
	 FilePath (本地文件的位置)，
	 SliceSize (文件分块大小)
	 FileSize (文件大小)
	 onProgress (上传成功之后的回调函数)
	 */
	function uploadSliceList(params, cb) {
	    var self = this;
	    var TaskId = params.TaskId;
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var UploadData = params.UploadData;
	    var FileSize = params.FileSize;
	    var SliceSize = params.SliceSize;
	    var ChunkParallel = Math.min(params.AsyncLimit || self.options.ChunkParallelLimit || 1, 256);
	    var Body = params.Body;
	    var SliceCount = Math.ceil(FileSize / SliceSize);
	    var FinishSize = 0;
	    var ServerSideEncryption = params.ServerSideEncryption;
	    var needUploadSlices = util_1.filter(UploadData.PartList, function (SliceItem) {
	        if (SliceItem['Uploaded']) {
	            FinishSize += SliceItem['PartNumber'] >= SliceCount ? (FileSize % SliceSize || SliceSize) : SliceSize;
	        }
	        return !SliceItem['Uploaded'];
	    });
	    var onProgress = params.onProgress;

	    async_1.eachLimit(needUploadSlices, ChunkParallel, function (SliceItem, asyncCallback) {
	        if (!self._isRunningTask(TaskId)) return;
	        var PartNumber = SliceItem['PartNumber'];
	        var currentSize = Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;
	        var preAddSize = 0;
	        uploadSliceItem.call(self, {
	            TaskId: TaskId,
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            SliceSize: SliceSize,
	            FileSize: FileSize,
	            PartNumber: PartNumber,
	            ServerSideEncryption: ServerSideEncryption,
	            Body: Body,
	            UploadData: UploadData,
	            onProgress: function (data) {
	                FinishSize += data.loaded - preAddSize;
	                preAddSize = data.loaded;
	                onProgress({loaded: FinishSize, total: FileSize});
	            },
	        }, function (err, data) {
	            if (!self._isRunningTask(TaskId)) return;
	            if (!err && !data.ETag) err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.';
	            if (err) {
	                FinishSize -= preAddSize;
	            } else {
	                FinishSize += currentSize - preAddSize;
	                SliceItem.ETag = data.ETag;
	            }
	            onProgress({loaded: FinishSize, total: FileSize});
	            asyncCallback(err || null, data);
	        });
	    }, function (err) {
	        if (!self._isRunningTask(TaskId)) return;
	        if (err) return cb(err);
	        cb(null, {
	            UploadId: UploadData.UploadId,
	            SliceList: UploadData.PartList
	        });
	    });
	}

	// 上传指定分片
	function uploadSliceItem(params, callback) {
	    var self = this;
	    var TaskId = params.TaskId;
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var FileSize = params.FileSize;
	    var FileBody = params.Body;
	    var PartNumber = params.PartNumber * 1;
	    var SliceSize = params.SliceSize;
	    var ServerSideEncryption = params.ServerSideEncryption;
	    var UploadData = params.UploadData;
	    var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;

	    var start = SliceSize * (PartNumber - 1);

	    var ContentLength = SliceSize;

	    var end = start + SliceSize;

	    if (end > FileSize) {
	        end = FileSize;
	        ContentLength = end - start;
	    }

	    var PartItem = UploadData.PartList[PartNumber - 1];
	    async_1.retry(ChunkRetryTimes, function (tryCallback) {
	        if (!self._isRunningTask(TaskId)) return;
	        util_1.fileSlice(FileBody, start, end, true, function (Body) {
	            self.multipartUpload({
	                TaskId: TaskId,
	                Bucket: Bucket,
	                Region: Region,
	                Key: Key,
	                ContentLength: ContentLength,
	                PartNumber: PartNumber,
	                UploadId: UploadData.UploadId,
	                ServerSideEncryption: ServerSideEncryption,
	                Body: Body,
	                onProgress: params.onProgress,
	            }, function (err, data) {
	                if (!self._isRunningTask(TaskId)) return;
	                if (err) return tryCallback(err);
	                PartItem.Uploaded = true;
	                return tryCallback(null, data);
	            });
	        });
	    }, function (err, data) {
	        if (!self._isRunningTask(TaskId)) return;
	        return callback(err, data);
	    });
	}


	// 完成分块上传
	function uploadSliceComplete(params, callback) {
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var UploadId = params.UploadId;
	    var SliceList = params.SliceList;
	    var self = this;
	    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
	    var Headers = params.Headers;
	    var Parts = SliceList.map(function (item) {
	        return {
	            PartNumber: item.PartNumber,
	            ETag: item.ETag
	        };
	    });
	    // 完成上传的请求也做重试
	    async_1.retry(ChunkRetryTimes, function (tryCallback) {
	        self.multipartComplete({
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            UploadId: UploadId,
	            Parts: Parts,
	            Headers: Headers,
	        }, tryCallback);
	    }, function (err, data) {
	        callback(err, data);
	    });
	}

	// 抛弃分块上传任务
	/*
	 AsyncLimit (抛弃上传任务的并发量)，
	 UploadId (上传任务的编号，当 Level 为 task 时候需要)
	 Level (抛弃分块上传任务的级别，task : 抛弃指定的上传任务，file ： 抛弃指定的文件对应的上传任务，其他值 ：抛弃指定Bucket 的全部上传任务)
	 */
	function abortUploadTask(params, callback) {
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var UploadId = params.UploadId;
	    var Level = params.Level || 'task';
	    var AsyncLimit = params.AsyncLimit;
	    var self = this;

	    var ep = new EventProxy();

	    ep.on('error', function (errData) {
	        return callback(errData);
	    });

	    // 已经获取到需要抛弃的任务列表
	    ep.on('get_abort_array', function (AbortArray) {
	        abortUploadTaskArray.call(self, {
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            Headers: params.Headers,
	            AsyncLimit: AsyncLimit,
	            AbortArray: AbortArray
	        }, callback);
	    });

	    if (Level === 'bucket') {
	        // Bucket 级别的任务抛弃，抛弃该 Bucket 下的全部上传任务
	        wholeMultipartList.call(self, {
	            Bucket: Bucket,
	            Region: Region
	        }, function (err, data) {
	            if (err) return callback(err);
	            ep.emit('get_abort_array', data.UploadList || []);
	        });
	    } else if (Level === 'file') {
	        // 文件级别的任务抛弃，抛弃该文件的全部上传任务
	        if (!Key) return callback(util_1.error(new Error('abort_upload_task_no_key')));
	        wholeMultipartList.call(self, {
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key
	        }, function (err, data) {
	            if (err) return callback(err);
	            ep.emit('get_abort_array', data.UploadList || []);
	        });
	    } else if (Level === 'task') {
	        // 单个任务级别的任务抛弃，抛弃指定 UploadId 的上传任务
	        if (!UploadId) return callback(util_1.error(new Error('abort_upload_task_no_id')));
	        if (!Key) return callback(util_1.error(new Error('abort_upload_task_no_key')));
	        ep.emit('get_abort_array', [{
	            Key: Key,
	            UploadId: UploadId
	        }]);
	    } else {
	        return callback(util_1.error(new Error('abort_unknown_level')));
	    }
	}

	// 批量抛弃分块上传任务
	function abortUploadTaskArray(params, callback) {

	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var AbortArray = params.AbortArray;
	    var AsyncLimit = params.AsyncLimit || 1;
	    var self = this;

	    var index = 0;
	    var resultList = new Array(AbortArray.length);
	    async_1.eachLimit(AbortArray, AsyncLimit, function (AbortItem, nextItem) {
	        var eachIndex = index;
	        if (Key && Key !== AbortItem.Key) {
	            resultList[eachIndex] = {error: {KeyNotMatch: true}};
	            nextItem(null);
	            return;
	        }
	        var UploadId = AbortItem.UploadId || AbortItem.UploadID;

	        self.multipartAbort({
	            Bucket: Bucket,
	            Region: Region,
	            Key: AbortItem.Key,
	            Headers: params.Headers,
	            UploadId: UploadId
	        }, function (err) {
	            var task = {
	                Bucket: Bucket,
	                Region: Region,
	                Key: AbortItem.Key,
	                UploadId: UploadId
	            };
	            resultList[eachIndex] = {error: err, task: task};
	            nextItem(null);
	        });
	        index++;

	    }, function (err) {
	        if (err) return callback(err);

	        var successList = [];
	        var errorList = [];

	        for (var i = 0, len = resultList.length; i < len; i++) {
	            var item = resultList[i];
	            if (item['task']) {
	                if (item['error']) {
	                    errorList.push(item['task']);
	                } else {
	                    successList.push(item['task']);
	                }
	            }
	        }

	        return callback(null, {
	            successList: successList,
	            errorList: errorList
	        });
	    });
	}


	// 批量上传文件
	function uploadFiles(params, callback) {
	    var self = this;

	    // 判断多大的文件使用分片上传
	    var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;

	    // 汇总返回进度
	    var TotalSize = 0;
	    var TotalFinish = 0;
	    var onTotalProgress = util_1.throttleOnProgress.call(self, TotalFinish, params.onProgress);

	    // 汇总返回回调
	    var unFinishCount = params.files.length;
	    var _onTotalFileFinish = params.onFileFinish;
	    var resultList = Array(unFinishCount);
	    var onTotalFileFinish = function (err, data, options) {
	        onTotalProgress(null, true);
	        _onTotalFileFinish && _onTotalFileFinish(err, data, options);
	        resultList[options.Index] = {
	            options: options,
	            error: err,
	            data: data
	        };
	        if (--unFinishCount <= 0 && callback) {
	            callback(null, {files: resultList});
	        }
	    };

	    // 开始处理每个文件
	    var taskList = [];
	    util_1.each(params.files, function (fileParams, index) {
	        (function () { // 对齐 nodejs 缩进

	            var Body = fileParams.Body;
	            var FileSize = Body.size || Body.length || 0;
	            var fileInfo = {Index: index, TaskId: ''};

	            // 更新文件总大小
	            TotalSize += FileSize;

	            // 整理 option，用于返回给回调
	            util_1.each(fileParams, function (v, k) {
	                if (typeof v !== 'object' && typeof v !== 'function') {
	                    fileInfo[k] = v;
	                }
	            });

	            // 处理单个文件 TaskReady
	            var _onTaskReady = fileParams.onTaskReady;
	            var onTaskReady = function (tid) {
	                fileInfo.TaskId = tid;
	                _onTaskReady && _onTaskReady(tid);
	            };
	            fileParams.onTaskReady = onTaskReady;

	            // 处理单个文件进度
	            var PreAddSize = 0;
	            var _onProgress = fileParams.onProgress;
	            var onProgress = function (info) {
	                TotalFinish = TotalFinish - PreAddSize + info.loaded;
	                PreAddSize = info.loaded;
	                _onProgress && _onProgress(info);
	                onTotalProgress({loaded: TotalFinish, total: TotalSize});
	            };
	            fileParams.onProgress = onProgress;

	            // 处理单个文件完成
	            var _onFileFinish = fileParams.onFileFinish;
	            var onFileFinish = function (err, data) {
	                _onFileFinish && _onFileFinish(err, data);
	                onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);
	            };

	            // 添加上传任务
	            var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';
	            taskList.push({
	                api: api,
	                params: fileParams,
	                callback: onFileFinish,
	            });
	        })();
	    });
	    self._addTasks(taskList);
	}

	// 分片复制文件
	function sliceCopyFile(params, callback) {
	    var ep = new EventProxy();

	    var self = this;
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var CopySource = params.CopySource;
	    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
	    if (!m) {
	        callback(util_1.error(new Error('CopySource format error')));
	        return;
	    }

	    var SourceBucket = m[1];
	    var SourceRegion = m[3];
	    var SourceKey = decodeURIComponent(m[4]);
	    var CopySliceSize = params.CopySliceSize === undefined ? self.options.CopySliceSize : params.CopySliceSize;
	    CopySliceSize = Math.max(0, CopySliceSize);

	    var ChunkSize = params.CopyChunkSize || this.options.CopyChunkSize;
	    var ChunkParallel = this.options.CopyChunkParallelLimit;

	    var FinishSize = 0;
	    var FileSize;
	    var onProgress;

	    // 分片复制完成，开始 multipartComplete 操作
	    ep.on('copy_slice_complete', function (UploadData) {
	        util_1.each(params.Headers, function (val, k) {
	            if (k.toLowerCase().indexOf('x-cos-meta-') === 0) ;
	        });
	        var Parts = util_1.map(UploadData.PartList, function (item) {
	            return {
	                PartNumber: item.PartNumber,
	                ETag: item.ETag,
	            };
	        });
	        self.multipartComplete({
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            UploadId: UploadData.UploadId,
	            Parts: Parts,
	        },function (err, data) {
	            if (err) {
	                onProgress(null, true);
	                return callback(err);
	            }
	            onProgress({loaded: FileSize, total: FileSize}, true);
	            callback(null, data);
	        });
	    });

	    ep.on('get_copy_data_finish',function (UploadData) {
	        async_1.eachLimit(UploadData.PartList, ChunkParallel, function (SliceItem, asyncCallback) {
	            var PartNumber = SliceItem.PartNumber;
	            var CopySourceRange = SliceItem.CopySourceRange;
	            var currentSize = SliceItem.end - SliceItem.start;

	            copySliceItem.call(self, {
	                Bucket: Bucket,
	                Region: Region,
	                Key: Key,
	                CopySource: CopySource,
	                UploadId: UploadData.UploadId,
	                PartNumber: PartNumber,
	                CopySourceRange: CopySourceRange,
	            },function (err,data) {
	                if (err) return asyncCallback(err);
	                FinishSize += currentSize;
	                onProgress({loaded: FinishSize, total: FileSize});
	                SliceItem.ETag = data.ETag;
	                asyncCallback(err || null, data);
	            });
	        }, function (err) {
	            if (err) {
	                onProgress(null, true);
	                return callback(err);
	            }

	            ep.emit('copy_slice_complete', UploadData);
	        });
	    });

	    ep.on('get_file_size_finish', function (SourceHeaders) {
	        // 控制分片大小
	        (function () {
	            var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
	            var AutoChunkSize = 1024 * 1024;
	            for (var i = 0; i < SIZE.length; i++) {
	                AutoChunkSize = SIZE[i] * 1024 * 1024;
	                if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
	            }
	            params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);

	            var ChunkCount = Math.ceil(FileSize / ChunkSize);

	            var list = [];
	            for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {
	                var start = (partNumber - 1) * ChunkSize;
	                var end = partNumber * ChunkSize < FileSize ? (partNumber * ChunkSize - 1) : FileSize - 1;
	                var item = {
	                    PartNumber: partNumber,
	                    start: start,
	                    end: end,
	                    CopySourceRange: "bytes=" + start + "-" + end,
	                };
	                list.push(item);
	            }
	            params.PartList = list;
	        })();

	        var TargetHeader;
	        if (params.Headers['x-cos-metadata-directive'] === 'Replaced') {
	            TargetHeader = params.Headers;
	        } else {
	            TargetHeader = SourceHeaders;
	        }
	        TargetHeader['x-cos-storage-class'] = params.Headers['x-cos-storage-class'] || SourceHeaders['x-cos-storage-class'];
	        TargetHeader = util_1.clearKey(TargetHeader);
	        /**
	         * 对于归档存储的对象，如果未恢复副本，则不允许 Copy
	         */
	        if (SourceHeaders['x-cos-storage-class'] === 'ARCHIVE' || SourceHeaders['x-cos-storage-class'] === 'DEEP_ARCHIVE') {
	            var restoreHeader = SourceHeaders['x-cos-restore'];
	            if (!restoreHeader || restoreHeader === 'ongoing-request="true"') {
	                callback(util_1.error(new Error('Unrestored archive object is not allowed to be copied')));
	                return;
	            }
	        }
	        /**
	         * 去除一些无用的头部，规避 multipartInit 出错
	         * 这些头部通常是在 putObjectCopy 时才使用
	         */
	        delete TargetHeader['x-cos-copy-source'];
	        delete TargetHeader['x-cos-metadata-directive'];
	        delete TargetHeader['x-cos-copy-source-If-Modified-Since'];
	        delete TargetHeader['x-cos-copy-source-If-Unmodified-Since'];
	        delete TargetHeader['x-cos-copy-source-If-Match'];
	        delete TargetHeader['x-cos-copy-source-If-None-Match'];
	        self.multipartInit({
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            Headers: TargetHeader,
	        },function (err,data) {
	            if (err) return callback(err);
	            params.UploadId = data.UploadId;
	            ep.emit('get_copy_data_finish', params);
	        });
	    });

	    // 获取远端复制源文件的大小
	    self.headObject({
	        Bucket: SourceBucket,
	        Region: SourceRegion,
	        Key: SourceKey,
	    },function(err, data) {
	        if (err) {
	            if (err.statusCode && err.statusCode === 404) {
	                callback(util_1.error(err, {ErrorStatus: SourceKey + ' Not Exist'}));
	            } else {
	                callback(err);
	            }
	            return;
	        }

	        FileSize = params.FileSize = data.headers['content-length'];
	        if (FileSize === undefined || !FileSize) {
	            callback(util_1.error(new Error('get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.')));
	            return;
	        }

	        onProgress = util_1.throttleOnProgress.call(self, FileSize, params.onProgress);

	        // 开始上传
	        if (FileSize <= CopySliceSize) {
	            if (!params.Headers['x-cos-metadata-directive']) {
	                params.Headers['x-cos-metadata-directive'] = 'Copy';
	            }
	            self.putObjectCopy(params, function (err, data) {
	                if (err) {
	                    onProgress(null, true);
	                    return callback(err);
	                }
	                onProgress({loaded: FileSize, total: FileSize}, true);
	                callback(err, data);
	            });
	        } else {
	            var resHeaders = data.headers;
	            var SourceHeaders = {
	                'Cache-Control': resHeaders['cache-control'],
	                'Content-Disposition': resHeaders['content-disposition'],
	                'Content-Encoding': resHeaders['content-encoding'],
	                'Content-Type': resHeaders['content-type'],
	                'Expires': resHeaders['expires'],
	                'x-cos-storage-class': resHeaders['x-cos-storage-class'],
	            };
	            util_1.each(resHeaders, function (v, k) {
	                var metaPrefix = 'x-cos-meta-';
	                if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {
	                    SourceHeaders[k] = v;
	                }
	            });
	            ep.emit('get_file_size_finish', SourceHeaders);
	        }
	    });
	}

	// 复制指定分片
	function copySliceItem(params, callback) {
	    var TaskId = params.TaskId;
	    var Bucket = params.Bucket;
	    var Region = params.Region;
	    var Key = params.Key;
	    var CopySource = params.CopySource;
	    var UploadId = params.UploadId;
	    var PartNumber = params.PartNumber * 1;
	    var CopySourceRange = params.CopySourceRange;

	    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
	    var self = this;

	    async_1.retry(ChunkRetryTimes, function (tryCallback) {
	        self.uploadPartCopy({
	            TaskId: TaskId,
	            Bucket: Bucket,
	            Region: Region,
	            Key: Key,
	            CopySource: CopySource,
	            UploadId: UploadId,
	            PartNumber:PartNumber,
	            CopySourceRange:CopySourceRange,
	        },function (err,data) {
	            tryCallback(err || null, data);
	        });
	    }, function (err, data) {
	        return callback(err, data);
	    });
	}


	var API_MAP = {
	    sliceUploadFile: sliceUploadFile,
	    abortUploadTask: abortUploadTask,
	    uploadFiles: uploadFiles,
	    sliceCopyFile: sliceCopyFile,
	};

	var init = function (COS, task) {
	    task.transferToTaskMethod(API_MAP, 'sliceUploadFile');
	    util_1.each(API_MAP, function (fn, apiName) {
	        COS.prototype[apiName] = util_1.apiWrapper(apiName, fn);
	    });
	};

	var advance = {
		init: init
	};

	var defaultOptions = {
	    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
	    SecretId: '',
	    SecretKey: '',
	    SecurityToken: '', // 使用临时密钥需要注意自行刷新 Token
	    ChunkRetryTimes: 2,
	    FileParallelLimit: 3,
	    ChunkParallelLimit: 3,
	    ChunkSize: 1024 * 1024,
	    SliceSize: 1024 * 1024,
	    CopyChunkParallelLimit: 20,
	    CopyChunkSize: 1024 * 1024 * 10,
	    CopySliceSize: 1024 * 1024 * 10,
	    MaxPartNumber: 10000,
	    ProgressInterval: 1000,
	    Domain: '',
	    ServiceDomain: '',
	    Protocol: '',
	    CompatibilityMode: false,
	    ForcePathStyle: false,
	    UseRawKey: false,
	    Timeout: 0, // 单位毫秒，0 代表不设置超时时间
	    CorrectClockSkew: true,
	    SystemClockOffset: 0, // 单位毫秒，ms
	    UploadCheckContentMd5: false,
	    UploadQueueSize: 10000,
	    UploadAddMetaMd5: false,
	    UploadIdCacheLimit: 50,
	};

	// 对外暴露的类
	var COS = function (options) {
	    this.options = util_1.extend(util_1.clone(defaultOptions), options || {});
	    this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit);
	    this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit);
	    this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes);
	    this.options.ChunkSize = Math.max(1024 * 1024, this.options.ChunkSize);
	    this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit);
	    this.options.CopyChunkSize = Math.max(1024 * 1024, this.options.CopyChunkSize);
	    this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize);
	    this.options.MaxPartNumber = Math.max(1024, Math.min(10000, this.options.MaxPartNumber));
	    this.options.Timeout = Math.max(0, this.options.Timeout);
	    if (this.options.AppId) {
	        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
	    }
	    event.init(this);
	    task.init(this);
	};

	base.init(COS, task);
	advance.init(COS, task);

	COS.getAuthorization = util_1.getAuth;
	COS.version = '1.2.8';

	var cos = COS;

	var cosJsSdkV5 = cos;

	var CRM_TOKEN_KEY = "CRM_TOKEN_KEY";
	var $http;
	var url;
	var fileObj;
	var partSize; // interface ISingle {
	//   name: string;
	//   key: string;
	//   policy: string;
	//   OSSAccessKeyId: string;
	//   success_action_status: string;
	//   signature: string;
	//   file: File;
	//   bucket?: string;
	//   region?: string;
	//   path?: string;
	// }
	//
	// interface IMult {
	//   accessKeyId: string;
	//   accessKeySecret: string;
	//   bucket: string;
	//   region: string;
	//   stsToken: string;
	//   path?: string;
	// }

	/**
	 * createFormData
	 * 将对象转成formData
	 *
	 * */

	function createFormData(config) {
	  var formData = new FormData();

	  if (Object.prototype.toString.call(config) === "[object Object]" && Object.keys(config).length > 0) {
	    Object.keys(config).forEach(function (key) {
	      return formData.append(key, config[key]);
	    });
	  }

	  return formData;
	}
	/**
	 * handleGetUpToken
	 * 根据参数类型获取云服务器的参数
	 *
	 * */


	function handleGetUpToken(ext, name, type, cloud) {
	  ext = ext.split("/")[1];

	  var _JSON$parse = JSON.parse(localStorage.getItem(CRM_TOKEN_KEY)),
	      klzz_ol_token = _JSON$parse.klzz_ol_token,
	      klzz_ol_uid = _JSON$parse.klzz_ol_uid,
	      klzz_ol_time = _JSON$parse.klzz_ol_time;

	  return new Promise(function (resolve, reject) {
	    $http.post("/train/v1/alioss/get_oss_config", {
	      driver: cloud || "aly_oss",
	      klzzOlTime: klzz_ol_time,
	      klzzOlToken: klzz_ol_token,
	      klzzOlUid: klzz_ol_uid,
	      ext: ext,
	      name: name,
	      type: type
	    }).then(function (res) {
	      resolve(res);
	    }).catch(function (err) {
	      reject(err);
	    });
	  });
	}
	/**
	 * handleAliSingle
	 * aliyun postObject 方式上传单个文件
	 *
	 * */


	function handleAliSingle(config) {
	  var bucket = config.bucket,
	      region = config.region,
	      path = config.path;
	  delete config.bucket;
	  delete config.region;
	  delete config.path;
	  var configData = createFormData(config);
	  var url = "https://".concat(bucket, ".").concat(region, ".aliyuncs.com/");
	  var header = {
	    headers: {
	      contentType: "application/json;charset=UTF-8"
	    }
	  };
	  return new Promise(function (resolve, reject) {
	    $http.post(url, configData, header).then(function (res) {
	      // 主工程axios里拦截器做了处理 此处res为data
	      if (res === "") {
	        var result = url + path;
	        resolve(result);
	      }
	    }).catch(function (err) {
	      reject(err);
	    });
	  });
	}
	/**
	 * multipartUpload
	 * aliyun sdk 分片上传
	 *
	 * */


	function multipartUpload(_x) {
	  return _multipartUpload.apply(this, arguments);
	}
	/**
	 * uploadAliYun
	 * 上传到阿里CDN
	 *
	 * */


	function _multipartUpload() {
	  _multipartUpload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(config) {
	    var path, client$1, result;
	    return regenerator.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            path = config.path;
	            delete config.path;
	            client$1 = new client(config);
	            _context.next = 5;
	            return client$1.multipartUpload(path, fileObj, {
	              parallel: 5,
	              partSize: partSize
	            });

	          case 5:
	            result = _context.sent;
	            return _context.abrupt("return", result.res.requestUrls[0]);

	          case 7:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _multipartUpload.apply(this, arguments);
	}

	function uploadAliYun(_x2, _x3) {
	  return _uploadAliYun.apply(this, arguments);
	}
	/**
	 * uploadTecentYun
	 * 上传到腾讯CDN
	 * @return Promise
	 * */


	function _uploadAliYun() {
	  _uploadAliYun = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(config, flag) {
	    return regenerator.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            if (!(flag === 1)) {
	              _context2.next = 6;
	              break;
	            }

	            _context2.next = 3;
	            return multipartUpload(config);

	          case 3:
	            url = _context2.sent;
	            _context2.next = 9;
	            break;

	          case 6:
	            _context2.next = 8;
	            return handleAliSingle(config);

	          case 8:
	            url = _context2.sent;

	          case 9:
	            return _context2.abrupt("return", url);

	          case 10:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2);
	  }));
	  return _uploadAliYun.apply(this, arguments);
	}

	function uploadTecentYun(config, flag) {
	  var cdOptions = {
	    TmpSecretId: config.secretId,
	    TmpSecretKey: config.secretKey,
	    XCosSecurityToken: config.token,
	    ExpiredTime: config.expiredTime,
	    StartTime: config.startTime
	  }; // 生成上传文件的token

	  var cos = new cosJsSdkV5({
	    Protocol: "https:",
	    getAuthorization: function getAuthorization(options, cb) {
	      cb(cdOptions);
	    }
	  });
	  return new Promise(function (resolve, reject) {
	    cos.putObject({
	      Bucket: config.bucket,
	      Region: config.region,
	      Key: config.filePath,
	      Body: fileObj
	    }, function (err, data) {
	      if (err) {
	        reject(JSON.stringify(err));
	        return;
	      }

	      resolve(data);
	    });
	  });
	}
	/**
	 * uploadFlow
	 * 上传到OSS的入口方法
	 * @params payload  IUploadPayload
	 * @params _http  AxiosInstance
	 * */


	function uploadFlow(_x4, _x5) {
	  return _uploadFlow.apply(this, arguments);
	}

	function _uploadFlow() {
	  _uploadFlow = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(payload, _http) {
	    var file, cloudType, sheetSize, sheetFlag, config, type, name, _yield$handleGetUpTok, code, data, message, ossToken, region, bucket, path, ossTokenJson, _ossTokenJson$credent, tmpSecretId, tmpSecretKey, sessionToken;

	    return regenerator.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            $http = _http; // cloudType 腾讯云：tencent_oss；阿里云对象存储： aly_oss

	            file = payload.file, cloudType = payload.cloudType, sheetSize = payload.sheetSize;
	            fileObj = file; // 默认为0 不分片 1为分片

	            sheetFlag = 0;

	            if (file) {
	              _context3.next = 6;
	              break;
	            }

	            return _context3.abrupt("return");

	          case 6:
	            if (sheetSize && !isNaN(sheetSize) && file.size > sheetSize * 1024 * 1024) {
	              partSize = sheetSize * 1024 * 1024;
	              sheetFlag = 1;
	            } // type 文件对象后缀  name 文件对象名称


	            type = file.type, name = file.name;
	            _context3.next = 10;
	            return handleGetUpToken(type, name, sheetFlag, cloudType);

	          case 10:
	            _yield$handleGetUpTok = _context3.sent;
	            code = _yield$handleGetUpTok.code;
	            data = _yield$handleGetUpTok.data;
	            message = _yield$handleGetUpTok.message;

	            if (!(code === 0)) {
	              _context3.next = 31;
	              break;
	            }

	            if (!(cloudType === "tencent_oss")) {
	              _context3.next = 25;
	              break;
	            }

	            ossToken = data.ossToken, region = data.region, bucket = data.bucket, data.ossDomain, path = data.path, data.id, data.webOssToken;
	            ossTokenJson = JSON.parse(ossToken);
	            _ossTokenJson$credent = ossTokenJson.credentials, tmpSecretId = _ossTokenJson$credent.tmpSecretId, tmpSecretKey = _ossTokenJson$credent.tmpSecretKey, sessionToken = _ossTokenJson$credent.sessionToken; //根据sheetFlag 统一处理参数

	            if (sheetFlag === 1) {
	              //分片
	              config = {
	                secretId: tmpSecretId,
	                secretKey: tmpSecretKey,
	                token: sessionToken,
	                expiredTime: ossTokenJson.expiredTime,
	                bucket: bucket,
	                region: region,
	                filePath: path
	              };
	            } else {
	              config = {
	                secretId: tmpSecretId,
	                secretKey: tmpSecretKey,
	                token: sessionToken,
	                expiredTime: ossTokenJson.expiredTime,
	                bucket: bucket,
	                region: region,
	                filePath: path
	              };
	            }

	            _context3.next = 22;
	            return uploadTecentYun(config);

	          case 22:
	            url = _context3.sent;
	            _context3.next = 29;
	            break;

	          case 25:
	            //根据sheetFlag 统一处理参数
	            if (sheetFlag === 1) {
	              //分片
	              config = {
	                accessKeyId: data.ossToken.accessKeyId,
	                accessKeySecret: data.ossToken.accessKeySecret,
	                bucket: data.bucket,
	                region: data.region,
	                stsToken: data.ossToken.securityToken,
	                path: data.path
	              };
	            } else {
	              config = {
	                name: name,
	                key: data.path,
	                policy: data.webOssToken.policy,
	                OSSAccessKeyId: data.webOssToken.accessid,
	                success_action_status: "200",
	                signature: data.webOssToken.signature,
	                file: file,
	                bucket: data.bucket,
	                region: data.region,
	                path: data.path
	              };
	            }

	            _context3.next = 28;
	            return uploadAliYun(config, sheetFlag);

	          case 28:
	            url = _context3.sent;

	          case 29:
	            _context3.next = 32;
	            break;

	          case 31:
	            return _context3.abrupt("return", message);

	          case 32:
	            return _context3.abrupt("return", {
	              data: data,
	              url: url
	            });

	          case 33:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3);
	  }));
	  return _uploadFlow.apply(this, arguments);
	}

	exports.uploadFlow = uploadFlow;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
