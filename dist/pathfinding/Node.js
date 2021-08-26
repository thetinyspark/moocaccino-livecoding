"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.NODE_DISTANCE_VALUE = exports.RETAINED = exports.CLOSED = exports.OPENED = exports.NEUTRAL = void 0;
exports.NEUTRAL = 0;
exports.OPENED = 100;
exports.CLOSED = 200;
exports.RETAINED = 300;
exports.NODE_DISTANCE_VALUE = 10;
var Node = /** @class */ (function () {
    function Node() {
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.col = 0;
        this.row = 0;
        this.isStartNode = false;
        this.isEndNode = false;
        this.walkable = true;
        this.parent = null;
        this.state = exports.NEUTRAL;
    }
    Node.prototype.toString = function () {
        return this.row + ", " + this.col;
    };
    Node.prototype.clone = function () {
        var node = new Node();
        node.g = this.g;
        node.h = this.h;
        node.f = this.f;
        node.col = this.col;
        node.row = this.row;
        node.walkable = this.walkable;
        node.parent = this.parent;
        node.state = this.state;
        node.isStartNode = this.isEndNode;
        node.isEndNode = this.isEndNode;
        return node;
    };
    return Node;
}());
exports.Node = Node;
