"use strict";
exports.__esModule = true;
var auto_mode_1 = require("./auto-mode");
var argparse_1 = require("./argparse");
// startAntiAFK();
console.log('Started Anti-AFK');
var args = argparse_1.parseArguments();
auto_mode_1.AntiAfkAuto.fromArguments(args).start();
//# sourceMappingURL=main.js.map