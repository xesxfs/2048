module com {
	export module greensock {
		export module core {
			export class SimpleTimeline extends com.greensock.core.TweenCore {
				public autoRemoveChildren:boolean = false;
				protected _lastChild:com.greensock.core.TweenCore;
				protected _firstChild:com.greensock.core.TweenCore;

				public constructor(vars:any = null)
				{
					super(0,vars);
				}

				public get rawTime():number
				{
					return this.cachedTotalTime;
				}

				public insert(tween:com.greensock.core.TweenCore,time:any = 0):com.greensock.core.TweenCore
				{
					var prevTimeline:com.greensock.core.SimpleTimeline = tween.timeline;
					if(<any>!tween.cachedOrphan && prevTimeline)
					{
						prevTimeline.remove(tween,true);
					}
					tween.timeline = this;
					tween.cachedStartTime = flash.trannumber(time) + tween.delay;
					if(tween.gc)
					{
						tween.setEnabled(true,true);
					}
					if(tween.cachedPaused && prevTimeline != this)
					{
						tween.cachedPauseTime = tween.cachedStartTime + (this.rawTime - tween.cachedStartTime) / tween.cachedTimeScale;
					}
					if(this._lastChild)
					{
						this._lastChild.nextNode = tween;
					}
					else
					{
						this._firstChild = tween;
					}
					tween.prevNode = this._lastChild;
					this._lastChild = tween;
					tween.nextNode = null;
					tween.cachedOrphan = false;
					return tween;
				}

				public renderTime(time:number,suppressEvents:boolean = false,force:boolean = false)
				{
					var dur:number = <any>NaN;
					var next:com.greensock.core.TweenCore = <any>null;
					var tween:com.greensock.core.TweenCore = this._firstChild;
					this.cachedTotalTime = time;
					this.cachedTime = time;
					while(tween)
					{
						next = tween.nextNode;
						if(tween.active || time >= tween.cachedStartTime && <any>!tween.cachedPaused && <any>!tween.gc)
						{
							if(<any>!tween.cachedReversed)
							{
								tween.renderTime((time - tween.cachedStartTime) * tween.cachedTimeScale,suppressEvents,false);
							}
							else
							{
								dur = <any>!<any>!tween.cacheIsDirty?flash.trannumber(tween.totalDuration):flash.trannumber(tween.cachedTotalDuration);
								tween.renderTime(dur - (time - tween.cachedStartTime) * tween.cachedTimeScale,suppressEvents,false);
							}
						}
						tween = next;
					}
				}

				public remove(tween:com.greensock.core.TweenCore,skipDisable:boolean = false)
				{
					if(tween.cachedOrphan)
					{
						return ;
					}
					if(<any>!skipDisable)
					{
						tween.setEnabled(false,true);
					}
					if(tween.nextNode)
					{
						tween.nextNode.prevNode = tween.prevNode;
					}
					else if(this._lastChild == tween)
					{
						this._lastChild = tween.prevNode;
					}
					if(tween.prevNode)
					{
						tween.prevNode.nextNode = tween.nextNode;
					}
					else if(this._firstChild == tween)
					{
						this._firstChild = tween.nextNode;
					}
					tween.cachedOrphan = true;
				}

			}
		}
	}
}

flash.extendsClass("com.greensock.core.SimpleTimeline","com.greensock.core.TweenCore")
