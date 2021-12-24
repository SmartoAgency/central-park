console.log('laoder');

let loaderStatus = {
    isCounterAnim: true,
    isDOMLoaded: false,
}
function scaleTo1(el) {
    const path = el;
    let value = 1;
    function render(value) {
        path.style.transform = `scaleY(${value})`;
        if (value <= 0.15) {
            el.parentElement.classList.add('transformed');

        }
        if(value <= 0.025) {
            // document.querySelector('.loader>svg').style.opacity = 0;
            loaderStatus.isCounterAnim = false;
            return;
        };
        const newValue = value - 0.01;
        requestAnimationFrame(() => {
            render(newValue);
        });
    }

    render(value);
}


function digitLoader() {
    const el = document.querySelector('.loader__counter');
    let value = 0;

    function render(value) {
        if (value >= 101) {
            
            document.querySelector('.loader__lines').classList.remove('gradient');
            linesTo0();
            return;
        };
        let newValue = value + 1;
        el.textContent = value;
        requestAnimationFrame(() => {
            render(newValue);
        })
    }
    render(value);
}
digitLoader();

function linesTo0() {
    for (let index = 0; index < document.querySelectorAll('.loader path').length; index++) {
        const element = document.querySelectorAll('.loader path')[index];
        scaleTo1(element);
    }
}

let interval = setInterval(() => {
    if (loaderStatus.isCounterAnim === false && loaderStatus.isDOMLoaded === true) {
        document.querySelector('.loader').classList.add('hidden');
        window.dispatchEvent(new Event('preloaderOff'))
        clearInterval(interval);
    }
}, 100);
window.addEventListener('load',function(evt){
    loaderStatus.isDOMLoaded = true;
});