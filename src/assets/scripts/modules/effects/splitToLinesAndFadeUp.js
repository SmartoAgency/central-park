export default function splitToLinesAndFadeUp(selector, $scroller) {
    document.querySelectorAll(selector).forEach(text => {
        let mathM = text.innerHTML.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
        mathM = mathM.map(el => `<span style="display:inline-flex"><span>${el}</span></span>`);
        text.innerHTML = mathM.join(' ');
        gsap.set(text.children, { overflow: 'hidden' });
        gsap.set(text.querySelectorAll('span>span'), { overflow: 'initial', display: 'inline-block' });
        let tl = gsap
          .timeline({
            // paused: true,
            scrollTrigger: {
              scroller: $scroller ? $scroller : null,
              trigger: text,
              once: true,
            },
          })
          .fromTo(
            text.querySelectorAll('span>span'),
            { yPercent: -100,  },
            { yPercent: 0,  stagger: 0.05, duration: 1.35, ease: 'power4.out' },
          );

          text.addEventListener('click',function(evt){
            tl.progress(0).play();
          });
      });


}