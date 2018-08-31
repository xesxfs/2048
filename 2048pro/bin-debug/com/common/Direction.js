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
    var common;
    (function (common) {
        var Direction = (function (_super) {
            __extends(Direction, _super);
            function Direction() {
                var _this = _super.call(this) || this;
                _this = _super.call(this) || this;
                return _this;
            }
            return Direction;
        }(egret.HashObject));
        common.Direction = Direction;
        __reflect(Direction.prototype, "com.common.Direction");
    })(common = com.common || (com.common = {}));
})(com || (com = {}));
com.common.Direction.UP = 8;
com.common.Direction.DOWN = 2;
com.common.Direction.LEFT = 4;
com.common.Direction.RIGHT = 6;
//# sourceMappingURL=Direction.js.map