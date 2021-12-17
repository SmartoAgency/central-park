export default function screen4(scroller) {
    gsap.timeline({
        scrollTrigger: {
          trigger: '.screen4',
          scrub: true,
          scroller: scroller ? scroller : null,
          // start: '0 top',
          end: `${document.querySelector('.screen4').getBoundingClientRect().height} bottom`,
          pin: '.screen4__inner',
        //   markers: true
        }
      })
        .from('.screen4__title :first-child', { x: '-50vw' })
        .from('.screen4__title :last-child', { x: '50vw' }, '<')
        .to('.screen4__title :last-child', { z: 0 })
      
      document.querySelectorAll('[data-screen4-video]').forEach(el => {
        el.addEventListener('click', () => {
          const video = el.querySelector('video');
          if (video === null) return;
          video.paused ? video.play() : video.pause();
        })
      })
}