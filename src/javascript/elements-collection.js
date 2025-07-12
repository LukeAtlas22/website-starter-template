import { getMostVisibleElement } from "./get-most-visibles-in-view";

/**
 * Use me as ElementsCollection.from(yourElementsCollection).method(arguments);
 */
export class ElementsCollection{
    constructor(elements) {
        this.elementsArray = Array.from(elements);
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @returns The index of an element inside an element collection
     */
    getIndexOf(element){
        return this.elementsArray.indexOf(element);
    }

    /**
     * 
     * @param {HTMLElement} elementsCollection 
     * @param {Number} index 
     * @returns The element inside an element collection, from an index
     */
    getElementByIndex(index){
        return this.elementsArray[index];
    }

    getElementInView({scrollContainer, axis}){ //Todo: Error handling
        //Todo: if(isEmpty(view)) throw new Error_EmptyElement;
        //Todo: if(isNotAxis(axis)) throw new Error_WrongAxis;
        return getMostVisibleElement({
            between: this.elementsArray, 
            inside: scrollContainer, 
            axis: axis,
        });
    }

    getLastElement(){
        return this.elementsArray[this.elementsArray.length - 1];
    }

    getFirstElement(){
        return this.elementsArray[0];
    }

    addClass(classString){
        this.elementsArray.forEach(element => {
            element.classList.add(classString);
        })
        return this.elementsArray;
    }

    removeClass(classString){
        this.elementsArray.forEach(element => {
            element.classList.remove(classString);
        })
        return this.elementsArray;
    }

    static from(nodeList) {
        return new ElementsCollection(nodeList);
    }
}

