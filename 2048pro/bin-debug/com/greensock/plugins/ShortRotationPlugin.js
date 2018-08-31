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
            var ShortRotationPlugin = (function (_super) {
                __extends(ShortRotationPlugin, _super);
                function ShortRotationPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "shortRotation";
                    _this.overwriteProps = [];
                    return _this;
                }
                ShortRotationPlugin.prototype.onInitTween = function (target, value, tween) {
                    var p = null;
                    if (typeof value == "number") {
                        return false;
                    }
                    var useRadians = flash.Boolean(value.useRadians == true);
                    for (p in value) {
                        if (p != "useRadians") {
                            this.initRotation(target, p, target[p], typeof value[p] == "number" ? flash.trannumber(flash.trannumber(value[p])) : flash.trannumber(target[p] + flash.trannumber(value[p])), useRadians);
                        }
                    }
                    return true;
                };
                ShortRotationPlugin.prototype.initRotation = function (target, propName, start, end, useRadians) {
                    if (useRadians === void 0) { useRadians = false; }
                    var cap = !!useRadians ? flash.trannumber(Math.PI * 2) : flash.trannumber(360);
                    var dif = (end - start) % cap;
                    if (dif != dif % (cap / 2)) {
                        dif = dif < 0 ? flash.trannumber(dif + cap) : flash.trannumber(dif - cap);
                    }
                    this.addTween(target, propName, start, start + dif, propName);
                    this.overwriteProps[this.overwriteProps.length] = propName;
                };
                return ShortRotationPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.ShortRotationPlugin = ShortRotationPlugin;
            __reflect(ShortRotationPlugin.prototype, "com.greensock.plugins.ShortRotationPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.ShortRotationPlugin.API_static_com_greensock_plugins_ShortRotationPlugin = 1;
flash.extendsClass("com.greensock.plugins.ShortRotationPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=ShortRotationPlugin.js.map