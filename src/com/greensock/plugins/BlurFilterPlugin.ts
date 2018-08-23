module com {
	export module greensock {
		export module plugins {
			export class BlurFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_BlurFilterPlugin:number;
				public static _propNames:Array<any>;

				public constructor()
				{
					super();
					this.propName = "blurFilter";
					this.overwriteProps = ["blurFilter"];
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._target = target;
					this._type = flash.BlurFilter;
					this.initFilter(value,new flash.BlurFilter(0,0,flash.tranint(value.quality) || flash.tranint(2)),com.greensock.plugins.BlurFilterPlugin._propNames);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.BlurFilterPlugin.API_static_com_greensock_plugins_BlurFilterPlugin = 1;
com.greensock.plugins.BlurFilterPlugin._propNames = ["blurX","blurY","quality"];
flash.extendsClass("com.greensock.plugins.BlurFilterPlugin","com.greensock.plugins.FilterPlugin")
