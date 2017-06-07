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
exports.addSelectorEvents = addSelectorEvents;
function renderGrid() {
  var data = __webpack_require__(1);
  var keys = Object.keys(data);
  var body = document.getElementById('grid-body');
  createColumns();
  keys.forEach(function (key) {
    var country = data[key];
    var countryKeys = Object.keys(country);
    var row = document.createElement("div");
    row.className = "grid-data-item";

    countryKeys.forEach(function (dataKey) {
      var columnValue = country[dataKey];
      if (typeof columnValue === 'number') {
        columnValue = columnValue.toLocaleString();
        columnValue = '$' + columnValue;
      }
      if (dataKey === "BestCase" || dataKey === "Commit") {
        var i = 0;
        var rowData = document.createElement("div");
        rowData.className = 'grid-cell grid-data-' + dataKey.toLowerCase();

        while (i < 2) {
          var rowDataItem = document.createElement("li");
          var rowDataValue = document.createTextNode('$' + columnValue[i].toLocaleString());
          if (i === 1) {
            rowDataItem.className = 'more';
          }
          rowDataItem.appendChild(rowDataValue);
          rowData.appendChild(rowDataItem);
          i += 1;
        }
        row.appendChild(rowData);
      } else {
        var _rowData = document.createElement("div");
        _rowData.className = 'grid-data-' + dataKey.toLowerCase() + ' grid-cell';
        var _rowDataValue = document.createTextNode('' + columnValue);
        _rowData.appendChild(_rowDataValue);
        if (dataKey === "MonthlyPlan" || dataKey === "Comments") {
          _rowData.style.display = 'none';
        }
        row.appendChild(_rowData);
      }
    });
    body.appendChild(row);
  });
}

function createColumns() {
  var header = document.getElementById('grid-head');
  var headerRow = document.createElement('div');
  headerRow.className = "grid-header-row";
  var columnNames = ["NAME", "PLAN", "FORECAST", "BEST CASE", "COMMIT", "MONTHLY PLAN", "COMMENTS"];
  columnNames.forEach(function (name, i) {
    var column = document.createElement('div');
    column.addEventListener('click', function () {
      sortTable(i);
    });
    var columnName = document.createTextNode('' + name);
    if (name === "MONTHLY PLAN" || name === "COMMENTS") {
      column.style.display = "None";
    }
    column.appendChild(columnName);
    column.className = "grid-cell";
    headerRow.appendChild(column);
  });
  header.appendChild(headerRow);
}

function addSelectorEvents() {
  var selectors = document.getElementsByTagName('input');
  selectors = Array.from(selectors);
  selectors = selectors.filter(function (node) {
    return node.value === 'More' || node.value === 'Less';
  });
  selectors.forEach(function (selector) {
    if (selector.value === 'More') {
      selector.addEventListener('click', function () {
        var elements = document.getElementsByClassName('more');
        elements = Array.from(elements);
        elements.forEach(function (element) {
          element.style.display = 'block';
        });
      });
    } else {
      selector.addEventListener('click', function () {
        var elements = document.getElementsByClassName('more');
        elements = Array.from(elements);
        elements.forEach(function (element) {
          element.style.display = 'none';
        });
      });
    }
  });
}

function sortTable(n) {
  var table = void 0,
      rows = void 0,
      swapped = void 0,
      i = void 0,
      value1 = void 0,
      value2 = void 0,
      shouldSwap = void 0,
      dir = void 0,
      swapCount = 0;
  table = document.getElementById('data-grid');
  dir = "asc";
  swapped = true;

  while (swapped) {
    swapped = false;
    rows = document.getElementsByClassName('grid-data-item');
    shouldSwap = false;

    for (i = 0; i < rows.length - 1; i++) {
      value1 = rows[i].getElementsByTagName("div")[n];
      value2 = rows[i + 1].getElementsByTagName("div")[n];

      if (value1.className.includes('grid-data-commit') || value1.className.includes('grid-data-bestcase')) {
        value1 = value1.getElementsByTagName('li')[0];
      }

      if (value2.className.includes('grid-data-commit') || value2.className.includes('grid-data-bestcase')) {
        value2 = value2.getElementsByTagName('li')[0];
      }

      if (value1.innerHTML[0] === '$') {
        value1 = convertToNum(value1.innerHTML.slice(1));
      } else {
        value1 = value1.innerHTML;
      }

      if (value2.innerHTML[0] === '$') {
        value2 = convertToNum(value2.innerHTML.slice(1));
      } else {
        value2 = value2.innerHTML;
      }

      if (dir === "asc") {
        if (value1 > value2) {
          shouldSwap = true;
          break;
        }
      } else if (dir == "desc") {
        if (value1 < value2) {
          shouldSwap = true;
          break;
        }
      }
    }

    if (shouldSwap) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      swapped = true;
      swapCount++;
    } else {
      if (swapCount === 0 && dir === "asc") {
        dir = "desc";
        swapped = true;
      }
    }
  }
}

function convertToNum(str) {
  return parseInt(str.split(',').join(''));
}

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
  (0, _datagrid.addSelectorEvents)();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map