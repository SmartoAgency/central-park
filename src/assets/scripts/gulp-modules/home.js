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
import screen9Handler from './home/screen9';
import screen1 from './home/screen1';
import screen8 from './home/screen8';
// import paralax from '../../../../../forest-home-site/src/assets/scripts/modules/animation/effect/paralax';



window.addEventListener('load',homeInit);
function homeInit() {
  global.gsap = gsap;
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
  const isTablet = () => window.matchMedia('(max-width: 1024px)').matches;
  const isMobile = () => window.matchMedia('(max-width: 575px)').matches;
  


  // smoothScrollBar();
  const scroller = locoScroll('.scroller-container');
  window.scroller = scroller;
  const $scroller = document.querySelector('.scroller-container');
  screen1($scroller);

  galleryEffect($scroller);
  screen3Effects();
  screen4($scroller);
  screen5($scroller);
  screen6($scroller);
  ScrollTrigger.create({
    once: true,
    scroller: $scroller,
    trigger: '.screen8',
    onEnter: () => scroller.update(),
  })
  screen8($scroller);
  paralax('.screen8 .img-left img, .screen8 .img-right img', $scroller);
  screen9Handler($scroller);
  screen10($scroller);
  paralax('.img-center img', $scroller);
  paralax('.screen2 img', $scroller);
  
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
  // splitToLinesAndFadeUp('.title,.title-h2, .subtitle');
  fadeInUp('.screen11__group', $scroller);
  splitToLinesAndFadeUp('.main-screen .title', $scroller);
  splitToLinesAndFadeUp('.title-h2', $scroller);
  buttonHover('.button');


  !isMobile() && gsap.timeline({
    scrollTrigger: {
      scroller: $scroller,
      trigger: '.screen2',
      scrub: true,
      pin: '.screen3-5-bg',
      endTrigger: '.screen4',
      onEnter: () => console.log('enter'),
      onLeave: () => console.log('leave'),
    }
  })
  .to('.screen3-5-bg', { backgroundColor: '#23242B',duration: 0.5 })
  .to('.screen3-5-bg', { backgroundColor: 'rgba(255,255,255,1)',duration: 0.5 })
  .to('.screen3-5-bg', { backgroundColor: 'rgba(255,255,255,1)' })
  .to('.screen3-5-bg', { backgroundColor: 'rgba(255,255,255,1)' })
}

