module com {
	export module greensock {
		export module plugins {
			export class TintPlugin extends com.greensock.plugins.TweenPlugin {
				public static _props:Array<any>;
				public static API_static_com_greensock_plugins_TintPlugin:number;
				protected _transform:flash.Transform;

				public constructor()
				{
					super();
					this.propName = "tint";
					this.overwriteProps = ["tint"];
				}

				public init(start:flash.ColorTransform,end:flash.ColorTransform)
				{
					var p:string = <any>null;
					var i:number = flash.checkInt(com.greensock.plugins.TintPlugin._props.length);
					var cnt:number = flash.checkInt(this._tweens.length);
					while(i--)
					{
						p = com.greensock.plugins.TintPlugin._props[i];
						if(start[p] != end[p])
						{
							this._tweens[cnt++] = new com.greensock.core.PropTween(start,p,start[p],end[p] - start[p],"tint",false);
						}
					}
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(target,egret.DisplayObject)))
					{
						return false;
					}
					var end:flash.ColorTransform = new flash.ColorTransform();
					if(value != null && tween.vars["removeTint"] != true)
					{
						end.color = flash.tranint(value);
					}
					this._transform = (<egret.DisplayObject>(target))["transform"];
					var start:flash.ColorTransform = this._transform.colorTransform;
					end.alphaMultiplier = start.alphaMultiplier;
					end.alphaOffset = start.alphaOffset;
					this.init(start,end);
					return true;
				}

				public set changeFactor(n:number)
				{
					var ct:flash.ColorTransform = <any>null;
					var pt:com.greensock.core.PropTween = <any>null;
					var i:number = flash.checkInt(0);
					if(this._transform)
					{
						ct = this._transform.colorTransform;
						i = flash.checkInt(this._tweens.length);
						while(--i > -1)
						{
							pt = this._tweens[i];
							ct[pt.property] = pt.start + pt.change * n;
						}
						this._transform.colorTransform = ct;
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.TintPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.TintPlugin._props = ["redMultiplier","greenMultiplier","blueMultiplier","alphaMultiplier","redOffset","greenOffset","blueOffset","alphaOffset"];
com.greensock.plugins.TintPlugin.API_static_com_greensock_plugins_TintPlugin = 1;
flash.extendsClass("com.greensock.plugins.TintPlugin","com.greensock.plugins.TweenPlugin")
