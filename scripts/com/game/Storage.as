package com.game
{
   import flash.net.SharedObject;
   
   public class Storage
   {
       
      
      private var _data:Object;
      
      private var _cookie:SharedObject;
      
      public function Storage()
      {
         super();
         this._data = {};
         this._cookie = SharedObject.getLocal(StorageManager.GAMEKEY);
         this._data[StorageManager.bestScoreKey] = this._cookie.data[StorageManager.bestScoreKey];
      }
      
      public function setItem(id:String, val:String) : void
      {
         this._data[id] = String(val);
      }
      
      public function getItem(id:String) : *
      {
         return !!this._data.hasOwnProperty(id)?this._data[id]:undefined;
      }
      
      public function removeItem(id:String) : void
      {
         delete this._data[id];
      }
      
      public function flush() : void
      {
         this._cookie.data[StorageManager.bestScoreKey] = this._data[StorageManager.bestScoreKey];
         this._cookie.flush();
      }
      
      public function clear() : void
      {
         this._data = {};
      }
   }
}
