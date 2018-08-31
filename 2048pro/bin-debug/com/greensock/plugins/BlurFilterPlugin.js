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
            var BlurFilterPlugin = (function (_super) {
                __extends(BlurFilterPlugin, _super);
                function BlurFilterPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "blurFilter";
                    _this.overwriteProps = ["blurFilter"];
                    return _this;
                }
                BlurFilterPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this._type = flash.BlurFilter;
                    this.initFilter(value, new flash.BlurFilter(0, 0, flash.tranint(value.quality) || flash.tranint(2)), com.greensock.plugins.BlurFilterPlugin._propNames);
                    return true;
                };
                return BlurFilterPlugin;
            }(com.greensock.plugins.FilterPlugin));
            plugins.BlurFilterPlugin = BlurFilterPlugin;
            __reflect(BlurFilterPlugin.prototype, "com.greensock.plugins.BlurFilterPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.BlurFilterPlugin.API_static_com_greensock_plugins_BlurFilterPlugin = 1;
com.greensock.plugins.BlurFilterPlugin._propNames = ["blurX", "blurY", "quality"];
flash.extendsClass("com.greensock.plugins.BlurFilterPlugin", "com.greensock.plugins.FilterPlugin");
//# sourceMappingURL=BlurFilterPlugin.js.map