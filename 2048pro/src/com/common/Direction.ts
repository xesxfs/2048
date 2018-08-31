module com {
	export module common {
		export class Direction extends egret.HashObject {
			public static UP:number;
			public static DOWN:number;
			public static LEFT:number;
			public static RIGHT:number;

			public constructor()
			{
				super();
				super();
			}

		}
	}
}

com.common.Direction.UP = 8;
com.common.Direction.DOWN = 2;
com.common.Direction.LEFT = 4;
com.common.Direction.RIGHT = 6;
