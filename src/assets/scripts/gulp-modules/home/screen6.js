import gsap from "gsap/all";

export default function screen6(scroller) {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.genplan',
          // scrub: true,
          scroller: scroller ? scroller : null,
          end: '100% bottom',
          // start: '0 top',
          pin: '.genplan__inner',

        }
      })
}