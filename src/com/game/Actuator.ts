module com {
	export module game {
		export class Actuator extends egret.HashObject {
			private _tileContainer:com.game.TileContainer;
			private _stage:egret.Stage;
			private _game:com.game.Game;
			private _gridUnitSize:number = 0;
			private _view:com.game.View;

			public constructor(game:com.game.Game)
			{
				super();
				super();
				this._game = game;
				this._stage = game.stage;
				this._view = new com.game.View();
				this._gridUnitSize = flash.checkUint(108);
				this._view.create(game.size,this._gridUnitSize);
				this._tileContainer = this._view.tileContainer;
				this._stage.addChild(this._view);
				com.common.DispatcherHandler.instance.addEventListener(com.common.KeyUtil.DISAVTIVITY,flash.bind(this.onPass,this),null);
				com.common.DispatcherHandler.instance.addEventListener(com.common.KeyUtil.AVTIVITY,flash.bind(this.onActivity,this),null);
				this._game.stage["addEventListener"](egret.Event.ENTER_FRAME,flash.bind(this.onFrame,this));
			}

			protected onFrame(event:egret.Event)
			{
				if(this._game.stage["focus"] != null)
				{
					this._game.stage["focus"] = null;
				}
			}

			private onActivity(event:string,data:any)
			{
				this._view.hidePass();
			}

			private onPass(event:string,data:any)
			{
				this._view.showPass();
			}

			public actuate(grid:com.game.Grid,metadata:any)
			{
				var _self__:any = this;
				this._tileContainer.clearGrids();
				grid.cells["forEach"](function (...args)
				{
					var column:Array<com.game.Tile> = <any>args[0];
					column.forEach(function (...args)
					{
						var cell:com.game.Tile = <any>args[0];
						if(cell)
						{
							_self__.addTile(cell);
						}
					});
				});
				this.updateBestScore(metadata["bestScore"]);
				this.updateScore(metadata["score"]);
				this.updateTabsPos();
				this.alertAddScore();
				this.updateNewTarget(metadata["bestGrid"]);
				if(metadata["terminated"])
				{
					if(metadata["over"] || metadata["own"])
					{
						this.message(metadata["score"]);
					}
				}
			}

			private updateNewTarget(score:number)
			{
				score = flash.checkInt(score);
				var msg:string = "";
				switch(score)
				{
				case 0 :
					msg = "使用鼠标或键盘方向键合并相同的文字";
					break;
				case 4 :
					msg = "干得漂亮！试试去挑战方块8吧！";
					break;
				case 1024 :
					msg = "还差一点，你就到达2048了！加油！";
					break;
				case 2048 :
					msg = "2048仅仅只是开始，去迎接新的挑战吧！(4096)";
					break;
				default :
					msg = "您的新挑战是获得方块" + score * 2;
				}
				this._view.updateNewTarget(msg);
			}

			public addTile(tile:com.game.Tile)
			{
				var _self__:any = this;
				var tileSkin:com.game.TileSkin = this._tileContainer.getTile();
				var position:egret.Point = <any>tile.previousPosition || tile.position;
				var styleCfg:Array<any> = this.getTileSkin(tile.value);
				tileSkin.setData(tile.value);
				tileSkin.setSkin(styleCfg[0],styleCfg[1],styleCfg[2],styleCfg[3]);
				if(tile.previousPosition)
				{
					tileSkin.x = this._tileContainer.positionMap[tile.previousPosition.x][tile.previousPosition.y].x;
					tileSkin.y = this._tileContainer.positionMap[tile.previousPosition.x][tile.previousPosition.y].y;
					com.greensock.TweenMax.to_static_com_greensock_TweenMax(tileSkin,0.1,{"x":this._tileContainer.positionMap[tile.x][tile.y].x,"y":this._tileContainer.positionMap[tile.x][tile.y].y,"ease":com.greensock.easing.Linear.easeNone});
				}
				else if(tile.mergedFrom)
				{
					tileSkin.x = this._tileContainer.positionMap[tile.x][tile.y].x;
					tileSkin.y = this._tileContainer.positionMap[tile.x][tile.y].y;
					tileSkin.scaleX = 0;
					tileSkin.scaleY = 0;
					com.greensock.TweenMax.to_static_com_greensock_TweenMax(tileSkin,0.15,{"scaleX":1,"scaleY":1,"ease":com.greensock.easing.Back.easeOut,"delay":0.1});
					tile.mergedFrom.forEach(function (merged:com.game.Tile,a1:any,a2:any)
					{
						_self__.addTile(merged);
					});
				}
				else
				{
					tileSkin.x = this._tileContainer.positionMap[tile.x][tile.y].x;
					tileSkin.y = this._tileContainer.positionMap[tile.x][tile.y].y;
					tileSkin.scaleX = 0;
					tileSkin.scaleY = 0;
					com.greensock.TweenMax.to_static_com_greensock_TweenMax(tileSkin,0.25,{"scaleX":1,"scaleY":1,"ease":com.greensock.easing.Linear.easeNone});
				}
				this._tileContainer.addTile(tileSkin);
			}

			public getTileSkin(value:number):Array<any>
			{
				value = flash.checkInt(value);
				var textColor:number = flash.checkInt(0);
				var backgroundColor:number = flash.checkInt(0);
				var tileStyle_2:any = {"color":7827045,"background":15656154};
				var tileStyle_4:any = {"color":7827045,"background":15589576};
				var tileStyle_8:any = {"color":16381682,"background":15905145};
				var tileStyle_16:any = {"color":16381682,"background":16094563};
				var tileStyle_32:any = {"color":16381682,"background":16153695};
				var tileStyle_64:any = {"color":16381682,"background":16145979};
				var tileStyle_128:any = {"color":16381682,"background":15585138};
				var tileStyle_256:any = {"color":16381682,"background":15584353};
				var tileStyle_512:any = {"color":16381682,"background":15583312};
				var tileStyle_1024:any = {"color":16381682,"background":15582527};
				var tileStyle_2048:any = {"color":16381682,"background":15581742};
				var styleCfgArr:Array<any> = [tileStyle_2,tileStyle_4,tileStyle_8,tileStyle_16,tileStyle_32,tileStyle_64,tileStyle_128,tileStyle_256,tileStyle_512,tileStyle_1024,tileStyle_2048];
				var typeEnumArr:Array<any> = [2,4,8,16,32,64,128,256,512,1024,2048];
				var fontSize:number = flash.checkInt(55);
				if(value > 100)
				{
					fontSize = flash.checkInt(45);
				}
				if(value > 1000)
				{
					fontSize = flash.checkInt(35);
				}
				if(value > 2000)
				{
					fontSize = flash.checkInt(30);
				}
				if(value > 10000)
				{
					fontSize = flash.checkInt(20);
				}
				while(value > 2048)
				{
					value = flash.checkInt(value / 2048);
				}
				var idx:number = flash.checkInt(typeEnumArr.indexOf(value));
				var styleCfg:any = <any>styleCfgArr[idx];
				textColor = flash.checkInt(styleCfg["color"]);
				backgroundColor = flash.checkInt(styleCfg["background"]);
				return [textColor,backgroundColor,this._gridUnitSize,fontSize];
			}

			public updateScore(score:number)
			{
				score = flash.checkInt(score);
				this._view.setCurScore(score);
			}

			public updateBestScore(bestScore:number)
			{
				bestScore = flash.checkInt(bestScore);
				this._view.setBestScore(bestScore);
			}

			public updateTabsPos()
			{
				this._view.updateTabsPos();
			}

			public alertAddScore()
			{
				this._view.alertAddScore();
			}

			public message(score:number)
			{
				score = flash.checkUint(score);
				this._view.showMessage(score);
			}

			public continueGame()
			{
				this.clearMessage();
			}

			private clearMessage()
			{
				this._view.hideMessage();
			}

			private clearContainer(container:egret.DisplayObjectContainer)
			{
				if(container.numChildren > 0)
				{
					container.removeChildren(0,container.numChildren - 1);
				}
			}

		}
	}
}

