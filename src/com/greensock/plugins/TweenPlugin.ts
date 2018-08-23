module com {
	export module greensock {
		export module plugins {
			export class TweenPlugin extends egret.HashObject {
				public static VERSION:number;
				public static API:number;
				public activeDisable:boolean = false;
				public onInitAllProps:Function;
				protected _tweens:Array<any>;
				public onDisable:Function;
				public propName:string;
				public onEnable:Function;
				public round:boolean = false;
				public priority:number = 0;
				public overwriteProps:Array<any>;
				public onComplete:Function;
				protected _changeFactor:number = 0;

				public constructor()
				{
					super();
					super();
					this._tweens = [];
				}

				public static activate(plugins:Array<any>):boolean
				{
					var instance:any = <any>null;
					com.greensock.TweenLite.onPluginEvent = com.greensock.plugins.TweenPlugin.onTweenEvent;
					var i:number = flash.checkInt(plugins.length);
					while(i--)
					{
						if(plugins[i].hasOwnProperty("API"))
						{
							instance = new (<any>plugins[i])();
							com.greensock.TweenLite.plugins[instance["propName"]] = plugins[i];
						}
					}
					return true;
				}

				private static onTweenEvent(type:string,tween:com.greensock.TweenLite):boolean
				{
					var changed:boolean = <any>false;
					var tweens:Array<any> = <any>null;
					var i:number = flash.checkInt(0);
					var pt:com.greensock.core.PropTween = tween.cachedPT1;
					if(type == "onInitAllProps")
					{
						tweens = [];
						i = flash.checkInt(0);
						while(pt)
						{
							tweens[i++] = pt;
							pt = pt.nextNode;
						}
						flash.sortOn(tweens,"priority",flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
						while(--i > -1)
						{
							(<com.greensock.core.PropTween>(tweens[i])).nextNode = tweens[i + 1];
							(<com.greensock.core.PropTween>(tweens[i])).prevNode = tweens[i - 1];
						}
						pt = tween.cachedPT1 = tweens[0];
					}
					while(pt)
					{
						if(pt.isPlugin && pt.target[type])
						{
							if(pt.target["activeDisable"])
							{
								changed = true;
							}
							pt.target[type]();
						}
						pt = pt.nextNode;
					}
					return changed;
				}

				public set changeFactor(n:number)
				{
					this.updateTweens(n);
					this._changeFactor = n;
				}

				protected updateTweens(changeFactor:number)
				{
					var pt:com.greensock.core.PropTween = <any>null;
					var val:number = <any>NaN;
					var i:number = flash.checkInt(this._tweens.length);
					if(this.round)
					{
						while(--i > -1)
						{
							pt = this._tweens[i];
							val = pt.start + pt.change * changeFactor;
							if(val > 0)
							{
								pt.target[pt.property] = val + 0.5 >> 0;
							}
							else
							{
								pt.target[pt.property] = val - 0.5 >> 0;
							}
						}
					}
					else
					{
						while(--i > -1)
						{
							pt = this._tweens[i];
							pt.target[pt.property] = pt.start + pt.change * changeFactor;
						}
					}
				}

				protected addTween(object:any,propName:string,start:number,end:any,overwriteProp:string = null)
				{
					var change:number = <any>NaN;
					if(end != null)
					{
						change = typeof end == "number"?flash.trannumber(flash.trannumber(end) - start):flash.trannumber(flash.trannumber(end));
						if(change != 0)
						{
							this._tweens[this._tweens.length] = new com.greensock.core.PropTween(object,propName,start,change,overwriteProp || propName,false);
						}
					}
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this.addTween(target,this.propName,target[this.propName],value,this.propName);
					return true;
				}

				public get changeFactor():number
				{
					return this._changeFactor;
				}

				public killProps(lookup:any)
				{
					var i:number = flash.checkInt(this.overwriteProps.length);
					while(--i > -1)
					{
						if(this.overwriteProps[i] in lookup)
						{
							this.overwriteProps.splice(i,1);
						}
					}
					i = flash.checkInt(this._tweens.length);
					while(--i > -1)
					{
						if((<com.greensock.core.PropTween>(this._tweens[i])).name in lookup)
						{
							this._tweens.splice(i,1);
						}
					}
				}

			}
		}
	}
}

com.greensock.plugins.TweenPlugin.VERSION = 1.4;
com.greensock.plugins.TweenPlugin.API = 1;
