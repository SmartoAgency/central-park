import splitToLinesAndFadeUp from "../../modules/effects/splitToLinesAndFadeUp";
import ztext from "../../modules/ztext/ztext";

export default function screen5(scroller) {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.screen5',
          scrub: true,
          scroller: scroller ? scroller : null,
          // start: '0 top',
          end: `${document.querySelector('.screen5').getBoundingClientRect().height} bottom`,
          pin: '.screen5__inner',
        //   markers: true
        }
      })
      .to('.screen5-hor-block', { x: (el, target) => {
        const horBlocksItems = document.querySelectorAll('.screen5-hor-block__item');
        
        // return (horBlocksItems[0].getBoundingClientRect().width) * (horBlocksItems.length - 1) * -1;
        return innerWidth + Array.from(horBlocksItems).reduce((acc, el) => {
          console.log(acc);
          acc -= el.getBoundingClientRect().width;
          return acc;
        }, 0);
      } })

      document.querySelectorAll('.screen5-hor-block__item p').forEach((el, index, array) => {
        new ztext(`.screen5-hor-block__item:nth-child(${index + 1}) p`, {
          depth: "5px",
          layers: 4,
          fade: true,
          // direction: "forwards",
          event: "pointer",
          eventRotation: "10deg"
      })
     })
     document.querySelectorAll('.screen5-hor-block__item .title').forEach((el, index, array) => {
        new ztext(`.screen5-hor-block__item:nth-child(${index + 1}) .title`, {
          depth: "5px",
          layers: 4,
          fade: true,
          // direction: "forwards",
          event: "pointer",
          eventRotation: "10deg"
      })
     })
}