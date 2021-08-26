"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogType = exports.Log = void 0;
var Log = /** @class */ (function () {
    function Log() {
    }
    return Log;
}());
exports.Log = Log;
var LogType;
(function (LogType) {
    LogType["ADD_TO_CLOSE_LIST"] = "ADD_TO_CLOSE_LIST";
    LogType["ADD_TO_OPEN_LIST"] = "ADD_TO_OPEN_LIST";
    LogType["SET_CURRENT_NODE"] = "SET_CURRENT_NODE";
    LogType["SET_PARENT_NODE"] = "SET_PARENT_NODE";
    LogType["RECALC_VALUES"] = "RECALC_VALUES";
    LogType["COMPLETE"] = "COMPLETE";
})(LogType = exports.LogType || (exports.LogType = {}));
