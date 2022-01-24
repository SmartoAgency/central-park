import mapStyle from "./map-style";



export default function googleMap() {
    global.initMap = initMap
}

function func() {
    const script = document.createElement('script');
    let key = '';
    if (window.location.href.match(/localhost/)) key = '';
    // const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  // setTimeout(func, 1000);
  const maps = document.querySelectorAll('.map');
  const options = {
    rootMargin: '0px',
    threshold: 0.1,
  };
  
  maps.forEach((image) => {
    const callback = (entries, observer) => {
      /* Content excerpted, show below */
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(image);
          func();
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    const target = image;
    observer.observe(target);
  });
  
  // eslint-disable-next-line no-unused-vars
  function initMap() {
    const gmarkers1 = [];
    //28.4600074, 49.2384203
    const center = {
      lat: 49.2384203,
      lng: 28.4600074,
    };
    /** Массив, куда записываются выбраные категории */
    const choosedCategories = new Set();
    choosedCategories.add('main');
    /** Елементы, при клике на который будет происходить фильтрация */
    const filterItems = document.querySelectorAll('[data-marker]');
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      language: 'en',
      styles : mapStyle()
    });
    var polygonCoords = [
      new google.maps.LatLng(49.2384203, 28.4600074, ),
      new google.maps.LatLng(49.2385850, 28.4598870, ),
      new google.maps.LatLng(49.2391278, 28.4600104, ),
      new google.maps.LatLng(49.2391559, 28.4597287, ),
      new google.maps.LatLng(49.2395569, 28.4598146, ),
      new google.maps.LatLng(49.2398914, 28.4587305, ),
      new google.maps.LatLng(49.2402101, 28.4585212, ),
      new google.maps.LatLng(49.2404903, 28.4572388, ),
      new google.maps.LatLng(49.2405323, 28.4572173, ),
      new google.maps.LatLng(49.2405708, 28.4570617, ),
      new google.maps.LatLng(49.2406269, 28.4571100, ),
      new google.maps.LatLng(49.2407074, 28.4568578, ),
      new google.maps.LatLng(49.2411032, 28.4553017, ),
      new google.maps.LatLng(49.2413588, 28.4553822, ),
      new google.maps.LatLng(49.2418737, 28.4543252, ),
      new google.maps.LatLng(49.2421679, 28.4565466, ),
      new google.maps.LatLng(49.2414464, 28.4570725, ),
      new google.maps.LatLng(49.2415410, 28.4585856, ),
      new google.maps.LatLng(49.2409876, 28.4598519, ),
      new google.maps.LatLng(49.2409666, 28.4603349, ),
      new google.maps.LatLng(49.2410541, 28.4607534, ),
      new google.maps.LatLng(49.2412958, 28.4608070, ),
      new google.maps.LatLng(49.2412503, 28.4612041, ),
      new google.maps.LatLng(49.2409526, 28.4611194, ),
      new google.maps.LatLng(49.2399509, 28.4613447, ),
      new google.maps.LatLng(49.2398844, 28.4617268, ),
      new google.maps.LatLng(49.2395621, 28.4616088, ),
      new google.maps.LatLng(49.2393310, 28.4617161, ),
      new google.maps.LatLng(49.2394220, 28.4609649, ),
      new google.maps.LatLng(49.2387216, 28.4607395, ),
      new google.maps.LatLng(49.2386795, 28.4602459, ),
      new google.maps.LatLng(49.2384449, 28.4601344, ),
      new google.maps.LatLng(49.2384273, 28.4600110, ),
    ];
    var polygon = new google.maps.Polygon({
      path: polygonCoords, // Координаты
      // strokeColor: '#FF0000',
      strokeOpacity: 0,
      // strokeWeight: 1.5,
      fillColor: '#E5CDB7',
      fillOpacity: 1
  });

  //Добавляем на карту
  polygon.setMap(map);

    const filterMarkers = function (category, categoriesArray) {
      gmarkers1.forEach((el) => {
        if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
          el.setMap(map);
          el.setAnimation(google.maps.Animation.DROP);
        } else {
          el.setMap(null);
        }
      });
    };
    filterItems.forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.stopImmediatePropagation();
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
          choosedCategories.add(item.dataset.category);
        } else {
          choosedCategories.delete(item.dataset.category);
        }
        filterMarkers('main', choosedCategories);
      });
    });
  
    // var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
    const baseFolder = './assets/images/markers/';
    let defaultMarkerSize = new google.maps.Size(40, 53);
    if (document.documentElement.clientWidth < 950) {
      // defaultMarkerSize = new google.maps.Size(40, 53);
    }
    const buildLogoSize = new google.maps.Size(125, 55);
    const markersAdresses = {
      main: `${baseFolder}main.svg`,
      cafe: `${baseFolder}cafe.svg`,
      kinder: `${baseFolder}kindergarten.svg`,
      shop: `${baseFolder}shop.svg`,
      sport: `${baseFolder}sport.svg`,
      school: `${baseFolder}school.svg`,
      meal: `${baseFolder}meal.svg`,
      med: `${baseFolder}medicine.svg`,
      bank: `${baseFolder}bank.svg`,
    };
    const markerPopupStyle = `
          style="
          background: #2D2D2D;
          color:#fff;
          padding:5px 10px;
          font-size: 18px;
          line-height: 22px;"
          `;
  
  
    /* beautify preserve:start */
  const markersData =[
    {
        content: `<img style="background:white" src="${markersAdresses.main}">`,
        position: { lat: 48.4605169, lng: 35.0525155 },
        type: 'main',
        zIndex: 1000,
        icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      },
      {
        content: `<div ${markerPopupStyle}>Apricot private kindergarten</div>`,
        type: 'school',
        icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
        position: { lat: 48.465315387607184, lng: 35.057751142925454 },
      },
      {
        content: `<div ${markerPopupStyle}>Середня школа №21</div>`,
        type: 'school',
        icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
        position: { lat: 48.46599832746873, lng: 35.035520993734906 },
      },
      {
        content: `<div ${markerPopupStyle}>Specialized School № 71</div>`,
        type: 'school',
        icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
        position: { lat: 48.453248601385674, lng: 35.05303045487341 },
      },
      {
        content: `<div ${markerPopupStyle}>Public School № 19</div>`,
        type: 'school',
        icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
        position: { lat: 48.47094936663253, lng: 35.04204412631592 },
      },
      {
        content: `<div ${markerPopupStyle}>Public School # 23</div>`,
        type: 'school',
        icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
        position: { lat: 48.456664020583055, lng: 35.064875090349446 },
      },
      {
        content: `<div ${markerPopupStyle}>СЕРЕДНЯ ЗАГАЛЬНООСВІТНЯ ШКОЛА №18-ЗАГАЛЬНООСВІТНІЙ НАВЧАЛЬНИЙ ЗАКЛАД І-ІІІ СТУПЕНІВ</div>`,
        type: 'school',
        icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
        position: { lat: 48.46161597031695, lng: 35.04504820053086 },
      },
    ];  
  /* beautify preserve:end */
    const infowindow = new google.maps.InfoWindow({
      content: '',
      maxWidth: 200,
    });
    markersData.forEach((marker) => {
      const category = marker.type;
      const mapMarker = new google.maps.Marker({
        map,
        category,
        zIndex: marker.zIndex || 1,
        icon: marker.icon,
        position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      });
  
      google.maps.event.addListener(mapMarker, 'click', function () {
        infowindow.setContent(marker.content);
        infowindow.open(map, mapMarker);
        map.panTo(this.getPosition());
      });
      mapMarker.name = marker.type;
      gmarkers1.push(mapMarker);
    });
  }
  