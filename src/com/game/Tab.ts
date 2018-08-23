module com {
	export module game {
		export class Tab extends egret.Sprite {
			private _tabNameText:flash.TextField;
			private _nameColor:number = 0;
			private _bgColor:number = 0;
			private _wgap:number = NaN;
			private _hgap:number = NaN;

			public constructor(tabName:string = "",nameColor:number = 16777215,bgColor:number = 12430498,fontSize:number = 12,wgap:number = 0,hgap:number = 0)
			{
				super();				var _self__:any = this;

				this._nameColor = flash.checkUint(nameColor);
				this._bgColor = flash.checkUint(bgColor);
				this._wgap = wgap;
				this._hgap = hgap;
				this._tabNameText = new flash.TextField();
				this._tabNameText["selectable"] = false;
				this._tabNameText.touchEnabled = false;
				this._tabNameText.antiAliasType = flash.AntiAliasType.NORMAL;
				this._tabNameText.textAlign = flash.TextFieldAutoSize.LEFT;
				var tf:flash.TextFormat = this._tabNameText.getTextFormat();
				tf = this._tabNameText.getTextFormat();
				tf.color = this._nameColor;
				tf.size = fontSize;
				tf.font = "Leelawadee";
				this._tabNameText.defaultTextFormat = tf;
				this._tabNameText.setTextFormat(tf);
				_self__.addChild(this._tabNameText);
				this.setTabName(tabName);
			}

			public setTabName(name:string)
			{
				this._tabNameText.text = name;
				this.resize();
			}

			public resize()
			{
				var cwidth:number = <any>0;
				var cheight:number = <any>0;
				cwidth = this._tabNameText.textWidth + this._wgap * 2;
				cheight = this._tabNameText.textHeight + this._hgap * 2;
				this._tabNameText.y = (cheight - this._tabNameText.textHeight) / 2 - 2;
				this._tabNameText.x = (cwidth - this._tabNameText.textWidth) / 2;
				this.graphics.clear();
				this.graphics.beginFill(this._bgColor,1);
				this.graphics.drawRoundRect(0,0,cwidth,cheight,10,10);
				this.graphics.endFill();
			}

		}
	}
}

flash.extendsClass("com.game.Tab","egret.Sprite")
