module com {
	export module greensock {
		export module core {
			export class TweenCore extends egret.HashObject {
				public static version:number;
				public static _classInitted:boolean = false;
				public initted:boolean = false;
				protected _hasUpdate:boolean = false;
				public active:boolean = false;
				protected _delay:number = NaN;
				public cachedReversed:boolean = false;
				public nextNode:com.greensock.core.TweenCore;
				public cachedTime:number = NaN;
				protected _rawPrevTime:number = -1;
				public vars:any;
				public cachedTotalTime:number = NaN;
				public data:any;
				public timeline:com.greensock.core.SimpleTimeline;
				public cachedOrphan:boolean = false;
				public cachedStartTime:number = NaN;
				public prevNode:com.greensock.core.TweenCore;
				public cachedDuration:number = NaN;
				public gc:boolean = false;
				public cachedPauseTime:number = NaN;
				public cacheIsDirty:boolean = false;
				public cachedPaused:boolean = false;
				public cachedTimeScale:number = NaN;
				public cachedTotalDuration:number = NaN;

				public constructor(duration:number = 0,vars:any = null)
				{
					super();
					super();
					this.vars = vars != null?vars:{};
					if(this.vars["isGSVars"])
					{
						this.vars = this.vars["vars"];
					}
					this.cachedDuration = this.cachedTotalDuration = duration;
					this._delay = flash.Boolean(this.vars["delay"])?flash.trannumber(flash.trannumber(this.vars["delay"])):flash.trannumber(0);
					this.cachedTimeScale = flash.Boolean(this.vars["timeScale"])?flash.trannumber(flash.trannumber(this.vars["timeScale"])):flash.trannumber(1);
					this.active = flash.Boolean(duration == 0 && this._delay == 0 && this.vars["immediateRender"] != false);
					this.cachedTotalTime = this.cachedTime = 0;
					this.data = this.vars["data"];
					if(<any>!com.greensock.core.TweenCore._classInitted)
					{
						if(isNaN(com.greensock.TweenLite.rootFrame))
						{
							com.greensock.TweenLite.initClass();
							com.greensock.core.TweenCore._classInitted = true;
						}
						else
						{
							return ;
						}
					}
					var tl:com.greensock.core.SimpleTimeline = <any>flash.As3is(this.vars["timeline"],com.greensock.core.SimpleTimeline)?this.vars["timeline"]:flash.Boolean(this.vars["useFrames"])?com.greensock.TweenLite.rootFramesTimeline:com.greensock.TweenLite.rootTimeline;
					tl.insert(this,tl.cachedTotalTime);
					if(this.vars["reversed"])
					{
						this.cachedReversed = true;
					}
					if(this.vars["paused"])
					{
						this.paused = true;
					}
				}

				public renderTime(time:number,suppressEvents:boolean = false,force:boolean = false)
				{
				}

				public get delay():number
				{
					return this._delay;
				}

				public get duration():number
				{
					return this.cachedDuration;
				}

				public set reversed(b:boolean)
				{
					if(b != this.cachedReversed)
					{
						this.cachedReversed = b;
						this.setTotalTime(this.cachedTotalTime,true);
					}
				}

				public set startTime(n:number)
				{
					if(this.timeline != null && (n != this.cachedStartTime || this.gc))
					{
						this.timeline.insert(this,n - this._delay);
					}
					else
					{
						this.cachedStartTime = n;
					}
				}

				public restart(includeDelay:boolean = false,suppressEvents:boolean = true)
				{
					this.reversed = false;
					this.paused = false;
					this.setTotalTime(<any>!<any>!includeDelay?flash.trannumber(-this._delay):flash.trannumber(0),suppressEvents);
				}

				public set delay(n:number)
				{
					this.startTime = this.startTime + (n - this._delay);
					this._delay = n;
				}

				public resume()
				{
					this.paused = false;
				}

				public get paused():boolean
				{
					return this.cachedPaused;
				}

				public play()
				{
					this.reversed = false;
					this.paused = false;
				}

				public set duration(n:number)
				{
					var ratio:number = n / this.cachedDuration;
					this.cachedDuration = this.cachedTotalDuration = n;
					this.setDirtyCache(true);
					if(this.active && <any>!this.cachedPaused && n != 0)
					{
						this.setTotalTime(this.cachedTotalTime * ratio,true);
					}
				}

				public invalidate()
				{
				}

				public complete(skipRender:boolean = false,suppressEvents:boolean = false)
				{
					if(<any>!skipRender)
					{
						this.renderTime(this.totalDuration,suppressEvents,false);
						return ;
					}
					if(this.timeline.autoRemoveChildren)
					{
						this.setEnabled(false,false);
					}
					else
					{
						this.active = false;
					}
					if(<any>!suppressEvents)
					{
						if(this.vars["onComplete"] && this.cachedTotalTime >= this.cachedTotalDuration && <any>!this.cachedReversed)
						{
							this.vars["onComplete"].apply(null,this.vars["onCompleteParams"]);
						}
						else if(this.cachedReversed && this.cachedTotalTime == 0 && this.vars["onReverseComplete"])
						{
							this.vars["onReverseComplete"].apply(null,this.vars["onReverseCompleteParams"]);
						}
					}
				}

				public get totalTime():number
				{
					return this.cachedTotalTime;
				}

				public get startTime():number
				{
					return this.cachedStartTime;
				}

				public get reversed():boolean
				{
					return this.cachedReversed;
				}

				public set currentTime(n:number)
				{
					this.setTotalTime(n,false);
				}

				protected setDirtyCache(includeSelf:boolean = true)
				{
					var tween:com.greensock.core.TweenCore = <any><any>!<any>!includeSelf?this:this.timeline;
					while(tween)
					{
						tween.cacheIsDirty = true;
						tween = tween.timeline;
					}
				}

				public reverse(forceResume:boolean = true)
				{
					this.reversed = true;
					if(forceResume)
					{
						this.paused = false;
					}
					else if(this.gc)
					{
						this.setEnabled(true,false);
					}
				}

				public set paused(b:boolean)
				{
					if(b != this.cachedPaused && this.timeline)
					{
						if(b)
						{
							this.cachedPauseTime = this.timeline.rawTime;
						}
						else
						{
							this.cachedStartTime = this.cachedStartTime + (this.timeline.rawTime - this.cachedPauseTime);
							this.cachedPauseTime = NaN;
							this.setDirtyCache(false);
						}
						this.cachedPaused = b;
						this.active = flash.Boolean(<any>!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
					}
					if(<any>!b && this.gc)
					{
						this.setEnabled(true,false);
					}
				}

				public kill()
				{
					this.setEnabled(false,false);
				}

				public set totalTime(n:number)
				{
					this.setTotalTime(n,false);
				}

				public get currentTime():number
				{
					return this.cachedTime;
				}

				protected setTotalTime(time:number,suppressEvents:boolean = false)
				{
					var tlTime:number = <any>NaN;
					var dur:number = <any>NaN;
					if(this.timeline)
					{
						tlTime = <any>!<any>!this.cachedPaused?flash.trannumber(this.cachedPauseTime):flash.trannumber(this.timeline.cachedTotalTime);
						if(this.cachedReversed)
						{
							dur = <any>!<any>!this.cacheIsDirty?flash.trannumber(this.totalDuration):flash.trannumber(this.cachedTotalDuration);
							this.cachedStartTime = tlTime - (dur - time) / this.cachedTimeScale;
						}
						else
						{
							this.cachedStartTime = tlTime - time / this.cachedTimeScale;
						}
						if(<any>!this.timeline.cacheIsDirty)
						{
							this.setDirtyCache(false);
						}
						if(this.cachedTotalTime != time)
						{
							this.renderTime(time,suppressEvents,false);
						}
					}
				}

				public pause()
				{
					this.paused = true;
				}

				public set totalDuration(n:number)
				{
					this.duration = n;
				}

				public get totalDuration():number
				{
					return this.cachedTotalDuration;
				}

				public setEnabled(enabled:boolean,ignoreTimeline:boolean = false):boolean
				{
					this.gc = <any>!enabled;
					if(enabled)
					{
						this.active = flash.Boolean(<any>!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
						if(<any>!ignoreTimeline && this.cachedOrphan)
						{
							this.timeline.insert(this,this.cachedStartTime - this._delay);
						}
					}
					else
					{
						this.active = false;
						if(<any>!ignoreTimeline && <any>!this.cachedOrphan)
						{
							this.timeline.remove(this,true);
						}
					}
					return false;
				}

			}
		}
	}
}

com.greensock.core.TweenCore.version = 1.693;
