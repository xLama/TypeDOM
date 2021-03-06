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


/// <reference path="TypeDOM.ts" />
class EventDispatcher<T extends IEventDispatcher> extends TypeDOM implements IEventDispatcher  {

    constructor() {
        super();
    }

    public addEventListener(type: string, listener: Function, scope: any, capture: boolean): T {
        EventEngine.addEventListener( type, listener, scope, capture, this, -1 );
        return this.returnFunction();
    }

    public addEventListenerXTimes(type: string, listener: Function, scope: any, capture: boolean, times: number): T {
        EventEngine.addEventListener( type, listener, scope, capture, this, times );
        return this.returnFunction();
    }

    public removeEventListener(type: string, listener: Function, capture: boolean): T {
        EventEngine.removeEventListener( type, listener, capture, this );
        return this.returnFunction();
    }

    public dispatchEvent(event: BaseEvent): T {
        event.setTarget(this);
        event.setCurrentTarget(this);
        EventEngine.dispatchEvent( event );
        return this.returnFunction();
    } 

    public getUUID(): string {
        return super.getUUID();
    }

    public returnFunction(): T
    {
        var self: IEventDispatcher = this;
        return <T>self;
    }
 
} 