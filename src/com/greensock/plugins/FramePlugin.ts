module com {
	export module greensock {
		export module plugins {
			export class FramePlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_FramePlugin:number;
				protected _target:egret.SwfMovie;
				public frame:number = 0;

				public constructor()
				{
					super();
					this.propName = "frame";
					this.overwriteProps = ["frame","frameLabel"];
					this.round = true;
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(target,egret.SwfMovie)) || isNaN(value))
					{
						return false;
					}
					this._target = flash.As3As(target,egret.SwfMovie);
					this.frame = flash.checkInt(this._target.currentFrame);
					this.addTween(this,"frame",this.frame,value,"frame");
					return true;
				}

				public set changeFactor(n:number)
				{
					this.updateTweens(n);
					this._target.gotoAndStop(this.frame);
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.FramePlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.FramePlugin.API_static_com_greensock_plugins_FramePlugin = 1;
flash.extendsClass("com.greensock.plugins.FramePlugin","com.greensock.plugins.TweenPlugin")
