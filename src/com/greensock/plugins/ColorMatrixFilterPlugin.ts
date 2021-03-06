module com {
	export module greensock {
		export module plugins {
			export class ColorMatrixFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_ColorMatrixFilterPlugin:number;
				public static _propNames:Array<any>;
				public static _lumG:number;
				public static _lumR:number;
				public static _idMatrix:Array<any>;
				public static _lumB:number;
				protected _matrix:Array<any>;
				protected _matrixTween:com.greensock.plugins.EndArrayPlugin;

				public constructor()
				{
					super();
					this.propName = "colorMatrixFilter";
					this.overwriteProps = ["colorMatrixFilter"];
				}

				public static setSaturation(m:Array<any>,n:number):Array<any>
				{
					if(isNaN(n))
					{
						return m;
					}
					var inv:number = 1 - n;
					var r:number = inv * com.greensock.plugins.ColorMatrixFilterPlugin._lumR;
					var g:number = inv * com.greensock.plugins.ColorMatrixFilterPlugin._lumG;
					var b:number = inv * com.greensock.plugins.ColorMatrixFilterPlugin._lumB;
					var temp:Array<any> = [r + n,g,b,0,0,r,g + n,b,0,0,r,g,b + n,0,0,0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp,m);
				}

				public static setHue(m:Array<any>,n:number):Array<any>
				{
					if(isNaN(n))
					{
						return m;
					}
					n = n * (Math.PI / 180);
					var c:number = Math.cos(n);
					var s:number = Math.sin(n);
					var temp:Array<any> = [com.greensock.plugins.ColorMatrixFilterPlugin._lumR + c * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumR) + s * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR,com.greensock.plugins.ColorMatrixFilterPlugin._lumG + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG + s * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG,com.greensock.plugins.ColorMatrixFilterPlugin._lumB + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumB + s * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumB),0,0,com.greensock.plugins.ColorMatrixFilterPlugin._lumR + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR + s * 0.143,com.greensock.plugins.ColorMatrixFilterPlugin._lumG + c * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumG) + s * 0.14,com.greensock.plugins.ColorMatrixFilterPlugin._lumB + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumB + s * -0.283,0,0,com.greensock.plugins.ColorMatrixFilterPlugin._lumR + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR + s * -(1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumR),com.greensock.plugins.ColorMatrixFilterPlugin._lumG + c * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG + s * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,com.greensock.plugins.ColorMatrixFilterPlugin._lumB + c * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumB) + s * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,0,0,0,1,0,0,0,0,0,1];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp,m);
				}

				public static setContrast(m:Array<any>,n:number):Array<any>
				{
					if(isNaN(n))
					{
						return m;
					}
					n = n + 0.01;
					var temp:Array<any> = [n,0,0,0,128 * (1 - n),0,n,0,0,128 * (1 - n),0,0,n,0,128 * (1 - n),0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp,m);
				}

				public static applyMatrix(m:Array<any>,m2:Array<any>):Array<any>
				{
					var y:number = flash.checkInt(0);
					var x:number = flash.checkInt(0);
					if(<any>!(flash.As3is(m,Array)) || <any>!(flash.As3is(m2,Array)))
					{
						return m2;
					}
					var temp:Array<any> = [];
					var i:number = flash.checkInt(0);
					var z:number = flash.checkInt(0);
					for(y = flash.checkInt(0); y < 4; y = flash.checkInt(y + 1))
					{
						for(x = flash.checkInt(0); x < 5; x = flash.checkInt(x + 1))
						{
							if(x == 4)
							{
								z = flash.checkInt(m[i + 4]);
							}
							else
							{
								z = flash.checkInt(0);
							}
							temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
						}
						i = flash.checkInt(i + 5);
					}
					return temp;
				}

				public static setThreshold(m:Array<any>,n:number):Array<any>
				{
					if(isNaN(n))
					{
						return m;
					}
					var temp:Array<any> = [com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256,0,-256 * n,com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256,0,-256 * n,com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256,0,-256 * n,0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp,m);
				}

				public static colorize(m:Array<any>,color:number,amount:number = 1):Array<any>
				{
					if(isNaN(color))
					{
						return m;
					}
					if(isNaN(amount))
					{
						amount = 1;
					}
					var r:number = (color >> 16 & 255) / 255;
					var g:number = (color >> 8 & 255) / 255;
					var b:number = (color & 255) / 255;
					var inv:number = 1 - amount;
					var temp:Array<any> = [inv + amount * r * com.greensock.plugins.ColorMatrixFilterPlugin._lumR,amount * r * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,amount * r * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,amount * g * com.greensock.plugins.ColorMatrixFilterPlugin._lumR,inv + amount * g * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,amount * g * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,amount * b * com.greensock.plugins.ColorMatrixFilterPlugin._lumR,amount * b * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,inv + amount * b * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(temp,m);
				}

				public static setBrightness(m:Array<any>,n:number):Array<any>
				{
					if(isNaN(n))
					{
						return m;
					}
					n = n * 100 - 100;
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix([1,0,0,0,n,0,1,0,0,n,0,0,1,0,n,0,0,0,1,0,0,0,0,0,1],m);
				}

				public onInitTween(target:any,value:any,tween:com.greensock.TweenLite):boolean
				{
					this._target = target;
					this._type = flash.ColorMatrixFilter;
					var cmf:any = <any>value;
					this.initFilter({"remove":value.remove,"index":value.index,"addFilter":value.addFilter},new flash.ColorMatrixFilter(com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix.slice()),com.greensock.plugins.ColorMatrixFilterPlugin._propNames);
					this._matrix = (<flash.ColorMatrixFilter>(this._filter)).matrix;
					var endMatrix:Array<any> = [];
					if(cmf["matrix"] != null && flash.As3is(cmf["matrix"],Array))
					{
						endMatrix = cmf["matrix"];
					}
					else
					{
						if(cmf["relative"] == true)
						{
							endMatrix = this._matrix.slice();
						}
						else
						{
							endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix.slice();
						}
						endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setBrightness(endMatrix,cmf["brightness"]);
						endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setContrast(endMatrix,cmf["contrast"]);
						endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setHue(endMatrix,cmf["hue"]);
						endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setSaturation(endMatrix,cmf["saturation"]);
						endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.setThreshold(endMatrix,cmf["threshold"]);
						if(<any>!isNaN(cmf["colorize"]))
						{
							endMatrix = com.greensock.plugins.ColorMatrixFilterPlugin.colorize(endMatrix,cmf["colorize"],cmf["amount"]);
						}
					}
					this._matrixTween = new com.greensock.plugins.EndArrayPlugin();
					this._matrixTween.init(this._matrix,endMatrix);
					return true;
				}

				public set changeFactor(n:number)
				{
					this._matrixTween.changeFactor = n;
					(<flash.ColorMatrixFilter>(this._filter)).matrix = this._matrix;
					egret.superSetter(com.greensock.plugins.ColorMatrixFilterPlugin,this,"changeFactor",n);
				}

			}
		}
	}
}

com.greensock.plugins.ColorMatrixFilterPlugin.API_static_com_greensock_plugins_ColorMatrixFilterPlugin = 1;
com.greensock.plugins.ColorMatrixFilterPlugin._propNames = [];
com.greensock.plugins.ColorMatrixFilterPlugin._lumG = 0.71516;
com.greensock.plugins.ColorMatrixFilterPlugin._lumR = 0.212671;
com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];
com.greensock.plugins.ColorMatrixFilterPlugin._lumB = 0.072169;
flash.extendsClass("com.greensock.plugins.ColorMatrixFilterPlugin","com.greensock.plugins.FilterPlugin")
