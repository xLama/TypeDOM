﻿/*
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
var $ = (function () {
    function $() {
    }
    $.$ = function (selector) {
        var cleanSelector = selector.trim();
        var selectedElements = new Collection();

        var idPattern = /#\S+$/;
        var tagPattern = /[A-z]+$/;

        if (cleanSelector.match(idPattern)) {
            selectedElements.addItem(new DOMElement(document.getElementById(selector.substr(1, selector.length - 1))));
        } else if (cleanSelector.match(tagPattern)) {
            var nodeList = document.getElementsByTagName(cleanSelector);
            for (var index = 0; index < nodeList.length; index++) {
                selectedElements.addItem(new DOMElement(nodeList.item(index)));
            }
        } else {
            console.warn("Bad selector");
        }

        return selectedElements;
    };
    return $;
})();
//# sourceMappingURL=$.js.map