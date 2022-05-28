export default async function buildProgressCardRenderer() {
    const $container = document.querySelector('.build-cards-wrapper');
    const action = new FormData()
    action.append('action', 'Constructions');
    let data = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: action
    })
    data = await data.json();
    console.log(data);

    $container.innerHTML = '';
    data.forEach(card => {
        $container.insertAdjacentHTML('afterbegin', getCard(card))
    })
    window.dispatchEvent(new Event('dom-update'));
    function getCard(config) {
        const {id, data} = config;
        console.log(data);
        return `
            <div class="build-card" data-id="${id}">
                <div class="build-card__img"> <img src="${data.gallery[0]}" alt=""></div>
                <div class="build-card__text">
                    <div class="build-card__span">${data.nameMonth}</div>
                    <div class="build-card__span">${data.day}.${data.month}.${data.year}</div>
                </div>
            </div>
        `;
    }
}