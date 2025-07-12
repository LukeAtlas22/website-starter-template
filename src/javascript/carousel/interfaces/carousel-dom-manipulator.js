import { ElementsCollection } from "../../elements-collection";
export class CarouselDomManipulator{
    constructor(carousel){
        this.carousel = carousel;
    }

    static on(carousel){
        return new CarouselDomManipulator(carousel);
    }

    moveFirstSlideToLast(){
        const parent = this.carousel.slides[0].parentElement;
        parent.appendChild(this.carousel.slides[0]);
    }

    moveLastSlideToFirst(){
        const parent = this.carousel.slides[0].parentElement;
        parent.prepend(this.carousel.slides[this.carousel.slides.length - 1]);
    }

    // Resetting

    moveFirstSlideToFirst(){
        const parent = this.carousel.slides[0].parentElement;
        parent.prepend(this.carousel.slides[0]);
    }

    moveLastSlideToLast(){
        const parent = this.carousel.slides[0].parentElement;
        parent.appendChild(this.carousel.slides[this.carousel.slides.length - 1]);
    }

    resetOriginalSlidePositions(){
        this.moveFirstSlideToFirst();
        this.moveLastSlideToLast();
    }
}