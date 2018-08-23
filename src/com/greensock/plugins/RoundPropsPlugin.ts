module com {
	export module greensock {
		export module plugins {
			export class RoundPropsPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_RoundPropsPlugin:number;
				protected _tween:com.greensock.TweenLite;

				public constructor()
				{
					super();
					this.propName = "roundProps";
					this.overwriteProps = ["roundProps"];
					this.round = true;
					this.priority = flash.checkInt(-1);
					this.onInitAllProps = flash.bind(this._initAllProps,this);
				}

				public add(object:any,propName:string,start:number,change:number)
				{
					this.addTween(object,propName,start,start + change,propName);
					this.overwriteProps[this.overwriteProps.length] = propName;
				}

				protected _removePropTween(propTween:com.greensock.core.PropTween)
				{
					if(propTween.nextNode)
					{
						propTween.nextNode.prevNode = propTween.prevNode;
					}
					if(propTween.prevNode)
					{
						propTween.prevNode.nextNode = propTween.nextNode;
					}
					else if(this._tween.cachedPT1 == propTween)
					{
						this._tween.cachedPT1 = propTween.nextNode;
					}
					if(propTween.isPlugin && propTween.target["onDisable"])
					{
						propTween.target["onDisable"]();
					}
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._tween = tween;
					this.overwriteProps = this.overwriteProps.concat(flash.As3As(value,Array));
					return true;
				}

				protected _initAllProps()
				{
					var prop:string = <any>null;
					var multiProps:string = <any>null;
					var pt:com.greensock.core.PropTween = <any>null;
					var rp:Array<any> = <any>this._tween.vars["roundProps"];
					var i:number = flash.checkInt(rp.length);
					while(--i > -1)
					{
						prop = rp[i];
						pt = this._tween.cachedPT1;
						while(pt)
						{
							if(pt.name == prop)
							{
								if(pt.isPlugin)
								{
									pt.target["round"] = true;
								}
								else
								{
									this.add(pt.target,prop,pt.start,pt.change);
									this._removePropTween(pt);
									this._tween.propTweenLookup[prop] = this._tween.propTweenLookup["roundProps"];
								}
							}
							else if(pt.isPlugin && pt.name == "_MULTIPLE_" && <any>!pt.target["round"])
							{
								multiProps = " " + pt.target["overwriteProps"].join(" ") + " ";
								if(multiProps.indexOf(" " + prop + " ") != -1)
								{
									pt.target["round"] = true;
								}
							}
							pt = pt.nextNode;
						}
					}
				}

			}
		}
	}
}

com.greensock.plugins.RoundPropsPlugin.API_static_com_greensock_plugins_RoundPropsPlugin = 1;
flash.extendsClass("com.greensock.plugins.RoundPropsPlugin","com.greensock.plugins.TweenPlugin")
