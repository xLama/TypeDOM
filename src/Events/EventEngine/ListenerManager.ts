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


class ListenerManager
{

    private data: Object;

    constructor() {
        this.data = new Object();
    }

    public addListener(listener: Listener): void {

        if (this.data == null) throw new TypeError("Data is null");


        var eventType: string = listener.getEventType();
        var capture: string = listener.getCapture().toString();
        var handler: Function = listener.getHandler();


        if (this.data.hasOwnProperty(eventType)) {

            if (this.data[eventType][capture] == null) {
                this.data[eventType][capture] = new ArrayCollection<Listener>();
            }
        }
        else {
            this.data[eventType] = new Object();
            this.data[eventType][capture] = new ArrayCollection<Listener>();
        }

        this.data[eventType][capture].addItem(listener);

    }


    public getAllListenersByEventType(eventType: string): ArrayCollection<Listener> {

        var listeners: ArrayCollection<Listener> = new ArrayCollection<Listener>();

        if (this.data.hasOwnProperty(eventType)) {

            if (this.data[eventType]["true"]) listeners.addAll(this.data[eventType]["true"]);
            if (this.data[eventType]["false"]) listeners.addAll(this.data[eventType]["false"]);

        }

        return listeners;
    }


    public getListeners(eventType: string, capture: boolean): ArrayCollection<Listener> {
        var listeners: ArrayCollection<Listener> = null;

        if (this.data.hasOwnProperty(eventType) && this.data[eventType][capture.toString()]) {
            listeners = this.data[eventType][capture.toString()];
        }
        
        return listeners;
    }


    public removeListernersByCapture(eventType: string, capture: boolean): void {
        if (this.data.hasOwnProperty(eventType)) {
            delete this.data[eventType][capture.toString()];
        }
    }


    public removeListernersByEventType(eventType: string): void {
        delete this.data[eventType];
    }

}