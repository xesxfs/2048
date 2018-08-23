module com {
	export module greensock {
		export module plugins {
			export class HexColorsPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_HexColorsPlugin:number;
				protected _colors:Array<any>;

				public constructor()
				{
					super();
					this.propName = "hexColors";
					this.overwriteProps = [];
					this._colors = [];
				}

				public killProps(lookup:any)
				{
					for(var i:number = flash.checkInt(this._colors.length - 1);i > -1; i--)
					{
						if(lookup[this._colors[i][1]] != undefined)
						{
							this._colors.splice(i,1);
						}
					}
					super.killProps(lookup);
				}

				public initColor(target:any,propName:string,start:number,end:number)
				{
					start = flash.checkUint(start);
					end = flash.checkUint(end);
					var r:number = <any>NaN;
					var g:number = <any>NaN;
					var b:number = <any>NaN;
					if(start != end)
					{
						r = start >> 16;
						g = start >> 8 & 255;
						b = start & 255;
						this._colors[this._colors.length] = [target,propName,r,(end >> 16) - r,g,(end >> 8 & 255) - g,b,(end & 255) - b];
						this.overwriteProps[this.overwriteProps.length] = propName;
					}
				}

				public set changeFactor(n:number)
				{
					var a:Array<any> = <any>null;
					var i:number = flash.checkInt(this._colors.length);
					while(--i > -1)
					{
						a = this._colors[i];
						a[0][a[1]] = a[2] + n * a[3] << 16 | a[4] + n * a[5] << 8 | a[6] + n * a[7];
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.HexColorsPlugin,this, "changeFactor");
		}
	
 				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					var p:any = null;
					for(p in value)
					{
						this.initColor(target,p,flash.tranint(target[p]),flash.tranint(value[p]));
					}
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.HexColorsPlugin.API_static_com_greensock_plugins_HexColorsPlugin = 1;
flash.extendsClass("com.greensock.plugins.HexColorsPlugin","com.greensock.plugins.TweenPlugin")
