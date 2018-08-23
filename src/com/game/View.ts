module com {
	export module game {
		export class View extends egret.Sprite {
			public static EVENT_NEWGAME:string;
			public tileContainer:com.game.TileContainer;
			private _bestContainer:egret.Sprite;
			private _messageView:com.game.MessageView;
			private _curScoreTab:com.game.ScoreTab;
			private _bestScoreTab:com.game.ScoreTab;
			private _newGameTab:com.game.Tab;
			private _score:number = 0;
			private _addScore:number = 0;
			private _alertMsg:flash.TextField;
			private _newTargetTxt:flash.TextField;
			private _passView:com.game.PassView;

			public constructor()
			{
				super();
				this.graphics.clear();
				this.graphics.beginFill(16513263,1);
				this.graphics.drawRect(0,0,546,745);
				this.graphics.endFill();
			}

			public create(size:number,gridUnitSize:number)
			{
				size = flash.checkUint(size);
				gridUnitSize = flash.checkUint(gridUnitSize);
				var _self__:any = this;
				var title:flash.TextField = new flash.TextField();
				title["selectable"] = false;
				title.antiAliasType = flash.AntiAliasType.NORMAL;
				title.text = "2048";
				title.textAlign = flash.TextFieldAutoSize.LEFT;
				var tf:flash.TextFormat = title.getTextFormat();
				tf.color = 7827045;
				tf.align = flash.TextFormatAlign.CENTER;
				tf.size = 80;
				tf.font = com.game.Setting.FONTTYPE;
				title.defaultTextFormat = tf;
				title.setTextFormat(tf);
				title.y = 42;
				title.x = 24;
				this._newTargetTxt = new flash.TextField();
				this._newTargetTxt["selectable"] = false;
				this._newTargetTxt.antiAliasType = flash.AntiAliasType.NORMAL;
				this._newTargetTxt.text = "2048";
				this._newTargetTxt.textAlign = flash.TextFieldAutoSize.LEFT;
				tf = this._newTargetTxt.getTextFormat();
				tf.color = 7827045;
				tf.align = flash.TextFormatAlign.CENTER;
				tf.size = 20;
				tf.font = com.game.Setting.FONTTYPE;
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
				this._newGameTab["buttonMode"] = true;
				this._newGameTab.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this.onNewGame,this),null);
				this._bestContainer = new egret.Sprite();
				this._messageView = new com.game.MessageView();
				this._messageView.x = this.tileContainer.x;
				this._messageView.y = this.tileContainer.y;
				this.hideMessage();
				this._passView = new com.game.PassView();
				this._passView.x = this.tileContainer.x;
				this._passView.y = this.tileContainer.y;
				this.hidePass();
				this._alertMsg = new flash.TextField();
				this._alertMsg["selectable"] = false;
				this._alertMsg.antiAliasType = flash.AntiAliasType.NORMAL;
				this._alertMsg.text = "";
				this._alertMsg.textAlign = flash.TextFieldAutoSize.LEFT;
				tf = this._alertMsg.getTextFormat();
				tf.color = 9402982;
				tf.size = 24;
				tf.font = com.game.Setting.FONTTYPE;
				this._alertMsg.defaultTextFormat = tf;
				this._alertMsg.setTextFormat(tf);
				this.updateTabsPos();
				_self__.addChild(this.tileContainer);
				_self__.addChild(this._messageView);
				_self__.addChild(title);
				_self__.addChild(this._newTargetTxt);
				_self__.addChild(this._curScoreTab);
				_self__.addChild(this._bestScoreTab);
				_self__.addChild(this._newGameTab);
				_self__.addChild(this._alertMsg);
				_self__.addChild(this._passView);
				this._newGameTab.setTabName("查看排名");
			}

			protected onNewGame(event:flash.MouseEvent)
			{
				com.common.DispatcherHandler.instance.dispatcheEvent(com.game.View.EVENT_NEWGAME,null);
			}

			public setCurScore(value:number)
			{
				value = flash.checkInt(value);
				this._addScore = flash.checkInt(value - this._score);
				this._score = flash.checkInt(value);
				this._curScoreTab.setValue(value);
			}

			public alertAddScore()
			{
				if(this._addScore > 0)
				{
					this._alertMsg.text = "+" + this.toString();
					this._alertMsg.x = this._curScoreTab.x + (this._curScoreTab.width - this._alertMsg.width) / 2;
					this._alertMsg.y = this._curScoreTab.y + 6;
					this._alertMsg.alpha = 1;
					com.greensock.TweenLite.killTweensOf(this._alertMsg);
					com.greensock.TweenLite.to(this._alertMsg,0.6,{"y":this._alertMsg.y - 20,"alpha":0,"ease":com.greensock.easing.Linear.easeNone});
				}
			}

			public setBestScore(value:number)
			{
				value = flash.checkInt(value);
				this._bestScoreTab.setValue(value);
			}

			public updateTabsPos()
			{
				this._bestScoreTab.x = 522 - this._bestScoreTab.width;
				this._curScoreTab.x = this._bestScoreTab.x - 4 - this._curScoreTab.width;
			}

			public showMessage(score:number)
			{
				score = flash.checkInt(score);
				this._messageView.setMsg("太厉害了！获得了" + score + "分");
				this._messageView.visible = true;
			}

			public hideMessage()
			{
				this._messageView.visible = false;
			}

			public showPass()
			{
				this._passView.visible = true;
			}

			public hidePass()
			{
				this._passView.visible = false;
			}

			public updateNewTarget(msg:string)
			{
				this._newTargetTxt.text = msg;
			}

		}
	}
}

com.game.View.EVENT_NEWGAME = "EVENT_NEWGAME";
flash.extendsClass("com.game.View","egret.Sprite")
