package com.game
{
   import flash.display.Sprite;
   import flash.geom.Point;
   import com.greensock.TweenMax;
   
   public class TileContainer extends Sprite
   {
       
      
      public var positionMap:Array;
      
      private var _backgroundLayer:Sprite;
      
      private var _gridLayer:Sprite;
      
      private var _tileArr:Vector.<com.game.TileSkin>;
      
      private var _freeTileArr:Vector.<com.game.TileSkin>;
      
      public function TileContainer(size:uint, gridUnitSize:uint)
      {
         super();
         this._tileArr = new Vector.<TileSkin>();
         this._freeTileArr = new Vector.<TileSkin>();
         graphics.beginFill(12299680,1);
         graphics.drawRoundRect(0,0,500,500,10,10);
         graphics.endFill();
         addChild(this._backgroundLayer = new Sprite());
         addChild(this._gridLayer = new Sprite());
         this.setting(size,gridUnitSize);
      }
      
      private function setting(size:int, gridUnitSize:uint) : void
      {
         var y:int = 0;
         var backgroundTile:Sprite = null;
         this.positionMap = [];
         var gap:int = 15;
         var startXY:int = 13;
         var gridSize:int = gridUnitSize;
         var gridHalf:Number = gridSize / 2;
         var gStartXY:Number = -gridHalf;
         for(var x:int = 0; x < size; x++)
         {
            this.positionMap[x] = [];
            for(y = 0; y < size; y++)
            {
               this.positionMap[x][y] = new Point(startXY + x * gap + x * gridSize + gridHalf,startXY + y * gap + y * gridSize + gridHalf);
               backgroundTile = new Sprite();
               backgroundTile.x = this.positionMap[x][y].x;
               backgroundTile.y = this.positionMap[x][y].y;
               with(backgroundTile)
               {
                  
                  graphics.beginFill(13484467,1);
                  graphics.drawRoundRect(gStartXY,gStartXY,gridSize,gridSize,10,10);
                  graphics.endFill();
               }
               this._backgroundLayer.addChild(backgroundTile);
            }
         }
      }
      
      public function addTile(tile:com.game.TileSkin) : void
      {
         this._tileArr.push(tile);
         this._gridLayer.addChild(tile);
      }
      
      public function getTile() : com.game.TileSkin
      {
         return this._freeTileArr.length > 0?this._freeTileArr.pop():new com.game.TileSkin();
      }
      
      public function clearGrids() : void
      {
         var tile:com.game.TileSkin = null;
         TweenMax.killChildTweensOf(this._gridLayer);
         for(var i:int = 0; i < this._tileArr.length; i++)
         {
            tile = this._tileArr[i];
            if(tile.parent)
            {
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
