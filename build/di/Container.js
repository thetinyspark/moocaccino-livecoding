"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var Container = /** @class */ (function () {
    function Container() {
    }
    Container.register = function (key, factoryMethod) {
        this._map.set(key, factoryMethod);
    };
    Container.resolve = function (key) {
        if (!this._map.has(key))
            throw (new Error("unable to resolve " + key));
        var factoryMethod = this._map.get(key);
        return factoryMethod();
    };
    Container._map = new Map();
    return Container;
}());
exports.Container = Container;
