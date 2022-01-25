import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";
import curtainsShaders from "../modules/curtains-shaders";
import splitToLinesAndFadeUp from "../modules/effects/splitToLinesAndFadeUp";
import clipPathEntry from "../modules/effects/clipPathEntry";

innerPageFrontEffect();
window.addEventListener('load',function(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
    curtainsShaders(scroller);
    splitToLinesAndFadeUp('.about-text, .about-text-l, .about-text-xl, .about-pretty-block__text p','.scroller-container');
    clipPathEntry('.about-pretty-block__decor path','.scroller-container', {
      stagger: 0.15
    })
});