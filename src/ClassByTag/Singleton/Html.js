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
/// <reference path="../Base/Container.ts" />
var Html = (function (_super) {
    __extends(Html, _super);
    function Html() {
        _super.call(this);
        if (Html.instance || Html.unlocked == false) {
            throw new Error("Error: Instantiation failed: Use Html.getInstance() instead of new.");
        }
    }
    Html.getInstance = function () {
        if (Html.instance == null) {
            Html.unlocked = true;
            Html.instance = new Html();
            Html.unlocked = false;
            Html.instance.setElement(document.getElementsByTagName("html")[0]);
        }
        return Html.instance;
    };
    Html.instance = null;
    Html.unlocked = false;
    return Html;
})(Container);
//# sourceMappingURL=Html.js.map
