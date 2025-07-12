import { ElementsCollection } from "../../elements-collection";

/**
 * Interface to retrieve a slide from a marker
 */
export class CarouselMarkerSlideRetriever{
    /**
     * 
     * @param {CarouselMarker} CarouselMarker 
     * @returns 
     */
    static getSlideFromMarker(marker, carouselOBJ){
        const index = this.getMarkerIndex(marker, carouselOBJ);
        const slidesCollection = carouselOBJ.slides;
        const linkedSlide = ElementsCollection.from(slidesCollection).getElementByIndex(index);
        return linkedSlide;
    }

    static getMarkerFromSlide(slide, carouselOBJ){
        const index = this.getSlideIndex(slide, carouselOBJ)
        const markersCollection = carouselOBJ.markersCollection;
        const linkedMarker = ElementsCollection.from(markersCollection).getElementByIndex(index)
        return linkedMarker;
    }

    static getMarkerIndex(marker, carouselOBJ){
        const markersCollection = carouselOBJ.markersCollection;
        return ElementsCollection.from(markersCollection).getIndexOf(marker);
    }

    static getSlideIndex(slide, carouselOBJ){
        const slidesCollection = carouselOBJ.slides;
        return ElementsCollection.from(slidesCollection).getIndexOf(slide);
    }
}