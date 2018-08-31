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
    (function (game_1) {
        var Actuator = (function (_super) {
            __extends(Actuator, _super);
            function Actuator(game) {
                var _this = _super.call(this) || this;
                _this._gridUnitSize = 0;
                _this._game = game;
                _this._stage = game.stage;
                _this._view = new com.game.View();
                _this._gridUnitSize = (108);
                _this._view.create(game.size, _this._gridUnitSize);
                _this._tileContainer = _this._view.tileContainer;
                _this._stage.addChild(_this._view);
                com.common.DispatcherHandler.instance.addEventListener(com.common.KeyUtil.DISAVTIVITY, _this.onPass.bind(_this), null);
                com.common.DispatcherHandler.instance.addEventListener(com.common.KeyUtil.AVTIVITY, _this.onActivity.bind(_this), null);
                _this._game.stage.addEventListener(egret.Event.ENTER_FRAME, _this.onFrame, _this);
                return _this;
            }
            Actuator.prototype.onFrame = function (event) {
                if (this._game.stage["focus"] != null) {
                    this._game.stage["focus"] = null;
                }
            };
            Actuator.prototype.onActivity = function (event, data) {
                this._view.hidePass();
            };
            Actuator.prototype.onPass = function (event, data) {
                this._view.showPass();
            };
            Actuator.prototype.actuate = function (grid, metadata) {
                var _self__ = this;
                this._tileContainer.clearGrids();
                grid.cells.forEach(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var column = args[0];
                    column.forEach(function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var cell = args[0];
                        if (cell) {
                            _self__.addTile(cell);
                        }
                    });
                });
                // this.updateBestScore(metadata["bestScore"]);
                // this.updateScore(metadata["score"]);
                // this.updateTabsPos();
                // this.alertAddScore();
                // this.updateNewTarget(metadata["bestGrid"]);
                // if(metadata["terminated"])
                // {
                // 	if(metadata["over"] || metadata["own"])
                // 	{
                // 		this.message(metadata["score"]);
                // 	}
                // }
            };
            Actuator.prototype.updateNewTarget = function (score) {
                score = (score);
                var msg = "";
                switch (score) {
                    case 0:
                        msg = "使用鼠标或键盘方向键合并相同的文字";
                        break;
                    case 4:
                        msg = "干得漂亮！试试去挑战方块8吧！";
                        break;
                    case 1024:
                        msg = "还差一点，你就到达2048了！加油！";
                        break;
                    case 2048:
                        msg = "2048仅仅只是开始，去迎接新的挑战吧！(4096)";
                        break;
                    default:
                        msg = "您的新挑战是获得方块" + score * 2;
                }
                this._view.updateNewTarget(msg);
            };
            Actuator.prototype.addTile = function (tile) {
                var _self__ = this;
                var tileSkin = this._tileContainer.getTile();
                var position = tile.previousPosition || tile.position;
                var styleCfg = this.getTileSkin(tile.value);
                tileSkin.setData(tile.value);
                tileSkin.setSkin(styleCfg[0], styleCfg[1], styleCfg[2], styleCfg[3]);
                if (tile.previousPosition) {
                    tileSkin.x = this._tileContainer.positionMap[tile.previousPosition.x][tile.previousPosition.y].x;
                    tileSkin.y = this._tileContainer.positionMap[tile.previousPosition.x][tile.previousPosition.y].y;
                    // com.greensock.TweenMax.to_static_com_greensock_TweenMax(tileSkin,0.1,{"x":this._tileContainer.positionMap[tile.x][tile.y].x,"y":this._tileContainer.positionMap[tile.x][tile.y].y,"ease":com.greensock.easing.Linear.easeNone});
                    // egret.Tween.get(tileSkin,0.1,{"x":this._tileContainer.positionMap[tile.x][tile.y].x,"y":this._tileContainer.positionMap[tile.x][tile.y].y,"ease":com.greensock.easing.Linear.easeNone});
                }
                else if (tile.mergedFrom) {
                    tileSkin.x = this._tileContainer.positionMap[tile.x][tile.y].x;
                    tileSkin.y = this._tileContainer.positionMap[tile.x][tile.y].y;
                    tileSkin.scaleX = 0;
                    tileSkin.scaleY = 0;
                    // com.greensock.TweenMax.to_static_com_greensock_TweenMax(tileSkin,0.15,{"scaleX":1,"scaleY":1,"ease":com.greensock.easing.Back.easeOut,"delay":0.1});
                    tile.mergedFrom.forEach(function (merged, a1, a2) {
                        _self__.addTile(merged);
                    });
                }
                else {
                    tileSkin.x = this._tileContainer.positionMap[tile.x][tile.y].x;
                    tileSkin.y = this._tileContainer.positionMap[tile.x][tile.y].y;
                    tileSkin.scaleX = 0;
                    tileSkin.scaleY = 0;
                    // com.greensock.TweenMax.to_static_com_greensock_TweenMax(tileSkin,0.25,{"scaleX":1,"scaleY":1,"ease":com.greensock.easing.Linear.easeNone});
                    egret.Tween.get(tileSkin).to({ scaleX: 1, scaleY: 1 }, 250);
                }
                this._tileContainer.addTile(tileSkin);
            };
            Actuator.prototype.getTileSkin = function (value) {
                value = (value);
                var textColor = (0);
                var backgroundColor = (0);
                var tileStyle_2 = { "color": 7827045, "background": 15656154 };
                var tileStyle_4 = { "color": 7827045, "background": 15589576 };
                var tileStyle_8 = { "color": 16381682, "background": 15905145 };
                var tileStyle_16 = { "color": 16381682, "background": 16094563 };
                var tileStyle_32 = { "color": 16381682, "background": 16153695 };
                var tileStyle_64 = { "color": 16381682, "background": 16145979 };
                var tileStyle_128 = { "color": 16381682, "background": 15585138 };
                var tileStyle_256 = { "color": 16381682, "background": 15584353 };
                var tileStyle_512 = { "color": 16381682, "background": 15583312 };
                var tileStyle_1024 = { "color": 16381682, "background": 15582527 };
                var tileStyle_2048 = { "color": 16381682, "background": 15581742 };
                var styleCfgArr = [tileStyle_2, tileStyle_4, tileStyle_8, tileStyle_16, tileStyle_32, tileStyle_64, tileStyle_128, tileStyle_256, tileStyle_512, tileStyle_1024, tileStyle_2048];
                var typeEnumArr = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
                var fontSize = (55);
                if (value > 100) {
                    fontSize = (45);
                }
                if (value > 1000) {
                    fontSize = (35);
                }
                if (value > 2000) {
                    fontSize = (30);
                }
                if (value > 10000) {
                    fontSize = (20);
                }
                while (value > 2048) {
                    value = (value / 2048);
                }
                var idx = (typeEnumArr.indexOf(value));
                var styleCfg = styleCfgArr[idx];
                textColor = (styleCfg["color"]);
                backgroundColor = (styleCfg["background"]);
                return [textColor, backgroundColor, this._gridUnitSize, fontSize];
            };
            Actuator.prototype.updateScore = function (score) {
                score = (score);
                this._view.setCurScore(score);
            };
            Actuator.prototype.updateBestScore = function (bestScore) {
                bestScore = (bestScore);
                this._view.setBestScore(bestScore);
            };
            Actuator.prototype.updateTabsPos = function () {
                this._view.updateTabsPos();
            };
            Actuator.prototype.alertAddScore = function () {
                this._view.alertAddScore();
            };
            Actuator.prototype.message = function (score) {
                score = (score);
                this._view.showMessage(score);
            };
            Actuator.prototype.continueGame = function () {
                this.clearMessage();
            };
            Actuator.prototype.clearMessage = function () {
                this._view.hideMessage();
            };
            Actuator.prototype.clearContainer = function (container) {
                if (container.numChildren > 0) {
                    container.removeChildAt(container.numChildren - 1);
                }
            };
            return Actuator;
        }(egret.HashObject));
        game_1.Actuator = Actuator;
        __reflect(Actuator.prototype, "com.game.Actuator");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Actuator.js.map