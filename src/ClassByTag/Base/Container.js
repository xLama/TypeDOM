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
/// <reference path="DOMElement.ts" />
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(idOrAttributesOrElement, tag) {
        _super.call(this, idOrAttributesOrElement, tag);
    }
    Container.prototype.addChild = function (child) {
        this.childCheck(child);
        this.getElement().appendChild(child.getElement());
        this.dispatchEvent(new ContainerEvent(ContainerEvent.CHILD_ADDED, new Collection([child]), true, false, true));
        return this;
    };

    Container.prototype.addChildren = function (children) {
        this.childCheck(children);
        var childrenToAdd = new ArrayCollection(children);

        for (var i = 0; i < childrenToAdd.getLength(); ++i) {
            this.addChild(childrenToAdd.getItemAt(i));
        }

        if (i > 0) {
            this.dispatchEvent(new ContainerEvent(ContainerEvent.CHILDREN_ADDED, new Collection(childrenToAdd), true, false, true));
        }

        return this;
    };

    Container.prototype.removeChild = function (child) {
        this.childCheck(child);
        this.getElement().removeChild(child.getElement());
        this.dispatchEvent(new ContainerEvent(ContainerEvent.CHILD_REMOVED, new Collection([child]), true, false, true));
    };

    Container.prototype.removeAllChildren = function () {
        for (var i = this.getElement().children.length - 1; i >= 0; --i) {
            this.getElement().removeChild(this.getElement().children[i]);
        }
        if (i != this.getElement().children.length - 1) {
            this.dispatchEvent(new ContainerEvent(ContainerEvent.CHILDREN_REMOVED, new Collection(), true, false, true));
        }
    };

    Container.prototype.contains = function (child) {
        this.childCheck(child);
        return this.getElement().contains(child.getElement());
    };

    Container.prototype.removeChildAt = function (index) {
        this.getElement().removeChild(this.getElement().childNodes[index]);
    };

    Container.prototype.getChildren = function () {
        var children = new ArrayCollection();
        for (var i = 0; i < this.getElement().children.length; i++) {
            children.addItem(new DOMElement(this.getElement().children[i]));
        }
        return children;
    };

    Container.prototype.getChildrenNumber = function () {
        return this.getElement().children.length;
    };

    Container.prototype.hasChild = function () {
        return this.getElement().hasChildNodes();
    };

    Container.prototype.insertBefore = function (newElement, oldElement) {
        this.childCheck(newElement);
        this.childCheck(oldElement);
        this.getElement().insertBefore(newElement.getElement(), oldElement.getElement());
    };

    Container.prototype.replaceChild = function (newElement, oldElement) {
        this.childCheck(newElement);
        this.childCheck(oldElement);
        this.getElement().insertBefore(newElement.getElement(), oldElement.getElement());
    };

    Container.prototype.getLastChild = function () {
        var domElement = new DOMElement();
        domElement.setElement(this.getElement().lastChild);
        return domElement;
    };

    Container.prototype.getFirstChild = function () {
        var domElement = new DOMElement();
        domElement.setElement(this.getElement().firstChild);
        return domElement;
    };

    Container.prototype.sort = function (comparator) {
        this.addChildren(this.getChildren().sort(comparator));
    };

    Container.prototype.filter = function (func) {
        var childrenFiltered = this.getChildren().filter(func);
        this.removeAllChildren();
        this.addChildren(childrenFiltered);
    };

    Container.prototype.childCheck = function (child) {
        if (child == null)
            throw TypeError("Null child");
    };

    Container.prototype.indexCheck = function (index) {
        if (index < 0)
            throw TypeError("Index out of bound");
    };
    return Container;
})(DOMElement);
//# sourceMappingURL=Container.js.map
