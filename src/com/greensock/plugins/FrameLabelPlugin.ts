module com {
	export module greensock {
		export module plugins {
			export class FrameLabelPlugin extends com.greensock.plugins.FramePlugin {
				public static API_static_com_greensock_plugins_FrameLabelPlugin:number;

				public constructor()
				{
					super();
					this.propName = "frameLabel";
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					if(flash.As3is(<any>!tween.target,egret.SwfMovie))
					{
						return false;
					}
					this._target = flash.As3As(target,egret.SwfMovie);
					this.frame = flash.checkInt(this._target.currentFrame);
					var labels:Array<any> = this._target["currentLabels"];
					var label:string = <any>value;
					var endFrame:number = flash.checkInt(this._target.currentFrame);
					var i:number = flash.checkInt(labels.length);
					while(i--)
					{
						if(labels[i].name == label)
						{
							endFrame = flash.checkInt(labels[i].frame);
							break;
						}
					}
					if(this.frame != endFrame)
					{
						this.addTween(this,"frame",this.frame,endFrame,"frame");
					}
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.FrameLabelPlugin.API_static_com_greensock_plugins_FrameLabelPlugin = 1;
flash.extendsClass("com.greensock.plugins.FrameLabelPlugin","com.greensock.plugins.FramePlugin")
