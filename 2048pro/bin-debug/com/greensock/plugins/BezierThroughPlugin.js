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
        var plugins;
        (function (plugins) {
            var BezierThroughPlugin = (function (_super) {
                __extends(BezierThroughPlugin, _super);
                function BezierThroughPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "bezierThrough";
                    return _this;
                }
                BezierThroughPlugin.prototype.onInitTween = function (target, value, tween) {
                    if (!(flash.As3is(value, Array))) {
                        return false;
                    }
                    this.init(tween, flash.As3As(value, Array), true);
                    return true;
                };
                return BezierThroughPlugin;
            }(com.greensock.plugins.BezierPlugin));
            plugins.BezierThroughPlugin = BezierThroughPlugin;
            __reflect(BezierThroughPlugin.prototype, "com.greensock.plugins.BezierThroughPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.BezierThroughPlugin.API_static_com_greensock_plugins_BezierThroughPlugin = 1;
flash.extendsClass("com.greensock.plugins.BezierThroughPlugin", "com.greensock.plugins.BezierPlugin");
//# sourceMappingURL=BezierThroughPlugin.js.map