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
    var game;
    (function (game) {
        var Tile = (function (_super) {
            __extends(Tile, _super);
            function Tile(position, value) {
                var _this = _super.call(this) || this;
                _this.x = 0;
                _this.y = 0;
                _this.value = 0;
                value = (value);
                _this = _super.call(this) || this;
                _this.x = (position["x"]);
                _this.y = (position["y"]);
                _this.value = (value) || (2);
                _this.previousPosition = null;
                _this.mergedFrom = null;
                return _this;
            }
            Tile.prototype.savePosition = function () {
                this.previousPosition = new egret.Point(this.x, this.y);
            };
            Tile.prototype.updatePosition = function (position) {
                this.x = (position.x);
                this.y = (position.y);
            };
            Object.defineProperty(Tile.prototype, "position", {
                get: function () {
                    return new egret.Point(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });
            Tile.prototype.serialize = function () {
                return { "position": new egret.Point(this.x, this.y), "value": this.value };
            };
            return Tile;
        }(egret.HashObject));
        game.Tile = Tile;
        __reflect(Tile.prototype, "com.game.Tile");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Tile.js.map