var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var H1 = (function (_super) {
    __extends(H1, _super);
    function H1(idOrAttributes) {
        _super.call(this, idOrAttributes, H1.H1);
    }
    H1.prototype.clone = function () {
        return new H1().setElement(_super.prototype.clone.call(this).getElement());
    };
    H1.H1 = "h1";
    return H1;
})(H);
//# sourceMappingURL=H1.js.map
