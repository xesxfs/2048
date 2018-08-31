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
            var GlowFilterPlugin = (function (_super) {
                __extends(GlowFilterPlugin, _super);
                function GlowFilterPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "glowFilter";
                    _this.overwriteProps = ["glowFilter"];
                    return _this;
                }
                GlowFilterPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this._type = flash.GlowFilter;
                    this.initFilter(value, new flash.GlowFilter(16777215, 0, 0, 0, flash.trannumber(value.strength) || flash.trannumber(1), flash.tranint(value.quality) || flash.tranint(2), value.inner, value.knockout), com.greensock.plugins.GlowFilterPlugin._propNames);
                    return true;
                };
                return GlowFilterPlugin;
            }(com.greensock.plugins.FilterPlugin));
            plugins.GlowFilterPlugin = GlowFilterPlugin;
            __reflect(GlowFilterPlugin.prototype, "com.greensock.plugins.GlowFilterPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.GlowFilterPlugin.API_static_com_greensock_plugins_GlowFilterPlugin = 1;
com.greensock.plugins.GlowFilterPlugin._propNames = ["color", "alpha", "blurX", "blurY", "strength", "quality", "inner", "knockout"];
flash.extendsClass("com.greensock.plugins.GlowFilterPlugin", "com.greensock.plugins.FilterPlugin");
//# sourceMappingURL=GlowFilterPlugin.js.map