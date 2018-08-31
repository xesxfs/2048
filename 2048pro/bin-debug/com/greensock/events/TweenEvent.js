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
    var greensock;
    (function (greensock) {
        var events;
        (function (events) {
            var TweenEvent = (function (_super) {
                __extends(TweenEvent, _super);
                function TweenEvent(type, bubbles, cancelable) {
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    return _super.call(this, type, bubbles, cancelable) || this;
                }
                TweenEvent.prototype.clone = function () {
                    return new com.greensock.events.TweenEvent(this.type, this.bubbles, this.cancelable);
                };
                return TweenEvent;
            }(egret.Event));
            events.TweenEvent = TweenEvent;
            __reflect(TweenEvent.prototype, "com.greensock.events.TweenEvent");
        })(events = greensock.events || (greensock.events = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent = "complete";
com.greensock.events.TweenEvent.START = "start";
com.greensock.events.TweenEvent.UPDATE = "change";
com.greensock.events.TweenEvent.REVERSE_COMPLETE = "reverseComplete";
com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent = "init";
com.greensock.events.TweenEvent.VERSION = 1.1;
com.greensock.events.TweenEvent.REPEAT = "repeat";
flash.extendsClass("com.greensock.events.TweenEvent", "egret.Event");
//# sourceMappingURL=TweenEvent.js.map