import innerPageFrontEffect from "../modules/inner-pages/inner-page-front-effect";
import locoScroll from '../modules/smooth-scrolls/locoScroll';
import { handleHeader } from "../modules/helpers/helpers";

innerPageFrontEffect();
window.addEventListener('load',function(evt){
      const scroller = locoScroll('.scroller-container');
    scroller.update();
    handleHeader(scroller);
    window.scroller = scroller;
});

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  function describeArc(x, y, radius, startAngle, endAngle){
  
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
  
      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
          "L", x,y,
          "L", start.x, start.y
      ].join(" ");
  
      return d;       
  }

document.querySelectorAll('[data-build-arc]').forEach(path => {
    const { buildArc } = path.dataset;
    const degreesToPercentRatio = buildArc * 360 / 100;
    path.setAttribute('d', describeArc(125,125,125,0, degreesToPercentRatio))
    console.log(buildArc);
})