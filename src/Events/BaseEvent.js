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
var EventPhases;
(function (EventPhases) {
    EventPhases[EventPhases["CAPTURING_PHASE"] = 0] = "CAPTURING_PHASE";
    EventPhases[EventPhases["AT_TARGET"] = 1] = "AT_TARGET";
    EventPhases[EventPhases["BUBBLING_PHASE"] = 2] = "BUBBLING_PHASE";
    EventPhases[EventPhases["SCATTERING_PHASE"] = 3] = "SCATTERING_PHASE";
})(EventPhases || (EventPhases = {}));

var BaseEvent = (function () {
    function BaseEvent(type, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles, nativeEvent) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = false; }
        this.eventType = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.capturable = capturable;
        this.propagation = true;
        this.inmediatePropagation = true;
        this.updateVisualHierarchyInBubbles = updateVisualHierarchyInBubbles;
        this.nativeEvent = nativeEvent;
    }
    BaseEvent.prototype.stopPropagation = function () {
        if (this.cancelable) {
            this.propagation = false;
        }
    };

    BaseEvent.prototype.stopInmediatePropagation = function () {
        if (this.cancelable) {
            this.inmediatePropagation = false;
        }
    };

    BaseEvent.prototype.preventDefault = function () {
        if (this.cancelable && this.nativeEvent) {
            if (this.nativeEvent.preventDefault) {
                this.nativeEvent.preventDefault();
            } else {
                this.nativeEvent["returnValue"] = false;
            }
        }
    };

    BaseEvent.nativeEventToBaseEvent = function (evt) {
        if (TD_MouseEvent.events[evt.type])
            return new TD_MouseEvent(evt);
        else if (TD_KeyboardEvent.events[evt.type])
            return new TD_KeyboardEvent(evt);
    };

    BaseEvent.isNativeEvent = function (eventType) {
        var isNativeEvent = false;

        for (var i = 0; i < BaseEvent.allNativeEvents.length && !isNativeEvent; ++i) {
            if (eventType in BaseEvent.allNativeEvents[i]) {
                isNativeEvent = true;
            }
        }

        return isNativeEvent;
    };

    BaseEvent.prototype.getCapturable = function () {
        return this.capturable;
    };

    BaseEvent.prototype.getTarget = function () {
        return this.target;
    };

    BaseEvent.prototype.getCurrentTarget = function () {
        return this.currentTarget;
    };

    BaseEvent.prototype.setTarget = function (target) {
        this.target = target;
    };

    BaseEvent.prototype.setCurrentTarget = function (currentTarget) {
        this.currentTarget = currentTarget;
    };

    BaseEvent.prototype.getUpdateVisualHierarchyInBubbles = function () {
        return this.updateVisualHierarchyInBubbles;
    };

    BaseEvent.prototype.getBubbles = function () {
        return this.bubbles;
    };

    BaseEvent.prototype.getPhase = function () {
        return this.phase;
    };

    BaseEvent.prototype.setPhase = function (phase) {
        this.phase = phase;
    };

    BaseEvent.prototype.getNativeEvent = function () {
        return this.nativeEvent;
    };

    BaseEvent.prototype.getInmediatePropagation = function () {
        return this.inmediatePropagation;
    };

    BaseEvent.prototype.getEventType = function () {
        return this.eventType;
    };

    BaseEvent.prototype.getPropagation = function () {
        return this.propagation;
    };
    BaseEvent.allNativeEvents = [
        { "onkeydown": "1", "onkeypress": "1", "onkeyup": "1" },
        { "click": "1", "dblclick": "1", "mousedown": "1", "mouseup": "1", "mouseover": "1", "mouseout": "1", "mousemove": "1" }
    ];
    return BaseEvent;
})();
//# sourceMappingURL=BaseEvent.js.map
