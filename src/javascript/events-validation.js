export function isValidEvent(eventName) {
    if (typeof eventName !== 'string') return false;

    if (eventName === 'DOMContentLoaded') return true;

    // Crea un elemento generico (div è universale)
    const el = document.createElement('div');
    // Controlla se la proprietà on[eventName] esiste
    return ('on' + eventName.toLowerCase()) in el;
}
