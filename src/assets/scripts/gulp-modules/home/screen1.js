import {gsap, ScrollTrigger} from "gsap/all";

export default function screen1(scroller) {
    const  screen1 = document.querySelector('.main-screen');
    if (screen1 === null) return;
    const cloud1 = screen1.querySelector('.main-screen__cloud-1'),
        render = screen1.querySelector('.main-screen__render'),
        textBlock = screen1.querySelector('.main-screen__text');

    gsap.timeline({
        scrollTrigger: {
            scroller: scroller ? scroller : null,
            trigger: screen1,
            scrub: true,
            start: `${innerHeight} bottom`,
            end: `${screen1.getBoundingClientRect().height} bottom`
        }   
    })
    .to(textBlock, { yPercent: -50, autoAlpha: 0.5 })
    .to(cloud1, { xPercent: -70 }, '<')
    .to(render, { scale: 1.05, transformOrigin: '100% 100%' }, '<')
}