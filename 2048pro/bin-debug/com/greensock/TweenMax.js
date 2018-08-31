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
        var TweenMax = (function (_super) {
            __extends(TweenMax, _super);
            function TweenMax(target, duration, vars) {
                var _this = _super.call(this, target, duration, vars) || this;
                _this._cyclesComplete = 0;
                _this._hasUpdateListener = false;
                _this._easeType = 0;
                _this._repeatDelay = 0;
                _this.yoyo = false;
                _this._easePower = 0;
                _this._repeat = 0;
                if (com.greensock.TweenLite.version_static_com_greensock_TweenLite < 11.2) {
                    throw new flash.Error("TweenMax error! Please update your TweenLite class or try deleting your ASO files. TweenMax requires a more recent version. Download updates at http://www.TweenMax.com.").message;
                }
                _this.yoyo = flash.Boolean(_this.vars["yoyo"]);
                _this._repeat = flash.checkInt(flash.tranint(_this.vars["repeat"]));
                _this._repeatDelay = flash.Boolean(_this.vars["repeatDelay"]) ? flash.trannumber(flash.trannumber(_this.vars["repeatDelay"])) : flash.trannumber(0);
                _this.cacheIsDirty = true;
                if (_this.vars["onCompleteListener"] || _this.vars["onInitListener"] || _this.vars["onUpdateListener"] || _this.vars["onStartListener"] || _this.vars["onRepeatListener"] || _this.vars["onReverseCompleteListener"]) {
                    _this.initDispatcher();
                    if (duration == 0 && _this._delay == 0) {
                        _this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.UPDATE));
                        _this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent));
                    }
                }
                if (_this.vars["timeScale"] && !(flash.As3is(_this.target, com.greensock.core.TweenCore))) {
                    _this.cachedTimeScale = _this.vars["timeScale"];
                }
                return _this;
            }
            Object.defineProperty(TweenMax, "globalTimeScale", {
                get: function () {
                    return com.greensock.TweenLite.rootTimeline == null ? flash.trannumber(1) : flash.trannumber(com.greensock.TweenLite.rootTimeline.cachedTimeScale);
                },
                set: function (n) {
                    if (n == 0) {
                        n = 0.0001;
                    }
                    if (com.greensock.TweenLite.rootTimeline == null) {
                        com.greensock.TweenLite.to({}, 0, {});
                    }
                    var tl = com.greensock.TweenLite.rootTimeline;
                    var curTime = egret.getTimer() * 0.001;
                    tl.cachedStartTime = curTime - (curTime - tl.cachedStartTime) * tl.cachedTimeScale / n;
                    tl = com.greensock.TweenLite.rootFramesTimeline;
                    curTime = com.greensock.TweenLite.rootFrame;
                    tl.cachedStartTime = curTime - (curTime - tl.cachedStartTime) * tl.cachedTimeScale / n;
                    com.greensock.TweenLite.rootFramesTimeline.cachedTimeScale = com.greensock.TweenLite.rootTimeline.cachedTimeScale = n;
                },
                enumerable: true,
                configurable: true
            });
            TweenMax.fromTo = function (target, duration, fromVars, toVars) {
                if (toVars["isGSVars"]) {
                    toVars = toVars["vars"];
                }
                if (fromVars["isGSVars"]) {
                    fromVars = fromVars["vars"];
                }
                toVars["startAt"] = fromVars;
                if (fromVars["immediateRender"]) {
                    toVars["immediateRender"] = true;
                }
                return new com.greensock.TweenMax(target, duration, toVars);
            };
            TweenMax.allFromTo = function (targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams) {
                if (stagger === void 0) { stagger = 0; }
                if (onCompleteAll === void 0) { onCompleteAll = null; }
                if (onCompleteAllParams === void 0) { onCompleteAllParams = null; }
                if (toVars["isGSVars"]) {
                    toVars = toVars["vars"];
                }
                if (fromVars["isGSVars"]) {
                    fromVars = fromVars["vars"];
                }
                toVars["startAt"] = fromVars;
                if (fromVars["immediateRender"]) {
                    toVars["immediateRender"] = true;
                }
                return com.greensock.TweenMax.allTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams);
            };
            TweenMax.pauseAll = function (tweens, delayedCalls) {
                if (tweens === void 0) { tweens = true; }
                if (delayedCalls === void 0) { delayedCalls = true; }
                com.greensock.TweenMax.changePause(true, tweens, delayedCalls);
            };
            TweenMax.getTweensOf = function (target) {
                var i = flash.checkInt(0);
                var cnt = flash.checkInt(0);
                var a = com.greensock.TweenLite.masterList.getItem(target);
                var toReturn = [];
                if (a) {
                    i = flash.checkInt(a.length);
                    cnt = flash.checkInt(0);
                    while (--i > -1) {
                        if (!(a[i]).gc) {
                            toReturn[cnt++] = a[i];
                        }
                    }
                }
                return toReturn;
            };
            TweenMax.killChildTweensOf = function (parent, complete) {
                if (complete === void 0) { complete = false; }
                var curTarget = null;
                var curParent = null;
                var a = com.greensock.TweenMax.getAllTweens();
                var i = flash.checkInt(a.length);
                while (--i > -1) {
                    curTarget = a[i].target;
                    if (flash.As3is(curTarget, egret.DisplayObject)) {
                        curParent = curTarget["parent"];
                        while (curParent) {
                            if (curParent == parent) {
                                if (complete) {
                                    a[i].complete(false);
                                }
                                else {
                                    a[i].setEnabled(false, false);
                                }
                            }
                            curParent = curParent.parent;
                        }
                        continue;
                    }
                }
            };
            TweenMax.delayedCall_static_com_greensock_TweenMax = function (delay, onComplete, onCompleteParams, useFrames) {
                if (onCompleteParams === void 0) { onCompleteParams = null; }
                if (useFrames === void 0) { useFrames = false; }
                return new com.greensock.TweenMax(onComplete, 0, { "delay": delay, "onComplete": onComplete, "onCompleteParams": onCompleteParams, "immediateRender": false, "useFrames": useFrames, "overwrite": 0 });
            };
            TweenMax.isTweening = function (target) {
                var tween = null;
                var a = com.greensock.TweenMax.getTweensOf(target);
                var i = flash.checkInt(a.length);
                while (--i > -1) {
                    tween = a[i];
                    if (tween.active || tween.cachedStartTime == tween.timeline.cachedTime && tween.timeline.active) {
                        return true;
                    }
                }
                return false;
            };
            TweenMax.killAll = function (complete, tweens, delayedCalls) {
                if (complete === void 0) { complete = false; }
                if (tweens === void 0) { tweens = true; }
                if (delayedCalls === void 0) { delayedCalls = true; }
                var isDC = false;
                var a = com.greensock.TweenMax.getAllTweens();
                var i = flash.checkInt(a.length);
                while (--i > -1) {
                    isDC = a[i].target == a[i].vars.onComplete;
                    if (isDC == delayedCalls || isDC != tweens) {
                        if (complete) {
                            a[i].complete(false);
                        }
                        else {
                            a[i].setEnabled(false, false);
                        }
                    }
                }
            };
            TweenMax.changePause = function (pause, tweens, delayedCalls) {
                if (tweens === void 0) { tweens = true; }
                if (delayedCalls === void 0) { delayedCalls = false; }
                var isDC = false;
                var a = com.greensock.TweenMax.getAllTweens();
                var i = flash.checkInt(a.length);
                while (--i > -1) {
                    isDC = (a[i]).target == (a[i]).vars["onComplete"];
                    if (isDC == delayedCalls || isDC != tweens) {
                        (a[i]).paused = pause;
                    }
                }
            };
            TweenMax.from_static_com_greensock_TweenMax = function (target, duration, vars) {
                if (vars["isGSVars"]) {
                    vars = vars["vars"];
                }
                vars["runBackwards"] = true;
                if (!("immediateRender" in vars)) {
                    vars["immediateRender"] = true;
                }
                return new com.greensock.TweenMax(target, duration, vars);
            };
            TweenMax.allFrom = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams) {
                if (stagger === void 0) { stagger = 0; }
                if (onCompleteAll === void 0) { onCompleteAll = null; }
                if (onCompleteAllParams === void 0) { onCompleteAllParams = null; }
                if (vars["isGSVars"]) {
                    vars = vars["vars"];
                }
                vars["runBackwards"] = true;
                if (!("immediateRender" in vars)) {
                    vars["immediateRender"] = true;
                }
                return com.greensock.TweenMax.allTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams);
            };
            TweenMax.getAllTweens = function () {
                var a = null;
                var i = flash.checkInt(0);
                var ml = com.greensock.TweenLite.masterList;
                var cnt = flash.checkInt(0);
                var toReturn = [];
                var a_key_a;
                for (a_key_a in ml.map) {
                    a = ml.map[a_key_a][1];
                    i = flash.checkInt(a.length);
                    while (--i > -1) {
                        if (!(a[i]).gc) {
                            toReturn[cnt++] = a[i];
                        }
                    }
                }
                return toReturn;
            };
            TweenMax.resumeAll = function (tweens, delayedCalls) {
                if (tweens === void 0) { tweens = true; }
                if (delayedCalls === void 0) { delayedCalls = true; }
                com.greensock.TweenMax.changePause(false, tweens, delayedCalls);
            };
            TweenMax.to_static_com_greensock_TweenMax = function (target, duration, vars) {
                return new com.greensock.TweenMax(target, duration, vars);
            };
            TweenMax.allTo = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams) {
                if (stagger === void 0) { stagger = 0; }
                if (onCompleteAll === void 0) { onCompleteAll = null; }
                if (onCompleteAllParams === void 0) { onCompleteAllParams = null; }
                var i = flash.checkInt(0);
                var varsDup = null;
                var p = null;
                var onCompleteProxy = null;
                var onCompleteParamsProxy = null;
                var l = flash.checkInt(targets.length);
                var a = [];
                if (vars["isGSVars"]) {
                    var vars = vars["vars"];
                }
                var curDelay = "delay" in vars ? flash.trannumber(flash.trannumber(vars["delay"])) : flash.trannumber(0);
                onCompleteProxy = vars["onComplete"];
                onCompleteParamsProxy = vars["onCompleteParams"];
                var lastIndex = flash.checkInt(l - 1);
                for (i = flash.checkInt(0); i < l; i = flash.checkInt(i + 1)) {
                    varsDup = {};
                    for (p in vars) {
                        varsDup[p] = vars[p];
                    }
                    varsDup["delay"] = curDelay;
                    if (i == lastIndex && onCompleteAll != null) {
                        varsDup["onComplete"] = function () {
                            if (onCompleteProxy != null) {
                                onCompleteProxy.apply(null, onCompleteParamsProxy);
                            }
                            onCompleteAll.apply(null, onCompleteAllParams);
                        };
                    }
                    a[i] = new com.greensock.TweenMax(targets[i], duration, varsDup);
                    curDelay = curDelay + stagger;
                }
                return a;
            };
            TweenMax.prototype.dispatchEvent = function (e) {
                return this._dispatcher == null ? flash.Boolean(false) : flash.Boolean(this._dispatcher.dispatchEvent(e));
            };
            Object.defineProperty(TweenMax.prototype, "timeScale", {
                get: function () {
                    return this.cachedTimeScale;
                },
                set: function (n) {
                    if (n == 0) {
                        n = 0.0001;
                    }
                    var tlTime = this.cachedPauseTime || this.cachedPauseTime == 0 ? flash.trannumber(this.cachedPauseTime) : flash.trannumber(this.timeline.cachedTotalTime);
                    this.cachedStartTime = tlTime - (tlTime - this.cachedStartTime) * this.cachedTimeScale / n;
                    this.cachedTimeScale = n;
                    this.setDirtyCache(false);
                },
                enumerable: true,
                configurable: true
            });
            TweenMax.prototype.renderTime = function (time, suppressEvents, force) {
                if (suppressEvents === void 0) { suppressEvents = false; }
                if (force === void 0) { force = false; }
                var isComplete = false;
                var repeated = false;
                var setRatio = false;
                var cycleDuration = NaN;
                var prevCycles = flash.checkInt(0);
                var power = flash.checkInt(0);
                var val = NaN;
                var totalDur = !!this.cacheIsDirty ? flash.trannumber(this.totalDuration) : flash.trannumber(this.cachedTotalDuration);
                var prevTime = this.cachedTime;
                var prevTotalTime = this.cachedTotalTime;
                if (time >= totalDur) {
                    this.cachedTotalTime = totalDur;
                    this.cachedTime = this.cachedDuration;
                    this.ratio = 1;
                    isComplete = !this.cachedReversed;
                    if (this.cachedDuration == 0) {
                        if ((time == 0 || this._rawPrevTime < 0) && this._rawPrevTime != time) {
                            force = true;
                        }
                        this._rawPrevTime = time;
                    }
                }
                else if (time <= 0) {
                    if (time < 0) {
                        this.active = false;
                        if (this.cachedDuration == 0) {
                            if (this._rawPrevTime > 0) {
                                force = true;
                                isComplete = true;
                            }
                            this._rawPrevTime = time;
                        }
                    }
                    else if (time == 0 && !this.initted) {
                        force = true;
                    }
                    this.cachedTotalTime = this.cachedTime = this.ratio = 0;
                    if (this.cachedReversed && prevTotalTime != 0) {
                        isComplete = true;
                    }
                }
                else {
                    this.cachedTotalTime = this.cachedTime = time;
                    setRatio = true;
                }
                if (this._repeat != 0) {
                    cycleDuration = this.cachedDuration + this._repeatDelay;
                    prevCycles = flash.checkInt(this._cyclesComplete);
                    if ((this._cyclesComplete = flash.checkInt(this.cachedTotalTime / cycleDuration >> 0)) == this.cachedTotalTime / cycleDuration && this._cyclesComplete != 0) {
                        this._cyclesComplete--;
                    }
                    repeated = flash.Boolean(prevCycles != this._cyclesComplete);
                    if (isComplete) {
                        if (this.yoyo && this._repeat % 2) {
                            this.cachedTime = this.ratio = 0;
                        }
                    }
                    else if (time > 0) {
                        this.cachedTime = this.cachedTotalTime - this._cyclesComplete * cycleDuration;
                        if (this.yoyo && this._cyclesComplete % 2) {
                            this.cachedTime = this.cachedDuration - this.cachedTime;
                        }
                        else if (this.cachedTime >= this.cachedDuration) {
                            this.cachedTime = this.cachedDuration;
                            this.ratio = 1;
                            setRatio = false;
                        }
                        if (this.cachedTime <= 0) {
                            this.cachedTime = this.ratio = 0;
                            setRatio = false;
                        }
                    }
                    else {
                        this._cyclesComplete = flash.checkInt(0);
                    }
                }
                if (prevTime == this.cachedTime && !force) {
                    return;
                }
                if (!this.initted) {
                    this.init();
                }
                if (!this.active && !this.cachedPaused) {
                    this.active = true;
                }
                if (setRatio) {
                    if (this._easeType) {
                        power = flash.checkInt(this._easePower);
                        val = this.cachedTime / this.cachedDuration;
                        if (this._easeType == 2) {
                            this.ratio = val = 1 - val;
                            while (--power > -1) {
                                this.ratio = val * this.ratio;
                            }
                            this.ratio = 1 - this.ratio;
                        }
                        else if (this._easeType == 1) {
                            this.ratio = val;
                            while (--power > -1) {
                                this.ratio = val * this.ratio;
                            }
                        }
                        else if (val < 0.5) {
                            this.ratio = val = val * 2;
                            while (--power > -1) {
                                this.ratio = val * this.ratio;
                            }
                            this.ratio = this.ratio * 0.5;
                        }
                        else {
                            this.ratio = val = (1 - val) * 2;
                            while (--power > -1) {
                                this.ratio = val * this.ratio;
                            }
                            this.ratio = 1 - 0.5 * this.ratio;
                        }
                    }
                    else {
                        this.ratio = this._ease(this.cachedTime, 0, 1, this.cachedDuration);
                    }
                }
                if (prevTotalTime == 0 && (this.cachedTotalTime != 0 || this.cachedDuration == 0) && !suppressEvents) {
                    if (this.vars["onStart"]) {
                        this.vars["onStart"].apply(null, this.vars["onStartParams"]);
                    }
                    if (this._dispatcher) {
                        this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.START));
                    }
                }
                var pt = this.cachedPT1;
                while (pt) {
                    pt.target[pt.property] = pt.start + this.ratio * pt.change;
                    pt = pt.nextNode;
                }
                if (this._hasUpdate && !suppressEvents) {
                    this.vars["onUpdate"].apply(null, this.vars["onUpdateParams"]);
                }
                if (this._hasUpdateListener && !suppressEvents) {
                    this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.UPDATE));
                }
                if (repeated && !suppressEvents && !this.gc) {
                    if (this.vars["onRepeat"]) {
                        this.vars["onRepeat"].apply(null, this.vars["onRepeatParams"]);
                    }
                    if (this._dispatcher) {
                        this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.REPEAT));
                    }
                }
                if (isComplete && !this.gc) {
                    if (this._hasPlugins && this.cachedPT1) {
                        com.greensock.TweenLite.onPluginEvent("onComplete", this);
                    }
                    this.complete(true, suppressEvents);
                }
            };
            Object.defineProperty(TweenMax.prototype, "totalDuration", {
                get: function () {
                    if (this.cacheIsDirty) {
                        this.cachedTotalDuration = this._repeat == -1 ? flash.trannumber(999999999999) : flash.trannumber(this.cachedDuration * (this._repeat + 1) + this._repeatDelay * this._repeat);
                        this.cacheIsDirty = false;
                    }
                    return this.cachedTotalDuration;
                },
                set: function (n) {
                    if (this._repeat == -1) {
                        return;
                    }
                    this.duration = (n - this._repeat * this._repeatDelay) / (this._repeat + 1);
                },
                enumerable: true,
                configurable: true
            });
            TweenMax.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority, useWeakReference) {
                if (useCapture === void 0) { useCapture = false; }
                if (priority === void 0) { priority = 0; }
                if (useWeakReference === void 0) { useWeakReference = false; }
                if (this._dispatcher == null) {
                    this.initDispatcher();
                }
                if (type == com.greensock.events.TweenEvent.UPDATE) {
                    this._hasUpdateListener = true;
                }
                this._dispatcher.addEventListener(type, listener, null, useCapture, priority);
            };
            TweenMax.prototype.init = function () {
                var startTween = null;
                if (this.vars["startAt"]) {
                    this.vars["startAt"].overwrite = 0;
                    this.vars["startAt"].immediateRender = true;
                    startTween = new com.greensock.TweenMax(this.target, 0, this.vars["startAt"]);
                }
                if (this._dispatcher) {
                    this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent));
                }
                _super.prototype.init.call(this);
                if (this._ease in com.greensock.TweenLite.fastEaseLookup) {
                    this._easeType = flash.checkInt(com.greensock.TweenLite.fastEaseLookup.getItem(this._ease)[0]);
                    this._easePower = flash.checkInt(com.greensock.TweenLite.fastEaseLookup.getItem(this._ease)[1]);
                }
            };
            TweenMax.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
                if (useCapture === void 0) { useCapture = false; }
                if (this._dispatcher) {
                    this._dispatcher.removeEventListener(type, listener, null, useCapture);
                }
            };
            TweenMax.prototype.setDestination = function (property, value, adjustStartValues) {
                if (adjustStartValues === void 0) { adjustStartValues = true; }
                var vars = {};
                vars[property] = value;
                this.updateTo(vars, !adjustStartValues);
            };
            TweenMax.prototype.willTrigger = function (type) {
                return this._dispatcher == null ? flash.Boolean(false) : flash.Boolean(this._dispatcher.willTrigger(type));
            };
            TweenMax.prototype.hasEventListener = function (type) {
                return this._dispatcher == null ? flash.Boolean(false) : flash.Boolean(this._dispatcher.hasEventListener(type));
            };
            TweenMax.prototype.initDispatcher = function () {
                if (this._dispatcher == null) {
                    this._dispatcher = new egret.EventDispatcher(this);
                }
                if (flash.As3is(this.vars["onInitListener"], Function)) {
                    this._dispatcher.addEventListener(com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent, this.vars["onInitListener"], null, false, 0);
                }
                if (flash.As3is(this.vars["onStartListener"], Function)) {
                    this._dispatcher.addEventListener(com.greensock.events.TweenEvent.START, this.vars["onStartListener"], null, false, 0);
                }
                if (flash.As3is(this.vars["onUpdateListener"], Function)) {
                    this._dispatcher.addEventListener(com.greensock.events.TweenEvent.UPDATE, this.vars["onUpdateListener"], null, false, 0);
                    this._hasUpdateListener = true;
                }
                if (flash.As3is(this.vars["onCompleteListener"], Function)) {
                    this._dispatcher.addEventListener(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent, this.vars["onCompleteListener"], null, false, 0);
                }
                if (flash.As3is(this.vars["onRepeatListener"], Function)) {
                    this._dispatcher.addEventListener(com.greensock.events.TweenEvent.REPEAT, this.vars["onRepeatListener"], null, false, 0);
                }
                if (flash.As3is(this.vars["onReverseCompleteListener"], Function)) {
                    this._dispatcher.addEventListener(com.greensock.events.TweenEvent.REVERSE_COMPLETE, this.vars["onReverseCompleteListener"], null, false, 0);
                }
            };
            Object.defineProperty(TweenMax.prototype, "currentProgress", {
                get: function () {
                    return this.cachedTime / this.duration;
                },
                set: function (n) {
                    if (this._cyclesComplete == 0) {
                        this.setTotalTime(this.duration * n, false);
                    }
                    else {
                        this.setTotalTime(this.duration * n + this._cyclesComplete * this.cachedDuration, false);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TweenMax.prototype, "totalProgress", {
                get: function () {
                    return this.cachedTotalTime / this.totalDuration;
                },
                set: function (n) {
                    this.setTotalTime(this.totalDuration * n, false);
                },
                enumerable: true,
                configurable: true
            });
            TweenMax.prototype.updateTo = function (vars, resetDuration) {
                if (resetDuration === void 0) { resetDuration = false; }
                var p = null;
                var prevTime = NaN;
                var inv = NaN;
                var pt = null;
                var endValue = NaN;
                var curRatio = this.ratio;
                if (resetDuration && this.timeline != null && this.cachedStartTime < this.timeline.cachedTime) {
                    this.cachedStartTime = this.timeline.cachedTime;
                    this.setDirtyCache(false);
                    if (this.gc) {
                        this.setEnabled(true, false);
                    }
                    else {
                        this.timeline.insert(this, this.cachedStartTime - this._delay);
                    }
                }
                for (p in vars) {
                    this.vars[p] = vars[p];
                }
                if (this.initted) {
                    if (resetDuration) {
                        this.initted = false;
                    }
                    else {
                        if (this._notifyPluginsOfEnabled && this.cachedPT1) {
                            com.greensock.TweenLite.onPluginEvent("onDisable", this);
                        }
                        if (this.cachedTime / this.cachedDuration > 0.998) {
                            prevTime = this.cachedTime;
                            this.renderTime(0, true, false);
                            this.initted = false;
                            this.renderTime(prevTime, true, false);
                        }
                        else if (this.cachedTime > 0) {
                            this.initted = false;
                            this.init();
                            inv = 1 / (1 - curRatio);
                            pt = this.cachedPT1;
                            while (pt) {
                                endValue = pt.start + pt.change;
                                pt.change = pt.change * inv;
                                pt.start = endValue - pt.change;
                                pt = pt.nextNode;
                            }
                        }
                    }
                }
            };
            Object.defineProperty(TweenMax.prototype, "repeat", {
                get: function () {
                    return this._repeat;
                },
                set: function (n) {
                    n = flash.checkInt(n);
                    this._repeat = flash.checkInt(n);
                    this.setDirtyCache(true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TweenMax.prototype, "currentTime", {
                set: function (n) {
                    if (this._cyclesComplete != 0) {
                        if (this.yoyo && this._cyclesComplete % 2 == 1) {
                            n = this.duration - n + this._cyclesComplete * (this.cachedDuration + this._repeatDelay);
                        }
                        else {
                            n = n + this._cyclesComplete * (this.duration + this._repeatDelay);
                        }
                    }
                    this.setTotalTime(n, false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TweenMax.prototype, "repeatDelay", {
                get: function () {
                    return this._repeatDelay;
                },
                set: function (n) {
                    this._repeatDelay = n;
                    this.setDirtyCache(true);
                },
                enumerable: true,
                configurable: true
            });
            TweenMax.prototype.killProperties = function (names) {
                var v = {};
                var i = flash.checkInt(names.length);
                while (--i > -1) {
                    v[names[i]] = true;
                }
                this.killVars(v);
            };
            TweenMax.prototype.complete = function (skipRender, suppressEvents) {
                if (skipRender === void 0) { skipRender = false; }
                if (suppressEvents === void 0) { suppressEvents = false; }
                _super.prototype.complete.call(this, skipRender, suppressEvents);
                if (!suppressEvents && this._dispatcher) {
                    if (this.cachedTotalTime == this.cachedTotalDuration && !this.cachedReversed) {
                        this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent));
                    }
                    else if (this.cachedReversed && this.cachedTotalTime == 0) {
                        this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.REVERSE_COMPLETE));
                    }
                }
            };
            TweenMax.prototype.invalidate = function () {
                this.yoyo = flash.Boolean(this.vars["yoyo"] == true);
                this._repeat = flash.checkInt(flash.Boolean(this.vars["repeat"]) ? flash.tranint(flash.trannumber(this.vars["repeat"])) : flash.tranint(0));
                this._repeatDelay = flash.Boolean(this.vars["repeatDelay"]) ? flash.trannumber(flash.trannumber(this.vars["repeatDelay"])) : flash.trannumber(0);
                this._hasUpdateListener = false;
                if (this.vars["onCompleteListener"] != null || this.vars["onUpdateListener"] != null || this.vars["onStartListener"] != null) {
                    this.initDispatcher();
                }
                this.setDirtyCache(true);
                _super.prototype.invalidate.call(this);
            };
            TweenMax.prototype.once = function (type, listener, thisObject, useCapture, priority) {
            };
            return TweenMax;
        }(com.greensock.TweenLite));
        greensock.TweenMax = TweenMax;
        __reflect(TweenMax.prototype, "com.greensock.TweenMax", ["egret.IEventDispatcher"]);
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.TweenMax._overwriteMode = !!OverwriteManager.enabled ? flash.tranint(OverwriteManager.mode) : flash.tranint(OverwriteManager.init(2));
com.greensock.TweenMax.version_static_com_greensock_TweenMax = 11.697;
com.greensock.TweenMax.killTweensOf_static_com_greensock_TweenMax = com.greensock.TweenLite.killTweensOf;
com.greensock.TweenMax.killDelayedCallsTo_static_com_greensock_TweenMax = com.greensock.TweenLite.killTweensOf;
flash.extendsClass("com.greensock.TweenMax", "com.greensock.TweenLite");
flash.implementsClass("com.greensock.TweenMax", ["egret.IEventDispatcher"]);
//# sourceMappingURL=TweenMax.js.map