// #region - Tutta questa roba dev'essere scritta / aggiustata meglio

// Give scroll snap changed class
document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('scrollsnapchanging', (e) => {
        e.target.querySelectorAll('.carousel__slide').forEach(slide => slide.classList.remove('scroll-snap-changed'));
    })
    carousel.addEventListener('scrollsnapchange', (e) => {
        try {e.snapTargetBlock.classList.add('scroll-snap-changed')} catch{}
        try {e.snapTargetInline.classList.add('scroll-snap-changed')} catch{}
        infinitizeCarouselScroll(e);
    })
})

// #region Infinite scroll

function infinitizeCarouselScroll(e){
    const carousel = e.target;
    const snappedTarget = e.snapTargetBlock ? e.snapTargetBlock : e.snapTargetInline;

    if (isLastSibling(snappedTarget) || isFirstSibling(snappedTarget)){
        CSS_ChangeOrder({
            targetEl: carousel.lastElementChild,
            order: -1,
        });
        CSS_ChangeOrder({
            targetEl: carousel.lastElementChild.previousElementSibling, // Element before last
            order: -2,
        });
    }
    if (IsMiddleSibling(snappedTarget)){
        CSS_ChangeOrder({
            targetEl: carousel.lastElementChild.previousElementSibling, // Element before last
            order: '',
        });
        setTimeout(() => {
            CSS_ChangeOrder({
                targetEl: carousel.lastElementChild, // Last element
                order: '',
            });
        }, 0)
    }
}

function isLastSibling(slide){
    if(slide.nextElementSibling == null)
        return true;
    else return false;
}
function isFirstSibling(slide){
    if(slide.previousElementSibling == null)
        return true;
    else return false;
}


function IsMiddleSibling(slide){
    if(slide.nextElementSibling != null && slide.previousElementSibling != null)
        return true;
    else return false;
}

function CSS_ChangeOrder({targetEl, order}){
    try{
        targetEl.style.order = order;
    }
    catch{
        throw new Error('Target Element is null');
    }
}

// #endregion

// #region Auto scroll
function autoScroll({ scroller, scrollType = 'smooth', speed = 2000 }) {
    let isPaused;
    const scrollerElements = scroller.querySelectorAll(':scope > *');
    let index = 0;

    function scrollNext() {
        if (isPaused) return;
        scrollerElements[index].scrollIntoView({ behavior: scrollType, block: "start", inline: "nearest" });
        index = (index + 1) % scrollerElements.length;
        setTimeout(scrollNext, speed);
    }

    scroller.addEventListener('mouseover', (e) => {
            isPaused = true;
    }, {once: true});

    scrollNext();
}


// autoScroll({
//     scroller: document.querySelector('.carousel'),
//     scrollType: 'smooth',
//     speed: 5000,
// });
// #endregion

// #endregion