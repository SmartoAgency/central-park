import gsap from "gsap/all";
import Swiper, {FreeMode } from 'swiper';

export default function screen10(scroller) {
  const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;
  const container = document.querySelector('.screen10__slider');
  container.addEventListener('mouseleave',function(evt){
    gsap.timeline({
      defaults: {
        duration: 0.75
      }
    })
      .to(container.children, { width: '33%' })
  });
  document.querySelectorAll('.screen10-slide').forEach((el, index, array) => {
      if (isMobile()) return;
      const innactiveSlides = document.querySelectorAll(`.screen10-slide:not(:nth-child(${index + 1}))`);
      const innactiveCurtains = document.querySelectorAll(`.screen10-slide:not(:nth-child(${index + 1})) .curtain`);
      const innactiveImages = document.querySelectorAll(`.screen10-slide:not(:nth-child(${index + 1})) img`);
      gsap.set(array, { width: '33%' })
      el.addEventListener('mouseenter', () => {
        gsap.timeline({
          defaults: {
            duration: 0.75
          }
        })
          .set(el, { zIndex: 2 })
          .set(innactiveSlides, { zIndex: 1 })
          .to(el, { width: '40%' },'<')
          .set(el.querySelector('img'), { filter: 'none' },'<')
          .to(el.querySelector('.curtain'), { autoAlpha: 0 },'<')
          .to(innactiveCurtains, { autoAlpha: 1 }, '<')
          .to(innactiveSlides, { width: '30%' }, '<')
          .set(innactiveImages, { filter: '' })
      })
    })

    
    gsap.timeline({
      scrollTrigger: {
        trigger: '.screen9__title-l',
        scroller: scroller ? scroller : null,
        once: true
      }
    })
      .fromTo('.screen9__title-l span', {
        yPercent: 100,
      }, {
        yPercent: 0 
      })
  const innerHeight = window.innerHeight;
  gsap.timeline({
    scrollTrigger: {
      trigger: '.screen10',
      start: `${innerHeight / -4} center`,
      end: `${innerHeight / 4} center`,
      scroller: scroller ? scroller : null,
      scrub: true,
    }
  })
    .to('.screen9__title-l', { y: -75, autoAlpha: 0 })
    .from('.screen10>*:not(.section-decor)', { y: 75, autoAlpha: 0 }, '<');


  if (isMobile()) {
    const slideWrapper = document.querySelector('.screen10__slider');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    slideWrapper.append(swiperWrapper);
    document.querySelectorAll('.screen10-slide').forEach(el => {
      el.classList.add('swiper-slide');
      swiperWrapper.append(el);
    })
    const swiper = new Swiper('.screen10__slider', {
      // Optional parameters
      modules: [FreeMode ],
      slidesPerView: 1.15,
      loop: true,
      freeMode: true,
      spaceBetween: 0,
      breakpoints: {
        // when window width is >= 320px
        620: {
          slidesPerView: 2.25,
        },
      }
      
  });
  }
}