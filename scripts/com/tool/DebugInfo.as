package com.tool
{
   import flash.text.TextField;
   import flash.utils.Dictionary;
   import flash.display.DisplayObjectContainer;
   import flash.display.DisplayObject;
   import flash.text.TextFormat;
   import flash.utils.getQualifiedClassName;
   
   public class DebugInfo
   {
      
      private static var text:TextField;
      
      private static var displayCount:Dictionary;
       
      
      public function DebugInfo()
      {
         super();
      }
      
      public static function parse(main:DisplayObjectContainer, ignore:int = 1, init:Boolean = true) : void
      {
         var display:DisplayObject = null;
         var className:String = null;
         var index:int = 0;
         var str:* = null;
         var num:int = 0;
         var leng:int = 0;
         if(init == true)
         {
            if(text && text.parent)
            {
               trace("DebugInfo close");
               main.stage.removeChild(text);
               return;
            }
            trace("DebugInfo start");
            if(text == null)
            {
               text = new TextField();
               text.defaultTextFormat = new TextFormat(null,15,null,true);
               text.background = true;
               text.backgroundColor = 16777215;
               text.mouseWheelEnabled = true;
               text.multiline = true;
            }
            text.text = "";
            displayCount = new Dictionary(true);
            main.stage.addChild(text);
         }
         var len:int = main.numChildren;
         for(var i:int = 0; i < len; i++)
         {
            display = main.getChildAt(i);
            className = getQualifiedClassName(display);
            index = className.indexOf("::");
            if(index != -1)
            {
               className = className.substr(index + 2);
            }
            if(displayCount[className] == null)
            {
               displayCount[className] = 1;
            }
            else
            {
               displayCount[className] = displayCount[className] + 1;
            }
            if(display is DisplayObjectContainer)
            {
               parse(display as DisplayObjectContainer,ignore,false);
            }
         }
         if(init == true)
         {
            trace("DebugInfo done");
            for(str in displayCount)
            {
               num = displayCount[str];
               leng = text.text.length;
               if(num > ignore)
               {
                  text.appendText(str + ":" + num + "  ");
                  if(text.textWidth > text.stage.stageWidth)
                  {
                     text.text = text.text.substr(0,leng);
                     text.appendText("\n" + str + ":" + num + "  ");
                  }
               }
            }
            text.width = text.textWidth + 2;
            text.height = text.textHeight + 4;
            text.parent.setChildIndex(text,text.parent.numChildren - 1);
         }
      }
   }
}
