import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";
import googleMap from "../modules/map/map";

innerPageFrontEffect();
googleMap();
window.addEventListener('load',function some(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
    disableScroll(scroller);
    window.removeEventListener('load', some);
});
function disableScroll(locoScroll) {
    const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
    containersScroll.forEach((block) => {
      block.addEventListener('mouseenter', () => {
        locoScroll.stop();
      });
      block.addEventListener('mouseleave', () => {
        locoScroll.start();
      });
    });
  }
  /** ******************************* */

document.querySelectorAll('[data-nav-item-group]').forEach(el => {
    if (el.querySelector('.map-nav-subitems') === null) return;
    const openElement  = el.querySelector('.map-nav-item');
    openElement.addEventListener('click', () => {
        el.classList.toggle('active');
    })
})


document.querySelector('[data-mob-wrapper-mobile-opener]').addEventListener('click',function(evt){
  const navContainer = document.querySelector('.map-wrapper__nav');
  navContainer.classList.toggle('closed');
  this.querySelector('span').textContent = navContainer.classList.contains('closed') ? this.dataset.closedText : this.dataset.openedText;
});