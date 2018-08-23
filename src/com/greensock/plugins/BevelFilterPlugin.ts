module com {
	export module greensock {
		export module plugins {
			export class BevelFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_BevelFilterPlugin:number;
				public static _propNames:Array<any>;

				public constructor()
				{
					super();
					this.propName = "bevelFilter";
					this.overwriteProps = ["bevelFilter"];
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._target = target;
					this._type = flash.BevelFilter;
					this.initFilter(value,new flash.BevelFilter(0,0,16777215,0.5,0,0.5,2,2,0,flash.tranint(value.quality) || flash.tranint(2)),com.greensock.plugins.BevelFilterPlugin._propNames);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.BevelFilterPlugin.API_static_com_greensock_plugins_BevelFilterPlugin = 1;
com.greensock.plugins.BevelFilterPlugin._propNames = ["distance","angle","highlightColor","highlightAlpha","shadowColor","shadowAlpha","blurX","blurY","strength","quality"];
flash.extendsClass("com.greensock.plugins.BevelFilterPlugin","com.greensock.plugins.FilterPlugin")
