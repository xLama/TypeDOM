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
