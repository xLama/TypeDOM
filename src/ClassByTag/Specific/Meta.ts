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

	class Meta extends Container<Meta> implements  ICloneable<Meta>  
	{
		public static META: string = 'meta';
		
		constructor();
		constructor(id: string)
		constructor(attributes: Object)
		constructor(element: HTMLMetaElement)
		constructor(idOrAttributesOrElement?: any) {
			super(idOrAttributesOrElement, Meta.META);
		}
		
		public setElement(element: HTMLMetaElement): Meta {
			super.setElement(element);
			return this;
		}
		
		public getElement(): HTMLMetaElement {
			return <HTMLMetaElement>super.getElement();
		}
	}
