"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var debug = require("debug");
var path = require("path");
var YAML = require("yamljs");
var modules_1 = require("./modules");
// DEBUG PREPARE
// ----------------------------------------------------------------------------
var logSystem = debug("bot:system");
var logEvent = debug("bot:event");
var logError = debug("bot:error");
var logWarn = debug("bot:warn");
// DISCORD CLASS
// ----------------------------------------------------------------------------
var DiscordTS = /** @class */ (function () {
    function DiscordTS() {
        this.client = new discord_js_1.Client();
        this.config = YAML.load(path.resolve(__dirname, "settings.yml"));
    }
    DiscordTS.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logSystem("Starting bot...");
                        // => Bot is ready...
                        this.client.on("ready", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        logEvent("[" + this.config.settings.nameBot + "] Connected.");
                                        logEvent("Logged in as " + this.client.user.tag);
                                        return [4 /*yield*/, this.client.user.setActivity(this.config.settings.activity)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        // => Message handler
                        this.client.on("message", function (message) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(message.author.id !== this.client.user.id)) return [3 /*break*/, 2];
                                        if (!message.content.startsWith(this.config.settings.prefix)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, modules_1.messageHandler(message)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        // => Bot error and warn handler
                        this.client.on("error", logError);
                        this.client.on("warn", logWarn);
                        // => Process handler
                        process.on("exit", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        logEvent("[" + this.config.settings.nameBot + "] Process exit.");
                                        return [4 /*yield*/, this.client.destroy()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        process.on("uncaughtException", function (err) {
                            var errorMsg = (err ? err.stack || err : "").toString().replace(new RegExp(__dirname + "/", "g"), "./");
                            logError(errorMsg);
                        });
                        process.on("unhandledRejection", function (err) {
                            logError("Uncaught Promise error: \n" + err.stack);
                        });
                        // => Login
                        return [4 /*yield*/, this.client.login(this.config.settings.token)];
                    case 1:
                        // => Login
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DiscordTS;
}());
exports.DiscordTS = DiscordTS;
