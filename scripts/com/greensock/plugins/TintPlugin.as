package com.greensock.plugins
{
   import flash.geom.ColorTransform;
   import com.greensock.core.PropTween;
   import com.greensock.TweenLite;
   import flash.display.DisplayObject;
   import flash.geom.Transform;
   
   public class TintPlugin extends TweenPlugin
   {
      
      protected static var _props:Array = ["redMultiplier","greenMultiplier","blueMultiplier","alphaMultiplier","redOffset","greenOffset","blueOffset","alphaOffset"];
      
      public static const API:Number = 1;
       
      
      protected var _transform:Transform;
      
      public function TintPlugin()
      {
         super();
         this.propName = "tint";
         this.overwriteProps = ["tint"];
      }
      
      public function init(start:ColorTransform, end:ColorTransform) : void
      {
         var p:String = null;
         var i:int = _props.length;
         var cnt:int = _tweens.length;
         while(i--)
         {
            p = _props[i];
            if(start[p] != end[p])
            {
               _tweens[cnt++] = new PropTween(start,p,start[p],end[p] - start[p],"tint",false);
            }
         }
      }
      
      override public function onInitTween(target:Object, value:*, tween:TweenLite) : Boolean
      {
         if(!(target is DisplayObject))
         {
            return false;
         }
         var end:ColorTransform = new ColorTransform();
         if(value != null && tween.vars.removeTint != true)
         {
            end.color = uint(value);
         }
         _transform = DisplayObject(target).transform;
         var start:ColorTransform = _transform.colorTransform;
         end.alphaMultiplier = start.alphaMultiplier;
         end.alphaOffset = start.alphaOffset;
         init(start,end);
         return true;
      }
      
      override public function set changeFactor(n:Number) : void
      {
         var ct:ColorTransform = null;
         var pt:PropTween = null;
         var i:int = 0;
         if(_transform)
         {
            ct = _transform.colorTransform;
            i = _tweens.length;
            while(--i > -1)
            {
               pt = _tweens[i];
               ct[pt.property] = pt.start + pt.change * n;
            }
            _transform.colorTransform = ct;
         }
      }
   }
}
