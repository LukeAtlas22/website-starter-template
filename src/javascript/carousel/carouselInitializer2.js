import { CarouselInfiniteScroller } from "./Carousel-InfiniteScroller";
import { CarouselClassDispatcher } from "./CarouselClassDispatcher";

export class CarouselInitializer{
    
    static init(carousel, config){

        const classDispatchConfig = {
            ON_ACTIVE_SLIDE: true,
            ON_ACTIVE_MARKER: true,
        };

        this.initButtons(carousel);
        this.initMarkers(carousel, config);
        this.initInfiniteScroll(carousel, config);
        this.initClassDispatcher(carousel, classDispatchConfig);
        // this.initAutoplay();

    }


    static initMarkers(carousel, config){
        // if (AUTO_CREATE_MARKERS) Carousel.Markers.createMarkers();
        carousel.markers.create();
        // if (NOT INFINITE SCROLL) !!Important
        carousel.markers.applyHandlers();
        // // if (INFINITE SCROLL)
        // carousel.markers.applyHandlersWithSmallDelay();
    }

    static initButtons(carousel){
        carousel.buttonNext.applyOnClickHandler();
        carousel.buttonPrev.applyOnClickHandler();
    }

    static initInfiniteScroll(carousel, config){
        if (config.INFINITE_SCROLL)
            CarouselInfiniteScroller.InfinitizeScroll(carousel)
    }

    static initClassDispatcher(carousel, classDispatchConfig){
        CarouselClassDispatcher.on(carousel).dinamicallyAddClass({
            CLASS_NAME: 'active',
            ON_ACTIVE_SLIDE: true,
            ON_ACTIVE_MARKER: true,
        });
    }

    // static initAutoPlay(){
    //     Carousel.AutoPlayer.init();
    // }
}

