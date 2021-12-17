export default function screen8(scroller) {
    console.log(scroller);
    const  screen1 = document.querySelector('.screen8');
    if (screen1 === null) return;
    const cloud1 = screen1.querySelector('.screen8__cloud-1'),
        render = screen1.querySelector('.screen8__render'),
        textBlock = screen1.querySelector('.screen8__text');

    gsap.timeline({
        scrollTrigger: {
            scroller: scroller ? scroller : null,
            trigger: screen1,
            scrub: true,
            start: `${innerHeight} bottom`,
            // end: `${screen1.getBoundingClientRect().height} bottom`
        }   
    })
    .to(textBlock, { yPercent: -50, autoAlpha: 0.5 })
    .to(cloud1, { xPercent: -70 }, '<')
    .to(render, { scale: 1.15, transformOrigin: '100% 100%' }, '<')
    
}