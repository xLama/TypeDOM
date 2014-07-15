var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var H = (function (_super) {
    __extends(H, _super);
    function H() {
        _super.apply(this, arguments);
    }
    H.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return eval("this");
    };

    H.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };

    H.prototype.clone = function () {
        return _super.prototype.clone.call(this);
    };
    return H;
})(Container);
//# sourceMappingURL=H.js.map
