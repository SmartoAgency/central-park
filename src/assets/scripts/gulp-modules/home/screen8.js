export default function screen8(scroller) {
    console.log(scroller);
    const  screen1 = document.querySelector('.screen8');
    if (screen1 === null || window.matchMedia('(max-width: 1024px)').matches) return;
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
    .to(render, { scale: 1.15, transformOrigin: '100% 100%' }, '<');



    gsap.timeline({
        scrollTrigger: {
            scroller: scroller ? scroller : null,
            trigger: screen1,
            scrub: true,
            start: `${innerHeight / -4} center`,
            end: `${innerHeight / 4} center`
            // end: `${screen1.getBoundingClientRect().height} bottom`
        }   
    })
    .from('.img-left img:first-child, .img-left .img-left__decor, .img-center, .img-right', {  yPercent: 50, stagger: 0.1  })
    .to('.screen7__head-block, .screen7__faded-title', { autoAlpha: 0, y: 50, }, '<')
    
}