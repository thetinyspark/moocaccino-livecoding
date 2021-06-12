"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
var Barbarian_1 = require("../core/Barbarian");
var Knight_1 = require("../core/Knight");
var Warrior_1 = require("../core/Warrior");
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.create = function (key) {
        switch (key) {
            case "barbarian":
                return new Barbarian_1.Barbarian();
            case "knight":
                return new Knight_1.Knight();
            default:
                return new Warrior_1.Warrior();
        }
    };
    return Factory;
}());
exports.Factory = Factory;
