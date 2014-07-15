var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var H2 = (function (_super) {
    __extends(H2, _super);
    function H2(idOrAttributes) {
        _super.call(this, idOrAttributes, H2.H2);
    }
    H2.prototype.clone = function () {
        return new H2().setElement(_super.prototype.clone.call(this).getElement());
    };
    H2.H2 = "h2";
    return H2;
})(H);
//# sourceMappingURL=H2.js.map
