[![Node CI](https://github.com/Alatr/build/workflows/Node%20CI/badge.svg)](https://github.com/Alatr/build/actions?query=workflow%3A%22Node+CI%22)
# build
# rihert
# central-park

# Необходимые меры при написании JS-a для SPA
1. Скрипты, которые выполняются для хедера, футера, меню, формы обратной связи в попапе должны быть в отдельном файле
2. Скрипты для страницы выводить в другой файл [pageName].js
3. Желательно, что бы на странице было два скрипта: 
	**общий**, который будет отрабатывать один раз при первом запуске страницы. 
	**индивидуальный**, который будет подтягиваться при переходе по ссылке

------------


# Требования к коду для скрипта страницы
1.  При смене страницы будет запускается событие "page-reloaded", на которое нужно подвязывать отключение всех обработчиков, сброс слайдеров, отключение библиотек, отключение запросов, которые отрабатывают на странице.

Пример удаления обработчика ([дока](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/removeEventListener "дока")):


    window.removeEventListener('click', headerHandler)
    window.removeEventListener('load', pageInit)

`

Пример сброса ,библиотеки: 


    	window.addEventListener('page-reloaded', () => {
    		swiper.destroy();
    		timeline.kill();
    	})