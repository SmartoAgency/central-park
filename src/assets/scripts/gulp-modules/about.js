import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";
import curtainsShaders from "../modules/curtains-shaders";
import splitToLinesAndFadeUp from "../modules/effects/splitToLinesAndFadeUp";
import clipPathEntry from "../modules/effects/clipPathEntry";
import fadeInUp from "../modules/effects/fadeInUp";

innerPageFrontEffect();
window.addEventListener('load',function(evt){
    const scroller = locoScroll('.scroller-container');
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
    !isMobile && curtainsShaders(scroller);
    splitToLinesAndFadeUp('.about-text, .about-text-l, .about-text-xl, .about-pretty-block__text p','.scroller-container');
    isMobile && fadeInUp('.about-character-part', document.body);
    isMobile && splitToLinesAndFadeUp('.about-mob-block__text, .about-mob-subtitle, .about-mob-block-gradient__title,.about-mob-block-gradient__text,.about-mob-title', document.body);
    clipPathEntry('.about-pretty-block__decor path','.scroller-container', {
      stagger: 0.15
    })
});