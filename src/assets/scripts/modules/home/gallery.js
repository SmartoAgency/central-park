import {gsap, ScrollTrigger} from 'gsap/all';
export default function galleryEffect() {
    const gallery = document.querySelector('.screen7');
    gsap.set(gallery, { height: '500vh' });
    const inner = gallery.querySelector('.screen7__content');
    const right = gallery.querySelector('.screen7__right-block'),
        left = gallery.querySelector('.screen7__left-block'),
        center = gallery.querySelector('.screen7__head-block'),
        centerImg = center.querySelector('img'),
        centerText = gallery.querySelector('.screen7__head-block-text');
        ;
    
    const centerRatio = innerWidth*0.95 / center.getBoundingClientRect().width;
    gsap.timeline({
        scrollTrigger: {
            trigger: gallery,
            scrub: true,
            end: `${gallery.getBoundingClientRect().height} bottom`,
            pin: inner
        }
    })
     .to(center, { scale: centerRatio, transformOrigin: '50% 100%' })
     .to(centerText, { scale: center.getBoundingClientRect().width / innerWidth, autoAlpha: 1, duration: 0.25 }, '<')
    //  .to(centerImg, { scale: 1.3 }, '<')
    
    .to(left, { xPercent: -100 },'<')
    .to(right, { xPercent: 100 }, '<')
    .to(right, { xPercent: 100, duration: 0.5 }, )

}