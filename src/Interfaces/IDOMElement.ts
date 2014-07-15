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


interface IDOMElement extends IEventDispatcher
{
    element: HTMLElement;


    getVisualHierarchy(): ICollection<IDOMElement>;
    getUUID(): string;
    addTo(container: Container<IDOMElement>): IDOMElement;
    removeFromParent(): IDOMElement;
    setElement(element: HTMLElement): IDOMElement;
    getElement(): HTMLElement;
    setCss(properties: Object): IDOMElement;
    //setCss(property: string, value: string): IDOMElement;
    getParent(): IDOMElement;
    hasParent(): boolean;
    getText(): string
    setText(text: string): IDOMElement;
    getAttribute(attr: string): string;
    setAttribute(name: string, value: string): IDOMElement;
    hasAttribute(name: string): boolean;
    hasAttributes(): boolean;
    removeAttribute(attributeName: string): IDOMElement;
    setId(id: string): IDOMElement;
    getId(): string;
    setStyleClassName(className: string): IDOMElement;
    getStyleClassName(): string;
    getTagName(): string;
    getNodeName(): string;
    getNodeType(): number;
    getNodeValue(): string;
    setNodeValue(nodeValue: string): IDOMElement;
    getCss(property: string): string;
    getInnerHTML(): string;
    setInnerHTML(innerHTML: string): IDOMElement;
    isSupported(feature: string, version: string): boolean;
    isSameNode(DOMElement: IDOMElement): boolean;
    isEqualNode(DOMElement: IDOMElement): boolean;
    compareDocumentPosition(DOMElement: IDOMElement);
    getPreviousSibling(): IDOMElement;
    getNextSibling(): IDOMElement;
    dispatchEvent(event: BaseEvent): IDOMElement;
    
}