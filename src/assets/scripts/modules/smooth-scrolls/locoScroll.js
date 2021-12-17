import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger } from 'gsap/all';
export default function locoScroll(selector) {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll1 = new LocomotiveScroll({
        el: document.querySelector(selector),
        smooth: true,
        smoothMobile: false,
        // inertia: 1.1,
        multiplier: 0.5,
        lerp: 0.05,
    });
    locoScroll1.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.querySelector(selector), {
        scrollTop(value) {
          return (arguments.length
            ? locoScroll1.scrollTo(value, 0, 0)
            : locoScroll1.scroll.instance.scroll.y);
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.querySelector(selector).style.transform ? 'transform' : 'fixed',
      });
      ScrollTrigger.addEventListener('fixed', () => locoScroll1.update());

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll1.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    return locoScroll1;
}