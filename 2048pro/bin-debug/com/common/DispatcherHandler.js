var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var com;
(function (com) {
    var common;
    (function (common) {
        var DispatcherHandler = (function (_super) {
            __extends(DispatcherHandler, _super);
            function DispatcherHandler() {
                var _this = _super.call(this) || this;
                _this._dispatcher = new egret.EventDispatcher();
                return _this;
                // if(com.common.DispatcherHandler._singlen == false || com.common.DispatcherHandler._instance != null)
                // {
                // 	throw new flash.Error("单例模式，非法创建").message;
                // }
                // this._handlerMap = new flash.Dictionary();
            }
            Object.defineProperty(DispatcherHandler, "instance", {
                get: function () {
                    if (com.common.DispatcherHandler._instance == null) {
                        com.common.DispatcherHandler._singlen = true;
                        com.common.DispatcherHandler._instance = new com.common.DispatcherHandler();
                        com.common.DispatcherHandler._singlen = false;
                    }
                    return com.common.DispatcherHandler._instance;
                },
                enumerable: true,
                configurable: true
            });
            DispatcherHandler.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
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
            };
            DispatcherHandler.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
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
            };
            DispatcherHandler.prototype.dispatcheEvent = function (type, data) {
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
            };
            return DispatcherHandler;
        }(egret.HashObject));
        common.DispatcherHandler = DispatcherHandler;
        __reflect(DispatcherHandler.prototype, "com.common.DispatcherHandler");
    })(common = com.common || (com.common = {}));
})(com || (com = {}));
com.common.DispatcherHandler._instance = null;
com.common.DispatcherHandler._singlen = false;
//# sourceMappingURL=DispatcherHandler.js.map