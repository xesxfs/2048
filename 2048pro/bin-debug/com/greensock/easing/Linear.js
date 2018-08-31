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
            var Linear = (function (_super) {
                __extends(Linear, _super);
                function Linear() {
                    var _this = _super.call(this) || this;
                    _this = _super.call(this) || this;
                    return _this;
                }
                Linear.easeOut = function (t, b, c, d) {
                    return c * t / d + b;
                };
                Linear.easeIn = function (t, b, c, d) {
                    return c * t / d + b;
                };
                Linear.easeNone = function (t, b, c, d) {
                    return c * t / d + b;
                };
                Linear.easeInOut = function (t, b, c, d) {
                    return c * t / d + b;
                };
                return Linear;
            }(egret.HashObject));
            easing.Linear = Linear;
            __reflect(Linear.prototype, "com.greensock.easing.Linear");
        })(easing = greensock.easing || (greensock.easing = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.easing.Linear.power = 0;
//# sourceMappingURL=Linear.js.map