export function getMostVisibleElement(configObj){
    const elements = configObj.between;
    const viewRect = configObj.inside.getBoundingClientRect(); //Todo: change view
    const threshold = {start: viewRect.left, end: viewRect.right, axis: configObj.axis};
    const sortedVisibles = getMostVisiblesElements(elements, threshold);
    return sortedVisibles[0]; // Returning only the most visible
}

function getMostVisiblesElements(elementsCollection, threshold){
    const elementsObjects = [];

    elementsCollection.forEach(element => {
        const rect = element.getBoundingClientRect();
        elementsObjects.push({
            view: element,
            rect: rect,
            visibility: calculateVisibilityFromThreshold(rect, threshold),
        })
    });

    const elementsObjectsSorted = sortByMostVisible(elementsObjects);
    return getArrayOfOneProperty({property: 'view', fromObject: elementsObjectsSorted});
    
}

function getArrayOfOneProperty({property, fromObject}){
    const array = Object.values(fromObject).map(object => object[property]);
    return array;
} // Todo: da spostare

/**
 * Ordina un array di oggetti rappresentanti elementi DOM; In base alla loro visibilità su una frame.
 *
 * @param {Array<Object>} elementsObjects - Array di oggetti, ognuno dei quali deve avere le seguenti proprietà:
 *   @property {Element} view - Il riferimento all'elemento DOM originale.
 *   @property {DOMRect} rect - L'oggetto DOMRect risultante da getBoundingClientRect(), che descrive la posizione e le dimensioni dell'elemento.
 *   @property {number} visibility - Valore numerico che rappresenta la percentuale di visibilità dell'elemento in una frame. (O: most visible)
 *
 * @returns {Array<Object>} Un nuovo array degli stessi oggetti ordinato dal più visibile al meno visibile
 *
 */
function sortByMostVisible(elementsObjects){
    return elementsObjects.sort((a, b) => (a.visibility - b.visibility));
}

function calculateVisibilityFromThreshold(elementRect, thresholdObj){
    if(thresholdObj.axis === 'inline')
        return calculateInlineVisibility(elementRect, thresholdObj);
    if(thresholdObj.axis === 'block')
        return calculateBlockVisibility(elementRect, thresholdObj);
}

function calculateInlineVisibility(elementRect, thresholdObj){
    // More close to 0, more visible
    const start = (elementRect.left) - thresholdObj.start;
    const end = (elementRect.right) - thresholdObj.end;
    return (Math.abs(start) + Math.abs(end));
}

function calculateBlockVisibility(elementRect,thresholdObj){
    // More close to 0, more visible
    const start = (elementRect.top) - thresholdObj.start;
    const end = (elementRect.bottom) - thresholdObj.end;
    return (Math.abs(start) + Math.abs(end));
}