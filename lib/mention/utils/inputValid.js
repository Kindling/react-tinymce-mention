"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inputValid;
var INPUT_THRESHOLD = 1;

function inputValid(input) {
  var length = input.length;

  return length > INPUT_THRESHOLD || length === 0 ? true : false;
}

module.exports = exports["default"];