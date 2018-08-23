package com.greensock.plugins
{
   import com.greensock.TweenLite;
   import flash.geom.ColorTransform;
   import flash.display.DisplayObject;
   
   public class ColorTransformPlugin extends TintPlugin
   {
      
      public static const API:Number = 1;
       
      
      public function ColorTransformPlugin()
      {
         super();
         this.propName = "colorTransform";
      }
      
      override public function onInitTween(target:Object, value:*, tween:TweenLite) : Boolean
      {
         var start:ColorTransform = null;
         var p:* = null;
         var ratio:Number = NaN;
         var end:ColorTransform = new ColorTransform();
         if(target is DisplayObject)
         {
            _transform = DisplayObject(target).transform;
            start = _transform.colorTransform;
         }
         else if(target is ColorTransform)
         {
            start = target as ColorTransform;
         }
         else
         {
            return false;
         }
         end.concat(start);
         for(p in value)
         {
            if(p == "tint" || p == "color")
            {
               if(value[p] != null)
               {
                  end.color = int(value[p]);
               }
            }
            else if(!(p == "tintAmount" || p == "exposure" || p == "brightness"))
            {
               end[p] = value[p];
            }
         }
         if(!isNaN(value.tintAmount))
         {
            ratio = value.tintAmount / (1 - (end.redMultiplier + end.greenMultiplier + end.blueMultiplier) / 3);
            end.redOffset = end.redOffset * ratio;
            end.greenOffset = end.greenOffset * ratio;
            end.blueOffset = end.blueOffset * ratio;
            end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1 - value.tintAmount;
         }
         else if(!isNaN(value.exposure))
         {
            end.redOffset = end.greenOffset = end.blueOffset = 255 * (value.exposure - 1);
            end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1;
         }
         else if(!isNaN(value.brightness))
         {
            end.redOffset = end.greenOffset = end.blueOffset = Math.max(0,(value.brightness - 1) * 255);
            end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1 - Math.abs(value.brightness - 1);
         }
         init(start,end);
         return true;
      }
   }
}
