import splitToLinesAndFadeUp from "../../modules/effects/splitToLinesAndFadeUp";
import ztext from "../../modules/ztext/ztext";

export default function screen5(scroller) {
    const innerHorizontalItems = gsap.utils.toArray('.screen5-hor-block__item:nth-child(n+2)');
    const screen5TopBlockHeight = document.querySelector('.screen5__inner-top').getBoundingClientRect().height;

    gsap.timeline({
      scrollTrigger: {
        trigger: '.screen5',
        scrub: true,
        scroller: scroller ? scroller : null,
        // start: `${screen5TopBlockHeight} top`,
        end: `${innerHeight} bottom`,
        // onUpdate: ({ progress }) => console.log(progress)
      //   markers: true
      }
    })
      .from('.screen5 .title-h2', { yPercent: 100, autoAlpha: 0, })
      .from('.screen5-hor-block', { yPercent: 50, autoAlpha: 0, }, '<')
    gsap.timeline({
      scrollTrigger: {
        trigger: '.screen6',
        scrub: true,
        scroller: scroller ? scroller : null,
        // start: `${screen5TopBlockHeight} top`,
        end: `${innerHeight} bottom`,
        // onUpdate: ({ progress }) => console.log(progress)
      //   markers: true
      }
    })
      .to('.screen5-hor-block', { yPercent: -50, autoAlpha: 0, }, '<')
      // .to('.screen5', { y: -50, autoAlpha: 0, }, '<')
      .to('.genplan-curtain-for-prev-block-anim', { scaleY: 0,}, '<')
    gsap.timeline({
        scrollTrigger: {
          trigger: '.screen5',
          scrub: true,
          scroller: scroller ? scroller : null,
          start: `${screen5TopBlockHeight} top`,
          end: `${document.querySelector('.screen5').getBoundingClientRect().height} bottom`,
          pin: '.screen5__inner',
          // onUpdate: ({ progress }) => console.log(progress)
        //   markers: true
        }
      })
      .to('.screen5 .title-h2', { yPercent: -100, autoAlpha: 0, duration: 0.1 })
      // .fromTo('.screen5-hor-block__item', { y: 100, duration: 0.1 }, { y: 0, duration: 0.1 }, '<')
      .to('.screen5-hor-block', { x: (el, target) => {
        const horBlocksItems = document.querySelectorAll('.screen5-hor-block__item');
        
        // return (horBlocksItems[0].getBoundingClientRect().width) * (horBlocksItems.length - 1) * -1;
        return innerWidth + Array.from(horBlocksItems).reduce((acc, el) => {
          acc -= el.getBoundingClientRect().width;
          return acc;
        }, 0);
      }}, '<')

      // .from(innerHorizontalItems, { y: 50, duration: 0.1, stagger: 0.33 }, '<')



      // console.log(items);
    //   document.querySelectorAll('.screen5-hor-block__item p').forEach((el, index, array) => {
    //     new ztext(`.screen5-hor-block__item:nth-child(${index + 1}) p`, {
    //       depth: "5px",
    //       layers: 1,
    //       fade: true,
    //       // direction: "forwards",
    //       event: "pointer",
    //       eventRotation: "10deg"
    //   })
    //  })
    //  document.querySelectorAll('.screen5-hor-block__item .title').forEach((el, index, array) => {
    //     new ztext(`.screen5-hor-block__item:nth-child(${index + 1}) .title`, {
    //       depth: "5px",
    //       layers: 1,
    //       fade: true,
    //       // direction: "forwards",
    //       event: "pointer",
    //       eventRotation: "10deg"
    //   })
    //  })
}