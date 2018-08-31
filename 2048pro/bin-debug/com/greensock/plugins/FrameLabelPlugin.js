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
            var FrameLabelPlugin = (function (_super) {
                __extends(FrameLabelPlugin, _super);
                function FrameLabelPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "frameLabel";
                    return _this;
                }
                FrameLabelPlugin.prototype.onInitTween = function (target, value, tween) {
                    if (flash.As3is(!tween.target, egret.SwfMovie)) {
                        return false;
                    }
                    this._target = flash.As3As(target, egret.SwfMovie);
                    this.frame = flash.checkInt(this._target.currentFrame);
                    var labels = this._target["currentLabels"];
                    var label = value;
                    var endFrame = flash.checkInt(this._target.currentFrame);
                    var i = flash.checkInt(labels.length);
                    while (i--) {
                        if (labels[i].name == label) {
                            endFrame = flash.checkInt(labels[i].frame);
                            break;
                        }
                    }
                    if (this.frame != endFrame) {
                        this.addTween(this, "frame", this.frame, endFrame, "frame");
                    }
                    return true;
                };
                return FrameLabelPlugin;
            }(com.greensock.plugins.FramePlugin));
            plugins.FrameLabelPlugin = FrameLabelPlugin;
            __reflect(FrameLabelPlugin.prototype, "com.greensock.plugins.FrameLabelPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.FrameLabelPlugin.API_static_com_greensock_plugins_FrameLabelPlugin = 1;
flash.extendsClass("com.greensock.plugins.FrameLabelPlugin", "com.greensock.plugins.FramePlugin");
//# sourceMappingURL=FrameLabelPlugin.js.map