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
        var TileSkin = (function (_super) {
            __extends(TileSkin, _super);
            function TileSkin() {
                var _this = _super.call(this) || this;
                _this._textColor = 0;
                var _self__ = _this;
                _this._textfiled = new egret.TextField();
                _this._textfiled["selectable"] = false;
                _this._textfiled["wordWrap"] = true;
                _this._textfiled.multiline = true;
                // this._textfiled.antiAliasType = flash.AntiAliasType.NORMAL;
                _self__.addChild(_this._textfiled);
                return _this;
            }
            TileSkin.prototype.setData = function (value) {
                value = ~~(value);
                this._textfiled.text = value.toString();
            };
            TileSkin.prototype.setSkin = function (textColor, backgroundColor, gridUnitSize, fontSize) {
                textColor = (textColor);
                backgroundColor = (backgroundColor);
                fontSize = (fontSize);
                this.graphics.clear();
                this.graphics.beginFill(backgroundColor, 1);
                var startXY = -gridUnitSize / 2;
                this.graphics.drawRoundRect(startXY, startXY, gridUnitSize, gridUnitSize, 10, 10);
                this.graphics.endFill();
                // var tf: flash.TextFormat = this._textfiled.getTextFormat();
                // tf.color = textColor;
                // tf.align = flash.TextFormatAlign.CENTER;
                // tf.size = fontSize;
                // tf.font = com.game.Setting.FONTTYPE;
                // this._textfiled.defaultTextFormat = tf;
                // this._textfiled.setTextFormat(tf);
                this._textfiled.x = -gridUnitSize / 2;
                this._textfiled.width = gridUnitSize;
                this._textfiled.height = this._textfiled.textHeight;
                this._textfiled.y = (gridUnitSize - this._textfiled.height) / 2 - gridUnitSize / 2;
            };
            return TileSkin;
        }(egret.Sprite));
        game.TileSkin = TileSkin;
        __reflect(TileSkin.prototype, "com.game.TileSkin");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=TileSkin.js.map