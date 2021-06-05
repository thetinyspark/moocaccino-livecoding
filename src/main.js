"use strict";
exports.__esModule = true;
var Environment_1 = require("./Environment");
var env = new Environment_1.Environment();
function nextGeneration(num) {
    if (num === void 0) { num = 0; }
    env.next();
    env.evaluate();
    var agents = env.getAgents();
    if (agents[0].note === 11) {
        console.log("c'est gagné ! generation:" + num);
    }
    else {
        console.log("note courante: " + agents[0].note);
        setTimeout(function () {
            nextGeneration(num + 1);
        }, 100);
    }
}
nextGeneration();
