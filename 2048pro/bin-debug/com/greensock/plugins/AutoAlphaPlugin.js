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
            var AutoAlphaPlugin = (function (_super) {
                __extends(AutoAlphaPlugin, _super);
                function AutoAlphaPlugin() {
                    var _this = _super.call(this) || this;
                    _this._ignoreVisible = false;
                    _this.propName = "autoAlpha";
                    _this.overwriteProps = ["alpha", "visible"];
                    return _this;
                }
                AutoAlphaPlugin.prototype.killProps = function (lookup) {
                    _super.prototype.killProps.call(this, lookup);
                    this._ignoreVisible = flash.Boolean("visible" in lookup);
                };
                AutoAlphaPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this.addTween(target, "alpha", target["alpha"], value, "alpha");
                    return true;
                };
                Object.defineProperty(AutoAlphaPlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.AutoAlphaPlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        this.updateTweens(n);
                        if (!this._ignoreVisible) {
                            this._target["visible"] = flash.Boolean(this._target["alpha"] != 0);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return AutoAlphaPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.AutoAlphaPlugin = AutoAlphaPlugin;
            __reflect(AutoAlphaPlugin.prototype, "com.greensock.plugins.AutoAlphaPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.AutoAlphaPlugin.API_static_com_greensock_plugins_AutoAlphaPlugin = 1;
flash.extendsClass("com.greensock.plugins.AutoAlphaPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=AutoAlphaPlugin.js.map