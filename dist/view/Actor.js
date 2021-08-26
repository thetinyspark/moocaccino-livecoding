"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
var Config_1 = require("../config/Config");
var Actor = /** @class */ (function () {
    function Actor() {
        this.texture = null;
        this.row = 0;
        this.col = 0;
        this.x = 0;
        this.y = 0;
    }
    Actor.prototype.render = function (context) {
        if (this.texture === null)
            return;
        var x = this.row * Config_1.CELL_SIZE;
        var y = this.col * Config_1.CELL_SIZE;
        this.x += (x - this.x) * 0.1;
        this.y += (y - this.y) * 0.1;
        context.save();
        context.translate(this.x, this.y);
        context.drawImage(this.texture, 0, 0, Config_1.CELL_SIZE, Config_1.CELL_SIZE);
        context.restore();
    };
    return Actor;
}());
exports.Actor = Actor;
