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
            var FramePlugin = (function (_super) {
                __extends(FramePlugin, _super);
                function FramePlugin() {
                    var _this = _super.call(this) || this;
                    _this.frame = 0;
                    _this.propName = "frame";
                    _this.overwriteProps = ["frame", "frameLabel"];
                    _this.round = true;
                    return _this;
                }
                FramePlugin.prototype.onInitTween = function (target, value, tween) {
                    if (!(flash.As3is(target, egret.SwfMovie)) || isNaN(value)) {
                        return false;
                    }
                    this._target = flash.As3As(target, egret.SwfMovie);
                    this.frame = flash.checkInt(this._target.currentFrame);
                    this.addTween(this, "frame", this.frame, value, "frame");
                    return true;
                };
                Object.defineProperty(FramePlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.FramePlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        this.updateTweens(n);
                        this._target.gotoAndStop(this.frame);
                    },
                    enumerable: true,
                    configurable: true
                });
                return FramePlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.FramePlugin = FramePlugin;
            __reflect(FramePlugin.prototype, "com.greensock.plugins.FramePlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.FramePlugin.API_static_com_greensock_plugins_FramePlugin = 1;
flash.extendsClass("com.greensock.plugins.FramePlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=FramePlugin.js.map