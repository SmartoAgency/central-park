import Swiper, { Navigation } from 'swiper';
export default function screen3Effects() {
    const swiper = new Swiper('.zoom-slider-wrapper', {
        // Optional parameters
        modules: [ Navigation],
        slidesPerView: 4.5,
        loop: true,
        spaceBetween: 40,
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20
          },
          // when window width is >= 480px
          993: {
            slidesPerView: 4.5,
            spaceBetween: 40
          },
          // when window width is >= 640px
        },
        navigation: {
          nextEl: document.querySelector('[data-screen3-next]'),
          prevEl: document.querySelector('[data-screen3-prev]'),
        },
      });
      swiper.on('touchStart', () => {
        document.querySelector('.zoom-slider-wrapper').classList.add('drag')
      
      })
      swiper.on('touchEnd', () => {
        document.querySelector('.zoom-slider-wrapper').classList.remove('drag')
      })
}