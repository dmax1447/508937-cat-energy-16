'use strict';
// IFFE
(function () {

  const menuBtn = document.querySelector('.page-header__btn');
  const menuIcon = document.querySelector('.btn-icon');
  const menu = document.querySelector('.menu-list');
  const mainNav = document.querySelector('.main-nav');

  function menuBtnClick() {
    menu.classList.toggle('menu-list--hidden');
    menuIcon.classList.toggle('btn-icon--close');
    if (mainNav.classList.contains('main-nav--bg-cat')) {
      mainNav.classList.toggle('main-nav--bg-cat-shift');
    }
  };

  function init() {
    const myMap = new ymaps.Map( // создаем новую карту
        'yandex-map', {
          center: [59.938685, 30.319717],
          zoom: 16
        }, {
          searchControlProvider: 'yandex#search'
        }
      ),
      myPlacemark = new ymaps.Placemark( // создаем свою метку на картк
        [59.938631, 30.323055], {
          balloonContent: 'CatEnergy'
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/map-pin.png',
          iconImageSize: [113, 106],
          iconImageOffset: [-57, -100]
        }
      );
    myMap.geoObjects.add(myPlacemark); //добавляем свою метку на карту
  };

  menuBtn.addEventListener('click', menuBtnClick);
  ymaps.ready(init);
})();
