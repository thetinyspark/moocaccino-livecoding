"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PathFinder_1 = require("./pathfinding/PathFinder");
var Renderer_1 = require("./view/Renderer");
var Map_1 = require("./Map");
var AssetsManager_1 = require("./assets/AssetsManager");
var Config_1 = require("./config/Config");
var Log_1 = require("./pathfinding/Log");
var Node_1 = require("./pathfinding/Node");
var FastFinder_1 = require("./pathfinding/FastFinder");
var manager = AssetsManager_1.AssetsManager.getInstance();
var finder = new PathFinder_1.PathFinder();
var fast = new FastFinder_1.FastFinder();
var renderer = new Renderer_1.Renderer();
var map = new Map_1.Map();
var logs = [];
var solution = [];
function showSolution(solution) {
    solution.forEach(function (value) {
        var node = renderer.getFloorByCoords(value.row, value.col).getModel();
        node.state = Node_1.RETAINED;
    });
}
function nextLog() {
    if (logs.length === 0)
        return;
    var currentLog = logs.shift();
    var target = currentLog.target;
    var heroe = renderer.getHeroe();
    switch (currentLog.type) {
        case Log_1.LogType.SET_CURRENT_NODE:
            heroe.row = target.row;
            heroe.col = target.col;
            break;
        case Log_1.LogType.ADD_TO_OPEN_LIST:
            renderer.getFloorByCoords(target.row, target.col).getModel().state = Node_1.OPENED;
            break;
        case Log_1.LogType.ADD_TO_CLOSE_LIST:
            renderer.getFloorByCoords(target.row, target.col).getModel().state = Node_1.CLOSED;
            break;
        case Log_1.LogType.RECALC_VALUES:
            var node = renderer.getFloorByCoords(target.row, target.col).getModel();
            node.g = target.g;
            node.f = target.f;
            node.h = target.h;
            break;
        case Log_1.LogType.COMPLETE:
            showSolution(solution);
            break;
    }
    setTimeout(function () {
        nextLog();
    }, 20);
}
function preload() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    window.removeEventListener("load", preload);
                    Config_1.ASSETS_LISTS.forEach(function (asset) { return manager.queue(asset.key, asset.uri, asset.type); });
                    return [4 /*yield*/, manager.load()];
                case 1:
                    _a.sent();
                    start();
                    return [2 /*return*/];
            }
        });
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var canvas, width, height, numRows, numCols, solution;
        return __generator(this, function (_a) {
            canvas = document.getElementById("map");
            width = window.screen.width;
            height = window.screen.height;
            numRows = width / Config_1.CELL_SIZE;
            numCols = height / Config_1.CELL_SIZE;
            // set actual map
            map.reset(numRows, numCols, 1, 1);
            canvas.width = width;
            canvas.height = height;
            /*
            // create copy and get result from virtual map
            const copy: Map = map.clone();
            const result    = finder.findPath(copy.getData(),copy.getStartNode(), copy.getEndNode() );
            logs            = result.logs;
            solution        = result.solution;
            setTimeout(
                ()=>{
                    nextLog();
                },
                3000
            );
            */
            // reset renderer
            renderer.reset(canvas, map);
            renderer.render();
            solution = fast.findPath(map.getData(), map.getStartNode(), map.getEndNode());
            console.log(solution);
            showSolution(solution);
            return [2 /*return*/];
        });
    });
}
window.addEventListener("load", preload);
