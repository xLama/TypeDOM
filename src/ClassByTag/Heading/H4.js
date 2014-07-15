var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var H4 = (function (_super) {
    __extends(H4, _super);
    function H4(idOrAttributes) {
        _super.call(this, idOrAttributes, H4.H4);
    }
    H4.prototype.clone = function () {
        return new H4().setElement(_super.prototype.clone.call(this).getElement());
    };
    H4.H4 = "h4";
    return H4;
})(H);
//# sourceMappingURL=H4.js.map
