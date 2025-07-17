const INFINITE_SCROLL = true;
const params = {type: 'byChangingOrder'};

document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('scrollsnapchanging', (e) => {
        e.target.querySelectorAll('.carousel__slide').forEach(slide => slide.classList.remove('scroll-snap-changed'));
    })
    carousel.addEventListener('scrollsnapchange', (e) => {
        try {e.snapTargetBlock.classList.add('scroll-snap-changed')} catch{}
        try {e.snapTargetInline.classList.add('scroll-snap-changed')} catch{}
        if (INFINITE_SCROLL){
            infiniteScroll(e);
        }
    })
})

async function infiniteScroll(e){
    const infiniteScroll = await import ('../src/javascript/carousel-2/infinite-scroll');
    infiniteScroll[params.type](e);
}

// Need to give dinamically the slide amount
const container = document.querySelector('.carousel__container');
const slidesAmount = container.querySelector('.carousel').querySelectorAll('.carousel__slide').length;
console.log(container, slidesAmount);
container.style.setProperty('--carousel-slide-amount', 4);