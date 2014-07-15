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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AjaxStates;
(function (AjaxStates) {
    AjaxStates[AjaxStates["READY_STATE_UNINITIALIZED"] = 0] = "READY_STATE_UNINITIALIZED";
    AjaxStates[AjaxStates["READY_STATE_LOADING"] = 1] = "READY_STATE_LOADING";
    AjaxStates[AjaxStates["READY_STATE_LOADED"] = 2] = "READY_STATE_LOADED";
    AjaxStates[AjaxStates["READY_STATE_INTERACTIVE"] = 3] = "READY_STATE_INTERACTIVE";
    AjaxStates[AjaxStates["READY_STATE_COMPLETE"] = 4] = "READY_STATE_COMPLETE";
})(AjaxStates || (AjaxStates = {}));

var Ajax = (function (_super) {
    __extends(Ajax, _super);
    function Ajax() {
        var _this = this;
        _super.call(this);
        this.regExp = new RegExp("\/(json|xml)$");
        this.send = function (data) {
            _this.object.send(data);
        };
        this.onReadyState = function (evt) {
            var xmlR = _this.object;

            switch (xmlR.readyState) {
                case 0 /* READY_STATE_UNINITIALIZED */:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.NOT_INITIALIZE));
                    break;

                case 1 /* READY_STATE_LOADING */:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.NO_SEND));
                    break;

                case 2 /* READY_STATE_LOADED */:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.BEFORE_SERVER_RESPONSE));
                    break;

                case 3 /* READY_STATE_INTERACTIVE */:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.ALMOST_READY));
                    break;

                case 4 /* READY_STATE_COMPLETE */:
                    if (xmlR.status == 200) {
                        _this.dataType = _this.regExp.exec(xmlR.getResponseHeader("Content-Type"))[1];

                        switch (_this.dataType) {
                            case "json":
                                if (JSON && JSON.parse) {
                                    _this.data = JSON.parse(xmlR.responseText);
                                } else {
                                    _this.data = eval('(' + xmlR.responseText + ')');
                                }
                                break;

                            case "xml":
                                _this.data = xmlR.responseXML;
                                break;
                        }
                        if (_this.success) {
                            _this.success(_this.data, _this.dataType);
                        } else {
                            _this.dispatchEvent(new AjaxEvent(AjaxEvent.ALL_RIGHT, _this.dataType, _this.data));
                        }
                    } else if (xmlR.status == 404) {
                        _this.dispatchEvent(new AjaxEvent(AjaxEvent.NOT_FOUND));
                    } else if (xmlR.status == 500) {
                        _this.dispatchEvent(new AjaxEvent(AjaxEvent.SERVER_ERROR));
                    }
                    break;
            }
        };
    }
    Ajax.prototype.addEventListener = function (type, listener, scope, capture) {
        EventEngine.addEventListener(type, listener, scope, capture, this, -1);
        return this;
    };
    Ajax.init = function () {
        var ajax = new Ajax();
        ajax.object = new XMLHttpRequest();

        if (document.addEventListener) {
            ajax.object.addEventListener("readystatechange", ajax.onReadyState, true);
        } else {
            ajax.object.onreadystatechange = ajax.onReadyState;
        }

        return ajax;
    };

    Ajax.post = function (url, success) {
        var ajax = Ajax.init();
        ajax.success = success;
        ajax.object.open("post", url, false);
        return ajax;
    };

    Ajax.getD = function (url, success) {
        var ajax = Ajax.init();
        ajax.success = success;
        ajax.object.open("get", url, false);
        return ajax;
    };
    return Ajax;
})(NoVisual);
//# sourceMappingURL=Ajax.js.map
