"use strict";
exports.__esModule = true;
exports.Agent = void 0;
var Agent = /** @class */ (function () {
    function Agent(param_message, ratio) {
        if (ratio === void 0) { ratio = 0.8; }
        this.solution = "";
        this.note = 0;
        this.solution = param_message;
        var rand = Math.random();
        if (rand > ratio) {
            var pos = Math.floor(Math.random() * this.solution.length);
            var randomChar = Agent.getRandomAuthorized();
            var sol = this.solution.split("");
            sol[pos] = randomChar;
            this.solution = sol.join("");
        }
    }
    Agent.getRandomAuthorized = function () {
        var str = "abcdefghijklmnopqrstuvwxyz ";
        var pos = Math.floor(Math.random() * str.length);
        return str.charAt(pos);
    };
    Agent.createRandomAgent = function (param_length) {
        var solution = "";
        for (var i = 0; i < param_length; i++) {
            solution += Agent.getRandomAuthorized();
        }
        return new Agent(solution, 1);
    };
    Agent.prototype.doBabies = function (param_partner) {
        var myMiddle = Math.floor(this.solution.length / 2);
        var firstMid = this.solution.substr(0, myMiddle);
        var secondMid = this.solution.substr(myMiddle);
        var partnerMiddle = Math.floor(param_partner.solution.length / 2);
        var partnerFirstMid = param_partner.solution.substr(0, partnerMiddle);
        var partnerSecondMid = param_partner.solution.substr(partnerMiddle);
        var a = new Agent(firstMid + partnerSecondMid);
        var b = new Agent(secondMid + partnerFirstMid);
        var c = new Agent(firstMid + partnerFirstMid);
        var d = new Agent(secondMid + partnerSecondMid);
        var results = [a, b, c, d];
        return results;
    };
    return Agent;
}());
exports.Agent = Agent;
