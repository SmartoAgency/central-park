import gsap from "gsap";
export default function menuHandler() {
    const callButtons = document.querySelectorAll('[data-menu-call]');
    const closeButtons = document.querySelectorAll('[data-menu-close]');
    const menu = document.querySelector('.menu')
    callButtons.forEach((el) => {
        openMenu(el, menu);
    })
    closeButtons.forEach((el) => {
        closeMenu(el, menu);
    })
}

const morphs = [
    'M 0 8 Q 4 8 8 8 L 8 8 Q 4 8 0 8',
    'M 0 8 Q 4 8 8 8 L 8 8 Q 4 6 0 8',
    'M 0 8 Q 4 8 8 8 L 8 0 Q 4 0 0 0',
    'M 0 0 Q 4 4 8 0 L 8 0 Q 4 0 0 0',
    'M 0 0 Q 4 0 8 0 L 8 0 Q 4 0 0 0',
];
const morphsReversed = [
    'M 0 0 Q 4 0 8 0 L 8 0 Q 4 0 0 0',
    'M 0 0 Q 4 4 8 0 L 8 0 Q 4 0 0 0',
    'M 0 8 Q 4 8 8 8 L 8 0 Q 4 0 0 0',
    'M 0 8 Q 4 8 8 8 L 8 8 Q 4 6 0 8',
    'M 0 8 Q 4 8 8 8 L 8 8 Q 4 8 0 8',
];

function openMenu(button, menu) {
    const menuLinks = menu.querySelectorAll('.menu__main [data-menu-links]>*');
    const tl = gsap.timeline({
        duration: 1,
        paused: true,
    }) 
        .add(enableCurtainFromBottom(), '<')
        .to(menu, { autoAlpha: 1, duration: 0.25 },'<65%')
        .fromTo(menuLinks, 
            { y: 50, autoAlpha: 0, }, 
            { y: 0, autoAlpha: 1, clearProps: 'all', duration: 1 }, 
            '<')
        .add(() => {
            document.body.classList.add('popup-opened');
            
        })
    button.addEventListener('click',function(evt){
        window.dispatchEvent(new Event('menu-open'))
        tl.progress(0).play();
    });
}

function closeMenu(button, menu) {
    const menuLinks = menu.querySelectorAll('.menu__main [data-menu-links]>*');
    const tl = gsap.timeline({
        duration: 1,
        paused: true
    })
    
    .add(enableCurtainFromTop(), '<')
    .to(menu, { autoAlpha: 0, duration: 0.25 },'<65%')
    .fromTo(menuLinks, 
        { y: 0, autoAlpha: 1, }, 
        { y: 50, autoAlpha: 0, duration: 0.75 }, 
        '<-0.55')
    .add(() => {
        document.body.classList.remove('popup-opened');
    })
    button.addEventListener('click',function(evt){
        tl.progress(0).play();
    });
}
function enableCurtainFromBottom() {
    const tl = gsap.timeline({
        // ease: 'power2.out',
        // duration: 2.5
    });
    morphs.forEach(d => {
        tl.to('.menu-curtain path', { 
            attr:  {  d  },
            ease: 'none',
            duration: 0.5,
            delay: 0,
            clearProps: 'all'
        
        })
    })
    return tl;
}
function enableCurtainFromTop() {
    const tl = gsap.timeline({
        // ease: 'power2.out',
        // duration: 2.5
    });
    morphsReversed.forEach(d => {
        tl.to('.menu-curtain path', { 
            attr:  {  d  },
            ease: 'none',
            duration: 0.5,
            clearProps: 'all'
        
        })
    })
    return tl.timeScale(0.85);
}
