class H<T extends IDOMElement> extends Container<T> {

    public setElement(element: HTMLHeadingElement): T {
        super.setElement( element );
        return eval( "this" );
    }

    public getElement(): HTMLHeadingElement {
        return <HTMLHeadingElement>super.getElement();
    }


    public clone(): T {
        return < T > super.clone();
    }
}