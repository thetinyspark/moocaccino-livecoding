"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeView = void 0;
var AssetsManager_1 = require("../assets/AssetsManager");
var Config_1 = require("../config/Config");
var Node_1 = require("../pathfinding/Node");
var NodeView = /** @class */ (function () {
    function NodeView() {
        this._model = null;
        this.texture = null;
        this.row = 0;
        this.col = 0;
    }
    NodeView.prototype.setModel = function (node) {
        this._model = node;
        var manager = AssetsManager_1.AssetsManager.getInstance();
        this.row = this._model.row;
        this.col = this._model.col;
        if (this._model.walkable)
            this.texture = manager.getAssetByKey(Config_1.FLOOR_KEY).data;
        else
            this.texture = manager.getAssetByKey(Config_1.WALL_KEY).data;
    };
    NodeView.prototype.getModel = function () {
        return this._model;
    };
    NodeView.prototype.drawInfo = function (context) {
        if (this._model.walkable &&
            (this._model.state === Node_1.OPENED || this._model.state === Node_1.CLOSED)) {
            context.save();
            context.globalAlpha = 1;
            context.beginPath();
            context.fillStyle = "black";
            context.font = "1rem Arial";
            context.fillText("f: " + this._model.f, 10, 15, Config_1.CELL_SIZE);
            context.fillText("h: " + this._model.h, 10, 30, Config_1.CELL_SIZE);
            context.fillText("g: " + this._model.g, 10, 45, Config_1.CELL_SIZE);
            context.fill();
            context.closePath();
            context.restore();
        }
    };
    NodeView.prototype.drawState = function (context) {
        var validStates = [Node_1.CLOSED, Node_1.RETAINED, Node_1.OPENED];
        if (!this._model.walkable || validStates.indexOf(this._model.state) === -1)
            return;
        context.save();
        context.globalAlpha = 0.5;
        context.beginPath();
        if (this._model.state === Node_1.CLOSED)
            context.fillStyle = "red";
        else if (this._model.state === Node_1.OPENED)
            context.fillStyle = "rgba(255,255,255,1)";
        else if (this._model.state === Node_1.RETAINED)
            context.fillStyle = "rgba(50,255,125,1)";
        context.fillRect(0, 0, Config_1.CELL_SIZE, Config_1.CELL_SIZE);
        context.fill();
        context.closePath();
        context.restore();
    };
    NodeView.prototype.render = function (context) {
        if (this._model === null || this.texture === null)
            return;
        context.save();
        context.translate(this._model.row * Config_1.CELL_SIZE, this._model.col * Config_1.CELL_SIZE);
        context.drawImage(this.texture, 0, 0, Config_1.CELL_SIZE, Config_1.CELL_SIZE);
        this.drawState(context);
        this.drawInfo(context);
        context.restore();
    };
    return NodeView;
}());
exports.NodeView = NodeView;
