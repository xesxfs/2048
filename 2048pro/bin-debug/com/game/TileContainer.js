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
        var TileContainer = (function (_super) {
            __extends(TileContainer, _super);
            function TileContainer(size, gridUnitSize) {
                var _this = _super.call(this) || this;
                size = (size);
                gridUnitSize = (gridUnitSize);
                var _self__ = _this;
                _this._tileArr = new Array();
                _this._freeTileArr = new Array();
                _this.graphics.beginFill(12299680, 1);
                _this.graphics.drawRoundRect(0, 0, 500, 500, 10, 10);
                _this.graphics.endFill();
                _self__.addChild(_this._backgroundLayer = new egret.Sprite());
                _self__.addChild(_this._gridLayer = new egret.Sprite());
                _this.setting(size, gridUnitSize);
                return _this;
            }
            TileContainer.prototype.setting = function (size, gridUnitSize) {
                size = (size);
                gridUnitSize = (gridUnitSize);
                var y = (0);
                var backgroundTile = null;
                this.positionMap = [];
                var gap = (15);
                var startXY = (13);
                var gridSize = (gridUnitSize);
                var gridHalf = gridSize / 2;
                var gStartXY = -gridHalf;
                for (var x = (0); x < size; x++) {
                    this.positionMap[x] = [];
                    for (y = (0); y < size; y++) {
                        this.positionMap[x][y] = new egret.Point(startXY + x * gap + x * gridSize + gridHalf, startXY + y * gap + y * gridSize + gridHalf);
                        backgroundTile = new egret.Sprite();
                        backgroundTile.x = this.positionMap[x][y].x;
                        backgroundTile.y = this.positionMap[x][y].y;
                        if (backgroundTile) {
                            backgroundTile.graphics.beginFill(13484467, 1);
                            backgroundTile.graphics.drawRoundRect(gStartXY, gStartXY, gridSize, gridSize, 10, 10);
                            backgroundTile.graphics.endFill();
                        }
                        this._backgroundLayer.addChild(backgroundTile);
                    }
                }
            };
            TileContainer.prototype.addTile = function (tile) {
                this._tileArr.push(tile);
                this._gridLayer.addChild(tile);
            };
            TileContainer.prototype.getTile = function () {
                return this._freeTileArr.length > 0 ? this._freeTileArr.pop() : new com.game.TileSkin();
            };
            TileContainer.prototype.clearGrids = function () {
                var tile = null;
                // com.greensock.TweenMax.killChildTweensOf(this._gridLayer);
                egret.Tween.removeTweens(this._gridLayer);
                for (var i = (0); i < this._tileArr.length; i++) {
                    tile = this._tileArr[i];
                    if (tile.parent) {
                        tile.parent.removeChild(tile);
                        this._freeTileArr.push(tile);
                        tile.scaleX = 1;
                        tile.scaleY = 1;
                    }
                }
                this._tileArr.length = 0;
            };
            return TileContainer;
        }(egret.Sprite));
        game.TileContainer = TileContainer;
        __reflect(TileContainer.prototype, "com.game.TileContainer");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
// flash.extendsClass("com.game.TileContainer", "egret.Sprite")
//# sourceMappingURL=TileContainer.js.map