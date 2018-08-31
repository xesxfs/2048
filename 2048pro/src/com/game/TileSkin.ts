module com {
	export module game {
		export class TileSkin extends egret.Sprite {
			private _textfiled: egret.TextField;
			private _textColor: number = 0;

			public constructor() {
				super();
				var _self__ = this;
				this._textfiled = new egret.TextField();
				this._textfiled["selectable"] = false;
				this._textfiled["wordWrap"] = true;
				this._textfiled.multiline = true;
				// this._textfiled.antiAliasType = flash.AntiAliasType.NORMAL;
				_self__.addChild(this._textfiled);
			}

			public setData(value: number) {
				value = ~~(value);
				this._textfiled.text = value.toString();
			}

			public setSkin(textColor: number, backgroundColor: number, gridUnitSize: number, fontSize: number) {
				textColor = (textColor);
				backgroundColor = (backgroundColor);
				fontSize = (fontSize);
				this.graphics.clear();
				this.graphics.beginFill(backgroundColor, 1);
				var startXY: number = -gridUnitSize / 2;
				this.graphics.drawRoundRect(startXY, startXY, gridUnitSize, gridUnitSize, 10, 10);
				this.graphics.endFill();
				// var tf: flash.TextFormat = this._textfiled.getTextFormat();
				// tf.color = textColor;
				// tf.align = flash.TextFormatAlign.CENTER;
				// tf.size = fontSize;
				// tf.font = com.game.Setting.FONTTYPE;
				// this._textfiled.defaultTextFormat = tf;
				// this._textfiled.setTextFormat(tf);
				this._textfiled.x = -gridUnitSize / 2;
				this._textfiled.width = gridUnitSize;
				this._textfiled.height = this._textfiled.textHeight;
				this._textfiled.y = (gridUnitSize - this._textfiled.height) / 2 - gridUnitSize / 2;
			}

		}
	}
}

