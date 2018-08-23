package com.game
{
   import flash.display.Stage;
   import flash.events.Event;
   import flash.geom.Point;
   import com.greensock.TweenMax;
   import com.greensock.easing.Linear;
   import com.greensock.easing.Back;
   import flash.display.DisplayObjectContainer;
   import com.common.DispatcherHandler;
   import com.common.KeyUtil;
   
   public class Actuator
   {
       
      
      private var _tileContainer:com.game.TileContainer;
      
      private var _stage:Stage;
      
      private var _game:com.game.Game;
      
      private var _gridUnitSize:uint;
      
      private var _view:com.game.View;
      
      public function Actuator(game:com.game.Game)
      {
         super();
         this._game = game;
         this._stage = game.stage;
         this._view = new com.game.View();
         this._gridUnitSize = 108;
         this._view.create(game.size,this._gridUnitSize);
         this._tileContainer = this._view.tileContainer;
         this._stage.addChild(this._view);
         DispatcherHandler.instance.addEventListener(KeyUtil.DISAVTIVITY,this.onPass);
         DispatcherHandler.instance.addEventListener(KeyUtil.AVTIVITY,this.onActivity);
         this._game.stage.addEventListener(Event.ENTER_FRAME,this.onFrame);
      }
      
      protected function onFrame(event:Event) : void
      {
         if(this._game.stage.focus != null)
         {
            this._game.stage.focus = null;
         }
      }
      
      private function onActivity(event:String, data:Object) : void
      {
         this._view.hidePass();
      }
      
      private function onPass(event:String, data:Object) : void
      {
         this._view.showPass();
      }
      
      public function actuate(grid:Grid, metadata:Object) : void
      {
         this._tileContainer.clearGrids();
         grid.cells.forEach(function(... args):void
         {
            var column:Vector.<Tile> = args[0];
            column.forEach(function(... args):void
            {
               var cell:Tile = args[0];
               if(cell)
               {
                  addTile(cell);
               }
            });
         });
         this.updateBestScore(metadata.bestScore);
         this.updateScore(metadata.score);
         this.updateTabsPos();
         this.alertAddScore();
         this.updateNewTarget(metadata.bestGrid);
         if(metadata.terminated)
         {
            if(metadata.over || metadata.own)
            {
               this.message(metadata.score);
            }
         }
      }
      
      private function updateNewTarget(score:int) : void
      {
         var msg:String = "";
         switch(score)
         {
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
      }
      
      public function addTile(tile:Tile) : void
      {
         var tileSkin:TileSkin = this._tileContainer.getTile();
         var position:Point = tile.previousPosition || tile.position;
         var styleCfg:Array = this.getTileSkin(tile.value);
         tileSkin.setData(tile.value);
         tileSkin.setSkin(styleCfg[0],styleCfg[1],styleCfg[2],styleCfg[3]);
         if(tile.previousPosition)
         {
            tileSkin.x = this._tileContainer.positionMap[tile.previousPosition.x][tile.previousPosition.y].x;
            tileSkin.y = this._tileContainer.positionMap[tile.previousPosition.x][tile.previousPosition.y].y;
            TweenMax.to(tileSkin,0.1,{
               "x":this._tileContainer.positionMap[tile.x][tile.y].x,
               "y":this._tileContainer.positionMap[tile.x][tile.y].y,
               "ease":Linear.easeNone
            });
         }
         else if(tile.mergedFrom)
         {
            tileSkin.x = this._tileContainer.positionMap[tile.x][tile.y].x;
            tileSkin.y = this._tileContainer.positionMap[tile.x][tile.y].y;
            tileSkin.scaleX = 0;
            tileSkin.scaleY = 0;
            TweenMax.to(tileSkin,0.15,{
               "scaleX":1,
               "scaleY":1,
               "ease":Back.easeOut,
               "delay":0.1
            });
            tile.mergedFrom.forEach(function(merged:Tile, a1:*, a2:*):void
            {
               addTile(merged);
            });
         }
         else
         {
            tileSkin.x = this._tileContainer.positionMap[tile.x][tile.y].x;
            tileSkin.y = this._tileContainer.positionMap[tile.x][tile.y].y;
            tileSkin.scaleX = 0;
            tileSkin.scaleY = 0;
            TweenMax.to(tileSkin,0.25,{
               "scaleX":1,
               "scaleY":1,
               "ease":Linear.easeNone
            });
         }
         this._tileContainer.addTile(tileSkin);
      }
      
      public function getTileSkin(value:int) : Array
      {
         var textColor:int = 0;
         var backgroundColor:int = 0;
         var tileStyle_2:Object = {
            "color":7827045,
            "background":15656154
         };
         var tileStyle_4:Object = {
            "color":7827045,
            "background":15589576
         };
         var tileStyle_8:Object = {
            "color":16381682,
            "background":15905145
         };
         var tileStyle_16:Object = {
            "color":16381682,
            "background":16094563
         };
         var tileStyle_32:Object = {
            "color":16381682,
            "background":16153695
         };
         var tileStyle_64:Object = {
            "color":16381682,
            "background":16145979
         };
         var tileStyle_128:Object = {
            "color":16381682,
            "background":15585138
         };
         var tileStyle_256:Object = {
            "color":16381682,
            "background":15584353
         };
         var tileStyle_512:Object = {
            "color":16381682,
            "background":15583312
         };
         var tileStyle_1024:Object = {
            "color":16381682,
            "background":15582527
         };
         var tileStyle_2048:Object = {
            "color":16381682,
            "background":15581742
         };
         var styleCfgArr:Array = [tileStyle_2,tileStyle_4,tileStyle_8,tileStyle_16,tileStyle_32,tileStyle_64,tileStyle_128,tileStyle_256,tileStyle_512,tileStyle_1024,tileStyle_2048];
         var typeEnumArr:Array = [2,4,8,16,32,64,128,256,512,1024,2048];
         var fontSize:int = 55;
         if(value > 100)
         {
            fontSize = 45;
         }
         if(value > 1000)
         {
            fontSize = 35;
         }
         if(value > 2000)
         {
            fontSize = 30;
         }
         if(value > 10000)
         {
            fontSize = 20;
         }
         while(value > 2048)
         {
            value = value / 2048;
         }
         var idx:int = typeEnumArr.indexOf(value);
         var styleCfg:Object = styleCfgArr[idx];
         textColor = styleCfg.color;
         backgroundColor = styleCfg.background;
         return [textColor,backgroundColor,this._gridUnitSize,fontSize];
      }
      
      public function updateScore(score:int) : void
      {
         this._view.setCurScore(score);
      }
      
      public function updateBestScore(bestScore:int) : void
      {
         this._view.setBestScore(bestScore);
      }
      
      public function updateTabsPos() : void
      {
         this._view.updateTabsPos();
      }
      
      public function alertAddScore() : void
      {
         this._view.alertAddScore();
      }
      
      public function message(score:uint) : void
      {
         this._view.showMessage(score);
      }
      
      public function continueGame() : void
      {
         this.clearMessage();
      }
      
      private function clearMessage() : void
      {
         this._view.hideMessage();
      }
      
      private function clearContainer(container:DisplayObjectContainer) : void
      {
         if(container.numChildren > 0)
         {
            container.removeChildren(0,container.numChildren - 1);
         }
      }
   }
}
