import { ElementsCollection } from "./elements-collection";

class DomElement{
    constructor(element){
        this.element = element;
    }

    /**
     * Creates an element by a configuration object that allows you to set
     * @param {Object} configObj - The configuration object
     * @param {string} configObj.element - The element type
     * @param {Object} [configObj.withAttributes] - An object containing any attribute you want to  set on the element
     * @param {Object} [configObj.withDataset] - An object containing any dataset you want to set  on the element
     * @param {Object} [configObj.withWrappers] - An object containing any element that will be  the wrapper of the element
     * @param {HTMLElement} configObj.inside - The HTML Element in which the element will be appended
     * @returns {HTMLElement} The Element created
     */
    static create(configObj){
        //Todo if (! isThisConfigObjValid) throw new Error_InvalidConfigObj;

        const element = document.createElement(configObj.element);
        let wrapper;
        
        if (configObj.withWrappers){
            wrapper = document.createElement(configObj.withWrappers.wrappers);
            wrapper.appendChild(element)}
        if (configObj.className)
            Element(element).setClassName(configObj.className);
        if (configObj.withAttributes) 
            Element(element).setAttributes(configObj.withAttributes);
        if (configObj.withDataset)
            Element(element).setDataset(configObj.withDataset);
        if (configObj.inside){
            if (wrapper) this.appendElementInside(wrapper, configObj.inside);
            else         this.appendElementInside(element, configObj.inside)}
        if (configObj.textContent)
            element.textContent = configObj.textContent;
        if (configObj.withCSS)
            Element(element).setCSS(configObj.withCSS);

        return element;
    }

    setDataset(datasetObj){
        const datasets = Object.entries(datasetObj);
        datasets.forEach(([datasetName, datasetValue]) => {
            this.element.dataset[datasetName] = datasetValue;
        })

        return this.element;
    }

    setAttributes(attributesObj){
        const attributes = Object.entries(attributesObj);
        attributes.forEach(([attributeName, attributeValue]) => {
            this.element.setAttribute(attributeName, attributeValue)
        })

        return this.element;
    }

    setClassName(className){
        this.element.className = className;
    }

    setCSS(CSSDeclarationsObject){
        for (const [property, value] of Object.entries(CSSDeclarationsObject)){
            this.element.style[property] = value;
        }
    }

    clearInnerHTML(){
        this.element.innerHTML = "";
        return this.element;
    }

    addClass(classString){
        if (typeof classString === 'string')
            this.element.classList.add(classString);
        else if (classString instanceof Array)
            classString.forEach(name => this.element.classList.add(name));
        else
            throw new Error('There is something wrong with the class you r trying to add')
        return this.element;
    }

    removeClass(classString){
        this.element.classList.remove(classString);
        return this.element;
    }

    static appendElementInside(movingElement, receveingElement){
        receveingElement.appendChild(movingElement);
        return receveingElement;
    } // Todo: ????

    // Getters

    getNextSibling(){
        //? if (isEmpty) throw new Error_EmptyElement;
        const childElementsCollection = getAllFirstChildOf(this.element.parentElement);
        const index = getIndexOf({of: this.element, inside: this.element.parentElement})
        return Array.from(childElementsCollection)[index + 1 ];
    }

    getPrevSibling(){
        //? if (isEmpty) throw new Error_EmptyElement;
        const childElementsCollection = getAllFirstChildOf(this.element.parentElement);
        const index = getIndexOf({of: this.element, inside: this.element.parentElement})
        return Array.from(childElementsCollection)[index - 1 ];
    }

    /**
     * 
     * @returns All siblings, including target
     */
    getAllSiblings(){
        const childElementsCollection = getAllFirstChildOf(this.element.parentElement);
        return Array.from(childElementsCollection);
    }

    getAllFirstChilds(){
        return getAllFirstChildOf(this.element.parentElement);
    }

   // Questions

   isLastOfAllSiblings(){
    const siblings = Element(this.element).getAllSiblings();
    const lastElement = ElementsCollection.from(siblings).getLastElement();
    const currentElement = this.element;
    if (currentElement === lastElement)
        return true;
    else
        return false
   }

   isFirstOfAllSiblings(){
    const siblings = Element(this.element).getAllSiblings();
    const lastElement = ElementsCollection.from(siblings).getFirstElement();
    const currentElement = this.element;
    if (currentElement === lastElement)
        return true;
    else
        return false
   }

    // Event Listeners

    /**
     * Registers an event listener on the current element using the specified configuration.
     *
     * @param {Object} configObj - Configuration object for the event listener.
     * @param {string} configObj.type - The type of the event to listen for (e.g., 'click', 'mouseover').
     * @param {Function} configObj.callback - The callback function to be executed when the event is triggered.
     *
     * @example
     * applyListener({
     *   type: 'click',
     *   callback: function(event) {
     *     console.log('Element clicked!', event);
     *   }
     * });
     */
    applyListener(configObj){
       this.element.addEventListener(configObj.type, configObj.callback);
    }
}

function getIndexOf({of, inside}){
    const collection = getAllFirstChildOf(inside);
    return Array.from(collection).indexOf(of);
}

function getAllFirstChildOf(element){
    return element.querySelectorAll(':scope > *');
}

// Exports

export function Element(element){
    return new DomElement(element);
}

Element.create = function(configObj){
    return DomElement.create(configObj);
}

// Element(myElement).setDataset(dataset);
// Element(myElement).getNextSibling();

// Element.create({
//     ...
// })