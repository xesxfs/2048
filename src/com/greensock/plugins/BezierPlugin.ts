module com {
	export module greensock {
		export module plugins {
			export class BezierPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_BezierPlugin:number;
				public static _RAD2DEG:number;
				protected _future:any;
				protected _orient:boolean = false;
				protected _orientData:Array<any>;
				protected _target:any;
				protected _beziers:any;

				public constructor()
				{
					super();
					this._future = {};
					this.propName = "bezier";
					this.overwriteProps = [];
				}

				public static parseBeziers(props:any,through:boolean = false):any
				{
					var i:number = flash.checkInt(0);
					var a:Array<any> = <any>null;
					var b:any = <any>null;
					var p:any = null;
					var all:any = {};
					if(through)
					{
						for(p in props)
						{
							a = props[p];
							all[p] = b = [];
							if(a.length > 2)
							{
								b[b["length"]] = [a[0],a[1] - (a[2] - a[0]) / 4,a[1]];
								for(i = flash.checkInt(1); i < a.length - 1; i = flash.checkInt(i + 1))
								{
									b[b["length"]] = [a[i],a[i] + (a[i] - b[i - 1][1]),a[i + 1]];
								}
							}
							else
							{
								b[b["length"]] = [a[0],(a[0] + a[1]) / 2,a[1]];
							}
						}
					}
					else
					{
						for(p in props)
						{
							a = props[p];
							all[p] = b = [];
							if(a.length > 3)
							{
								b[b["length"]] = [a[0],a[1],(a[1] + a[2]) / 2];
								for(i = flash.checkInt(2); i < a.length - 2; i = flash.checkInt(i + 1))
								{
									b[b["length"]] = [b[i - 2][2],a[i],(a[i] + a[i + 1]) / 2];
								}
								b[b["length"]] = [b[b["length"] - 1][2],a[a.length - 2],a[a.length - 1]];
							}
							else if(a.length == 3)
							{
								b[b["length"]] = [a[0],a[1],a[2]];
							}
							else if(a.length == 2)
							{
								b[b["length"]] = [a[0],(a[0] + a[1]) / 2,a[1]];
							}
						}
					}
					return all;
				}

				public killProps(lookup:any)
				{
					var p:any = null;
					for(p in this._beziers)
					{
						if(p in lookup)
						{
							delete this._beziers[p];
						}
					}
					super.killProps(lookup);
				}

				protected init(tween:com.greensock.TweenLite,beziers:Array<any>,through:boolean)
				{
					var i:number = flash.checkInt(0);
					var p:any = null;
					var killVarsLookup:any = <any>null;
					this._target = tween.target;
					var enumerables:any = <any>tween.vars["isTV"] == true?tween.vars["exposedVars"]:tween.vars;
					if(enumerables["orientToBezier"] == true)
					{
						this._orientData = [["x","y","rotation",0,0.01]];
						this._orient = true;
					}
					else if(flash.As3is(enumerables["orientToBezier"],Array))
					{
						this._orientData = enumerables["orientToBezier"];
						this._orient = true;
					}
					var props:any = {};
					for(i = flash.checkInt(0); i < beziers.length; i = flash.checkInt(i + 1))
					{
						for(p in beziers[i])
						{
							if(props[p] == undefined)
							{
								props[p] = [tween.target[p]];
							}
							if(typeof beziers[i][p] == "number")
							{
								props[p].push(beziers[i][p]);
							}
							else
							{
								props[p].push(tween.target[p] + flash.trannumber(beziers[i][p]));
							}
						}
					}
					for(this.overwriteProps[this.overwriteProps.length] in props)
					{
						if(enumerables[p] != undefined)
						{
							if(typeof enumerables[p] == "number")
							{
								props[p].push(enumerables[p]);
							}
							else
							{
								props[p].push(tween.target[p] + flash.trannumber(enumerables[p]));
							}
							killVarsLookup = {};
							killVarsLookup[p] = true;
							tween.killVars(killVarsLookup,false);
							delete enumerables[p];
						}
					}
					this._beziers = com.greensock.plugins.BezierPlugin.parseBeziers(props,through);
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(value,Array)))
					{
						return false;
					}
					this.init(tween,flash.As3As(value,Array),false);
					return true;
				}

				public set changeFactor(n:number)
				{
					var i:number = flash.checkInt(0);
					var p:any = null;
					var b:any = <any>null;
					var t:number = <any>NaN;
					var segments:number = flash.checkInt(0);
					var val:number = <any>NaN;
					var curVals:any = <any>null;
					var dx:number = <any>NaN;
					var dy:number = <any>NaN;
					var cotb:Array<any> = <any>null;
					var toAdd:number = <any>NaN;
					var oldTarget:any = <any>null;
					var oldRound:boolean = <any>false;
					this._changeFactor = n;
					if(n == 1)
					{
						for(p in this._beziers)
						{
							i = flash.checkInt(this._beziers[p].length - 1);
							this._target[p] = this._beziers[p][i][2];
						}
					}
					else
					{
						for(p in this._beziers)
						{
							segments = flash.checkInt(this._beziers[p].length);
							if(n < 0)
							{
								i = flash.checkInt(0);
							}
							else if(n >= 1)
							{
								i = flash.checkInt(segments - 1);
							}
							else
							{
								i = flash.checkInt(segments * n >> 0);
							}
							t = (n - i * (1 / segments)) * segments;
							b = this._beziers[p][i];
							if(this.round)
							{
								val = b[0] + t * (2 * (1 - t) * (b[1] - b[0]) + t * (b[2] - b[0]));
								if(val > 0)
								{
									this._target[p] = val + 0.5 >> 0;
								}
								else
								{
									this._target[p] = val - 0.5 >> 0;
								}
							}
							else
							{
								this._target[p] = b[0] + t * (2 * (1 - t) * (b[1] - b[0]) + t * (b[2] - b[0]));
							}
						}
					}
					if(this._orient)
					{
						i = flash.checkInt(this._orientData.length);
						curVals = {};
						while(i--)
						{
							cotb = this._orientData[i];
							curVals[cotb[0]] = this._target[cotb[0]];
							curVals[cotb[1]] = this._target[cotb[1]];
						}
						oldTarget = this._target;
						oldRound = this.round;
						this._target = this._future;
						this.round = false;
						this._orient = false;
						i = flash.checkInt(this._orientData.length);
						while(i--)
						{
							cotb = this._orientData[i];
							this.changeFactor = n + (cotb[4] || 0.01);
							toAdd = flash.trannumber(cotb[3]) || flash.trannumber(0);
							dx = this._future[cotb[0]] - curVals[cotb[0]];
							dy = this._future[cotb[1]] - curVals[cotb[1]];
							oldTarget[cotb[2]] = Math.atan2(dy,dx) * com.greensock.plugins.BezierPlugin._RAD2DEG + toAdd;
						}
						this._target = oldTarget;
						this.round = oldRound;
						this._orient = true;
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.BezierPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.BezierPlugin.API_static_com_greensock_plugins_BezierPlugin = 1;
com.greensock.plugins.BezierPlugin._RAD2DEG = 180 / Math.PI;
flash.extendsClass("com.greensock.plugins.BezierPlugin","com.greensock.plugins.TweenPlugin")
