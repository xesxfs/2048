// module com {
// 	export module game {
// 		export class Storage extends egret.HashObject {
// 			private _data:any;
// 			private _cookie:flash.SharedObject;

// 			public constructor()
// 			{
// 				super();
// 				super();
// 				this._data = {};
// 				this._cookie = flash.SharedObject.getLocal(com.game.StorageManager.GAMEKEY);
// 				this._data[com.game.StorageManager.bestScoreKey] = this._cookie.data[com.game.StorageManager.bestScoreKey];
// 			}

// 			public setItem(id:string,val:string)
// 			{
// 				this._data[id] = String(val);
// 			}

// 			public getItem(id:string):any
// 			{
// 				return <any>!<any>!this._data.hasOwnProperty(id)?this._data[id]:undefined;
// 			}

// 			public removeItem(id:string)
// 			{
// 				delete this._data[id];
// 			}

// 			public flush()
// 			{
// 				this._cookie.data[com.game.StorageManager.bestScoreKey] = this._data[com.game.StorageManager.bestScoreKey];
// 				this._cookie.flush();
// 			}

// 			public clear()
// 			{
// 				this._data = {};
// 			}

// 		}
// 	}
// }

