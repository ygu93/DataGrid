/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGrid = renderGrid;
data = __webpack_require__(1);

function renderGrid() {}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	"1": {
		"Name": "Europe",
		"Plan": 10525200,
		"Forecast": 12700200,
		"BestCase": [
			12700200,
			11700400
		],
		"Commit": [
			12700200,
			11700400
		],
		"MonthlyPlan": 12700200,
		"Comments": "Second smallest continent in the world"
	},
	"2": {
		"Name": "Belgium",
		"Plan": 2525200,
		"Forecast": 3125200,
		"BestCase": [
			2900450,
			2890120
		],
		"Commit": [
			2900450,
			2890120
		],
		"MonthlyPlan": 2900450,
		"Comments": "Consumes 150 liters of beer per person per year"
	},
	"3": {
		"Name": "England",
		"Plan": 4600400,
		"Forecast": 2500600,
		"BestCase": [
			3900300,
			2900300
		],
		"Commit": [
			3900300,
			2900300
		],
		"MonthlyPlan": 3900300,
		"Comments": "Capital City is London"
	},
	"4": {
		"Name": "Sweden",
		"Plan": 2425200,
		"Forecast": 5425200,
		"BestCase": [
			6200200,
			2400900
		],
		"Commit": [
			6200200,
			2400900
		],
		"MonthlyPlan": 6200200,
		"Comments": "Taxation contributes to 54.2% of the GDP"
	},
	"5": {
		"Name": "Finland",
		"Plan": 1700200,
		"Forecast": 4700200,
		"BestCase": [
			4702120,
			4300200
		],
		"Commit": [
			4702120,
			4300200
		],
		"MonthlyPlan": 4702120,
		"Comments": "Trade contributes to 74% of the GDP"
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _datagrid = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function () {
  (0, _datagrid.renderGrid)();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map