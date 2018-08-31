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
            var HexColorsPlugin = (function (_super) {
                __extends(HexColorsPlugin, _super);
                function HexColorsPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "hexColors";
                    _this.overwriteProps = [];
                    _this._colors = [];
                    return _this;
                }
                HexColorsPlugin.prototype.killProps = function (lookup) {
                    for (var i = flash.checkInt(this._colors.length - 1); i > -1; i--) {
                        if (lookup[this._colors[i][1]] != undefined) {
                            this._colors.splice(i, 1);
                        }
                    }
                    _super.prototype.killProps.call(this, lookup);
                };
                HexColorsPlugin.prototype.initColor = function (target, propName, start, end) {
                    start = flash.checkUint(start);
                    end = flash.checkUint(end);
                    var r = NaN;
                    var g = NaN;
                    var b = NaN;
                    if (start != end) {
                        r = start >> 16;
                        g = start >> 8 & 255;
                        b = start & 255;
                        this._colors[this._colors.length] = [target, propName, r, (end >> 16) - r, g, (end >> 8 & 255) - g, b, (end & 255) - b];
                        this.overwriteProps[this.overwriteProps.length] = propName;
                    }
                };
                Object.defineProperty(HexColorsPlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.HexColorsPlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        var a = null;
                        var i = flash.checkInt(this._colors.length);
                        while (--i > -1) {
                            a = this._colors[i];
                            a[0][a[1]] = a[2] + n * a[3] << 16 | a[4] + n * a[5] << 8 | a[6] + n * a[7];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                HexColorsPlugin.prototype.onInitTween = function (target, value, tween) {
                    var p = null;
                    for (p in value) {
                        this.initColor(target, p, flash.tranint(target[p]), flash.tranint(value[p]));
                    }
                    return true;
                };
                return HexColorsPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.HexColorsPlugin = HexColorsPlugin;
            __reflect(HexColorsPlugin.prototype, "com.greensock.plugins.HexColorsPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.HexColorsPlugin.API_static_com_greensock_plugins_HexColorsPlugin = 1;
flash.extendsClass("com.greensock.plugins.HexColorsPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=HexColorsPlugin.js.map