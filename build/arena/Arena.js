"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
var IWarrior_1 = require("../core/IWarrior");
var Container_1 = require("../di/Container");
var Arena = /** @class */ (function () {
    function Arena() {
    }
    // code qu'on voudrait récupérer
    Arena.prototype.battleRoyale = function () {
        var fighters = [];
        for (var i = 0; i < 10; i++) {
            fighters.push(Container_1.Container.resolve(IWarrior_1.IWarriorDIToken));
        }
        while (fighters.length > 1) {
            var rand1 = Math.round(Math.random() * (fighters.length - 1));
            var rand2 = Math.round(Math.random() * (fighters.length - 1));
            var fighter1 = fighters[rand1];
            var fighter2 = fighters[rand2];
            fighter1.atk(fighter2);
            fighter2.atk(fighter1);
            fighters = fighters.filter(function (current) { return !current.isDead; });
        }
        console.log(fighters);
    };
    return Arena;
}());
exports.Arena = Arena;
