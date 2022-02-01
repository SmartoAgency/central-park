import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import * as THREE from 'three';
import { TweenLite  } from "gsap/all";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
// import sideSwitchArrow from '../'
import imagesLoaded from 'imagesLoaded';
import sideSwitchArrow from "../modules/side-switch-arrow";
import { handleHeader } from "../modules/helpers/helpers";
console.log('f');


innerPageFrontEffect();
window.addEventListener('load',function(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
});
const displacementSlider = function(opts) {
    let vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

    let fragment = `
        
        varying vec2 vUv;

        uniform sampler2D currentImage;
        uniform sampler2D nextImage;

        uniform float dispFactor;

        void main() {

            vec2 uv = vUv;
            vec4 _currentImage;
            vec4 _nextImage;
            float intensity = 0.3;

            vec4 orig1 = texture2D(currentImage, uv);
            vec4 orig2 = texture2D(nextImage, uv);
            
            _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));

            _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

            vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

            gl_FragColor = finalTexture;

        }
    `;

    let images = opts.images, image, sliderImages = [];;
    let canvasWidth = images[0].clientWidth;
    let canvasHeight = window.matchMedia('(max-width: 575px)').matches ? innerWidth * 0.52 : innerHeight;
    let parent = opts.parent;
    let renderWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let renderHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let renderW, renderH;

    if( renderWidth > canvasWidth ) {
        renderW = renderWidth;
    } else {
        renderW = canvasWidth;
    }

    renderH = canvasHeight;

    let renderer = new THREE.WebGLRenderer({
        antialias: false,
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x23272A, 1.0 );
    renderer.setSize( renderW, renderH );
    parent.appendChild( renderer.domElement );

    let loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    images.forEach( ( img ) => {
        // console.log(img.dataset);
        image = loader.load( img.getAttribute( 'data-info-item-anim-img' ));
        // console.log(img.getAttribute( 'data-hover-image' ));
        image.magFilter = image.minFilter = THREE.LinearFilter;
        image.anisotropy = renderer.capabilities.getMaxAnisotropy();
        sliderImages.push( image );

    });
    // console.log(sliderImages);
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x23272A );
    let camera = new THREE.OrthographicCamera(
        renderWidth / -2,
        renderWidth / 2,
        renderHeight / 2,
        renderHeight / -2,
        1,
        1000
    );

    camera.position.z = 1;

    let mat = new THREE.ShaderMaterial({
        uniforms: {
            dispFactor: { type: "f", value: 0.0 },
            currentImage: { type: "t", value: sliderImages[0] },
            nextImage: { type: "t", value: sliderImages[1] },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
    });

    let geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    let object = new THREE.Mesh(geometry, mat);
    object.position.set(0, 0, 0);
    scene.add(object);

    let addEvents = function(){

        let pagButtons = Array.from(document.querySelectorAll('[data-info-item-anim]'));
        let isAnimating = false;

        pagButtons.forEach( (el, index) => {

            el.addEventListener('click', function() {

                if( !isAnimating ) {
 
                    isAnimating = true;

                    document.querySelectorAll('.active')[0].className = '';
                    this.className = 'active';

                    // let slideId = parseInt( this.dataset.slide, 10 );
                    let slideId = index;

                    mat.uniforms.nextImage.value = sliderImages[slideId];
                    mat.uniforms.nextImage.needsUpdate = true;

                    TweenLite.to( mat.uniforms.dispFactor, 1.5, {
                        value: 1,
                        ease: 'Expo.easeInOut',
                        onComplete: function () {
                            mat.uniforms.currentImage.value = sliderImages[slideId];
                            mat.uniforms.currentImage.needsUpdate = true;
                            mat.uniforms.dispFactor.value = 0.0;
                            window.dispatchEvent(new Event('gallery-switch-complete'))
                            isAnimating = false;
                        }
                    });

                    let slideTitleEl = document.getElementById('slide-title');
                    let slideStatusEl = document.getElementById('slide-status');
                    // let nextSlideTitle = document.querySelectorAll(`[data-slide-title="${slideId}"]`)[0].innerHTML;
                    // let nextSlideStatus = document.querySelectorAll(`[data-slide-status="${slideId}"]`)[0].innerHTML;

                    // TweenLite.fromTo( slideTitleEl, 0.5,
                    //     {
                    //         autoAlpha: 1,
                    //         y: 0
                    //     },
                    //     {
                    //         autoAlpha: 0,
                    //         y: 20,
                    //         ease: 'Expo.easeIn',
                    //         onComplete: function () {
                    //             // slideTitleEl.innerHTML = nextSlideTitle;

                    //             // TweenLite.to( slideTitleEl, 0.5, {
                    //             //     autoAlpha: 1,
                    //             //     y: 0,
                    //             // })
                    //         }
                    //     });

                    // TweenLite.fromTo( slideStatusEl, 0.5,
                    //     {
                    //         autoAlpha: 1,
                    //         y: 0
                    //     },
                    //     {
                    //         autoAlpha: 0,
                    //         y: 20,
                    //         ease: 'Expo.easeIn',
                    //         onComplete: function () {
                    //             // slideStatusEl.innerHTML = nextSlideStatus;

                    //             // TweenLite.to( slideStatusEl, 0.5, {
                    //             //     autoAlpha: 1,
                    //             //     y: 0,
                    //             //     delay: 0.1,
                    //             // })
                    //         }
                    //     });

                }

            });

        });

    };

    addEvents();

    window.addEventListener( 'resize' , function(e) {
        renderer.setSize(renderW, renderH);
    });

    let animate = function() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();
};


const el = document.querySelector('.scroller-container');
const paginations = document.querySelectorAll('[data-info-item-anim]');
paginations[0].__proto__.click = function() {
    this.dispatchEvent(new Event('click'));
}
const imgs = Array.from(el.querySelectorAll('[data-info-item-anim-img]'));
new displacementSlider({
    parent: document.querySelector('.front-block__canvas-wrap'),
    images: imgs
});
const currentNavDisplay = document.querySelector('[data-gallery-switcher] text:first-child');
const allNavDisplay = document.querySelector('[data-gallery-switcher] text:last-child');
let currentIndex = 0;
const galleryCanvasWrap = document.querySelector('.front-block__canvas-wrap');
allNavDisplay.textContent = imgs.length;

function addZeroPrefix(index) {
    return index < 10 ? '0'+index.toString() : index;
}
let isAnimatingGallery = false;

sideSwitchArrow(
{
        onNext: () => {
            if (isAnimatingGallery) return;
            isAnimatingGallery = true;
            currentIndex = currentIndex === imgs.length - 1 ? 0 : currentIndex + 1;
            currentNavDisplay.textContent = addZeroPrefix(currentIndex + 1);
            paginations[currentIndex].click();
        },
        onPrev: () => {
            if (isAnimatingGallery) return;
            isAnimatingGallery = true;
            currentIndex = currentIndex === 0 ? imgs.length - 1 : currentIndex - 1;
            currentNavDisplay.textContent = addZeroPrefix(currentIndex + 1);
            paginations[currentIndex].click();
            // console.log('prev');
        },
        notOnMobile: true,
    },
    document.querySelector('[data-gallery-switcher]'),
    galleryCanvasWrap,
    );
    if (window.matchMedia('(max-width: 575px)').matches) {
        document.querySelector('[data-gallery-next]').addEventListener('click', () => {
            if (isAnimatingGallery) return;
            isAnimatingGallery = true;
            currentIndex = currentIndex === imgs.length - 1 ? 0 : currentIndex + 1;
            currentNavDisplay.textContent = addZeroPrefix(currentIndex + 1);
            paginations[currentIndex].click();
            
        })
        document.querySelector('[data-gallery-prev]').addEventListener('click', () => {
            if (isAnimatingGallery) return;
            isAnimatingGallery = true;
            currentIndex = currentIndex === 0 ? imgs.length - 1 : currentIndex - 1;
            currentNavDisplay.textContent = addZeroPrefix(currentIndex + 1);
            paginations[currentIndex].click();
            
        })
    }
    window.addEventListener('gallery-switch-complete',function(evt){
        isAnimatingGallery = false;
});


