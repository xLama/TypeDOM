var EventEngine = (function () {
    function EventEngine() {
    }
    EventEngine.addEventListener = function (eventType, handler, scope, capture, target, times) {
        if (typeof times === "undefined") { times = -1; }
        var listenerManager = EventEngine.handlerListenerList[target.getUUID()];
        listenerManager = listenerManager || (EventEngine.handlerListenerList[target.getUUID()] = new ListenerManager());

        if (BaseEvent.isNativeEvent(eventType) && listenerManager.getAllListenersByEventType(eventType).isEmpty()) {
            try  {
                var targetElement = target;
            } catch (e) {
                throw new TypeError("Target is not a visual element");
            }
        }
        if (window.addEventListener)
            targetElement.getElement().addEventListener(eventType, EventEngine.nativeEventsCallback, true);
        else
            targetElement.getElement().attachEvent("on" + eventType, EventEngine.nativeEventsCallback);
        listenerManager.addListener(new Listener(eventType, handler, capture, times, scope));
    };

    EventEngine.dispatchEvent = function (eventToDispatch) {
        try  {
            var target = eventToDispatch.getTarget();
            if (eventToDispatch.getCapturable()) {
                EventEngine.capture(eventToDispatch);
            }
        } catch (e) {
            EventEngine.target(eventToDispatch, null);
        }
    };

    EventEngine.capture = function (eventDispatched) {
        var visualHierarchy = EventEngine.getVisualHierarchy(eventDispatched.getTarget());

        if (visualHierarchy && visualHierarchy.hasItems()) {
            eventDispatched.setPhase(0 /* CAPTURING_PHASE */);
            EventEngine.captureOrBubbles(eventDispatched, visualHierarchy, true);
        }
        if (eventDispatched.propagation) {
            EventEngine.target(eventDispatched, visualHierarchy);
        }
    };

    EventEngine.target = function (eventDispatched, visualHierarchy) {
        eventDispatched.setCurrentTarget(eventDispatched.getTarget());
        eventDispatched.setPhase(1 /* AT_TARGET */);

        var listenerManager = EventEngine.handlerListenerList[eventDispatched.getTarget().getUUID()];
        var listeners = listenerManager ? listenerManager.getAllListenersByEventType(eventDispatched.eventType) : null;

        if (listeners && listeners.hasItems()) {
            var listener;
            for (var index = listeners.getLength() - 1; index >= 0; --index) {
                listener = listeners.getItemAt(index);
                listener.getHandler()(eventDispatched);
                EventEngine.checkListenerHandler(listener, eventDispatched.getTarget(), listeners, index, listenerManager);
            }
        }

        // Es dispersable hacia los hermanos
        if (eventDispatched.getDispersible() && eventDispatched.propagation) {
            var brothers = EventEngine.getBrothers(eventDispatched.getTarget());
            if (brothers && brothers.hasItems()) {
                eventDispatched.setPhase(3 /* SCATTERING_PHASE */);
                EventEngine.captureOrBubbles(eventDispatched, brothers, true);
            }
        }

        if (eventDispatched.getBubbles() && eventDispatched.propagation) {
            EventEngine.bubbles(eventDispatched, visualHierarchy);
        }
    };

    EventEngine.bubbles = function (eventDispatched, visualHierarchy) {
        if (!visualHierarchy || (visualHierarchy && eventDispatched.getUpdateVisualHierarchyInBubbles())) {
            visualHierarchy = EventEngine.getVisualHierarchy(eventDispatched.getTarget());
        }

        if (visualHierarchy && visualHierarchy.hasItems()) {
            eventDispatched.setPhase(2 /* BUBBLING_PHASE */);
            EventEngine.captureOrBubbles(eventDispatched, visualHierarchy, false);
        }
    };

    EventEngine.captureOrBubbles = function (eventDispatched, visualHierarchy, captureOrDispersable) {
        var i = captureOrDispersable ? (visualHierarchy.getLength() - 1) * -1 : 0;
        var limit = captureOrDispersable ? 0 : visualHierarchy.getLength() - 1;

        for (; i <= limit && eventDispatched.propagation; ++i) {
            eventDispatched.setCurrentTarget(captureOrDispersable ? visualHierarchy.getItemAt(i * -1) : visualHierarchy.getItemAt(i));
            var listenerManager = EventEngine.handlerListenerList[eventDispatched.getCurrentTarget().getUUID()];

            if (listenerManager) {
                var listeners = listenerManager.getListeners(eventDispatched.eventType, captureOrDispersable);
            }

            if (listeners && listeners.isEmpty() == false) {
                for (var index = listeners.getLength() - 1; index >= 0 && eventDispatched.inmediatePropagation; --index) {
                    var listener = listeners.getItemAt(index);
                    listener.getHandler().call(listener.getScope(), eventDispatched);
                    EventEngine.checkListenerHandler(listener, eventDispatched.getCurrentTarget(), listeners, index, listenerManager);
                }
            }
        }
    };

    EventEngine.checkListenerHandler = function (listener, currentTarget, listenersList, index, listenerManager) {
        if (listener.getTimes() > 0) {
            listener.setTimes(listener.getTimes() - 1);
        }

        if (listener.getTimes() == 0) {
            listenersList.removeItemAt(index);
            if (listenersList.isEmpty()) {
                EventEngine.cleanListenerObject(listener.getEventType(), listener.getCapture(), listenerManager, currentTarget);
            }
        }
    };

    EventEngine.removeEventListener = function (eventType, handler, capture, target) {
        var listenerManager = EventEngine.handlerListenerList[target.getUUID()];
        var listenersList = listenerManager ? listenerManager.getListeners(eventType, capture) : null;
        var index = -1;

        if (listenersList) {
            index = listenersList.getItemIndexByAttributes({ "handler": handler });
            listenersList.removeItemAt(index);

            if (listenersList.isEmpty()) {
                EventEngine.cleanListenerObject(eventType, capture, listenerManager, target);
            }
        }
    };

    EventEngine.cleanListenerObject = function (eventType, capture, listenerManager, target) {
        // Si se borran los eventos con caputra a true, se comprueba si los captura false tienen eventos.
        // Si no lo tienen se borra el evento completo.
        // Si se borra el evento completo se intenta borrar el nativo del elemento visual si lo es.
        listenerManager.removeListernersByCapture(eventType, capture);
        if (listenerManager.getListeners(eventType, !capture) == null) {
            listenerManager.removeListernersByEventType(eventType);

            if (BaseEvent.isNativeEvent(eventType)) {
                try  {
                    var targetElement = target;
                } catch (e) {
                    throw new TypeError("Target is not a visual element");
                }
                if (document.removeEventListener)
                    targetElement.getElement().removeEventListener(eventType, EventEngine.nativeEventsCallback, true);
                else
                    targetElement.getElement().detachEvent("on" + eventType, EventEngine.nativeEventsCallback);
            }
        }
    };

    EventEngine.nativeEventsCallback = function (nativeEvent) {
        if (document.addEventListener) {
            nativeEvent.stopImmediatePropagation();
            nativeEvent.stopPropagation();
            //nativeEvent.preventDefault();
        } else {
            nativeEvent.cancelBubble = true;
        }

        var newEvent = BaseEvent.nativeEventToBaseEvent(nativeEvent);
        newEvent.setTarget(new DOMElement().setElement(nativeEvent.srcElement));
        newEvent.setCurrentTarget(newEvent.getTarget());

        EventEngine.dispatchEvent(newEvent);
    };

    EventEngine.getVisualHierarchy = function (child) {
        var parents = new Collection();
        var parent = child.getElement().parentElement;

        while (parent != null) {
            // Sólo obtiene los padres con algún evento adscrito para optimizar.
            if (parent["uuid"] && parent["uuid"] in EventEngine.handlerListenerList) {
                parents.addItem(new DOMElement(parent));
            }
            parent = parent.parentElement;
        }
        return parents;
    };

    EventEngine.getBrothers = function (child) {
        var brothers = new Collection();
        var previousBrother = child.getElement().previousSibling;
        var nextBrother = child.getElement().nextSibling;

        while (previousBrother) {
            // Sólo obtiene los hermanos con algún evento adscrito para optimizar.
            if (previousBrother["uuid"] && previousBrother["uuid"] in EventEngine.handlerListenerList) {
                brothers.addItem(new DOMElement(previousBrother));
            }
            previousBrother = previousBrother.previousSibling;
        }

        brothers.reverse();

        while (nextBrother) {
            if (nextBrother["uuid"] && nextBrother["uuid"] in EventEngine.handlerListenerList) {
                brothers.addItem(new DOMElement(nextBrother));
            }
            nextBrother = nextBrother.nextSibling;
        }

        return brothers;
    };
    EventEngine.handlerListenerList = new Object();
    return EventEngine;
})();
//# sourceMappingURL=EventEngine.js.map
