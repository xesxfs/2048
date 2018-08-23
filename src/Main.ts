 class Main extends egret.Sprite {
	public static _4399_function_score_id:string;
	public static serviceHold:any;

	public constructor()
	{
		super();
		if(this.stage)
		{
			this.init();
		}
		else
		{
			this.addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.onAddToStage,this),null);
		}
	}

	private onAddToStage(event:egret.Event)
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.onAddToStage,this),null);
		this.init();
	}

	private init()
	{
		var game:com.game.Game = new com.game.Game(this.stage);
		com.tool.UIEditor.init(this);
	}

	public setHold(hold:any)
	{
		Main.serviceHold = hold;
	}

}

Main._4399_function_score_id = "d8c8d4731a33a0a581edc746e73eadc7200";
Main.serviceHold = null;
flash.extendsClass("Main","egret.Sprite")
