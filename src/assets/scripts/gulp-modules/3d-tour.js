import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";

innerPageFrontEffect();
window.addEventListener('load',function(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
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