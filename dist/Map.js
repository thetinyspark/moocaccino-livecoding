"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
var maze_1 = require("./maze/maze");
var Map = /** @class */ (function () {
    function Map() {
        this.data = [];
    }
    Map.prototype.reset = function (rows, cols, startRow, startCol) {
        this.rows = rows;
        this.cols = cols;
        this.startRow = startRow;
        this.startCol = startCol;
        this.endRow = Math.floor(Math.random() * (this.rows - 2));
        this.endCol = Math.floor(Math.random() * (this.cols - 2));
        var isDirty = Math.random() > 0.1;
        this.data = new maze_1.Maze().doMazeRecursive(this.rows, this.cols, this.startRow, this.startCol, this.endRow, this.endCol, isDirty);
        this.getStartNode().isStartNode = true;
        this.getEndNode().isEndNode = true;
    };
    Map.prototype.getData = function () {
        return this.data;
    };
    Map.prototype.getStartNode = function () {
        if (this.data[this.startRow])
            return this.data[this.startRow][this.startCol] || null;
        else
            return null;
    };
    Map.prototype.getEndNode = function () {
        if (this.data[this.endRow])
            return this.data[this.endRow][this.endCol] || null;
        else
            return null;
    };
    Map.prototype.cloneNodes = function () {
        var copy = this.data.map(function (row) {
            return row.map(function (node) {
                return node.clone();
            });
        });
        return copy;
    };
    Map.prototype.clone = function () {
        var map = new Map();
        map.rows = this.rows;
        map.cols = this.cols;
        map.startRow = this.startRow;
        map.startCol = this.startCol;
        map.endRow = this.endRow;
        map.endCol = this.endCol;
        map.data = this.cloneNodes();
        return map;
    };
    return Map;
}());
exports.Map = Map;
