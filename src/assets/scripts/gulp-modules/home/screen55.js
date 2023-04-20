import Swiper from 'swiper';
// import { getGenplanSequences, changeImageSrcByArrayIndex } from "../../modules/genplan-sequence/genplan-sequence";
import { gsap, ScrollTrigger } from 'gsap/all';
import { debounce } from '../../modules/helpers/helpers';
import { getGenplanSequences } from '../../modules/genplan-sequence/getGenplanSequence';
import { changeImageSrcByArrayIndex } from '../../modules/genplan-sequence/changeImgSrcByArrayIndex';



export default async function screen55(scroller) {
    global.gsap = gsap;
    gsap.core.globals("ScrollTrigger", ScrollTrigger);

    if (window.matchMedia('(max-width: 1024px)').matches) {
        screen55Mobile();
        return;
    }

    const $itemForImageRender = document.querySelector('[data-screen5-image]');
    const $legendItems = document.querySelectorAll('.genplan-legend-item');
    $legendItems.forEach((el, index) => {
        el.sequenceIndex = index;
    });

    // $legendItems[0].classList.add('active');
    let SEQUENCES = await getGenplanSequences({});
    let isAnimating = false;
    const clickSequences = {

        /*teritorry */ 0: '1-70', 
        /*confort */ 1: '71-110', 
        /*business */ 2: '113-127', 
        /*recreating */ 3: '142-160'
    };
    
    // /*teritorry */ 0: '1-70', 
    // /*recreating */ 1: '142-160', 
    // /*confort */ 2: '71-110', 
    // /*business */ 3: '113-127'
    let previousSequence = false;
    let sequenceWaiting = false;

    function changeActiveSequence(index) {

        console.log('changeActiveSequence');
        const $item = $legendItems[index];
        $legendItems.forEach(el => {
            if ($item === el) return;
            el.classList.remove('active');
        });
        $item.classList.add('active');
        const currentSequenceToRender = clickSequences[index];

        if (isAnimating) { 
            // sequenceWaiting = currentSequenceToRender;
            return;
        }

        if (previousSequence === currentSequenceToRender) return;
        isAnimating = true;
        if (previousSequence) {
            changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +previousSequence.split('-')[1], +previousSequence.split('-')[0], () => {
                changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +currentSequenceToRender.split('-')[0], +currentSequenceToRender.split('-')[1], () => {
                    if (sequenceWaiting) {
                        changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +sequenceWaiting.split('-')[0], +sequenceWaiting.split('-')[1], () => {
                            sequenceWaiting = false;
                            isAnimating = false;
                        })
                    } else {
                        isAnimating = false;
                    }
                });
                
            })
        } else {
            changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +currentSequenceToRender.split('-')[0], +currentSequenceToRender.split('-')[1], () => {
                isAnimating = false;
            })
        }
        previousSequence = currentSequenceToRender;
    }

    $itemForImageRender.src = SEQUENCES.data[0];

    const legendItemsHeight = Array.from(document.querySelectorAll('.genplan-legend-item, .genplan-legend-item-line')).reduce((acc,el) => {acc+=parseInt(getComputedStyle(el).height); return acc}, 0);

    gsap.set(".screen5-5.infrastructure", { height: legendItemsHeight  });

    gsap.timeline({
        scrollTrigger: {
            scroller: scroller ? scroller : null,
            trigger: ".screen5-5.infrastructure",
            scrub: true,
            end: "100% bottom",
            pin: ".screen5-5__container",
            invalidateOnRefresh: true,
            onUpdate: ({ start, end, ...e}) => {
                if (e.progress === 1) return;
                const distance = end - start;
                const percenteOfScreenHeightDueToSceneLength = window.innerHeight * 100 / distance / 100;
                document.querySelector('.genplan-legend').style.cssText = `--percent: ${ (100 - (e.progress + (percenteOfScreenHeightDueToSceneLength / 2)) * 100)}%`;
                changeActiveSequence(findClosestToCenter($legendItems));
            }
        }  
    })
        .to('.screen5-5__left', {
            y: (legendItemsHeight * -1) + (window.innerHeight)
        })

}


function getHeight(el) {
    return el.getBoundingClientRect().height;
}
function getWidth(el) {
    return el.getBoundingClientRect().width;
}

function findClosestToCenter(arr) {
    let closestIndex = 0;
    let closestDistance = Math.abs(window.innerHeight/2 - arr[0].getBoundingClientRect().top - arr[0].getBoundingClientRect().height/2);
  
    for(let i = 1; i < arr.length; i++) {
        const distance = Math.abs(window.innerHeight/2 - arr[i].getBoundingClientRect().top - arr[i].getBoundingClientRect().height/2);
        if(distance < closestDistance) {
            closestIndex = i;
            closestDistance = distance;
        }
    }

    return closestIndex;
}


async function screen55Mobile() {

    const $itemForImageRender = document.querySelector('[data-mobile-infrastructure-canvas]');
    const $itemForImageRenderContainer = $itemForImageRender.parentElement;

    const swiper = new Swiper('.screen5-5-mobile-swiper', {
        slidesPerView: 1.5,
        slideToClickedSlide: true,

    });
    let SEQUENCES = await getGenplanSequences({});
    const clickSequences = {

        /*teritorry */ 0: '1-70', 
        /*confort */ 1: '71-110', 
        /*business */ 2: '113-127', 
        /*recreating */ 3: '142-160'
    };
    
    // /*teritorry */ 0: '1-70', 
    // /*recreating */ 1: '142-160', 
    // /*confort */ 2: '71-110', 
    // /*business */ 3: '113-127'

    let previousSequence = false;

    $itemForImageRenderContainer.scrollTo(getWidth($itemForImageRender) * 0.88 - window.innerWidth,0);

    changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +clickSequences[0].split('-')[0], +clickSequences[0].split('-')[1], () => {
        // isAnimating = false;
        swiper.enable();
    })

    swiper.on('activeIndexChange', ({ activeIndex }) => {
        // console.log(e);
        let currentSequenceToRender = clickSequences[activeIndex];
        if (!currentSequenceToRender) return;
        swiper.disable();
        if (previousSequence) {
            changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +previousSequence.split('-')[1], +previousSequence.split('-')[0], () => {
                changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +currentSequenceToRender.split('-')[0], +currentSequenceToRender.split('-')[1], () => {
                    swiper.enable();
                });                
            })
        } else {
            changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +currentSequenceToRender.split('-')[0], +currentSequenceToRender.split('-')[1], () => {
                // isAnimating = false;
                swiper.enable();
            })
        }
        previousSequence = currentSequenceToRender;
    });



}