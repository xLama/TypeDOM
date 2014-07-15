var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
*Defines an option in a drop-down list
**/
var Tags;
(function (Tags) {
    var Option = (function (_super) {
        __extends(Option, _super);
        function Option(idOrAttributes) {
            _super.call(this, idOrAttributes, Option.OPTION);
        }
        Option.prototype.setElement = function (element) {
            _super.prototype.setElement.call(this, element);
            return this;
        };

        Option.prototype.getElement = function () {
            return _super.prototype.getElement.call(this);
        };

        Option.prototype.clone = function () {
            return new Option().setElement(_super.prototype.clone.call(this).getElement());
        };
        Option.OPTION = "option";
        return Option;
    })(Container);
    Tags.Option = Option;
})(Tags || (Tags = {}));
//# sourceMappingURL=Option.js.map
