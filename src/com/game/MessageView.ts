module com {
	export module game {
		export class MessageView extends egret.Sprite {
			public static MESSAGE_TYPE_START:string;
			public static MESSAGE_TYPE_OVER:string;
			private _bg:egret.Sprite;
			private _btnTab:com.game.Tab;
			private _type:string = "MESSAGE_TYPE_OVER";
			private _gameOver:flash.TextField;
			private _msgTxt:flash.TextField;

			public constructor()
			{
				super();				var _self__:any = this;

				_self__.addChild(this._bg = new egret.Sprite());
				this._bg.alpha = 0.8;
				this._btnTab = new com.game.Tab("提交",16381682,9402982,18,20,10);
				this._btnTab["buttonMode"] = true;
				this._btnTab.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this.onBtnClick,this),null);
				this._gameOver = new flash.TextField();
				this._gameOver["selectable"] = false;
				this._gameOver.antiAliasType = flash.AntiAliasType.NORMAL;
				this._gameOver.text = "GameOver";
				this._gameOver.textAlign = flash.TextFieldAutoSize.LEFT;
				var tf:flash.TextFormat = this._gameOver.getTextFormat();
				tf.color = 9402982;
				tf.align = flash.TextFormatAlign.CENTER;
				tf.size = 80;
				tf.font = com.game.Setting.FONTTYPE;
				this._gameOver.defaultTextFormat = tf;
				this._gameOver.setTextFormat(tf);
				this._msgTxt = new flash.TextField();
				this._msgTxt["selectable"] = false;
				this._msgTxt.antiAliasType = flash.AntiAliasType.NORMAL;
				this._msgTxt.text = "";
				this._msgTxt["wordWrap"] = true;
				tf = this._msgTxt.getTextFormat();
				tf.color = 9402982;
				tf.align = flash.TextFormatAlign.CENTER;
				tf.size = 30;
				tf.bold = true;
				tf.font = com.game.Setting.FONTTYPE;
				this._msgTxt.defaultTextFormat = tf;
				this._msgTxt.setTextFormat(tf);
			}

			protected onBtnClick(event:flash.MouseEvent)
			{
				com.common.DispatcherHandler.instance.dispatcheEvent(this._type);
			}

			public setMsg(msg:string)
			{
				this._msgTxt.htmlText = msg;
				this.resize();
			}

			public resize()
			{
				var _self__:any = this;
				with(this._bg);
				{
					this.graphics.clear();
					this.graphics.beginFill(16513263,1);
					this.graphics.drawRoundRect(0,0,500,500,10,10);
					this.graphics.endFill();
				}
				this._msgTxt.x = 0;
				this._msgTxt.width = 500;
				_self__.addChild(this._gameOver);
				_self__.addChild(this._msgTxt);
				_self__.addChild(this._btnTab);
				this._gameOver.x = (this.width - this._gameOver.textWidth) / 2;
				this._gameOver.y = 45;
				this._msgTxt.y = this._gameOver.y + this._gameOver.textHeight + 30;
				this._btnTab.x = (this.width - this._btnTab.width) / 2;
				this._btnTab.y = this._msgTxt.y + this._msgTxt.textHeight + 30;
			}

		}
	}
}

com.game.MessageView.MESSAGE_TYPE_START = "MESSAGE_TYPE_START";
com.game.MessageView.MESSAGE_TYPE_OVER = "MESSAGE_TYPE_OVER";
flash.extendsClass("com.game.MessageView","egret.Sprite")
