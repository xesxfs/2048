var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var com;
(function (com) {
    var greensock;
    (function (greensock) {
        var easing;
        (function (easing) {
            var Back = (function (_super) {
                __extends(Back, _super);
                function Back() {
                    var _this = _super.call(this) || this;
                    _this = _super.call(this) || this;
                    return _this;
                }
                Back.easeOut = function (t, b, c, d, s) {
                    if (s === void 0) { s = 1.70158; }
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                };
                Back.easeIn = function (t, b, c, d, s) {
                    if (s === void 0) { s = 1.70158; }
                    return c * (t = t / d) * t * ((s + 1) * t - s) + b;
                };
                Back.easeInOut = function (t, b, c, d, s) {
                    if (s === void 0) { s = 1.70158; }
                    if ((t = t / (d * 0.5)) < 1) {
                        return c * 0.5 * (t * t * (((s = s * 1.525) + 1) * t - s)) + b;
                    }
                    return c / 2 * ((t = t - 2) * t * (((s = s * 1.525) + 1) * t + s) + 2) + b;
                };
                return Back;
            }(egret.HashObject));
            easing.Back = Back;
            __reflect(Back.prototype, "com.greensock.easing.Back");
        })(easing = greensock.easing || (greensock.easing = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
//# sourceMappingURL=Back.js.map