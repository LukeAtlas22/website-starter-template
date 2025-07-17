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