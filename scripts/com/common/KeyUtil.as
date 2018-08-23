package com.common
{
   import flash.display.Stage;
   import flash.utils.Dictionary;
   import flash.events.KeyboardEvent;
   import flash.events.Event;
   import flash.events.FocusEvent;
   
   public class KeyUtil
   {
      
      private static var _instance:com.common.KeyUtil = null;
      
      private static var _singlen:Boolean = false;
      
      public static var DISAVTIVITY:String = "DISAVTIVITY";
      
      public static var AVTIVITY:String = "AVTIVITY";
      
      public static const A:int = 65;
      
      public static const B:int = 66;
      
      public static const C:int = 67;
      
      public static const D:int = 68;
      
      public static const E:int = 69;
      
      public static const F:int = 70;
      
      public static const G:int = 71;
      
      public static const H:int = 72;
      
      public static const I:int = 73;
      
      public static const J:int = 74;
      
      public static const K:int = 75;
      
      public static const L:int = 76;
      
      public static const M:int = 77;
      
      public static const N:int = 78;
      
      public static const O:int = 79;
      
      public static const P:int = 80;
      
      public static const Q:int = 81;
      
      public static const R:int = 82;
      
      public static const S:int = 83;
      
      public static const T:int = 84;
      
      public static const U:int = 85;
      
      public static const V:int = 86;
      
      public static const W:int = 87;
      
      public static const X:int = 88;
      
      public static const Y:int = 89;
      
      public static const Z:int = 90;
      
      public static const BACKSPACE:uint = 8;
      
      public static const CAPS_LOCK:uint = 20;
      
      public static const CONTROL:uint = 17;
      
      public static const DELETE:uint = 46;
      
      public static const DOWN:uint = 40;
      
      public static const END:uint = 35;
      
      public static const ENTER:uint = 13;
      
      public static const ESCAPE:uint = 27;
      
      public static const F1:uint = 112;
      
      public static const F10:uint = 121;
      
      public static const F11:uint = 122;
      
      public static const F12:uint = 123;
      
      public static const F13:uint = 124;
      
      public static const F14:uint = 125;
      
      public static const F15:uint = 126;
      
      public static const F2:uint = 113;
      
      public static const F3:uint = 114;
      
      public static const F4:uint = 115;
      
      public static const F5:uint = 116;
      
      public static const F6:uint = 117;
      
      public static const F7:uint = 118;
      
      public static const F8:uint = 119;
      
      public static const F9:uint = 120;
      
      public static const HOME:uint = 36;
      
      public static const INSERT:uint = 45;
      
      public static const LEFT:uint = 37;
      
      public static const NUMPAD_0:uint = 96;
      
      public static const NUMPAD_1:uint = 97;
      
      public static const NUMPAD_2:uint = 98;
      
      public static const NUMPAD_3:uint = 99;
      
      public static const NUMPAD_4:uint = 100;
      
      public static const NUMPAD_5:uint = 101;
      
      public static const NUMPAD_6:uint = 102;
      
      public static const NUMPAD_7:uint = 103;
      
      public static const NUMPAD_8:uint = 104;
      
      public static const NUMPAD_9:uint = 105;
      
      public static const NUMPAD_ADD:uint = 107;
      
      public static const NUMPAD_DECIMAL:uint = 110;
      
      public static const NUMPAD_DIVIDE:uint = 111;
      
      public static const NUMPAD_ENTER:uint = 108;
      
      public static const NUMPAD_MULTIPLY:uint = 106;
      
      public static const NUMPAD_SUBTRACT:uint = 109;
      
      public static const PAGE_DOWN:uint = 34;
      
      public static const PAGE_UP:uint = 33;
      
      public static const RIGHT:uint = 39;
      
      public static const SHIFT:uint = 16;
      
      public static const SPACE:uint = 32;
      
      public static const TAB:uint = 9;
      
      public static const UP:uint = 38;
       
      
      private var stage:Stage;
      
      private var _enable:Boolean;
      
      private var _downKeysMap:Dictionary;
      
      private var _openKeysMap:Dictionary;
      
      private var _handleKeysMap:Dictionary;
      
      private var _openKeyMap:com.common.Direction;
      
      public function KeyUtil()
      {
         super();
         if(_singlen == false || _instance != null)
         {
            throw new Error("单例模式，非法创建");
         }
         this._downKeysMap = new Dictionary();
         this._openKeysMap = new Dictionary();
         this._handleKeysMap = new Dictionary();
         this._enable = false;
      }
      
      public static function get instance() : com.common.KeyUtil
      {
         if(_instance == null)
         {
            _singlen = true;
            _instance = new com.common.KeyUtil();
            _singlen = false;
         }
         return _instance;
      }
      
      public function set enable(value:Boolean) : void
      {
         this._enable = value;
      }
      
      public function openKey(key:int) : void
      {
         this._openKeysMap[key] = true;
      }
      
      public function closeKey(key:String) : void
      {
         if(this._openKeysMap.hasOwnProperty(key))
         {
            delete this._openKeysMap[key];
         }
      }
      
      public function injectStage(stage:Stage) : void
      {
         this.stage = stage;
         stage.addEventListener(KeyboardEvent.KEY_DOWN,this.onKeyDown);
         stage.addEventListener(KeyboardEvent.KEY_UP,this.onKeyUp);
         stage.addEventListener(Event.DEACTIVATE,this.onFocusOutHandler);
         stage.addEventListener(Event.ACTIVATE,this.onFocusInAHandler);
      }
      
      protected function onFocusChange(event:FocusEvent) : void
      {
         this.stage.focus = this.stage;
      }
      
      protected function onFocusInAHandler(event:Event) : void
      {
         DispatcherHandler.instance.dispatcheEvent(AVTIVITY);
      }
      
      protected function onFocusOutHandler(event:Event) : void
      {
         var key:* = null;
         for(key in this._downKeysMap)
         {
            this._downKeysMap[key] = false;
         }
         DispatcherHandler.instance.dispatcheEvent(DISAVTIVITY);
      }
      
      protected function onKeyUp(event:KeyboardEvent) : void
      {
         delete this._downKeysMap[event.keyCode];
      }
      
      protected function onKeyDown(event:KeyboardEvent) : void
      {
         this._downKeysMap[event.keyCode] = true;
         this.execute(event);
      }
      
      public function isKeyDown(keyCode:uint) : Boolean
      {
         return this._downKeysMap[keyCode] == true;
      }
      
      public function addKeyListener(handler:Function, codes:Array) : void
      {
         if(codes)
         {
            codes.sort();
            this._handleKeysMap[codes.toString()] = handler;
         }
      }
      
      public function removeKeyHandler(codes:Array) : void
      {
         if(codes)
         {
            codes.sort();
            delete this._handleKeysMap[codes.toString()];
         }
      }
      
      private function execute(event:KeyboardEvent) : void
      {
         var keys:Array = null;
         var key:* = null;
         var handler:Function = null;
         if(this._enable == false)
         {
            return;
         }
         if(this._openKeysMap[event.keyCode] == true)
         {
            keys = [];
            for(key in this._downKeysMap)
            {
               keys.push(int(key));
            }
            keys.sort();
            handler = this._handleKeysMap[keys.toString()];
            if(handler != null)
            {
               handler(event);
            }
         }
      }
   }
}
