import { gsap } from "gsap/all";
export default function buttonHover(selector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        const hoverEl = button.querySelector('.button__hover');
        if (hoverEl === null) return;
        button.addEventListener('mouseenter',openingEffect);
        button.addEventListener('mouseleave',closingEffect);
    })
}
function getPercentOfEnterButton(button, { clientX, clientY }) {
    const { left, top, width, height, right, bottom } = button.getBoundingClientRect();

    const cordPercentValue = (clientX - left) * 100 / (right);
    const cordPercentValueY = ((clientY  - top) * 100 / (bottom))
    return {
        x: cordPercentValue / (width / right),
        y: cordPercentValueY / (height / bottom),
    };
}
function openingEffect({clientX , clientY, target}) {
    const hoverEl = target.querySelector('.button__hover');
    if (hoverEl === null) return;
    const cords = getPercentOfEnterButton(target, {
        clientX,
        clientY
    })
    gsap.timeline().fromTo(
        hoverEl, 
        { webkitClipPath: `circle(0% at ${cords.x}% ${cords.y}%)`, clipPath: `circle(0% at ${cords.x}% ${cords.y}%)` }, 
        { 
            webkitClipPath: `circle(140% at ${cords.x}% ${cords.y}%)`, 
            clipPath: `circle(140% at ${cords.x}% ${cords.y}%)`, 
            duration: 0.5, 
            ease: 'power4.easeOut' 
        }
    );
}
function closingEffect({clientX , clientY, target}) {
    const hoverEl = target.querySelector('.button__hover');
    if (hoverEl === null) return;
    const cords = getPercentOfEnterButton(target, {
        clientX,
        clientY
    })
    gsap.timeline()
        .fromTo(
        hoverEl, 
        { clipPath: `circle(140% at ${cords.x}% ${cords.y}%)`, webkitClipPath: `circle(140% at ${cords.x}% ${cords.y}%)` }, 
        { 
            webkitClipPath: `circle(0% at ${cords.x}% ${cords.y}%)`,
            clipPath: `circle(0% at ${cords.x}% ${cords.y}%)`,
            duration: 0.5, 
            ease: 'power4.easeOut' 
        }
    );
}