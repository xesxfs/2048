module com {
	export module greensock {
		export module plugins {
			export class DropShadowFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_DropShadowFilterPlugin:number;
				public static _propNames:Array<any>;

				public constructor()
				{
					super();
					this.propName = "dropShadowFilter";
					this.overwriteProps = ["dropShadowFilter"];
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._target = target;
					this._type = flash.DropShadowFilter;
					this.initFilter(value,new flash.DropShadowFilter(0,45,0,0,0,0,1,flash.tranint(value.quality) || flash.tranint(2),value.inner,value.knockout,value.hideObject),com.greensock.plugins.DropShadowFilterPlugin._propNames);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.DropShadowFilterPlugin.API_static_com_greensock_plugins_DropShadowFilterPlugin = 1;
com.greensock.plugins.DropShadowFilterPlugin._propNames = ["distance","angle","color","alpha","blurX","blurY","strength","quality","inner","knockout","hideObject"];
flash.extendsClass("com.greensock.plugins.DropShadowFilterPlugin","com.greensock.plugins.FilterPlugin")
