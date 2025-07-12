/**
 * Dispatches classes on active markers and active slides of the carousel - 
 * Allows you to choose the name of the active class
 * Allows you to choose if you want to add a prev-active and next-active to the previous and next marker
 * Allows you to choose if you want to add a prev-active and next-active to the previous and next slide
 */
import { ElementsCollection } from "../elements-collection";
import { Element } from "../elements";
import { ApplyListener } from "../event-listeners";
import { CarouselMarkerSlideRetriever } from "./interfaces/carousel-marker-slide-retriever";
export class CarouselClassDispatcher{
    constructor (carousel){
        this.carousel = carousel;
    }

    dinamicallyAddClass(cfg){
        if (!cfg.CLASS_NAME) {throw new Error('You need to choose a class to give at your active items')};
        this.dinamically_RemoveClassOnNotActiveMarkersAndSlides(cfg.CLASS_NAME);
        if (cfg.ON_ACTIVE_SLIDE)
            this.dinamically_AddClassOnActive__Slide(cfg.CLASS_NAME);
        if (cfg.ON_ACTIVE_MARKER)
            this.dinamically_AddClassOnActive__Marker(cfg.CLASS_NAME);
    }

    dinamically_AddClassOnActive__Slide(CLASS_NAME){
        ApplyListener({
            on: this.carousel.frame,
            event: 'scrollend',
            callback: () => {
                this.addClassOnActiveSlide(CLASS_NAME);
            }
        });
        ApplyListener({
            on: document,
            event: 'DOMContentLoaded',
            callback: () => {
                this.addClassOnActiveSlide(CLASS_NAME);
            }
        })
    }

    dinamically_AddClassOnActive__Marker(CLASS_NAME){
        ApplyListener({
            on: this.carousel.frame,
            event: 'scrollsnapchanging',
            callback: (e) => {
                this.addClassOnActiveMarker(e, CLASS_NAME);
            }
        })
    }

    dinamically_RemoveClassOnNotActiveMarkersAndSlides(CLASS_NAME){
        ApplyListener({
            on: this.carousel.frame,
            event: 'scrollsnapchanging',
            callback: (e) => {
                this.removeClassOnEveryMarker(CLASS_NAME);
                this.removeClassOnEverySlide(CLASS_NAME);
            }
        })
    }

    removeClassOnEverySlide(CLASS_NAME){
        ElementsCollection.from(this.carousel.slides).removeClass(CLASS_NAME); //Todo: Not hard coded class name
    }

    removeClassOnEveryMarker(CLASS_NAME){
        ElementsCollection.from(this.carousel.markersCollection).removeClass(CLASS_NAME);//Todo: Not hard coded class name
    }


    addClassOnActiveSlide(CLASS_NAME){
        const activeSlide = ElementsCollection.from(this.carousel.slides).getElementInView({scrollContainer: this.carousel.frame, axis: 'inline'});
        Element(activeSlide).addClass(CLASS_NAME); // Todo: Not hard coded class name
    }

    addClassOnActiveMarker(e, CLASS_NAME){
        const activeMarker = CarouselMarkerSlideRetriever.getMarkerFromSlide(e.snapTargetInline, this.carousel);
        Element(activeMarker).addClass(CLASS_NAME); // Todo: Not hard coded class name
    }

    static on(carousel){
        return new CarouselClassDispatcher(carousel);
    }
}