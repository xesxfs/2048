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
        var Setting = (function (_super) {
            __extends(Setting, _super);
            function Setting() {
                return _super.call(this) || this;
            }
            return Setting;
        }(egret.HashObject));
        game.Setting = Setting;
        __reflect(Setting.prototype, "com.game.Setting");
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
com.game.Setting.FONTTYPE = "Times New Roman";
//# sourceMappingURL=Setting.js.map