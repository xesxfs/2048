package com.game
{
   public class StorageManager
   {
      
      public static const bestScoreKey:String = "bestScore";
      
      public static const gameStateKey:String = "gameState";
      
      public static const GAMEKEY:String = "FSER2048";
      
      private static var _instance:com.game.StorageManager = null;
      
      private static var _singlen:Boolean = false;
       
      
      public var storage:com.game.Storage;
      
      public function StorageManager()
      {
         super();
         if(_singlen == false || _instance != null)
         {
            throw new Error("单例模式，非法创建");
         }
         this.storage = this.localStorageSupported();
      }
      
      public static function get instance() : com.game.StorageManager
      {
         if(_instance == null)
         {
            _singlen = true;
            _instance = new com.game.StorageManager();
            _singlen = false;
         }
         return _instance;
      }
      
      private function localStorageSupported() : com.game.Storage
      {
         return new com.game.Storage();
      }
      
      public function getBestScore() : String
      {
         return this.storage.getItem(bestScoreKey) || String(0);
      }
      
      public function setBestScore(score:int) : void
      {
         this.storage.setItem(bestScoreKey,String(score));
      }
      
      public function setGameState(gameState:Object) : void
      {
         this.storage.setItem(gameStateKey,JSON.stringify(gameState));
      }
      
      public function getGameState() : Object
      {
         var stateJSON:String = this.storage.getItem(gameStateKey);
         return Boolean(stateJSON)?JSON.parse(stateJSON):null;
      }
      
      public function clearGameState() : void
      {
         this.storage.removeItem(gameStateKey);
      }
      
      public function save() : void
      {
         this.storage.flush();
      }
   }
}
