import gsap from 'gsap';
import { transitionBetweenSectionSceneLength } from '../../modules/helpers/helpers';
const testData = [
    'Площа квартири 46,7 м2. Містка гардеробна. Кухня площею 15,6 м2 із зоною для приготування та споживання улюблених страв. Спальня площею 17,7 м2 з ліжком, телевізором, трюмо та зоною для зберігання. Панорамні вікна з виглядом на лісопаркову зону. Скористайтесь функцією 3D-туру квартирою, і Ви впевнитесь у зручності її планування та функціональності.',
    'Площа квартири 55,7 м2. Містка гардеробна. Кухня площею 15,6 м2 із зоною для приготування та споживання улюблених страв. Спальня площею 17,7 м2 з ліжком, телевізором, трюмо та зоною для зберігання. Панорамні вікна з виглядом на лісопаркову зону. Скористайтесь функцією 3D-туру квартирою, і Ви впевнитесь у зручності її планування та функціональності.',
    'Площа квартири 56,7 м2. Містка гардеробна. Кухня площею 15,6 м2 із зоною для приготування та споживання улюблених страв. Спальня площею 17,7 м2 з ліжком, телевізором, трюмо та зоною для зберігання. Панорамні вікна з виглядом на лісопаркову зону.',
    'Площа квартири 57,7 м2. Містка гардеробна. Кухня площею 15,6 м2 із зоною для приготування та споживання улюблених страв. Спальня площею 17,7 м2 з ліжком, телевізором, трюмо та зоною для зберігання. Панорамні вікна з виглядом на лісопаркову зону. Скористайтесь функцією 3D-туру квартирою, і Ви впевнитесь у зручності її планування та функціональності.',
    'Площа квартири 58,7 м2. Містка гардеробна. ',
];
const testSrc = [
    'https://ua-maps3d.vrnet.io/view5.16a/?model=ua/bmu6/forresthome/1zhe',
    'https://ua-maps3d.vrnet.io/view5.16a/?model=ua/bmu6/forresthome/1zhe',
    'https://ua-maps3d.vrnet.io/view5.16a/?model=ua/bmu6/forresthome/2zhe',
    'https://ua-maps3d.vrnet.io/view5.16a/?model=ua/bmu6/forresthome/3zhe',
    'https://ua-maps3d.vrnet.io/view5.16a/?model=ua/bmu6/forresthome/4zhe',
];



export default function screen9Handler(scroller) {
    const container = document.querySelector('.screen9');
    if (container === null) return;
    let currentIndex = 0;
    const frame = container.querySelector('iframe'),
        textBlock = container.querySelector('.screen9__right p'),
        navNext = container.querySelector('[data-nav-wrap] svg:nth-child(2)'),
        navPrev = container.querySelector('[data-nav-wrap] svg:nth-child(1)'),
        counterCurrent = container.querySelector('[data-current]'),
        counterNext = container.querySelector('[data-all]');
    const iframeWrap = container.querySelector('[data-vr-frame]');
    const svgBg = container.querySelectorAll('[data-screen9-bg] path');
    const frameOtherEls = iframeWrap.querySelectorAll('.screen9__center-button');
    iframeWrap.addEventListener('click', function changeSrc() {
        gsap.to(frameOtherEls, { y: 50, autoAlpha: 0, clearProps: 'transform' })
        frame.src = frame.dataset.src;
    });
    if (counterNext) counterNext.textContent = testData.length;
    navNext.addEventListener('click', () => {
        scaleDownAndUp(svgBg);
        curtainOpenCloseWithCallback(container.querySelectorAll('.curtain'), () => {
            let nextIndex = currentIndex === testData.length - 1 ? 0 : currentIndex + 1;
            textBlock.textContent = testData[nextIndex];
            frame.dataset.src = testSrc[nextIndex];
            frame.src = '';
            gsap.to(frameOtherEls, { y: 0, autoAlpha: 1, clearProps: 'transform' })
            if (counterCurrent) counterCurrent.textContent = nextIndex + 1;
            currentIndex = nextIndex;
        })
    })
    navPrev.addEventListener('click', () => {
        scaleDownAndUp(svgBg);
        curtainOpenCloseWithCallback(container.querySelectorAll('.curtain'), () => {
            let nextIndex = currentIndex === 0  ? testData.length - 1 : currentIndex - 1;
            textBlock.textContent = testData[nextIndex];
            frame.dataset.src = testSrc[nextIndex];
            frame.src = '';
            gsap.to(frameOtherEls, { y: 0, autoAlpha: 1, clearProps: 'transform' })
            if (counterCurrent) counterCurrent.textContent = nextIndex + 1;
            currentIndex = nextIndex;
        })
    })

    gsap.timeline({
        scrollTrigger: {
          trigger: '.screen9',
          scrub: true,
          scroller: scroller ? scroller : null,
          ...transitionBetweenSectionSceneLength(),
        }
      })
        .from('.screen9__left, .screen9__center, .screen9__right', { y: 100 })
        // .to('.screen8__render', { scale: 0.8 }, '<')
    
}
function scaleDownAndUp($el) {
    gsap.timeline()
        .set($el, { attr: {
            class: 'effecting-in'
        }})
        .set($el, { attr: {
            class: 'effecting-out'
        }}, '<+1')
}
function curtainOpenCloseWithCallback(el, cb = () => {}) {
    gsap.timeline()
        .to(el, {
            scaleX: 1,
            ease: 'power2.out'
        })
        .add(cb)
        .to(el, {
            scaleX: 0,
            transformOrigin: '0% 50%',
            clearProps: 'all',
            ease: 'power2.in'
        })
}


