/*
* Copyright (c) 2014 Jose Carlos Lama. www.typedom.org
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
* OR OTHER DEALINGS IN THE SOFTWARE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../BaseEvent.ts" />
var TD_MouseEvent = (function (_super) {
    __extends(TD_MouseEvent, _super);
    function TD_MouseEvent(typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = true; }
        if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = false; }
        if (typeof typeOrEvent == "string") {
            _super.call(this, typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles);
        } else {
            try  {
                _super.call(this, typeOrEvent.type, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles, typeOrEvent);
            } catch (e) {
                throw new TypeError("Cast exception");
            }
        }
    }
    TD_MouseEvent.prototype.getNativeEvent = function () {
        return _super.prototype.getNativeEvent.call(this);
    };

    TD_MouseEvent.prototype.getClientX = function () {
        return this.getNativeEvent().clientX;
    };

    TD_MouseEvent.prototype.getClientY = function () {
        return this.getNativeEvent().clientY;
    };
    TD_MouseEvent.events = {
        "click": "1", "dblclick": "1", "mousedown": "1", "mouseup": "1", "mouseover": "1", "mouseout": "1", "mousemove": "1"
    };

    TD_MouseEvent.CLICK = "click";
    TD_MouseEvent.DOUBLE_CLICK = "dblclick";
    TD_MouseEvent.MOUSE_DOWN = "mousedown";
    TD_MouseEvent.MOUSE_UP = "mouseup";
    TD_MouseEvent.MOUSE_OVER = "mouseover";
    TD_MouseEvent.MOUSE_OUT = "mouseout";
    TD_MouseEvent.MOUSE_MOVE = "mousemove";

    TD_MouseEvent.ONDRAGNEW = "dragNew";
    TD_MouseEvent.ONDRAGENDNEW = "dragendNew";
    TD_MouseEvent.ONDRAGENTERNEW = "dragenterNew";
    TD_MouseEvent.ONDRAGLEAVENEW = "dragleaveNew";
    TD_MouseEvent.ONDRAGOVERNEW = "dragoverNew";
    TD_MouseEvent.ONDRAGSTARTNEW = "dragstartNew";
    TD_MouseEvent.ONMOUSEWHEELNEW = "mousewheelNew";
    TD_MouseEvent.ONSCROLL = "scroll";
    TD_MouseEvent.ONDROP = "drop";
    return TD_MouseEvent;
})(BaseEvent);
//# sourceMappingURL=MouseEvent.js.map
