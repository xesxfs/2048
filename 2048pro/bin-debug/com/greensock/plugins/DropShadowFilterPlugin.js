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
            var DropShadowFilterPlugin = (function (_super) {
                __extends(DropShadowFilterPlugin, _super);
                function DropShadowFilterPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "dropShadowFilter";
                    _this.overwriteProps = ["dropShadowFilter"];
                    return _this;
                }
                DropShadowFilterPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this._type = flash.DropShadowFilter;
                    this.initFilter(value, new flash.DropShadowFilter(0, 45, 0, 0, 0, 0, 1, flash.tranint(value.quality) || flash.tranint(2), value.inner, value.knockout, value.hideObject), com.greensock.plugins.DropShadowFilterPlugin._propNames);
                    return true;
                };
                return DropShadowFilterPlugin;
            }(com.greensock.plugins.FilterPlugin));
            plugins.DropShadowFilterPlugin = DropShadowFilterPlugin;
            __reflect(DropShadowFilterPlugin.prototype, "com.greensock.plugins.DropShadowFilterPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.DropShadowFilterPlugin.API_static_com_greensock_plugins_DropShadowFilterPlugin = 1;
com.greensock.plugins.DropShadowFilterPlugin._propNames = ["distance", "angle", "color", "alpha", "blurX", "blurY", "strength", "quality", "inner", "knockout", "hideObject"];
flash.extendsClass("com.greensock.plugins.DropShadowFilterPlugin", "com.greensock.plugins.FilterPlugin");
//# sourceMappingURL=DropShadowFilterPlugin.js.map