import axios from "axios";
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
export default async function genplanSequence(config) {
    const scroller = config.scroller;
    const scene = document.querySelector(config.scene);
    const imgForDisplay = getElementBySelector(config.selectorToDisplay);
    const $switchFrames = document.querySelectorAll(config.$switchFrames);
    let URL = window.location.href.match(/localhost/) ? './static/genplan.json' : '/wp-content/themes/central-park/static/genplan.json';
    let SEQUENCES = await axios(URL, {
        onDownloadProgress: (e) => {
            console.log(e);
        }
    });
    let loadedSequences = {

    };
    let activeSequence;
    const clickSequences = {
        areas_1: 'genplan_1.json',
        areas_2: 'genplan_2.json',
        areas_finals:'genplan_3.json',
    };

    Object.entries(clickSequences).forEach(async ([key, val]) => {
        let URL = window.location.href.match(/localhost/) ? './static/'+val : '/wp-content/themes/central-park/static/'+val;
        let data = await axios(URL, {
            onDownloadProgress: (e) => {
                console.log(e);
            }
        });
        clickSequences[key] = data.data;
    })
    // SEQUENCES = await SEQUENCES.json();
    SEQUENCES = await SEQUENCES.data;
    const sequenceLength = SEQUENCES.length;

    ScrollTrigger.create({
        trigger: scene,
        scroller: scroller,
        end: '80% bottom',
        onEnterBack:()=>{ activeSequence = undefined },
        onUpdate: ({progress}) => {
            console.log('upodate');
            const scaleFactor = sequenceLength / 100; 
            const percentage = ((progress * 100) * scaleFactor).toFixed(0);
            // gsap.set(imgForDisplay, { src: SEQUENCES[percentage] })
            requestAnimationFrame(() => {
                if (SEQUENCES[percentage] !== undefined ) imgForDisplay.src = SEQUENCES[percentage];
            })
        }
    });

    let isAnimating = false;
    $switchFrames.forEach(frame => {
        frame.addEventListener('click',function(evt){
            if (!clickSequences[frame.dataset.attr]) return;
            const dataToSequence = clickSequences[frame.dataset.attr];
            if (isAnimating) return;
            isAnimating = true;
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
                                isAnimating = false
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
                    isAnimating = false
                }
            );
        });
    })
}




function changeImageSrcByArrayIndex(toDisplay, images, start, end, cb = () => {}) {
    const delay =  1000 / 25;
    function change(i) {
        toDisplay.src = images[i];
        if (i === end) return cb();
        setTimeout(() => {
            start > end ? change(i - 1) : change(i + 1);
        }, delay);
    }
    change(start);
}
function getElementBySelector(arg) {
    if (typeof arg === 'string') return document.querySelector(arg);
    return arg;
}