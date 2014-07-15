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
        if (eventDispatched.getPropagation()) {
            EventEngine.target(eventDispatched, visualHierarchy);
        }
    };

    EventEngine.target = function (eventDispatched, visualHierarchy) {
        eventDispatched.setCurrentTarget(eventDispatched.getTarget());
        eventDispatched.setPhase(1 /* AT_TARGET */);

        var listenerManager = EventEngine.handlerListenerList[eventDispatched.getTarget().getUUID()];
        var listeners = listenerManager ? listenerManager.getAllListenersByEventType(eventDispatched.getEventType()) : null;

        if (listeners && listeners.hasItems()) {
            var listener;
            for (var index = listeners.getLength() - 1; index >= 0; --index) {
                listener = listeners.getItemAt(index);
                listener.getHandler().call(listener.getScope(), eventDispatched);
                EventEngine.checkListenerHandler(listener, eventDispatched.getTarget(), listeners, index, listenerManager);
            }
        }

        if (eventDispatched.getBubbles() && eventDispatched.getPropagation()) {
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

    EventEngine.captureOrBubbles = function (eventDispatched, visualHierarchy, captureOrBubbles, dispersable) {
        if (typeof dispersable === "undefined") { dispersable = false; }
        var i = captureOrBubbles ? (visualHierarchy.getLength() - 1) * -1 : 0;
        var limit = captureOrBubbles ? 0 : visualHierarchy.getLength() - 1;

        for (; i <= limit && eventDispatched.getPropagation(); ++i) {
            eventDispatched.setCurrentTarget(captureOrBubbles ? visualHierarchy.getItemAt(i * -1) : visualHierarchy.getItemAt(i));
            var listenerManager = EventEngine.handlerListenerList[eventDispatched.getCurrentTarget().getUUID()];

            if (listenerManager) {
                var listeners = listenerManager.getListeners(eventDispatched.getEventType(), captureOrBubbles);
                if (dispersable) {
                    if (!listeners)
                        listeners = new ArrayCollection();
                    listeners.addAll(listenerManager.getListeners(eventDispatched.getEventType(), !captureOrBubbles));
                }
            }

            if (listeners && listeners.hasItems()) {
                for (var index = listeners.getLength() - 1; index >= 0 && eventDispatched.getInmediatePropagation(); --index) {
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
        } else {
            nativeEvent.cancelBubble = true;
        }

        var newEvent = BaseEvent.nativeEventToBaseEvent(nativeEvent);
        newEvent.setTarget(new DOMElement(nativeEvent.srcElement));
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
    EventEngine.handlerListenerList = new Object();
    return EventEngine;
})();
//# sourceMappingURL=EventEngine.js.map
