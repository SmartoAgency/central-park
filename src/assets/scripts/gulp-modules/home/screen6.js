export default function screen6() {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.genplan',
          scrub: true,
          // start: '0 top',
          end: `${document.querySelector('.genplan').getBoundingClientRect().height} bottom`,
          pin: '.genplan__inner',
        //   markers: true
        }
      })
      .to('.genplan__text1', { autoAlpha: 0 })
      .to('.genplan__text2', { autoAlpha: 1 }, '<')
      .add(genplatListStaggerHightlight())
      
      
      function genplatListStaggerHightlight() {
        const tl = gsap.timeline();
        const $list = document.querySelectorAll('.genplan li');
        $list.forEach((item, index, array) => {
          
          const notActiveLinks = Array.from(array).slice(index, index + 1);
          tl.to(notActiveLinks, { autoAlpha: 0 })
          tl.to(item, { autoAlpha: 1 }, '<');
        });
      
        return tl;
      }
}