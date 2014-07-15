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
var ListenerManager = (function () {
    function ListenerManager() {
        this.data = new Object();
    }
    ListenerManager.prototype.addListener = function (listener) {
        if (this.data == null)
            throw new TypeError("Data is null");

        var eventType = listener.getEventType();
        var capture = listener.getCapture().toString();
        var handler = listener.getHandler();

        if (this.data.hasOwnProperty(eventType)) {
            if (this.data[eventType][capture] == null) {
                this.data[eventType][capture] = new ArrayCollection();
            }
        } else {
            this.data[eventType] = new Object();
            this.data[eventType][capture] = new ArrayCollection();
        }

        this.data[eventType][capture].addItem(listener);
    };

    ListenerManager.prototype.getAllListenersByEventType = function (eventType) {
        var listeners = new ArrayCollection();

        if (this.data.hasOwnProperty(eventType)) {
            if (this.data[eventType]["true"])
                listeners.addAll(this.data[eventType]["true"]);
            if (this.data[eventType]["false"])
                listeners.addAll(this.data[eventType]["false"]);
        }

        return listeners;
    };

    ListenerManager.prototype.getListeners = function (eventType, capture) {
        var listeners = null;

        if (this.data.hasOwnProperty(eventType) && this.data[eventType][capture.toString()]) {
            listeners = this.data[eventType][capture.toString()];
        }

        return listeners;
    };

    ListenerManager.prototype.removeListernersByCapture = function (eventType, capture) {
        if (this.data.hasOwnProperty(eventType)) {
            delete this.data[eventType][capture.toString()];
        }
    };

    ListenerManager.prototype.removeListernersByEventType = function (eventType) {
        delete this.data[eventType];
    };
    return ListenerManager;
})();
//# sourceMappingURL=ListenerManager.js.map
