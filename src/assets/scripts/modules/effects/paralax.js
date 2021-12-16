
import {gsap, ScrollTrigger} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)
export default function paralax(selector, curtainColor) {
  const paralaxImages = document.querySelectorAll(selector)
  paralaxImages.forEach((image) => {
    const wrap = document.createElement('div');

    wrap.style.overflow = 'hidden';
    const curtain = document.createElement('div');
    wrap.classList.add('image-with-curtain-in');
    // console.log();
    curtain.classList.add('curtain');
    image.parentElement.prepend(wrap);
    wrap.append(curtain);

    wrap.prepend(image);
    gsap.set(image, { autoAlpha: 0, scale: 1.2});
    gsap.set(curtain, { 
      // position: 'relative',
      width: image.getBoundingClientRect().width,
      marginRight: getComputedStyle(image).marginRight,
      height: image.getBoundingClientRect().height,
      // backgroundColor: curtainColor ? curtainColor : '',
    });

    
    gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: '20% bottom',
        once: true,
      }
    })
      .to(curtain, { scaleY: 1 })
      .to(curtain, { scaleY: 0, transformOrigin: '50% 0%' })
      .to(image, { autoAlpha: 1 }, '<')
    // .add(() => curtain.remove())
    gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        scrub: 0.5,
        // markers: true,
      },
    })
      .fromTo(image, {
        y: 35,
      }, {
        y: -35,
        ease: 'linear',
      });
  });
}