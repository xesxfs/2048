module com {
	export module game {
		export class Game extends egret.HashObject {
			private _stage:egret.Stage;
			private _size:number = 0;
			private _startTiles:number = 0;
			private _grid:com.game.Grid;
			private _score:number = 0;
			private _bestGrid:number = 0;
			private _over:boolean = false;
			private _won:boolean = false;
			private _keepPlaying:boolean = false;
			private _actuator:com.game.Actuator;
			private _mouseDownPoint:egret.Point;

			public constructor(stage:egret.Stage)
			{
				super();
				super();
				this._stage = stage;
				this.setting();
				this.setUp();
			}

			private setUp()
			{
				var previousState:any = com.game.StorageManager.instance.getGameState();
				if(previousState)
				{
					this._grid = new com.game.Grid(previousState["grid"].size,previousState["grid"].cells);
					this._score = flash.checkInt(previousState["score"]);
					this._over = previousState["over"];
					this._won = previousState["won"];
					this._keepPlaying = previousState["keepPlaying"];
				}
				else
				{
					this._grid = new com.game.Grid(this._size);
					this._score = flash.checkInt(0);
					this._bestGrid = flash.checkInt(0);
					this._over = false;
					this._won = false;
					this._keepPlaying = false;
					this.addStartTiles();
				}
				this.actuate();
				com.common.KeyUtil.instance.enable = true;
			}

			private restart(event:string = "",evnetData:any = null)
			{
				com.game.StorageManager.instance.clearGameState();
				this._actuator.continueGame();
				this.setUp();
			}

			private actuate()
			{
				if(flash.tranint(com.game.StorageManager.instance.getBestScore()) < this._score)
				{
					com.game.StorageManager.instance.setBestScore(this._score);
				}
				if(this._over)
				{
					com.game.StorageManager.instance.clearGameState();
					com.game.StorageManager.instance.save();
				}
				else
				{
					com.game.StorageManager.instance.setGameState(this.serialize());
				}
				this._actuator.actuate(this._grid,{"score":this._score,"over":this._over,"won":this._won,"bestScore":com.game.StorageManager.instance.getBestScore(),"bestGrid":this._bestGrid,"terminated":this.isGameTerminated()});
			}

			public prepareTiles()
			{
				this._grid.eachCell(function (x:number,y:number,tile:com.game.Tile)
				{
					if(tile)
					{
						tile.mergedFrom = null;
						tile.savePosition();
					}
				});
			}

			public isGameTerminated():boolean
			{
				return this._over || this._won && <any>!this._keepPlaying;
			}

			private serialize():any
			{
				return {"grid":this._grid.serialize(),"score":this._score,"over":this._over,"won":this._won,"keepPlaying":this._keepPlaying};
			}

			private addStartTiles()
			{
				for(var i:number = flash.checkInt(0);i < this._startTiles; i++)
				{
					this.addRandomTile();
				}
			}

			private addRandomTile()
			{
				var value:number = flash.checkInt(0);
				var tile:com.game.Tile = <any>null;
				if(this._grid.cellsAvailable())
				{
					value = flash.checkInt(Math.random() < 0.9?flash.tranint(2):flash.tranint(4));
					tile = new com.game.Tile(this._grid.randomAvailableCell(),value);
					this._grid.insertTile(tile);
				}
			}

			private setting()
			{
				this._size = flash.checkInt(4);
				this._startTiles = flash.checkInt(2);
				this._actuator = new com.game.Actuator(this);
				com.common.KeyUtil.instance.injectStage(this._stage);
				com.common.KeyUtil.instance.openKey(com.common.KeyUtil.UP);
				com.common.KeyUtil.instance.openKey(com.common.KeyUtil.LEFT);
				com.common.KeyUtil.instance.openKey(com.common.KeyUtil.RIGHT);
				com.common.KeyUtil.instance.openKey(com.common.KeyUtil.DOWN);
				com.common.KeyUtil.instance.addKeyListener(flash.bind(this.move,this),[com.common.KeyUtil.UP]);
				com.common.KeyUtil.instance.addKeyListener(flash.bind(this.move,this),[com.common.KeyUtil.DOWN]);
				com.common.KeyUtil.instance.addKeyListener(flash.bind(this.move,this),[com.common.KeyUtil.LEFT]);
				com.common.KeyUtil.instance.addKeyListener(flash.bind(this.move,this),[com.common.KeyUtil.RIGHT]);
				com.common.DispatcherHandler.instance.addEventListener(com.game.View.EVENT_NEWGAME,flash.bind(this.restart,this),null);
				com.common.DispatcherHandler.instance.removeEventListener(com.game.View.EVENT_NEWGAME,flash.bind(this.restart,this),null);
				com.common.DispatcherHandler.instance.addEventListener(com.game.View.EVENT_NEWGAME,flash.bind(this.onLookRank,this),null);
				com.common.DispatcherHandler.instance.addEventListener(com.game.MessageView.MESSAGE_TYPE_OVER,flash.bind(this.onSubmitScore,this),null);
				this._mouseDownPoint = new egret.Point();
				this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this),null);
				this._stage.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onMouseUp,this),null);
			}

			private onLookRank(event:string,data:any)
			{
				if(Main.serviceHold)
				{
					Main.serviceHold.showSort();
				}
			}

			private onSubmitScore(event:string,data:any)
			{
				if(Main.serviceHold)
				{
					Main.serviceHold.showRefer(this._score);
				}
				this.restart();
			}

			protected onMouseUp(event:flash.MouseEvent)
			{
				var kbEvent:flash.KeyboardEvent = <any>null;
				var mouseX:number = event.stageX;
				var mouseY:number = event.stageY;
				var dY:number = mouseY - this._mouseDownPoint.y;
				var dX:number = mouseX - this._mouseDownPoint.x;
				kbEvent = new flash.KeyboardEvent(flash.KeyboardEvent.KEY_UP);
				if(Math.abs(dX) >= Math.abs(dY))
				{
					if(dX > 20)
					{
						kbEvent.keyCode = flash.checkUint(com.common.KeyUtil.RIGHT);
						this.move(kbEvent);
					}
					else if(dX < -20)
					{
						kbEvent.keyCode = flash.checkUint(com.common.KeyUtil.LEFT);
						this.move(kbEvent);
					}
				}
				else if(dY > 20)
				{
					kbEvent.keyCode = flash.checkUint(com.common.KeyUtil.DOWN);
					this.move(kbEvent);
				}
				else if(dY < -20)
				{
					kbEvent.keyCode = flash.checkUint(com.common.KeyUtil.UP);
					this.move(kbEvent);
				}
			}

			protected onMouseDown(event:flash.MouseEvent)
			{
				this._mouseDownPoint.x = event.stageX;
				this._mouseDownPoint.y = event.stageY;
			}

			private buildTraversals(vector:egret.Point):any
			{
				var traversals:any = {"x":[],"y":[]};
				for(var pos:number = flash.checkInt(0);pos < this._size; pos++)
				{
					traversals["x"].push(pos);
					traversals["y"].push(pos);
				}
				if(vector.x === 1)
				{
					traversals["x"] = traversals["x"].reverse();
				}
				if(vector.y === 1)
				{
					traversals["y"] = traversals["y"].reverse();
				}
				return traversals;
			}

			public move(event:flash.KeyboardEvent)
			{
				var _self__:any = this;
				var direction:number = flash.checkInt(0);
				var vector:egret.Point = <any>null;
				var traversals:any = <any>null;
				var cell:egret.Point = <any>null;
				var tile:com.game.Tile = <any>null;
				switch(event.keyCode)
				{
				case com.common.KeyUtil.UP :
					direction = flash.checkInt(com.common.Direction.UP);
					break;
				case com.common.KeyUtil.DOWN :
					direction = flash.checkInt(com.common.Direction.DOWN);
					break;
				case com.common.KeyUtil.LEFT :
					direction = flash.checkInt(com.common.Direction.LEFT);
					break;
				case com.common.KeyUtil.RIGHT :
					direction = flash.checkInt(com.common.Direction.RIGHT);
					break;
				default :
					return ;
				}
				vector = this.getVector(direction);
				traversals = this.buildTraversals(vector);
				var moved:boolean = <any>false;
				this.prepareTiles();
				traversals["x"].forEach(function (x:number,a1:any,a2:any)
				{
					traversals["y"].forEach(function (y:number,a1:any,a2:any)
					{
						var positions:any = <any>null;
						var next:com.game.Tile = <any>null;
						var mergedValue:number = flash.checkInt(0);
						var merged:com.game.Tile = <any>null;
						cell = new egret.Point(x,y);
						tile = _self__._grid.cellContent(cell);
						if(tile)
						{
							positions = _self__.findFarthestPosition(cell,vector);
							next = _self__._grid.cellContent(positions["next"]);
							if(next && next.value === tile.value && <any>!next.mergedFrom)
							{
								mergedValue = flash.checkInt(tile.value * 2);
								if(mergedValue > _self__._bestGrid)
								{
									_self__._bestGrid = flash.checkInt(mergedValue);
								}
								merged = new com.game.Tile(positions["next"],mergedValue);
								merged.mergedFrom = [tile,next];
								_self__._grid.insertTile(merged);
								_self__._grid.removeTile(tile);
								tile.updatePosition(positions["next"]);
								_self__._score = flash.checkInt(_self__._score + merged.value);
							}
							else
							{
								_self__.moveTile(tile,positions["farthest"]);
							}
							if(<any>!_self__.positionsEqual(cell,tile.position))
							{
								moved = true;
							}
						}
					});
				});
				if(moved)
				{
					this.addRandomTile();
					if(<any>!this.movesAvailable())
					{
						this._over = true;
					}
				}
				this.actuate();
			}

			public movesAvailable():boolean
			{
				return this._grid.cellsAvailable() || this.tileMatchesAvailable();
			}

			private tileMatchesAvailable():boolean
			{
				var tile:com.game.Tile = <any>null;
				var y:number = flash.checkInt(0);
				var directions:Array<any> = <any>null;
				var direction:number = flash.checkInt(0);
				var vector:egret.Point = <any>null;
				var cell:egret.Point = <any>null;
				var otherTile:com.game.Tile = <any>null;
				for(var x:number = flash.checkInt(0);x < this._size; x++)
				{
					for(y = flash.checkInt(0); y < this._size; y++)
					{
						tile = this._grid.cellContent(new egret.Point(x,y));
						if(tile)
						{
							directions = [com.common.Direction.DOWN,com.common.Direction.LEFT,com.common.Direction.RIGHT,com.common.Direction.UP];
							var direction_key_a;
							for(direction_key_a in directions)
							{
								direction = directions[direction_key_a];
								vector = this.getVector(direction);
								cell = new egret.Point(x + vector.x,y + vector.y);
								otherTile = this._grid.cellContent(cell);
								if(otherTile && otherTile.value === tile.value)
								{
									return true;
								}
							}
						}
					}
				}
				return false;
			}

			public findFarthestPosition(cell:egret.Point,vector:egret.Point):any
			{
				var previous:egret.Point = <any>null;
				do
				{
					previous = cell.clone();
					cell = cell.add(vector);
				}
				while(this._grid.withinBounds(cell) && this._grid.cellAvailable(cell))
				return {"farthest":previous,"next":cell};
			}

			public moveTile(tile:com.game.Tile,cell:egret.Point)
			{
				this._grid.removeTile(tile);
				tile.updatePosition(cell);
				this._grid.insertTile(tile);
			}

			public getVector(direction:number):egret.Point
			{
				direction = flash.checkInt(direction);
				switch(direction)
				{
				case com.common.Direction.UP :
					return new egret.Point(0,-1);
				case com.common.Direction.LEFT :
					return new egret.Point(-1,0);
				case com.common.Direction.DOWN :
					return new egret.Point(0,1);
				case com.common.Direction.RIGHT :
					return new egret.Point(1,0);
				default :
					return new egret.Point(0,0);
				}
			}

			public positionsEqual(first:egret.Point,second:egret.Point):boolean
			{
				return first.x === second.x && first.y === second.y;
			}

			public get stage():egret.Stage
			{
				return this._stage;
			}

			public get size():number
			{
				return this._size;
			}

		}
	}
}

