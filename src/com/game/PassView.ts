module com {
	export module game {
		export class PassView extends egret.Sprite {
			private _bg:egret.Sprite;
			private _gameOver:flash.TextField;

			public constructor()
			{
				super();				var _self__:any = this;

				_self__.addChild(this._bg = new egret.Sprite());
				this._bg.alpha = 0.8;
				this._gameOver = new flash.TextField();
				this._gameOver["selectable"] = false;
				this._gameOver.antiAliasType = flash.AntiAliasType.NORMAL;
				this._gameOver.textAlign = flash.TextFieldAutoSize.LEFT;
				var tf:flash.TextFormat = this._gameOver.getTextFormat();
				tf.color = 9402982;
				tf.align = flash.TextFormatAlign.CENTER;
				tf.size = 50;
				tf.font = com.game.Setting.FONTTYPE;
				this._gameOver.defaultTextFormat = tf;
				this._gameOver.setTextFormat(tf);
				this.setMsg("鼠标点击继续游戏");
			}

			public setMsg(msg:string)
			{
				this._gameOver.text = msg;
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
				_self__.addChild(this._gameOver);
				this._gameOver.x = (this.width - this._gameOver.textWidth) / 2;
				this._gameOver.y = (this.height - this._gameOver.textHeight) / 2;
			}

		}
	}
}

flash.extendsClass("com.game.PassView","egret.Sprite")
