import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'setprototypeof';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'es6-promise';
import 'fetch-everywhere';
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/weak-map';
import 'core-js/es/set';
import 'core-js/es/array';

// Object.assign polyfill
// if (typeof Object.assign !== 'function') {
//     // Must be writable: true, enumerable: false, configurable: true
//     Object.defineProperty(Object, "assign", {
//         value: function assign(target, varArgs) { // .length of function is 2
//             if (target === null || target === undefined) {
//                 throw new TypeError('Cannot convert undefined or null to object');
//             }

//             var to = Object(target);

//             for (var index = 1; index < arguments.length; index++) {
//                 var nextSource = arguments[index];

//                 if (nextSource !== null && nextSource !== undefined) {
//                     for (var nextKey in nextSource) {
//                         // Avoid bugs when hasOwnProperty is shadowed
//                         if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
//                             to[nextKey] = nextSource[nextKey];
//                         }
//                     }
//                 }
//             }
//             return to;
//         },
//         writable: true,
//         configurable: true
//     });
// }

// if (!Object.setPrototypeOf) {
//     // Only works in Chrome and FireFox, does not work in IE:
//     // eslint-disable-next-line 
//      Object.prototype.setPrototypeOf = function(obj, proto) {
//          if(obj.__proto__) {
//              obj.__proto__ = proto;
//              return obj;
//          } else {
//              // If you want to return prototype of Object.create(null):
//              var Fn = function() {
//                  for (var key in obj) {
//                      Object.defineProperty(this, key, {
//                          value: obj[key],
//                      });
//                  }
//              };
//              Fn.prototype = proto;
//              return new Fn();
//          }
//      }
// }