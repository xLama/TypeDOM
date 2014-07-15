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
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(list) {
        _super.call(this);

        if (list != null) {
            if (list instanceof Array) {
                this.source = list;
            } else {
                try  {
                    var l = list;
                    this.source = list.toArray();
                } catch (e) {
                    throw e;
                }
            }
        } else {
            this.source = new Array();
        }
    }
    Collection.prototype.toArray = function () {
        return this.source;
    };

    Collection.prototype.addItem = function (item) {
        this.itemCheck(item);

        var index = this.source.push(item);
        this.dispatchCollectionChange();
        return index - 1;
    };

    Collection.prototype.addItemAt = function (item, index) {
        this.itemCheck(item);
        this.indexCheck(index);

        this.source[index] = item;
        this.dispatchCollectionChange();
        return index;
    };

    Collection.prototype.addAll = function (list) {
        if (list === void 0 || list === null)
            throw new TypeError("List is null");

        var elementsToAdd = new Array();

        if (list instanceof Array) {
            // It´s an array
            elementsToAdd = elementsToAdd.concat(list);
        } else {
            try  {
                var l = list;
                elementsToAdd = elementsToAdd.concat(l.toArray());
            } catch (e) {
                throw new TypeError();
            }
        }

        for (var i = 0; i < elementsToAdd.length; i++) {
            this.source.push(elementsToAdd[i]);
        }

        if (elementsToAdd.length > 0) {
            this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE));
        }
    };

    Collection.prototype.getItemAt = function (index) {
        return this.source[index];
    };

    Collection.prototype.getItemIndex = function (item) {
        this.itemCheck(item);

        var index = -1;

        if (this.source) {
            if (this.source.lastIndexOf) {
                index = this.source.lastIndexOf(item);
            } else {
                var i = 0;
                while (index == -1 && i < this.source.length) {
                    if (this.source[i] === item) {
                        index = i;
                    }
                    i++;
                }
            }
        }
        return index;
    };

    Collection.prototype.removeAll = function () {
        this.source = new Array();
        this.dispatchCollectionChange();
        return this;
    };

    Collection.prototype.removeItemAt = function (index) {
        this.indexCheck(index);
        this.source.splice(index, 1);
        this.dispatchCollectionChange();
    };

    Collection.prototype.contains = function (item) {
        this.itemCheck(item);
        if (this.getItemIndex(item) != -1)
            return true;
        else
            return false;
    };

    Collection.prototype.getLength = function () {
        return this.source.length;
    };

    Collection.prototype.isEmpty = function () {
        return this.getLength() == 0;
    };

    Collection.prototype.hasItems = function () {
        return !this.isEmpty();
    };

    Collection.prototype.reverse = function () {
        this.source = this.toArray().reverse();
    };

    Collection.prototype.clone = function () {
        return new Collection(this.toArray().slice(0));
    };

    Collection.prototype.indexCheck = function (index) {
        if (index == null || index < 0 || index > this.getLength())
            throw new RangeError("Index is negative, greater than length or null");
    };

    Collection.prototype.itemCheck = function (item) {
        if (item == null)
            throw new TypeError("Item is null");
    };

    Collection.prototype.dispatchCollectionChange = function () {
        this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE));
    };
    return Collection;
})(NoVisual);
//# sourceMappingURL=Collection.js.map
