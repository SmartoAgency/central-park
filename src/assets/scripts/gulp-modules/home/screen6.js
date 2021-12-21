import gsap from "gsap/all";

export default function screen6(scroller) {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.genplan',
          scrub: true,
          scroller: scroller ? scroller : null,
          // start: '0 top',
          end: `${document.querySelector('.genplan').getBoundingClientRect().height} bottom`,
          pin: '.genplan__inner',
          onUpdate: ({ progress }) => {
            gsap.set('.genplan__inner-progress-bar', { scaleX: progress })
          },
        //   markers: true
        }
      })
      .to('.genplan__text1', { autoAlpha: 0 })
      .to('.genplan__text2', { autoAlpha: 1 }, '<')
      .add(genplatListStaggerHightlight())
      
      
      function genplatListStaggerHightlight() {
        const tl = gsap.timeline();
        const $list = document.querySelectorAll('.genplan li');
        gsap.set($list, {  autoAlpha: 0 })
        $list.forEach((item, index, array) => {
          
          const notActiveLinks = Array.from(array).slice(index, index + 1);
          // tl.to(notActiveLinks, { autoAlpha: 0 })
          tl.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1 });
        });
      
        return tl;
      }
}