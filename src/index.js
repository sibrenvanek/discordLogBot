"use strict";
exports.__esModule = true;
var discord_1 = require("./discord");
var bot = new discord_1.DiscordTS();
bot.start()
    .then(function (_) { return console.log("started"); })["catch"](function (error) { return console.log("failed", error); });
