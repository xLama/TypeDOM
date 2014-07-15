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


/// <reference path="../BaseEvent.ts" />
    class TD_MouseEvent extends BaseEvent {

        public static events: Object = {
            "click": "1", "dblclick": "1", "mousedown": "1", "mouseup": "1", "mouseover": "1", "mouseout": "1", "mousemove": "1"
        };


        public static CLICK: string = "click";
        public static DOUBLE_CLICK: string = "dblclick";
        public static MOUSE_DOWN: string = "mousedown";
        public static MOUSE_UP: string = "mouseup";
        public static MOUSE_OVER: string = "mouseover";
        public static MOUSE_OUT: string = "mouseout";
        public static MOUSE_MOVE: string = "mousemove";

        /*** HTML 5 ***/

        public static ONDRAGNEW: string = "dragNew";
        public static ONDRAGENDNEW: string = "dragendNew";
        public static ONDRAGENTERNEW: string = "dragenterNew";
        public static ONDRAGLEAVENEW: string = "dragleaveNew";
        public static ONDRAGOVERNEW: string = "dragoverNew";
        public static ONDRAGSTARTNEW: string = "dragstartNew";
        public static ONMOUSEWHEELNEW: string = "mousewheelNew";
        public static ONSCROLL: string = "scroll";
        public static ONDROP: string = "drop";

        /*** HTML 5 ****/

        constructor(event: MouseEvent);
        constructor(type: string, capturable?: boolean, bubbles?: boolean, cancelable?: boolean, updateVisualHierarchyInBubbles?: boolean);
        constructor(typeOrEvent?: any, capturable: boolean = true, bubbles: boolean = true, cancelable: boolean = true, updateVisualHierarchyInBubbles: boolean = false) {

            if (typeof typeOrEvent == "string") {
                super(typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles);
            } else {
                try {
                super((<MouseEvent>typeOrEvent).type, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles, typeOrEvent);
                } catch (e) {
                    throw new TypeError("Cast exception")
                }

            }
        }

        public getNativeEvent(): MouseEvent {
            return <MouseEvent> super.getNativeEvent();
        }


        public getClientX(): number {
            return this.getNativeEvent().clientX;
        }

        public getClientY(): number {
            return this.getNativeEvent().clientY;
        }
    }