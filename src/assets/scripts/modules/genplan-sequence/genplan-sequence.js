import axios from "axios";
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
export default async function genplanSequence(config) {
    const scroller = config.scroller;
    const scene = document.querySelector(config.scene);
    const imgForDisplay = getElementBySelector(config.selectorToDisplay);
    const $switchFrames = document.querySelectorAll(config.$switchFrames);

    let SEQUENCES = await axios('./static/genplan.json', {
        onDownloadProgress: (e) => {
            console.log(e);
        }
    });
    // SEQUENCES = await SEQUENCES.json();
    SEQUENCES = await SEQUENCES.data;
    const sequenceLength = SEQUENCES.length;
    console.log(SEQUENCES);

    ScrollTrigger.create({
        trigger: scene,
        scroller: scroller,
        end: '80% bottom',
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
            if (isAnimating) return;
            isAnimating = true;
            changeImageSrcByArrayIndex(
                imgForDisplay, 
                SEQUENCES, 
                30 , 
                0,
                () => {
                    changeImageSrcByArrayIndex(
                        imgForDisplay, 
                    SEQUENCES, 
                    0 , 
                    30,
                        () => isAnimating = false,
                    )
                    // isAnimating = false
                }
            );
            // gsap.fromTo(imgForDisplay, 
            //     { src: SEQUENCES[0] }, 
            //     { 
            //         // src: SEQUENCES[sequenceLength],
            //         onUpdate: (el) => {
            //             console.log(el);
            //         },
            //         onComplete:() => {
            //             isAnimating = false;
            //         } 
            //     }
            // )
        });
    })
}




function changeImageSrcByArrayIndex(toDisplay, images, start, end, cb = () => {}) {
    const delay =  1000 / 60;
    function change(i) {
        toDisplay.src = images[i];
        if (i === end) return cb();
        setTimeout(() => {
            start > end ? change(i - 1) : change(i + 1);
        }, delay);
    }
    change(start);
}
const sequenceIndexes = [
    '0~99',
    '100~119',
    '120~139',
    '140~149',
    '150~169',
];
function getElementBySelector(arg) {
    if (typeof arg === 'string') return document.querySelector(arg);
    return arg;
}