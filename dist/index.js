"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalContext = exports.GlobalProvider = exports.GlobalContext = exports.appReducer = void 0;
var reducer_1 = require("./reducer");
Object.defineProperty(exports, "appReducer", { enumerable: true, get: function () { return __importDefault(reducer_1).default; } });
var state_1 = require("./state");
Object.defineProperty(exports, "GlobalContext", { enumerable: true, get: function () { return state_1.GlobalContext; } });
Object.defineProperty(exports, "GlobalProvider", { enumerable: true, get: function () { return state_1.GlobalProvider; } });
Object.defineProperty(exports, "useGlobalContext", { enumerable: true, get: function () { return state_1.useGlobalContext; } });
__exportStar(require("./types"), exports);
