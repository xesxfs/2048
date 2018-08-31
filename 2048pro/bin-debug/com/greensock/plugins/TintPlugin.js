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
            var TintPlugin = (function (_super) {
                __extends(TintPlugin, _super);
                function TintPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "tint";
                    _this.overwriteProps = ["tint"];
                    return _this;
                }
                TintPlugin.prototype.init = function (start, end) {
                    var p = null;
                    var i = flash.checkInt(com.greensock.plugins.TintPlugin._props.length);
                    var cnt = flash.checkInt(this._tweens.length);
                    while (i--) {
                        p = com.greensock.plugins.TintPlugin._props[i];
                        if (start[p] != end[p]) {
                            this._tweens[cnt++] = new com.greensock.core.PropTween(start, p, start[p], end[p] - start[p], "tint", false);
                        }
                    }
                };
                TintPlugin.prototype.onInitTween = function (target, value, tween) {
                    if (!(flash.As3is(target, egret.DisplayObject))) {
                        return false;
                    }
                    var end = new flash.ColorTransform();
                    if (value != null && tween.vars["removeTint"] != true) {
                        end.color = flash.tranint(value);
                    }
                    this._transform = (target)["transform"];
                    var start = this._transform.colorTransform;
                    end.alphaMultiplier = start.alphaMultiplier;
                    end.alphaOffset = start.alphaOffset;
                    this.init(start, end);
                    return true;
                };
                Object.defineProperty(TintPlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.TintPlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        var ct = null;
                        var pt = null;
                        var i = flash.checkInt(0);
                        if (this._transform) {
                            ct = this._transform.colorTransform;
                            i = flash.checkInt(this._tweens.length);
                            while (--i > -1) {
                                pt = this._tweens[i];
                                ct[pt.property] = pt.start + pt.change * n;
                            }
                            this._transform.colorTransform = ct;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TintPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.TintPlugin = TintPlugin;
            __reflect(TintPlugin.prototype, "com.greensock.plugins.TintPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.TintPlugin._props = ["redMultiplier", "greenMultiplier", "blueMultiplier", "alphaMultiplier", "redOffset", "greenOffset", "blueOffset", "alphaOffset"];
com.greensock.plugins.TintPlugin.API_static_com_greensock_plugins_TintPlugin = 1;
flash.extendsClass("com.greensock.plugins.TintPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=TintPlugin.js.map