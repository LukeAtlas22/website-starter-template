import { isElement } from "./elements-validation";
import { isValidEvent } from "./events-validation";

export function ApplyListener(configObj){
    validateEvent(configObj.event);

    if (configObj.on === document || configObj.on === 'document')
        ApplyListenerOnDocument(configObj);
    else if (configObj.on instanceof Array || configObj.on instanceof NodeList)
        ApplyListenerOnArrayOfElements(configObj);
    else
        ApplyListenerOnElement(configObj);        
}

function ApplyListenerOnDocument(configObj){
    document.addEventListener(configObj.event, configObj.callback);
}

function ApplyListenerOnElement(configObj){
    validateOnElement(configObj.on);
    configObj.on.addEventListener(configObj.event, configObj.callback);
}
function ApplyListenerOnArrayOfElements(configObj){
    validateArrayOfOnElements(configObj.on);
    configObj.on.forEach(element => element.addEventListener(configObj.event, configObj.callback))
}

export function RemoveListener(configObj){
    if (configObj.on instanceof Array || configObj.on instanceof NodeList)
        RemoveListenerOnArrayOfElements(configObj);
    else
        RemoveListenerOnElement(configObj); 
}

function RemoveListenerOnElement(configObj){
    configObj.on.removeEventListener(configObj.event, configObj.callback);
}
function RemoveListenerOnArrayOfElements(configObj){
    configObj.on.forEach(element => element.removeEventListener(configObj.event, configObj.callback))
}


const NOT_VALID_ON = 'The element on which you want to set the event listener, is not a HTML Element';
const NOT_VALID_EVENT = 'The event you want to set, is not a valid event';

function validateEvent(event){
    if (!isValidEvent(event)) throw new Error(NOT_VALID_EVENT);
}

function validateOnElement(element){
    if (!isElement(element)) throw new Error (NOT_VALID_ON);
}

function validateArrayOfOnElements(array){
    array.forEach(element => {
        if (!isElement(element)) throw new Error (NOT_VALID_ON + 'In array');
    })
}
