import gsap from "gsap/all";

export default function screen6(scroller) {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.genplan',
          // scrub: true,
          scroller: scroller ? scroller : null,
          // start: '0 top',
          pin: '.genplan__inner',
          // onUpdate: ({ progress }) => {
          //   gsap.set('.genplan__inner-progress-bar', { scaleX: progress })
          // },
          // onLeave: () => {
          //   gsap.timeline()
          //     .to('.genplan__text1', { autoAlpha: 0, duration: 0.5 })
          //     .to('.genplan__text2', { autoAlpha: 1 }, '<')
          // },
          // onEnterBack: () => {
          //   gsap.timeline()
          //     .to('.genplan__text1', { autoAlpha: 1, duration: 0.5 })
          //     .to('.genplan__text2', { autoAlpha: 0 }, '<')
          // }
        //   markers: true
        }
      })
      // .add(genplatListStaggerHightlight())
      
      
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