export default async function buildProgressPopupUpdate(id, popup, onMutation = () => {}) {
    const $container = document.querySelector('.build-cards-wrapper');
    const action = new FormData()
    action.append('action', 'buildProgress');
    action.append('id', id);
    let data = await fetch('https://central-park-wp.smarto.com.ua/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: action
    });
    data = await data.json();
    const text = popup.querySelector('.build-progress-popup__text-content'),
        title = popup.querySelector('.build-progress-popup__title'),
        date = popup.querySelector('.build-progress-popup__date'),
        imgContainer = popup.querySelector('.swiper-wrapper');
    title.textContent = data.date;
    text.innerHTML = data.text.join('<br><br>');

    imgContainer.innerHTML = '';
    data.gallery.forEach(el => {
        imgContainer.innerHTML += `
            <img class="swiper-slide" src="${el}" />
        `;
    })
    console.log(data);


    onMutation();
}