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


document.querySelectorAll('[data-nav-item-group]').forEach(el => {
    const openElement  = el.querySelector('.map-nav-item');
    openElement.addEventListener('click', () => {
        el.classList.toggle('active');
    })
})