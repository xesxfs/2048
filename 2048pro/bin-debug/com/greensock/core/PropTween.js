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
            var PropTween = (function (_super) {
                __extends(PropTween, _super);
                function PropTween(target, property, start, change, name, isPlugin, nextNode, priority) {
                    if (nextNode === void 0) { nextNode = null; }
                    if (priority === void 0) { priority = 0; }
                    var _this = _super.call(this) || this;
                    _this.priority = 0;
                    _this.start = NaN;
                    _this.change = NaN;
                    _this.isPlugin = false;
                    _this = _super.call(this) || this;
                    _this.target = target;
                    _this.property = property;
                    _this.start = start;
                    _this.change = change;
                    _this.name = name;
                    _this.isPlugin = isPlugin;
                    if (nextNode) {
                        nextNode.prevNode = _this;
                        _this.nextNode = nextNode;
                    }
                    _this.priority = flash.checkInt(priority);
                    return _this;
                }
                return PropTween;
            }(egret.HashObject));
            core.PropTween = PropTween;
            __reflect(PropTween.prototype, "com.greensock.core.PropTween");
        })(core = greensock.core || (greensock.core = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
//# sourceMappingURL=PropTween.js.map