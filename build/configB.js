"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IWarrior_1 = require("./core/IWarrior");
var Knight_1 = require("./core/Knight");
var Container_1 = require("./di/Container");
var id = 0;
Container_1.Container.register(IWarrior_1.IWarriorDIToken, function () {
    return new Knight_1.Knight("arthur_" + id++);
});
