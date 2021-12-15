export default function screen5() {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.screen5',
          scrub: true,
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
}