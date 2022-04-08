"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatterHNL = void 0;
const formatterHNL = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
  minimumFractionDigits: 2
});
exports.formatterHNL = formatterHNL;