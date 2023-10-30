import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader, isMobile } from "../modules/helpers/helpers";
import Swiper, {Pagination, EffectFade} from 'swiper';
import gsap from "gsap/all";
import splitToLinesAndFadeUp from "../modules/effects/splitToLinesAndFadeUp";
Swiper.use([Pagination, EffectFade]);
innerPageFrontEffect();

window.addEventListener('load',function(evt){
    const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
    window.addEventListener('screen1EffectFinish',function(evt){
        // tl.play();
        
    }); 
});

var menu = ['1A', '1B', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г', '1Г']
var mySwiper = new Swiper('.swiper-three-d', {
    effect: 'fade',
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '">' + (menu[index]) + '</div>';
        },
    },
})
