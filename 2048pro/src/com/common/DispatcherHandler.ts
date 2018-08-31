module com {
	export module common {
		export class DispatcherHandler extends egret.HashObject {
			public static _instance: com.common.DispatcherHandler;
			public static _singlen: boolean;
			private _dispatcher: egret.EventDispatcher = new egret.EventDispatcher();

			public constructor() {
				super();

				// if(com.common.DispatcherHandler._singlen == false || com.common.DispatcherHandler._instance != null)
				// {
				// 	throw new flash.Error("单例模式，非法创建").message;
				// }
				// this._handlerMap = new flash.Dictionary();
			}

			public static get instance(): com.common.DispatcherHandler {
				if (com.common.DispatcherHandler._instance == null) {
					com.common.DispatcherHandler._singlen = true;
					com.common.DispatcherHandler._instance = new com.common.DispatcherHandler();
					com.common.DispatcherHandler._singlen = false;
				}
				return com.common.DispatcherHandler._instance;
			}

			public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
				this._dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
				// var listeners: Array<any> = null;
				// if(this._handlerMap.getItem("hasOwnProperty")(event))
				// {
				// 	listeners = this._handlerMap.getItem(event);
				// }
				// else
				// {
				// 	this._handlerMap.setItem(event,listeners = []);
				// }
				// if(listeners.indexOf(handler) == -1)
				// {
				// 	listeners.push(handler);
				// }
			}

			public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean) {
				this._dispatcher.removeEventListener(type, listener, thisObject, useCapture);
				// var listeners: Array<any> = <any>null;
				// if(this._handlerMap.getItem("hasOwnProperty")(event))
				// {
				// 	listeners = this._handlerMap.getItem(event);
				// 	var idx:number = flash.checkInt(listeners.indexOf(handler));
				// 	if(idx > -1)
				// 	{
				// 		listeners.splice(idx,1);
				// 	}
				// 	return ;
				// }
			}

			public dispatcheEvent(type: string, data?: any) {
				var event = new egret.Event(type);
				event.data = data;
				this._dispatcher.dispatchEvent(event);
				// var listeners: Array<any> = null;
				// var listener: Function = null;
				// if(this._handlerMap.getItem("hasOwnProperty")(event))
				// {
				// 	listeners = this._handlerMap.getItem(event);
				// 	for(var i:number = flash.checkInt(0);i < listeners.length; i++)
				// 	{
				// 		listener = listeners[i];
				// 		listener(event,data);
				// 	}
				// 	return ;
				// }
			}

		}
	}
}

com.common.DispatcherHandler._instance = null;
com.common.DispatcherHandler._singlen = false;
