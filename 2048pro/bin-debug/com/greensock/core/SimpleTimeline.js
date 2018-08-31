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
        var core;
        (function (core) {
            var SimpleTimeline = (function (_super) {
                __extends(SimpleTimeline, _super);
                function SimpleTimeline(vars) {
                    if (vars === void 0) { vars = null; }
                    var _this = _super.call(this, 0, vars) || this;
                    _this.autoRemoveChildren = false;
                    return _this;
                }
                Object.defineProperty(SimpleTimeline.prototype, "rawTime", {
                    get: function () {
                        return this.cachedTotalTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleTimeline.prototype.insert = function (tween, time) {
                    if (time === void 0) { time = 0; }
                    var prevTimeline = tween.timeline;
                    if (!tween.cachedOrphan && prevTimeline) {
                        prevTimeline.remove(tween, true);
                    }
                    tween.timeline = this;
                    tween.cachedStartTime = flash.trannumber(time) + tween.delay;
                    if (tween.gc) {
                        tween.setEnabled(true, true);
                    }
                    if (tween.cachedPaused && prevTimeline != this) {
                        tween.cachedPauseTime = tween.cachedStartTime + (this.rawTime - tween.cachedStartTime) / tween.cachedTimeScale;
                    }
                    if (this._lastChild) {
                        this._lastChild.nextNode = tween;
                    }
                    else {
                        this._firstChild = tween;
                    }
                    tween.prevNode = this._lastChild;
                    this._lastChild = tween;
                    tween.nextNode = null;
                    tween.cachedOrphan = false;
                    return tween;
                };
                SimpleTimeline.prototype.renderTime = function (time, suppressEvents, force) {
                    if (suppressEvents === void 0) { suppressEvents = false; }
                    if (force === void 0) { force = false; }
                    var dur = NaN;
                    var next = null;
                    var tween = this._firstChild;
                    this.cachedTotalTime = time;
                    this.cachedTime = time;
                    while (tween) {
                        next = tween.nextNode;
                        if (tween.active || time >= tween.cachedStartTime && !tween.cachedPaused && !tween.gc) {
                            if (!tween.cachedReversed) {
                                tween.renderTime((time - tween.cachedStartTime) * tween.cachedTimeScale, suppressEvents, false);
                            }
                            else {
                                dur = !!tween.cacheIsDirty ? flash.trannumber(tween.totalDuration) : flash.trannumber(tween.cachedTotalDuration);
                                tween.renderTime(dur - (time - tween.cachedStartTime) * tween.cachedTimeScale, suppressEvents, false);
                            }
                        }
                        tween = next;
                    }
                };
                SimpleTimeline.prototype.remove = function (tween, skipDisable) {
                    if (skipDisable === void 0) { skipDisable = false; }
                    if (tween.cachedOrphan) {
                        return;
                    }
                    if (!skipDisable) {
                        tween.setEnabled(false, true);
                    }
                    if (tween.nextNode) {
                        tween.nextNode.prevNode = tween.prevNode;
                    }
                    else if (this._lastChild == tween) {
                        this._lastChild = tween.prevNode;
                    }
                    if (tween.prevNode) {
                        tween.prevNode.nextNode = tween.nextNode;
                    }
                    else if (this._firstChild == tween) {
                        this._firstChild = tween.nextNode;
                    }
                    tween.cachedOrphan = true;
                };
                return SimpleTimeline;
            }(com.greensock.core.TweenCore));
            core.SimpleTimeline = SimpleTimeline;
            __reflect(SimpleTimeline.prototype, "com.greensock.core.SimpleTimeline");
        })(core = greensock.core || (greensock.core = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
flash.extendsClass("com.greensock.core.SimpleTimeline", "com.greensock.core.TweenCore");
//# sourceMappingURL=SimpleTimeline.js.map