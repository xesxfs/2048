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
        var plugins;
        (function (plugins) {
            var RemoveTintPlugin = (function (_super) {
                __extends(RemoveTintPlugin, _super);
                function RemoveTintPlugin() {
                    var _this = _super.call(this) || this;
                    _this.propName = "removeTint";
                    return _this;
                }
                return RemoveTintPlugin;
            }(com.greensock.plugins.TintPlugin));
            plugins.RemoveTintPlugin = RemoveTintPlugin;
            __reflect(RemoveTintPlugin.prototype, "com.greensock.plugins.RemoveTintPlugin");
        })(plugins = greensock.plugins || (greensock.plugins = {}));
    })(greensock = com.greensock || (com.greensock = {}));
})(com || (com = {}));
com.greensock.plugins.RemoveTintPlugin.API_static_com_greensock_plugins_RemoveTintPlugin = 1;
flash.extendsClass("com.greensock.plugins.RemoveTintPlugin", "com.greensock.plugins.TintPlugin");
//# sourceMappingURL=RemoveTintPlugin.js.map