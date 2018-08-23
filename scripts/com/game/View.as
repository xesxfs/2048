package com.game
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.AntiAliasType;
   import flash.text.TextFieldAutoSize;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import flash.events.MouseEvent;
   import com.common.DispatcherHandler;
   import com.greensock.TweenLite;
   import com.greensock.easing.Linear;
   
   public class View extends Sprite
   {
      
      public static const EVENT_NEWGAME:String = "EVENT_NEWGAME";
       
      
      public var tileContainer:com.game.TileContainer;
      
      private var _bestContainer:Sprite;
      
      private var _messageView:com.game.MessageView;
      
      private var _curScoreTab:com.game.ScoreTab;
      
      private var _bestScoreTab:com.game.ScoreTab;
      
      private var _newGameTab:com.game.Tab;
      
      private var _score:int;
      
      private var _addScore:int;
      
      private var _alertMsg:TextField;
      
      private var _newTargetTxt:TextField;
      
      private var _passView:com.game.PassView;
      
      public function View()
      {
         super();
         graphics.clear();
         graphics.beginFill(16513263,1);
         graphics.drawRect(0,0,546,745);
         graphics.endFill();
      }
      
      public function create(size:uint, gridUnitSize:uint) : void
      {
         var title:TextField = new TextField();
         title.selectable = false;
         title.antiAliasType = AntiAliasType.NORMAL;
         title.text = "2048";
         title.autoSize = TextFieldAutoSize.LEFT;
         var tf:TextFormat = title.getTextFormat();
         tf.color = 7827045;
         tf.align = TextFormatAlign.CENTER;
         tf.size = 80;
         tf.font = Setting.FONTTYPE;
         title.defaultTextFormat = tf;
         title.setTextFormat(tf);
         title.y = 42;
         title.x = 24;
         this._newTargetTxt = new TextField();
         this._newTargetTxt.selectable = false;
         this._newTargetTxt.antiAliasType = AntiAliasType.NORMAL;
         this._newTargetTxt.text = "2048";
         this._newTargetTxt.autoSize = TextFieldAutoSize.LEFT;
         tf = this._newTargetTxt.getTextFormat();
         tf.color = 7827045;
         tf.align = TextFormatAlign.CENTER;
         tf.size = 20;
         tf.font = Setting.FONTTYPE;
         this._newTargetTxt.defaultTextFormat = tf;
         this._newTargetTxt.setTextFormat(tf);
         this._newTargetTxt.y = title.y + title.textHeight + 20;
         this._newTargetTxt.x = title.x;
         this._curScoreTab = new com.game.ScoreTab("Score",0);
         this._curScoreTab.x = 358;
         this._curScoreTab.y = 40;
         this._bestScoreTab = new com.game.ScoreTab("Best",0);
         this._bestScoreTab.y = 40;
         this.tileContainer = new com.game.TileContainer(size,gridUnitSize);
         this.tileContainer.y = 228;
         this.tileContainer.x = (546 - this.tileContainer.width) / 2;
         this._newGameTab = new com.game.Tab("新的游戏",16381682,9402982,18,20,10);
         this._newGameTab.x = 394;
         this._newGameTab.y = 141;
         this._newGameTab.buttonMode = true;
         this._newGameTab.addEventListener(MouseEvent.CLICK,this.onNewGame);
         this._bestContainer = new Sprite();
         this._messageView = new com.game.MessageView();
         this._messageView.x = this.tileContainer.x;
         this._messageView.y = this.tileContainer.y;
         this.hideMessage();
         this._passView = new com.game.PassView();
         this._passView.x = this.tileContainer.x;
         this._passView.y = this.tileContainer.y;
         this.hidePass();
         this._alertMsg = new TextField();
         this._alertMsg.selectable = false;
         this._alertMsg.antiAliasType = AntiAliasType.NORMAL;
         this._alertMsg.text = "";
         this._alertMsg.autoSize = TextFieldAutoSize.LEFT;
         tf = this._alertMsg.getTextFormat();
         tf.color = 9402982;
         tf.size = 24;
         tf.font = Setting.FONTTYPE;
         this._alertMsg.defaultTextFormat = tf;
         this._alertMsg.setTextFormat(tf);
         this.updateTabsPos();
         addChild(this.tileContainer);
         addChild(this._messageView);
         addChild(title);
         addChild(this._newTargetTxt);
         addChild(this._curScoreTab);
         addChild(this._bestScoreTab);
         addChild(this._newGameTab);
         addChild(this._alertMsg);
         addChild(this._passView);
         this._newGameTab.setTabName("查看排名");
      }
      
      protected function onNewGame(event:MouseEvent) : void
      {
         DispatcherHandler.instance.dispatcheEvent(View.EVENT_NEWGAME,null);
      }
      
      public function setCurScore(value:int) : void
      {
         this._addScore = value - this._score;
         this._score = value;
         this._curScoreTab.setValue(value);
      }
      
      public function alertAddScore() : void
      {
         if(this._addScore > 0)
         {
            this._alertMsg.text = "+" + this._addScore.toString();
            this._alertMsg.x = this._curScoreTab.x + (this._curScoreTab.width - this._alertMsg.width) / 2;
            this._alertMsg.y = this._curScoreTab.y + 6;
            this._alertMsg.alpha = 1;
            TweenLite.killTweensOf(this._alertMsg);
            TweenLite.to(this._alertMsg,0.6,{
               "y":this._alertMsg.y - 20,
               "alpha":0,
               "ease":Linear.easeNone
            });
         }
      }
      
      public function setBestScore(value:int) : void
      {
         this._bestScoreTab.setValue(value);
      }
      
      public function updateTabsPos() : void
      {
         this._bestScoreTab.x = 522 - this._bestScoreTab.width;
         this._curScoreTab.x = this._bestScoreTab.x - 4 - this._curScoreTab.width;
      }
      
      public function showMessage(score:int) : void
      {
         this._messageView.setMsg("太厉害了！获得了" + score + "分");
         this._messageView.visible = true;
      }
      
      public function hideMessage() : void
      {
         this._messageView.visible = false;
      }
      
      public function showPass() : void
      {
         this._passView.visible = true;
      }
      
      public function hidePass() : void
      {
         this._passView.visible = false;
      }
      
      public function updateNewTarget(msg:String) : void
      {
         this._newTargetTxt.text = msg;
      }
   }
}
