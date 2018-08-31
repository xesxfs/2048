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
            var BevelFilterPlugin = (function (_super) {
                __extends(BevelFilterPlugin, _super);
                function BevelFilterPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "bevelFilter";
                    _this.overwriteProps = ["bevelFilter"];
                    return _this;
                }
                BevelFilterPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this._type = flash.BevelFilter;
                    this.initFilter(value, new flash.BevelFilter(0, 0, 16777215, 0.5, 0, 0.5, 2, 2, 0, flash.tranint(value.quality) || flash.tranint(2)), com.greensock.plugins.BevelFilterPlugin._propNames);
                    return true;
                };
                return BevelFilterPlugin;
            }(com.greensock.plugins.FilterPlugin));
            plugins.BevelFilterPlugin = BevelFilterPlugin;
            __reflect(BevelFilterPlugin.prototype, "com.greensock.plugins.BevelFilterPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.BevelFilterPlugin.API_static_com_greensock_plugins_BevelFilterPlugin = 1;
com.greensock.plugins.BevelFilterPlugin._propNames = ["distance", "angle", "highlightColor", "highlightAlpha", "shadowColor", "shadowAlpha", "blurX", "blurY", "strength", "quality"];
flash.extendsClass("com.greensock.plugins.BevelFilterPlugin", "com.greensock.plugins.FilterPlugin");
//# sourceMappingURL=BevelFilterPlugin.js.map