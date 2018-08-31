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
            var FilterPlugin = (function (_super) {
                __extends(FilterPlugin, _super);
                function FilterPlugin() {
                    var _this = _super.call(this) || this;
                    _this._remove = false;
                    _this._index = 0;
                    return _this;
                }
                FilterPlugin.prototype.onCompleteTween = function () {
                    var filters = null;
                    var i = flash.checkInt(0);
                    if (this._remove) {
                        filters = this._target["filters"];
                        if (!(flash.As3is(filters[this._index], null, "this._type"))) {
                            i = flash.checkInt(filters.length);
                            while (i--) {
                                if (flash.As3is(filters[i], null, "this._type")) {
                                    filters.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else {
                            filters.splice(this._index, 1);
                        }
                        this._target["filters"] = filters;
                    }
                };
                FilterPlugin.prototype.initFilter = function (props, defaultFilter, propNames) {
                    var p = null;
                    var i = flash.checkInt(0);
                    var colorTween = null;
                    var filters = this._target["filters"];
                    var extras = flash.As3is(props, flash.BitmapFilter) ? {} : props;
                    this._index = flash.checkInt(-1);
                    if (extras["index"] != null) {
                        this._index = flash.checkInt(extras["index"]);
                    }
                    else {
                        i = flash.checkInt(filters.length);
                        while (i--) {
                            if (flash.As3is(filters[i], null, "this._type")) {
                                this._index = flash.checkInt(i);
                                break;
                            }
                        }
                    }
                    if (this._index == -1 || filters[this._index] == null || extras["addFilter"] == true) {
                        this._index = flash.checkInt(extras["index"] != null ? flash.tranint(extras["index"]) : flash.tranint(filters.length));
                        filters[this._index] = defaultFilter;
                        this._target["filters"] = filters;
                    }
                    this._filter = filters[this._index];
                    if (extras["remove"] == true) {
                        this._remove = true;
                        this.onComplete = flash.bind(this.onCompleteTween, this);
                    }
                    i = flash.checkInt(propNames.length);
                    while (i--) {
                        p = propNames[i];
                        if (p in props && this._filter[p] != props[p]) {
                            if (p == "color" || p == "highlightColor" || p == "shadowColor") {
                                colorTween = new com.greensock.plugins.HexColorsPlugin();
                                colorTween.initColor(this._filter, p, this._filter[p], props[p]);
                                this._tweens[this._tweens.length] = new com.greensock.core.PropTween(colorTween, "changeFactor", 0, 1, p, false);
                            }
                            else if (p == "quality" || p == "inner" || p == "knockout" || p == "hideObject") {
                                this._filter[p] = props[p];
                            }
                            else {
                                this.addTween(this._filter, p, this._filter[p], props[p], p);
                            }
                        }
                    }
                };
                Object.defineProperty(FilterPlugin.prototype, "changeFactor", {
                    get: function () {
                        return egret.superGetter(com.greensock.plugins.FilterPlugin, this, "changeFactor");
                    },
                    set: function (n) {
                        var ti = null;
                        var i = flash.checkInt(this._tweens.length);
                        var filters = this._target["filters"];
                        while (i--) {
                            ti = this._tweens[i];
                            ti.target[ti.property] = ti.start + ti.change * n;
                        }
                        if (!(flash.As3is(filters[this._index], null, "this._type"))) {
                            i = flash.checkInt(this._index = flash.checkInt(filters.length));
                            while (i--) {
                                if (flash.As3is(filters[i], null, "this._type")) {
                                    this._index = flash.checkInt(i);
                                    break;
                                }
                            }
                        }
                        filters[this._index] = this._filter;
                        this._target["filters"] = filters;
                    },
                    enumerable: true,
                    configurable: true
                });
                return FilterPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.FilterPlugin = FilterPlugin;
            __reflect(FilterPlugin.prototype, "com.greensock.plugins.FilterPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.FilterPlugin.VERSION_static_com_greensock_plugins_FilterPlugin = 2.03;
com.greensock.plugins.FilterPlugin.API_static_com_greensock_plugins_FilterPlugin = 1;
flash.extendsClass("com.greensock.plugins.FilterPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=FilterPlugin.js.map