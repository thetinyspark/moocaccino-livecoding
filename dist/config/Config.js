"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CELL_SIZE = exports.ASSETS_LISTS = exports.WALL_KEY = exports.FLOOR_KEY = exports.CHEST_KEY = exports.HEROE_KEY = void 0;
var AssetsManager_1 = require("../assets/AssetsManager");
exports.HEROE_KEY = "heroe";
exports.CHEST_KEY = "chest";
exports.FLOOR_KEY = "floor";
exports.WALL_KEY = "wall";
exports.ASSETS_LISTS = [
    { key: exports.HEROE_KEY, uri: "assets/heroe.png", type: AssetsManager_1.AssetType.IMAGE },
    { key: exports.CHEST_KEY, uri: "assets/chest.png", type: AssetsManager_1.AssetType.IMAGE },
    { key: exports.FLOOR_KEY, uri: "assets/floor2.jpg", type: AssetsManager_1.AssetType.IMAGE },
    { key: exports.WALL_KEY, uri: "assets/wall3.jpg", type: AssetsManager_1.AssetType.IMAGE }
];
exports.CELL_SIZE = 84;
