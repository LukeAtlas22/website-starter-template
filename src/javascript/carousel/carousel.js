import { CarouselMarkerSlideRetriever } from "./interfaces/carousel-marker-slide-retriever";
import { CarouselInitializer } from "./carouselInitializer2";
import { CarouselDebugger } from "./CarouselDebugger";
import { CarouselScroller } from "./carouselScroller";
import { Element } from "../elements";
import { querySelect } from "../query-select-elements-safely";
import { ApplyListener } from "../event-listeners";
import { CarouselDomManipulator } from "./interfaces/carousel-dom-manipulator";


export class Carousel{
    constructor(root){
        this.root = root;
        this.frame = root.querySelector('.carousel__frame');
        this.slides = root.querySelectorAll('.carousel__slide');
        this.buttons = root.querySelectorAll('.carousel__button');
        this.navigation = root.querySelector('.carousel__navigation');
        this.navigationList = root.querySelector('.carousel__markers-list');
        this.markersCollection = root.querySelectorAll('.carousel__marker');
        this.markers = new Markers(this);
        this.buttonNext = new ButtonNext(this);
        this.buttonPrev = new ButtonPrev(this);
    }

    static init(root, configObj){
        CarouselInitializer.init(new Carousel(root), configObj);
    }

    static debug(root){
        CarouselDebugger.startDebug(new Carousel(root));
    }
}


class Markers{
    constructor(carouselObj){
        this.carousel = carouselObj;
        this.root = carouselObj.root;
        this.collection = this.getCollection();
        this.slides = carouselObj.slides;
        this.navigationList = carouselObj.navigationList;
    }

    create(){
        Element(this.navigationList).clearInnerHTML();
        this.slides.forEach(slide => Element.create({
            element: 'a',
            className: 'navigation__link | carousel__link', //Todo: Not hard coded (?)
            withAttributes: {
                href: '#',
            },
            withWrappers: {
                wrappers: 'li'
            },
            inside: this.navigationList,
        }));
        this.collection = this.getCollection(); // Reset collection
        this.carousel.markersCollection = this.getCollection() // Reset collection
    }

    applyHandlers(){
        this.collection.forEach(marker => {
            CarouselMarker.applyOnClickHandler({
                marker: marker,
                carouselOBJ: this.carousel,
            });
    })}
    
    getCollection(){
        return this.root.querySelectorAll('.carousel__link');
    }
}

export class CarouselMarker{

    static getLinkedSlide(marker, carouselOBJ){
        return CarouselMarkerSlideRetriever.getSlideFromMarker(marker, carouselOBJ);   
    }

    static applyOnClickHandler({marker, carouselOBJ}){
        const linkedSlide = this.getLinkedSlide(marker, carouselOBJ);
        ApplyListener({
            on: marker,
            event: 'click',
            callback: (e) => {
                CarouselDomManipulator.on(carouselOBJ).resetOriginalSlidePositions(); // ! //
                e.preventDefault();
                CarouselScroller.scrollTo(linkedSlide);
            }
        });
    }
}


class Button{
    constructor(carouselObj){
        this.carousel = carouselObj;
    }
}

class ButtonPrev extends Button{
    constructor(carouselObj){
        super(carouselObj)
        this.carousel = carouselObj;
        this.element = querySelect({from: this.carousel.root, select: 'carousel__button--prev'});
    }
    goPrev(){
        CarouselScroller.scrollPrev(this.carousel);
    }
    applyOnClickHandler(){
        Element(this.element).applyListener({type: 'pointerdown', callback: () => {this.goPrev()}});
    }
}

class ButtonNext extends Button{
    constructor(carouselObj){
        super(carouselObj);
        this.carousel = carouselObj;
        this.element = querySelect({from: this.carousel.root, select: 'carousel__button--next'});
    }
    goNext(){
        CarouselScroller.scrollNext(this.carousel);
    }
    applyOnClickHandler(){
        Element(this.element).applyListener({type: 'pointerdown', callback: () => {this.goNext()}});
    }
}

class ButtonAutoPlay extends Button{
    startAutoPlay(){

    }
}

class ButtonChangeScrollType extends Button{
   setScrollType(){

   } 
}
