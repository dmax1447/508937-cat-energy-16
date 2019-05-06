'use strict';
// IFFE
(function () {
  const btnBefore = document.querySelector('.slider__tag--before');
  const btnAfter = document.querySelector('.slider__tag--after');
  const sliderImageBefore = document.querySelector('.slider__image-left');
  const sliderImageAfter = document.querySelector('.slider__image-right');

  function changeSlideImage(evt) {
    if (evt.target === btnBefore) {
      sliderImageBefore.classList.remove('slider__image-left--hidden');
      sliderImageAfter.classList.add('slider__image-right--hidden');

    } else {
      sliderImageBefore.classList.add('slider__image-left--hidden');
      sliderImageAfter.classList.remove('slider__image-right--hidden');
    }
  }

  btnBefore.addEventListener('click', changeSlideImage);
  btnAfter.addEventListener('click', changeSlideImage);
})();
