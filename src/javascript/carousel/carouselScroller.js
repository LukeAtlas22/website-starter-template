import { Element } from "../elements";
import { ElementsCollection } from "../elements-collection";

export class CarouselScroller{
    static scrollTo(slide){
        scrollInto(slide);
    }

    static scrollNext(carousel){
        const currentSlide = ElementsCollection.from(carousel.slides).getElementInView({scrollContainer: carousel.frame, axis: 'inline'});
        const nextSlide = Element(currentSlide).getNextSibling();
        if (nextSlide)
            scrollInto(nextSlide);
    }

    static scrollPrev(carousel){
        const currentSlide = ElementsCollection.from(carousel.slides).getElementInView({scrollContainer: carousel.frame, axis: 'inline'});
        const prevSlide = Element(currentSlide).getPrevSibling();
        if (prevSlide)
            scrollInto(prevSlide);
    }
}

function scrollInto(element){
    element.scrollIntoView({
        inline: 'start',
        block: 'center',
        behavior: 'smooth'
    })
}

