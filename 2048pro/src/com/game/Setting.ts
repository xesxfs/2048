module com {
	export module game {
		export class Setting extends egret.HashObject {
			public static FONTTYPE:string;

			public constructor()
			{
				super();
			}

		}
	}
}

com.game.Setting.FONTTYPE = "Times New Roman";
