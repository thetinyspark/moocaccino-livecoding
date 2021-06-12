"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
var Warrior = /** @class */ (function () {
    function Warrior(name) {
        this._life = 100;
        this._name = "";
        this._name = name;
    }
    Object.defineProperty(Warrior.prototype, "life", {
        get: function () {
            return this._life;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Warrior.prototype, "isDead", {
        get: function () {
            return this._life <= 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Warrior.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Warrior.prototype.hit = function (amount) {
        this._life -= amount;
    };
    Warrior.prototype.atk = function (opponent) {
        opponent.hit(10);
    };
    return Warrior;
}());
exports.Warrior = Warrior;
