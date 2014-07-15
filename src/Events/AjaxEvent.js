var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AjaxEvent = (function (_super) {
    __extends(AjaxEvent, _super);
    function AjaxEvent(type, dataType, data) {
        _super.call(this, type, false, false, false);
        this.data = data;
        this.dataType = dataType;
    }
    AjaxEvent.NOT_FOUND = "not_found";
    AjaxEvent.SERVER_ERROR = "server_error";
    AjaxEvent.BEFORE_SERVER_RESPONSE = "before_server_response";
    AjaxEvent.ALMOST_READY = "almost_ready";
    AjaxEvent.NOT_INITIALIZE = "not_initialize";
    AjaxEvent.NO_SEND = "no_send";
    AjaxEvent.ALL_RIGHT = "all_right";
    return AjaxEvent;
})(BaseEvent);
//# sourceMappingURL=AjaxEvent.js.map
