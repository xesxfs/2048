module com {
	export module greensock {
		export module plugins {
			export class FilterPlugin extends com.greensock.plugins.TweenPlugin {
				public static VERSION_static_com_greensock_plugins_FilterPlugin:number;
				public static API_static_com_greensock_plugins_FilterPlugin:number;
				protected _remove:boolean = false;
				protected _target:any;
				protected _index:number = 0;
				protected _filter:flash.BitmapFilter;
				protected _type:any;

				public constructor()
				{
					super();
				}

				public onCompleteTween()
				{
					var filters:Array<any> = <any>null;
					var i:number = flash.checkInt(0);
					if(this._remove)
					{
						filters = this._target["filters"];
						if(<any>!(flash.As3is(filters[this._index],null,"this._type")))
						{
							i = flash.checkInt(filters.length);
							while(i--)
							{
								if(flash.As3is(filters[i],null,"this._type"))
								{
									filters.splice(i,1);
									break;
								}
							}
						}
						else
						{
							filters.splice(this._index,1);
						}
						this._target["filters"] = filters;
					}
				}

				protected initFilter(props:any,defaultFilter:flash.BitmapFilter,propNames:Array<any>)
				{
					var p:string = <any>null;
					var i:number = flash.checkInt(0);
					var colorTween:com.greensock.plugins.HexColorsPlugin = <any>null;
					var filters:Array<any> = <any>this._target["filters"];
					var extras:any = <any>flash.As3is(props,flash.BitmapFilter)?{}:props;
					this._index = flash.checkInt(-1);
					if(extras["index"] != null)
					{
						this._index = flash.checkInt(extras["index"]);
					}
					else
					{
						i = flash.checkInt(filters.length);
						while(i--)
						{
							if(flash.As3is(filters[i],null,"this._type"))
							{
								this._index = flash.checkInt(i);
								break;
							}
						}
					}
					if(this._index == -1 || filters[this._index] == null || extras["addFilter"] == true)
					{
						this._index = flash.checkInt(extras["index"] != null?flash.tranint(extras["index"]):flash.tranint(filters.length));
						filters[this._index] = defaultFilter;
						this._target["filters"] = filters;
					}
					this._filter = filters[this._index];
					if(extras["remove"] == true)
					{
						this._remove = true;
						this.onComplete = flash.bind(this.onCompleteTween,this);
					}
					i = flash.checkInt(propNames.length);
					while(i--)
					{
						p = propNames[i];
						if(p in props && this._filter[p] != props[p])
						{
							if(p == "color" || p == "highlightColor" || p == "shadowColor")
							{
								colorTween = new com.greensock.plugins.HexColorsPlugin();
								colorTween.initColor(this._filter,p,this._filter[p],props[p]);
								this._tweens[this._tweens.length] = new com.greensock.core.PropTween(colorTween,"changeFactor",0,1,p,false);
							}
							else if(p == "quality" || p == "inner" || p == "knockout" || p == "hideObject")
							{
								this._filter[p] = props[p];
							}
							else
							{
								this.addTween(this._filter,p,this._filter[p],props[p],p);
							}
						}
					}
				}

				public set changeFactor(n:number)
				{
					var ti:com.greensock.core.PropTween = <any>null;
					var i:number = flash.checkInt(this._tweens.length);
					var filters:Array<any> = <any>this._target["filters"];
					while(i--)
					{
						ti = this._tweens[i];
						ti.target[ti.property] = ti.start + ti.change * n;
					}
					if(<any>!(flash.As3is(filters[this._index],null,"this._type")))
					{
						i = flash.checkInt(this._index = flash.checkInt(filters.length));
						while(i--)
						{
							if(flash.As3is(filters[i],null,"this._type"))
							{
								this._index = flash.checkInt(i);
								break;
							}
						}
					}
					filters[this._index] = this._filter;
					this._target["filters"] = filters;
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.FilterPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.FilterPlugin.VERSION_static_com_greensock_plugins_FilterPlugin = 2.03;
com.greensock.plugins.FilterPlugin.API_static_com_greensock_plugins_FilterPlugin = 1;
flash.extendsClass("com.greensock.plugins.FilterPlugin","com.greensock.plugins.TweenPlugin")
