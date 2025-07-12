export function querySelect(configObj){
    const from = getFrom(configObj);
    const select = getSelect(configObj);
    if (isEmpty(from)) throw new Error(EMPTY_FROM_ELEMENT());
    if (isEmpty(from.querySelector(select))) throw new Error(EMPTY_QUERY_RESULT(from, select));

    return from.querySelector(select);
}

export function querySelectAll(configObj){

}

function getFrom(configObj){
    if(configObj.from === 'document')
        return document;
    else
        return getElementFrom(configObj.from);
}

function getSelect(configObj){
    if (configObj.select[0] !== '.')
        return '.' + configObj.select;
    return configObj.select;
}

function getElementFrom(selector){
    if (typeof selector === 'string')
        return getElementFromString(selector);
    else if (selector instanceof HTMLElement)
        return selector;
    else throw new Error(WRONG_CONFIG_FROM());
}

function getElementFromString(string){
    if (!doesHaveTheFirstDot(string))
        string = '.' + string; // Adding fist dot at the beginning of the string
    return document.querySelector(string);
}


function doesHaveTheFirstDot(string){
    if (string[0] === '.')
        return true;
    else 
    return false;
}

function EMPTY_FROM_ELEMENT(){
    return 'The element specified in querySelect{"from:"} is empty!';
}

function EMPTY_QUERY_RESULT(from, select){
    return 'The resulting element from ', from, 'with target', select, 'is empty!'
}

function WRONG_CONFIG_FROM(){
    return 'The configObj.from is not a string, not even an HTMLElement, please, make sure you are passing a string-selector, or a dom element.'
}

function isEmpty(element){
    if (element === null)
        return true;
}