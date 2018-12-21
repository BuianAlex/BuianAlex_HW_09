"use strict";

var anchors = document.querySelectorAll('a[href*="#"]');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop2 = function _loop2() {
    var anchor = _step.value;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var blockID = anchor.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  for (var _iterator = anchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop2();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var navLink = document.getElementById('main-nav').querySelectorAll('a');
navLink.forEach(function (element, index) {
  element.addEventListener('click', function () {
    var nav = document.getElementById('main-nav');

    if (nav.classList.contains('nav-modal')) {
      document.querySelector('.burger').classList.remove('burger-active');
      nav.classList.toggle('show');
    }
  });
});
document.querySelector('.burger-wraper').addEventListener('click', function () {
  toggleNav();
});

function toggleNav() {
  var burger = document.querySelector('.burger');
  burger.classList.toggle('burger-active');

  if (burger.classList.contains('burger-active')) {
    document.querySelector('.burger-label').innerHTML = 'close';
  } else {
    document.querySelector('.burger-label').innerHTML = 'menu';
  }

  var x = document.getElementById("main-nav");
  document.getElementById('main-nav').classList.toggle('show');
}

(function () {
  if (document.getElementsByClassName("slider-wraper").length !== 0) {
    var slideIndex;
    var timer;

    (function () {
      var currentSlide = function currentSlide(n) {
        clearTimeout(timer);
        showSlides(slideIndex = n);
      };

      var showSlides = function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("slide");
        var dots = document.getElementsByClassName("dot");

        if (n > slides.length) {
          slideIndex = 1;
        }

        if (n < 1) {
          slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }

        if (dots.length != 0) {
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" dotActive", "");
          }

          dots[slideIndex - 1].className += " dotActive";
        }

        var slideImg = slides[slideIndex - 1].querySelector('img');

        if (slideImg.getAttribute('src') === null) {
          var srcSlide = slideImg.getAttribute('data-src');
          slideImg.setAttribute('src', "./img/".concat(srcSlide));
        }

        slides[slideIndex - 1].style.display = "block";
        timer = setTimeout(function () {
          slideIndex++;
          showSlides(slideIndex);
        }, 4000);
      };

      var slides = document.querySelectorAll(".slide").length;

      if (document.querySelector(".slider-dots") != null) {
        var dotWraper = document.querySelector(".slider-dots");

        var _loop = function _loop(index) {
          var dot = document.createElement("span");
          dot.classList.add("dot");
          dot.addEventListener('click', function () {
            currentSlide(index + 1);
          });
          dotWraper.appendChild(dot);
        };

        for (var index = 0; index < slides; index++) {
          _loop(index);
        }
      }

      var slidePrev = document.querySelector('.slide-prev');

      if (slidePrev != null) {
        slidePrev.addEventListener('click', function () {
          currentSlide(slideIndex - 1);
        });
      }

      var slideNext = document.querySelector('.slide-next');

      if (slideNext != null) {
        slideNext.addEventListener('click', function () {
          currentSlide(slideIndex + 1);
        });
      }

      slideIndex = 1;
      showSlides(slideIndex);
    })();
  }
})();