import axios from "axios";
import { gsap, ScrollTrigger } from 'gsap/all';
export default async function genplanSequence(config) {
    global.gsap = gsap;
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
    const scroller = config.scroller;
    const scene = document.querySelector(config.scene);
    const imgForDisplay = getElementBySelector(config.selectorToDisplay);
    const $switchFrames = document.querySelectorAll(config.$switchFrames);
    let URL = window.location.href.match(/localhost/) ? './static/genplan.json' : '/wp-content/themes/central-park/static/genplan.json';
    let SEQUENCES = await axios(URL, {
        onDownloadProgress: (e) => {
            const progress = gsap.utils.mapRange(0, e.total, 0, 1,  e.loaded);
            // gsap.set('.lds-ring span', { scaleX: progress })
            // console.log(e);
            // document.querySelector('.lds-ring span').textContent = Math.floor(progress * 100);
        }
    });
    gsap.set('.lds-ring', { autoAlpha: 0 })
    let loadedSequences = {

    };
    let activeSequence;
    // const clickSequences = {
    //     areas_1: 'genplan_1.json',
    //     areas_2: 'genplan_2.json',
    //     areas_finals:'genplan_3.json',
    // };
    const clickSequences = {
        areas_finals: '121-183',
        areas_2: '252-265',
        areas_1: '207-234',
    };
    const cutOnClickInited = cutOnClick();
    // Object.entries(clickSequences).forEach(async ([key, val]) => {
    //     let URL = window.location.href.match(/localhost/) ? './static/'+val : '/wp-content/themes/central-park/static/'+val;
    //     let data = await axios(URL, {
    //         onDownloadProgress: (e) => {
    //             console.log(e);
    //         }
    //     });
    //     clickSequences[key] = data.data;
    // })
    // SEQUENCES = await SEQUENCES.json();
    SEQUENCES = await SEQUENCES.data;
    let sequenceLength = SEQUENCES.length;


    gsap.timeline({
        scrollTrigger: {
            trigger: scene,
            scroller: scroller,
            start: '0% top',
            end: '70% top',
            onEnterBack:()=>{ 
                gsap.timeline()
                    .to('.genplan__text1', { autoAlpha: 1, duration: 0.5 })
                    .to('.genplan__text2', { autoAlpha: 0 }, '<');
                    scene.querySelectorAll('.active').forEach(el => {
                        el.classList.remove('active');
                    });
                    document.querySelector('[data-genplan-title]').textContent = '';
                activeSequence = undefined;
            },
            onLeave: () => {
                cutOnClickInited();
                gsap.timeline()
                    .to('.genplan__text1', { autoAlpha: 0, duration: 0.5 })
                    .to('.genplan__text2', { autoAlpha: 1 }, '<')
            },
        }
    });

    const entryFramesTl = gsap.timeline({
        paused: true,
    })
        .fromTo('.genplan-point', 
        { autoAlpha: 0, y: 100 }, 
        { autoAlpha: 1, y: 0, ease:'power4.out', stagger: 0.95, duration: 1.5 })
    const noScrollTrigger = ScrollTrigger.create({
        trigger: scene,
        scroller: scroller,
        start: '0% top',
        end: '80% bottom',
        once: true,
        markers: true,
        onEnter: () => {
            entryFramesTl.play();
            changeImageSrcByArrayIndex(imgForDisplay, SEQUENCES, 0, SEQUENCES.length - 1, () => {
                cutOnClickInited();
                entryFramesTl.kill();
            })
           
        }
    })

    let isAnimating = false;
    function cutOnClick() {
        let wasClicked = false;
        return function curArray() {
            if (wasClicked) return;
            // console.log(SEQUENCES);
            Object.entries(clickSequences).forEach(([key, frame]) => {
                let [from, to] = frame.split('-');
                from = +from;
                to = +to;
                clickSequences[key] = SEQUENCES.slice(from, to);
            })
            SEQUENCES = SEQUENCES.slice(0, 120);
            sequenceLength = SEQUENCES.length;
            wasClicked = true;
            // console.log(loadedSequences);
        }
    }
    window.addEventListener('resize', () => {
        $switchFrames.forEach(frame => { 
            frame.style.setProperty('--element-width', frame.querySelector('.genplan-point__text').getBoundingClientRect().width+'px');
        })
    });
    $switchFrames.forEach(frame => {

        frame.style.setProperty('--element-width', frame.querySelector('.genplan-point__text').getBoundingClientRect().width+'px');
        frame.addEventListener('click',function(evt){
            if (!clickSequences[frame.dataset.attr]) return;
            const dataToSequence = clickSequences[frame.dataset.attr];
            if (isAnimating) return;
            
            isAnimating = true;
            scene.classList.add('pending');
            $switchFrames[0].parentElement.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            frame.classList.add('active');

            document.querySelector('[data-genplan-title]').textContent = frame.dataset.title;
            if (activeSequence) {
                changeImageSrcByArrayIndex(
                    imgForDisplay, 
                    clickSequences[activeSequence], 
                    clickSequences[activeSequence].length -1, 
                    0,
                    () => {
                        changeImageSrcByArrayIndex(
                            imgForDisplay, 
                            dataToSequence, 
                            0, 
                            dataToSequence.length-1,
                            () => {
                                activeSequence = frame.dataset.attr;
                                isAnimating = false;
                                scene.classList.remove('pending');
                            }
                        );
                    }
                );
                return;
            } 
            changeImageSrcByArrayIndex(
                imgForDisplay, 
                dataToSequence, 
                0, 
                dataToSequence.length-1,
                () => {
                    activeSequence = frame.dataset.attr;
                    isAnimating = false;
                    scene.classList.remove('pending');
                }
            );
        });
    })
}




function changeImageSrcByArrayIndex(toDisplay, images, start, end, cb = () => {}) {
    const delay =  1000 / 60;
    function change(i) {
        toDisplay.src = images[i];
        if (i === end) return cb();
        setTimeout(() => {
            requestAnimationFrame(() => {
                start > end ? change(i - 1) : change(i + 1);
            })
        }, delay);
    }
    change(start);
}
function getElementBySelector(arg) {
    if (typeof arg === 'string') return document.querySelector(arg);
    return arg;
}