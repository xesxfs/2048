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
    var game;
    (function (game) {
        var Tab = (function (_super) {
            __extends(Tab, _super);
            function Tab(tabName, nameColor, bgColor, fontSize, wgap, hgap) {
                if (tabName === void 0) { tabName = ""; }
                if (nameColor === void 0) { nameColor = 16777215; }
                if (bgColor === void 0) { bgColor = 12430498; }
                if (fontSize === void 0) { fontSize = 12; }
                if (wgap === void 0) { wgap = 0; }
                if (hgap === void 0) { hgap = 0; }
                var _this = _super.call(this) || this;
                _this._nameColor = 0;
                _this._bgColor = 0;
                _this._wgap = NaN;
                _this._hgap = NaN;
                _this.touchEnabled = true;
                var _self__ = _this;
                _this._nameColor = (nameColor);
                _this._bgColor = (bgColor);
                _this._wgap = wgap;
                _this._hgap = hgap;
                _this._tabNameText = new egret.TextField();
                _this._tabNameText["selectable"] = false;
                _this._tabNameText.touchEnabled = false;
                // this._tabNameText.antiAliasType = flash.AntiAliasType.NORMAL;
                // this._tabNameText.textAlign = flash.TextFieldAutoSize.LEFT;
                // var tf:flash.TextFormat = this._tabNameText.getTextFormat();
                // tf = this._tabNameText.getTextFormat();
                // tf.color = this._nameColor;
                // tf.size = fontSize;
                // tf.font = "Leelawadee";
                // this._tabNameText.defaultTextFormat = tf;
                // this._tabNameText.setTextFormat(tf);
                _self__.addChild(_this._tabNameText);
                _this.setTabName(tabName);
                return _this;
            }
            Tab.prototype.setTabName = function (name) {
                this._tabNameText.text = name;
                this.resize();
            };
            Tab.prototype.resize = function () {
                var cwidth = 0;
                var cheight = 0;
                cwidth = this._tabNameText.textWidth + this._wgap * 2;
                cheight = this._tabNameText.textHeight + this._hgap * 2;
                this._tabNameText.y = (cheight - this._tabNameText.textHeight) / 2 - 2;
                this._tabNameText.x = (cwidth - this._tabNameText.textWidth) / 2;
                this.graphics.clear();
                this.graphics.beginFill(this._bgColor, 1);
                this.graphics.drawRoundRect(0, 0, cwidth, cheight, 10, 10);
                this.graphics.endFill();
            };
            return Tab;
        }(egret.Sprite));
        game.Tab = Tab;
        __reflect(Tab.prototype, "com.game.Tab");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
// flash.extendsClass("com.game.Tab","egret.Sprite")
//# sourceMappingURL=Tab.js.map