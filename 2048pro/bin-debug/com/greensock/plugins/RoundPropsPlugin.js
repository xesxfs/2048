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
            var RoundPropsPlugin = (function (_super) {
                __extends(RoundPropsPlugin, _super);
                function RoundPropsPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "roundProps";
                    _this.overwriteProps = ["roundProps"];
                    _this.round = true;
                    _this.priority = flash.checkInt(-1);
                    _this.onInitAllProps = flash.bind(_this._initAllProps, _this);
                    return _this;
                }
                RoundPropsPlugin.prototype.add = function (object, propName, start, change) {
                    this.addTween(object, propName, start, start + change, propName);
                    this.overwriteProps[this.overwriteProps.length] = propName;
                };
                RoundPropsPlugin.prototype._removePropTween = function (propTween) {
                    if (propTween.nextNode) {
                        propTween.nextNode.prevNode = propTween.prevNode;
                    }
                    if (propTween.prevNode) {
                        propTween.prevNode.nextNode = propTween.nextNode;
                    }
                    else if (this._tween.cachedPT1 == propTween) {
                        this._tween.cachedPT1 = propTween.nextNode;
                    }
                    if (propTween.isPlugin && propTween.target["onDisable"]) {
                        propTween.target["onDisable"]();
                    }
                };
                RoundPropsPlugin.prototype.onInitTween = function (target, value, tween) {
                    this._tween = tween;
                    this.overwriteProps = this.overwriteProps.concat(flash.As3As(value, Array));
                    return true;
                };
                RoundPropsPlugin.prototype._initAllProps = function () {
                    var prop = null;
                    var multiProps = null;
                    var pt = null;
                    var rp = this._tween.vars["roundProps"];
                    var i = flash.checkInt(rp.length);
                    while (--i > -1) {
                        prop = rp[i];
                        pt = this._tween.cachedPT1;
                        while (pt) {
                            if (pt.name == prop) {
                                if (pt.isPlugin) {
                                    pt.target["round"] = true;
                                }
                                else {
                                    this.add(pt.target, prop, pt.start, pt.change);
                                    this._removePropTween(pt);
                                    this._tween.propTweenLookup[prop] = this._tween.propTweenLookup["roundProps"];
                                }
                            }
                            else if (pt.isPlugin && pt.name == "_MULTIPLE_" && !pt.target["round"]) {
                                multiProps = " " + pt.target["overwriteProps"].join(" ") + " ";
                                if (multiProps.indexOf(" " + prop + " ") != -1) {
                                    pt.target["round"] = true;
                                }
                            }
                            pt = pt.nextNode;
                        }
                    }
                };
                return RoundPropsPlugin;
            }(com.greensock.plugins.TweenPlugin));
            plugins.RoundPropsPlugin = RoundPropsPlugin;
            __reflect(RoundPropsPlugin.prototype, "com.greensock.plugins.RoundPropsPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.RoundPropsPlugin.API_static_com_greensock_plugins_RoundPropsPlugin = 1;
flash.extendsClass("com.greensock.plugins.RoundPropsPlugin", "com.greensock.plugins.TweenPlugin");
//# sourceMappingURL=RoundPropsPlugin.js.map