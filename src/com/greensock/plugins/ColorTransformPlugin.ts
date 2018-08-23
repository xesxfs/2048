module com {
	export module greensock {
		export module plugins {
			export class ColorTransformPlugin extends com.greensock.plugins.TintPlugin {
				public static API_static_com_greensock_plugins_ColorTransformPlugin:number;

				public constructor()
				{
					super();
					this.propName = "colorTransform";
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					var start:flash.ColorTransform = <any>null;
					var p:any = null;
					var ratio:number = <any>NaN;
					var end:flash.ColorTransform = new flash.ColorTransform();
					if(flash.As3is(target,egret.DisplayObject))
					{
						this._transform = (<egret.DisplayObject>(target))["transform"];
						start = this._transform.colorTransform;
					}
					else if(flash.As3is(target,flash.ColorTransform))
					{
						start = flash.As3As(target,flash.ColorTransform);
					}
					else
					{
						return false;
					}
					end.concat(start);
					for(p in value)
					{
						if(p == "tint" || p == "color")
						{
							if(value[p] != null)
							{
								end.color = flash.tranint(value[p]);
							}
						}
						else if(<any>!(p == "tintAmount" || p == "exposure" || p == "brightness"))
						{
							end[p] = value[p];
						}
					}
					if(<any>!isNaN(value.tintAmount))
					{
						ratio = value.tintAmount / (1 - (end.redMultiplier + end.greenMultiplier + end.blueMultiplier) / 3);
						end.redOffset = end.redOffset * ratio;
						end.greenOffset = end.greenOffset * ratio;
						end.blueOffset = end.blueOffset * ratio;
						end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1 - value.tintAmount;
					}
					else if(<any>!isNaN(value.exposure))
					{
						end.redOffset = end.greenOffset = end.blueOffset = 255 * (value.exposure - 1);
						end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1;
					}
					else if(<any>!isNaN(value.brightness))
					{
						end.redOffset = end.greenOffset = end.blueOffset = Math.max(0,(value.brightness - 1) * 255);
						end.redMultiplier = end.greenMultiplier = end.blueMultiplier = 1 - Math.abs(value.brightness - 1);
					}
					this.init(start,end);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.ColorTransformPlugin.API_static_com_greensock_plugins_ColorTransformPlugin = 1;
flash.extendsClass("com.greensock.plugins.ColorTransformPlugin","com.greensock.plugins.TintPlugin")
