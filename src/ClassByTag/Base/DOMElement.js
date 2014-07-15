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
/// <reference path="EventDispatcher.ts" />
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(idOrAttributesOrElement, tag) {
        _super.call(this);

        if (tag) {
            this.setElement(document.createElement(tag));
        }

        if (idOrAttributesOrElement) {
            if (typeof idOrAttributesOrElement == "string") {
                this.getElement().id = idOrAttributesOrElement;
            } else if (idOrAttributesOrElement instanceof Element) {
                this.setElement(idOrAttributesOrElement);
            } else {
                for (var key in idOrAttributesOrElement) {
                    this.getElement()[key] = idOrAttributesOrElement[key];
                }
            }
        }
    }
    DOMElement.prototype.getVisualHierarchy = function () {
        var parents = new ArrayCollection();
        var parent = this.getElement().parentElement;

        while (parent != null) {
            parents.addItem(new DOMElement(parent));
            parent = parent.parentElement;
        }
        return parents;
    };

    DOMElement.prototype.getUUID = function () {
        return this.getElement()["uuid"];
    };

    DOMElement.prototype.setElement = function (element) {
        this.element = element;
        if (this.element["uuid"] == null) {
            this.element["uuid"] = Utils.generateRandomUUID();
        }
        return this.returnFunction();
    };

    DOMElement.prototype.getElement = function () {
        return this.element;
    };

    DOMElement.prototype.returnFunction = function () {
        var self = this;
        return self;
    };

    DOMElement.prototype.addTo = function (container) {
        container.addChild(this);
        return this.returnFunction();
    };

    DOMElement.prototype.removeFromParent = function () {
        /* if (this.getElement().parentElement != null) {
        var parent: Container<IDOMElement> = new Container<IDOMElement>(this.getElement().parentElement);
        parent.removeChild(this);
        }*/
        return this.returnFunction();
    };

    DOMElement.prototype.getParent = function () {
        var parentElement = null;
        if (this.hasParent()) {
            parentElement = new DOMElement(this.getElement().parentNode);
        }
        return parentElement;
    };

    DOMElement.prototype.hasParent = function () {
        var hasParent = false;
        hasParent = this.getElement().parentNode != null ? true : false;
        return hasParent;
    };

    /**
    * Equivalent to innerText or textContent
    **/
    DOMElement.prototype.getText = function () {
        var text = null;
        if (this.getElement().textContent) {
            text = this.getElement().textContent;
        } else {
            text = this.getElement().innerText;
        }
        return text;
    };

    /**
    * Equivalent to innerText or textContent
    **/
    DOMElement.prototype.setText = function (text) {
        if (this.getElement().textContent) {
            this.getElement().textContent = text;
        } else {
            this.getElement().innerText = text;
        }

        return this.returnFunction();
    };

    DOMElement.prototype.getAttribute = function (attr) {
        return this.getElement().attributes.getNamedItem(attr).value;
    };

    DOMElement.prototype.setAttribute = function (name, value) {
        this.getElement().setAttribute(name, value);
        return this.returnFunction();
    };

    DOMElement.prototype.hasAttribute = function (name) {
        return this.getElement().hasAttribute(name);
    };

    DOMElement.prototype.hasAttributes = function () {
        return this.getElement().hasAttributes();
    };

    DOMElement.prototype.removeAttribute = function (attributeName) {
        this.getElement().removeAttribute(attributeName);
        return this.returnFunction();
    };

    DOMElement.prototype.setId = function (id) {
        this.getElement().id = id;
        return this.returnFunction();
    };

    DOMElement.prototype.getId = function () {
        return this.getElement().id;
    };

    DOMElement.prototype.setStyleClassName = function (className) {
        this.getElement().className = className;
        return this.returnFunction();
    };

    DOMElement.prototype.getStyleClassName = function () {
        return this.getElement().className;
    };

    DOMElement.prototype.getTagName = function () {
        return this.getElement().tagName;
    };

    DOMElement.prototype.getNodeName = function () {
        return this.getElement().nodeName;
    };

    DOMElement.prototype.getNodeType = function () {
        return this.getElement().nodeType;
    };

    DOMElement.prototype.getNodeValue = function () {
        return this.getElement().nodeValue;
    };

    DOMElement.prototype.setNodeValue = function (nodeValue) {
        this.getElement().nodeValue = nodeValue;
        return this.returnFunction();
    };

    DOMElement.prototype.getCss = function (property) {
        return this.getElement().style.getPropertyValue(property);
    };

    DOMElement.prototype.setCss = function (properties) {
        for (var prop in properties) {
            if (this.getElement().style[prop]) {
                this.getElement().style[prop] = properties[prop];
            }
        }

        return this.returnFunction();
    };

    DOMElement.prototype.getInnerHTML = function () {
        return this.getElement().innerHTML;
    };

    DOMElement.prototype.setInnerHTML = function (innerHTML) {
        this.getElement().innerHTML = innerHTML;
        return this.returnFunction();
    };

    DOMElement.prototype.isSupported = function (feature, version) {
        return this.getElement().isSupported(feature, version);
    };

    /**
    * The isSameNode() method is supported in all major browsers, except Firefox.
    **/
    DOMElement.prototype.isSameNode = function (DOMElement) {
        return this.getElement().isSameNode(DOMElement.getElement());
    };

    DOMElement.prototype.isEqualNode = function (DOMElement) {
        return this.getElement().isEqualNode(DOMElement.getElement());
    };

    DOMElement.prototype.compareDocumentPosition = function (DOMElement) {
        return this.getElement().compareDocumentPosition(DOMElement.getElement());
    };

    /**
    * 	Returns the previous element at the same node tree level
    **/
    DOMElement.prototype.getPreviousSibling = function () {
        return new DOMElement(this.getElement().previousSibling);
    };

    /**
    * Returns the next node at the same node tree level
    **/
    DOMElement.prototype.getNextSibling = function () {
        return new DOMElement(this.getElement().nextSibling);
    };

    DOMElement.prototype.dispatchEvent = function (event) {
        // Dispatch event is has parent only
        if (this.hasParent()) {
            event.setTarget(this);
            event.setCurrentTarget(this);
            EventEngine.dispatchEvent(event);
        } else {
            console.warn("A non added element is trying to dispatch an event");
        }
        return this.returnFunction();
    };

    DOMElement.prototype.clone = function () {
        var clone = new DOMElement(this.getElement().cloneNode());
        return clone;
    };
    return DOMElement;
})(EventDispatcher);
/*
element.style	Sets or returns the style attribute of an element
element.toString()	Converts an element to a string
element.getElementsByTagName()	Returns a collection of all child elements with the specified tagname
element.getFeature()	Returns an object which implements the APIs of a specified feature
element.getUserData()	Returns the object associated to a key on an element
element.setIdAttribute()
element.setIdAttributeNode()
element.setUserData()	Associates an object to a key on an element
element.attributes	Returns a NamedNodeMap of an element's attribute
*/
//# sourceMappingURL=DOMElement.js.map
