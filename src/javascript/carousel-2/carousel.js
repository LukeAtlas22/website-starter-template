const INFINITE_SCROLL = true;
const params = {type: byChangingOrder};

document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('scrollsnapchanging', (e) => {
        e.target.querySelectorAll('.carousel__slide').forEach(slide => slide.classList.remove('scroll-snap-changed'));
    })
    carousel.addEventListener('scrollsnapchange', (e) => {
        try {e.snapTargetBlock.classList.add('scroll-snap-changed')} catch{}
        try {e.snapTargetInline.classList.add('scroll-snap-changed')} catch{}
        if (INFINITE_SCROLL){
            infiniteScroll(params);
        }
    })
})

async function infiniteScroll(params){
    const infiniteScroll = await import ('infinite-scroll.js');
    infiniteScroll[params.type]();
}

