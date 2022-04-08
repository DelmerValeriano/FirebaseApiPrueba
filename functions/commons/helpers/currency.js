"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCurrency = void 0;

const formatCurrency = (currency, value = 0) => {
  return `${currency} ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

exports.formatCurrency = formatCurrency;