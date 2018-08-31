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
            var VolumePlugin = (function (_super) {
                __extends(VolumePlugin, _super);
                function VolumePlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "volume";
                    _this.overwriteProps = ["volume"];
                    return _this;
                }
                VolumePlugin.prototype.onInitTween = function (target, value, tween) {
                    if (isNaN(value) || target.hasOwnProperty("volume") || !target.hasOwnProperty("soundTransform")) {
                        return false;
                    }
                    this._target = target;
                    this._st = this._target["soundTransform"];
                    this.addTween(this._st, "volume", this._st.volume, value, "volume");
                    return true;
                };
                Object.defineProperty(VolumePlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.VolumePlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        this.updateTweens(n);
                        this._target["soundTransform"] = this._st;
                    },
                    enumerable: true,
                    configurable: true
                });
                return VolumePlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.VolumePlugin = VolumePlugin;
            __reflect(VolumePlugin.prototype, "com.greensock.plugins.VolumePlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.VolumePlugin.API_static_com_greensock_plugins_VolumePlugin = 1;
flash.extendsClass("com.greensock.plugins.VolumePlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=VolumePlugin.js.map