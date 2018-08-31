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
        var KeyUtil = (function (_super) {
            __extends(KeyUtil, _super);
            function KeyUtil() {
                var _this = _super.call(this) || this;
                _this._enable = false;
                _this = _super.call(this) || this;
                if (com.common.KeyUtil._singlen == false || com.common.KeyUtil._instance != null) {
                    // throw new flash.Error("单例模式，非法创建").message;
                }
                // this._downKeysMap = new flash.Dictionary();
                // this._openKeysMap = new flash.Dictionary();
                // this._handleKeysMap = new flash.Dictionary();
                _this._enable = false;
                return _this;
            }
            Object.defineProperty(KeyUtil, "instance", {
                get: function () {
                    if (com.common.KeyUtil._instance == null) {
                        com.common.KeyUtil._singlen = true;
                        com.common.KeyUtil._instance = new com.common.KeyUtil();
                        com.common.KeyUtil._singlen = false;
                    }
                    return com.common.KeyUtil._instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyUtil.prototype, "enable", {
                set: function (value) {
                    this._enable = value;
                },
                enumerable: true,
                configurable: true
            });
            KeyUtil.prototype.openKey = function (key) {
                // key = (key);
                // this._openKeysMap.setItem(key,true);
            };
            KeyUtil.prototype.closeKey = function (key) {
                // if(this._openKeysMap.getItem("hasOwnProperty")(key))
                // {
                // 	this._openKeysMap.delItem(key);
                // }
            };
            KeyUtil.prototype.injectStage = function (stage) {
                this.stage = stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onKeyDown, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onKeyUp, this);
                stage.addEventListener(egret.Event.DEACTIVATE, this.onFocusOutHandler, this);
                stage.addEventListener(egret.Event.ACTIVATE, this.onFocusInAHandler, this);
            };
            KeyUtil.prototype.onFocusChange = function (event) {
                this.stage["focus"] = this.stage;
            };
            KeyUtil.prototype.onFocusInAHandler = function (event) {
                com.common.DispatcherHandler.instance.dispatcheEvent(com.common.KeyUtil.AVTIVITY);
            };
            KeyUtil.prototype.onFocusOutHandler = function (event) {
                // var key:any = null;
                // for(var forinvar__ in this._downKeysMap.map)
                // {
                // 	key = this._downKeysMap.map[forinvar__][0];
                // 	this._downKeysMap.setItem(key,false);
                // }
                // com.common.DispatcherHandler.instance.dispatcheEvent(com.common.KeyUtil.DISAVTIVITY);
            };
            KeyUtil.prototype.onKeyUp = function (event) {
                // this._downKeysMap.delItem(event.keyCode);
            };
            KeyUtil.prototype.onKeyDown = function (event) {
                // this._downKeysMap.setItem(event.keyCode,true);
                // this.execute(event);
            };
            KeyUtil.prototype.isKeyDown = function (keyCode) {
                keyCode = ~~(keyCode);
                return;
                // return this._downKeysMap.getItem(keyCode) == true;
            };
            KeyUtil.prototype.addKeyListener = function (handler, codes) {
                if (codes) {
                    codes.sort();
                    // this._handleKeysMap.setItem(codes.toString(),handler);
                }
            };
            KeyUtil.prototype.removeKeyHandler = function (codes) {
                if (codes) {
                    codes.sort();
                    // this._handleKeysMap.delItem(codes.toString());
                }
            };
            KeyUtil.prototype.execute = function (event) {
                var keys = null;
                var key = null;
                var handler = null;
                if (this._enable == false) {
                    return;
                }
                // if(this._openKeysMap.getItem(event.keyCode) == true)
                // {
                // 	keys = [];
                // 	for(var forinvar__ in this._downKeysMap.map)
                // 	{
                // 		key = this._downKeysMap.map[forinvar__][0];
                // 		keys.push(flash.tranint(key));
                // 	}
                // 	keys.sort();
                // 	handler = this._handleKeysMap.getItem(keys.toString());
                // 	if(handler != null)
                // 	{
                // 		handler(event);
                // 	}
                // }
            };
            return KeyUtil;
        }(egret.HashObject));
        common.KeyUtil = KeyUtil;
        __reflect(KeyUtil.prototype, "com.common.KeyUtil");
    })(common = com.common || (com.common = {}));
})(com || (com = {}));
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
//# sourceMappingURL=KeyUtil.js.map