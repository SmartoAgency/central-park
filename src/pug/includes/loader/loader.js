console.log('laoder');

let loaderStatus = {
    isCounterAnim: true,
    isDOMLoaded: false,
}
function scaleTo1(el) {
    const path = el;
    let value = 0;
    function render(value) {
        path.style.transform = `scaleY(${value})`;
        if(value >= 1) return;
        const newValue = value + 0.01;
        requestAnimationFrame(() => {
            render(newValue);
        });
    }

    render(0);
}
function digitLoader() {
    const el = document.querySelector('.loader__counter');
    let value = 0;

    function render(value) {
        if (value >= 101) {
            loaderStatus.isCounterAnim = false;
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
for (let index = 0; index < document.querySelectorAll('.loader path').length; index++) {
    const element = document.querySelectorAll('.loader path')[index];
    setTimeout(() => {
        scaleTo1(element);
    }, index * 100);
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