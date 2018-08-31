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
            var ColorTransformPlugin = (function (_super) {
                __extends(ColorTransformPlugin, _super);
                function ColorTransformPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "colorTransform";
                    return _this;
                }
                ColorTransformPlugin.prototype.onInitTween = function (target, value, tween) {
                    var start = null;
                    var p = null;
                    var ratio = NaN;
                    var end = new flash.ColorTransform();
                    if (flash.As3is(target, egret.DisplayObject)) {
                        this._transform = (target)["transform"];
                        start = this._transform.colorTransform;
                    }
                    else if (flash.As3is(target, flash.ColorTransform)) {
                        start = flash.As3As(target, flash.ColorTransform);
                    }
                    else {
                        return false;
                    }
                    end.concat(start);
                    for (p in value) {
                        if (p == "tint" || p == "color") {
                            if (value[p] != null) {
                                end.color = flash.tranint(value[p]);
                            }
                        }
                        else if (!(p == "tintAmount" || p == "exposure" || p == "brightness")) {
                            end[p] = value[p];
                        }
                    }
                    if (!isNaN(value.tintAmount)) {
                        ratio = value.tintAmount / (1 - (end.redMultiplier + end.greenMultiplier + end.blueMultiplier) / 3);
                        end.redOffset = end.redOffset * ratio;
                        end.greenOffset = end.greenOffset * ratio;
                        end.blueOffset = end.blueOffset * ratio;
                        end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1 - value.tintAmount;
                    }
                    else if (!isNaN(value.exposure)) {
                        end.redOffset = end.greenOffset = end.blueOffset = 255 * (value.exposure - 1);
                        end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1;
                    }
                    else if (!isNaN(value.brightness)) {
                        end.redOffset = end.greenOffset = end.blueOffset = Math.max(0, (value.brightness - 1) * 255);
                        end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1 - Math.abs(value.brightness - 1);
                    }
                    this.init(start, end);
                    return true;
                };
                return ColorTransformPlugin;
            }(com.greensock.plugins.TintPlugin));
            plugins.ColorTransformPlugin = ColorTransformPlugin;
            __reflect(ColorTransformPlugin.prototype, "com.greensock.plugins.ColorTransformPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.ColorTransformPlugin.API_static_com_greensock_plugins_ColorTransformPlugin = 1;
flash.extendsClass("com.greensock.plugins.ColorTransformPlugin", "com.greensock.plugins.TintPlugin");
//# sourceMappingURL=ColorTransformPlugin.js.map