"use strict";
exports.__esModule = true;
exports.Environment = void 0;
var Agent_1 = require("./Agent");
var Environment = /** @class */ (function () {
    function Environment() {
        this.agents = [];
        this.searched = "hello world";
        while (this.agents.length < 100) {
            this.agents.push(Agent_1.Agent.createRandomAgent(this.searched.length));
        }
    }
    Environment.prototype.evaluate = function () {
        for (var i = 0; i < this.agents.length; i++) {
            var agent = this.agents[i];
            agent.note = 0;
            for (var j = 0; j < this.searched.length; j++) {
                if (agent.solution.charAt(j) === this.searched.charAt(j))
                    agent.note++;
            }
        }
        this.agents = this.agents.sort(function (a, b) {
            if (a.note > b.note)
                return -1;
            else
                return 1;
        });
    };
    Environment.prototype.next = function () {
        this.evaluate();
        var pos = Math.floor(this.agents.length / 10);
        var best = this.agents.slice(0, pos);
        var results = [];
        var i = 0;
        while (results.length < 90) {
            if (i > best.length - 2) {
                i = 0;
            }
            var current = best[i];
            var next = best[i + 1];
            i += 2;
            var babies = current.doBabies(next);
            results.push.apply(results, babies);
        }
        results.push.apply(results, best);
        this.agents = results;
    };
    Environment.prototype.getAgents = function () {
        return this.agents;
    };
    return Environment;
}());
exports.Environment = Environment;
