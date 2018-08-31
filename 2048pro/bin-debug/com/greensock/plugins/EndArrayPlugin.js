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
            var EndArrayPlugin = (function (_super) {
                __extends(EndArrayPlugin, _super);
                function EndArrayPlugin() {
                    var _this = _super.call(this) || this;
                    _this._info = [];
                    _this.propName = "endArray";
                    _this.overwriteProps = ["endArray"];
                    return _this;
                }
                EndArrayPlugin.prototype.init = function (start, end) {
                    this._a = start;
                    var i = flash.checkInt(end.length);
                    while (i--) {
                        if (start[i] != end[i] && start[i] != null) {
                            this._info[this._info.length] = new ArrayTweenInfo(i, this._a[i], end[i] - this._a[i]);
                        }
                    }
                };
                EndArrayPlugin.prototype.onInitTween = function (target, value, tween) {
                    if (!(flash.As3is(target, Array)) || !(flash.As3is(value, Array))) {
                        return false;
                    }
                    this.init(flash.As3As(target, Array), value);
                    return true;
                };
                Object.defineProperty(EndArrayPlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.EndArrayPlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        var ti = null;
                        var val = NaN;
                        var i = flash.checkInt(this._info.length);
                        if (this.round) {
                            while (i--) {
                                ti = this._info[i];
                                val = ti.start + ti.change * n;
                                if (val > 0) {
                                    this._a[ti.index] = val + 0.5 >> 0;
                                }
                                else {
                                    this._a[ti.index] = val - 0.5 >> 0;
                                }
                            }
                        }
                        else {
                            while (i--) {
                                ti = this._info[i];
                                this._a[ti.index] = ti.start + ti.change * n;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return EndArrayPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.EndArrayPlugin = EndArrayPlugin;
            __reflect(EndArrayPlugin.prototype, "com.greensock.plugins.EndArrayPlugin");
            var ArrayTweenInfo = (function (_super) {
                __extends(ArrayTweenInfo, _super);
                function ArrayTweenInfo(index, start, change) {
                    var _this = _super.call(this) || this;
                    _this.change = NaN;
                    _this.start = NaN;
                    _this.index = 0;
                    index = flash.checkUint(index);
                    _this = _super.call(this) || this;
                    _this.index = flash.checkUint(index);
                    _this.start = start;
                    _this.change = change;
                    return _this;
                }
                return ArrayTweenInfo;
            }(egret.HashObject));
            __reflect(ArrayTweenInfo.prototype, "ArrayTweenInfo");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.EndArrayPlugin.API_static_com_greensock_plugins_EndArrayPlugin = 1;
flash.extendsClass("com.greensock.plugins.EndArrayPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=EndArrayPlugin.js.map