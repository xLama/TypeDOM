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

    class TD_KeyboardEvent extends BaseEvent {

        public static events: Object = {
            "onkeydown": "1", "onkeypress": "1", "onkeyup": "1"
        };

        public static KEY_DOWN: string = "keydown";
        public static KEY_PRESS: string = "keypress";
        public static KEY_UP: string = "keyup";

        private altKey: boolean;

        private key: string;
        private keyCode: number;

        private char: string;
        private charCode: number;


        constructor(event: KeyboardEvent);
        constructor(type: string, capturable: boolean, bubbles: boolean, cancelable: boolean, updateVisualHierarchyInBubbles: boolean);
        constructor(typeOrEvent?: any, capturable: boolean = true, bubbles: boolean = true, cancelable: boolean = true, updateVisualHierarchyInBubbles: boolean = true) {

            if (typeOrEvent instanceof KeyboardEvent) {

                super((<KeyboardEvent>typeOrEvent).type, capturable, (<KeyboardEvent>typeOrEvent).bubbles, (<KeyboardEvent>typeOrEvent).cancelable);

                this.altKey = (<KeyboardEvent>typeOrEvent).altKey;
                this.key = (<KeyboardEvent>typeOrEvent).key
                this.keyCode = (<KeyboardEvent>typeOrEvent).keyCode;
                this.char = (<KeyboardEvent>typeOrEvent).char;
                this.charCode = (<KeyboardEvent>typeOrEvent).charCode;

            } else {
                super(typeOrEvent, capturable, bubbles, cancelable);
            }
        }
    }

