/// <reference path="../BaseEvent.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Events;
(function (Events) {
    var KeyBoardEvent = (function (_super) {
        __extends(KeyBoardEvent, _super);
        function KeyBoardEvent(typeOrEvent, capturable, bubbles, cancelable) {
            if (typeOrEvent instanceof KeyboardEvent) {
                _super.call(this, typeOrEvent.type, capturable, typeOrEvent.bubbles, typeOrEvent.cancelable);

                this.altKey = typeOrEvent.altKey;
                this.key = typeOrEvent.key;
                this.keyCode = typeOrEvent.keyCode;
                this.char = typeOrEvent.char;
                this.charCode = typeOrEvent.charCode;
            } else {
                _super.call(this, typeOrEvent, capturable, bubbles, cancelable);
            }
        }
        KeyBoardEvent.events = { "onkeydown": "1", "onkeypress": "1", "onkeyup": "1" };

        KeyBoardEvent.KEY_DOWN = "keydown";
        KeyBoardEvent.KEY_PRESS = "keypress";
        KeyBoardEvent.KEY_UP = "keyup";
        return KeyBoardEvent;
    })(BaseEvent);
    Events.KeyBoardEvent = KeyBoardEvent;
})(Events || (Events = {}));
//# sourceMappingURL=TD_KeyBoardEvent.js.map
