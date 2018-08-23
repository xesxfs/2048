package com.common
{
   import flash.utils.Dictionary;
   
   public class DispatcherHandler
   {
      
      private static var _instance:com.common.DispatcherHandler = null;
      
      private static var _singlen:Boolean = false;
       
      
      private var _handlerMap:Dictionary;
      
      public function DispatcherHandler()
      {
         super();
         if(_singlen == false || _instance != null)
         {
            throw new Error("单例模式，非法创建");
         }
         this._handlerMap = new Dictionary();
      }
      
      public static function get instance() : com.common.DispatcherHandler
      {
         if(_instance == null)
         {
            _singlen = true;
            _instance = new com.common.DispatcherHandler();
            _singlen = false;
         }
         return _instance;
      }
      
      public function addEventListener(event:String, handler:Function) : void
      {
         var listeners:Array = null;
         if(this._handlerMap.hasOwnProperty(event))
         {
            listeners = this._handlerMap[event];
         }
         else
         {
            this._handlerMap[event] = listeners = [];
         }
         if(listeners.indexOf(handler) == -1)
         {
            listeners.push(handler);
         }
      }
      
      public function removeEventListener(event:String, handler:Function) : void
      {
         var listeners:Array = null;
         if(this._handlerMap.hasOwnProperty(event))
         {
            listeners = this._handlerMap[event];
            var idx:int = listeners.indexOf(handler);
            if(idx > -1)
            {
               listeners.splice(idx,1);
            }
            return;
         }
      }
      
      public function dispatcheEvent(event:String, data:Object = null) : void
      {
         var listeners:Array = null;
         var listener:Function = null;
         if(this._handlerMap.hasOwnProperty(event))
         {
            listeners = this._handlerMap[event];
            for(var i:int = 0; i < listeners.length; i++)
            {
               listener = listeners[i];
               listener(event,data);
            }
            return;
         }
      }
   }
}
