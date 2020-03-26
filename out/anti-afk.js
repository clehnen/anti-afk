"use strict";
exports.__esModule = true;
var robotjs_1 = require("robotjs");
var iohook_1 = require("iohook");
function startAntiAFK(intervalPeriodMillis) {
    if (intervalPeriodMillis === void 0) { intervalPeriodMillis = 3000; }
    setupInterval(intervalPeriodMillis);
    setupMousedownCancellation();
}
exports.startAntiAFK = startAntiAFK;
function setupInterval(intervalPeriodMillis) {
    return setInterval(function () { return wiggleMouseLeftToRight(100); }, intervalPeriodMillis);
}
function setupMousedownCancellation() {
    iohook_1.on('mousedown', function (_) {
        console.log('Shutting down');
        process.exit(0);
    });
    iohook_1.start();
}
function wiggleMouseLeftToRight(distance) {
    var _a = robotjs_1.getMousePos(), x = _a.x, y = _a.y;
    robotjs_1.moveMouseSmooth(cropHorizontalToScreen(x + distance), y);
    robotjs_1.moveMouseSmooth(cropHorizontalToScreen(x - distance), y);
    robotjs_1.moveMouseSmooth(x, y);
}
function cropHorizontalToScreen(x) {
    return x <= 0 ? 0 : Math.min(x, robotjs_1.getScreenSize().width);
}
//# sourceMappingURL=anti-afk.js.map