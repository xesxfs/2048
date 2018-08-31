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
            var ColorMatrixFilterPlugin = (function (_super) {
                __extends(ColorMatrixFilterPlugin, _super);
                function ColorMatrixFilterPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "colorMatrixFilter";
                    _this.overwriteProps = ["colorMatrixFilter"];
                    return _this;
                }
                ColorMatrixFilterPlugin.setSaturation = function (m, n) {
                    if (isNaN(n)) {
                        return m;
                    }
                    var inv = 1 - n;
                    var r = inv * com.greensock.plugins.ColorMatrixFilterPlugin._lumR;
                    var g = inv * com.greensock.plugins.ColorMatrixFilterPlugin._lumG;
                    var b = inv * com.greensock.plugins.ColorMatrixFilterPlugin._lumB;
                    var temp = [r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0];
                    return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp, m);
                };
                ColorMatrixFilterPlugin.setHue = function (m, n) {
                    if (isNaN(n)) {
                        return m;
                    }
                    n = n * (Math.PI / 180);
                    var c = Math.cos(n);
                    var s = Math.sin(n);
                    var temp = [com.greensock.plugins.ColorMatrixFilterPlugin._lumR + c * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumR) + s * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR, com.greensock.plugins.ColorMatrixFilterPlugin._lumG + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG + s * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG, com.greensock.plugins.ColorMatrixFilterPlugin._lumB + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumB + s * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumB), 0, 0, com.greensock.plugins.ColorMatrixFilterPlugin._lumR + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR + s * 0.143, com.greensock.plugins.ColorMatrixFilterPlugin._lumG + c * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumG) + s * 0.14, com.greensock.plugins.ColorMatrixFilterPlugin._lumB + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumB + s * -0.283, 0, 0, com.greensock.plugins.ColorMatrixFilterPlugin._lumR + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR + s * -(1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumR), com.greensock.plugins.ColorMatrixFilterPlugin._lumG + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG + s * com.greensock.plugins.ColorMatrixFilterPlugin._lumG, com.greensock.plugins.ColorMatrixFilterPlugin._lumB + c * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumB) + s * com.greensock.plugins.ColorMatrixFilterPlugin._lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                    return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp, m);
                };
                ColorMatrixFilterPlugin.setContrast = function (m, n) {
                    if (isNaN(n)) {
                        return m;
                    }
                    n = n + 0.01;
                    var temp = [n, 0, 0, 0, 128 * (1 - n), 0, n, 0, 0, 128 * (1 - n), 0, 0, n, 0, 128 * (1 - n), 0, 0, 0, 1, 0];
                    return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp, m);
                };
                ColorMatrixFilterPlugin.applyMatrix = function (m, m2) {
                    var y = flash.checkInt(0);
                    var x = flash.checkInt(0);
                    if (!(flash.As3is(m, Array)) || !(flash.As3is(m2, Array))) {
                        return m2;
                    }
                    var temp = [];
                    var i = flash.checkInt(0);
                    var z = flash.checkInt(0);
                    for (y = flash.checkInt(0); y < 4; y = flash.checkInt(y + 1)) {
                        for (x = flash.checkInt(0); x < 5; x = flash.checkInt(x + 1)) {
                            if (x == 4) {
                                z = flash.checkInt(m[i + 4]);
                            }
                            else {
                                z = flash.checkInt(0);
                            }
                            temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
                        }
                        i = flash.checkInt(i + 5);
                    }
                    return temp;
                };
                ColorMatrixFilterPlugin.setThreshold = function (m, n) {
                    if (isNaN(n)) {
                        return m;
                    }
                    var temp = [com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256, com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256, com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256, 0, -256 * n, com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256, com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256, com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256, 0, -256 * n, com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256, com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256, com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256, 0, -256 * n, 0, 0, 0, 1, 0];
                    return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp, m);
                };
                ColorMatrixFilterPlugin.colorize = function (m, color, amount) {
                    if (amount === void 0) { amount = 1; }
                    if (isNaN(color)) {
                        return m;
                    }
                    if (isNaN(amount)) {
                        amount = 1;
                    }
                    var r = (color >> 16 & 255) / 255;
                    var g = (color >> 8 & 255) / 255;
                    var b = (color & 255) / 255;
                    var inv = 1 - amount;
                    var temp = [inv + amount * r * com.greensock.plugins.ColorMatrixFilterPlugin._lumR, amount * r * com.greensock.plugins.ColorMatrixFilterPlugin._lumG, amount * r * com.greensock.plugins.ColorMatrixFilterPlugin._lumB, 0, 0, amount * g * com.greensock.plugins.ColorMatrixFilterPlugin._lumR, inv + amount * g * com.greensock.plugins.ColorMatrixFilterPlugin._lumG, amount * g * com.greensock.plugins.ColorMatrixFilterPlugin._lumB, 0, 0, amount * b * com.greensock.plugins.ColorMatrixFilterPlugin._lumR, amount * b * com.greensock.plugins.ColorMatrixFilterPlugin._lumG, inv + amount * b * com.greensock.plugins.ColorMatrixFilterPlugin._lumB, 0, 0, 0, 0, 0, 1, 0];
                    return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp, m);
                };
                ColorMatrixFilterPlugin.setBrightness = function (m, n) {
                    if (isNaN(n)) {
                        return m;
                    }
                    n = n * 100 - 100;
                    return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix([1, 0, 0, 0, n, 0, 1, 0, 0, n, 0, 0, 1, 0, n, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
                };
                ColorMatrixFilterPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._target = target;
                    this._type = flash.ColorMatrixFilter;
                    var cmf = value;
                    this.initFilter({ "remove": value.remove, "index": value.index, "addFilter": value.addFilter }, new flash.ColorMatrixFilter(com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix.slice()), com.greensock.plugins.ColorMatrixFilterPlugin._propNames);
                    this._matrix = (this._filter).matrix;
                    var endMatrix = [];
                    if (cmf["matrix"] != null && flash.As3is(cmf["matrix"], Array)) {
                        endMatrix = cmf["matrix"];
                    }
                    else {
                        if (cmf["relative"] == true) {
                            endMatrix = this._matrix.slice();
                        }
                        else {
                            endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix.slice();
                        }
                        endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setBrightness(endMatrix, cmf["brightness"]);
                        endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setContrast(endMatrix, cmf["contrast"]);
                        endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setHue(endMatrix, cmf["hue"]);
                        endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setSaturation(endMatrix, cmf["saturation"]);
                        endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setThreshold(endMatrix, cmf["threshold"]);
                        if (!isNaN(cmf["colorize"])) {
                            endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.colorize(endMatrix, cmf["colorize"], cmf["amount"]);
                        }
                    }
                    this._matrixTween = new com.greensock.plugins.EndArrayPlugin();
                    this._matrixTween.init(this._matrix, endMatrix);
                    return true;
                };
                Object.defineProperty(ColorMatrixFilterPlugin.prototype, "changeFactor", {
                    set: function (n) {
                        this._matrixTween.changeFactor = n;
                        (this._filter).matrix = this._matrix;
                        egret.superSetter(com.greensock.plugins.ColorMatrixFilterPlugin, this, "changeFactor", n);
                    },
                    enumerable: true,
                    configurable: true
                });
                return ColorMatrixFilterPlugin;
            }(com.greensock.plugins.FilterPlugin));
            plugins.ColorMatrixFilterPlugin = ColorMatrixFilterPlugin;
            __reflect(ColorMatrixFilterPlugin.prototype, "com.greensock.plugins.ColorMatrixFilterPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.ColorMatrixFilterPlugin.API_static_com_greensock_plugins_ColorMatrixFilterPlugin = 1;
com.greensock.plugins.ColorMatrixFilterPlugin._propNames = [];
com.greensock.plugins.ColorMatrixFilterPlugin._lumG = 0.71516;
com.greensock.plugins.ColorMatrixFilterPlugin._lumR = 0.212671;
com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
com.greensock.plugins.ColorMatrixFilterPlugin._lumB = 0.072169;
flash.extendsClass("com.greensock.plugins.ColorMatrixFilterPlugin", "com.greensock.plugins.FilterPlugin");
//# sourceMappingURL=ColorMatrixFilterPlugin.js.map