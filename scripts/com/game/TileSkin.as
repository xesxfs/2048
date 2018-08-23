package com.game
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import flash.text.AntiAliasType;
   
   public class TileSkin extends Sprite
   {
       
      
      private var _textfiled:TextField;
      
      private var _textColor:uint;
      
      public function TileSkin()
      {
         super();
         this._textfiled = new TextField();
         this._textfiled.selectable = false;
         this._textfiled.wordWrap = true;
         this._textfiled.multiline = true;
         this._textfiled.antiAliasType = AntiAliasType.NORMAL;
         addChild(this._textfiled);
      }
      
      public function setData(value:int) : void
      {
         this._textfiled.text = value.toString();
      }
      
      public function setSkin(textColor:uint, backgroundColor:uint, gridUnitSize:Number, fontSize:uint) : void
      {
         graphics.clear();
         graphics.beginFill(backgroundColor,1);
         var startXY:Number = -gridUnitSize / 2;
         graphics.drawRoundRect(startXY,startXY,gridUnitSize,gridUnitSize,10,10);
         graphics.endFill();
         var tf:TextFormat = this._textfiled.getTextFormat();
         tf.color = textColor;
         tf.align = TextFormatAlign.CENTER;
         tf.size = fontSize;
         tf.font = Setting.FONTTYPE;
         this._textfiled.defaultTextFormat = tf;
         this._textfiled.setTextFormat(tf);
         this._textfiled.x = -gridUnitSize / 2;
         this._textfiled.width = gridUnitSize;
         this._textfiled.height = this._textfiled.textHeight;
         this._textfiled.y = (gridUnitSize - this._textfiled.height) / 2 - gridUnitSize / 2;
      }
   }
}
