import { Carousel } from "./carousel";
export function initCarousels(){
    const roots = document.querySelectorAll('.carousel');
    roots.forEach(root => {
        Carousel.init(root, {
            AUTO_CREATE_MARKERS: true,
            AUTO_PLAY: false,
            INFINITE_SCROLL: true,
            PROGRESS_BAR: true,
            CLASS_DISPATCHER: {
                CLASS_NAME: 'active',
                ON_ACTIVE_SLIDE: true,
                ON_ACTIVE_MARKER: true,
            }
        })
    })
}

export function initCarousel(root){
    Carousel.init(root, {
            AUTO_CREATE_MARKERS: true,
            AUTO_PLAY: false,
            INFINITE_SCROLL: true,
            PROGRESS_BAR: true,
            CLASS_DISPATCHER: {
                CLASS_NAME: 'active',
                ON_ACTIVE_SLIDE: true,
                ON_ACTIVE_MARKER: true,
            }
        })
}