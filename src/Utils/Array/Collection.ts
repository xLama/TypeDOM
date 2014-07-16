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


class Collection<T> extends EventDispatcher<ICollection<T>> implements ICollection<T>, ICloneable<Collection<T>> {

    private source: Array<T>;

    constructor();
    constructor(list: ICollection<T>);
    constructor(list: Array<T>);
    constructor(list?: any) {
        super();

        if (list != null) {
            if (list instanceof Array) {
                this.source = list;
            } else {
				try{
					var l:ICollection<T> = <ICollection<T>> list;
					this.source = list.toArray();
				}catch(e){
					throw e;
				} 
            }
        }else {
            this.source = new Array<T>();
        }
    }


    public toArray(): Array<T> {
        return this.source;
    }

    public addItem(item: T): number {
        this.itemCheck(item);

        var index: number = this.source.push(item);
        this.dispatchCollectionChange();
        return index - 1;
    }


    public addItemAt(item: T, index: number): number {
        this.itemCheck(item);
        this.indexCheck(index);

        this.source[index] = item;
        this.dispatchCollectionChange();
        return index;
    }

    public addAll(list: Array<T>): void
    public addAll(list: ICollection<T>): void
    public addAll(list?: any): void {
         
        if (list === void 0 || list === null) throw new TypeError("List is null");

        var elementsToAdd: Array<T> = new Array<T>();

            if (list instanceof Array) {
                // It´s an array
                elementsToAdd = elementsToAdd.concat(list);
            } else {
                try {
                    var l: ICollection<T> = <ICollection<T>> list;
                    elementsToAdd = elementsToAdd.concat(l.toArray());
                } catch (e) {
                    throw new TypeError();
                }
            }

            for (var i = 0; i < elementsToAdd.length; i++) {
                this.source.push(elementsToAdd[i]);
            }

            if (elementsToAdd.length > 0) {
                this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE))
            }
    }

    public getItemAt(index: number): T {
        return this.source[index];
    }


    public getItemIndex(item: T): number {
        this.itemCheck(item);

		var index: number = -1;
		
		if (this.source){
			if (this.source.lastIndexOf){
				index = this.source.lastIndexOf(item);
			}
			else{
				var i: number = 0;
				while (index == -1 && i < this.source.length) {
					if (this.source[i] === item) {
						index = i;
					}
					i++;
				}
			}
		}
        return index;
    }

    public removeAll(): Collection<T> {
        this.source = new Array<T>();
        this.dispatchCollectionChange();
        return this;
    }

    public removeItemAt(index: number): void {
        this.indexCheck(index);
        this.source.splice(index, 1);
        this.dispatchCollectionChange();
    }

    public contains(item: T): boolean {
        this.itemCheck(item);
        if (this.getItemIndex(item) != -1) return true;
        else return false;
       
    }

    public getLength(): number {
        return this.source.length;
    }
	
	public isEmpty():boolean{
		return this.getLength() == 0;
    }


    public hasItems(): boolean {
        return !this.isEmpty();
    }

    public reverse(): void {
        this.source = this.toArray().reverse();
    }


    public clone(): Collection<T> {
        return new Collection<T>(this.toArray().slice(0));
    }

    public indexCheck(index:number): void {
        if (index == null || index < 0 || index > this.getLength()) throw new RangeError("Index is negative, greater than length or null");
    }

    public itemCheck(item: any): void {
        if (item == null) throw new TypeError("Item is null");
    }
	
	private dispatchCollectionChange():void{
		this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE))
	}

}