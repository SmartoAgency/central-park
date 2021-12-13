import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import { isMobile, lazyImages, lazyPosters } from './modules/helpers/helpers';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
lazyImages();
lazyPosters();
const formsWithTel = ['[data-home-contact]'];

formsWithTel.forEach(form => {
  const $form = document.querySelector(form);
  console.log(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          gsap.to('.form-wrapper-succes-layer', { autoAlpha: 1 });
          console.log('re');
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
    // $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
    //   $form.querySelector('[name="phone"]').focus();
    // }, false);
  }
});

/** ******************************* */

const formWrapper = document.querySelector('[data-form-wrapper]');
const formWrapperCall = document.querySelectorAll('[data-form-wrapper-call], [data-call-form-popup]');
formWrapperCall.forEach(el => el.addEventListener('click',function(evt){
    gsap.to( formWrapper, { autoAlpha: 1 } )
    
}))
// const splitTolines = document.querySelectorAll('[data-split-to-lines]');
// splitTolines.forEach(elem => {
//   const text = elem.innerHTML.split('~').reduce((acc, el) => {
//     acc += `<span style="white-space:nowrap; overflow:hidden; display: inline-block">
//       <span data-splited-line style="display:inline-block">${el}</span>
//     </span>`;
//     return acc;
//   }, '');
//   elem.innerHTML = text;
// });

function closeForm() {
  gsap.timeline({
  })
    
    .to('.form-wrapper-succes-layer', { autoAlpha: 0, duration: 0.25 })
    .to(formWrapper, { autoAlpha: 0, duration: 0.25 }, '<');

}
formWrapper.querySelectorAll('[class*="close"]').forEach(closeBtn => {
  closeBtn.addEventListener('click',closeForm);
})
// window.addEventListener('succesFormSend',function(evt){
//   setTimeout(() => {
//     closeForm();
//   }, 2000);
// });


/** Mobile callback popup */
function mobPopupHandler() {
  function close(el) {
    gsap.to(el, { autoAlpha: 0 });
  }
  function open(el) {
    gsap.to(el, { autoAlpha: 1 });
  }
  const popup = document.querySelector('[data-mobile-callback-popup]');
  const call = document.querySelectorAll('[data-call-mobile-callback-popup]');
  const closeEl = document.querySelector('[data-mobile-callback-close]');
  closeEl.addEventListener('click', () => close(popup));
  call.forEach(el => el.addEventListener('click', () => open(popup)));
  call.forEach(el => el.addEventListener('touchstart', () => open(popup)));
}

mobPopupHandler();