
// document.addEventListener('DOMContentLoaded', (e) => {
//     import ("./javascript/carousel/Init-Carousel-Module").then((module) => {
//         module.initCarousels();
//     });
// });



// function debugCarousels(){
//     const roots = document.querySelectorAll('.carousel');
//     roots.forEach(root => {
//         Carousel.debug(root);
//     })
// }

//initCarousels();
// debugCarousels();

document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('scrollsnapchanging', (e) => {
        e.target.querySelectorAll('.carousel__slide').forEach(slide => slide.classList.remove('scroll-snap-changed'));
    })
    carousel.addEventListener('scrollsnapchange', (e) => {
        try {e.snapTargetBlock.classList.add('scroll-snap-changed')} catch{}
        try {e.snapTargetInline.classList.add('scroll-snap-changed')} catch{}
    })
})