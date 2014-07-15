/// <reference path="../BaseEvent.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Events;
(function (Events) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent(typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles) {
            if (typeof capturable === "undefined") { capturable = true; }
            if (typeof bubbles === "undefined") { bubbles = true; }
            if (typeof cancelable === "undefined") { cancelable = true; }
            if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = true; }
            if (typeOrEvent instanceof MouseEvent) {
                try  {
                    // Native MouseEvent are not target only. They always capture and bubbles
                    _super.call(this, typeOrEvent.type, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles);

                    this.altKey = typeOrEvent.altKey;
                    this.button = typeOrEvent.button;
                    this.clientX = typeOrEvent.clientX;
                    this.clientY = typeOrEvent.clientY;
                    this.screenX = typeOrEvent.screenX;
                    this.screenY = typeOrEvent.screenY;
                    this.shiftKey = typeOrEvent.shiftKey;
                } catch (e) {
                }
            } else if (typeof typeOrEvent == "string") {
                _super.call(this, typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles);
            }
        }
        MouseEvent.events = { "click": "1", "dblclick": "1", "mousedown": "1", "mouseup": "1", "mouseover": "1", "mouseout": "1", "mousemove": "1" };

        MouseEvent.CLICK = "click";
        MouseEvent.DOUBLE_CLICK = "dblclick";
        MouseEvent.MOUSE_DOWN = "mousedown";
        MouseEvent.MOUSE_UP = "mouseup";
        MouseEvent.MOUSE_OVER = "mouseover";
        MouseEvent.MOUSE_OUT = "mouseout";
        MouseEvent.MOUSE_MOVE = "mousemove";

        MouseEvent.ONDRAGNEW = "dragNew";
        MouseEvent.ONDRAGENDNEW = "dragendNew";
        MouseEvent.ONDRAGENTERNEW = "dragenterNew";
        MouseEvent.ONDRAGLEAVENEW = "dragleaveNew";
        MouseEvent.ONDRAGOVERNEW = "dragoverNew";
        MouseEvent.ONDRAGSTARTNEW = "dragstartNew";
        MouseEvent.ONMOUSEWHEELNEW = "mousewheelNew";
        MouseEvent.ONSCROLL = "scroll";
        MouseEvent.ONDROP = "drop";
        return MouseEvent;
    })(BaseEvent);
    Events.MouseEvent = MouseEvent;
})(Events || (Events = {}));
//# sourceMappingURL=TD_MouseEvent.js.map
