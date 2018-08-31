module com {
	export module game {
		export class TileContainer extends egret.Sprite {
			public positionMap: Array<any>;
			private _backgroundLayer: egret.Sprite;
			private _gridLayer: egret.Sprite;
			private _tileArr: Array<com.game.TileSkin>;
			private _freeTileArr: Array<com.game.TileSkin>;

			public constructor(size: number, gridUnitSize: number) {
				super();
				size = (size);
				gridUnitSize = (gridUnitSize);
				var _self__ = this;
				this._tileArr = new Array<com.game.TileSkin>();
				this._freeTileArr = new Array<com.game.TileSkin>();
				this.graphics.beginFill(12299680, 1);
				this.graphics.drawRoundRect(0, 0, 500, 500, 10, 10);
				this.graphics.endFill();
				_self__.addChild(this._backgroundLayer = new egret.Sprite());
				_self__.addChild(this._gridLayer = new egret.Sprite());
				this.setting(size, gridUnitSize);
			}

			private setting(size: number, gridUnitSize: number) {
				size = (size);
				gridUnitSize = (gridUnitSize);
				var y: number = (0);
				var backgroundTile: egret.Sprite = null;
				this.positionMap = [];
				var gap: number = (15);
				var startXY: number = (13);
				var gridSize: number = (gridUnitSize);
				var gridHalf: number = gridSize / 2;
				var gStartXY: number = -gridHalf;
				for (var x: number = (0); x < size; x++) {
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
			}

			public addTile(tile: com.game.TileSkin) {
				this._tileArr.push(tile);
				this._gridLayer.addChild(tile);
			}

			public getTile(): com.game.TileSkin {
				return this._freeTileArr.length > 0 ? this._freeTileArr.pop() : new com.game.TileSkin();
			}

			public clearGrids() {
				var tile: com.game.TileSkin = null;
				// com.greensock.TweenMax.killChildTweensOf(this._gridLayer);
				egret.Tween.removeTweens(this._gridLayer);
				for (var i: number =(0); i < this._tileArr.length; i++) {
					tile = this._tileArr[i];
					if (tile.parent) {
						tile.parent.removeChild(tile);
						this._freeTileArr.push(tile);
						tile.scaleX = 1;
						tile.scaleY = 1;
					}
				}
				this._tileArr.length = 0;
			}

		}
	}
}

// flash.extendsClass("com.game.TileContainer", "egret.Sprite")
