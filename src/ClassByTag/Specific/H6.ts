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

	class H6 extends Container<H6> implements ICloneable<H6>  
	{
		public static H6: string = 'h6';
		
		constructor();
		constructor(id: string)
		constructor(attributes: Object)
		constructor(element: HTMLHeadingElement)
		constructor(idOrAttributesOrElement?: any) {
			super(idOrAttributesOrElement, H6.H6);
		}
		
		public setElement(element: HTMLHeadingElement): H6 {
			super.setElement(element);
			return this;
		}
		
		public getElement(): HTMLHeadingElement {
			return <HTMLHeadingElement>super.getElement();
		}
	
	}