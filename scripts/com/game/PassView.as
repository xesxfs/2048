package com.game
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.AntiAliasType;
   import flash.text.TextFieldAutoSize;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   
   public class PassView extends Sprite
   {
       
      
      private var _bg:Sprite;
      
      private var _gameOver:TextField;
      
      public function PassView()
      {
         super();
         addChild(this._bg = new Sprite());
         this._bg.alpha = 0.8;
         this._gameOver = new TextField();
         this._gameOver.selectable = false;
         this._gameOver.antiAliasType = AntiAliasType.NORMAL;
         this._gameOver.autoSize = TextFieldAutoSize.LEFT;
         var tf:TextFormat = this._gameOver.getTextFormat();
         tf.color = 9402982;
         tf.align = TextFormatAlign.CENTER;
         tf.size = 50;
         tf.font = Setting.FONTTYPE;
         this._gameOver.defaultTextFormat = tf;
         this._gameOver.setTextFormat(tf);
         this.setMsg("鼠标点击继续游戏");
      }
      
      public function setMsg(msg:String) : void
      {
         this._gameOver.text = msg;
         this.resize();
      }
      
      public function resize() : void
      {
         with(this._bg)
         {
            
            graphics.clear();
            graphics.beginFill(16513263,1);
            graphics.drawRoundRect(0,0,500,500,10,10);
            graphics.endFill();
         }
         addChild(this._gameOver);
         this._gameOver.x = (this.width - this._gameOver.textWidth) / 2;
         this._gameOver.y = (this.height - this._gameOver.textHeight) / 2;
      }
   }
}
