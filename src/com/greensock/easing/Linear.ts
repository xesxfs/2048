module com {
	export module greensock {
		export module easing {
			export class Linear extends egret.HashObject {
				public static power:number;

				public constructor()
				{
					super();
					super();
				}

				public static easeOut(t:number,b:number,c:number,d:number):number
				{
					return c * t / d + b;
				}

				public static easeIn(t:number,b:number,c:number,d:number):number
				{
					return c * t / d + b;
				}

				public static easeNone(t:number,b:number,c:number,d:number):number
				{
					return c * t / d + b;
				}

				public static easeInOut(t:number,b:number,c:number,d:number):number
				{
					return c * t / d + b;
				}

			}
		}
	}
}

com.greensock.easing.Linear.power = 0;
