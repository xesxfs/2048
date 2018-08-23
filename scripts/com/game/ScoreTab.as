package com.game
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.AntiAliasType;
   import flash.text.TextFieldAutoSize;
   import flash.text.TextFormat;
   
   public class ScoreTab extends Sprite
   {
       
      
      private var _scoreText:TextField;
      
      private var _scoreValueText:TextField;
      
      public function ScoreTab(tabName:String = "", score:int = 0)
      {
         super();
         this._scoreValueText = new TextField();
         this._scoreValueText.selectable = false;
         this._scoreValueText.antiAliasType = AntiAliasType.NORMAL;
         this._scoreValueText.autoSize = TextFieldAutoSize.LEFT;
         var tf:TextFormat = this._scoreValueText.getTextFormat();
         tf = this._scoreValueText.getTextFormat();
         tf.color = 16777215;
         tf.size = 25;
         tf.font = Setting.FONTTYPE;
         this._scoreValueText.defaultTextFormat = tf;
         this._scoreValueText.setTextFormat(tf);
         this._scoreText = new TextField();
         this._scoreText.selectable = false;
         this._scoreText.antiAliasType = AntiAliasType.NORMAL;
         this._scoreText.autoSize = TextFieldAutoSize.LEFT;
         tf = this._scoreText.getTextFormat();
         tf.color = 15656154;
         tf.size = 13;
         tf.font = Setting.FONTTYPE;
         this._scoreText.defaultTextFormat = tf;
         this._scoreText.setTextFormat(tf);
         addChild(this._scoreText);
         addChild(this._scoreValueText);
         this.setTabName(tabName);
         this.setValue(score);
      }
      
      public function setTabName(name:String) : void
      {
         this._scoreText.text = name;
      }
      
      public function setValue(value:int) : void
      {
         var cwidth:Number = 0;
         this._scoreValueText.text = value.toString();
         cwidth = this._scoreValueText.textWidth + 25 * 2;
         this._scoreValueText.y = 21;
         this._scoreValueText.x = (cwidth - this._scoreValueText.textWidth) / 2;
         graphics.clear();
         graphics.beginFill(12430498,1);
         graphics.drawRoundRect(0,0,cwidth,55,10,10);
         graphics.endFill();
         this._scoreText.y = 6;
         this._scoreText.x = (cwidth - this._scoreText.textWidth) / 2;
      }
   }
}
