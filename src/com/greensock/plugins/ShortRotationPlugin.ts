module com {
	export module greensock {
		export module plugins {
			export class ShortRotationPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_ShortRotationPlugin:number;

				public constructor()
				{
					super();
					this.propName = "shortRotation";
					this.overwriteProps = [];
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					var p:any = null;
					if(typeof value == "number")
					{
						return false;
					}
					var useRadians:boolean = flash.Boolean(value.useRadians == true);
					for(p in value)
					{
						if(p != "useRadians")
						{
							this.initRotation(target,p,target[p],typeof value[p] == "number"?flash.trannumber(flash.trannumber(value[p])):flash.trannumber(target[p] + flash.trannumber(value[p])),useRadians);
						}
					}
					return true;
				}

				public initRotation(target:any,propName:string,start:number,end:number,useRadians:boolean = false)
				{
					var cap:number = <any><any>!<any>!useRadians?flash.trannumber(Math.PI * 2):flash.trannumber(360);
					var dif:number = (end - start) % cap;
					if(dif != dif % (cap / 2))
					{
						dif = dif < 0?flash.trannumber(dif + cap):flash.trannumber(dif - cap);
					}
					this.addTween(target,propName,start,start + dif,propName);
					this.overwriteProps[this.overwriteProps.length] = propName;
				}

			}
		}
	}
}

com.greensock.plugins.ShortRotationPlugin.API_static_com_greensock_plugins_ShortRotationPlugin = 1;
flash.extendsClass("com.greensock.plugins.ShortRotationPlugin","com.greensock.plugins.TweenPlugin")
