var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KeyEvent = (function () {
    function KeyEvent(keyCode) {
        this.keyCode = keyCode;
    }
    return KeyEvent;
}());
__reflect(KeyEvent.prototype, "KeyEvent");
//# sourceMappingURL=KeyEvent.js.map