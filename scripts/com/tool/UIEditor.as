package com.tool
{
   import flash.display.Stage;
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.display.DisplayObject;
   import flash.geom.Point;
   import flash.text.TextFormat;
   import flash.events.Event;
   import flash.events.KeyboardEvent;
   import flash.utils.getQualifiedClassName;
   import flash.ui.Keyboard;
   
   public class UIEditor
   {
      
      private static var _stage:Stage;
      
      private static var _main:Sprite;
      
      private static var _uiLayer:Sprite;
      
      private static var _showText:TextField;
      
      private static var _keyDownList:Object;
      
      private static var _lockUIObject:DisplayObject;
      
      private static var _operation:Object;
      
      private static var _uderPointArray:Array;
      
      private static var _drag:Boolean;
      
      private static var _clickOffset:Point;
      
      private static var _tempPoint:Point;
      
      private static var _stagePoint:Point;
       
      
      public function UIEditor()
      {
         super();
      }
      
      public static function init(main:Sprite) : void
      {
         if(_stage)
         {
            return;
         }
         _tempPoint = new Point();
         _stagePoint = new Point();
         _clickOffset = new Point();
         _keyDownList = [];
         _operation = [];
         _stage = main.stage;
         _main = main;
         _showText = new TextField();
         _showText.background = true;
         _showText.defaultTextFormat = new TextFormat(null,15,0,true);
         _uiLayer = new Sprite();
         _uiLayer.mouseChildren = false;
         _uiLayer.mouseEnabled = false;
         _uiLayer.addChild(_showText);
         _stage.addChild(_uiLayer);
         _stage.addEventListener(Event.ENTER_FRAME,onFrame);
         _stage.addEventListener(KeyboardEvent.KEY_DOWN,keyDown);
         _stage.addEventListener(KeyboardEvent.KEY_UP,keyUp);
      }
      
      private static function keyDown(e:KeyboardEvent) : void
      {
         _keyDownList[e.keyCode] = true;
      }
      
      private static function keyUp(e:KeyboardEvent) : void
      {
         _keyDownList[e.keyCode] = false;
         _operation[e.keyCode] = false;
      }
      
      private static function keyIsDown(key:uint) : Boolean
      {
         return _keyDownList[key];
      }
      
      private static function lockUIObj(uiObj:DisplayObject) : void
      {
         _lockUIObject = uiObj;
      }
      
      private static function update() : void
      {
         var name:String = null;
         var newY:Number = NaN;
         var newX:Number = NaN;
         if(_lockUIObject == null)
         {
            _showText.visible = false;
         }
         _uiLayer.graphics.clear();
         if(_lockUIObject && _lockUIObject.parent)
         {
            if(_drag)
            {
               _tempPoint = _lockUIObject.parent.globalToLocal(new Point(_stage.mouseX + _clickOffset.x,_stage.mouseY + _clickOffset.y));
               _lockUIObject.x = _tempPoint.x;
               _lockUIObject.y = _tempPoint.y;
            }
            _showText.visible = true;
            _stagePoint.x = _lockUIObject.x;
            _stagePoint.y = _lockUIObject.y;
            _tempPoint = _lockUIObject.parent.localToGlobal(_stagePoint);
            _uiLayer.graphics.lineStyle(2,6684927);
            _uiLayer.graphics.beginFill(0,0.2);
            _uiLayer.graphics.drawRect(_tempPoint.x,_tempPoint.y,_lockUIObject.width,_lockUIObject.height);
            _uiLayer.graphics.endFill();
            name = _lockUIObject.name;
            if(name.indexOf("instance") != -1 || name == "")
            {
               name = getQualifiedClassName(_lockUIObject);
            }
            _showText.text = "[" + name + ",x:" + _lockUIObject.x + ",y:" + _lockUIObject.y + ",w:" + _lockUIObject.width + ",h:" + _lockUIObject.height + "]";
            _showText.width = _showText.textWidth + 2;
            _showText.height = _showText.textHeight + 2;
            newY = _tempPoint.y - 20;
            newX = _tempPoint.x;
            if(newX < 0)
            {
               newX = 0;
            }
            if(newX > _stage.stageWidth - _showText.width)
            {
               newX = _stage.stageWidth - _showText.width;
            }
            _showText.x = newX;
            _showText.y = newY < 0?Number(0):Number(newY);
         }
         _uiLayer.parent.setChildIndex(_uiLayer,_uiLayer.parent.numChildren - 1);
      }
      
      private static function onFrame(e:Event) : void
      {
         var display:DisplayObject = null;
         if(keyIsDown(Keyboard.CONTROL))
         {
            if(_lockUIObject == null)
            {
               _stagePoint.x = _stage.mouseX;
               _stagePoint.y = _stage.mouseY;
               _uderPointArray = _stage.getObjectsUnderPoint(_stagePoint);
               display = _uderPointArray[_uderPointArray.length - 1];
               lockUIObj(display);
            }
            else if(keyIsDown(Keyboard.SHIFT))
            {
               if(_drag == false && _lockUIObject.parent)
               {
                  _tempPoint = _lockUIObject.parent.localToGlobal(new Point(_lockUIObject.x,_lockUIObject.y));
                  _clickOffset.x = _tempPoint.x - _stage.mouseX;
                  _clickOffset.y = _tempPoint.y - _stage.mouseY;
                  _drag = true;
               }
            }
            else
            {
               _drag = false;
               if(keyIsDown(Keyboard.D) && checkOperation(Keyboard.D))
               {
                  _operation[Keyboard.D] = true;
                  DebugInfo.parse(_main);
               }
               if(keyIsDown(187) && checkOperation(187))
               {
                  if(_lockUIObject.parent)
                  {
                     _operation[187] = true;
                     lockUIObj(_lockUIObject.parent);
                  }
               }
               if(keyIsDown(Keyboard.LEFT) && checkOperation(Keyboard.LEFT))
               {
                  _operation[Keyboard.LEFT] = true;
                  _lockUIObject.x--;
               }
               if(keyIsDown(Keyboard.RIGHT) && checkOperation(Keyboard.RIGHT))
               {
                  _operation[Keyboard.RIGHT] = true;
                  _lockUIObject.x++;
               }
               if(keyIsDown(Keyboard.UP) && checkOperation(Keyboard.UP))
               {
                  _operation[Keyboard.UP] = true;
                  _lockUIObject.y--;
               }
               if(keyIsDown(Keyboard.DOWN) && checkOperation(Keyboard.DOWN))
               {
                  _operation[Keyboard.DOWN] = true;
                  _lockUIObject.y++;
               }
               if(keyIsDown(Keyboard.V) && checkOperation(Keyboard.V))
               {
                  _operation[Keyboard.V] = true;
                  if(_lockUIObject.visible)
                  {
                     _lockUIObject.visible = false;
                  }
                  else
                  {
                     _lockUIObject.visible = true;
                  }
               }
            }
         }
         else
         {
            lockUIObj(null);
         }
         update();
      }
      
      private static function checkOperation(key:int) : Boolean
      {
         if(_operation[key] == false || _operation[key] == null)
         {
            return true;
         }
         return false;
      }
   }
}
