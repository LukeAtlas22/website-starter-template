
// Responsabilità - 
// Aspettative
// Requirements

// Problema

// Problema: Questa classe deve risolvere il seguente problema: Permettere all'utente, di continuare a scrollare il carosello, anche quando arriva all'ultima o prima slide - 
// Infinite scrolling 

// Quando arriva all'ultima slide - Deve spostare momentaneamente la prima slide alla fine
// Quando arriva alla prima slide - Deve spostare momentaneamente l'ultima slide all'inizio
// Per il resto delle slide, deve essere tutto normalizzato
// Questo significa che: Non può esistere un carosello con solo 2 slide?
// Di certo non può esistere un carosello con solo 1 slide

import { ApplyListener, RemoveListener } from "../event-listeners";
import { CarouselDomManipulator } from "./interfaces/carousel-dom-manipulator";

export class CarouselInfiniteScroller{
    static InfinitizeScroll(carousel){
        ApplyListener({
            on: carousel.frame,
            event: 'scrollsnapchange',
            callback: (e) => {manipulateDomForInfiniteScrolling(carousel, e)}, 
        });

        // RemoveListener({
        //     on: carousel.markersCollection,
        //     event: 'click',
        //     callback: (e) => {
                
        //     }
        // })

        // ApplyListener({
        //     on: carousel.markersCollection,
        //     event: 'click',
        //     callback: () => {resetSlidePositionOnMarkersClick(carousel)},
        // });

        //! Perchè non riesco a fare in modo che questo evento preceda sempre quello settato nella classe markers? - Questo problema mi costringe a non segregare bene le interfacce
    }
}

// function resetSlidePositionOnMarkersClick(carousel){
//     console.log('Resetting slide positions');
//     CarouselDomManipulator.on(carousel).resetOriginalSlidePositions();
// }

function manipulateDomForInfiniteScrolling(carousel, e){
    if(isLastSlideSnapped()){
        CarouselDomManipulator.on(carousel).moveLastSlideToLast();
        CarouselDomManipulator.on(carousel).moveFirstSlideToLast();
    }
    if(isFirstSlideSnapped()){
        CarouselDomManipulator.on(carousel).moveFirstSlideToFirst();
        CarouselDomManipulator.on(carousel).moveLastSlideToFirst();
    }

    if (!isLastSlideSnapped() && !isFirstSlideSnapped()){ // Not the last, not the first (snapped)
        CarouselDomManipulator.on(carousel).resetOriginalSlidePositions();
    }

    // #region Function Utilities
    function isLastSlideSnapped(){
        return e.snapTargetInline === carousel.slides[carousel.slides.length - 1]
    }

    function isFirstSlideSnapped(){
        return e.snapTargetInline === carousel.slides[0];
    }
    // #endregion
}