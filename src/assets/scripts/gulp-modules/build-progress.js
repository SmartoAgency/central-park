import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";
import Swiper, { Navigation } from 'swiper';


var swiper = new Swiper(".swiper", {
    modules: [ Navigation],
    slidesPerView: "auto",
    spaceBetween: 100,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
        nextEl: document.querySelector('.status-wrap [data-next]'),
        prevEl: document.querySelector('.status-wrap [data-prev]'),
    },
    roundLengths: true,
  });

innerPageFrontEffect();
window.addEventListener('load',function(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
});

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  function describeArc(x, y, radius, startAngle, endAngle){
  
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
  
      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
          "L", x,y,
          "L", start.x, start.y
      ].join(" ");
  
      return d;       
  }

document.querySelectorAll('[data-build-arc]').forEach(path => {
    const { buildArc } = path.dataset;
    const degreesToPercentRatio = buildArc * 360 / 100;
    path.setAttribute('d', describeArc(125,125,125,0, degreesToPercentRatio))
    console.log(buildArc);
})



/**Попап для кругляшек про статус дома */
document.querySelectorAll('[data-build-popup-status]').forEach(el => {
  const close = el.querySelector('[class*="close"]');
  close.addEventListener('click', () => gsap.to(el, { autoAlpha: 0 }))
})

/**Кругляшки про статус дома */
document.querySelectorAll('[data-single-build-status]').forEach(el => {
  const popup = document.querySelector('[data-build-popup-status]');
  const { id } = el.dataset;
  const popupTextBlock = popup.querySelector('[class*="text"]')
  const popupTitleBlock = popup.querySelector('[class*="title"]')
  const popupProgressBlock = popup.querySelector('.build-status-popup__progress')
  el.addEventListener('click', async () => {
    let innerInfo = await fetch(`./static/build-popup-info.php?id=${id}`);
    innerInfo = await innerInfo.json();
    console.log(innerInfo);
    const {title, text, items, innerTitle} = innerInfo;
    popupTextBlock.textContent = text;
    popupTitleBlock.textContent = title;
    popupProgressBlock.innerHTML = '';
    items.forEach(item => {
      popupProgressBlock.innerHTML += getInnerPopupProgressItem(item);
    })
    popupProgressBlock.innerHTML += getAfterBarsTitle(innerTitle);
    gsap.to(popup, { autoAlpha: 1 });
  })
})

function getAfterBarsTitle(title) {
  return `<div class="build-status-popup__progress-bottom-title">${title}</div>`;
}
function getInnerPopupProgressItem({ value, title, text }) {
  return `
    <div class="build-single-progress-item" data-text="${text}" style="--progress: ${value}%">
      <div class="build-single-progress-item__title">${title}</div>
      <div class="build-single-progress-item__bar">
        <div class="build-single-progress-item__bar-title">${value}%</div>
        <div class="build-single-progress-item__bar-value"> </div>
      </div>
    </div>
  `;
}

/**Попап карточек строительства */
document.querySelectorAll('[data-build-popup-progress]').forEach(el => {
  const close = el.querySelector('[class*="close"]');
  close.addEventListener('click', () => gsap.to(el, { autoAlpha: 0 }))
})


document.querySelector('.build-progress-conteiner').addEventListener('click', ({ target }) => {
  if (target.closest('.build-card') === null) return;
  gsap.to('[data-build-popup-progress]', { autoAlpha: 1 });
})


document.querySelectorAll('[data-build-popup-progress-inner-text]').forEach(button => {
  
  const innerPopup = button.parentElement;
  const textEl = button.querySelector('span');
  let state = innerPopup.dataset.state;
  button.addEventListener('click', () => {
    console.log(state);
    state = !state;
    gsap.to(innerPopup, { xPercent: state ? 0 : -100, duration: 1.75, ease: 'power4.out' });
    textEl.textContent = state ? innerPopup.dataset.openedText : innerPopup.dataset.closedText;
    innerPopup.dataset.state = state;
  })
})


var swiper1 = new Swiper(".build-swiper", {
    // modules: [ Navigation],
    slidesPerView: 1,
    // spaceBetween: 100,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    // navigation: {
    //     nextEl: document.querySelector('.status-wrap [data-next]'),
    //     prevEl: document.querySelector('.status-wrap [data-prev]'),
    // },
    // roundLengths: true,
  });4