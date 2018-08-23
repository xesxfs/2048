package com.game
{
   import flash.geom.Point;
   
   public class Grid
   {
       
      
      private var _size:int;
      
      private var _cells:Vector.<Vector.<com.game.Tile>>;
      
      public function Grid(size:int, previousState:Array = null)
      {
         super();
         this._size = size;
         this._cells = Boolean(previousState)?this.fromState(previousState):this.empty();
      }
      
      private function fromState(state:Array) : Vector.<Vector.<com.game.Tile>>
      {
         var row:Vector.<com.game.Tile> = null;
         var y:int = 0;
         var tileState:Object = null;
         var cells:Vector.<Vector.<com.game.Tile>> = new Vector.<Vector.<Tile>>();
         for(var x:int = 0; x < this._size; x++)
         {
            row = cells[x] = new Vector.<Tile>();
            for(y = 0; y < this._size; y++)
            {
               tileState = state[x][y];
               row.push(Boolean(tileState)?new com.game.Tile(tileState.position,tileState.value):null);
            }
         }
         return cells;
      }
      
      private function empty() : Vector.<Vector.<com.game.Tile>>
      {
         var row:Vector.<com.game.Tile> = null;
         var y:int = 0;
         var cells:Vector.<Vector.<com.game.Tile>> = new Vector.<Vector.<Tile>>();
         for(var x:int = 0; x < this._size; x++)
         {
            row = cells[x] = new Vector.<Tile>();
            for(y = 0; y < this._size; y++)
            {
               row.push(null);
            }
         }
         return cells;
      }
      
      public function randomAvailableCell() : Point
      {
         var cells:Vector.<Point> = this.availableCells();
         if(cells.length > 0)
         {
            return cells[Math.floor(Math.random() * cells.length)];
         }
         return null;
      }
      
      private function availableCells() : Vector.<Point>
      {
         var cells:Vector.<Point> = null;
         cells = new Vector.<Point>();
         this.eachCell(function(x:int, y:int, tile:Tile):void
         {
            if(!tile)
            {
               cells.push(new Point(x,y));
            }
         });
         return cells;
      }
      
      public function eachCell(callback:Function) : void
      {
         var y:int = 0;
         for(var x:int = 0; x < this._size; x++)
         {
            for(y = 0; y < this._size; y++)
            {
               callback(x,y,this._cells[x][y]);
            }
         }
      }
      
      public function cellsAvailable() : Boolean
      {
         return !!this.availableCells().length;
      }
      
      public function cellAvailable(cell:Point) : Boolean
      {
         return !this.cellOccupied(cell);
      }
      
      private function cellOccupied(cell:Point) : Boolean
      {
         return !!this.cellContent(cell);
      }
      
      public function cellContent(cell:Point) : com.game.Tile
      {
         if(this.withinBounds(cell))
         {
            return this._cells[cell.x][cell.y];
         }
         return null;
      }
      
      public function withinBounds(position:Point) : Boolean
      {
         return position.x >= 0 && position.x < this._size && position.y >= 0 && position.y < this._size;
      }
      
      public function serialize() : Object
      {
         var row:Vector.<Object> = null;
         var y:int = 0;
         var cellState:Vector.<Vector.<Object>> = new Vector.<Vector.<Object>>();
         for(var x:int = 0; x < this._size; x++)
         {
            row = cellState[x] = new Vector.<Object>();
            for(y = 0; y < this._size; y++)
            {
               row.push(Boolean(this._cells[x][y])?this._cells[x][y].serialize():null);
            }
         }
         return {
            "size":this._size,
            "cells":cellState
         };
      }
      
      public function insertTile(tile:com.game.Tile) : void
      {
         this._cells[tile.x][tile.y] = tile;
      }
      
      public function get cells() : Vector.<Vector.<com.game.Tile>>
      {
         return this._cells;
      }
      
      public function removeTile(tile:com.game.Tile) : void
      {
         this._cells[tile.x][tile.y] = null;
      }
   }
}
