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
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game(stage) {
                var _this = _super.call(this) || this;
                _this._size = 0;
                _this._startTiles = 0;
                _this._score = 0;
                _this._bestGrid = 0;
                _this._over = false;
                _this._won = false;
                _this._keepPlaying = false;
                _this._stage = stage;
                _this.setting();
                _this.setUp();
                return _this;
            }
            Game.prototype.setUp = function () {
                // var previousState: any = com.game.StorageManager.instance.getGameState();
                // if (previousState) {
                // 	this._grid = new com.game.Grid(previousState["grid"].size, previousState["grid"].cells);
                // 	this._score = ~~(previousState["score"]);
                // 	this._over = previousState["over"];
                // 	this._won = previousState["won"];
                // 	this._keepPlaying = previousState["keepPlaying"];
                // }
                // else {
                this._grid = new com.game.Grid(this._size);
                this._score = (0);
                this._bestGrid = (0);
                this._over = false;
                this._won = false;
                this._keepPlaying = false;
                this.addStartTiles();
                // }
                this.actuate();
                com.common.KeyUtil.instance.enable = true;
            };
            Game.prototype.restart = function (event, evnetData) {
                if (event === void 0) { event = ""; }
                if (evnetData === void 0) { evnetData = null; }
                // com.game.StorageManager.instance.clearGameState();
                // this._actuator.continueGame();
                this.setUp();
            };
            Game.prototype.actuate = function () {
                // if (~~(com.game.StorageManager.instance.getBestScore()) < this._score) {
                // 	com.game.StorageManager.instance.setBestScore(this._score);
                // }
                // if (this._over) {
                // 	com.game.StorageManager.instance.clearGameState();
                // 	com.game.StorageManager.instance.save();
                // }
                // else {
                // 	com.game.StorageManager.instance.setGameState(this.serialize());
                // }
                this._actuator.actuate(this._grid, { "score": this._score, "over": this._over, "won": this._won, "bestScore": 0, "bestGrid": this._bestGrid, "terminated": this.isGameTerminated() });
            };
            Game.prototype.prepareTiles = function () {
                this._grid.eachCell(function (x, y, tile) {
                    if (tile) {
                        tile.mergedFrom = null;
                        tile.savePosition();
                    }
                });
            };
            Game.prototype.isGameTerminated = function () {
                return this._over || this._won && !this._keepPlaying;
            };
            Game.prototype.serialize = function () {
                return { "grid": this._grid.serialize(), "score": this._score, "over": this._over, "won": this._won, "keepPlaying": this._keepPlaying };
            };
            Game.prototype.addStartTiles = function () {
                for (var i = (0); i < this._startTiles; i++) {
                    this.addRandomTile();
                }
            };
            Game.prototype.addRandomTile = function () {
                var value = (0);
                var tile = null;
                if (this._grid.cellsAvailable()) {
                    value = (Math.random() < 0.9 ? (2) : (4));
                    tile = new com.game.Tile(this._grid.randomAvailableCell(), value);
                    this._grid.insertTile(tile);
                }
            };
            Game.prototype.setting = function () {
                this._size = (4);
                this._startTiles = (2);
                this._actuator = new com.game.Actuator(this);
                com.common.KeyUtil.instance.injectStage(this._stage);
                com.common.KeyUtil.instance.openKey(com.common.KeyUtil.UP);
                com.common.KeyUtil.instance.openKey(com.common.KeyUtil.LEFT);
                com.common.KeyUtil.instance.openKey(com.common.KeyUtil.RIGHT);
                com.common.KeyUtil.instance.openKey(com.common.KeyUtil.DOWN);
                com.common.KeyUtil.instance.addKeyListener(this.move.bind(this), [com.common.KeyUtil.UP]);
                com.common.KeyUtil.instance.addKeyListener(this.move.bind(this), [com.common.KeyUtil.DOWN]);
                com.common.KeyUtil.instance.addKeyListener(this.move.bind(this), [com.common.KeyUtil.LEFT]);
                com.common.KeyUtil.instance.addKeyListener(this.move.bind(this), [com.common.KeyUtil.RIGHT]);
                com.common.DispatcherHandler.instance.addEventListener(com.game.View.EVENT_NEWGAME, this.restart.bind(this), null);
                com.common.DispatcherHandler.instance.removeEventListener(com.game.View.EVENT_NEWGAME, this.restart.bind(this), null);
                // com.common.DispatcherHandler.instance.addEventListener(com.game.View.EVENT_NEWGAME, this.onLookRank.bind(this), null);
                // com.common.DispatcherHandler.instance.addEventListener(com.game.MessageView.MESSAGE_TYPE_OVER, this.onSubmitScore.bind(this), null);
                this._mouseDownPoint = new egret.Point();
                this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown.bind(this), null);
                this._stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUp.bind(this), null);
            };
            Game.prototype.onLookRank = function (event, data) {
                // if(Main.serviceHold)
                // {
                // 	Main.serviceHold.showSort();
                // }
            };
            Game.prototype.onSubmitScore = function (event, data) {
                // if(Main.serviceHold)
                // {
                // 	Main.serviceHold.showRefer(this._score);
                // }
                this.restart();
            };
            Game.prototype.onMouseUp = function (event) {
                var kbEvent;
                var mouseX = event.stageX;
                var mouseY = event.stageY;
                var dY = mouseY - this._mouseDownPoint.y;
                var dX = mouseX - this._mouseDownPoint.x;
                kbEvent = new KeyEvent(com.common.KeyUtil.UP);
                if (Math.abs(dX) >= Math.abs(dY)) {
                    if (dX > 20) {
                        kbEvent.keyCode = (com.common.KeyUtil.RIGHT);
                        this.move(kbEvent);
                    }
                    else if (dX < -20) {
                        kbEvent.keyCode = (com.common.KeyUtil.LEFT);
                        this.move(kbEvent);
                    }
                }
                else if (dY > 20) {
                    kbEvent.keyCode = (com.common.KeyUtil.DOWN);
                    this.move(kbEvent);
                }
                else if (dY < -20) {
                    kbEvent.keyCode = (com.common.KeyUtil.UP);
                    this.move(kbEvent);
                }
            };
            Game.prototype.onMouseDown = function (event) {
                this._mouseDownPoint.x = event.stageX;
                this._mouseDownPoint.y = event.stageY;
            };
            Game.prototype.buildTraversals = function (vector) {
                var traversals = { x: [], y: [] };
                for (var pos = (0); pos < this._size; pos++) {
                    traversals.x.push(pos);
                    traversals.y.push(pos);
                }
                if (vector.x === 1) {
                    traversals.x = traversals.x.reverse();
                }
                if (vector.y === 1) {
                    traversals.y = traversals.y.reverse();
                }
                return traversals;
            };
            Game.prototype.move = function (event) {
                var _self__ = this;
                var direction = (0);
                var vector = null;
                var traversals = null;
                var cell = null;
                var tile = null;
                switch (event.keyCode) {
                    case com.common.KeyUtil.UP:
                        direction = (com.common.Direction.UP);
                        break;
                    case com.common.KeyUtil.DOWN:
                        direction = (com.common.Direction.DOWN);
                        break;
                    case com.common.KeyUtil.LEFT:
                        direction = (com.common.Direction.LEFT);
                        break;
                    case com.common.KeyUtil.RIGHT:
                        direction = (com.common.Direction.RIGHT);
                        break;
                    default:
                        return;
                }
                vector = this.getVector(direction);
                traversals = this.buildTraversals(vector);
                var moved = false;
                this.prepareTiles();
                traversals.x.forEach(function (x, a1, a2) {
                    traversals.y.forEach(function (y, a1, a2) {
                        var positions = null;
                        var next = null;
                        var mergedValue = (0);
                        var merged = null;
                        cell = new egret.Point(x, y);
                        tile = _self__._grid.cellContent(cell);
                        if (tile) {
                            positions = _self__.findFarthestPosition(cell, vector);
                            next = _self__._grid.cellContent(positions["next"]);
                            if (next && next.value === tile.value && !next.mergedFrom) {
                                mergedValue = (tile.value * 2);
                                if (mergedValue > _self__._bestGrid) {
                                    _self__._bestGrid = (mergedValue);
                                }
                                merged = new com.game.Tile(positions["next"], mergedValue);
                                merged.mergedFrom = [tile, next];
                                _self__._grid.insertTile(merged);
                                _self__._grid.removeTile(tile);
                                tile.updatePosition(positions["next"]);
                                _self__._score = (_self__._score + merged.value);
                            }
                            else {
                                _self__.moveTile(tile, positions["farthest"]);
                            }
                            if (!_self__.positionsEqual(cell, tile.position)) {
                                moved = true;
                            }
                        }
                    });
                });
                if (moved) {
                    this.addRandomTile();
                    if (!this.movesAvailable()) {
                        this._over = true;
                    }
                }
                this.actuate();
            };
            Game.prototype.movesAvailable = function () {
                return this._grid.cellsAvailable() || this.tileMatchesAvailable();
            };
            Game.prototype.tileMatchesAvailable = function () {
                var tile = null;
                var y = (0);
                var directions = null;
                var direction = (0);
                var vector = null;
                var cell = null;
                var otherTile = null;
                for (var x = (0); x < this._size; x++) {
                    for (y = (0); y < this._size; y++) {
                        tile = this._grid.cellContent(new egret.Point(x, y));
                        if (tile) {
                            directions = [com.common.Direction.DOWN, com.common.Direction.LEFT, com.common.Direction.RIGHT, com.common.Direction.UP];
                            var direction_key_a;
                            for (direction_key_a in directions) {
                                direction = directions[direction_key_a];
                                vector = this.getVector(direction);
                                cell = new egret.Point(x + vector.x, y + vector.y);
                                otherTile = this._grid.cellContent(cell);
                                if (otherTile && otherTile.value === tile.value) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            };
            Game.prototype.findFarthestPosition = function (cell, vector) {
                var previous = null;
                do {
                    previous = cell.clone();
                    cell = cell.add(vector);
                } while (this._grid.withinBounds(cell) && this._grid.cellAvailable(cell));
                return { "farthest": previous, "next": cell };
            };
            Game.prototype.moveTile = function (tile, cell) {
                this._grid.removeTile(tile);
                tile.updatePosition(cell);
                this._grid.insertTile(tile);
            };
            Game.prototype.getVector = function (direction) {
                direction = (direction);
                switch (direction) {
                    case com.common.Direction.UP:
                        return new egret.Point(0, -1);
                    case com.common.Direction.LEFT:
                        return new egret.Point(-1, 0);
                    case com.common.Direction.DOWN:
                        return new egret.Point(0, 1);
                    case com.common.Direction.RIGHT:
                        return new egret.Point(1, 0);
                    default:
                        return new egret.Point(0, 0);
                }
            };
            Game.prototype.positionsEqual = function (first, second) {
                return first.x === second.x && first.y === second.y;
            };
            Object.defineProperty(Game.prototype, "stage", {
                get: function () {
                    return this._stage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Game.prototype, "size", {
                get: function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });
            return Game;
        }(egret.HashObject));
        game.Game = Game;
        __reflect(Game.prototype, "com.game.Game");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Game.js.map