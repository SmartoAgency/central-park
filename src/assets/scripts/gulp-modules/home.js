import {gsap, ScrollTrigger} from 'gsap/all';
// import ScrollTrigger from 'gsap/ScrollTrigger';

import paralax from '../modules/effects/paralax';
import fadeInUp from '../modules/effects/fadeInUp'; 
import splitToLinesAndFadeUp from '../modules/effects/splitToLinesAndFadeUp'; 
import buttonHover from '../modules/effects/buttonHover';
import galleryEffect from '../modules/home/gallery';
import screen3Effects from './home/screen3';
import screen4 from './home/screen4';
import screen5 from './home/screen5';
import screen6 from './home/screen6';
import screen10 from './home/screen10';
import smoothScrollBar from '../modules/smooth-scrolls/smooth-scrollbar';
import locoScroll from '../modules/smooth-scrolls/locoScroll';
// import paralax from '../../../../../forest-home-site/src/assets/scripts/modules/animation/effect/paralax';



window.addEventListener('load',homeInit);
function homeInit() {
  global.gsap = gsap;
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
  


  // smoothScrollBar();
  // locoScroll('.scroller-container');
  /* SMOOTH SCROLL */
  // const scroller = new LocomotiveScroll({
  //   el: document.querySelector('.scroller-container'),
  //   smooth: true,
  //   smoothMobile: false,
  //   // // inertia: 1.1,
  //   // multiplier: 0.5,
  //   // lerp: 0.05,
  // });
  // window.scroller = scroller;
  const isTablet = () => window.matchMedia('(max-width: 1024px)').matches;
  // gsap.defaults({
  //   ease: 'power3.out',
  //   duration: 0.5,
  // })
  // gsap.registerPlugin(ScrollTrigger);

  // const locoScroll = new LocomotiveScroll({
    
  // })

  galleryEffect();
  screen3Effects();
  screen4();
  screen5();
  screen6();
  paralax('.img-with-logo img, .screen7__left-block img , .screen7__right-block img');
  paralax('.img-center img');
  
  const frames = document.querySelectorAll('[data-vr-frame]');
  frames.forEach(frame => {
    frame.addEventListener('click', function changeSrc() {
      const iframe = frame.querySelector('iframe');
      const frameOtherEls = frame.querySelectorAll(':not(iframe)');
      gsap.to(frameOtherEls, { y: 50, autoAlpha: 0, clearProps: 'transform' })
      iframe.src = iframe.dataset.src;
      frame.removeEventListener('click', changeSrc);
    })
  })
  screen10();
  splitToLinesAndFadeUp('.title,.title-h2, .subtitle');
  fadeInUp('.screen11__group');
  buttonHover('.button');
}

