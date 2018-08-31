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
        (function (plugins_1) {
            var TweenPlugin = (function (_super) {
                __extends(TweenPlugin, _super);
                function TweenPlugin() {
                    var _this = _super.call(this) || this;
                    _this.activeDisable = false;
                    _this.round = false;
                    _this.priority = 0;
                    _this._changeFactor = 0;
                    _this = _super.call(this) || this;
                    _this._tweens = [];
                    return _this;
                }
                TweenPlugin.activate = function (plugins) {
                    var instance = null;
                    com.greensock.TweenLite.onPluginEvent = com.greensock.plugins.TweenPlugin.onTweenEvent;
                    var i = flash.checkInt(plugins.length);
                    while (i--) {
                        if (plugins[i].hasOwnProperty("API")) {
                            instance = new plugins[i]();
                            com.greensock.TweenLite.plugins[instance["propName"]] = plugins[i];
                        }
                    }
                    return true;
                };
                TweenPlugin.onTweenEvent = function (type, tween) {
                    var changed = false;
                    var tweens = null;
                    var i = flash.checkInt(0);
                    var pt = tween.cachedPT1;
                    if (type == "onInitAllProps") {
                        tweens = [];
                        i = flash.checkInt(0);
                        while (pt) {
                            tweens[i++] = pt;
                            pt = pt.nextNode;
                        }
                        flash.sortOn(tweens, "priority", flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
                        while (--i > -1) {
                            (tweens[i]).nextNode = tweens[i + 1];
                            (tweens[i]).prevNode = tweens[i - 1];
                        }
                        pt = tween.cachedPT1 = tweens[0];
                    }
                    while (pt) {
                        if (pt.isPlugin && pt.target[type]) {
                            if (pt.target["activeDisable"]) {
                                changed = true;
                            }
                            pt.target[type]();
                        }
                        pt = pt.nextNode;
                    }
                    return changed;
                };
                Object.defineProperty(TweenPlugin.prototype, "changeFactor", {
                    get: function () {
                        return this._changeFactor;
                    },
                    set: function (n) {
                        this.updateTweens(n);
                        this._changeFactor = n;
                    },
                    enumerable: true,
                    configurable: true
                });
                TweenPlugin.prototype.updateTweens = function (changeFactor) {
                    var pt = null;
                    var val = NaN;
                    var i = flash.checkInt(this._tweens.length);
                    if (this.round) {
                        while (--i > -1) {
                            pt = this._tweens[i];
                            val = pt.start + pt.change * changeFactor;
                            if (val > 0) {
                                pt.target[pt.property] = val + 0.5 >> 0;
                            }
                            else {
                                pt.target[pt.property] = val - 0.5 >> 0;
                            }
                        }
                    }
                    else {
                        while (--i > -1) {
                            pt = this._tweens[i];
                            pt.target[pt.property] = pt.start + pt.change * changeFactor;
                        }
                    }
                };
                TweenPlugin.prototype.addTween = function (object, propName, start, end, overwriteProp) {
                    if (overwriteProp === void 0) { overwriteProp = null; }
                    var change = NaN;
                    if (end != null) {
                        change = typeof end == "number" ? flash.trannumber(flash.trannumber(end) - start) : flash.trannumber(flash.trannumber(end));
                        if (change != 0) {
                            this._tweens[this._tweens.length] = new com.greensock.core.PropTween(object, propName, start, change, overwriteProp || propName, false);
                        }
                    }
                };
                TweenPlugin.prototype.onInitTween = function (target, value, tween) {
                    this.addTween(target, this.propName, target[this.propName], value, this.propName);
                    return true;
                };
                TweenPlugin.prototype.killProps = function (lookup) {
                    var i = flash.checkInt(this.overwriteProps.length);
                    while (--i > -1) {
                        if (this.overwriteProps[i] in lookup) {
                            this.overwriteProps.splice(i, 1);
                        }
                    }
                    i = flash.checkInt(this._tweens.length);
                    while (--i > -1) {
                        if ((this._tweens[i]).name in lookup) {
                            this._tweens.splice(i, 1);
                        }
                    }
                };
                return TweenPlugin;
            }(egret.HashObject));
            plugins_1.TweenPlugin = TweenPlugin;
            __reflect(TweenPlugin.prototype, "com.greensock.plugins.TweenPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.TweenPlugin.VERSION = 1.4;
com.greensock.plugins.TweenPlugin.API = 1;
//# sourceMappingURL=TweenPlugin.js.map