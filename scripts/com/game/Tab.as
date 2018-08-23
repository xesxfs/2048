package com.game
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.AntiAliasType;
   import flash.text.TextFieldAutoSize;
   import flash.text.TextFormat;
   
   public class Tab extends Sprite
   {
       
      
      private var _tabNameText:TextField;
      
      private var _nameColor:uint;
      
      private var _bgColor:uint;
      
      private var _wgap:Number;
      
      private var _hgap:Number;
      
      public function Tab(tabName:String = "", nameColor:uint = 16777215, bgColor:uint = 12430498, fontSize:uint = 12, wgap:Number = 0, hgap:Number = 0)
      {
         super();
         this._nameColor = nameColor;
         this._bgColor = bgColor;
         this._wgap = wgap;
         this._hgap = hgap;
         this._tabNameText = new TextField();
         this._tabNameText.selectable = false;
         this._tabNameText.mouseEnabled = false;
         this._tabNameText.antiAliasType = AntiAliasType.NORMAL;
         this._tabNameText.autoSize = TextFieldAutoSize.LEFT;
         var tf:TextFormat = this._tabNameText.getTextFormat();
         tf = this._tabNameText.getTextFormat();
         tf.color = this._nameColor;
         tf.size = fontSize;
         tf.font = "Leelawadee";
         this._tabNameText.defaultTextFormat = tf;
         this._tabNameText.setTextFormat(tf);
         addChild(this._tabNameText);
         this.setTabName(tabName);
      }
      
      public function setTabName(name:String) : void
      {
         this._tabNameText.text = name;
         this.resize();
      }
      
      public function resize() : void
      {
         var cwidth:Number = 0;
         var cheight:Number = 0;
         cwidth = this._tabNameText.textWidth + this._wgap * 2;
         cheight = this._tabNameText.textHeight + this._hgap * 2;
         this._tabNameText.y = (cheight - this._tabNameText.textHeight) / 2 - 2;
         this._tabNameText.x = (cwidth - this._tabNameText.textWidth) / 2;
         graphics.clear();
         graphics.beginFill(this._bgColor,1);
         graphics.drawRoundRect(0,0,cwidth,cheight,10,10);
         graphics.endFill();
      }
   }
}
