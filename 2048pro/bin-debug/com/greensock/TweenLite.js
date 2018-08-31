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
        var TweenLite = (function (_super) {
            __extends(TweenLite, _super);
            function TweenLite(target, duration, vars) {
                var _this = _super.call(this, duration, vars) || this;
                _this._hasPlugins = false;
                _this._overwrite = 0;
                _this.ratio = 0;
                _this._notifyPluginsOfEnabled = false;
                var sibling = null;
                if (target == null) {
                    throw new flash.Error("Cannot tween a null object.").message;
                }
                _this.target = target;
                if (flash.As3is(_this.target, com.greensock.core.TweenCore) && _this.vars["timeScale"]) {
                    _this.cachedTimeScale = 1;
                }
                _this.propTweenLookup = {};
                _this._ease = com.greensock.TweenLite.defaultEase;
                _this._overwrite = flash.checkInt(flash.trannumber(vars["overwrite"]) <= -1 || !com.greensock.TweenLite.overwriteManager["enabled"] && vars["overwrite"] > 1 ? flash.tranint(com.greensock.TweenLite.overwriteManager["mode"]) : flash.tranint(flash.tranint(vars["overwrite"])));
                var a = com.greensock.TweenLite.masterList.getItem(target);
                if (!a) {
                    com.greensock.TweenLite.masterList.setItem(target, [_this]);
                }
                else if (_this._overwrite == 1) {
                    var sibling_key_a;
                    for (sibling_key_a in a) {
                        sibling = a[sibling_key_a];
                        if (!sibling.gc) {
                            sibling.setEnabled(false, false);
                        }
                    }
                    com.greensock.TweenLite.masterList.setItem(target, [_this]);
                }
                else {
                    a[a.length] = _this;
                }
                if (_this.active || _this.vars["immediateRender"]) {
                    _this.renderTime(0, false, true);
                }
                return _this;
            }
            TweenLite.initClass = function () {
                com.greensock.TweenLite.rootFrame = 0;
                com.greensock.TweenLite.rootTimeline = new com.greensock.core.SimpleTimeline(null);
                com.greensock.TweenLite.rootFramesTimeline = new com.greensock.core.SimpleTimeline(null);
                com.greensock.TweenLite.rootTimeline.cachedStartTime = egret.getTimer() * 0.001;
                com.greensock.TweenLite.rootFramesTimeline.cachedStartTime = com.greensock.TweenLite.rootFrame;
                com.greensock.TweenLite.rootTimeline.autoRemoveChildren = true;
                com.greensock.TweenLite.rootFramesTimeline.autoRemoveChildren = true;
                com.greensock.TweenLite._shape.addEventListener(egret.Event.ENTER_FRAME, com.greensock.TweenLite.updateAll, null, false, 0);
                if (com.greensock.TweenLite.overwriteManager == null) {
                    com.greensock.TweenLite.overwriteManager = { "mode": 1, "enabled": false };
                }
            };
            TweenLite.killTweensOf = function (target, complete, vars) {
                if (complete === void 0) { complete = false; }
                if (vars === void 0) { vars = null; }
                var a = null;
                var i = flash.checkInt(0);
                var tween = null;
                if (target in com.greensock.TweenLite.masterList) {
                    a = com.greensock.TweenLite.masterList.getItem(target);
                    i = flash.checkInt(a.length);
                    while (--i > -1) {
                        tween = a[i];
                        if (!tween.gc) {
                            if (complete) {
                                tween.complete(false, false);
                            }
                            if (vars != null) {
                                tween.killVars(vars);
                            }
                            if (vars == null || tween.cachedPT1 == null && tween.initted) {
                                tween.setEnabled(false, false);
                            }
                        }
                    }
                    if (vars == null) {
                        com.greensock.TweenLite.masterList.delItem(target);
                    }
                }
            };
            TweenLite.from = function (target, duration, vars) {
                if (vars["isGSVars"]) {
                    vars = vars["vars"];
                }
                vars["runBackwards"] = true;
                if (!("immediateRender" in vars)) {
                    vars["immediateRender"] = true;
                }
                return new com.greensock.TweenLite(target, duration, vars);
            };
            TweenLite.easeOut = function (t, b, c, d) {
                return 1 - (t = 1 - t / d) * t;
            };
            TweenLite.delayedCall = function (delay, onComplete, onCompleteParams, useFrames) {
                if (onCompleteParams === void 0) { onCompleteParams = null; }
                if (useFrames === void 0) { useFrames = false; }
                return new com.greensock.TweenLite(onComplete, 0, { "delay": delay, "onComplete": onComplete, "onCompleteParams": onCompleteParams, "immediateRender": false, "useFrames": useFrames, "overwrite": 0 });
            };
            TweenLite.updateAll = function (e) {
                if (e === void 0) { e = null; }
                var ml = null;
                var tgt = null;
                var a = null;
                var i = flash.checkInt(0);
                com.greensock.TweenLite.rootTimeline.renderTime((egret.getTimer() * 0.001 - com.greensock.TweenLite.rootTimeline.cachedStartTime) * com.greensock.TweenLite.rootTimeline.cachedTimeScale, false, false);
                com.greensock.TweenLite.rootFrame = com.greensock.TweenLite.rootFrame + 1;
                com.greensock.TweenLite.rootFramesTimeline.renderTime((com.greensock.TweenLite.rootFrame - com.greensock.TweenLite.rootFramesTimeline.cachedStartTime) * com.greensock.TweenLite.rootFramesTimeline.cachedTimeScale, false, false);
                if (!(com.greensock.TweenLite.rootFrame % 60)) {
                    ml = com.greensock.TweenLite.masterList;
                    for (var forinvar__ in ml.map) {
                        tgt = ml.map[forinvar__][0];
                        a = ml.getItem(tgt);
                        i = flash.checkInt(a.length);
                        while (--i > -1) {
                            if ((a[i]).gc) {
                                a.splice(i, 1);
                            }
                        }
                        if (a.length == 0) {
                            ml.delItem(tgt);
                        }
                    }
                }
            };
            TweenLite.to = function (target, duration, vars) {
                return new com.greensock.TweenLite(target, duration, vars);
            };
            TweenLite.prototype.easeProxy = function (t, b, c, d) {
                var _arguments__ = [];
                for (var _arguments__key in arguments) {
                    _arguments__ = arguments[_arguments__key];
                }
                return this.vars["proxiedEase"].apply(null, _arguments__.concat(this.vars["easeParams"]));
            };
            TweenLite.prototype.renderTime = function (time, suppressEvents, force) {
                if (suppressEvents === void 0) { suppressEvents = false; }
                if (force === void 0) { force = false; }
                var isComplete = false;
                var prevTime = this.cachedTime;
                if (time >= this.cachedDuration) {
                    this.cachedTotalTime = this.cachedTime = this.cachedDuration;
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
                    this.cachedTotalTime = this.cachedTime = this.ratio = 0;
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
                    if (this.cachedReversed && prevTime != 0) {
                        isComplete = true;
                    }
                }
                else {
                    this.cachedTotalTime = this.cachedTime = time;
                    this.ratio = this._ease(time, 0, 1, this.cachedDuration);
                }
                if (this.cachedTime == prevTime && !force) {
                    return;
                }
                if (!this.initted) {
                    this.init();
                    if (!isComplete && this.cachedTime) {
                        this.ratio = this._ease(this.cachedTime, 0, 1, this.cachedDuration);
                    }
                }
                if (!this.active && !this.cachedPaused) {
                    this.active = true;
                }
                if (prevTime == 0 && this.vars["onStart"] && (this.cachedTime != 0 || this.cachedDuration == 0) && !suppressEvents) {
                    this.vars["onStart"].apply(null, this.vars["onStartParams"]);
                }
                var pt = this.cachedPT1;
                while (pt) {
                    pt.target[pt.property] = pt.start + this.ratio * pt.change;
                    pt = pt.nextNode;
                }
                if (this._hasUpdate && !suppressEvents) {
                    this.vars["onUpdate"].apply(null, this.vars["onUpdateParams"]);
                }
                if (isComplete && !this.gc) {
                    if (this._hasPlugins && this.cachedPT1) {
                        com.greensock.TweenLite.onPluginEvent("onComplete", this);
                    }
                    this.complete(true, suppressEvents);
                }
            };
            TweenLite.prototype.setEnabled = function (enabled, ignoreTimeline) {
                if (ignoreTimeline === void 0) { ignoreTimeline = false; }
                var a = null;
                if (enabled) {
                    a = com.greensock.TweenLite.masterList.getItem(this.target);
                    if (!a) {
                        com.greensock.TweenLite.masterList.setItem(this.target, [this]);
                    }
                    else if (a.indexOf(this) == -1) {
                        a[a.length] = this;
                    }
                }
                _super.prototype.setEnabled.call(this, enabled, ignoreTimeline);
                if (this._notifyPluginsOfEnabled && this.cachedPT1) {
                    return com.greensock.TweenLite.onPluginEvent(!!enabled ? "onEnable" : "onDisable", this);
                }
                return false;
            };
            TweenLite.prototype.init = function () {
                var p = null;
                var i = flash.checkInt(0);
                var plugin = undefined;
                var prioritize = false;
                var siblings = null;
                var pt = null;
                if (this.vars["onInit"]) {
                    this.vars["onInit"].apply(null, this.vars["onInitParams"]);
                }
                if (typeof this.vars["ease"] == "function") {
                    this._ease = this.vars["ease"];
                }
                if (this.vars["easeParams"]) {
                    this.vars["proxiedEase"] = this._ease;
                    this._ease = flash.bind(this.easeProxy, this);
                }
                this.cachedPT1 = null;
                this.propTweenLookup = {};
                for (p in this.vars) {
                    if (!(p in com.greensock.TweenLite._reservedProps && !(p == "timeScale" && flash.As3is(this.target, com.greensock.core.TweenCore)))) {
                        if (p in com.greensock.TweenLite.plugins && (plugin = new com.greensock.TweenLite.plugins[p]()).onInitTween(this.target, this.vars[p], this)) {
                            this.cachedPT1 = new com.greensock.core.PropTween(plugin, "changeFactor", 0, 1, plugin.overwriteProps.length == 1 ? plugin.overwriteProps[0] : "_MULTIPLE_", true, this.cachedPT1);
                            if (this.cachedPT1.name == "_MULTIPLE_") {
                                i = flash.checkInt(plugin.overwriteProps.length);
                                while (--i > -1) {
                                    this.propTweenLookup[plugin.overwriteProps[i]] = this.cachedPT1;
                                }
                            }
                            else {
                                this.propTweenLookup[this.cachedPT1.name] = this.cachedPT1;
                            }
                            if (plugin.priority) {
                                this.cachedPT1.priority = flash.checkInt(plugin.priority);
                                prioritize = true;
                            }
                            if (plugin.onDisable || plugin.onEnable) {
                                this._notifyPluginsOfEnabled = true;
                            }
                            this._hasPlugins = true;
                        }
                        else {
                            this.cachedPT1 = new com.greensock.core.PropTween(this.target, p, flash.trannumber(this.target[p]), typeof this.vars[p] == "number" ? flash.trannumber(flash.trannumber(this.vars[p]) - this.target[p]) : flash.trannumber(flash.trannumber(this.vars[p])), p, false, this.cachedPT1);
                            this.propTweenLookup[p] = this.cachedPT1;
                        }
                    }
                }
                if (prioritize) {
                    com.greensock.TweenLite.onPluginEvent("onInitAllProps", this);
                }
                if (this.vars["runBackwards"]) {
                    pt = this.cachedPT1;
                    while (pt) {
                        pt.start = pt.start + pt.change;
                        pt.change = -pt.change;
                        pt = pt.nextNode;
                    }
                }
                this._hasUpdate = flash.Boolean(this.vars["onUpdate"] != null);
                if (this._overwrittenProps) {
                    this.killVars(this._overwrittenProps);
                    if (this.cachedPT1 == null) {
                        this.setEnabled(false, false);
                    }
                }
                if (this._overwrite > 1 && this.cachedPT1 && (siblings = com.greensock.TweenLite.masterList.getItem(this.target)) && siblings.length > 1) {
                    if (com.greensock.TweenLite.overwriteManager["manageOverwrites"](this, this.propTweenLookup, siblings, this._overwrite)) {
                        this.init();
                    }
                }
                this.initted = true;
            };
            TweenLite.prototype.killVars = function (vars, permanent) {
                if (permanent === void 0) { permanent = true; }
                var p = null;
                var pt = null;
                var changed = false;
                if (this._overwrittenProps == null) {
                    this._overwrittenProps = {};
                }
                for (p in vars) {
                    if (p in this.propTweenLookup) {
                        pt = this.propTweenLookup[p];
                        if (pt.isPlugin && pt.name == "_MULTIPLE_") {
                            pt.target["killProps"](vars);
                            if (pt.target["overwriteProps"].length == 0) {
                                pt.name = "";
                            }
                            if (p != pt.target["propName"] || pt.name == "") {
                                delete this.propTweenLookup[p];
                            }
                        }
                        if (pt.name != "_MULTIPLE_") {
                            if (pt.nextNode) {
                                pt.nextNode.prevNode = pt.prevNode;
                            }
                            if (pt.prevNode) {
                                pt.prevNode.nextNode = pt.nextNode;
                            }
                            else if (this.cachedPT1 == pt) {
                                this.cachedPT1 = pt.nextNode;
                            }
                            if (pt.isPlugin && pt.target["onDisable"]) {
                                pt.target["onDisable"]();
                                if (pt.target["activeDisable"]) {
                                    changed = true;
                                }
                            }
                            delete this.propTweenLookup[p];
                        }
                    }
                    if (permanent && vars != this._overwrittenProps) {
                        this._overwrittenProps[p] = 1;
                    }
                }
                return changed;
            };
            TweenLite.prototype.invalidate = function () {
                if (this._notifyPluginsOfEnabled && this.cachedPT1) {
                    com.greensock.TweenLite.onPluginEvent("onDisable", this);
                }
                this.cachedPT1 = null;
                this._overwrittenProps = null;
                this._hasUpdate = this.initted = this.active = this._notifyPluginsOfEnabled = false;
                this.propTweenLookup = {};
            };
            TweenLite.rootFrame = NaN;
            return TweenLite;
        }(com.greensock.core.TweenCore));
        greensock.TweenLite = TweenLite;
        __reflect(TweenLite.prototype, "com.greensock.TweenLite");
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.TweenLite.fastEaseLookup = new flash.Dictionary(false);
com.greensock.TweenLite.defaultEase = com.greensock.TweenLite.easeOut;
com.greensock.TweenLite.version_static_com_greensock_TweenLite = 11.696;
com.greensock.TweenLite.plugins = {};
com.greensock.TweenLite.masterList = new flash.Dictionary(false);
com.greensock.TweenLite.killDelayedCallsTo = com.greensock.TweenLite.killTweensOf;
com.greensock.TweenLite._shape = new egret.Shape();
com.greensock.TweenLite._reservedProps = { "ease": 1, "delay": 1, "overwrite": 1, "onComplete": 1, "onCompleteParams": 1, "useFrames": 1, "runBackwards": 1, "startAt": 1, "onUpdate": 1, "onUpdateParams": 1, "onStart": 1, "onStartParams": 1, "onInit": 1, "onInitParams": 1, "onReverseComplete": 1, "onReverseCompleteParams": 1, "onRepeat": 1, "onRepeatParams": 1, "proxiedEase": 1, "easeParams": 1, "yoyo": 1, "onCompleteListener": 1, "onUpdateListener": 1, "onStartListener": 1, "onReverseCompleteListener": 1, "onRepeatListener": 1, "orientToBezier": 1, "timeScale": 1, "immediateRender": 1, "repeat": 1, "repeatDelay": 1, "timeline": 1, "data": 1, "paused": 1, "reversed": 1 };
flash.extendsClass("com.greensock.TweenLite", "com.greensock.core.TweenCore");
//# sourceMappingURL=TweenLite.js.map