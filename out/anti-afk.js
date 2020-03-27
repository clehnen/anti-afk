"use strict";
exports.__esModule = true;
var robotjs_1 = require("robotjs");
function wiggleMouseLeftToRight(distance) {
    var _a = robotjs_1.getMousePos(), x = _a.x, y = _a.y;
    var path = [
        { x: limitToScreenSize(x + distance), y: y },
        { x: limitToScreenSize(x - distance), y: y },
        { x: x, y: y },
    ];
    path.forEach(function (pos) { return robotjs_1.moveMouseSmooth(pos.x, pos.y); });
}
exports.wiggleMouseLeftToRight = wiggleMouseLeftToRight;
function limitToScreenSize(x) {
    return x <= 0 ? 0 : Math.min(x, robotjs_1.getScreenSize().width);
}
//# sourceMappingURL=anti-afk.js.map