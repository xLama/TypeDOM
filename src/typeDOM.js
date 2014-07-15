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
var TypeDOM = (function () {
    function TypeDOM() {
        this.uuid = Utils.generateRandomUUID();
    }
    // This code is not mine. I found it on th web. I am look for author.
    TypeDOM.prototype.getClassName = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(this["constructor"].toString());
        return (results && results.length > 1) ? results[1] : "";
    };

    TypeDOM.prototype.getUUID = function () {
        return this.uuid;
    };
    return TypeDOM;
})();
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
/// <reference path="TypeDOM.ts" />
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.call(this);
    }
    EventDispatcher.prototype.addEventListener = function (type, listener, scope, capture) {
        EventEngine.addEventListener(type, listener, scope, capture, this, -1);
    };

    EventDispatcher.prototype.addEventListenerXTimes = function (type, listener, scope, capture, times) {
        EventEngine.addEventListener(type, listener, scope, capture, this, times);
    };

    EventDispatcher.prototype.removeEventListener = function (type, listener, capture) {
        EventEngine.removeEventListener(type, listener, capture, this);
    };

    EventDispatcher.prototype.dispatchEvent = function (event) {
        event.setTarget(this);
        event.setCurrentTarget(this);
        EventEngine.dispatchEvent(event);
    };

    EventDispatcher.prototype.getUUID = function () {
        return _super.prototype.getUUID.call(this);
    };
    return EventDispatcher;
})(TypeDOM);
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
var NoVisual = (function (_super) {
    __extends(NoVisual, _super);
    function NoVisual() {
        _super.call(this);
    }
    return NoVisual;
})(EventDispatcher);
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
/**
*Defines an abbreviation
**/
var Abbr = (function (_super) {
    __extends(Abbr, _super);
    function Abbr(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Abbr.ABBR);
    }
    Abbr.ABBR = 'abbr';
    return Abbr;
})(Container);
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
/**
*Not supported in HTML5. Use abbr instead. Defines an acronym
**/
var Acronym = (function (_super) {
    __extends(Acronym, _super);
    function Acronym(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Acronym.ACRONYM);
    }
    Acronym.ACRONYM = 'acronym';
    return Acronym;
})(Container);
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
/**
*Defines contact information for the author/owner of a document
**/
var Address = (function (_super) {
    __extends(Address, _super);
    function Address(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Address.ADDRESS);
    }
    Address.ADDRESS = 'address';
    return Address;
})(Container);
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
/**
*Defines an article
**/
var Article = (function (_super) {
    __extends(Article, _super);
    function Article(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Article.ARTICLE);
    }
    Article.ARTICLE = 'article';
    return Article;
})(Container);
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
/**
*Defines content aside from the page content
**/
var Aside = (function (_super) {
    __extends(Aside, _super);
    function Aside(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Aside.ASIDE);
    }
    Aside.ASIDE = 'aside';
    return Aside;
})(Container);
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
/**
*Defines bold text
**/
var B = (function (_super) {
    __extends(B, _super);
    function B(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, B.B);
    }
    B.B = 'b';
    return B;
})(Container);
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
/**
*Isolates a part of text that might be formatted in a different direction from other text outside it
**/
var Bdi = (function (_super) {
    __extends(Bdi, _super);
    function Bdi(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Bdi.BDI);
    }
    Bdi.BDI = 'bdi';
    return Bdi;
})(Container);
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
/**
*Overrides the current text direction
**/
var Bdo = (function (_super) {
    __extends(Bdo, _super);
    function Bdo(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Bdo.BDO);
    }
    Bdo.BDO = 'bdo';
    return Bdo;
})(Container);
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
/**
*Not supported in HTML5. Use CSS instead.Defines big text
**/
var Big = (function (_super) {
    __extends(Big, _super);
    function Big(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Big.BIG);
    }
    Big.BIG = 'big';
    return Big;
})(Container);
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
/**
*Defines a section that is quoted from another source
**/
var Blockquote = (function (_super) {
    __extends(Blockquote, _super);
    function Blockquote(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Blockquote.BLOCKQUOTE);
    }
    Blockquote.BLOCKQUOTE = 'blockquote';
    return Blockquote;
})(Container);
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
/**
*Not supported in HTML5. Use CSS instead.Defines centered text
**/
var Center = (function (_super) {
    __extends(Center, _super);
    function Center(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Center.CENTER);
    }
    Center.CENTER = 'center';
    return Center;
})(Container);
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
/**
*Defines the title of a work
**/
var Cite = (function (_super) {
    __extends(Cite, _super);
    function Cite(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Cite.CITE);
    }
    Cite.CITE = 'cite';
    return Cite;
})(Container);
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
/**
*Defines a piece of computer code
**/
var Code = (function (_super) {
    __extends(Code, _super);
    function Code(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Code.CODE);
    }
    Code.CODE = 'code';
    return Code;
})(Container);
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
/**
*Defines a description/value of a term in a description list
**/
var Dd = (function (_super) {
    __extends(Dd, _super);
    function Dd(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Dd.DD);
    }
    Dd.DD = 'dd';
    return Dd;
})(Container);
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
/**
*Defines additional details that the user can view or hide
**/
var Details = (function (_super) {
    __extends(Details, _super);
    function Details(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Details.DETAILS);
    }
    Details.DETAILS = 'details';
    return Details;
})(Container);
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
/**
*Defines a definition term
**/
var Dfn = (function (_super) {
    __extends(Dfn, _super);
    function Dfn(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Dfn.DFN);
    }
    Dfn.DFN = 'dfn';
    return Dfn;
})(Container);
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
/**
*Defines a dialog box or window
**/
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Dialog.DIALOG);
    }
    Dialog.DIALOG = 'dialog';
    return Dialog;
})(Container);
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
/**
*Not supported in HTML5. Use ul instead.Defines a directory list
**/
var Dir = (function (_super) {
    __extends(Dir, _super);
    function Dir(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Dir.DIR);
    }
    Dir.DIR = 'dir';
    return Dir;
})(Container);
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
/**
*Defines a term/name in a description list
**/
var Dt = (function (_super) {
    __extends(Dt, _super);
    function Dt(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Dt.DT);
    }
    Dt.DT = 'dt';
    return Dt;
})(Container);
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
/**
*Defines emphasized text
**/
var Em = (function (_super) {
    __extends(Em, _super);
    function Em(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Em.EM);
    }
    Em.EM = 'em';
    return Em;
})(Container);
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
/**
*Defines a caption for a figure element
**/
var Figcaption = (function (_super) {
    __extends(Figcaption, _super);
    function Figcaption(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Figcaption.FIGCAPTION);
    }
    Figcaption.FIGCAPTION = 'figcaption';
    return Figcaption;
})(Container);
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
/**
*Specifies self-contained content
**/
var Figure = (function (_super) {
    __extends(Figure, _super);
    function Figure(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Figure.FIGURE);
    }
    Figure.FIGURE = 'figure';
    return Figure;
})(Container);
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
/**
*Not supported in HTML5. Use CSS instead.Defines font, color, and size for text
**/
var Font = (function (_super) {
    __extends(Font, _super);
    function Font(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Font.FONT);
    }
    Font.FONT = 'font';
    return Font;
})(Container);
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
/**
*Defines a footer for a document or section
**/
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Footer.FOOTER);
    }
    Footer.FOOTER = 'footer';
    return Footer;
})(Container);
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
/**
*Not supported in HTML5.Defines a window (a frame) in a frameset
**/
var Frame = (function (_super) {
    __extends(Frame, _super);
    function Frame(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Frame.FRAME);
    }
    Frame.FRAME = 'frame';
    return Frame;
})(Container);
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
/**
*Defines a header for a document or section
**/
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Header.HEADER);
    }
    Header.HEADER = 'header';
    return Header;
})(Container);
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
/**
*Defines a part of text in an alternate voice or mood
**/
var I = (function (_super) {
    __extends(I, _super);
    function I(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, I.I);
    }
    I.I = 'i';
    return I;
})(Container);
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
/**
*Defines keyboard input
**/
var Kbd = (function (_super) {
    __extends(Kbd, _super);
    function Kbd(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Kbd.KBD);
    }
    Kbd.KBD = 'kbd';
    return Kbd;
})(Container);
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
/**
*Defines a key-pair generator field (for forms)
**/
var Keygen = (function (_super) {
    __extends(Keygen, _super);
    function Keygen(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Keygen.KEYGEN);
    }
    Keygen.KEYGEN = 'keygen';
    return Keygen;
})(Container);
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
/**
*Specifies the main content of a document
**/
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Main.MAIN);
    }
    Main.MAIN = 'main';
    return Main;
})(Container);
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
/**
*Defines marked/highlighted text
**/
var Mark = (function (_super) {
    __extends(Mark, _super);
    function Mark(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Mark.MARK);
    }
    Mark.MARK = 'mark';
    return Mark;
})(Container);
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
/**
*Defines a list/menu of commands
**/
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Menu.MENU);
    }
    Menu.MENU = 'menu';
    return Menu;
})(Container);
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
/**
*Defines a command/menu item that the user can invoke from a popup menu
**/
var Menuitem = (function (_super) {
    __extends(Menuitem, _super);
    function Menuitem(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Menuitem.MENUITEM);
    }
    Menuitem.MENUITEM = 'menuitem';
    return Menuitem;
})(Container);
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
/**
*Defines a scalar measurement within a known range (a gauge)
**/
var Meter = (function (_super) {
    __extends(Meter, _super);
    function Meter(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Meter.METER);
    }
    Meter.METER = 'meter';
    return Meter;
})(Container);
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
/**
*Defines navigation links
**/
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Nav.NAV);
    }
    Nav.NAV = 'nav';
    return Nav;
})(Container);
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
/**
*Not supported in HTML5. Defines an alternate content for users that do not support frames
**/
var Noframes = (function (_super) {
    __extends(Noframes, _super);
    function Noframes(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Noframes.NOFRAMES);
    }
    Noframes.NOFRAMES = 'noframes';
    return Noframes;
})(Container);
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
/**
*Defines an alternate content for users that do not support client-side scripts
**/
var Noscript = (function (_super) {
    __extends(Noscript, _super);
    function Noscript(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Noscript.NOSCRIPT);
    }
    Noscript.NOSCRIPT = 'noscript';
    return Noscript;
})(Container);
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
/**
*Defines the result of a calculation
**/
var Output = (function (_super) {
    __extends(Output, _super);
    function Output(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Output.OUTPUT);
    }
    Output.OUTPUT = 'output';
    return Output;
})(Container);
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
/**
*Defines what to show in browsers that do not support ruby annotations
**/
var Rp = (function (_super) {
    __extends(Rp, _super);
    function Rp(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Rp.RP);
    }
    Rp.RP = 'rp';
    return Rp;
})(Container);
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
/**
*Defines an explanation/pronunciation of characters (for East Asian typography)
**/
var Rt = (function (_super) {
    __extends(Rt, _super);
    function Rt(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Rt.RT);
    }
    Rt.RT = 'rt';
    return Rt;
})(Container);
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
/**
*Defines a ruby annotation (for East Asian typography)
**/
var Ruby = (function (_super) {
    __extends(Ruby, _super);
    function Ruby(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Ruby.RUBY);
    }
    Ruby.RUBY = 'ruby';
    return Ruby;
})(Container);
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
/**
*Defines text that is no longer correct
**/
var S = (function (_super) {
    __extends(S, _super);
    function S(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, S.S);
    }
    S.S = 's';
    return S;
})(Container);
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
/**
*Defines sample output from a computer program
**/
var Samp = (function (_super) {
    __extends(Samp, _super);
    function Samp(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Samp.SAMP);
    }
    Samp.SAMP = 'samp';
    return Samp;
})(Container);
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
/**
*Defines a client-side script
**/
var Script = (function (_super) {
    __extends(Script, _super);
    function Script(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Script.SCRIPT);
    }
    Script.SCRIPT = 'script';
    return Script;
})(Container);
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
/**
*Defines a section in a document
**/
var Section = (function (_super) {
    __extends(Section, _super);
    function Section(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Section.SECTION);
    }
    Section.SECTION = 'section';
    return Section;
})(Container);
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
/**
*Defines smaller text
**/
var Small = (function (_super) {
    __extends(Small, _super);
    function Small(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Small.SMALL);
    }
    Small.SMALL = 'small';
    return Small;
})(Container);
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
/**
*Not supported in HTML5. Use del instead.Defines strikethrough text
**/
var Strike = (function (_super) {
    __extends(Strike, _super);
    function Strike(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Strike.STRIKE);
    }
    Strike.STRIKE = 'strike';
    return Strike;
})(Container);
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
/**
*Defines important text
**/
var Strong = (function (_super) {
    __extends(Strong, _super);
    function Strong(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Strong.STRONG);
    }
    Strong.STRONG = 'strong';
    return Strong;
})(Container);
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
/**
*Defines subscripted text
**/
var Sub = (function (_super) {
    __extends(Sub, _super);
    function Sub(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Sub.SUB);
    }
    Sub.SUB = 'sub';
    return Sub;
})(Container);
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
/**
*Defines a visible heading for a details element
**/
var Summary = (function (_super) {
    __extends(Summary, _super);
    function Summary(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Summary.SUMMARY);
    }
    Summary.SUMMARY = 'summary';
    return Summary;
})(Container);
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
/**
*Defines superscripted text
**/
var Sup = (function (_super) {
    __extends(Sup, _super);
    function Sup(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Sup.SUP);
    }
    Sup.SUP = 'sup';
    return Sup;
})(Container);
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
/**
*Defines a date/time
**/
var Time = (function (_super) {
    __extends(Time, _super);
    function Time(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Time.TIME);
    }
    Time.TIME = 'time';
    return Time;
})(Container);
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
/**
*Not supported in HTML5. Use CSS instead.Defines teletype text
**/
var Tt = (function (_super) {
    __extends(Tt, _super);
    function Tt(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Tt.TT);
    }
    Tt.TT = 'tt';
    return Tt;
})(Container);
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
/**
*Defines text that should be stylistically different from normal text
**/
var U = (function (_super) {
    __extends(U, _super);
    function U(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, U.U);
    }
    U.U = 'u';
    return U;
})(Container);
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
/**
*Defines a variable
**/
var Var = (function (_super) {
    __extends(Var, _super);
    function Var(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Var.VAR);
    }
    Var.VAR = 'var';
    return Var;
})(Container);
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
/**
*Defines a possible line-break
**/
var Wbr = (function (_super) {
    __extends(Wbr, _super);
    function Wbr(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Wbr.WBR);
    }
    Wbr.WBR = 'wbr';
    return Wbr;
})(Container);
var H = (function (_super) {
    __extends(H, _super);
    function H() {
        _super.apply(this, arguments);
    }
    H.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return eval("this");
    };

    H.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };

    H.prototype.clone = function () {
        return _super.prototype.clone.call(this);
    };
    return H;
})(Container);
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
/// <reference path="../Base/Container.ts" />
var Body = (function (_super) {
    __extends(Body, _super);
    function Body() {
        _super.call(this);
        if (Body._instance || Body.unlocked == false) {
            throw new Error("Error: Instantiation failed: Use Body.getInstance() instead of new.");
        }
    }
    Body.getInstance = function () {
        if (Body._instance == null) {
            Body.unlocked = true;
            Body._instance = new Body();
            Body.unlocked = false;
            Body._instance.setElement(document.getElementsByTagName("body")[0]);
        }
        return Body._instance;
    };
    Body._instance = null;
    Body.unlocked = false;
    return Body;
})(Container);
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
/// <reference path="../Base/Container.ts" />
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        _super.call(this);
        if (Head.instance || Head.unlocked == false) {
            throw new Error("Error: Instantiation failed: Use Head.getInstance() instead of new.");
        }

        Head.instance = this;
    }
    Head.getInstance = function () {
        if (Head.instance == null) {
            Head.unlocked = true;
            Head.instance = new Head();
            Head.unlocked = false;
            Head.instance.setElement(document.getElementsByTagName("head")[0]);
        }
        return Head.instance;
    };
    Head.instance = null;
    Head.unlocked = false;
    return Head;
})(Container);
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
/**
*Defines a hyperlink
**/
var A = (function (_super) {
    __extends(A, _super);
    function A(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, A.A);
    }
    A.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    A.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };

    A.prototype.setHref = function (href) {
        this.getElement().href = href;
        return this;
    };

    A.prototype.getHref = function () {
        return this.getElement().href;
    };
    A.A = 'a';
    return A;
})(Container);
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
/**
*Not supported in HTML5. Use object instead.Defines an embedded applet
**/
var Applet = (function (_super) {
    __extends(Applet, _super);
    function Applet(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Applet.APPLET);
    }
    Applet.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Applet.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Applet.APPLET = 'applet';
    return Applet;
})(Container);
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
/**
*Defines an area inside an image-map
**/
var Area = (function (_super) {
    __extends(Area, _super);
    function Area(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Area.AREA);
    }
    Area.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Area.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Area.AREA = 'area';
    return Area;
})(Container);
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
/**
*Defines sound content
**/
var td;
(function (td) {
    var Audio = (function (_super) {
        __extends(Audio, _super);
        function Audio(idOrAttributesOrElement) {
            _super.call(this, idOrAttributesOrElement, Audio.AUDIO);
        }
        Audio.prototype.setElement = function (element) {
            _super.prototype.setElement.call(this, element);
            return this;
        };

        Audio.prototype.getElement = function () {
            return _super.prototype.getElement.call(this);
        };
        Audio.AUDIO = 'audio';
        return Audio;
    })(Container);
    td.Audio = Audio;
})(td || (td = {}));
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
/**
*Specifies the base URL/target for all relative URLs in a document
**/
var Base = (function (_super) {
    __extends(Base, _super);
    function Base(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Base.BASE);
    }
    Base.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Base.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Base.BASE = 'base';
    return Base;
})(Container);
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
/**
*Not supported in HTML5. Use CSS instead.Specifies a default color, size, and font for all text in a document
**/
var Basefont = (function (_super) {
    __extends(Basefont, _super);
    function Basefont(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Basefont.BASEFONT);
    }
    Basefont.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Basefont.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Basefont.BASEFONT = 'basefont';
    return Basefont;
})(Container);
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
/**
*Defines a single line break
**/
var Br = (function (_super) {
    __extends(Br, _super);
    function Br(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Br.BR);
    }
    Br.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Br.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Br.BR = 'br';
    return Br;
})(Container);
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
/**
*Defines a clickable button
**/
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Button.BUTTON);
    }
    Button.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Button.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Button.BUTTON = 'button';
    return Button;
})(Container);
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
/**
*Used to draw graphics, on the fly, via scripting (usually JavaScript)
**/
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Canvas.CANVAS);
    }
    Canvas.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Canvas.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Canvas.CANVAS = 'canvas';
    return Canvas;
})(Container);
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
/**
*Defines a table caption
**/
var Caption = (function (_super) {
    __extends(Caption, _super);
    function Caption(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Caption.CAPTION);
    }
    Caption.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Caption.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Caption.CAPTION = 'caption';
    return Caption;
})(Container);
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
/**
*Specifies column properties for each column within a colgroup element
**/
var Col = (function (_super) {
    __extends(Col, _super);
    function Col(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Col.COL);
    }
    Col.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Col.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Col.COL = 'col';
    return Col;
})(Container);
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
/**
*Specifies a group of one or more columns in a table for formatting
**/
var Colgroup = (function (_super) {
    __extends(Colgroup, _super);
    function Colgroup(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Colgroup.COLGROUP);
    }
    Colgroup.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Colgroup.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Colgroup.COLGROUP = 'colgroup';
    return Colgroup;
})(Container);
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
/**
*Specifies a list of pre-defined options for input controls
**/
var Datalist = (function (_super) {
    __extends(Datalist, _super);
    function Datalist(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Datalist.DATALIST);
    }
    Datalist.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Datalist.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Datalist.DATALIST = 'datalist';
    return Datalist;
})(Container);
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
/**
*Defines text that has been deleted from a document
**/
var Del = (function (_super) {
    __extends(Del, _super);
    function Del(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Del.DEL);
    }
    Del.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Del.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Del.DEL = 'del';
    return Del;
})(Container);
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
/**
*Defines a section in a document
**/
var Div = (function (_super) {
    __extends(Div, _super);
    function Div(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Div.DIV);
    }
    Div.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Div.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Div.DIV = 'div';
    return Div;
})(Container);
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
/**
*Defines a description list
**/
var Dl = (function (_super) {
    __extends(Dl, _super);
    function Dl(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Dl.DL);
    }
    Dl.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Dl.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Dl.DL = 'dl';
    return Dl;
})(Container);
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
/**
*Defines a container for an external (non-HTML) application
**/
var Embed = (function (_super) {
    __extends(Embed, _super);
    function Embed(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Embed.EMBED);
    }
    Embed.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Embed.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Embed.EMBED = 'embed';
    return Embed;
})(Container);
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
/**
*Groups related elements in a form
**/
var Fieldset = (function (_super) {
    __extends(Fieldset, _super);
    function Fieldset(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Fieldset.FIELDSET);
    }
    Fieldset.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Fieldset.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Fieldset.FIELDSET = 'fieldset';
    return Fieldset;
})(Container);
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
/**
*Defines an HTML form for user input
**/
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Form.FORM);
    }
    Form.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Form.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Form.FORM = 'form';
    return Form;
})(Container);
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
/**
*Not supported in HTML5. Defines a set of frames
**/
var Frameset = (function (_super) {
    __extends(Frameset, _super);
    function Frameset(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Frameset.FRAMESET);
    }
    Frameset.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Frameset.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Frameset.FRAMESET = 'frameset';
    return Frameset;
})(Container);
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
/**
* Defines HTML headings
**/
var H1 = (function (_super) {
    __extends(H1, _super);
    function H1(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, H1.H1);
    }
    H1.H1 = 'h1';
    return H1;
})(H);
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
/**
* Defines HTML headings
**/
var H2 = (function (_super) {
    __extends(H2, _super);
    function H2(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, H2.H2);
    }
    H2.H2 = 'h2';
    return H2;
})(H);
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
/**
* Defines HTML headings
**/
var H3 = (function (_super) {
    __extends(H3, _super);
    function H3(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, H3.H3);
    }
    H3.H3 = 'h3';
    return H3;
})(H);
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
/**
* Defines HTML headings
**/
var H4 = (function (_super) {
    __extends(H4, _super);
    function H4(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, H4.H4);
    }
    H4.H4 = 'h4';
    return H4;
})(H);
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
/**
* Defines HTML headings
**/
var H5 = (function (_super) {
    __extends(H5, _super);
    function H5(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, H5.H5);
    }
    H5.H5 = 'h5 ';
    return H5;
})(H);
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
/**
* Defines HTML headings
**/
var H6 = (function (_super) {
    __extends(H6, _super);
    function H6(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, H6.H6);
    }
    H6.H6 = 'h6';
    return H6;
})(H);
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
/**
* Defines a thematic change in the content
**/
var Hr = (function (_super) {
    __extends(Hr, _super);
    function Hr(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Hr.HR);
    }
    Hr.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Hr.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Hr.HR = 'hr';
    return Hr;
})(Container);
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
/**
*Defines an inline frame
**/
var Iframe = (function (_super) {
    __extends(Iframe, _super);
    function Iframe(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Iframe.IFRAME);
    }
    Iframe.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Iframe.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Iframe.IFRAME = 'iframe';
    return Iframe;
})(Container);
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
/**
*Defines an image
**/
var Img = (function (_super) {
    __extends(Img, _super);
    function Img(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Img.IMG);
    }
    Img.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Img.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Img.IMG = 'img';
    return Img;
})(Container);
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
/**
*Defines an input control
**/
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Input.INPUT);
    }
    Input.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Input.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Input.INPUT = 'input';
    return Input;
})(Container);
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
/**
*Defines a text that has been inserted into a document
**/
var Ins = (function (_super) {
    __extends(Ins, _super);
    function Ins(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Ins.INS);
    }
    Ins.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Ins.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Ins.INS = 'ins';
    return Ins;
})(Container);
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
/**
*Defines a label for an input element
**/
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Label.LABEL);
    }
    Label.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Label.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Label.LABEL = 'label';
    return Label;
})(Container);
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
/**
*Defines a caption for a fieldset element
**/
var Legend = (function (_super) {
    __extends(Legend, _super);
    function Legend(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Legend.LEGEND);
    }
    Legend.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Legend.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Legend.LEGEND = 'legend';
    return Legend;
})(Container);
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
/**
*Defines a list item
**/
var Li = (function (_super) {
    __extends(Li, _super);
    function Li(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Li.LI);
    }
    Li.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Li.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Li.LI = 'li';
    return Li;
})(Container);
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
/**
*Defines the relationship between a document and an external resource (most used to link to style sheets)
**/
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Link.LINK);
    }
    Link.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Link.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Link.LINK = 'link';
    return Link;
})(Container);
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
/**
*Defines a client-side image-map
**/
var td;
(function (td) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map(idOrAttributesOrElement) {
            _super.call(this, idOrAttributesOrElement, Map.MAP);
        }
        Map.prototype.setElement = function (element) {
            _super.prototype.setElement.call(this, element);
            return this;
        };

        Map.prototype.getElement = function () {
            return _super.prototype.getElement.call(this);
        };
        Map.MAP = 'map';
        return Map;
    })(Container);
    td.Map = Map;
})(td || (td = {}));
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
/**
*Defines metadata about an HTML document
**/
var Meta = (function (_super) {
    __extends(Meta, _super);
    function Meta(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Meta.META);
    }
    Meta.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Meta.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Meta.META = 'meta';
    return Meta;
})(Container);
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
/**
*Defines an embedded object
**/
var td;
(function (td) {
    var Object = (function (_super) {
        __extends(Object, _super);
        function Object(idOrAttributesOrElement) {
            _super.call(this, idOrAttributesOrElement, Object.OBJECT);
        }
        Object.prototype.setElement = function (element) {
            _super.prototype.setElement.call(this, element);
            return this;
        };

        Object.prototype.getElement = function () {
            return _super.prototype.getElement.call(this);
        };
        Object.OBJECT = 'object';
        return Object;
    })(Container);
    td.Object = Object;
})(td || (td = {}));
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
/**
*Defines an ordered list
**/
var Ol = (function (_super) {
    __extends(Ol, _super);
    function Ol(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Ol.OL);
    }
    Ol.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Ol.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Ol.OL = 'ol';
    return Ol;
})(Container);
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
/**
*Defines a group of related options in a drop-down list
**/
var Optgroup = (function (_super) {
    __extends(Optgroup, _super);
    function Optgroup(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Optgroup.OPTGROUP);
    }
    Optgroup.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Optgroup.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Optgroup.OPTGROUP = 'optgroup';
    return Optgroup;
})(Container);
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
/**
*Defines an option in a drop-down list
**/
var td;
(function (td) {
    var Option = (function (_super) {
        __extends(Option, _super);
        function Option(idOrAttributesOrElement) {
            _super.call(this, idOrAttributesOrElement, Option.OPTION);
        }
        Option.prototype.setElement = function (element) {
            _super.prototype.setElement.call(this, element);
            return this;
        };

        Option.prototype.getElement = function () {
            return _super.prototype.getElement.call(this);
        };
        Option.OPTION = 'option';
        return Option;
    })(Container);
    td.Option = Option;
})(td || (td = {}));
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
/**
*Defines a paragraph
**/
var P = (function (_super) {
    __extends(P, _super);
    function P(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, P.P);
    }
    P.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    P.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    P.P = 'p';
    return P;
})(Container);
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
/**
*Defines a parameter for an object
**/
var Param = (function (_super) {
    __extends(Param, _super);
    function Param(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Param.PARAM);
    }
    Param.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Param.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Param.PARAM = 'param';
    return Param;
})(Container);
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
/**
*Defines preformatted text
**/
var Pre = (function (_super) {
    __extends(Pre, _super);
    function Pre(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Pre.PRE);
    }
    Pre.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Pre.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Pre.PRE = 'pre';
    return Pre;
})(Container);
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
/**
*Represents the progress of a task
**/
var Progress = (function (_super) {
    __extends(Progress, _super);
    function Progress(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Progress.PROGRESS);
    }
    Progress.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Progress.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Progress.PROGRESS = 'progress';
    return Progress;
})(Container);
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
/**
*Defines a short quotation
**/
var Q = (function (_super) {
    __extends(Q, _super);
    function Q(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Q.Q);
    }
    Q.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Q.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Q.Q = 'q';
    return Q;
})(Container);
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
/**
*Defines a drop-down list
**/
var Select = (function (_super) {
    __extends(Select, _super);
    function Select(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Select.SELECT);
    }
    Select.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Select.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Select.SELECT = 'select';
    return Select;
})(Container);
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
/**
*Defines multiple media resources for media elements (video and audio)
**/
var Source = (function (_super) {
    __extends(Source, _super);
    function Source(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Source.SOURCE);
    }
    Source.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Source.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Source.SOURCE = 'source';
    return Source;
})(Container);
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
/**
*Defines a section in a document
**/
var Span = (function (_super) {
    __extends(Span, _super);
    function Span(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Span.SPAN);
    }
    Span.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Span.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Span.SPAN = 'span';
    return Span;
})(Container);
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
/**
*Defines style information for a document
**/
var Style = (function (_super) {
    __extends(Style, _super);
    function Style(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Style.STYLE);
    }
    Style.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Style.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Style.STYLE = 'style';
    return Style;
})(Container);
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
/**
*Defines a table
**/
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Table.TABLE);
    }
    Table.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Table.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Table.TABLE = 'table';
    return Table;
})(Container);
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
/**
*Groups the body content in a table
**/
var Tbody = (function (_super) {
    __extends(Tbody, _super);
    function Tbody(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Tbody.TBODY);
    }
    Tbody.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Tbody.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Tbody.TBODY = 'tbody';
    return Tbody;
})(Container);
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
/**
*Defines a cell in a table
**/
var Td = (function (_super) {
    __extends(Td, _super);
    function Td(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Td.TD);
    }
    Td.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Td.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Td.TD = 'td';
    return Td;
})(Container);
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
/**
*Defines a multiline input control (text area)
**/
var Textarea = (function (_super) {
    __extends(Textarea, _super);
    function Textarea(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Textarea.TEXTAREA);
    }
    Textarea.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Textarea.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Textarea.TEXTAREA = 'textarea';
    return Textarea;
})(Container);
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
/**
*Groups the footer content in a table
**/
var Tfoot = (function (_super) {
    __extends(Tfoot, _super);
    function Tfoot(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Tfoot.TFOOT);
    }
    Tfoot.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Tfoot.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Tfoot.TFOOT = 'tfoot';
    return Tfoot;
})(Container);
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
/**
*Defines a header cell in a table
**/
var Th = (function (_super) {
    __extends(Th, _super);
    function Th(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Th.TH);
    }
    Th.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Th.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Th.TH = 'th';
    return Th;
})(Container);
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
/**
*Groups the header content in a table
**/
var Thead = (function (_super) {
    __extends(Thead, _super);
    function Thead(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Thead.THEAD);
    }
    Thead.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Thead.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Thead.THEAD = 'thead';
    return Thead;
})(Container);
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
/**
*Defines a title for the document
**/
var Title = (function (_super) {
    __extends(Title, _super);
    function Title(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Title.TITLE);
    }
    Title.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Title.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Title.TITLE = 'title';
    return Title;
})(Container);
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
/**
*Defines a row in a table
**/
var Tr = (function (_super) {
    __extends(Tr, _super);
    function Tr(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Tr.TR);
    }
    Tr.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Tr.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Tr.TR = 'tr';
    return Tr;
})(Container);
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
/**
*Defines text tracks for media elements (video and audio)
**/
var Track = (function (_super) {
    __extends(Track, _super);
    function Track(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Track.TRACK);
    }
    Track.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Track.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Track.TRACK = 'track';
    return Track;
})(Container);
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
/**
*Defines an unordered list
**/
var Ul = (function (_super) {
    __extends(Ul, _super);
    function Ul(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Ul.UL);
    }
    Ul.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Ul.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Ul.UL = 'ul';
    return Ul;
})(Container);
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
/**
*Defines a video or movie
**/
var Video = (function (_super) {
    __extends(Video, _super);
    function Video(idOrAttributesOrElement) {
        _super.call(this, idOrAttributesOrElement, Video.VIDEO);
    }
    Video.prototype.setElement = function (element) {
        _super.prototype.setElement.call(this, element);
        return this;
    };

    Video.prototype.getElement = function () {
        return _super.prototype.getElement.call(this);
    };
    Video.VIDEO = 'video';
    return Video;
})(Container);
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
var EventPhases;
(function (EventPhases) {
    EventPhases[EventPhases["CAPTURING_PHASE"] = 0] = "CAPTURING_PHASE";
    EventPhases[EventPhases["AT_TARGET"] = 1] = "AT_TARGET";
    EventPhases[EventPhases["BUBBLING_PHASE"] = 2] = "BUBBLING_PHASE";
    EventPhases[EventPhases["SCATTERING_PHASE"] = 3] = "SCATTERING_PHASE";
})(EventPhases || (EventPhases = {}));

var BaseEvent = (function () {
    function BaseEvent(type, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles, nativeEvent) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = false; }
        this.eventType = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.capturable = capturable;
        this.propagation = true;
        this.inmediatePropagation = true;
        this.updateVisualHierarchyInBubbles = updateVisualHierarchyInBubbles;
        this.nativeEvent = nativeEvent;
    }
    BaseEvent.prototype.stopPropagation = function () {
        if (this.cancelable) {
            this.propagation = false;
        }
    };

    BaseEvent.prototype.stopInmediatePropagation = function () {
        if (this.cancelable) {
            this.inmediatePropagation = false;
        }
    };

    BaseEvent.prototype.preventDefault = function () {
        if (this.cancelable && this.nativeEvent) {
            if (this.nativeEvent.preventDefault) {
                this.nativeEvent.preventDefault();
            } else {
                this.nativeEvent["returnValue"] = false;
            }
        }
    };

    BaseEvent.nativeEventToBaseEvent = function (evt) {
        if (TD_MouseEvent.events[evt.type])
            return new TD_MouseEvent(evt);
else if (TD_KeyboardEvent.events[evt.type])
            return new TD_KeyboardEvent(evt);
    };

    BaseEvent.isNativeEvent = function (eventType) {
        var isNativeEvent = false;

        for (var i = 0; i < BaseEvent.allNativeEvents.length && !isNativeEvent; ++i) {
            if (eventType in BaseEvent.allNativeEvents[i]) {
                isNativeEvent = true;
            }
        }

        return isNativeEvent;
    };

    BaseEvent.prototype.getCapturable = function () {
        return this.capturable;
    };

    BaseEvent.prototype.getTarget = function () {
        return this.target;
    };

    BaseEvent.prototype.getCurrentTarget = function () {
        return this.currentTarget;
    };

    BaseEvent.prototype.setTarget = function (target) {
        this.target = target;
    };

    BaseEvent.prototype.setCurrentTarget = function (currentTarget) {
        this.currentTarget = currentTarget;
    };

    BaseEvent.prototype.getUpdateVisualHierarchyInBubbles = function () {
        return this.updateVisualHierarchyInBubbles;
    };

    BaseEvent.prototype.getBubbles = function () {
        return this.bubbles;
    };

    BaseEvent.prototype.getPhase = function () {
        return this.phase;
    };

    BaseEvent.prototype.setPhase = function (phase) {
        this.phase = phase;
    };

    BaseEvent.prototype.getNativeEvent = function () {
        return this.nativeEvent;
    };

    BaseEvent.prototype.getInmediatePropagation = function () {
        return this.inmediatePropagation;
    };

    BaseEvent.prototype.getEventType = function () {
        return this.eventType;
    };

    BaseEvent.prototype.getPropagation = function () {
        return this.propagation;
    };
    BaseEvent.allNativeEvents = [
        { "onkeydown": "1", "onkeypress": "1", "onkeyup": "1" },
        { "click": "1", "dblclick": "1", "mousedown": "1", "mouseup": "1", "mouseover": "1", "mouseout": "1", "mousemove": "1" }
    ];
    return BaseEvent;
})();
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
var AjaxEvent = (function (_super) {
    __extends(AjaxEvent, _super);
    function AjaxEvent(type, dataType, data) {
        _super.call(this, type, false, false, false);
        this.data = data;
        this.dataType = dataType;
    }
    AjaxEvent.NOT_FOUND = "not_found";
    AjaxEvent.SERVER_ERROR = "server_error";
    AjaxEvent.BEFORE_SERVER_RESPONSE = "before_server_response";
    AjaxEvent.ALMOST_READY = "almost_ready";
    AjaxEvent.NOT_INITIALIZE = "not_initialize";
    AjaxEvent.NO_SEND = "no_send";
    AjaxEvent.ALL_RIGHT = "all_right";
    return AjaxEvent;
})(BaseEvent);
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
var CollectionEvent = (function (_super) {
    __extends(CollectionEvent, _super);
    function CollectionEvent(type) {
        _super.call(this, type, false, false, false);
    }
    CollectionEvent.COLLECTION_CHANGE = "collectionChange";
    return CollectionEvent;
})(BaseEvent);
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
/// <reference path="../BaseEvent.ts" />
var ContainerEvent = (function (_super) {
    __extends(ContainerEvent, _super);
    function ContainerEvent(type, children, capturable, bubbles, cancelable) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        _super.call(this, type, capturable, bubbles, cancelable);
        this.children = children;
    }
    ContainerEvent.CHILD_REMOVED = "childRemoved";
    ContainerEvent.CHILD_ADDED = "childAdded";
    ContainerEvent.CHILDREN_ADDED = "childrenAdded";
    ContainerEvent.CHILDREN_REMOVED = "childrenRemoved";
    return ContainerEvent;
})(BaseEvent);
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
var EventEngine = (function () {
    function EventEngine() {
    }
    EventEngine.addEventListener = function (eventType, handler, scope, capture, target, times) {
        if (typeof times === "undefined") { times = -1; }
        var listenerManager = EventEngine.handlerListenerList[target.getUUID()];
        listenerManager = listenerManager || (EventEngine.handlerListenerList[target.getUUID()] = new ListenerManager());

        if (BaseEvent.isNativeEvent(eventType) && listenerManager.getAllListenersByEventType(eventType).isEmpty()) {
            try  {
                var targetElement = target;
            } catch (e) {
                throw new TypeError("Target is not a visual element");
            }
        }
        if (window.addEventListener)
            targetElement.getElement().addEventListener(eventType, EventEngine.nativeEventsCallback, true);
else
            targetElement.getElement().attachEvent("on" + eventType, EventEngine.nativeEventsCallback);
        listenerManager.addListener(new Listener(eventType, handler, capture, times, scope));
    };

    EventEngine.dispatchEvent = function (eventToDispatch) {
        try  {
            var target = eventToDispatch.getTarget();
            if (eventToDispatch.getCapturable()) {
                EventEngine.capture(eventToDispatch);
            }
        } catch (e) {
            EventEngine.target(eventToDispatch, null);
        }
    };

    EventEngine.capture = function (eventDispatched) {
        var visualHierarchy = EventEngine.getVisualHierarchy(eventDispatched.getTarget());

        if (visualHierarchy && visualHierarchy.hasItems()) {
            eventDispatched.setPhase(EventPhases.CAPTURING_PHASE);
            EventEngine.captureOrBubbles(eventDispatched, visualHierarchy, true);
        }
        if (eventDispatched.getPropagation()) {
            EventEngine.target(eventDispatched, visualHierarchy);
        }
    };

    EventEngine.target = function (eventDispatched, visualHierarchy) {
        eventDispatched.setCurrentTarget(eventDispatched.getTarget());
        eventDispatched.setPhase(EventPhases.AT_TARGET);

        var listenerManager = EventEngine.handlerListenerList[eventDispatched.getTarget().getUUID()];
        var listeners = listenerManager ? listenerManager.getAllListenersByEventType(eventDispatched.getEventType()) : null;

        if (listeners && listeners.hasItems()) {
            var listener;
            for (var index = listeners.getLength() - 1; index >= 0; --index) {
                listener = listeners.getItemAt(index);
                listener.getHandler().call(listener.getScope(), eventDispatched);
                EventEngine.checkListenerHandler(listener, eventDispatched.getTarget(), listeners, index, listenerManager);
            }
        }

        if (eventDispatched.getBubbles() && eventDispatched.getPropagation()) {
            EventEngine.bubbles(eventDispatched, visualHierarchy);
        }
    };

    EventEngine.bubbles = function (eventDispatched, visualHierarchy) {
        if (!visualHierarchy || (visualHierarchy && eventDispatched.getUpdateVisualHierarchyInBubbles())) {
            visualHierarchy = EventEngine.getVisualHierarchy(eventDispatched.getTarget());
        }

        if (visualHierarchy && visualHierarchy.hasItems()) {
            eventDispatched.setPhase(EventPhases.BUBBLING_PHASE);
            EventEngine.captureOrBubbles(eventDispatched, visualHierarchy, false);
        }
    };

    EventEngine.captureOrBubbles = function (eventDispatched, visualHierarchy, captureOrBubbles, dispersable) {
        if (typeof dispersable === "undefined") { dispersable = false; }
        var i = captureOrBubbles ? (visualHierarchy.getLength() - 1) * -1 : 0;
        var limit = captureOrBubbles ? 0 : visualHierarchy.getLength() - 1;

        for (; i <= limit && eventDispatched.getPropagation(); ++i) {
            eventDispatched.setCurrentTarget(captureOrBubbles ? visualHierarchy.getItemAt(i * -1) : visualHierarchy.getItemAt(i));
            var listenerManager = EventEngine.handlerListenerList[eventDispatched.getCurrentTarget().getUUID()];

            if (listenerManager) {
                var listeners = listenerManager.getListeners(eventDispatched.getEventType(), captureOrBubbles);
                if (dispersable) {
                    if (!listeners)
                        listeners = new ArrayCollection();
                    listeners.addAll(listenerManager.getListeners(eventDispatched.getEventType(), !captureOrBubbles));
                }
            }

            if (listeners && listeners.hasItems()) {
                for (var index = listeners.getLength() - 1; index >= 0 && eventDispatched.getInmediatePropagation(); --index) {
                    var listener = listeners.getItemAt(index);
                    listener.getHandler().call(listener.getScope(), eventDispatched);
                    EventEngine.checkListenerHandler(listener, eventDispatched.getCurrentTarget(), listeners, index, listenerManager);
                }
            }
        }
    };

    EventEngine.checkListenerHandler = function (listener, currentTarget, listenersList, index, listenerManager) {
        if (listener.getTimes() > 0) {
            listener.setTimes(listener.getTimes() - 1);
        }

        if (listener.getTimes() == 0) {
            listenersList.removeItemAt(index);
            if (listenersList.isEmpty()) {
                EventEngine.cleanListenerObject(listener.getEventType(), listener.getCapture(), listenerManager, currentTarget);
            }
        }
    };

    EventEngine.removeEventListener = function (eventType, handler, capture, target) {
        var listenerManager = EventEngine.handlerListenerList[target.getUUID()];
        var listenersList = listenerManager ? listenerManager.getListeners(eventType, capture) : null;
        var index = -1;

        if (listenersList) {
            index = listenersList.getItemIndexByAttributes({ "handler": handler });
            listenersList.removeItemAt(index);

            if (listenersList.isEmpty()) {
                EventEngine.cleanListenerObject(eventType, capture, listenerManager, target);
            }
        }
    };

    EventEngine.cleanListenerObject = function (eventType, capture, listenerManager, target) {
        // Si se borran los eventos con caputra a true, se comprueba si los captura false tienen eventos.
        // Si no lo tienen se borra el evento completo.
        // Si se borra el evento completo se intenta borrar el nativo del elemento visual si lo es.
        listenerManager.removeListernersByCapture(eventType, capture);
        if (listenerManager.getListeners(eventType, !capture) == null) {
            listenerManager.removeListernersByEventType(eventType);

            if (BaseEvent.isNativeEvent(eventType)) {
                try  {
                    var targetElement = target;
                } catch (e) {
                    throw new TypeError("Target is not a visual element");
                }
                if (document.removeEventListener)
                    targetElement.getElement().removeEventListener(eventType, EventEngine.nativeEventsCallback, true);
else
                    targetElement.getElement().detachEvent("on" + eventType, EventEngine.nativeEventsCallback);
            }
        }
    };

    EventEngine.nativeEventsCallback = function (nativeEvent) {
        if (document.addEventListener) {
            nativeEvent.stopImmediatePropagation();
            nativeEvent.stopPropagation();
        } else {
            nativeEvent.cancelBubble = true;
        }

        var newEvent = BaseEvent.nativeEventToBaseEvent(nativeEvent);
        newEvent.setTarget(new DOMElement(nativeEvent.srcElement));
        newEvent.setCurrentTarget(newEvent.getTarget());

        EventEngine.dispatchEvent(newEvent);
    };

    EventEngine.getVisualHierarchy = function (child) {
        var parents = new Collection();
        var parent = (child).getElement().parentElement;

        while (parent != null) {
            if (parent["uuid"] && parent["uuid"] in EventEngine.handlerListenerList) {
                parents.addItem(new DOMElement(parent));
            }
            parent = parent.parentElement;
        }
        return parents;
    };
    EventEngine.handlerListenerList = new Object();
    return EventEngine;
})();
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
var Listener = (function () {
    function Listener(type, handler, capture, times, scope) {
        this.eventType = type;
        this.handler = handler;
        this.times = times;
        this.capture = capture;
        this.scope = scope;
    }
    Listener.prototype.getEventType = function () {
        return this.eventType;
    };

    Listener.prototype.getHandler = function () {
        return this.handler;
    };

    Listener.prototype.getTimes = function () {
        return this.times;
    };

    Listener.prototype.setTimes = function (times) {
        this.times = times;
    };

    Listener.prototype.getCapture = function () {
        return this.capture;
    };

    Listener.prototype.getScope = function () {
        return this.scope;
    };
    return Listener;
})();
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
var ListenerManager = (function () {
    function ListenerManager() {
        this.data = new Object();
    }
    ListenerManager.prototype.addListener = function (listener) {
        if (this.data == null)
            throw new TypeError("Data is null");

        var eventType = listener.getEventType();
        var capture = listener.getCapture().toString();
        var handler = listener.getHandler();

        if (this.data.hasOwnProperty(eventType)) {
            if (this.data[eventType][capture] == null) {
                this.data[eventType][capture] = new ArrayCollection();
            }
        } else {
            this.data[eventType] = new Object();
            this.data[eventType][capture] = new ArrayCollection();
        }

        this.data[eventType][capture].addItem(listener);
    };

    ListenerManager.prototype.getAllListenersByEventType = function (eventType) {
        var listeners = new ArrayCollection();

        if (this.data.hasOwnProperty(eventType)) {
            if (this.data[eventType]["true"])
                listeners.addAll(this.data[eventType]["true"]);
            if (this.data[eventType]["false"])
                listeners.addAll(this.data[eventType]["false"]);
        }

        return listeners;
    };

    ListenerManager.prototype.getListeners = function (eventType, capture) {
        var listeners = null;

        if (this.data.hasOwnProperty(eventType) && this.data[eventType][capture.toString()]) {
            listeners = this.data[eventType][capture.toString()];
        }

        return listeners;
    };

    ListenerManager.prototype.removeListernersByCapture = function (eventType, capture) {
        if (this.data.hasOwnProperty(eventType)) {
            delete this.data[eventType][capture.toString()];
        }
    };

    ListenerManager.prototype.removeListernersByEventType = function (eventType) {
        delete this.data[eventType];
    };
    return ListenerManager;
})();
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
/// <reference path="../BaseEvent.ts" />
var TD_KeyboardEvent = (function (_super) {
    __extends(TD_KeyboardEvent, _super);
    function TD_KeyboardEvent(typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = true; }
        if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = true; }
        if (typeOrEvent instanceof KeyboardEvent) {
            _super.call(this, (typeOrEvent).type, capturable, (typeOrEvent).bubbles, (typeOrEvent).cancelable);

            this.altKey = (typeOrEvent).altKey;
            this.key = (typeOrEvent).key;
            this.keyCode = (typeOrEvent).keyCode;
            this.char = (typeOrEvent).char;
            this.charCode = (typeOrEvent).charCode;
        } else {
            _super.call(this, typeOrEvent, capturable, bubbles, cancelable);
        }
    }
    TD_KeyboardEvent.events = {
        "onkeydown": "1",
        "onkeypress": "1",
        "onkeyup": "1"
    };

    TD_KeyboardEvent.KEY_DOWN = "keydown";
    TD_KeyboardEvent.KEY_PRESS = "keypress";
    TD_KeyboardEvent.KEY_UP = "keyup";
    return TD_KeyboardEvent;
})(BaseEvent);
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
/// <reference path="../BaseEvent.ts" />
var TD_MouseEvent = (function (_super) {
    __extends(TD_MouseEvent, _super);
    function TD_MouseEvent(typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles) {
        if (typeof capturable === "undefined") { capturable = true; }
        if (typeof bubbles === "undefined") { bubbles = true; }
        if (typeof cancelable === "undefined") { cancelable = true; }
        if (typeof updateVisualHierarchyInBubbles === "undefined") { updateVisualHierarchyInBubbles = false; }
        if (typeof typeOrEvent == "string") {
            _super.call(this, typeOrEvent, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles);
        } else {
            try  {
                _super.call(this, (typeOrEvent).type, capturable, bubbles, cancelable, updateVisualHierarchyInBubbles, typeOrEvent);
            } catch (e) {
                throw new TypeError("Cast exception");
            }
        }
    }
    TD_MouseEvent.prototype.getNativeEvent = function () {
        return _super.prototype.getNativeEvent.call(this);
    };

    TD_MouseEvent.prototype.getClientX = function () {
        return this.getNativeEvent().clientX;
    };

    TD_MouseEvent.prototype.getClientY = function () {
        return this.getNativeEvent().clientY;
    };
    TD_MouseEvent.events = {
        "click": "1",
        "dblclick": "1",
        "mousedown": "1",
        "mouseup": "1",
        "mouseover": "1",
        "mouseout": "1",
        "mousemove": "1"
    };

    TD_MouseEvent.CLICK = "click";
    TD_MouseEvent.DOUBLE_CLICK = "dblclick";
    TD_MouseEvent.MOUSE_DOWN = "mousedown";
    TD_MouseEvent.MOUSE_UP = "mouseup";
    TD_MouseEvent.MOUSE_OVER = "mouseover";
    TD_MouseEvent.MOUSE_OUT = "mouseout";
    TD_MouseEvent.MOUSE_MOVE = "mousemove";

    TD_MouseEvent.ONDRAGNEW = "dragNew";
    TD_MouseEvent.ONDRAGENDNEW = "dragendNew";
    TD_MouseEvent.ONDRAGENTERNEW = "dragenterNew";
    TD_MouseEvent.ONDRAGLEAVENEW = "dragleaveNew";
    TD_MouseEvent.ONDRAGOVERNEW = "dragoverNew";
    TD_MouseEvent.ONDRAGSTARTNEW = "dragstartNew";
    TD_MouseEvent.ONMOUSEWHEELNEW = "mousewheelNew";
    TD_MouseEvent.ONSCROLL = "scroll";
    TD_MouseEvent.ONDROP = "drop";
    return TD_MouseEvent;
})(BaseEvent);
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
                case AjaxStates.READY_STATE_UNINITIALIZED:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.NOT_INITIALIZE));
                    break;

                case AjaxStates.READY_STATE_LOADING:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.NO_SEND));
                    break;

                case AjaxStates.READY_STATE_LOADED:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.BEFORE_SERVER_RESPONSE));
                    break;

                case AjaxStates.READY_STATE_INTERACTIVE:
                    _this.dispatchEvent(new AjaxEvent(AjaxEvent.ALMOST_READY));
                    break;

                case AjaxStates.READY_STATE_COMPLETE:
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
            // It�s an array
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
/// <reference path="Collection.ts" />
var ArrayCollection = (function (_super) {
    __extends(ArrayCollection, _super);
    function ArrayCollection() {
        _super.apply(this, arguments);
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
            throw new TypeError("List can�t be null");
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

    // Si alguno cumple a funci�n
    ArrayCollection.prototype.some = function (func) {
        for (var i = 0; i < this.getLength(); i++) {
            if (func(this.getItemAt(i))) {
                return true;
            }
        }
        return false;
    };

    // Si todos cumplen la funci�n
    ArrayCollection.prototype.every = function (func) {
        for (var i = 0; i < this.getLength(); i++) {
            if (!func(this.getItemAt(i))) {
                return false;
            }
        }
        return true;
    };

    // Ejecuta un m�todo del objeto si existe
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
var Utils = (function () {
    function Utils() {
    }
    Utils.generateRandomUUID = // This code is not mine. I found it on th web. I am look for author.
    function () {
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS, uuid = ['', '', '', '', '', '', '', '', '-', '', '', '', '', '-', '4', '', '', '', '-', '', '', '', '', '-', '', '', '', '', '', '', '', '', '', '', '', ''], i = 36, rnd = 0, r;

        while (i--) {
            if (uuid[i] === '') {
                if (rnd <= 0x02) {
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                }
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }

        return uuid.join('');
    };
    return Utils;
})();
window.onload = function () {
};
//# sourceMappingURL=typeDOM.js.map
