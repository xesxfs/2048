module com {
	export module greensock {
		export module plugins {
			export class AutoAlphaPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_AutoAlphaPlugin:number;
				protected _target:any;
				protected _ignoreVisible:boolean = false;

				public constructor()
				{
					super();
					this.propName = "autoAlpha";
					this.overwriteProps = ["alpha","visible"];
				}

				public killProps(lookup:any)
				{
					super.killProps(lookup);
					this._ignoreVisible = flash.Boolean("visible" in lookup);
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._target = target;
					this.addTween(target,"alpha",target["alpha"],value,"alpha");
					return true;
				}

				public set changeFactor(n:number)
				{
					this.updateTweens(n);
					if(<any>!this._ignoreVisible)
					{
						this._target["visible"] = flash.Boolean(this._target["alpha"] != 0);
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.AutoAlphaPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.AutoAlphaPlugin.API_static_com_greensock_plugins_AutoAlphaPlugin = 1;
flash.extendsClass("com.greensock.plugins.AutoAlphaPlugin","com.greensock.plugins.TweenPlugin")
