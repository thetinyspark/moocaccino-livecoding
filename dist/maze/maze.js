"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maze = void 0;
var UNVISITED = 8;
var WALL = 1;
var VISITED = 0;
var NO_CELL = 999;
var Node_1 = require("../pathfinding/Node");
var Maze = /** @class */ (function () {
    function Maze() {
    }
    Maze.prototype.createGrid = function (m, n) {
        var grid = [];
        for (var i = 0; i < m; i++) {
            var row = [];
            for (var j = 0; j < n; j++) {
                if (i % 2 == 0 || j % 2 == 0) {
                    row.push(WALL);
                }
                else {
                    row.push(UNVISITED);
                }
            }
            grid.push(row);
        }
        return grid;
    };
    Maze.prototype.addroom = function (grid, row, col, width, height) {
        for (var i = row; i <= row + height; i++) {
            for (var j = col; j <= col + width; j++) {
                grid[i][j] = VISITED;
            }
        }
    };
    Maze.prototype.rmaze = function (grid, row, col, path) {
        var sides = [
            [row, col - 2, row, col - 1],
            [row, col + 2, row, col + 1],
            [row - 2, col, row - 1, col],
            [row + 2, col, row + 1, col]
        ];
        grid[row][col] = VISITED;
        var start = (Math.random() * sides.length) >> 0;
        for (var i = 0; i < sides.length; i++) {
            var row1 = sides[start][0];
            var col1 = sides[start][1];
            var row2 = sides[start][2];
            var col2 = sides[start][3];
            if (grid[row1] != undefined && grid[row1][col1] != undefined && grid[row1][col1] == UNVISITED) {
                grid[row2][col2] = VISITED;
                path.push([row, col]);
                this.rmaze(grid, row1, col1, path);
                return;
            }
            start++;
            if (start >= sides.length) {
                start = 0;
            }
        }
        if (path.length > 0) {
            var coords = path.pop();
            this.rmaze(grid, coords[0], coords[1], path);
        }
    };
    Maze.prototype.dirty = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == WALL) {
                    if (grid[i - 1] != undefined &&
                        grid[i + 1] != undefined &&
                        grid[i - 1][j] == VISITED &&
                        grid[i + 1][j] == VISITED &&
                        Math.random() > 0.8) {
                        grid[i][j] = VISITED;
                    }
                    else if (grid[i][j - 1] == VISITED &&
                        grid[i][j + 1] == VISITED &&
                        Math.random() > 0.8) {
                        grid[i][j] = VISITED;
                    }
                }
            }
        }
    };
    Maze.prototype.doMazeRecursive = function (m, n, startRow, startCol, endRow, endCol, isDirty) {
        if (startRow === void 0) { startRow = 1; }
        if (startCol === void 0) { startCol = 1; }
        if (endRow === void 0) { endRow = 1; }
        if (endCol === void 0) { endCol = 1; }
        if (isDirty === void 0) { isDirty = false; }
        var grid = this.createGrid(m, n);
        this.rmaze(grid, startRow, startCol, []);
        if (isDirty) {
            this.dirty(grid);
        }
        grid[endRow][endCol] = 0;
        return this.convert(grid);
    };
    Maze.prototype.convert = function (grid) {
        var graphe = [];
        grid.forEach(function (row, i) {
            graphe.push([]);
            row.forEach(function (value, j) {
                var node = new Node_1.Node();
                if (value == 1) {
                    node.walkable = false;
                }
                else {
                    node.walkable = true;
                }
                node.row = i;
                node.col = j;
                graphe[i][j] = node;
            });
        });
        return graphe;
    };
    return Maze;
}());
exports.Maze = Maze;
