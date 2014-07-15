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



class AjaxEvent extends BaseEvent
{

    public static NOT_FOUND: string = "not_found";
    public static SERVER_ERROR: string = "server_error";
    public static BEFORE_SERVER_RESPONSE: string = "before_server_response";
    public static ALMOST_READY: string = "almost_ready";
    public static NOT_INITIALIZE: string = "not_initialize";
    public static NO_SEND: string = "no_send";
    public static ALL_RIGHT: string = "all_right";

    public data: any;
    public dataType: string;

    constructor(type: string, dataType?:string, data?:any) {
        super(type, false, false, false);
        this.data = data;
        this.dataType = dataType;
    }

}