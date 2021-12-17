import {gsap, ScrollTrigger} from 'gsap/all';
export default function galleryEffect(scroller) {
    if (window.matchMedia('(max-width: 575px)').matches) return;
    const gallery = document.querySelector('.screen7');
    gsap.set(gallery, { height: '350vh' });
    const inner = gallery.querySelector('.screen7__content');
    const right = gallery.querySelector('.screen7__right-block'),
        left = gallery.querySelector('.screen7__left-block'),
        center = gallery.querySelector('.screen7__head-block'),
        centerImg = center.querySelector('img'),
        fadedTitle = gallery.querySelector('.screen7__faded-title'),
        centerText = gallery.querySelector('.screen7__head-block-text');
        ;
    
    const centerRatio = innerWidth*0.95 / center.getBoundingClientRect().width;
    gsap.timeline({
        ease: 'linear',
        defaults: {
            ease: 'linear'
        },
        scrollTrigger: {
            trigger: gallery,
            scroller: scroller ? scroller : null,
            scrub: true,
            end: `${gallery.getBoundingClientRect().height} bottom`,
            pin: inner
        }
    })
     .to(centerImg, { scale: centerRatio * 1.45, transformOrigin: '50% 100%' })
     .to(center, { scale: centerRatio, transformOrigin: '50% 100%' }, '<')
    //  .to(centerText, { scale: center.getBoundingClientRect().width / innerWidth, autoAlpha: 1, duration: 0.25 }, '<')
    // .to(centerImg, { scale: 1.3 }, '<')
    .to(left, { xPercent: -50, ease: 'linear' },'<')
    .to(right, { xPercent: 50, ease: 'linear' }, '<')
    .to(fadedTitle, { autoAlpha: 1, duration: 0.2 }, '<+0.5')
    .to(right, { xPercent: 100, duration: 0.5 }, )

}