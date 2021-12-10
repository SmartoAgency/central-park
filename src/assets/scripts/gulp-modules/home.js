import {gsap, ScrollTrigger} from 'gsap/all';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import Swiper, { Navigation } from 'swiper';



console.log(Swiper);


const swiper = new Swiper('.zoom-slider-wrapper', {
  // Optional parameters
  modules: [ Navigation],
  slidesPerView: 4.5,
  loop: true,
  spaceBetween: 40,
  navigation: {
    nextEl: document.querySelector('[data-screen3-next]'),
    prevEl: document.querySelector('[data-screen3-prev]'),
  },
});

swiper.on('touchStart', () => {
  gsap.to('.zoom-slider-wrapper', { scale: 0.95, duration: 0.5, ease: 'power4.out' });

})
swiper.on('touchEnd', () => {
  gsap.to('.zoom-slider-wrapper', { scale: 1, duration: 1.5, ease: 'power4.out' });
})
global.gsap = gsap;
gsap.core.globals("ScrollTrigger", ScrollTrigger);
const isMobile = () => window.matchMedia('(max-width: 575px)').matches;
const isTablet = () => window.matchMedia('(max-width: 1024px)').matches;
gsap.defaults({
  // ease: 'power3.out',
  duration: 2.5,
})
gsap.registerPlugin(ScrollTrigger);


gsap.timeline({
  scrollTrigger: {
    trigger: '.screen4',
    scrub: true,
    // start: '0 top',
    end: `${document.querySelector('.screen4').getBoundingClientRect().height} bottom`,
    pin: '.screen4__inner',
    markers: true
  }
})
  .from('.screen4__title :first-child', { x: '-50vw' })
  .from('.screen4__title :last-child', { x: '50vw' }, '<')
  .to('.screen4__title :last-child', { z: 0 })

document.querySelectorAll('[data-screen4-video]').forEach(el => {
  el.addEventListener('click', () => {
    const video = el.querySelector('video');
    if (video === null) return;
    video.paused ? video.play() : video.pause();
  })
})
// headerHandle();

gsap.timeline({
  scrollTrigger: {
    trigger: '.screen5',
    scrub: true,
    // start: '0 top',
    end: `${document.querySelector('.screen5').getBoundingClientRect().height} bottom`,
    pin: '.screen5__inner',
    markers: true
  }
})
.to('.screen5-hor-block', { x: (el, target) => {
  const horBlocksItems = document.querySelectorAll('.screen5-hor-block__item');
  return (horBlocksItems[0].getBoundingClientRect().width) * (horBlocksItems.length - 1) * -1;
} })
gsap.timeline({
  scrollTrigger: {
    trigger: '.genplan',
    scrub: true,
    // start: '0 top',
    end: `${document.querySelector('.genplan').getBoundingClientRect().height} bottom`,
    pin: '.genplan__inner',
    markers: true
  }
})
.to('.genplan__text1', { autoAlpha: 0 })
.to('.genplan__text2', { autoAlpha: 1 }, '<')
.add(genplatListStaggerHightlight())


function genplatListStaggerHightlight() {
  const tl = gsap.timeline();
  const $list = document.querySelectorAll('.genplan li');
  $list.forEach((item, index, array) => {
    
    const notActiveLinks = Array.from(array).slice(index, index + 1);
    tl.to(notActiveLinks, { autoAlpha: 0 })
    tl.to(item, { autoAlpha: 1 }, '<');
  });

  return tl;
}


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
