"use strict";
exports.__esModule = true;
var robotjs_1 = require("robotjs");
var iohook_1 = require("iohook");
function startAntiAFK(intervalPeriodMillis, cancellationKeyCodes) {
    if (intervalPeriodMillis === void 0) { intervalPeriodMillis = 3000; }
    setupInterval(intervalPeriodMillis);
    setupCancellationEvents(cancellationKeyCodes);
}
exports.startAntiAFK = startAntiAFK;
function setupInterval(intervalPeriodMillis) {
    return setInterval(function () { return wiggleMouseLeftToRight(100); }, intervalPeriodMillis);
}
function setupCancellationEvents(keyCodes) {
    iohook_1.on('mousedown', function () {
        shutdown();
    });
    iohook_1.on('keydown', function (key) {
        // close on ESC button press
        if (key.rawcode == 27 || (keyCodes === null || keyCodes === void 0 ? void 0 : keyCodes.includes(key.rawcode))) {
            shutdown();
        }
    });
    iohook_1.start();
}
function wiggleMouseLeftToRight(distance) {
    var _a = robotjs_1.getMousePos(), x = _a.x, y = _a.y;
    var path = [
        { x: cropHorizontalToScreen(x + distance), y: y },
        { x: cropHorizontalToScreen(x - distance), y: y },
        { x: x, y: y },
    ];
    path.forEach(function (pos) { return robotjs_1.moveMouseSmooth(pos.x, pos.y); });
}
function cropHorizontalToScreen(x) {
    return x <= 0 ? 0 : Math.min(x, robotjs_1.getScreenSize().width);
}
function shutdown() {
    console.log('Shutting down');
    process.exit(0);
}
//# sourceMappingURL=anti-afk.js.map