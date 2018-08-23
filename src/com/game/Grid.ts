module com {
	export module game {
		export class Grid extends egret.HashObject {
			private _size:number = 0;
			private _cells:Array<Array<com.game.Tile>>;

			public constructor(size:number,previousState:Array<any> = null)
			{
				super();
				super();
				this._size = flash.checkInt(size);
				this._cells = flash.Boolean(previousState)?this.fromState(previousState):this.empty();
			}

			private fromState(state:Array<any>):Array<Array<com.game.Tile>>
			{
				var row:Array<com.game.Tile> = <any>null;
				var y:number = flash.checkInt(0);
				var tileState:any = <any>null;
				var cells:Array<Array<com.game.Tile>> = new Array<Array<com.game.Tile>>();
				for(var x:number = flash.checkInt(0);x < this._size; x++)
				{
					row = cells[x] = new Array<com.game.Tile>();
					for(y = flash.checkInt(0); y < this._size; y++)
					{
						tileState = state[x][y];
						row.push(flash.Boolean(tileState)?new com.game.Tile(tileState["position"],tileState["value"]):null);
					}
				}
				return cells;
			}

			private empty():Array<Array<com.game.Tile>>
			{
				var row:Array<com.game.Tile> = <any>null;
				var y:number = flash.checkInt(0);
				var cells:Array<Array<com.game.Tile>> = new Array<Array<com.game.Tile>>();
				for(var x:number = flash.checkInt(0);x < this._size; x++)
				{
					row = cells[x] = new Array<com.game.Tile>();
					for(y = flash.checkInt(0); y < this._size; y++)
					{
						row.push(null);
					}
				}
				return cells;
			}

			public randomAvailableCell():egret.Point
			{
				var cells:Array<egret.Point> = <any>this.availableCells();
				if(cells.length > 0)
				{
					return cells[Math.floor(Math.random() * cells.length)];
				}
				return null;
			}

			private availableCells():Array<egret.Point>
			{
				var cells:Array<egret.Point> = <any>null;
				cells = new Array<egret.Point>();
				this.eachCell(function (x:number,y:number,tile:com.game.Tile)
				{
					if(<any>!tile)
					{
						cells.push(new egret.Point(x,y));
					}
				});
				return cells;
			}

			public eachCell(callback:Function)
			{
				var y:number = flash.checkInt(0);
				for(var x:number = flash.checkInt(0);x < this._size; x++)
				{
					for(y = flash.checkInt(0); y < this._size; y++)
					{
						callback(x,y,this._cells[x][y]);
					}
				}
			}

			public cellsAvailable():boolean
			{
				return <any>!<any>!this.availableCells().length;
			}

			public cellAvailable(cell:egret.Point):boolean
			{
				return <any>!this.cellOccupied(cell);
			}

			private cellOccupied(cell:egret.Point):boolean
			{
				return <any>!<any>!this.cellContent(cell);
			}

			public cellContent(cell:egret.Point):com.game.Tile
			{
				if(this.withinBounds(cell))
				{
					return this._cells[cell.x][cell.y];
				}
				return null;
			}

			public withinBounds(position:egret.Point):boolean
			{
				return position.x >= 0 && position.x < this._size && position.y >= 0 && position.y < this._size;
			}

			public serialize():any
			{
				var row:Array<Object> = <any>null;
				var y:number = flash.checkInt(0);
				var cellState:Array<Array<Object>> = new Array<Array<Object>>();
				for(var x:number = flash.checkInt(0);x < this._size; x++)
				{
					row = cellState[x] = new Array<Object>();
					for(y = flash.checkInt(0); y < this._size; y++)
					{
						row.push(flash.Boolean(this._cells[x][y])?this._cells[x][y].serialize():null);
					}
				}
				return {"size":this._size,"cells":cellState};
			}

			public insertTile(tile:com.game.Tile)
			{
				this._cells[tile.x][tile.y] = tile;
			}

			public get cells():Array<Array<com.game.Tile>>
			{
				return this._cells;
			}

			public removeTile(tile:com.game.Tile)
			{
				this._cells[tile.x][tile.y] = null;
			}

		}
	}
}

