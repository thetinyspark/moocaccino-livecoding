"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barbarian = void 0;
var Barbarian = /** @class */ (function () {
    function Barbarian(name) {
        this._life = 150;
        this._name = "";
        this._name = name;
    }
    Object.defineProperty(Barbarian.prototype, "life", {
        get: function () {
            return this._life;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Barbarian.prototype, "isDead", {
        get: function () {
            return this._life <= 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Barbarian.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Barbarian.prototype.hit = function (amount) {
        this._life -= amount;
    };
    Barbarian.prototype.atk = function (opponent) {
        opponent.hit(18);
    };
    return Barbarian;
}());
exports.Barbarian = Barbarian;
