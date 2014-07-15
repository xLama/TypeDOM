var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var H5 = (function (_super) {
    __extends(H5, _super);
    function H5(idOrAttributes) {
        _super.call(this, idOrAttributes, H5.H5);
    }
    H5.prototype.clone = function () {
        return new H5().setElement(_super.prototype.clone.call(this).getElement());
    };
    H5.H5 = "h5";
    return H5;
})(H);
//# sourceMappingURL=H5.js.map
