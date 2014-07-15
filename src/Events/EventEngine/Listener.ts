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


class Listener
{

    private eventType: string;
    private handler: Function;
    private times: number;
    private capture: boolean;
    private scope: any;

    constructor(type: string, handler: Function, capture: boolean, times: number, scope: any) {
        this.eventType = type;
        this.handler = handler;
        this.times = times;
        this.capture = capture;
        this.scope = scope;
    }

    public getEventType(): string {
        return this.eventType;
    }

    public getHandler(): Function {
        return this.handler;
    }

    public getTimes(): number {
        return this.times;
    }

    public setTimes(times: number): void {
        this.times = times;
    }


    public getCapture(): boolean {
        return this.capture;
    }

    public getScope(): any {
        return this.scope;
    }

}