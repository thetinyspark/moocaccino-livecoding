"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
var Knight = /** @class */ (function () {
    function Knight(name) {
        this._life = 200;
        this._name = "";
        this._name = name;
    }
    Object.defineProperty(Knight.prototype, "life", {
        get: function () {
            return this._life;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Knight.prototype, "isDead", {
        get: function () {
            return this._life <= 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Knight.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Knight.prototype.hit = function (amount) {
        this._life -= amount;
    };
    Knight.prototype.atk = function (opponent) {
        console.log(this.name, " / ", opponent.name);
        var bonus = Math.round(Math.random() * 6);
        opponent.hit(12 + bonus);
    };
    return Knight;
}());
exports.Knight = Knight;
