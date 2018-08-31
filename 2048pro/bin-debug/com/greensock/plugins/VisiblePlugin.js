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
            var VisiblePlugin = (function (_super) {
                __extends(VisiblePlugin, _super);
                function VisiblePlugin() {
                    var _this = _super.call(this) || this;
                    _this._initVal = false;
                    _this._visible = false;
                    _this.propName = "visible";
                    _this.overwriteProps = ["visible"];
                    return _this;
                }
                VisiblePlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this._tween = tween;
                    this._initVal = this._target["visible"];
                    this._visible = flash.Boolean(value);
                    return true;
                };
                Object.defineProperty(VisiblePlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.VisiblePlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        if (n == 1 && (this._tween.cachedDuration == this._tween.cachedTime || this._tween.cachedTime == 0)) {
                            this._target["visible"] = this._visible;
                        }
                        else {
                            this._target["visible"] = this._initVal;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return VisiblePlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.VisiblePlugin = VisiblePlugin;
            __reflect(VisiblePlugin.prototype, "com.greensock.plugins.VisiblePlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.VisiblePlugin.API_static_com_greensock_plugins_VisiblePlugin = 1;
flash.extendsClass("com.greensock.plugins.VisiblePlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=VisiblePlugin.js.map