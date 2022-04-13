import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader, isMobile } from "../modules/helpers/helpers";
import gsap from "gsap/all";
import splitToLinesAndFadeUp from "../modules/effects/splitToLinesAndFadeUp";

innerPageFrontEffect();
window.addEventListener('load',function(evt){
    const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
    splitToLinesAndFadeUp('p, .three-d-title', '.scroller-container')
    !isMobile() && document.querySelectorAll('.block-img-text').forEach(block => {
        gsap.timeline({
            scrollTrigger: {
                scroller: '.scroller-container',
                trigger: block,
                start: '10% bottom',
                end: '90% top',
                onLeave: () => gsap.to(block.children, { y: -35, autoAlpha: 0 }),
                onLeaveBack: () => gsap.to(block.children, { y: 35, autoAlpha: 0 }),
                onEnter: () => gsap.to(block.children, { y: 0, autoAlpha: 1 }),
                onEnterBack: () => gsap.to(block.children, { y: 0, autoAlpha: 1 })
            },
        })
    })

    // gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '.scroller-container',
    //         scroller: '.scroller-container',
    //         scrub: true,
    //         start: `${innerHeight} bottom`,
    //         end: `100% bottom`,
    //     }
    // })
    // .to('.header-logo', { rotateY: 30, rotateZ: 5, rotateX: 5 })
    // .to('.header-logo', { rotateY: 0, rotateZ: 0, rotateX: 0 })
    // .to('.header-logo', { rotateY: -30, rotateZ: -5, rotateX: -5 })
    
});

document.querySelectorAll('.block-img-text').forEach((item) => {
    const button = item.querySelector('[data-circle-with-hover]');
    const frame = item.querySelector('iframe');
    const playButtonPath = item.querySelector('[data-circle-with-hover] path');
    const morphs = {
        default: playButtonPath.getAttribute('d'),
        custom: 'M110 110L46 46M46 110L110 46L46 110Z',
    }
    button.addEventListener('click', () => {
        const isHaveClass = item.classList.toggle('is-playing');
        console.log('dd');
        if (isHaveClass) {
            frame.src = frame.dataset.src;
        } else {
            frame.removeAttribute('src');
        }
        gsap.set(playButtonPath, {
            duration: 0.5,
            ease: 'linear',
            attr: {
                d: isHaveClass ? morphs.custom : morphs.default,
            } 
        })
    })
})
function morph(path) {
    
}