import axios from "axios";
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
export default async function genplanSequence(config) {
    const scroller = config.scroller;
    const scene = document.querySelector(config.scene);
    const imgForDisplay = getElementBySelector(config.selectorToDisplay);
    console.log(imgForDisplay);
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
    onUpdate: ({progress}) => {
        console.log('upodate');
        const scaleFactor = sequenceLength / 100; 
        const percentage = ((progress * 100) * scaleFactor).toFixed(0);
        // gsap.set(imgForDisplay, { src: SEQUENCES[percentage] })
        requestAnimationFrame(() => {
            imgForDisplay.src = SEQUENCES[percentage];
        })
    }
    })
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