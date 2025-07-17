export function byChangingOrder(e){
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

export function byDuplicateElements(e){
    // To write
    console.log('U need to write this');
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