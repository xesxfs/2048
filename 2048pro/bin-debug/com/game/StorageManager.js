// module com {
// 	export module game {
// 		export class StorageManager extends egret.HashObject {
// 			public static bestScoreKey:string;
// 			public static gameStateKey:string;
// 			public static GAMEKEY:string;
// 			public static _instance:com.game.StorageManager;
// 			public static _singlen:boolean;
// 			public storage:com.game.Storage;
// 			public constructor()
// 			{
// 				super();
// 				super();
// 				if(com.game.StorageManager._singlen == false || com.game.StorageManager._instance != null)
// 				{
// 					throw new flash.Error("单例模式，非法创建").message;
// 				}
// 				this.storage = this.localStorageSupported();
// 			}
// 			public static get instance():com.game.StorageManager
// 			{
// 				if(com.game.StorageManager._instance == null)
// 				{
// 					com.game.StorageManager._singlen = true;
// 					com.game.StorageManager._instance = new com.game.StorageManager();
// 					com.game.StorageManager._singlen = false;
// 				}
// 				return com.game.StorageManager._instance;
// 			}
// 			private localStorageSupported():com.game.Storage
// 			{
// 				return new com.game.Storage();
// 			}
// 			public getBestScore():string
// 			{
// 				return this.storage.getItem(com.game.StorageManager.bestScoreKey) || String(0);
// 			}
// 			public setBestScore(score:number)
// 			{
// 				score = flash.checkInt(score);
// 				this.storage.setItem(com.game.StorageManager.bestScoreKey,String(score));
// 			}
// 			public setGameState(gameState:any)
// 			{
// 				this.storage.setItem(com.game.StorageManager.gameStateKey,JSON.stringify(gameState));
// 			}
// 			public getGameState():any
// 			{
// 				var stateJSON:string = <any>this.storage.getItem(com.game.StorageManager.gameStateKey);
// 				return flash.Boolean(stateJSON)?JSON.parse(stateJSON):null;
// 			}
// 			public clearGameState()
// 			{
// 				this.storage.removeItem(com.game.StorageManager.gameStateKey);
// 			}
// 			public save()
// 			{
// 				this.storage.flush();
// 			}
// 		}
// 	}
// }
// com.game.StorageManager.bestScoreKey = "bestScore";
// com.game.StorageManager.gameStateKey = "gameState";
// com.game.StorageManager.GAMEKEY = "FSER2048";
// com.game.StorageManager._instance = null;
// com.game.StorageManager._singlen = false;
//# sourceMappingURL=StorageManager.js.map