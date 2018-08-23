module com {
	export module game {
		export class Tile extends egret.HashObject {
			public x:number = 0;
			public y:number = 0;
			public value:number = 0;
			public previousPosition:egret.Point;
			public mergedFrom:Array<any>;

			public constructor(position:any,value:number)
			{
				super();
				value = flash.checkInt(value);
				super();
				this.x = flash.checkInt(position["x"]);
				this.y = flash.checkInt(position["y"]);
				this.value = flash.checkInt(flash.tranint(value) || flash.tranint(2));
				this.previousPosition = null;
				this.mergedFrom = null;
			}

			public savePosition()
			{
				this.previousPosition = new egret.Point(this.x,this.y);
			}

			public updatePosition(position:egret.Point)
			{
				this.x = flash.checkInt(position.x);
				this.y = flash.checkInt(position.y);
			}

			public get position():egret.Point
			{
				return new egret.Point(this.x,this.y);
			}

			public serialize():any
			{
				return {"position":new egret.Point(this.x,this.y),"value":this.value};
			}

		}
	}
}

