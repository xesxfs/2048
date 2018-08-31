// module com {
// 	export module tool {
// 		export class DebugInfo extends egret.HashObject {
// 			public static text:flash.TextField;
// 			public static displayCount:flash.Dictionary;
// 			public constructor()
// 			{
// 				super();
// 				super();
// 			}
// 			public static parse(main:egret.DisplayObjectContainer,ignore:number = 1,init:boolean = true)
// 			{
// 				var display:egret.DisplayObject = <any>null;
// 				var className:string = <any>null;
// 				var index:number = flash.checkInt(0);
// 				var str:any = null;
// 				var num:number = flash.checkInt(0);
// 				var leng:number = flash.checkInt(0);
// 				if(init == true)
// 				{
// 					if(com.tool.DebugInfo.text && com.tool.DebugInfo.text.parent)
// 					{
// 						console.log("DebugInfo close");
// 						main.stage.removeChild(com.tool.DebugInfo.text);
// 						return ;
// 					}
// 					console.log("DebugInfo start");
// 					if(com.tool.DebugInfo.text == null)
// 					{
// 						com.tool.DebugInfo.text = new flash.TextField();
// 						com.tool.DebugInfo.text.defaultTextFormat = new flash.TextFormat(null,15,null,true);
// 						com.tool.DebugInfo.text.background = true;
// 						com.tool.DebugInfo.text.backgroundColor = flash.checkUint(16777215);
// 						com.tool.DebugInfo.text["mouseWheelEnabled"] = true;
// 						com.tool.DebugInfo.text.multiline = true;
// 					}
// 					com.tool.DebugInfo.text.text = "";
// 					com.tool.DebugInfo.displayCount = new flash.Dictionary(true);
// 					main.stage.addChild(com.tool.DebugInfo.text);
// 				}
// 				var len:number = flash.checkInt(main.numChildren);
// 				for(var i:number = flash.checkInt(0);i < len; i++)
// 				{
// 					display = main.getChildAt(i);
// 					className = egret.getQualifiedClassName(display);
// 					index = flash.checkInt(className.indexOf("::"));
// 					if(index != -1)
// 					{
// 						className = className.substr(index + 2);
// 					}
// 					if(com.tool.DebugInfo.displayCount.getItem(className) == null)
// 					{
// 						com.tool.DebugInfo.displayCount.setItem(className,1);
// 					}
// 					else
// 					{
// 						com.tool.DebugInfo.displayCount.setItem(className,com.tool.DebugInfo.displayCount.getItem(className) + 1);
// 					}
// 					if(flash.As3is(display,egret.DisplayObjectContainer))
// 					{
// 						com.tool.DebugInfo.parse(flash.As3As(display,egret.DisplayObjectContainer),ignore,false);
// 					}
// 				}
// 				if(init == true)
// 				{
// 					console.log("DebugInfo done");
// 					for(var forinvar__ in com.tool.DebugInfo.displayCount.map)
// 					{
// 						str = com.tool.DebugInfo.displayCount.map[forinvar__][0];
// 						num = flash.checkInt(com.tool.DebugInfo.displayCount.getItem(str));
// 						leng = flash.checkInt(com.tool.DebugInfo.text.text.length);
// 						if(num > ignore)
// 						{
// 							com.tool.DebugInfo.text.appendText(str + ":" + num + "  ");
// 							if(com.tool.DebugInfo.text.textWidth > com.tool.DebugInfo.text.stage.stageWidth)
// 							{
// 								com.tool.DebugInfo.text.text = com.tool.DebugInfo.text.text.substr(0,leng);
// 								com.tool.DebugInfo.text.appendText("\n" + str + ":" + num + "  ");
// 							}
// 						}
// 					}
// 					com.tool.DebugInfo.text.width = com.tool.DebugInfo.text.textWidth + 2;
// 					com.tool.DebugInfo.text.height = com.tool.DebugInfo.text.textHeight + 4;
// 					com.tool.DebugInfo.text.parent.setChildIndex(com.tool.DebugInfo.text,com.tool.DebugInfo.text.parent.numChildren - 1);
// 				}
// 			}
// 		}
// 	}
// }
//# sourceMappingURL=DebugInfo.js.map