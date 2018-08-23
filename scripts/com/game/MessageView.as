package com.game
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.events.MouseEvent;
   import com.common.DispatcherHandler;
   import flash.text.AntiAliasType;
   import flash.text.TextFieldAutoSize;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   
   public class MessageView extends Sprite
   {
      
      public static const MESSAGE_TYPE_START:String = "MESSAGE_TYPE_START";
      
      public static const MESSAGE_TYPE_OVER:String = "MESSAGE_TYPE_OVER";
       
      
      private var _bg:Sprite;
      
      private var _btnTab:com.game.Tab;
      
      private var _type:String = "MESSAGE_TYPE_OVER";
      
      private var _gameOver:TextField;
      
      private var _msgTxt:TextField;
      
      public function MessageView()
      {
         super();
         addChild(this._bg = new Sprite());
         this._bg.alpha = 0.8;
         this._btnTab = new com.game.Tab("提交",16381682,9402982,18,20,10);
         this._btnTab.buttonMode = true;
         this._btnTab.addEventListener(MouseEvent.CLICK,this.onBtnClick);
         this._gameOver = new TextField();
         this._gameOver.selectable = false;
         this._gameOver.antiAliasType = AntiAliasType.NORMAL;
         this._gameOver.text = "GameOver";
         this._gameOver.autoSize = TextFieldAutoSize.LEFT;
         var tf:TextFormat = this._gameOver.getTextFormat();
         tf.color = 9402982;
         tf.align = TextFormatAlign.CENTER;
         tf.size = 80;
         tf.font = Setting.FONTTYPE;
         this._gameOver.defaultTextFormat = tf;
         this._gameOver.setTextFormat(tf);
         this._msgTxt = new TextField();
         this._msgTxt.selectable = false;
         this._msgTxt.antiAliasType = AntiAliasType.NORMAL;
         this._msgTxt.text = "";
         this._msgTxt.wordWrap = true;
         tf = this._msgTxt.getTextFormat();
         tf.color = 9402982;
         tf.align = TextFormatAlign.CENTER;
         tf.size = 30;
         tf.bold = true;
         tf.font = Setting.FONTTYPE;
         this._msgTxt.defaultTextFormat = tf;
         this._msgTxt.setTextFormat(tf);
      }
      
      protected function onBtnClick(event:MouseEvent) : void
      {
         DispatcherHandler.instance.dispatcheEvent(this._type);
      }
      
      public function setMsg(msg:String) : void
      {
         this._msgTxt.htmlText = msg;
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
         this._msgTxt.x = 0;
         this._msgTxt.width = 500;
         addChild(this._gameOver);
         addChild(this._msgTxt);
         addChild(this._btnTab);
         this._gameOver.x = (this.width - this._gameOver.textWidth) / 2;
         this._gameOver.y = 45;
         this._msgTxt.y = this._gameOver.y + this._gameOver.textHeight + 30;
         this._btnTab.x = (this.width - this._btnTab.width) / 2;
         this._btnTab.y = this._msgTxt.y + this._msgTxt.textHeight + 30;
      }
   }
}
