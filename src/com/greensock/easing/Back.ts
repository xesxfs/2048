module com {
	export module greensock {
		export module easing {
			export class Back extends egret.HashObject {

				public constructor()
				{
					super();
					super();
				}

				public static easeOut(t:number,b:number,c:number,d:number,s:number = 1.70158):number
				{
					return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
				}

				public static easeIn(t:number,b:number,c:number,d:number,s:number = 1.70158):number
				{
					return c * (t = t / d) * t * ((s + 1) * t - s) + b;
				}

				public static easeInOut(t:number,b:number,c:number,d:number,s:number = 1.70158):number
				{
					if((t = t / (d * 0.5)) < 1)
					{
						return c * 0.5 * (t * t * (((s = s * 1.525) + 1) * t - s)) + b;
					}
					return c / 2 * ((t = t - 2) * t * (((s = s * 1.525) + 1) * t + s) + 2) + b;
				}

			}
		}
	}
}

