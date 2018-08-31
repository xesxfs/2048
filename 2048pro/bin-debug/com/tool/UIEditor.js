// module com {
// 	export module tool {
// 		export class UIEditor extends egret.HashObject {
// 			public static _stage:egret.Stage;
// 			public static _main:egret.Sprite;
// 			public static _uiLayer:egret.Sprite;
// 			public static _showText:flash.TextField;
// 			public static _keyDownList:any;
// 			public static _lockUIObject:egret.DisplayObject;
// 			public static _operation:any;
// 			public static _uderPointArray:Array<any>;
// 			public static _drag:boolean = false;
// 			public static _clickOffset:egret.Point;
// 			public static _tempPoint:egret.Point;
// 			public static _stagePoint:egret.Point;
// 			public constructor()
// 			{
// 				super();
// 				super();
// 			}
// 			public static init(main:egret.Sprite)
// 			{
// 				if(com.tool.UIEditor._stage)
// 				{
// 					return ;
// 				}
// 				com.tool.UIEditor._tempPoint = new egret.Point();
// 				com.tool.UIEditor._stagePoint = new egret.Point();
// 				com.tool.UIEditor._clickOffset = new egret.Point();
// 				com.tool.UIEditor._keyDownList = [];
// 				com.tool.UIEditor._operation = [];
// 				com.tool.UIEditor._stage = main.stage;
// 				com.tool.UIEditor._main = main;
// 				com.tool.UIEditor._showText = new flash.TextField();
// 				com.tool.UIEditor._showText.background = true;
// 				com.tool.UIEditor._showText.defaultTextFormat = new flash.TextFormat(null,15,0,true);
// 				com.tool.UIEditor._uiLayer = new egret.Sprite();
// 				com.tool.UIEditor._uiLayer.touchChildren = false;
// 				com.tool.UIEditor._uiLayer.touchEnabled = false;
// 				com.tool.UIEditor._uiLayer.addChild(com.tool.UIEditor._showText);
// 				com.tool.UIEditor._stage.addChild(com.tool.UIEditor._uiLayer);
// 				com.tool.UIEditor._stage.addEventListener(egret.Event.ENTER_FRAME,com.tool.UIEditor.onFrame,null);
// 				com.tool.UIEditor._stage.addEventListener(flash.KeyboardEvent.KEY_DOWN,com.tool.UIEditor.keyDown,null);
// 				com.tool.UIEditor._stage.addEventListener(flash.KeyboardEvent.KEY_UP,com.tool.UIEditor.keyUp,null);
// 			}
// 			private static keyDown(e:flash.KeyboardEvent)
// 			{
// 				com.tool.UIEditor._keyDownList[e.keyCode] = true;
// 			}
// 			private static keyUp(e:flash.KeyboardEvent)
// 			{
// 				com.tool.UIEditor._keyDownList[e.keyCode] = false;
// 				com.tool.UIEditor._operation[e.keyCode] = false;
// 			}
// 			private static keyIsDown(key:number):boolean
// 			{
// 				key = flash.checkUint(key);
// 				return com.tool.UIEditor._keyDownList[key];
// 			}
// 			private static lockUIObj(uiObj:egret.DisplayObject)
// 			{
// 				com.tool.UIEditor._lockUIObject = uiObj;
// 			}
// 			private static update()
// 			{
// 				var name:string = <any>null;
// 				var newY:number = <any>NaN;
// 				var newX:number = <any>NaN;
// 				if(com.tool.UIEditor._lockUIObject == null)
// 				{
// 					com.tool.UIEditor._showText.visible = false;
// 				}
// 				com.tool.UIEditor._uiLayer.graphics.clear();
// 				if(com.tool.UIEditor._lockUIObject && com.tool.UIEditor._lockUIObject.parent)
// 				{
// 					if(com.tool.UIEditor._drag)
// 					{
// 						com.tool.UIEditor._tempPoint = flash.globalToLocal(com.tool.UIEditor._lockUIObject.parent,new egret.Point(com.tool.UIEditor._stage["mouseX"] + com.tool.UIEditor._clickOffset.x,com.tool.UIEditor._stage["mouseY"] + com.tool.UIEditor._clickOffset.y));
// 						com.tool.UIEditor._lockUIObject.x = com.tool.UIEditor._tempPoint.x;
// 						com.tool.UIEditor._lockUIObject.y = com.tool.UIEditor._tempPoint.y;
// 					}
// 					com.tool.UIEditor._showText.visible = true;
// 					com.tool.UIEditor._stagePoint.x = com.tool.UIEditor._lockUIObject.x;
// 					com.tool.UIEditor._stagePoint.y = com.tool.UIEditor._lockUIObject.y;
// 					com.tool.UIEditor._tempPoint = flash.localToGlobal(com.tool.UIEditor._lockUIObject.parent,com.tool.UIEditor._stagePoint);
// 					com.tool.UIEditor._uiLayer.graphics.lineStyle(2,6684927);
// 					com.tool.UIEditor._uiLayer.graphics.beginFill(0,0.2);
// 					com.tool.UIEditor._uiLayer.graphics.drawRect(com.tool.UIEditor._tempPoint.x,com.tool.UIEditor._tempPoint.y,com.tool.UIEditor._lockUIObject.width,com.tool.UIEditor._lockUIObject.height);
// 					com.tool.UIEditor._uiLayer.graphics.endFill();
// 					name = com.tool.UIEditor._lockUIObject.name;
// 					if(name.indexOf("instance") != -1 || name == "")
// 					{
// 						name = egret.getQualifiedClassName(com.tool.UIEditor._lockUIObject);
// 					}
// 					com.tool.UIEditor._showText.text = "[" + name + ",x:" + com.tool.UIEditor._lockUIObject.x + ",y:" + com.tool.UIEditor._lockUIObject.y + ",w:" + com.tool.UIEditor._lockUIObject.width + ",h:" + com.tool.UIEditor._lockUIObject.height + "]";
// 					com.tool.UIEditor._showText.width = com.tool.UIEditor._showText.textWidth + 2;
// 					com.tool.UIEditor._showText.height = com.tool.UIEditor._showText.textHeight + 2;
// 					newY = com.tool.UIEditor._tempPoint.y - 20;
// 					newX = com.tool.UIEditor._tempPoint.x;
// 					if(newX < 0)
// 					{
// 						newX = 0;
// 					}
// 					if(newX > com.tool.UIEditor._stage.stageWidth - com.tool.UIEditor._showText.width)
// 					{
// 						newX = com.tool.UIEditor._stage.stageWidth - com.tool.UIEditor._showText.width;
// 					}
// 					com.tool.UIEditor._showText.x = newX;
// 					com.tool.UIEditor._showText.y = newY < 0?flash.trannumber(0):flash.trannumber(newY);
// 				}
// 				com.tool.UIEditor._uiLayer.parent.setChildIndex(com.tool.UIEditor._uiLayer,com.tool.UIEditor._uiLayer.parent.numChildren - 1);
// 			}
// 			private static onFrame(e:egret.Event)
// 			{
// 				var display:egret.DisplayObject = <any>null;
// 				if(com.tool.UIEditor.keyIsDown(flash.Keyboard.CONTROL))
// 				{
// 					if(com.tool.UIEditor._lockUIObject == null)
// 					{
// 						com.tool.UIEditor._stagePoint.x = com.tool.UIEditor._stage["mouseX"];
// 						com.tool.UIEditor._stagePoint.y = com.tool.UIEditor._stage["mouseY"];
// 						com.tool.UIEditor._uderPointArray = com.tool.UIEditor._stage["getObjectsUnderPoint"](com.tool.UIEditor._stagePoint);
// 						display = com.tool.UIEditor._uderPointArray[com.tool.UIEditor._uderPointArray.length - 1];
// 						com.tool.UIEditor.lockUIObj(display);
// 					}
// 					else if(com.tool.UIEditor.keyIsDown(flash.Keyboard.SHIFT))
// 					{
// 						if(com.tool.UIEditor._drag == false && com.tool.UIEditor._lockUIObject.parent)
// 						{
// 							com.tool.UIEditor._tempPoint = flash.localToGlobal(com.tool.UIEditor._lockUIObject.parent,new egret.Point(com.tool.UIEditor._lockUIObject.x,com.tool.UIEditor._lockUIObject.y));
// 							com.tool.UIEditor._clickOffset.x = com.tool.UIEditor._tempPoint.x - com.tool.UIEditor._stage["mouseX"];
// 							com.tool.UIEditor._clickOffset.y = com.tool.UIEditor._tempPoint.y - com.tool.UIEditor._stage["mouseY"];
// 							com.tool.UIEditor._drag = true;
// 						}
// 					}
// 					else
// 					{
// 						com.tool.UIEditor._drag = false;
// 						if(com.tool.UIEditor.keyIsDown(flash.Keyboard.D) && com.tool.UIEditor.checkOperation(flash.Keyboard.D))
// 						{
// 							com.tool.UIEditor._operation[flash.Keyboard.D] = true;
// 							com.tool.DebugInfo.parse(com.tool.UIEditor._main);
// 						}
// 						if(com.tool.UIEditor.keyIsDown(187) && com.tool.UIEditor.checkOperation(187))
// 						{
// 							if(com.tool.UIEditor._lockUIObject.parent)
// 							{
// 								com.tool.UIEditor._operation[187] = true;
// 								com.tool.UIEditor.lockUIObj(com.tool.UIEditor._lockUIObject.parent);
// 							}
// 						}
// 						if(com.tool.UIEditor.keyIsDown(flash.Keyboard.LEFT) && com.tool.UIEditor.checkOperation(flash.Keyboard.LEFT))
// 						{
// 							com.tool.UIEditor._operation[flash.Keyboard.LEFT] = true;
// 							com.tool.UIEditor._lockUIObject.x--;
// 						}
// 						if(com.tool.UIEditor.keyIsDown(flash.Keyboard.RIGHT) && com.tool.UIEditor.checkOperation(flash.Keyboard.RIGHT))
// 						{
// 							com.tool.UIEditor._operation[flash.Keyboard.RIGHT] = true;
// 							com.tool.UIEditor._lockUIObject.x++;
// 						}
// 						if(com.tool.UIEditor.keyIsDown(flash.Keyboard.UP) && com.tool.UIEditor.checkOperation(flash.Keyboard.UP))
// 						{
// 							com.tool.UIEditor._operation[flash.Keyboard.UP] = true;
// 							com.tool.UIEditor._lockUIObject.y--;
// 						}
// 						if(com.tool.UIEditor.keyIsDown(flash.Keyboard.DOWN) && com.tool.UIEditor.checkOperation(flash.Keyboard.DOWN))
// 						{
// 							com.tool.UIEditor._operation[flash.Keyboard.DOWN] = true;
// 							com.tool.UIEditor._lockUIObject.y++;
// 						}
// 						if(com.tool.UIEditor.keyIsDown(flash.Keyboard.V) && com.tool.UIEditor.checkOperation(flash.Keyboard.V))
// 						{
// 							com.tool.UIEditor._operation[flash.Keyboard.V] = true;
// 							if(com.tool.UIEditor._lockUIObject.visible)
// 							{
// 								com.tool.UIEditor._lockUIObject.visible = false;
// 							}
// 							else
// 							{
// 								com.tool.UIEditor._lockUIObject.visible = true;
// 							}
// 						}
// 					}
// 				}
// 				else
// 				{
// 					com.tool.UIEditor.lockUIObj(null);
// 				}
// 				com.tool.UIEditor.update();
// 			}
// 			private static checkOperation(key:number):boolean
// 			{
// 				key = (key);
// 				if(com.tool.UIEditor._operation[key] == false || com.tool.UIEditor._operation[key] == null)
// 				{
// 					return true;
// 				}
// 				return false;
// 			}
// 		}
// 	}
// }
//# sourceMappingURL=UIEditor.js.map