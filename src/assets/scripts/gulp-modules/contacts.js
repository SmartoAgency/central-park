import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../../pug/components/form/form';
import SexyInput from '../../../pug/components/input/input';
import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";

innerPageFrontEffect();
window.addEventListener('load',function some(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
    handleForm();
    window.removeEventListener('load', some);
});
function handleForm() {
  const contactForms = ['[data-contact-page-form]'];
contactForms.forEach(form => {
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
                    const succesPoup = document.querySelector('.succes-popup');
                    const closePopup = succesPoup.querySelector('button');
                    closePopup.addEventListener('click', function removeThanks() {
                        gsap.to(succesPoup, { autoAlpha: 0, clearProps: 'all' });
                        closePopup.removeEventListener('click', removeThanks);
                    })
                    gsap.to(succesPoup, { autoAlpha: 1 });

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
}
