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
            var TweenCore = (function (_super) {
                __extends(TweenCore, _super);
                function TweenCore(duration, vars) {
                    if (duration === void 0) { duration = 0; }
                    if (vars === void 0) { vars = null; }
                    var _this = _super.call(this) || this;
                    _this.initted = false;
                    _this._hasUpdate = false;
                    _this.active = false;
                    _this._delay = NaN;
                    _this.cachedReversed = false;
                    _this.cachedTime = NaN;
                    _this._rawPrevTime = -1;
                    _this.cachedTotalTime = NaN;
                    _this.cachedOrphan = false;
                    _this.cachedStartTime = NaN;
                    _this.cachedDuration = NaN;
                    _this.gc = false;
                    _this.cachedPauseTime = NaN;
                    _this.cacheIsDirty = false;
                    _this.cachedPaused = false;
                    _this.cachedTimeScale = NaN;
                    _this.cachedTotalDuration = NaN;
                    _this = _super.call(this) || this;
                    _this.vars = vars != null ? vars : {};
                    if (_this.vars["isGSVars"]) {
                        _this.vars = _this.vars["vars"];
                    }
                    _this.cachedDuration = _this.cachedTotalDuration = duration;
                    _this._delay = flash.Boolean(_this.vars["delay"]) ? flash.trannumber(flash.trannumber(_this.vars["delay"])) : flash.trannumber(0);
                    _this.cachedTimeScale = flash.Boolean(_this.vars["timeScale"]) ? flash.trannumber(flash.trannumber(_this.vars["timeScale"])) : flash.trannumber(1);
                    _this.active = flash.Boolean(duration == 0 && _this._delay == 0 && _this.vars["immediateRender"] != false);
                    _this.cachedTotalTime = _this.cachedTime = 0;
                    _this.data = _this.vars["data"];
                    if (!com.greensock.core.TweenCore._classInitted) {
                        if (isNaN(com.greensock.TweenLite.rootFrame)) {
                            com.greensock.TweenLite.initClass();
                            com.greensock.core.TweenCore._classInitted = true;
                        }
                        else {
                            return _this;
                        }
                    }
                    var tl = flash.As3is(_this.vars["timeline"], com.greensock.core.SimpleTimeline) ? _this.vars["timeline"] : flash.Boolean(_this.vars["useFrames"]) ? com.greensock.TweenLite.rootFramesTimeline : com.greensock.TweenLite.rootTimeline;
                    tl.insert(_this, tl.cachedTotalTime);
                    if (_this.vars["reversed"]) {
                        _this.cachedReversed = true;
                    }
                    if (_this.vars["paused"]) {
                        _this.paused = true;
                    }
                    return _this;
                }
                TweenCore.prototype.renderTime = function (time, suppressEvents, force) {
                    if (suppressEvents === void 0) { suppressEvents = false; }
                    if (force === void 0) { force = false; }
                };
                Object.defineProperty(TweenCore.prototype, "delay", {
                    get: function () {
                        return this._delay;
                    },
                    set: function (n) {
                        this.startTime = this.startTime + (n - this._delay);
                        this._delay = n;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TweenCore.prototype, "duration", {
                    get: function () {
                        return this.cachedDuration;
                    },
                    set: function (n) {
                        var ratio = n / this.cachedDuration;
                        this.cachedDuration = this.cachedTotalDuration = n;
                        this.setDirtyCache(true);
                        if (this.active && !this.cachedPaused && n != 0) {
                            this.setTotalTime(this.cachedTotalTime * ratio, true);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TweenCore.prototype, "reversed", {
                    get: function () {
                        return this.cachedReversed;
                    },
                    set: function (b) {
                        if (b != this.cachedReversed) {
                            this.cachedReversed = b;
                            this.setTotalTime(this.cachedTotalTime, true);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TweenCore.prototype, "startTime", {
                    get: function () {
                        return this.cachedStartTime;
                    },
                    set: function (n) {
                        if (this.timeline != null && (n != this.cachedStartTime || this.gc)) {
                            this.timeline.insert(this, n - this._delay);
                        }
                        else {
                            this.cachedStartTime = n;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                TweenCore.prototype.restart = function (includeDelay, suppressEvents) {
                    if (includeDelay === void 0) { includeDelay = false; }
                    if (suppressEvents === void 0) { suppressEvents = true; }
                    this.reversed = false;
                    this.paused = false;
                    this.setTotalTime(!!includeDelay ? flash.trannumber(-this._delay) : flash.trannumber(0), suppressEvents);
                };
                TweenCore.prototype.resume = function () {
                    this.paused = false;
                };
                Object.defineProperty(TweenCore.prototype, "paused", {
                    get: function () {
                        return this.cachedPaused;
                    },
                    set: function (b) {
                        if (b != this.cachedPaused && this.timeline) {
                            if (b) {
                                this.cachedPauseTime = this.timeline.rawTime;
                            }
                            else {
                                this.cachedStartTime = this.cachedStartTime + (this.timeline.rawTime - this.cachedPauseTime);
                                this.cachedPauseTime = NaN;
                                this.setDirtyCache(false);
                            }
                            this.cachedPaused = b;
                            this.active = flash.Boolean(!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
                        }
                        if (!b && this.gc) {
                            this.setEnabled(true, false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                TweenCore.prototype.play = function () {
                    this.reversed = false;
                    this.paused = false;
                };
                TweenCore.prototype.invalidate = function () {
                };
                TweenCore.prototype.complete = function (skipRender, suppressEvents) {
                    if (skipRender === void 0) { skipRender = false; }
                    if (suppressEvents === void 0) { suppressEvents = false; }
                    if (!skipRender) {
                        this.renderTime(this.totalDuration, suppressEvents, false);
                        return;
                    }
                    if (this.timeline.autoRemoveChildren) {
                        this.setEnabled(false, false);
                    }
                    else {
                        this.active = false;
                    }
                    if (!suppressEvents) {
                        if (this.vars["onComplete"] && this.cachedTotalTime >= this.cachedTotalDuration && !this.cachedReversed) {
                            this.vars["onComplete"].apply(null, this.vars["onCompleteParams"]);
                        }
                        else if (this.cachedReversed && this.cachedTotalTime == 0 && this.vars["onReverseComplete"]) {
                            this.vars["onReverseComplete"].apply(null, this.vars["onReverseCompleteParams"]);
                        }
                    }
                };
                Object.defineProperty(TweenCore.prototype, "totalTime", {
                    get: function () {
                        return this.cachedTotalTime;
                    },
                    set: function (n) {
                        this.setTotalTime(n, false);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TweenCore.prototype, "currentTime", {
                    get: function () {
                        return this.cachedTime;
                    },
                    set: function (n) {
                        this.setTotalTime(n, false);
                    },
                    enumerable: true,
                    configurable: true
                });
                TweenCore.prototype.setDirtyCache = function (includeSelf) {
                    if (includeSelf === void 0) { includeSelf = true; }
                    var tween = !!includeSelf ? this : this.timeline;
                    while (tween) {
                        tween.cacheIsDirty = true;
                        tween = tween.timeline;
                    }
                };
                TweenCore.prototype.reverse = function (forceResume) {
                    if (forceResume === void 0) { forceResume = true; }
                    this.reversed = true;
                    if (forceResume) {
                        this.paused = false;
                    }
                    else if (this.gc) {
                        this.setEnabled(true, false);
                    }
                };
                TweenCore.prototype.kill = function () {
                    this.setEnabled(false, false);
                };
                TweenCore.prototype.setTotalTime = function (time, suppressEvents) {
                    if (suppressEvents === void 0) { suppressEvents = false; }
                    var tlTime = NaN;
                    var dur = NaN;
                    if (this.timeline) {
                        tlTime = !!this.cachedPaused ? flash.trannumber(this.cachedPauseTime) : flash.trannumber(this.timeline.cachedTotalTime);
                        if (this.cachedReversed) {
                            dur = !!this.cacheIsDirty ? flash.trannumber(this.totalDuration) : flash.trannumber(this.cachedTotalDuration);
                            this.cachedStartTime = tlTime - (dur - time) / this.cachedTimeScale;
                        }
                        else {
                            this.cachedStartTime = tlTime - time / this.cachedTimeScale;
                        }
                        if (!this.timeline.cacheIsDirty) {
                            this.setDirtyCache(false);
                        }
                        if (this.cachedTotalTime != time) {
                            this.renderTime(time, suppressEvents, false);
                        }
                    }
                };
                TweenCore.prototype.pause = function () {
                    this.paused = true;
                };
                Object.defineProperty(TweenCore.prototype, "totalDuration", {
                    get: function () {
                        return this.cachedTotalDuration;
                    },
                    set: function (n) {
                        this.duration = n;
                    },
                    enumerable: true,
                    configurable: true
                });
                TweenCore.prototype.setEnabled = function (enabled, ignoreTimeline) {
                    if (ignoreTimeline === void 0) { ignoreTimeline = false; }
                    this.gc = !enabled;
                    if (enabled) {
                        this.active = flash.Boolean(!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
                        if (!ignoreTimeline && this.cachedOrphan) {
                            this.timeline.insert(this, this.cachedStartTime - this._delay);
                        }
                    }
                    else {
                        this.active = false;
                        if (!ignoreTimeline && !this.cachedOrphan) {
                            this.timeline.remove(this, true);
                        }
                    }
                    return false;
                };
                TweenCore._classInitted = false;
                return TweenCore;
            }(egret.HashObject));
            core.TweenCore = TweenCore;
            __reflect(TweenCore.prototype, "com.greensock.core.TweenCore");
        })(core = greensock.core || (greensock.core = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.core.TweenCore.version = 1.693;
//# sourceMappingURL=TweenCore.js.map