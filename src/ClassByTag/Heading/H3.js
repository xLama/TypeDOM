var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var H3 = (function (_super) {
    __extends(H3, _super);
    function H3(idOrAttributes) {
        _super.call(this, idOrAttributes, H3.H3);
    }
    H3.prototype.clone = function () {
        return new H3().setElement(_super.prototype.clone.call(this).getElement());
    };
    H3.H3 = "h3";
    return H3;
})(H);
//# sourceMappingURL=H3.js.map
