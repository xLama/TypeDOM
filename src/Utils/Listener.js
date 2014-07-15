var Listener = (function () {
    function Listener(type, handler, capture, times, scope) {
        this.eventType = type;
        this.handler = handler;
        this.times = times;
        this.capture = capture;
        this.scope = scope;
    }
    Listener.prototype.getEventType = function () {
        return this.eventType;
    };

    Listener.prototype.getHandler = function () {
        return this.handler;
    };

    Listener.prototype.getTimes = function () {
        return this.times;
    };

    Listener.prototype.setTimes = function (times) {
        this.times = times;
    };

    Listener.prototype.getCapture = function () {
        return this.capture;
    };

    Listener.prototype.getScope = function () {
        return this.scope;
    };
    return Listener;
})();
//# sourceMappingURL=Listener.js.map
