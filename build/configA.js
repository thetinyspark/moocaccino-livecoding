"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Barbarian_1 = require("./core/Barbarian");
var IWarrior_1 = require("./core/IWarrior");
var Container_1 = require("./di/Container");
Container_1.Container.register(IWarrior_1.IWarriorDIToken, function () {
    return new Barbarian_1.Barbarian(Container_1.Container.resolve("BarbarianName"));
});
Container_1.Container.register("BarbarianName", function () { return "conan"; });
