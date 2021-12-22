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
import ztext from '../modules/ztext/ztext';



// import paralax from '../../../../../forest-home-site/src/assets/scripts/modules/animation/effect/paralax';



window.addEventListener('load',homeInit);
function homeInit() {
  global.gsap = gsap;
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
  const isTablet = () => window.matchMedia('(max-width: 1024px)').matches;
  const isMobile = () => window.matchMedia('(max-width: 575px)').matches;
  
//   var ztxt = new ztext(".screen2 p", {
//     depth: "5px",
//     layers: 4,
//     // fade: true,
//     // direction: "forwards",
//     event: "pointer",
//     eventRotation: "10deg"
//  });
 

  // smoothScrollBar();
  const scroller = locoScroll('.scroller-container');
  scroller.update();
  window.scroller = scroller;
  const $scroller = document.querySelector('.scroller-container');
  screen1($scroller);

  galleryEffect($scroller);
  screen3Effects($scroller);
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
  paralax('.screen8 .img-left img:first-child, .screen8 .img-right img:first-child', $scroller);
  screen9Handler($scroller);
  screen10($scroller);
  paralax('.img-center img', $scroller);

  /**Screen2 effects */
  gsap.timeline({
    scrollTrigger: {
      trigger: '.screen2',
      scroller: $scroller,
      scrub: true,

      start: `${innerHeight / -4} center`,
      end: `${innerHeight / 4} center`
    }
  })
    .from('.screen2>*', { y: 100, autoAlpha: 0})
  paralax('.screen2 .img-with-logo:first-child img', $scroller, 80);
  paralax('.screen2 .img-with-logo:last-child img', $scroller, 40);
  /**Screen2 effects END */
  
  // const frames = document.querySelectorAll('[data-vr-frame]');
  // frames.forEach(frame => {
  //   frame.addEventListener('click', function changeSrc() {
  //     const iframe = frame.querySelector('iframe');
  //     const frameOtherEls = frame.querySelectorAll(':not(iframe)');
  //     gsap.to(frameOtherEls, { y: 50, autoAlpha: 0, clearProps: 'transform' })
  //     iframe.src = iframe.dataset.src;
  //     frame.removeEventListener('click', changeSrc);
  //   })
  // })
  // splitToLinesAndFadeUp('.title,.title-h2, .subtitle');
  fadeInUp('.screen11__group', $scroller);
  splitToLinesAndFadeUp('.main-screen .title', $scroller);
  splitToLinesAndFadeUp('.title-h2', $scroller);
  buttonHover('.button');



  function handleHeader(scroller) {
    const header = document.querySelector('.header');
    header.state = 'open';
    let prevScrollPosition = 0;
    scroller.on('scroll', ({ scroll }) => {
      const tempState = prevScrollPosition > scroll.y ? 'open' : 'close';
      prevScrollPosition = scroll.y;
      if (tempState === header.state) return;
      header.state = tempState;
      changeState[tempState]();

    });


    const changeState = {
      open: () => {
        gsap.to(header, { yPercent : 0 });
      },
      close: () => {
        gsap.to(header, { yPercent : -100 });
      }
    }
  }
  handleHeader(scroller);




  function sectionTransitions() {
    const sections = document.querySelectorAll('.scroller-container>*');
    const sectionEntersEffect = {
      0: (section) => {

      },
      1: (section) => {

      },
      2: (section) => {

      },
      3: (section) => {

      },
      4: (section) => {
        return gsap.timeline()
          .fromTo(
            section.querySelector('.screen5-hor-block__item'), 
            { y: 50 },
            { y: 0 }
          );
        },
      5: (section) => {
        return gsap.timeline()
          .fromTo(
            section.querySelector('.genplan__text'), 
            { y: 50 },
            { y: 0 }
          );

      },
      6: (section) => {

      },
      7: (section) => {

      },
      8: (section) => {

      },
      9: (section) => {

      },
    }
    sections.forEach((singleSection, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: singleSection,
          scroller: $scroller,
          scrub: true,
          start: '-100px top',
          end: '50px top'
        }
      })
        // .add(sectionEntersEffect[index](singleSection))
      // .fromTo(
      //   singleSection.previousElementSibling, 
      //   { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      //   { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }, 
      // );


    })
  }
  sectionTransitions();


  function hoverParalax(params = {}) {
    const { degree = 3, selector } = params;
    const img = typeof selector === 'string' ? document.querySelector(selector) : selector;
    const parent = img.parentElement;
    gsap.set(parent, { perspective: '500px' });
    
    img.addEventListener('mousemove', ({ clientX, clientY }) => {
      const { left, right, top, bottom } = img.getBoundingClientRect();
      var mapper = gsap.utils.mapRange(left, right, degree * -1, degree);
      var mapperH = gsap.utils.mapRange(top, bottom, degree, degree * -1);
      gsap.set(img, { rotateY: mapper(clientX), rotateX: mapperH(clientY) });
    })
    img.addEventListener('mouseleave',function(evt){
      gsap.to(img, { rotateY: 0, rotateX: 0 });
    });
  }



  gsap.utils.toArray('.screen5-hor-block__item img').forEach((el) => {
    hoverParalax({
      degree: 4,
      selector: el,
    });
  })
}

