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
        var View = (function (_super) {
            __extends(View, _super);
            // private _passView:com.game.PassView;
            function View() {
                var _this = _super.call(this) || this;
                _this._score = 0;
                _this._addScore = 0;
                _this.graphics.clear();
                _this.graphics.beginFill(16513263, 1);
                _this.graphics.drawRect(0, 0, 546, 745);
                _this.graphics.endFill();
                return _this;
            }
            View.prototype.create = function (size, gridUnitSize) {
                size = (size);
                gridUnitSize = (gridUnitSize);
                var _self__ = this;
                var title = new egret.TextField();
                title["selectable"] = false;
                // title.antiAliasType = flash.AntiAliasType.NORMAL;
                title.text = "2048";
                // title.textAlign = flash.TextFieldAutoSize.LEFT;
                // var tf:flash.TextFormat = title.getTextFormat();
                // tf.color = 7827045;
                // tf.align = flash.TextFormatAlign.CENTER;
                // tf.size = 80;
                // tf.font = com.game.Setting.FONTTYPE;
                // title.defaultTextFormat = tf;
                // title.setTextFormat(tf);
                title.y = 42;
                title.x = 24;
                this._newTargetTxt = new egret.TextField();
                this._newTargetTxt["selectable"] = false;
                // this._newTargetTxt.antiAliasType = flash.AntiAliasType.NORMAL;
                // this._newTargetTxt.text = "2048";
                // this._newTargetTxt.textAlign = flash.TextFieldAutoSize.LEFT;
                // tf = this._newTargetTxt.getTextFormat();
                // tf.color = 7827045;
                // tf.align = flash.TextFormatAlign.CENTER;
                // tf.size = 20;
                // tf.font = com.game.Setting.FONTTYPE;
                // this._newTargetTxt.defaultTextFormat = tf;
                // this._newTargetTxt.setTextFormat(tf);
                this._newTargetTxt.y = title.y + title.textHeight + 20;
                this._newTargetTxt.x = title.x;
                // this._curScoreTab = new com.game.ScoreTab("Score",0);
                // this._curScoreTab.x = 358;
                // this._curScoreTab.y = 40;
                // this._bestScoreTab = new com.game.ScoreTab("Best",0);
                // this._bestScoreTab.y = 40;
                this.tileContainer = new com.game.TileContainer(size, gridUnitSize);
                this.tileContainer.y = 228;
                this.tileContainer.x = (546 - this.tileContainer.width) / 2;
                this._newGameTab = new com.game.Tab("新的游戏", 16381682, 9402982, 18, 20, 10);
                this._newGameTab.x = 394;
                this._newGameTab.y = 141;
                this._newGameTab["buttonMode"] = true;
                this._newGameTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewGame, this);
                this._bestContainer = new egret.Sprite();
                // this._messageView = new com.game.MessageView();
                // this._messageView.x = this.tileContainer.x;
                // this._messageView.y = this.tileContainer.y;
                this.hideMessage();
                // this._passView = new com.game.PassView();
                // this._passView.x = this.tileContainer.x;
                // this._passView.y = this.tileContainer.y;
                this.hidePass();
                this._alertMsg = new egret.TextField();
                this._alertMsg["selectable"] = false;
                // this._alertMsg.antiAliasType = flash.AntiAliasType.NORMAL;
                this._alertMsg.text = "";
                // this._alertMsg.textAlign = flash.TextFieldAutoSize.LEFT;
                // tf = this._alertMsg.getTextFormat();
                // tf.color = 9402982;
                // tf.size = 24;
                // tf.font = com.game.Setting.FONTTYPE;
                // this._alertMsg.defaultTextFormat = tf;
                // this._alertMsg.setTextFormat(tf);
                this.updateTabsPos();
                _self__.addChild(this.tileContainer);
                // _self__.addChild(this._messageView);
                _self__.addChild(title);
                _self__.addChild(this._newTargetTxt);
                // _self__.addChild(this._curScoreTab);
                // _self__.addChild(this._bestScoreTab);
                _self__.addChild(this._newGameTab);
                _self__.addChild(this._alertMsg);
                // _self__.addChild(this._passView);
                this._newGameTab.setTabName("查看排名");
            };
            View.prototype.onNewGame = function (event) {
                com.common.DispatcherHandler.instance.dispatcheEvent(com.game.View.EVENT_NEWGAME, null);
            };
            View.prototype.setCurScore = function (value) {
                value = (value);
                this._addScore = (value - this._score);
                this._score = (value);
                // this._curScoreTab.setValue(value);
            };
            View.prototype.alertAddScore = function () {
                if (this._addScore > 0) {
                    this._alertMsg.text = "+" + this.toString();
                    // this._alertMsg.x = this._curScoreTab.x + (this._curScoreTab.width - this._alertMsg.width) / 2;
                    // this._alertMsg.y = this._curScoreTab.y + 6;
                    // this._alertMsg.alpha = 1;
                    // com.greensock.TweenLite.killTweensOf(this._alertMsg);
                    // com.greensock.TweenLite.to(this._alertMsg,0.6,{"y":this._alertMsg.y - 20,"alpha":0,"ease":com.greensock.easing.Linear.easeNone});
                }
            };
            View.prototype.setBestScore = function (value) {
                value = (value);
                // this._bestScoreTab.setValue(value);
            };
            View.prototype.updateTabsPos = function () {
                // this._bestScoreTab.x = 522 - this._bestScoreTab.width;
                // this._curScoreTab.x = this._bestScoreTab.x - 4 - this._curScoreTab.width;
            };
            View.prototype.showMessage = function (score) {
                // score =(score);
                // this._messageView.setMsg("太厉害了！获得了" + score + "分");
                // this._messageView.visible = true;
            };
            View.prototype.hideMessage = function () {
                // this._messageView.visible = false;
            };
            View.prototype.showPass = function () {
                // this._passView.visible = true;
            };
            View.prototype.hidePass = function () {
                // this._passView.visible = false;
            };
            View.prototype.updateNewTarget = function (msg) {
                this._newTargetTxt.text = msg;
            };
            return View;
        }(egret.Sprite));
        game.View = View;
        __reflect(View.prototype, "com.game.View");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
com.game.View.EVENT_NEWGAME = "EVENT_NEWGAME";
//# sourceMappingURL=View.js.map