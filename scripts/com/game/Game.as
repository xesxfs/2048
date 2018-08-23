package com.game
{
   import flash.display.Stage;
   import flash.geom.Point;
   import com.common.KeyUtil;
   import com.common.DispatcherHandler;
   import flash.events.MouseEvent;
   import flash.events.KeyboardEvent;
   import com.common.Direction;
   
   public class Game
   {
       
      
      private var _stage:Stage;
      
      private var _size:int;
      
      private var _startTiles:int;
      
      private var _grid:com.game.Grid;
      
      private var _score:int;
      
      private var _bestGrid:int;
      
      private var _over:Boolean;
      
      private var _won:Boolean;
      
      private var _keepPlaying:Boolean;
      
      private var _actuator:com.game.Actuator;
      
      private var _mouseDownPoint:Point;
      
      public function Game(stage:Stage)
      {
         super();
         this._stage = stage;
         this.setting();
         this.setUp();
      }
      
      private function setUp() : void
      {
         var previousState:Object = StorageManager.instance.getGameState();
         if(previousState)
         {
            this._grid = new com.game.Grid(previousState.grid.size,previousState.grid.cells);
            this._score = previousState.score;
            this._over = previousState.over;
            this._won = previousState.won;
            this._keepPlaying = previousState.keepPlaying;
         }
         else
         {
            this._grid = new com.game.Grid(this._size);
            this._score = 0;
            this._bestGrid = 0;
            this._over = false;
            this._won = false;
            this._keepPlaying = false;
            this.addStartTiles();
         }
         this.actuate();
         KeyUtil.instance.enable = true;
      }
      
      private function restart(event:String = "", evnetData:Object = null) : void
      {
         StorageManager.instance.clearGameState();
         this._actuator.continueGame();
         this.setUp();
      }
      
      private function actuate() : void
      {
         if(int(StorageManager.instance.getBestScore()) < this._score)
         {
            StorageManager.instance.setBestScore(this._score);
         }
         if(this._over)
         {
            StorageManager.instance.clearGameState();
            StorageManager.instance.save();
         }
         else
         {
            StorageManager.instance.setGameState(this.serialize());
         }
         this._actuator.actuate(this._grid,{
            "score":this._score,
            "over":this._over,
            "won":this._won,
            "bestScore":StorageManager.instance.getBestScore(),
            "bestGrid":this._bestGrid,
            "terminated":this.isGameTerminated()
         });
      }
      
      public function prepareTiles() : void
      {
         this._grid.eachCell(function(x:int, y:int, tile:Tile):void
         {
            if(tile)
            {
               tile.mergedFrom = null;
               tile.savePosition();
            }
         });
      }
      
      public function isGameTerminated() : Boolean
      {
         return this._over || this._won && !this._keepPlaying;
      }
      
      private function serialize() : Object
      {
         return {
            "grid":this._grid.serialize(),
            "score":this._score,
            "over":this._over,
            "won":this._won,
            "keepPlaying":this._keepPlaying
         };
      }
      
      private function addStartTiles() : void
      {
         for(var i:int = 0; i < this._startTiles; i++)
         {
            this.addRandomTile();
         }
      }
      
      private function addRandomTile() : void
      {
         var value:int = 0;
         var tile:Tile = null;
         if(this._grid.cellsAvailable())
         {
            value = Math.random() < 0.9?int(2):int(4);
            tile = new Tile(this._grid.randomAvailableCell(),value);
            this._grid.insertTile(tile);
         }
      }
      
      private function setting() : void
      {
         this._size = 4;
         this._startTiles = 2;
         this._actuator = new com.game.Actuator(this);
         KeyUtil.instance.injectStage(this._stage);
         KeyUtil.instance.openKey(KeyUtil.UP);
         KeyUtil.instance.openKey(KeyUtil.LEFT);
         KeyUtil.instance.openKey(KeyUtil.RIGHT);
         KeyUtil.instance.openKey(KeyUtil.DOWN);
         KeyUtil.instance.addKeyListener(this.move,[KeyUtil.UP]);
         KeyUtil.instance.addKeyListener(this.move,[KeyUtil.DOWN]);
         KeyUtil.instance.addKeyListener(this.move,[KeyUtil.LEFT]);
         KeyUtil.instance.addKeyListener(this.move,[KeyUtil.RIGHT]);
         DispatcherHandler.instance.addEventListener(View.EVENT_NEWGAME,this.restart);
         DispatcherHandler.instance.removeEventListener(View.EVENT_NEWGAME,this.restart);
         DispatcherHandler.instance.addEventListener(View.EVENT_NEWGAME,this.onLookRank);
         DispatcherHandler.instance.addEventListener(MessageView.MESSAGE_TYPE_OVER,this.onSubmitScore);
         this._mouseDownPoint = new Point();
         this._stage.addEventListener(MouseEvent.MOUSE_DOWN,this.onMouseDown);
         this._stage.addEventListener(MouseEvent.MOUSE_UP,this.onMouseUp);
      }
      
      private function onLookRank(event:String, data:Object) : void
      {
         if(Main.serviceHold)
         {
            Main.serviceHold.showSort();
         }
      }
      
      private function onSubmitScore(event:String, data:Object) : void
      {
         if(Main.serviceHold)
         {
            Main.serviceHold.showRefer(this._score);
         }
         this.restart();
      }
      
      protected function onMouseUp(event:MouseEvent) : void
      {
         var kbEvent:KeyboardEvent = null;
         var mouseX:Number = event.stageX;
         var mouseY:Number = event.stageY;
         var dY:Number = mouseY - this._mouseDownPoint.y;
         var dX:Number = mouseX - this._mouseDownPoint.x;
         kbEvent = new KeyboardEvent(KeyboardEvent.KEY_UP);
         if(Math.abs(dX) >= Math.abs(dY))
         {
            if(dX > 20)
            {
               kbEvent.keyCode = KeyUtil.RIGHT;
               this.move(kbEvent);
            }
            else if(dX < -20)
            {
               kbEvent.keyCode = KeyUtil.LEFT;
               this.move(kbEvent);
            }
         }
         else if(dY > 20)
         {
            kbEvent.keyCode = KeyUtil.DOWN;
            this.move(kbEvent);
         }
         else if(dY < -20)
         {
            kbEvent.keyCode = KeyUtil.UP;
            this.move(kbEvent);
         }
      }
      
      protected function onMouseDown(event:MouseEvent) : void
      {
         this._mouseDownPoint.x = event.stageX;
         this._mouseDownPoint.y = event.stageY;
      }
      
      private function buildTraversals(vector:Point) : Object
      {
         var traversals:Object = {
            "x":[],
            "y":[]
         };
         for(var pos:int = 0; pos < this._size; pos++)
         {
            traversals.x.push(pos);
            traversals.y.push(pos);
         }
         if(vector.x === 1)
         {
            traversals.x = traversals.x.reverse();
         }
         if(vector.y === 1)
         {
            traversals.y = traversals.y.reverse();
         }
         return traversals;
      }
      
      public function move(event:KeyboardEvent) : void
      {
         var direction:int = 0;
         var vector:Point = null;
         var traversals:Object = null;
         var cell:Point = null;
         var tile:Tile = null;
         switch(event.keyCode)
         {
            case KeyUtil.UP:
               direction = Direction.UP;
               break;
            case KeyUtil.DOWN:
               direction = Direction.DOWN;
               break;
            case KeyUtil.LEFT:
               direction = Direction.LEFT;
               break;
            case KeyUtil.RIGHT:
               direction = Direction.RIGHT;
               break;
            default:
               return;
         }
         vector = this.getVector(direction);
         traversals = this.buildTraversals(vector);
         var moved:Boolean = false;
         this.prepareTiles();
         traversals.x.forEach(function(x:int, a1:*, a2:*):void
         {
            traversals.y.forEach(function(y:int, a1:*, a2:*):void
            {
               var positions:Object = null;
               var next:Tile = null;
               var mergedValue:int = 0;
               var merged:Tile = null;
               cell = new Point(x,y);
               tile = _grid.cellContent(cell);
               if(tile)
               {
                  positions = findFarthestPosition(cell,vector);
                  next = _grid.cellContent(positions.next);
                  if(next && next.value === tile.value && !next.mergedFrom)
                  {
                     mergedValue = tile.value * 2;
                     if(mergedValue > _bestGrid)
                     {
                        _bestGrid = mergedValue;
                     }
                     merged = new Tile(positions.next,mergedValue);
                     merged.mergedFrom = [tile,next];
                     _grid.insertTile(merged);
                     _grid.removeTile(tile);
                     tile.updatePosition(positions.next);
                     _score = _score + merged.value;
                  }
                  else
                  {
                     moveTile(tile,positions.farthest);
                  }
                  if(!positionsEqual(cell,tile.position))
                  {
                     moved = true;
                  }
               }
            });
         });
         if(moved)
         {
            this.addRandomTile();
            if(!this.movesAvailable())
            {
               this._over = true;
            }
         }
         this.actuate();
      }
      
      public function movesAvailable() : Boolean
      {
         return this._grid.cellsAvailable() || this.tileMatchesAvailable();
      }
      
      private function tileMatchesAvailable() : Boolean
      {
         var tile:Tile = null;
         var y:int = 0;
         var directions:Array = null;
         var direction:int = 0;
         var vector:Point = null;
         var cell:Point = null;
         var otherTile:Tile = null;
         for(var x:int = 0; x < this._size; x++)
         {
            for(y = 0; y < this._size; y++)
            {
               tile = this._grid.cellContent(new Point(x,y));
               if(tile)
               {
                  directions = [Direction.DOWN,Direction.LEFT,Direction.RIGHT,Direction.UP];
                  for each(direction in directions)
                  {
                     vector = this.getVector(direction);
                     cell = new Point(x + vector.x,y + vector.y);
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
      
      public function findFarthestPosition(cell:Point, vector:Point) : Object
      {
         var previous:Point = null;
         do
         {
            previous = cell.clone();
            cell = cell.add(vector);
         }
         while(this._grid.withinBounds(cell) && this._grid.cellAvailable(cell));
         
         return {
            "farthest":previous,
            "next":cell
         };
      }
      
      public function moveTile(tile:Tile, cell:Point) : void
      {
         this._grid.removeTile(tile);
         tile.updatePosition(cell);
         this._grid.insertTile(tile);
      }
      
      public function getVector(direction:int) : Point
      {
         switch(direction)
         {
            case Direction.UP:
               return new Point(0,-1);
            case Direction.LEFT:
               return new Point(-1,0);
            case Direction.DOWN:
               return new Point(0,1);
            case Direction.RIGHT:
               return new Point(1,0);
            default:
               return new Point(0,0);
         }
      }
      
      public function positionsEqual(first:Point, second:Point) : Boolean
      {
         return first.x === second.x && first.y === second.y;
      }
      
      public function get stage() : Stage
      {
         return this._stage;
      }
      
      public function get size() : int
      {
         return this._size;
      }
   }
}
