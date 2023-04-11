import { getGenplanSequences, changeImageSrcByArrayIndex } from "../../modules/genplan-sequence/genplan-sequence";

export default async function screen55(scroller) {

    const $itemForImageRender = document.querySelector('[data-screen5-image]');
    const $legendItems = document.querySelectorAll('.genplan-legend-item');
    $legendItems.forEach((el, index) => {
        el.sequenceIndex = index;
    })
    let SEQUENCES = await getGenplanSequences({});
    let isAnimating = false;
    const clickSequences = {
        0:"121-190",
        1:"262-280",
        2:"191-230",
        3:"233-247"
    };

    const progressItemsPositionInProgressScene = [
        0.028552005438477225,
        0.180,
        0.41,
        0.9664,
    ]

    
    let previousSequence = false;
    let sequenceWaiting = false;

    console.log(scroller);

    function handleIntersection(entries) {
        entries.map((entry) => {
          if (entry.isIntersecting) {
            
            $legendItems.forEach(el => {
                if (entry.target === el) return;
                el.classList.remove('active');
            });
            // entry.target.style.transform = 'scale(1.5)';
            entry.target.classList.add('active');
            console.log(clickSequences[0].split('-')[0], clickSequences[0].split('-')[1]);
            // console.log(SEQUENCES.data);
            const sequenceIndex = entry.target.sequenceIndex;
            const currentSequenceToRender = clickSequences[sequenceIndex];

            if (isAnimating) { 
                sequenceWaiting = currentSequenceToRender;
                return;
            }
            
            if (previousSequence === currentSequenceToRender) return;

            // if (window.scroller) {
            //     window.scroller.scrollTo(".screen5-5.infrastructure", {
            //         offset: getHeight(document.querySelector(".screen5-5.infrastructure")) * progressItemsPositionInProgressScene[sequenceIndex]
            //     })
            // }


            isAnimating = true;
            if (previousSequence) {
                
                changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +previousSequence.split('-')[1], +previousSequence.split('-')[0], () => {
                    changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +currentSequenceToRender.split('-')[0], +currentSequenceToRender.split('-')[1], () => {

                        if (sequenceWaiting) {
                            changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +sequenceWaiting.split('-')[0], +sequenceWaiting.split('-')[1], () => {
                                sequenceWaiting = false;
                                isAnimating = false;
                            })
                        } else {
                            isAnimating = false;
                        }
                    });
                    
                })
            } else {
                changeImageSrcByArrayIndex($itemForImageRender, SEQUENCES.data, +currentSequenceToRender.split('-')[0], +currentSequenceToRender.split('-')[1], () => {
                    isAnimating = false;
                })
            }
            previousSequence = currentSequenceToRender;
          }
        });
    }
      
    const observer = new IntersectionObserver(handleIntersection);

    document.querySelectorAll('.genplan-legend-item').forEach(item => {
        observer.observe(item);
    })

    const legendItemsHeight = Array.from(document.querySelectorAll('.genplan-legend-item, .genplan-legend-item-line')).reduce((acc,el) => {acc+=parseInt(getComputedStyle(el).height); return acc}, 0);



    gsap.set(".screen5-5.infrastructure", { height: legendItemsHeight  });



 
    let currentRenderedIndex = 0;

    $itemForImageRender.src = SEQUENCES.data[currentRenderedIndex];


    gsap.timeline({
        scrollTrigger: {
            scroller: scroller ? scroller : null,
            trigger: ".screen5-5.infrastructure",
            scrub: true,
            end: "100% bottom",
            pin: ".screen5-5__container",
            invalidateOnRefresh: true,
            onUpdate: (e) => {
                console.log(e.progress);

                document.querySelector('.genplan-legend').style.cssText = `--percent: ${ 100 - 20 - e.progress * 100}%`;
                // const indexForRenderingImage = gsap.utils.mapRange(0, 1, 120, SEQUENCES.data.length, e.progress).toFixed(0);
                // if (!SEQUENCES.data[indexForRenderingImage] || currentRenderedIndex == indexForRenderingImage) return;
                // currentRenderedIndex = indexForRenderingImage
                // $itemForImageRender.src = SEQUENCES.data[currentRenderedIndex];

            }
            // end: `${screen1.getBoundingClientRect().height} bottom`
        }  
    })
        .to('.screen5-5__left', {
            y: (legendItemsHeight * -1) + (window.innerHeight)
        })

}


function getHeight(el) {
    return el.getBoundingClientRect().height;
}