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
var TD_KeyboardEvent = (function (_super) {
    __extends(TD_KeyboardEvent, _super);
    function TD_KeyboardEvent(typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = true; }
        if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = true; }
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
    TD_KeyboardEvent.events = {
        "onkeydown": "1", "onkeypress": "1", "onkeyup": "1"
    };

    TD_KeyboardEvent.KEY_DOWN = "keydown";
    TD_KeyboardEvent.KEY_PRESS = "keypress";
    TD_KeyboardEvent.KEY_UP = "keyup";
    return TD_KeyboardEvent;
})(BaseEvent);
//# sourceMappingURL=KeyboardEvent.js.map
