import { Element } from "../elements";

export class CarouselDebugger{
    static startDebug(carousel){
        setIndexElementOnEverySlide(carousel);
        setIndexElementOnEveryMarker(carousel);
        setDebugClassOnEveryCarousel(carousel);
    }
}

function setIndexElementOnEverySlide(carousel){
    carousel.slides.forEach((slide, i) => {
        Element.create({
            element: 'span',
            inside: slide,
            textContent: i + 1,
            withCSS: {
                fontFamily: 'arial',
                backgroundColor: 'white',
                color: 'black',
                fontSize: '5rem',
                outline: '1px solid black',
                position: 'absolute',
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                width: '7.5rem',
                height: '7.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100vw',
                opacity: '50%',
            }
        })
        Element.create({
            element: 'span',
            inside: slide,
            textContent: 'Debug',
            withCSS: {
                fontFamily: 'arial',
                backgroundColor: 'white',
                color: 'black',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                outline: '1px solid black',
                position: 'absolute',
                bottom: '0.5rem',
                left: '0.5rem',
                padding: '0rem 0.5rem',
                opacity: '50%',
            }
        })
    })
}

function setIndexElementOnEveryMarker(carousel){
    carousel.markers.collection.forEach((marker, i) => {
        Element.create({
            element: 'span',
            textContent: i + 1,
            inside: marker,
            withCSS: {
                position: 'absolute',
                backgroundColor: 'white',
                color: 'black',
                inset: 0,
                borderRadius: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: '50%',
                fontSize: '1.5rem',
                fontFamily: 'Arial',
                fontWeight: 'bold',
            }
        })
    })
}

function setDebugClassOnEveryCarousel(carousel){
    carousel.root.classList.add('debugging');
}