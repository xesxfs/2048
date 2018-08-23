module com {
	export module greensock {
		export module plugins {
			export class GlowFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_GlowFilterPlugin:number;
				public static _propNames:Array<any>;

				public constructor()
				{
					super();
					this.propName = "glowFilter";
					this.overwriteProps = ["glowFilter"];
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._target = target;
					this._type = flash.GlowFilter;
					this.initFilter(value,new flash.GlowFilter(16777215,0,0,0,flash.trannumber(value.strength) || flash.trannumber(1),flash.tranint(value.quality) || flash.tranint(2),value.inner,value.knockout),com.greensock.plugins.GlowFilterPlugin._propNames);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.GlowFilterPlugin.API_static_com_greensock_plugins_GlowFilterPlugin = 1;
com.greensock.plugins.GlowFilterPlugin._propNames = ["color","alpha","blurX","blurY","strength","quality","inner","knockout"];
flash.extendsClass("com.greensock.plugins.GlowFilterPlugin","com.greensock.plugins.FilterPlugin")
