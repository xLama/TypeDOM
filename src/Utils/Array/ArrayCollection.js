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
/// <reference path="Collection.ts" />
var ArrayCollection = (function (_super) {
    __extends(ArrayCollection, _super);
    function ArrayCollection() {
        _super.apply(this, arguments);
        var _this = this;
        // slice
        this.subArray = function (start, end) {
            _this.indexCheck(start);
            _this.indexCheck(end);
            return new ArrayCollection(_this.toArray().slice(start, end));
        };
    }
    ArrayCollection.prototype.getItemIndexByAttributes = function (keyValue) {
        this.itemCheck(keyValue);

        var index = -1;
        var found = true;

        if (this.toArray()) {
            var i = 0;

            while (index == -1 && i < this.toArray().length) {
                for (var key in keyValue) {
                    if (!this.toArray()[i].hasOwnProperty(key) || this.toArray()[i][key] != keyValue[key]) {
                        found = false;
                    }
                }
                if (found) {
                    index = i;
                } else {
                    i++;
                }
            }
        }
        return index;
    };

    ArrayCollection.prototype.getItemByAttributes = function (keyValue) {
        this.itemCheck(keyValue);
        return this.getItemAt(this.getItemIndexByAttributes(keyValue));
    };

    ArrayCollection.prototype.concat = function (list) {
        if (list === null)
            throw new TypeError("List can´t be null");
        return new ArrayCollection(this.toArray().concat(list.toArray()));
    };

    // pop
    ArrayCollection.prototype.removeLast = function () {
        var lastItem = this.toArray().pop();
        this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE));
        return lastItem;
    };

    // shift
    ArrayCollection.prototype.removeFirst = function () {
        var firstItem = this.toArray().shift();
        this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE));
        return firstItem;
    };

    ArrayCollection.prototype.unshift = function (item) {
        this.itemCheck(item);
        this.toArray().unshift(item);
        return this;
    };

    ArrayCollection.prototype.getRandomItem = function () {
        return this.toArray()[Math.floor((Math.random() * 10) + 1)];
    };

    ArrayCollection.prototype.getLastItem = function () {
        return this.toArray()[this.getLength() - 1];
    };

    ArrayCollection.prototype.each = function (func) {
        for (var i = 0, len = this.getLength(); i < len; ++i) {
            func(this.getItemAt(i));
        }
    };

    // Si alguno cumple a función
    ArrayCollection.prototype.some = function (func) {
        for (var i = 0; i < this.getLength(); i++) {
            if (func(this.getItemAt(i))) {
                return true;
            }
        }
        return false;
    };

    // Si todos cumplen la función
    ArrayCollection.prototype.every = function (func) {
        for (var i = 0; i < this.getLength(); i++) {
            if (!func(this.getItemAt(i))) {
                return false;
            }
        }
        return true;
    };

    // Ejecuta un método del objeto si existe
    ArrayCollection.prototype.execMethod = function (method, parameters) {
        if (method == null)
            throw new TypeError("Null method");

        for (var i = 0; i < this.getLength(); i++) {
            if (typeof this.getItemAt(i)[method] == "function") {
                if (parameters != null) {
                    this.getItemAt(i)[method].apply(this.getItemAt(i), parameters);
                } else {
                    this.getItemAt(i)[method]();
                }
            }
        }
    };

    ArrayCollection.prototype.filter = function (func) {
        var filter = new ArrayCollection();

        for (var i = 0; i < this.getLength(); i++) {
            if (func(this.getItemAt(i))) {
                filter.addItem(this.getItemAt(i));
            }
        }
        return filter;
    };

    ArrayCollection.prototype.sort = function (comparator) {
        if (comparator == null)
            throw new TypeError("Null comparator");
        this.toArray().sort(comparator.compare);
        return this;
    };

    ArrayCollection.prototype.clone = function () {
        return new ArrayCollection(_super.prototype.clone.call(this));
    };
    return ArrayCollection;
})(Collection);
//# sourceMappingURL=ArrayCollection.js.map
