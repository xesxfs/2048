module com {
	export module greensock {
		export module plugins {
			export class EndArrayPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_EndArrayPlugin:number;
				protected _a:Array<any>;
				protected _info:Array<any>;

				public constructor()
				{
					super();
					this._info = [];
					this.propName = "endArray";
					this.overwriteProps = ["endArray"];
				}

				public init(start:Array<any>,end:Array<any>)
				{
					this._a = start;
					var i:number = flash.checkInt(end.length);
					while(i--)
					{
						if(start[i] != end[i] && start[i] != null)
						{
							this._info[this._info.length] = new ArrayTweenInfo(i,this._a[i],end[i] - this._a[i]);
						}
					}
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(target,Array)) || <any>!(flash.As3is(value,Array)))
					{
						return false;
					}
					this.init(flash.As3As(target,Array),value);
					return true;
				}

				public set changeFactor(n:number)
				{
					var ti:ArrayTweenInfo = <any>null;
					var val:number = <any>NaN;
					var i:number = flash.checkInt(this._info.length);
					if(this.round)
					{
						while(i--)
						{
							ti = this._info[i];
							val = ti.start + ti.change * n;
							if(val > 0)
							{
								this._a[ti.index] = val + 0.5 >> 0;
							}
							else
							{
								this._a[ti.index] = val - 0.5 >> 0;
							}
						}
					}
					else
					{
						while(i--)
						{
							ti = this._info[i];
							this._a[ti.index] = ti.start + ti.change * n;
						}
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.EndArrayPlugin,this, "changeFactor");
		}
	
 			}

			 class ArrayTweenInfo extends egret.HashObject {
				public change:number = NaN;
				public start:number = NaN;
				public index:number = 0;

				public constructor(index:number,start:number,change:number)
				{
					super();
					index = flash.checkUint(index);
					super();
					this.index = flash.checkUint(index);
					this.start = start;
					this.change = change;
				}

			}
		}
	}
}

com.greensock.plugins.EndArrayPlugin.API_static_com_greensock_plugins_EndArrayPlugin = 1;
flash.extendsClass("com.greensock.plugins.EndArrayPlugin","com.greensock.plugins.TweenPlugin")
