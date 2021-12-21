import {gsap, ScrollTrigger} from "gsap/all";

export default function screen1(scroller) {
    const  screen1 = document.querySelector('.main-screen');
    if (screen1 === null) return;
    const cloud1 = screen1.querySelector('.main-screen__cloud-1'),
        render = screen1.querySelector('.main-screen__render'),
        textBlock = screen1.querySelector('.main-screen__text');
    Array.from(textBlock.children).forEach(el => {
        const wrapper = wrap(el);
        gsap.set(wrapper, { overflow: 'hidden' })
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
        { yPercent: 100, duration: 0.05 },
        
        )
    .to(cloud1, { xPercent: -70 }, '<')
    .to(render, { scale: 1.05, transformOrigin: '100% 100%' }, '<')
}


function wrap(elToWrap) {
    const div = document.createElement('div');
    div.append(elToWrap);
    return div;
}