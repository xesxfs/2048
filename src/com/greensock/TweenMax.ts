module com {
	export module greensock {
		export class TweenMax extends com.greensock.TweenLite implements egret.IEventDispatcher {
			public static _overwriteMode:number;
			public static version_static_com_greensock_TweenMax:number;
			public static killTweensOf_static_com_greensock_TweenMax:Function;
			public static killDelayedCallsTo_static_com_greensock_TweenMax:Function;
			protected _cyclesComplete:number = 0;
			protected _dispatcher:egret.EventDispatcher;
			protected _hasUpdateListener:boolean = false;
			protected _easeType:number = 0;
			protected _repeatDelay:number = 0;
			public yoyo:boolean = false;
			protected _easePower:number = 0;
			protected _repeat:number = 0;

			public constructor(target:any,duration:number,vars:any)
			{
				super(target,duration,vars);
				if(com.greensock.TweenLite.version_static_com_greensock_TweenLite < 11.2)
				{
					throw new flash.Error("TweenMax error! Please update your TweenLite class or try deleting your ASO files. TweenMax requires a more recent version. Download updates at http://www.TweenMax.com.").message;
				}
				this.yoyo = flash.Boolean(this.vars["yoyo"]);
				this._repeat = flash.checkInt(flash.tranint(this.vars["repeat"]));
				this._repeatDelay = flash.Boolean(this.vars["repeatDelay"])?flash.trannumber(flash.trannumber(this.vars["repeatDelay"])):flash.trannumber(0);
				this.cacheIsDirty = true;
				if(this.vars["onCompleteListener"] || this.vars["onInitListener"] || this.vars["onUpdateListener"] || this.vars["onStartListener"] || this.vars["onRepeatListener"] || this.vars["onReverseCompleteListener"])
				{
					this.initDispatcher();
					if(duration == 0 && this._delay == 0)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.UPDATE));
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent));
					}
				}
				if(this.vars["timeScale"] && <any>!(flash.As3is(this.target,com.greensock.core.TweenCore)))
				{
					this.cachedTimeScale = this.vars["timeScale"];
				}
			}

			public static set globalTimeScale(n:number)
			{
				if(n == 0)
				{
					n = 0.0001;
				}
				if(com.greensock.TweenLite.rootTimeline == null)
				{
					com.greensock.TweenLite.to({},0,{});
				}
				var tl:com.greensock.core.SimpleTimeline = com.greensock.TweenLite.rootTimeline;
				var curTime:number = egret.getTimer() * 0.001;
				tl.cachedStartTime = curTime - (curTime - tl.cachedStartTime) * tl.cachedTimeScale / n;
				tl = com.greensock.TweenLite.rootFramesTimeline;
				curTime = com.greensock.TweenLite.rootFrame;
				tl.cachedStartTime = curTime - (curTime - tl.cachedStartTime) * tl.cachedTimeScale / n;
				com.greensock.TweenLite.rootFramesTimeline.cachedTimeScale = com.greensock.TweenLite.rootTimeline.cachedTimeScale = n;
			}

			public static fromTo(target:any,duration:number,fromVars:any,toVars:any):com.greensock.TweenMax
			{
				if(toVars["isGSVars"])
				{
					toVars = toVars["vars"];
				}
				if(fromVars["isGSVars"])
				{
					fromVars = fromVars["vars"];
				}
				toVars["startAt"] = fromVars;
				if(fromVars["immediateRender"])
				{
					toVars["immediateRender"] = true;
				}
				return new com.greensock.TweenMax(target,duration,toVars);
			}

			public static allFromTo(targets:Array<any>,duration:number,fromVars:any,toVars:any,stagger:number = 0,onCompleteAll:Function = null,onCompleteAllParams:Array<any> = null):Array<any>
			{
				if(toVars["isGSVars"])
				{
					toVars = toVars["vars"];
				}
				if(fromVars["isGSVars"])
				{
					fromVars = fromVars["vars"];
				}
				toVars["startAt"] = fromVars;
				if(fromVars["immediateRender"])
				{
					toVars["immediateRender"] = true;
				}
				return com.greensock.TweenMax.allTo(targets,duration,toVars,stagger,onCompleteAll,onCompleteAllParams);
			}

			public static pauseAll(tweens:boolean = true,delayedCalls:boolean = true)
			{
				com.greensock.TweenMax.changePause(true,tweens,delayedCalls);
			}

			public static getTweensOf(target:any):Array<any>
			{
				var i:number = flash.checkInt(0);
				var cnt:number = flash.checkInt(0);
				var a:Array<any> = <any>com.greensock.TweenLite.masterList.getItem(target);
				var toReturn:Array<any> = [];
				if(a)
				{
					i = flash.checkInt(a.length);
					cnt = flash.checkInt(0);
					while(--i > -1)
					{
						if(<any>!(<com.greensock.TweenLite>(a[i])).gc)
						{
							toReturn[cnt++] = a[i];
						}
					}
				}
				return toReturn;
			}

			public static get globalTimeScale():number
			{
				return com.greensock.TweenLite.rootTimeline == null?flash.trannumber(1):flash.trannumber(com.greensock.TweenLite.rootTimeline.cachedTimeScale);
			}

			public static killChildTweensOf(parent:egret.DisplayObjectContainer,complete:boolean = false)
			{
				var curTarget:any = <any>null;
				var curParent:egret.DisplayObjectContainer = <any>null;
				var a:Array<any> = com.greensock.TweenMax.getAllTweens();
				var i:number = flash.checkInt(a.length);
				while(--i > -1)
				{
					curTarget = a[i].target;
					if(flash.As3is(curTarget,egret.DisplayObject))
					{
						curParent = curTarget["parent"];
						while(curParent)
						{
							if(curParent == parent)
							{
								if(complete)
								{
									a[i].complete(false);
								}
								else
								{
									a[i].setEnabled(false,false);
								}
							}
							curParent = curParent.parent;
						}
						continue;
					}
				}
			}

			public static delayedCall_static_com_greensock_TweenMax(delay:number,onComplete:Function,onCompleteParams:Array<any> = null,useFrames:boolean = false):com.greensock.TweenMax
			{
				return new com.greensock.TweenMax(onComplete,0,{"delay":delay,"onComplete":onComplete,"onCompleteParams":onCompleteParams,"immediateRender":false,"useFrames":useFrames,"overwrite":0});
			}

			public static isTweening(target:any):boolean
			{
				var tween:com.greensock.TweenLite = <any>null;
				var a:Array<any> = com.greensock.TweenMax.getTweensOf(target);
				var i:number = flash.checkInt(a.length);
				while(--i > -1)
				{
					tween = a[i];
					if(tween.active || tween.cachedStartTime == tween.timeline.cachedTime && tween.timeline.active)
					{
						return true;
					}
				}
				return false;
			}

			public static killAll(complete:boolean = false,tweens:boolean = true,delayedCalls:boolean = true)
			{
				var isDC:boolean = <any>false;
				var a:Array<any> = com.greensock.TweenMax.getAllTweens();
				var i:number = flash.checkInt(a.length);
				while(--i > -1)
				{
					isDC = a[i].target == a[i].vars.onComplete;
					if(isDC == delayedCalls || isDC != tweens)
					{
						if(complete)
						{
							a[i].complete(false);
						}
						else
						{
							a[i].setEnabled(false,false);
						}
					}
				}
			}

			private static changePause(pause:boolean,tweens:boolean = true,delayedCalls:boolean = false)
			{
				var isDC:boolean = <any>false;
				var a:Array<any> = com.greensock.TweenMax.getAllTweens();
				var i:number = flash.checkInt(a.length);
				while(--i > -1)
				{
					isDC = (<com.greensock.TweenLite>(a[i])).target == (<com.greensock.TweenLite>(a[i])).vars["onComplete"];
					if(isDC == delayedCalls || isDC != tweens)
					{
						(<com.greensock.core.TweenCore>(a[i])).paused = pause;
					}
				}
			}

			public static from_static_com_greensock_TweenMax(target:any,duration:number,vars:any):com.greensock.TweenMax
			{
				if(vars["isGSVars"])
				{
					vars = vars["vars"];
				}
				vars["runBackwards"] = true;
				if(<any>!("immediateRender" in vars))
				{
					vars["immediateRender"] = true;
				}
				return new com.greensock.TweenMax(target,duration,vars);
			}

			public static allFrom(targets:Array<any>,duration:number,vars:any,stagger:number = 0,onCompleteAll:Function = null,onCompleteAllParams:Array<any> = null):Array<any>
			{
				if(vars["isGSVars"])
				{
					vars = vars["vars"];
				}
				vars["runBackwards"] = true;
				if(<any>!("immediateRender" in vars))
				{
					vars["immediateRender"] = true;
				}
				return com.greensock.TweenMax.allTo(targets,duration,vars,stagger,onCompleteAll,onCompleteAllParams);
			}

			public static getAllTweens():Array<any>
			{
				var a:Array<any> = <any>null;
				var i:number = flash.checkInt(0);
				var ml:flash.Dictionary = com.greensock.TweenLite.masterList;
				var cnt:number = flash.checkInt(0);
				var toReturn:Array<any> = [];
				var a_key_a;
				for(a_key_a in ml.map)
				{
					a = ml.map[a_key_a][1];
					i = flash.checkInt(a.length);
					while(--i > -1)
					{
						if(<any>!(<com.greensock.TweenLite>(a[i])).gc)
						{
							toReturn[cnt++] = a[i];
						}
					}
				}
				return toReturn;
			}

			public static resumeAll(tweens:boolean = true,delayedCalls:boolean = true)
			{
				com.greensock.TweenMax.changePause(false,tweens,delayedCalls);
			}

			public static to_static_com_greensock_TweenMax(target:any,duration:number,vars:any):com.greensock.TweenMax
			{
				return new com.greensock.TweenMax(target,duration,vars);
			}

			public static allTo(targets:Array<any>,duration:number,vars:any,stagger:number = 0,onCompleteAll:Function = null,onCompleteAllParams:Array<any> = null):Array<any>
			{
				var i:number = flash.checkInt(0);
				var varsDup:any = <any>null;
				var p:string = <any>null;
				var onCompleteProxy:Function = <any>null;
				var onCompleteParamsProxy:Array<any> = <any>null;
				var l:number = flash.checkInt(targets.length);
				var a:Array<any> = [];
				if(vars["isGSVars"])
				{
					var vars:any = <any>vars["vars"];
				}
				var curDelay:number = <any>"delay" in vars?flash.trannumber(flash.trannumber(vars["delay"])):flash.trannumber(0);
				onCompleteProxy = vars["onComplete"];
				onCompleteParamsProxy = vars["onCompleteParams"];
				var lastIndex:number = flash.checkInt(l - 1);
				for(i = flash.checkInt(0); i < l; i = flash.checkInt(i + 1))
				{
					varsDup = {};
					for(p in vars)
					{
						varsDup[p] = vars[p];
					}
					varsDup["delay"] = curDelay;
					if(i == lastIndex && onCompleteAll != null)
					{
						varsDup["onComplete"] = function ()
						{
							if(onCompleteProxy != null)
							{
								onCompleteProxy.apply(null,onCompleteParamsProxy);
							}
							onCompleteAll.apply(null,onCompleteAllParams);
						};
					}
					a[i] = new com.greensock.TweenMax(targets[i],duration,varsDup);
					curDelay = curDelay + stagger;
				}
				return a;
			}

			public dispatchEvent(e:egret.Event):boolean
			{
				return this._dispatcher == null?flash.Boolean(false):flash.Boolean(this._dispatcher.dispatchEvent(e));
			}

			public set timeScale(n:number)
			{
				if(n == 0)
				{
					n = 0.0001;
				}
				var tlTime:number = <any>this.cachedPauseTime || this.cachedPauseTime == 0?flash.trannumber(this.cachedPauseTime):flash.trannumber(this.timeline.cachedTotalTime);
				this.cachedStartTime = tlTime - (tlTime - this.cachedStartTime) * this.cachedTimeScale / n;
				this.cachedTimeScale = n;
				this.setDirtyCache(false);
			}

			public renderTime(time:number,suppressEvents:boolean = false,force:boolean = false)
			{
				var isComplete:boolean = <any>false;
				var repeated:boolean = <any>false;
				var setRatio:boolean = <any>false;
				var cycleDuration:number = <any>NaN;
				var prevCycles:number = flash.checkInt(0);
				var power:number = flash.checkInt(0);
				var val:number = <any>NaN;
				var totalDur:number = <any><any>!<any>!this.cacheIsDirty?flash.trannumber(this.totalDuration):flash.trannumber(this.cachedTotalDuration);
				var prevTime:number = this.cachedTime;
				var prevTotalTime:number = this.cachedTotalTime;
				if(time >= totalDur)
				{
					this.cachedTotalTime = totalDur;
					this.cachedTime = this.cachedDuration;
					this.ratio = 1;
					isComplete = <any>!this.cachedReversed;
					if(this.cachedDuration == 0)
					{
						if((time == 0 || this._rawPrevTime < 0) && this._rawPrevTime != time)
						{
							force = true;
						}
						this._rawPrevTime = time;
					}
				}
				else if(time <= 0)
				{
					if(time < 0)
					{
						this.active = false;
						if(this.cachedDuration == 0)
						{
							if(this._rawPrevTime > 0)
							{
								force = true;
								isComplete = true;
							}
							this._rawPrevTime = time;
						}
					}
					else if(time == 0 && <any>!this.initted)
					{
						force = true;
					}
					this.cachedTotalTime = this.cachedTime = this.ratio = 0;
					if(this.cachedReversed && prevTotalTime != 0)
					{
						isComplete = true;
					}
				}
				else
				{
					this.cachedTotalTime = this.cachedTime = time;
					setRatio = true;
				}
				if(this._repeat != 0)
				{
					cycleDuration = this.cachedDuration + this._repeatDelay;
					prevCycles = flash.checkInt(this._cyclesComplete);
					if((this._cyclesComplete = flash.checkInt(this.cachedTotalTime / cycleDuration >> 0)) == this.cachedTotalTime / cycleDuration && this._cyclesComplete != 0)
					{
						this._cyclesComplete--;
					}
					repeated = flash.Boolean(prevCycles != this._cyclesComplete);
					if(isComplete)
					{
						if(this.yoyo && this._repeat % 2)
						{
							this.cachedTime = this.ratio = 0;
						}
					}
					else if(time > 0)
					{
						this.cachedTime = this.cachedTotalTime - this._cyclesComplete * cycleDuration;
						if(this.yoyo && this._cyclesComplete % 2)
						{
							this.cachedTime = this.cachedDuration - this.cachedTime;
						}
						else if(this.cachedTime >= this.cachedDuration)
						{
							this.cachedTime = this.cachedDuration;
							this.ratio = 1;
							setRatio = false;
						}
						if(this.cachedTime <= 0)
						{
							this.cachedTime = this.ratio = 0;
							setRatio = false;
						}
					}
					else
					{
						this._cyclesComplete = flash.checkInt(0);
					}
				}
				if(prevTime == this.cachedTime && <any>!force)
				{
					return ;
				}
				if(<any>!this.initted)
				{
					this.init();
				}
				if(<any>!this.active && <any>!this.cachedPaused)
				{
					this.active = true;
				}
				if(setRatio)
				{
					if(this._easeType)
					{
						power = flash.checkInt(this._easePower);
						val = this.cachedTime / this.cachedDuration;
						if(this._easeType == 2)
						{
							this.ratio = val = 1 - val;
							while(--power > -1)
							{
								this.ratio = val * this.ratio;
							}
							this.ratio = 1 - this.ratio;
						}
						else if(this._easeType == 1)
						{
							this.ratio = val;
							while(--power > -1)
							{
								this.ratio = val * this.ratio;
							}
						}
						else if(val < 0.5)
						{
							this.ratio = val = val * 2;
							while(--power > -1)
							{
								this.ratio = val * this.ratio;
							}
							this.ratio = this.ratio * 0.5;
						}
						else
						{
							this.ratio = val = (1 - val) * 2;
							while(--power > -1)
							{
								this.ratio = val * this.ratio;
							}
							this.ratio = 1 - 0.5 * this.ratio;
						}
					}
					else
					{
						this.ratio = this._ease(this.cachedTime,0,1,this.cachedDuration);
					}
				}
				if(prevTotalTime == 0 && (this.cachedTotalTime != 0 || this.cachedDuration == 0) && <any>!suppressEvents)
				{
					if(this.vars["onStart"])
					{
						this.vars["onStart"].apply(null,this.vars["onStartParams"]);
					}
					if(this._dispatcher)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.START));
					}
				}
				var pt:com.greensock.core.PropTween = this.cachedPT1;
				while(pt)
				{
					pt.target[pt.property] = pt.start + this.ratio * pt.change;
					pt = pt.nextNode;
				}
				if(this._hasUpdate && <any>!suppressEvents)
				{
					this.vars["onUpdate"].apply(null,this.vars["onUpdateParams"]);
				}
				if(this._hasUpdateListener && <any>!suppressEvents)
				{
					this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.UPDATE));
				}
				if(repeated && <any>!suppressEvents && <any>!this.gc)
				{
					if(this.vars["onRepeat"])
					{
						this.vars["onRepeat"].apply(null,this.vars["onRepeatParams"]);
					}
					if(this._dispatcher)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.REPEAT));
					}
				}
				if(isComplete && <any>!this.gc)
				{
					if(this._hasPlugins && this.cachedPT1)
					{
						com.greensock.TweenLite.onPluginEvent("onComplete",this);
					}
					this.complete(true,suppressEvents);
				}
			}

			public set totalDuration(n:number)
			{
				if(this._repeat == -1)
				{
					return ;
				}
				this.duration = (n - this._repeat * this._repeatDelay) / (this._repeat + 1);
			}

			public addEventListener(type:string,listener:Function,thisObject:any,useCapture:boolean = false,priority:number = 0,useWeakReference:boolean = false)
			{
				if(this._dispatcher == null)
				{
					this.initDispatcher();
				}
				if(type == com.greensock.events.TweenEvent.UPDATE)
				{
					this._hasUpdateListener = true;
				}
				this._dispatcher.addEventListener(type,listener,null,useCapture,priority);
			}

			protected init()
			{
				var startTween:com.greensock.TweenMax = <any>null;
				if(this.vars["startAt"])
				{
					this.vars["startAt"].overwrite = 0;
					this.vars["startAt"].immediateRender = true;
					startTween = new com.greensock.TweenMax(this.target,0,this.vars["startAt"]);
				}
				if(this._dispatcher)
				{
					this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent));
				}
				super.init();
				if(this._ease in com.greensock.TweenLite.fastEaseLookup)
				{
					this._easeType = flash.checkInt(com.greensock.TweenLite.fastEaseLookup.getItem(this._ease)[0]);
					this._easePower = flash.checkInt(com.greensock.TweenLite.fastEaseLookup.getItem(this._ease)[1]);
				}
			}

			public removeEventListener(type:string,listener:Function,thisObject:any,useCapture:boolean = false)
			{
				if(this._dispatcher)
				{
					this._dispatcher.removeEventListener(type,listener,null,useCapture);
				}
			}

			public setDestination(property:string,value:any,adjustStartValues:boolean = true)
			{
				var vars:any = {};
				vars[property] = value;
				this.updateTo(vars,<any>!adjustStartValues);
			}

			public willTrigger(type:string):boolean
			{
				return this._dispatcher == null?flash.Boolean(false):flash.Boolean(this._dispatcher.willTrigger(type));
			}

			public hasEventListener(type:string):boolean
			{
				return this._dispatcher == null?flash.Boolean(false):flash.Boolean(this._dispatcher.hasEventListener(type));
			}

			protected initDispatcher()
			{
				if(this._dispatcher == null)
				{
					this._dispatcher = new egret.EventDispatcher(<any>this);
				}
				if(flash.As3is(this.vars["onInitListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent,this.vars["onInitListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onStartListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.START,this.vars["onStartListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onUpdateListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.UPDATE,this.vars["onUpdateListener"],null,false,0);
					this._hasUpdateListener = true;
				}
				if(flash.As3is(this.vars["onCompleteListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent,this.vars["onCompleteListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onRepeatListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.REPEAT,this.vars["onRepeatListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onReverseCompleteListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.REVERSE_COMPLETE,this.vars["onReverseCompleteListener"],null,false,0);
				}
			}

			public set currentProgress(n:number)
			{
				if(this._cyclesComplete == 0)
				{
					this.setTotalTime(this.duration * n,false);
				}
				else
				{
					this.setTotalTime(this.duration * n + this._cyclesComplete * this.cachedDuration,false);
				}
			}

			public get totalProgress():number
			{
				return this.cachedTotalTime / this.totalDuration;
			}

			public set totalProgress(n:number)
			{
				this.setTotalTime(this.totalDuration * n,false);
			}

			public updateTo(vars:any,resetDuration:boolean = false)
			{
				var p:any = null;
				var prevTime:number = <any>NaN;
				var inv:number = <any>NaN;
				var pt:com.greensock.core.PropTween = <any>null;
				var endValue:number = <any>NaN;
				var curRatio:number = this.ratio;
				if(resetDuration && this.timeline != null && this.cachedStartTime < this.timeline.cachedTime)
				{
					this.cachedStartTime = this.timeline.cachedTime;
					this.setDirtyCache(false);
					if(this.gc)
					{
						this.setEnabled(true,false);
					}
					else
					{
						this.timeline.insert(this,this.cachedStartTime - this._delay);
					}
				}
				for(p in vars)
				{
					this.vars[p] = vars[p];
				}
				if(this.initted)
				{
					if(resetDuration)
					{
						this.initted = false;
					}
					else
					{
						if(this._notifyPluginsOfEnabled && this.cachedPT1)
						{
							com.greensock.TweenLite.onPluginEvent("onDisable",this);
						}
						if(this.cachedTime / this.cachedDuration > 0.998)
						{
							prevTime = this.cachedTime;
							this.renderTime(0,true,false);
							this.initted = false;
							this.renderTime(prevTime,true,false);
						}
						else if(this.cachedTime > 0)
						{
							this.initted = false;
							this.init();
							inv = 1 / (1 - curRatio);
							pt = this.cachedPT1;
							while(pt)
							{
								endValue = pt.start + pt.change;
								pt.change = pt.change * inv;
								pt.start = endValue - pt.change;
								pt = pt.nextNode;
							}
						}
					}
				}
			}

			public get currentProgress():number
			{
				return this.cachedTime / this.duration;
			}

			public get repeat():number
			{
				return this._repeat;
			}

			public set currentTime(n:number)
			{
				if(this._cyclesComplete != 0)
				{
					if(this.yoyo && this._cyclesComplete % 2 == 1)
					{
						n = this.duration - n + this._cyclesComplete * (this.cachedDuration + this._repeatDelay);
					}
					else
					{
						n = n + this._cyclesComplete * (this.duration + this._repeatDelay);
					}
				}
				this.setTotalTime(n,false);
			}

			public get repeatDelay():number
			{
				return this._repeatDelay;
			}

			public killProperties(names:Array<any>)
			{
				var v:any = {};
				var i:number = flash.checkInt(names.length);
				while(--i > -1)
				{
					v[names[i]] = true;
				}
				this.killVars(v);
			}

			public set repeatDelay(n:number)
			{
				this._repeatDelay = n;
				this.setDirtyCache(true);
			}

			public set repeat(n:number)
			{
				n = flash.checkInt(n);
				this._repeat = flash.checkInt(n);
				this.setDirtyCache(true);
			}

			public complete(skipRender:boolean = false,suppressEvents:boolean = false)
			{
				super.complete(skipRender,suppressEvents);
				if(<any>!suppressEvents && this._dispatcher)
				{
					if(this.cachedTotalTime == this.cachedTotalDuration && <any>!this.cachedReversed)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent));
					}
					else if(this.cachedReversed && this.cachedTotalTime == 0)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.REVERSE_COMPLETE));
					}
				}
			}

			public invalidate()
			{
				this.yoyo = flash.Boolean(this.vars["yoyo"] == true);
				this._repeat = flash.checkInt(flash.Boolean(this.vars["repeat"])?flash.tranint(flash.trannumber(this.vars["repeat"])):flash.tranint(0));
				this._repeatDelay = flash.Boolean(this.vars["repeatDelay"])?flash.trannumber(flash.trannumber(this.vars["repeatDelay"])):flash.trannumber(0);
				this._hasUpdateListener = false;
				if(this.vars["onCompleteListener"] != null || this.vars["onUpdateListener"] != null || this.vars["onStartListener"] != null)
				{
					this.initDispatcher();
				}
				this.setDirtyCache(true);
				super.invalidate();
			}

			public get timeScale():number
			{
				return this.cachedTimeScale;
			}

			public get totalDuration():number
			{
				if(this.cacheIsDirty)
				{
					this.cachedTotalDuration = this._repeat == -1?flash.trannumber(999999999999):flash.trannumber(this.cachedDuration * (this._repeat + 1) + this._repeatDelay * this._repeat);
					this.cacheIsDirty = false;
				}
				return this.cachedTotalDuration;
			}

	public once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
	}
		}
	}
}

com.greensock.TweenMax._overwriteMode = <any>!<any>!OverwriteManager.enabled?flash.tranint(OverwriteManager.mode):flash.tranint(OverwriteManager.init(2));
com.greensock.TweenMax.version_static_com_greensock_TweenMax = 11.697;
com.greensock.TweenMax.killTweensOf_static_com_greensock_TweenMax = com.greensock.TweenLite.killTweensOf;
com.greensock.TweenMax.killDelayedCallsTo_static_com_greensock_TweenMax = com.greensock.TweenLite.killTweensOf;
flash.extendsClass("com.greensock.TweenMax","com.greensock.TweenLite")
flash.implementsClass("com.greensock.TweenMax",["egret.IEventDispatcher"]);