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
    class DOMElement<T extends IDOMElement> extends EventDispatcher<T> implements ICloneable<T>, IDOMElement
    {

        private element: HTMLElement;

        constructor();
        constructor( element: HTMLElement );
        constructor( id: any, tag: string );
        constructor( attributes: Object );
        constructor( idOrAttributesOrElement?: any, tag?: string )
        {
            super();

            if ( tag )
            {
                this.setElement( document.createElement( tag ) );
            }

            if ( idOrAttributesOrElement )
            {

                if ( typeof idOrAttributesOrElement == "string" )
                {
                    this.getElement().id = idOrAttributesOrElement;
                }
                else if ( idOrAttributesOrElement instanceof Element )
                {
                    this.setElement( idOrAttributesOrElement );

                }

                else
                {
                    for ( var key in idOrAttributesOrElement )
                    {
                        this.getElement()[key] = idOrAttributesOrElement[key];
                    }
                }
            }
        }




        public getVisualHierarchy(): ICollection<IDOMElement>
        {

            var parents: ArrayCollection<IDOMElement> = new ArrayCollection<IDOMElement>();
            var parent: HTMLElement = this.getElement().parentElement;

            while ( parent != null )
            {
                parents.addItem( new DOMElement( parent ) );
                parent = parent.parentElement;
            }
            return parents;
        }

        public getUUID(): string
        {
            return this.getElement()["uuid"];
        }

        public setElement( element: HTMLElement ): T
        {
            this.element = element;
            if ( this.element["uuid"] == null )
            {
                this.element["uuid"] = Utils.generateRandomUUID();
            }
            return this.returnFunction();
        }


        public getElement(): HTMLElement
        {
            return this.element;
        }


        public returnFunction(): T
        {
            var self: IDOMElement = this;
            return <T>self;
        }

        public addTo( container: Container<IDOMElement> ): T
        {
            container.addChild( this );
            return this.returnFunction();
        }

        public removeFromParent(): T
        {
            /* if (this.getElement().parentElement != null) {
                 var parent: Container<IDOMElement> = new Container<IDOMElement>(this.getElement().parentElement);
                 parent.removeChild(this);
             }*/
            return this.returnFunction();
        }

        public getParent(): IDOMElement
        {
            var parentElement: IDOMElement = null;
            if ( this.hasParent() )
            {
                parentElement = new DOMElement( <HTMLElement> this.getElement().parentNode );
            }
            return parentElement;
        }

        public hasParent(): boolean
        {
            var hasParent: boolean = false;
            hasParent = this.getElement().parentNode != null ? true : false;
            return hasParent;
        }


        /**
        * Equivalent to innerText or textContent
        **/
        public getText(): string
        {
            var text: string = null;
            if ( this.getElement().textContent )
            {
                text = this.getElement().textContent;
            } else
            {
                text = this.getElement().innerText;
            }
            return text;
        }

        /**
        * Equivalent to innerText or textContent
        **/
        public setText( text: string ): T
        {
            if ( this.getElement().textContent )
            {
                this.getElement().textContent = text;
            } else
            {
                this.getElement().innerText = text;
            }

            return this.returnFunction();
        }

        public getAttribute( attr: string ): string
        {
            return this.getElement().attributes.getNamedItem( attr ).value;
        }

        public setAttribute( name: string, value: string ): T
        {
            this.getElement().setAttribute( name, value );
            return this.returnFunction();
        }


        public hasAttribute( name: string ): boolean
        {
            return this.getElement().hasAttribute( name );
        }

        public hasAttributes(): boolean
        {
            return this.getElement().hasAttributes();
        }

        public removeAttribute( attributeName: string ): T
        {
            this.getElement().removeAttribute( attributeName );
            return this.returnFunction();
        }


        public setId( id: string ): T
        {
            this.getElement().id = id;
            return this.returnFunction();

        }

        public getId(): string
        {
            return this.getElement().id;
        }


        public setStyleClassName( className: string ): T
        {
            this.getElement().className = className;
            return this.returnFunction();
        }

        public getStyleClassName(): string
        {
            return this.getElement().className;
        }


        public getTagName(): string
        {
            return this.getElement().tagName;
        }


        public getNodeName(): string
        {
            return this.getElement().nodeName;
        }

        public getNodeType(): number
        {
            return this.getElement().nodeType;
        }

        public getNodeValue(): string
        {
            return this.getElement().nodeValue;
        }

        public setNodeValue( nodeValue: string ): T
        {
            this.getElement().nodeValue = nodeValue;
            return this.returnFunction();
        }

        public getCss( property: string ): string
        {
            return this.getElement().style.getPropertyValue( property );
        }


        public setCss( properties: Object ): T
        {
            for ( var prop in properties )
            {
                if ( this.getElement().style[prop] )
                {
                    this.getElement().style[prop] = properties[prop];
                }
            }

            return this.returnFunction();
        }

        public getInnerHTML(): string
        {
            return this.getElement().innerHTML;
        }

        public setInnerHTML( innerHTML: string ): T
        {
            this.getElement().innerHTML = innerHTML;
            return this.returnFunction();
        }


        public isSupported( feature: string, version: string ): boolean
        {
            return this.getElement().isSupported( feature, version );
        }

        /**
        * The isSameNode() method is supported in all major browsers, except Firefox.
        **/
        public isSameNode( DOMElement: IDOMElement ): boolean
        {
            return this.getElement().isSameNode( DOMElement.getElement() );
        }

        public isEqualNode( DOMElement: IDOMElement ): boolean
        {
            return this.getElement().isEqualNode( DOMElement.getElement() );
        }

        public compareDocumentPosition( DOMElement: IDOMElement ): number
        {
            return this.getElement().compareDocumentPosition( DOMElement.getElement() );
        }


        /**
        * 	Returns the previous element at the same node tree level
        **/
        public getPreviousSibling(): IDOMElement
        {
            return new DOMElement( <HTMLElement>this.getElement().previousSibling );
        }

        /**
        * Returns the next node at the same node tree level
        **/
        public getNextSibling(): IDOMElement
        {
            return new DOMElement( <HTMLElement>this.getElement().nextSibling );
        }

        public dispatchEvent( event: BaseEvent ): T
        {
            // Dispatch event is has parent only
            if ( this.hasParent() )
            {
                event.setTarget( this );
                event.setCurrentTarget( this );
                EventEngine.dispatchEvent( event );

            } else
            {
                console.warn( "A non added element is trying to dispatch an event" );
            }
            return this.returnFunction();
        }


        public clone(): T
        {
            var clone: IDOMElement = new DOMElement( <HTMLElement>this.getElement().cloneNode() );
            return <T>clone;
        }

    }




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