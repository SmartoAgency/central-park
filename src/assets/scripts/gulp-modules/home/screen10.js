export default function screen10() {
    const isMobile = () => window.matchMedia('(max-width: 575px)').matches;
    document.querySelectorAll('.screen10-slide').forEach((el, index, array) => {
        if (isMobile()) return;
        const innactiveSlides = document.querySelectorAll(`.screen10-slide:not(:nth-child(${index + 1}))`);
        const innactiveCurtains = document.querySelectorAll(`.screen10-slide:not(:nth-child(${index + 1})) .curtain`);
        const innactiveImages = document.querySelectorAll(`.screen10-slide:not(:nth-child(${index + 1})) img`);
        gsap.set(array, { width: '33%' })
        el.addEventListener('mouseenter', () => {
          gsap.timeline({
            defaults: {
              duration: 0.75
            }
          })
            .set(el, { zIndex: 2 })
            .set(innactiveSlides, { zIndex: 1 })
            .to(el, { width: '40%' },'<')
            .set(el.querySelector('img'), { filter: 'none' },'<')
            .to(el.querySelector('.curtain'), { autoAlpha: 0 },'<')
            .to(innactiveCurtains, { autoAlpha: 1 }, '<')
            .to(innactiveSlides, { width: '30%' }, '<')
        })
        el.addEventListener('mouseleave', () => {
          gsap.timeline({
            defaults: {
              duration: 0.75
            }
          }).set(el.querySelector('img'), { filter: '' },'<')
        })
      })
      gsap.timeline({
        scrollTrigger: {
          trigger: '.screen9__title-l',
          once: true
        }
      })
        .fromTo('.screen9__title-l span', {
          yPercent: 100,
        }, {
          yPercent: 0 
        })
}