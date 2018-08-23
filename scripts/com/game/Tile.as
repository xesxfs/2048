package com.game
{
   import flash.geom.Point;
   
   public class Tile
   {
       
      
      public var x:int;
      
      public var y:int;
      
      public var value:int;
      
      public var previousPosition:Point;
      
      public var mergedFrom:Array;
      
      public function Tile(position:Object, value:int)
      {
         super();
         this.x = position.x;
         this.y = position.y;
         this.value = int(value) || int(2);
         this.previousPosition = null;
         this.mergedFrom = null;
      }
      
      public function savePosition() : void
      {
         this.previousPosition = new Point(this.x,this.y);
      }
      
      public function updatePosition(position:Point) : void
      {
         this.x = position.x;
         this.y = position.y;
      }
      
      public function get position() : Point
      {
         return new Point(this.x,this.y);
      }
      
      public function serialize() : Object
      {
         return {
            "position":new Point(this.x,this.y),
            "value":this.value
         };
      }
   }
}
