import { gsap } from "gsap/all";
export default function buttonHover(selector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        const hoverEl = button.querySelector('.button__hover');
        if (hoverEl === null) return;
        console.log(hoverEl);
        button.addEventListener('mouseenter',openingEffect);
        button.addEventListener('mouseleave',closingEffect);
    })
    // console.log(buttons);
}
function getPercentOfEnterButton(button, { clientX, clientY }) {
    const { left, top, width } = button.getBoundingClientRect();
    const startPercentValue = left * 100 / (left + width);
    const cordPercentValue = (clientX) * 100 / (left + width);
    console.log(cordPercentValue * 0.54);
    return cordPercentValue * 0.54;
}
function openingEffect({clientX , clientY, target}) {
// console.log(clientX, clientY);
    const hoverEl = target.querySelector('.button__hover');
    if (hoverEl === null) return;
    const xPercent = getPercentOfEnterButton(target, {
        clientX,
        clientY
    })
    gsap.timeline().fromTo(
        hoverEl, 
        { webkitClipPath: `circle(0% at ${xPercent}% ${100}%)` }, 
        { 
            webkitClipPath: `circle(140% at ${xPercent}% ${100}%)`, 
            duration: 1, 
            ease: 'power4.easeOut' 
        }
    );
}
function closingEffect({clientX , clientY, target}) {
// console.log(clientX, clientY);
    const hoverEl = target.querySelector('.button__hover');
    if (hoverEl === null) return;
    const xPercent = getPercentOfEnterButton(target, {
        clientX,
        clientY
    })
    gsap.timeline()
        .set(target, { backgroundColor: 'transparent' }).fromTo(
        hoverEl, 
        { webkitClipPath: `circle(140% at ${xPercent}% ${100}%)`, }, 
        { 
            webkitClipPath: `circle(0% at ${xPercent}% ${100}%)`,
            duration: 1, 
            ease: 'power4.easeOut' 
        }
    ).set(target, { backgroundColor: '' })
    ;
}