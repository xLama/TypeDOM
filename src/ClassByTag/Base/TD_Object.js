var TD_Object = (function () {
    function TD_Object() {
    }
    TD_Object.prototype.getClassName = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(this["constructor"].toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    return TD_Object;
})();
//# sourceMappingURL=TD_Object.js.map
