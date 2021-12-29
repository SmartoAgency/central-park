import {gsap, ScrollTrigger} from "gsap/all";

export default function screen1(scroller) {
    const  screen1 = document.querySelector('.main-screen');
    const isMobile = window.matchMedia('(max-width: 575px)').matches;
    if (screen1 === null) return;
    const cloud1 = screen1.querySelector('.main-screen__cloud-1'),
        render = screen1.querySelector('.main-screen__render'),
        textBlock = screen1.querySelector('.main-screen__text');
    Array.from(textBlock.children).forEach((el, index, arr) => {
        if (index === arr.length - 1) {
            textBlock.append(el);
            return;
        }
        const wrapper = wrap(el);
        gsap.set(wrapper, { overflow: 'hidden' });
        textBlock.append(wrapper);
    })
    // screen1.append(wrap)
    gsap.timeline({
        scrollTrigger: {
            scroller: scroller ? scroller : null,
            trigger: screen1,
            scrub: true,
            start: `${innerHeight} bottom`,
            // end: `${screen1.getBoundingClientRect().height} bottom`
        }   
    })
    .to(
        textBlock.querySelectorAll('[style*="overflow"]>*'), 
        { yPercent: 100, duration: isMobile ? 1 : 0.1, autoAlpha: 0 },
        
        )
    .to(
        textBlock.querySelectorAll('button'), 
        {duration: isMobile ? 1 : 0.1, autoAlpha: 0 },
        '<'
        )
    .to(
        textBlock.querySelectorAll('.main-screen__text>*:first-child'), 
        { yPercent: isMobile ? 100 : 0, duration: isMobile ? 1 : 0.05},
        '<'
        )
    .to(cloud1, { xPercent: -30, yPercent: 5, }, '<')
    .to(render, { scale: isMobile ? 1 : 1.1, yPercent: 15, ease: 'linear', transformOrigin: '100% 100%' }, '<')

}


function wrap(elToWrap) {
    const div = document.createElement('div');
    div.append(elToWrap);
    return div;
}