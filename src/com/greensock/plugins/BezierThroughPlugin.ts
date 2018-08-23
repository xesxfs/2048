module com {
	export module greensock {
		export module plugins {
			export class BezierThroughPlugin extends com.greensock.plugins.BezierPlugin {
				public static API_static_com_greensock_plugins_BezierThroughPlugin:number;

				public constructor()
				{
					super();
					this.propName = "bezierThrough";
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(value,Array)))
					{
						return false;
					}
					this.init(tween,flash.As3As(value,Array),true);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.BezierThroughPlugin.API_static_com_greensock_plugins_BezierThroughPlugin = 1;
flash.extendsClass("com.greensock.plugins.BezierThroughPlugin","com.greensock.plugins.BezierPlugin")
