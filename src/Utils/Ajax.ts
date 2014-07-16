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


enum AjaxStates { READY_STATE_UNINITIALIZED, READY_STATE_LOADING, READY_STATE_LOADED, READY_STATE_INTERACTIVE, READY_STATE_COMPLETE }

class Ajax extends NoVisual<Ajax> {

    private regExp: RegExp = new RegExp("\/(json|xml)$");
    private dataType: string;
    private data: any;
    private object: XMLHttpRequest;
    private success: Function;

    private url: string;

    constructor() {
        super();
    }

    private static init = (): Ajax => {

        var ajax: Ajax = new Ajax();
        ajax.object = new XMLHttpRequest();

        if (document.addEventListener) {
            ajax.object.addEventListener("readystatechange", ajax.onReadyState, true);
        } else {
            ajax.object.onreadystatechange = ajax.onReadyState;
        }

        return ajax;
    }

    public send = (data?: Object): void => {
        this.object.send(data);
    }


    public static post = (url: string, success?: (data: any, dataType: string)  => void): Ajax => {
        var ajax: Ajax = Ajax.init();
        ajax.success = success;
        ajax.object.open("post", url, false);
        return ajax;
    }

    public static getD = (url: string, success?: (data: any, dataType: string) => void): Ajax => {
        var ajax: Ajax = Ajax.init();
        ajax.success = success;
        ajax.object.open("get", url, false);
        return ajax;
    }

    public addEventListener(type: string, listener: Function, scope: any, capture: boolean): Ajax {
        EventEngine.addEventListener(type, listener, scope, capture, this, -1);
        return this;
    }


    private onReadyState = (evt: Event) => {

        var xmlR: XMLHttpRequest = this.object;

        switch (xmlR.readyState) {

            case AjaxStates.READY_STATE_UNINITIALIZED:
                this.dispatchEvent(new AjaxEvent(AjaxEvent.NOT_INITIALIZE));
                break;

            case AjaxStates.READY_STATE_LOADING:
                this.dispatchEvent(new AjaxEvent(AjaxEvent.NO_SEND));
                break;

            case AjaxStates.READY_STATE_LOADED:
                this.dispatchEvent(new AjaxEvent(AjaxEvent.BEFORE_SERVER_RESPONSE));
                break;

            case AjaxStates.READY_STATE_INTERACTIVE:
                this.dispatchEvent(new AjaxEvent(AjaxEvent.ALMOST_READY));
                break;

            case AjaxStates.READY_STATE_COMPLETE:
                if (xmlR.status == 200) {

                    this.dataType = this.regExp.exec(xmlR.getResponseHeader("Content-Type"))[1];
                   
                    switch (this.dataType) {

                        case "json":
                            if (JSON && JSON.parse) {
                                this.data = JSON.parse(xmlR.responseText);
                            } else {
                                this.data = eval('(' + xmlR.responseText + ')');
                            }
                        break;

                        case "xml":
                            this.data = xmlR.responseXML;
                        break;
                    } 
                    if (this.success) {
                        this.success(this.data, this.dataType);
                    } else {
                        this.dispatchEvent(new AjaxEvent(AjaxEvent.ALL_RIGHT, this.dataType, this.data));
                    }

                } else if (xmlR.status == 404) {
                    this.dispatchEvent(new AjaxEvent(AjaxEvent.NOT_FOUND));
                } else if (xmlR.status == 500) {
                    this.dispatchEvent(new AjaxEvent(AjaxEvent.SERVER_ERROR));
                }
                break;
        }

    }
}