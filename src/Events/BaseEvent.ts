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



enum EventPhases { CAPTURING_PHASE, AT_TARGET, BUBBLING_PHASE, SCATTERING_PHASE }


    class BaseEvent {

        private static allNativeEvents: Object[] = [
            {"onkeydown":"1", "onkeypress":"1", "onkeyup":"1"},
            { "click": "1", "dblclick": "1", "mousedown": "1", "mouseup": "1", "mouseover": "1", "mouseout": "1", "mousemove": "1" }
        ];

		private nativeEvent:Event;
		
        private phase: number;

        private target: IEventDispatcher;
        private currentTarget: IEventDispatcher;
        private bubbles: boolean;
        private updateVisualHierarchyInBubbles: boolean;
        private capturable: boolean;

        private eventType: string;
        private cancelable: boolean;
        private propagation: boolean;
        private inmediatePropagation: boolean;

        constructor(type: string, capturable: boolean = true, bubbles: boolean = true, cancelable: boolean = false, updateVisualHierarchyInBubbles: boolean = false, nativeEvent?:Event) {
            this.eventType = type;
            this.bubbles = bubbles;
            this.cancelable = cancelable;
            this.capturable = capturable;
            this.propagation = true;
            this.inmediatePropagation = true;
            this.updateVisualHierarchyInBubbles = updateVisualHierarchyInBubbles;
            this.nativeEvent = nativeEvent;
        }

        public stopPropagation(): void {
            if (this.cancelable) {
                this.propagation = false;
            }
        }

        public stopInmediatePropagation(): void {
            if (this.cancelable) {
                this.inmediatePropagation = false;
            }
        }

        public preventDefault(): void {
            if (this.cancelable && this.nativeEvent) {
                if (this.nativeEvent.preventDefault) {
                    this.nativeEvent.preventDefault();
                } else {
                    this.nativeEvent["returnValue"] = false;
                }
            }
        }

        public static nativeEventToBaseEvent(evt: Event): BaseEvent {

            if 			(TD_MouseEvent.events[evt.type]) 		return new TD_MouseEvent(<MouseEvent> evt);
            else if 	(TD_KeyboardEvent.events[evt.type]) 	return new TD_KeyboardEvent(<KeyboardEvent> evt);

        }


        public static isNativeEvent(eventType: string): boolean {

            var isNativeEvent: boolean = false;
    
            for (var i: number = 0; i < BaseEvent.allNativeEvents.length && !isNativeEvent ; ++i) {
                if (eventType in BaseEvent.allNativeEvents[i] ) {
                    isNativeEvent = true;
                }
            }

            return isNativeEvent;
        }

        public getCapturable(): boolean {
            return this.capturable;
        }

        public getTarget(): IEventDispatcher {
            return this.target;
        }

        public getCurrentTarget(): IEventDispatcher {
            return this.currentTarget;
        }


        public setTarget(target: IEventDispatcher): void {
            this.target = target;
        }

        public setCurrentTarget(currentTarget: IEventDispatcher): void {
            this.currentTarget = currentTarget;
        }

        public getUpdateVisualHierarchyInBubbles(): boolean {
            return this.updateVisualHierarchyInBubbles;
        }


        public getBubbles(): boolean {
            return this.bubbles;
        }


        public getPhase(): number {
            return this.phase;
        }


        public setPhase(phase:number): void {
            this.phase = phase;
        }

        public getNativeEvent(): Event {
            return this.nativeEvent;
        }

        public getInmediatePropagation(): boolean {
            return this.inmediatePropagation;
        }

        public getEventType(): string {
            return this.eventType;
        }

        public getPropagation(): boolean {
            return this.propagation;
        }


    }
