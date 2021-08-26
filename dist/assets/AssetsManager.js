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
exports.AssetsManager = exports.AssetType = void 0;
var AssetType;
(function (AssetType) {
    AssetType[AssetType["JSON"] = 1] = "JSON";
    AssetType[AssetType["IMAGE"] = 2] = "IMAGE";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
var AssetsManager = /** @class */ (function () {
    function AssetsManager(token) {
        this._queue = [];
        if (token !== AssetsManager.token)
            throw (new Error("singleton error, use getInstance static method instead of new operator"));
    }
    AssetsManager.getInstance = function () {
        if (AssetsManager.instance === null)
            AssetsManager.instance = new AssetsManager(AssetsManager.token);
        return AssetsManager.instance;
    };
    AssetsManager.prototype.queue = function (key, uri, type) {
        this._queue.push({
            key: key,
            uri: uri,
            type: type,
            data: null
        });
    };
    AssetsManager.prototype.getAssets = function () {
        return this._queue;
    };
    AssetsManager.prototype.getAssetByKey = function (key) {
        return this._queue.find(function (value) {
            return value.key === key;
        }) || null;
    };
    AssetsManager.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, current, response, _a, raw, base64, img, json;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < this._queue.length)) return [3 /*break*/, 8];
                        current = this._queue[i];
                        return [4 /*yield*/, fetch(current.uri)];
                    case 2:
                        response = _b.sent();
                        _a = current.type;
                        switch (_a) {
                            case AssetType.IMAGE: return [3 /*break*/, 3];
                            case AssetType.JSON: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.blob()];
                    case 4:
                        raw = _b.sent();
                        base64 = URL.createObjectURL(raw);
                        img = document.createElement("img");
                        img.src = base64;
                        current.data = img;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        json = _b.sent();
                        current.data = json;
                        return [3 /*break*/, 7];
                    case 7:
                        i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, this._queue];
                }
            });
        });
    };
    AssetsManager.instance = null;
    AssetsManager.token = "secret";
    return AssetsManager;
}());
exports.AssetsManager = AssetsManager;
