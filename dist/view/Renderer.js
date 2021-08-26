"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
var Config_1 = require("../config/Config");
var AssetsManager_1 = require("../assets/AssetsManager");
var Actor_1 = require("./Actor");
var NodeView_1 = require("./NodeView");
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.map = null;
        this.children = [];
        this.canvas = null;
        this._heroe = null;
        this._chest = null;
        this._heroe = new Actor_1.Actor();
        this._chest = new Actor_1.Actor();
    }
    Renderer.prototype.reset = function (canvas, map) {
        this.map = map;
        this.canvas = canvas;
        this.children = [];
        var graphe = this.map.getData();
        for (var i = 0; i < graphe.length; i++) {
            var row = graphe[i];
            for (var j = 0; j < row.length; j++) {
                var node = row[j];
                var view = new NodeView_1.NodeView();
                view.setModel(node);
                this.children.push(view);
            }
        }
        this._chest.row = this.map.getEndNode().row;
        this._chest.col = this.map.getEndNode().col;
        this._heroe.row = this.map.getStartNode().row;
        this._heroe.col = this.map.getStartNode().col;
        this._heroe.texture = AssetsManager_1.AssetsManager.getInstance().getAssetByKey(Config_1.HEROE_KEY).data;
        this._chest.texture = AssetsManager_1.AssetsManager.getInstance().getAssetByKey(Config_1.CHEST_KEY).data;
        this.children.push(this._chest, this._heroe);
    };
    Renderer.prototype.render = function () {
        var _this = this;
        if (this.canvas === null)
            return;
        var context = this.canvas.getContext("2d");
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].render(context);
        }
        window.requestAnimationFrame(function () { return _this.render(); });
    };
    Renderer.prototype.getHeroe = function () {
        return this._heroe;
    };
    Renderer.prototype.getChest = function () {
        return this._chest;
    };
    Renderer.prototype.getFloorByCoords = function (row, col) {
        var found = this.children.find(function (value) {
            return (value instanceof NodeView_1.NodeView &&
                value.row === row &&
                value.col === col);
        });
        return found;
    };
    return Renderer;
}());
exports.Renderer = Renderer;
