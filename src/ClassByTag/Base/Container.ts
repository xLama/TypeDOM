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

   class Container<T extends IDOMElement, V extends HTMLElement> extends DOMElement<T,V>  {

        constructor();
        constructor( element: HTMLElement );
        constructor( id: any, tag: string );
        constructor( attributes: Object );
        constructor( idOrAttributesOrElement?: any, tag?: string )
        {
            super( idOrAttributesOrElement, tag );
        }



        public addChild( child: IDOMElement ): IDOMElement
        {
            this.childCheck( child );
            this.getElement().appendChild( child.getElement() );
            this.dispatchEvent( new ContainerEvent( ContainerEvent.CHILD_ADDED, new Collection( [child] ), true, false, true ) );
            return this;
        } 

	    public addChildren( children: ICollection<IDOMElement> ): IDOMElement
	    public addChildren( children: Array<IDOMElement> ): IDOMElement
	    public addChildren( children: any ): IDOMElement
        {

            this.childCheck( children );
            var childrenToAdd: ArrayCollection<IDOMElement> = new ArrayCollection<IDOMElement>( children );

            for ( var i: number = 0; i < childrenToAdd.getLength(); ++i )
            {
                this.addChild( childrenToAdd.getItemAt( i ) );
            }

            if ( i > 0 )
            {
                this.dispatchEvent( new ContainerEvent( ContainerEvent.CHILDREN_ADDED, new Collection<IDOMElement>( childrenToAdd ), true, false, true ) );
            }

            return this;
        }

        public removeChild( child: IDOMElement ): void
        {
            this.childCheck( child );
            this.getElement().removeChild( child.getElement() );
            this.dispatchEvent( new ContainerEvent( ContainerEvent.CHILD_REMOVED, new Collection<IDOMElement>( [child] ), true, false, true ) );
        }

        public removeAllChildren(): void
        {
            for ( var i: number = this.getElement().children.length - 1; i >= 0; --i )
            {
                this.getElement().removeChild( this.getElement().children[i] );
            }
            if ( i != this.getElement().children.length - 1 )
            {
                this.dispatchEvent( new ContainerEvent( ContainerEvent.CHILDREN_REMOVED, new Collection<IDOMElement>(), true, false, true ) );
            }
        }

        public contains( child: IDOMElement ): boolean
        {
            this.childCheck( child );
            return this.getElement().contains( child.getElement() );
        }

        public removeChildAt( index: number ): void
        {
            this.getElement().removeChild( this.getElement().childNodes[index] );
        }

        public getChildren(): ArrayCollection<IDOMElement>
        {
            var children: ArrayCollection<IDOMElement> = new ArrayCollection<IDOMElement>();
            for ( var i: number = 0; i < this.getElement().children.length; i++ )
            {
                children.addItem( new DOMElement( <HTMLElement> this.getElement().children[i] ) );
            }
            return children;
        }

        public getChildrenNumber(): number
        {
            return this.getElement().children.length;
        }

        public hasChild(): boolean
        {
            return this.getElement().hasChildNodes();
        }


        public insertBefore( newElement: IDOMElement, oldElement: IDOMElement ): void
        {
            this.childCheck( newElement );
            this.childCheck( oldElement );
            this.getElement().insertBefore( newElement.getElement(), oldElement.getElement() );
        }

        public replaceChild( newElement:IDOMElement, oldElement: IDOMElement ): void
        {
            this.childCheck( newElement );
            this.childCheck( oldElement );
            this.getElement().insertBefore( newElement.getElement(), oldElement.getElement() );
        }


        public getLastChild(): IDOMElement
        {
            var element: IDOMElement = new DOMElement();
            element.setElement( <HTMLElement>this.getElement().lastChild );
            return element;
        }

        public getFirstChild(): IDOMElement
        {
            var element: IDOMElement = new DOMElement();
            element.setElement( <HTMLElement>this.getElement().firstChild );
            return element;
        }


        public sort( comparator: Comparator<IDOMElement> ): void
        {
            this.addChildren( this.getChildren().sort( comparator ) );
        }

        public filter( func: ( value: IDOMElement ) => boolean ): void
        {
            var childrenFiltered: ArrayCollection<IDOMElement> = this.getChildren().filter( func );
            this.removeAllChildren();
            this.addChildren( childrenFiltered );
        }


        private childCheck( child: any ): void
        {
            if ( child == null ) throw TypeError( "Null child" );
        }

        private indexCheck( index: number ): void
        {
            if ( index < 0 ) throw TypeError( "Index out of bound" );
        }


    }
