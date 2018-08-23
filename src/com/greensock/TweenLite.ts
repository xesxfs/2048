module com {
	export module greensock {
		export class TweenLite extends com.greensock.core.TweenCore {
			public static rootTimeline:com.greensock.core.SimpleTimeline;
			public static fastEaseLookup:flash.Dictionary;
			public static onPluginEvent:Function;
			public static rootFramesTimeline:com.greensock.core.SimpleTimeline;
			public static defaultEase:Function;
			public static version_static_com_greensock_TweenLite:number;
			public static plugins:any;
			public static masterList:flash.Dictionary;
			public static overwriteManager:any;
			public static rootFrame:number = NaN;
			public static killDelayedCallsTo:Function;
			public static _shape:egret.Shape;
			public static _reservedProps:any;
			protected _hasPlugins:boolean = false;
			public propTweenLookup:any;
			public cachedPT1:com.greensock.core.PropTween;
			protected _overwrite:number = 0;
			protected _ease:Function;
			public target:any;
			public ratio:number = 0;
			protected _overwrittenProps:any;
			protected _notifyPluginsOfEnabled:boolean = false;

			public constructor(target:any,duration:number,vars:any)
			{
				super(duration,vars);
				var sibling:com.greensock.TweenLite = <any>null;
				if(target == null)
				{
					throw new flash.Error("Cannot tween a null object.").message;
				}
				this.target = target;
				if(flash.As3is(this.target,com.greensock.core.TweenCore) && this.vars["timeScale"])
				{
					this.cachedTimeScale = 1;
				}
				this.propTweenLookup = {};
				this._ease = com.greensock.TweenLite.defaultEase;
				this._overwrite = flash.checkInt(flash.trannumber(vars["overwrite"]) <= -1 || <any>!com.greensock.TweenLite.overwriteManager["enabled"] && vars["overwrite"] > 1?flash.tranint(com.greensock.TweenLite.overwriteManager["mode"]):flash.tranint(flash.tranint(vars["overwrite"])));
				var a:Array<any> = <any>com.greensock.TweenLite.masterList.getItem(target);
				if(<any>!a)
				{
					com.greensock.TweenLite.masterList.setItem(target,[this]);
				}
				else if(this._overwrite == 1)
				{
					var sibling_key_a;
					for(sibling_key_a in a)
					{
						sibling = a[sibling_key_a];
						if(<any>!sibling.gc)
						{
							sibling.setEnabled(false,false);
						}
					}
					com.greensock.TweenLite.masterList.setItem(target,[this]);
				}
				else
				{
					a[a.length] = this;
				}
				if(this.active || this.vars["immediateRender"])
				{
					this.renderTime(0,false,true);
				}
			}

			public static initClass()
			{
				com.greensock.TweenLite.rootFrame = 0;
				com.greensock.TweenLite.rootTimeline = new com.greensock.core.SimpleTimeline(null);
				com.greensock.TweenLite.rootFramesTimeline = new com.greensock.core.SimpleTimeline(null);
				com.greensock.TweenLite.rootTimeline.cachedStartTime = egret.getTimer() * 0.001;
				com.greensock.TweenLite.rootFramesTimeline.cachedStartTime = com.greensock.TweenLite.rootFrame;
				com.greensock.TweenLite.rootTimeline.autoRemoveChildren = true;
				com.greensock.TweenLite.rootFramesTimeline.autoRemoveChildren = true;
				com.greensock.TweenLite._shape.addEventListener(egret.Event.ENTER_FRAME,com.greensock.TweenLite.updateAll,null,false,0);
				if(com.greensock.TweenLite.overwriteManager == null)
				{
					com.greensock.TweenLite.overwriteManager = {"mode":1,"enabled":false};
				}
			}

			public static killTweensOf(target:any,complete:boolean = false,vars:any = null)
			{
				var a:Array<any> = <any>null;
				var i:number = flash.checkInt(0);
				var tween:com.greensock.TweenLite = <any>null;
				if(target in com.greensock.TweenLite.masterList)
				{
					a = com.greensock.TweenLite.masterList.getItem(target);
					i = flash.checkInt(a.length);
					while(--i > -1)
					{
						tween = a[i];
						if(<any>!tween.gc)
						{
							if(complete)
							{
								tween.complete(false,false);
							}
							if(vars != null)
							{
								tween.killVars(vars);
							}
							if(vars == null || tween.cachedPT1 == null && tween.initted)
							{
								tween.setEnabled(false,false);
							}
						}
					}
					if(vars == null)
					{
						com.greensock.TweenLite.masterList.delItem(target);
					}
				}
			}

			public static from(target:any,duration:number,vars:any):com.greensock.TweenLite
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
				return new com.greensock.TweenLite(target,duration,vars);
			}

			protected static easeOut(t:number,b:number,c:number,d:number):number
			{
				return 1 - (t = 1 - t / d) * t;
			}

			public static delayedCall(delay:number,onComplete:Function,onCompleteParams:Array<any> = null,useFrames:boolean = false):com.greensock.TweenLite
			{
				return new com.greensock.TweenLite(onComplete,0,{"delay":delay,"onComplete":onComplete,"onCompleteParams":onCompleteParams,"immediateRender":false,"useFrames":useFrames,"overwrite":0});
			}

			protected static updateAll(e:egret.Event = null)
			{
				var ml:flash.Dictionary = <any>null;
				var tgt:any = null;
				var a:Array<any> = <any>null;
				var i:number = flash.checkInt(0);
				com.greensock.TweenLite.rootTimeline.renderTime((egret.getTimer() * 0.001 - com.greensock.TweenLite.rootTimeline.cachedStartTime) * com.greensock.TweenLite.rootTimeline.cachedTimeScale,false,false);
				com.greensock.TweenLite.rootFrame = com.greensock.TweenLite.rootFrame + 1;
				com.greensock.TweenLite.rootFramesTimeline.renderTime((com.greensock.TweenLite.rootFrame - com.greensock.TweenLite.rootFramesTimeline.cachedStartTime) * com.greensock.TweenLite.rootFramesTimeline.cachedTimeScale,false,false);
				if(<any>!(com.greensock.TweenLite.rootFrame % 60))
				{
					ml = com.greensock.TweenLite.masterList;
					for(var forinvar__ in ml.map)
					{
						tgt = ml.map[forinvar__][0];
						a = ml.getItem(tgt);
						i = flash.checkInt(a.length);
						while(--i > -1)
						{
							if((<com.greensock.TweenLite>(a[i])).gc)
							{
								a.splice(i,1);
							}
						}
						if(a.length == 0)
						{
							ml.delItem(tgt);
						}
					}
				}
			}

			public static to(target:any,duration:number,vars:any):com.greensock.TweenLite
			{
				return new com.greensock.TweenLite(target,duration,vars);
			}

			protected easeProxy(t:number,b:number,c:number,d:number):number
			{
				var _arguments__ = [];
				for(var _arguments__key in arguments)
				{
					_arguments__ = arguments[_arguments__key];
				}
				return this.vars["proxiedEase"].apply(null,_arguments__.concat(this.vars["easeParams"]));
			}

			public renderTime(time:number,suppressEvents:boolean = false,force:boolean = false)
			{
				var isComplete:boolean = <any>false;
				var prevTime:number = this.cachedTime;
				if(time >= this.cachedDuration)
				{
					this.cachedTotalTime = this.cachedTime = this.cachedDuration;
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
					this.cachedTotalTime = this.cachedTime = this.ratio = 0;
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
					if(this.cachedReversed && prevTime != 0)
					{
						isComplete = true;
					}
				}
				else
				{
					this.cachedTotalTime = this.cachedTime = time;
					this.ratio = this._ease(time,0,1,this.cachedDuration);
				}
				if(this.cachedTime == prevTime && <any>!force)
				{
					return ;
				}
				if(<any>!this.initted)
				{
					this.init();
					if(<any>!isComplete && this.cachedTime)
					{
						this.ratio = this._ease(this.cachedTime,0,1,this.cachedDuration);
					}
				}
				if(<any>!this.active && <any>!this.cachedPaused)
				{
					this.active = true;
				}
				if(prevTime == 0 && this.vars["onStart"] && (this.cachedTime != 0 || this.cachedDuration == 0) && <any>!suppressEvents)
				{
					this.vars["onStart"].apply(null,this.vars["onStartParams"]);
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
				if(isComplete && <any>!this.gc)
				{
					if(this._hasPlugins && this.cachedPT1)
					{
						com.greensock.TweenLite.onPluginEvent("onComplete",this);
					}
					this.complete(true,suppressEvents);
				}
			}

			public setEnabled(enabled:boolean,ignoreTimeline:boolean = false):boolean
			{
				var a:Array<any> = <any>null;
				if(enabled)
				{
					a = com.greensock.TweenLite.masterList.getItem(this.target);
					if(<any>!a)
					{
						com.greensock.TweenLite.masterList.setItem(this.target,[this]);
					}
					else if(a.indexOf(this) == -1)
					{
						a[a.length] = this;
					}
				}
				super.setEnabled(enabled,ignoreTimeline);
				if(this._notifyPluginsOfEnabled && this.cachedPT1)
				{
					return com.greensock.TweenLite.onPluginEvent(<any>!<any>!enabled?"onEnable":"onDisable",this);
				}
				return false;
			}

			protected init()
			{
				var p:any = null;
				var i:number = flash.checkInt(0);
				var plugin:any = undefined;
				var prioritize:boolean = <any>false;
				var siblings:Array<any> = <any>null;
				var pt:com.greensock.core.PropTween = <any>null;
				if(this.vars["onInit"])
				{
					this.vars["onInit"].apply(null,this.vars["onInitParams"]);
				}
				if(typeof this.vars["ease"] == "function")
				{
					this._ease = this.vars["ease"];
				}
				if(this.vars["easeParams"])
				{
					this.vars["proxiedEase"] = this._ease;
					this._ease = flash.bind(this.easeProxy,this);
				}
				this.cachedPT1 = null;
				this.propTweenLookup = {};
				for(p in this.vars)
				{
					if(<any>!(p in com.greensock.TweenLite._reservedProps && <any>!(p == "timeScale" && flash.As3is(this.target,com.greensock.core.TweenCore))))
					{
						if(p in com.greensock.TweenLite.plugins && (plugin = new (<any>com.greensock.TweenLite.plugins[p])()).onInitTween(this.target,this.vars[p],this))
						{
							this.cachedPT1 = new com.greensock.core.PropTween(plugin,"changeFactor",0,1,plugin.overwriteProps.length == 1?plugin.overwriteProps[0]:"_MULTIPLE_",true,this.cachedPT1);
							if(this.cachedPT1.name == "_MULTIPLE_")
							{
								i = flash.checkInt(plugin.overwriteProps.length);
								while(--i > -1)
								{
									this.propTweenLookup[plugin.overwriteProps[i]] = this.cachedPT1;
								}
							}
							else
							{
								this.propTweenLookup[this.cachedPT1.name] = this.cachedPT1;
							}
							if(plugin.priority)
							{
								this.cachedPT1.priority = flash.checkInt(plugin.priority);
								prioritize = true;
							}
							if(plugin.onDisable || plugin.onEnable)
							{
								this._notifyPluginsOfEnabled = true;
							}
							this._hasPlugins = true;
						}
						else
						{
							this.cachedPT1 = new com.greensock.core.PropTween(this.target,p,flash.trannumber(this.target[p]),typeof this.vars[p] == "number"?flash.trannumber(flash.trannumber(this.vars[p]) - this.target[p]):flash.trannumber(flash.trannumber(this.vars[p])),p,false,this.cachedPT1);
							this.propTweenLookup[p] = this.cachedPT1;
						}
					}
				}
				if(prioritize)
				{
					com.greensock.TweenLite.onPluginEvent("onInitAllProps",this);
				}
				if(this.vars["runBackwards"])
				{
					pt = this.cachedPT1;
					while(pt)
					{
						pt.start = pt.start + pt.change;
						pt.change = -pt.change;
						pt = pt.nextNode;
					}
				}
				this._hasUpdate = flash.Boolean(this.vars["onUpdate"] != null);
				if(this._overwrittenProps)
				{
					this.killVars(this._overwrittenProps);
					if(this.cachedPT1 == null)
					{
						this.setEnabled(false,false);
					}
				}
				if(this._overwrite > 1 && this.cachedPT1 && (siblings = com.greensock.TweenLite.masterList.getItem(this.target)) && siblings.length > 1)
				{
					if(com.greensock.TweenLite.overwriteManager["manageOverwrites"](this,this.propTweenLookup,siblings,this._overwrite))
					{
						this.init();
					}
				}
				this.initted = true;
			}

			public killVars(vars:any,permanent:boolean = true):boolean
			{
				var p:any = null;
				var pt:com.greensock.core.PropTween = <any>null;
				var changed:boolean = <any>false;
				if(this._overwrittenProps == null)
				{
					this._overwrittenProps = {};
				}
				for(p in vars)
				{
					if(p in this.propTweenLookup)
					{
						pt = this.propTweenLookup[p];
						if(pt.isPlugin && pt.name == "_MULTIPLE_")
						{
							pt.target["killProps"](vars);
							if(pt.target["overwriteProps"].length == 0)
							{
								pt.name = "";
							}
							if(p != pt.target["propName"] || pt.name == "")
							{
								delete this.propTweenLookup[p];
							}
						}
						if(pt.name != "_MULTIPLE_")
						{
							if(pt.nextNode)
							{
								pt.nextNode.prevNode = pt.prevNode;
							}
							if(pt.prevNode)
							{
								pt.prevNode.nextNode = pt.nextNode;
							}
							else if(this.cachedPT1 == pt)
							{
								this.cachedPT1 = pt.nextNode;
							}
							if(pt.isPlugin && pt.target["onDisable"])
							{
								pt.target["onDisable"]();
								if(pt.target["activeDisable"])
								{
									changed = true;
								}
							}
							delete this.propTweenLookup[p];
						}
					}
					if(permanent && vars != this._overwrittenProps)
					{
						this._overwrittenProps[p] = 1;
					}
				}
				return changed;
			}

			public invalidate()
			{
				if(this._notifyPluginsOfEnabled && this.cachedPT1)
				{
					com.greensock.TweenLite.onPluginEvent("onDisable",this);
				}
				this.cachedPT1 = null;
				this._overwrittenProps = null;
				this._hasUpdate = this.initted = this.active = this._notifyPluginsOfEnabled = false;
				this.propTweenLookup = {};
			}

		}
	}
}

com.greensock.TweenLite.fastEaseLookup = new flash.Dictionary(false);
com.greensock.TweenLite.defaultEase = com.greensock.TweenLite.easeOut;
com.greensock.TweenLite.version_static_com_greensock_TweenLite = 11.696;
com.greensock.TweenLite.plugins = {};
com.greensock.TweenLite.masterList = new flash.Dictionary(false);
com.greensock.TweenLite.killDelayedCallsTo = com.greensock.TweenLite.killTweensOf;
com.greensock.TweenLite._shape = new egret.Shape();
com.greensock.TweenLite._reservedProps = {"ease":1,"delay":1,"overwrite":1,"onComplete":1,"onCompleteParams":1,"useFrames":1,"runBackwards":1,"startAt":1,"onUpdate":1,"onUpdateParams":1,"onStart":1,"onStartParams":1,"onInit":1,"onInitParams":1,"onReverseComplete":1,"onReverseCompleteParams":1,"onRepeat":1,"onRepeatParams":1,"proxiedEase":1,"easeParams":1,"yoyo":1,"onCompleteListener":1,"onUpdateListener":1,"onStartListener":1,"onReverseCompleteListener":1,"onRepeatListener":1,"orientToBezier":1,"timeScale":1,"immediateRender":1,"repeat":1,"repeatDelay":1,"timeline":1,"data":1,"paused":1,"reversed":1};
flash.extendsClass("com.greensock.TweenLite","com.greensock.core.TweenCore")
