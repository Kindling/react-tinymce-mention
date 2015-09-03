"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inputIsValid;
var INPUT_THRESHOLD = 2;

function inputIsValid(input) {
  var length = input.length;

  return length > INPUT_THRESHOLD || length === 0 ? true : false;
}

module.exports = exports["default"];