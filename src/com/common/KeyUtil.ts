module com {
	export module common {
		export class KeyUtil extends egret.HashObject {
			public static _instance:com.common.KeyUtil;
			public static _singlen:boolean;
			public static DISAVTIVITY:string;
			public static AVTIVITY:string;
			public static A:number;
			public static B:number;
			public static C:number;
			public static D:number;
			public static E:number;
			public static F:number;
			public static G:number;
			public static H:number;
			public static I:number;
			public static J:number;
			public static K:number;
			public static L:number;
			public static M:number;
			public static N:number;
			public static O:number;
			public static P:number;
			public static Q:number;
			public static R:number;
			public static S:number;
			public static T:number;
			public static U:number;
			public static V:number;
			public static W:number;
			public static X:number;
			public static Y:number;
			public static Z:number;
			public static BACKSPACE:number;
			public static CAPS_LOCK:number;
			public static CONTROL:number;
			public static DELETE:number;
			public static DOWN:number;
			public static END:number;
			public static ENTER:number;
			public static ESCAPE:number;
			public static F1:number;
			public static F10:number;
			public static F11:number;
			public static F12:number;
			public static F13:number;
			public static F14:number;
			public static F15:number;
			public static F2:number;
			public static F3:number;
			public static F4:number;
			public static F5:number;
			public static F6:number;
			public static F7:number;
			public static F8:number;
			public static F9:number;
			public static HOME:number;
			public static INSERT:number;
			public static LEFT:number;
			public static NUMPAD_0:number;
			public static NUMPAD_1:number;
			public static NUMPAD_2:number;
			public static NUMPAD_3:number;
			public static NUMPAD_4:number;
			public static NUMPAD_5:number;
			public static NUMPAD_6:number;
			public static NUMPAD_7:number;
			public static NUMPAD_8:number;
			public static NUMPAD_9:number;
			public static NUMPAD_ADD:number;
			public static NUMPAD_DECIMAL:number;
			public static NUMPAD_DIVIDE:number;
			public static NUMPAD_ENTER:number;
			public static NUMPAD_MULTIPLY:number;
			public static NUMPAD_SUBTRACT:number;
			public static PAGE_DOWN:number;
			public static PAGE_UP:number;
			public static RIGHT:number;
			public static SHIFT:number;
			public static SPACE:number;
			public static TAB:number;
			public static UP:number;
			private stage:egret.Stage;
			private _enable:boolean = false;
			private _downKeysMap:flash.Dictionary;
			private _openKeysMap:flash.Dictionary;
			private _handleKeysMap:flash.Dictionary;
			private _openKeyMap:com.common.Direction;

			public constructor()
			{
				super();
				super();
				if(com.common.KeyUtil._singlen == false || com.common.KeyUtil._instance != null)
				{
					throw new flash.Error("单例模式，非法创建").message;
				}
				this._downKeysMap = new flash.Dictionary();
				this._openKeysMap = new flash.Dictionary();
				this._handleKeysMap = new flash.Dictionary();
				this._enable = false;
			}

			public static get instance():com.common.KeyUtil
			{
				if(com.common.KeyUtil._instance == null)
				{
					com.common.KeyUtil._singlen = true;
					com.common.KeyUtil._instance = new com.common.KeyUtil();
					com.common.KeyUtil._singlen = false;
				}
				return com.common.KeyUtil._instance;
			}

			public set enable(value:boolean)
			{
				this._enable = value;
			}

			public openKey(key:number)
			{
				key = flash.checkInt(key);
				this._openKeysMap.setItem(key,true);
			}

			public closeKey(key:string)
			{
				if(this._openKeysMap.getItem("hasOwnProperty")(key))
				{
					this._openKeysMap.delItem(key);
				}
			}

			public injectStage(stage:egret.Stage)
			{
				this.stage = stage;
				stage.addEventListener(flash.KeyboardEvent.KEY_DOWN,flash.bind(this.onKeyDown,this),null);
				stage.addEventListener(flash.KeyboardEvent.KEY_UP,flash.bind(this.onKeyUp,this),null);
				stage.addEventListener(egret.Event.DEACTIVATE,flash.bind(this.onFocusOutHandler,this),null);
				stage.addEventListener(egret.Event.ACTIVATE,flash.bind(this.onFocusInAHandler,this),null);
			}

			protected onFocusChange(event:egret.FocusEvent)
			{
				this.stage["focus"] = this.stage;
			}

			protected onFocusInAHandler(event:egret.Event)
			{
				com.common.DispatcherHandler.instance.dispatcheEvent(com.common.KeyUtil.AVTIVITY);
			}

			protected onFocusOutHandler(event:egret.Event)
			{
				var key:any = null;
				for(var forinvar__ in this._downKeysMap.map)
				{
					key = this._downKeysMap.map[forinvar__][0];
					this._downKeysMap.setItem(key,false);
				}
				com.common.DispatcherHandler.instance.dispatcheEvent(com.common.KeyUtil.DISAVTIVITY);
			}

			protected onKeyUp(event:flash.KeyboardEvent)
			{
				this._downKeysMap.delItem(event.keyCode);
			}

			protected onKeyDown(event:flash.KeyboardEvent)
			{
				this._downKeysMap.setItem(event.keyCode,true);
				this.execute(event);
			}

			public isKeyDown(keyCode:number):boolean
			{
				keyCode = flash.checkUint(keyCode);
				return this._downKeysMap.getItem(keyCode) == true;
			}

			public addKeyListener(handler:Function,codes:Array<any>)
			{
				if(codes)
				{
					codes.sort();
					this._handleKeysMap.setItem(codes.toString(),handler);
				}
			}

			public removeKeyHandler(codes:Array<any>)
			{
				if(codes)
				{
					codes.sort();
					this._handleKeysMap.delItem(codes.toString());
				}
			}

			private execute(event:flash.KeyboardEvent)
			{
				var keys:Array<any> = <any>null;
				var key:any = null;
				var handler:Function = <any>null;
				if(this._enable == false)
				{
					return ;
				}
				if(this._openKeysMap.getItem(event.keyCode) == true)
				{
					keys = [];
					for(var forinvar__ in this._downKeysMap.map)
					{
						key = this._downKeysMap.map[forinvar__][0];
						keys.push(flash.tranint(key));
					}
					keys.sort();
					handler = this._handleKeysMap.getItem(keys.toString());
					if(handler != null)
					{
						handler(event);
					}
				}
			}

		}
	}
}

com.common.KeyUtil._instance = null;
com.common.KeyUtil._singlen = false;
com.common.KeyUtil.DISAVTIVITY = "DISAVTIVITY";
com.common.KeyUtil.AVTIVITY = "AVTIVITY";
com.common.KeyUtil.A = 65;
com.common.KeyUtil.B = 66;
com.common.KeyUtil.C = 67;
com.common.KeyUtil.D = 68;
com.common.KeyUtil.E = 69;
com.common.KeyUtil.F = 70;
com.common.KeyUtil.G = 71;
com.common.KeyUtil.H = 72;
com.common.KeyUtil.I = 73;
com.common.KeyUtil.J = 74;
com.common.KeyUtil.K = 75;
com.common.KeyUtil.L = 76;
com.common.KeyUtil.M = 77;
com.common.KeyUtil.N = 78;
com.common.KeyUtil.O = 79;
com.common.KeyUtil.P = 80;
com.common.KeyUtil.Q = 81;
com.common.KeyUtil.R = 82;
com.common.KeyUtil.S = 83;
com.common.KeyUtil.T = 84;
com.common.KeyUtil.U = 85;
com.common.KeyUtil.V = 86;
com.common.KeyUtil.W = 87;
com.common.KeyUtil.X = 88;
com.common.KeyUtil.Y = 89;
com.common.KeyUtil.Z = 90;
com.common.KeyUtil.BACKSPACE = 8;
com.common.KeyUtil.CAPS_LOCK = 20;
com.common.KeyUtil.CONTROL = 17;
com.common.KeyUtil.DELETE = 46;
com.common.KeyUtil.DOWN = 40;
com.common.KeyUtil.END = 35;
com.common.KeyUtil.ENTER = 13;
com.common.KeyUtil.ESCAPE = 27;
com.common.KeyUtil.F1 = 112;
com.common.KeyUtil.F10 = 121;
com.common.KeyUtil.F11 = 122;
com.common.KeyUtil.F12 = 123;
com.common.KeyUtil.F13 = 124;
com.common.KeyUtil.F14 = 125;
com.common.KeyUtil.F15 = 126;
com.common.KeyUtil.F2 = 113;
com.common.KeyUtil.F3 = 114;
com.common.KeyUtil.F4 = 115;
com.common.KeyUtil.F5 = 116;
com.common.KeyUtil.F6 = 117;
com.common.KeyUtil.F7 = 118;
com.common.KeyUtil.F8 = 119;
com.common.KeyUtil.F9 = 120;
com.common.KeyUtil.HOME = 36;
com.common.KeyUtil.INSERT = 45;
com.common.KeyUtil.LEFT = 37;
com.common.KeyUtil.NUMPAD_0 = 96;
com.common.KeyUtil.NUMPAD_1 = 97;
com.common.KeyUtil.NUMPAD_2 = 98;
com.common.KeyUtil.NUMPAD_3 = 99;
com.common.KeyUtil.NUMPAD_4 = 100;
com.common.KeyUtil.NUMPAD_5 = 101;
com.common.KeyUtil.NUMPAD_6 = 102;
com.common.KeyUtil.NUMPAD_7 = 103;
com.common.KeyUtil.NUMPAD_8 = 104;
com.common.KeyUtil.NUMPAD_9 = 105;
com.common.KeyUtil.NUMPAD_ADD = 107;
com.common.KeyUtil.NUMPAD_DECIMAL = 110;
com.common.KeyUtil.NUMPAD_DIVIDE = 111;
com.common.KeyUtil.NUMPAD_ENTER = 108;
com.common.KeyUtil.NUMPAD_MULTIPLY = 106;
com.common.KeyUtil.NUMPAD_SUBTRACT = 109;
com.common.KeyUtil.PAGE_DOWN = 34;
com.common.KeyUtil.PAGE_UP = 33;
com.common.KeyUtil.RIGHT = 39;
com.common.KeyUtil.SHIFT = 16;
com.common.KeyUtil.SPACE = 32;
com.common.KeyUtil.TAB = 9;
com.common.KeyUtil.UP = 38;
