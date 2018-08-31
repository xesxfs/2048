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
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid(size, previousState) {
                if (previousState === void 0) { previousState = null; }
                var _this = _super.call(this) || this;
                _this._size = 0;
                _this._size = (size);
                _this._cells = !!(previousState) ? _this.fromState(previousState) : _this.empty();
                return _this;
            }
            Grid.prototype.fromState = function (state) {
                var row = null;
                var y = (0);
                var tileState = null;
                var cells = new Array();
                for (var x = (0); x < this._size; x++) {
                    row = cells[x] = new Array();
                    for (y = (0); y < this._size; y++) {
                        tileState = state[x][y];
                        row.push(!!(tileState) ? new com.game.Tile(tileState["position"], tileState["value"]) : null);
                    }
                }
                return cells;
            };
            Grid.prototype.empty = function () {
                var row = null;
                var y = (0);
                var cells = new Array();
                for (var x = (0); x < this._size; x++) {
                    row = cells[x] = new Array();
                    for (y = (0); y < this._size; y++) {
                        row.push(null);
                    }
                }
                return cells;
            };
            Grid.prototype.randomAvailableCell = function () {
                var cells = this.availableCells();
                if (cells.length > 0) {
                    return cells[Math.floor(Math.random() * cells.length)];
                }
                return null;
            };
            Grid.prototype.availableCells = function () {
                var cells = null;
                cells = new Array();
                this.eachCell(function (x, y, tile) {
                    if (!tile) {
                        cells.push(new egret.Point(x, y));
                    }
                });
                return cells;
            };
            Grid.prototype.eachCell = function (callback) {
                var y = (0);
                for (var x = (0); x < this._size; x++) {
                    for (y = (0); y < this._size; y++) {
                        callback(x, y, this._cells[x][y]);
                    }
                }
            };
            Grid.prototype.cellsAvailable = function () {
                return !!this.availableCells().length;
            };
            Grid.prototype.cellAvailable = function (cell) {
                return !this.cellOccupied(cell);
            };
            Grid.prototype.cellOccupied = function (cell) {
                return !!this.cellContent(cell);
            };
            Grid.prototype.cellContent = function (cell) {
                if (this.withinBounds(cell)) {
                    return this._cells[cell.x][cell.y];
                }
                return null;
            };
            Grid.prototype.withinBounds = function (position) {
                return position.x >= 0 && position.x < this._size && position.y >= 0 && position.y < this._size;
            };
            Grid.prototype.serialize = function () {
                var row = null;
                var y = (0);
                var cellState = new Array();
                for (var x = (0); x < this._size; x++) {
                    row = cellState[x] = new Array();
                    for (y = (0); y < this._size; y++) {
                        row.push(!!(this._cells[x][y]) ? this._cells[x][y].serialize() : null);
                    }
                }
                return { "size": this._size, "cells": cellState };
            };
            Grid.prototype.insertTile = function (tile) {
                this._cells[tile.x][tile.y] = tile;
            };
            Object.defineProperty(Grid.prototype, "cells", {
                get: function () {
                    return this._cells;
                },
                enumerable: true,
                configurable: true
            });
            Grid.prototype.removeTile = function (tile) {
                this._cells[tile.x][tile.y] = null;
            };
            return Grid;
        }(egret.HashObject));
        game.Grid = Grid;
        __reflect(Grid.prototype, "com.game.Grid");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Grid.js.map