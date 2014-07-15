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
class ArrayCollection<T> extends Collection<T>{ 

    public getItemIndexByAttributes(keyValue: Object): number {

        this.itemCheck(keyValue);

        var index: number = -1;
        var found: boolean = true;

        if (this.toArray()) {
            var i: number = 0;

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
    }


    public getItemByAttributes(keyValue: Object): T {
        this.itemCheck(keyValue);
        return this.getItemAt(this.getItemIndexByAttributes(keyValue));
    }

    public concat(list: ICollection<T>): ArrayCollection<T> {
        if (list === null) throw new TypeError("List can´t be null");
        return new ArrayCollection<T>(this.toArray().concat(list.toArray()));
    }


    // pop
    public removeLast():T {
        var lastItem: T = this.toArray().pop();
        this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE));
        return lastItem;
    }

    // shift
    public removeFirst(): T {
        var firstItem: T = this.toArray().shift();
        this.dispatchEvent(new CollectionEvent(CollectionEvent.COLLECTION_CHANGE));
        return firstItem;
    }
 

    // slice
    public subArray = (start: number, end?: number): ArrayCollection<T> => {
        this.indexCheck(start);
        this.indexCheck(end);
        return new ArrayCollection(this.toArray().slice(start, end));
    }


    public unshift(item: T): ArrayCollection<T> {
        this.itemCheck(item);
        this.toArray().unshift(item);
        return this;
    }

    public getRandomItem():T{
        return this.toArray()[Math.floor((Math.random() * 10) + 1)];
    }

    public getLastItem(): T {
        return this.toArray()[this.getLength() - 1];
    }

    public each(func: (value: T) => void): void {
        for (var i:number = 0, len = this.getLength(); i < len; ++i) {
            func(this.getItemAt(i));
        }
    }

    // Si alguno cumple a función
    public some(func: (value:T)=>boolean ): boolean {
        for (var i: number = 0; i < this.getLength(); i++) {
            if (func(this.getItemAt(i))) {
                return true;
            } 
        }
        return false;
    }

    // Si todos cumplen la función
    public every(func: (value: T) => boolean): boolean {
        for (var i: number = 0; i < this.getLength(); i++) {
            if ( !func(this.getItemAt(i)) ) {
                return false;
            }
        }
        return true;
    }
	
    // Ejecuta un método del objeto si existe
    public execMethod(method: string, parameters?: Array<any>) {
	
        if (method == null) throw new TypeError("Null method");

		for (var i: number = 0; i < this.getLength(); i++) {
            if (typeof this.getItemAt(i)[method] == "function") {
                if (parameters != null) {
                    this.getItemAt(i)[method].apply(this.getItemAt(i),parameters);
                } else {
                    this.getItemAt(i)[method]();
                }
			}
		} 
	}

   

    public filter(func: (value: T) => boolean): ArrayCollection<T> {

        var filter: ArrayCollection<T> = new ArrayCollection<T>();

        for (var i: number = 0; i < this.getLength(); i++) {
            if (func(this.getItemAt(i))) {
                filter.addItem(this.getItemAt(i));
            }
        }
        return filter;
    }


    public sort(comparator: Comparator<T>): ArrayCollection<T> {
		if (comparator == null) throw new TypeError("Null comparator");
        this.toArray().sort(comparator.compare);
        return this;
    }

    public clone(): ArrayCollection<T> {
        return new ArrayCollection<T>(super.clone());
    }

  
}
