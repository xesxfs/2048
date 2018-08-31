// module com {
// 	export module game {
// 		export class ScoreTab extends egret.Sprite {
// 			private _scoreText:flash.TextField;
// 			private _scoreValueText:flash.TextField;
// 			public constructor(tabName:string = "",score:number = 0)
// 			{
// 				super();				var _self__:any = this;
// 				this._scoreValueText = new flash.TextField();
// 				this._scoreValueText["selectable"] = false;
// 				this._scoreValueText.antiAliasType = flash.AntiAliasType.NORMAL;
// 				this._scoreValueText.textAlign = flash.TextFieldAutoSize.LEFT;
// 				var tf:flash.TextFormat = this._scoreValueText.getTextFormat();
// 				tf = this._scoreValueText.getTextFormat();
// 				tf.color = 16777215;
// 				tf.size = 25;
// 				tf.font = com.game.Setting.FONTTYPE;
// 				this._scoreValueText.defaultTextFormat = tf;
// 				this._scoreValueText.setTextFormat(tf);
// 				this._scoreText = new flash.TextField();
// 				this._scoreText["selectable"] = false;
// 				this._scoreText.antiAliasType = flash.AntiAliasType.NORMAL;
// 				this._scoreText.textAlign = flash.TextFieldAutoSize.LEFT;
// 				tf = this._scoreText.getTextFormat();
// 				tf.color = 15656154;
// 				tf.size = 13;
// 				tf.font = com.game.Setting.FONTTYPE;
// 				this._scoreText.defaultTextFormat = tf;
// 				this._scoreText.setTextFormat(tf);
// 				_self__.addChild(this._scoreText);
// 				_self__.addChild(this._scoreValueText);
// 				this.setTabName(tabName);
// 				this.setValue(score);
// 			}
// 			public setTabName(name:string)
// 			{
// 				this._scoreText.text = name;
// 			}
// 			public setValue(value:number)
// 			{
// 				value = flash.checkInt(value);
// 				var cwidth:number = <any>0;
// 				this._scoreValueText.text = this.toString();
// 				cwidth = this._scoreValueText.textWidth + 25 * 2;
// 				this._scoreValueText.y = 21;
// 				this._scoreValueText.x = (cwidth - this._scoreValueText.textWidth) / 2;
// 				this.graphics.clear();
// 				this.graphics.beginFill(12430498,1);
// 				this.graphics.drawRoundRect(0,0,cwidth,55,10,10);
// 				this.graphics.endFill();
// 				this._scoreText.y = 6;
// 				this._scoreText.x = (cwidth - this._scoreText.textWidth) / 2;
// 			}
// 		}
// 	}
// }
// flash.extendsClass("com.game.ScoreTab","egret.Sprite")
//# sourceMappingURL=ScoreTab.js.map