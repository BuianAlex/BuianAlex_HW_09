
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href')

    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
let navLink = document.getElementById('main-nav').querySelectorAll('a');
navLink.forEach(function (element, index) {
  element.addEventListener('click', function () {
    let nav = document.getElementById('main-nav');
    if (nav.classList.contains('nav-modal')) {
      document.querySelector('.burger').classList.remove('burger-active');
      nav.classList.toggle('show');
    }
  });
});



document.querySelector('.burger-wraper').addEventListener('click', function () {
  toggleNav()
});

function toggleNav() {
  document.querySelector('.burger').classList.toggle('burger-active');
  var x = document.getElementById("main-nav");

  document.getElementById('main-nav').classList.toggle('show');

}

(function () {

  if (document.getElementsByClassName("slider-wraper").length !== 0) {
    let slides = document.querySelectorAll(".slide").length;

    if (document.querySelector(".slider-dots") != null) {
      let dotWraper = document.querySelector(".slider-dots");
      for (let index = 0; index < slides; index++) {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener('click', function () {
          currentSlide(index + 1);
        });
        dotWraper.appendChild(dot);
      }
    }
    let slidePrev = document.querySelector('.slide-prev');
    if (slidePrev != null) {
      slidePrev.addEventListener('click', function () {
        currentSlide(slideIndex - 1);
      });
    }
    let slideNext = document.querySelector('.slide-next');
    if (slideNext != null) {
      slideNext.addEventListener('click', function () {
        currentSlide(slideIndex + 1);
      });
    }


    var slideIndex = 1;
    var timer;
    showSlides(slideIndex);

    function currentSlide(n) {
      clearTimeout(timer);
      showSlides(slideIndex = n);
    }


    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("slide");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      if (dots.length != 0) {
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" dotActive", "");
        }
        dots[slideIndex - 1].className += " dotActive";
      }


      let slideImg = slides[slideIndex - 1].querySelector('img');

      if (slideImg.getAttribute('src') === null) {
        let srcSlide = slideImg.getAttribute('data-src');
        slideImg.setAttribute('src', `./img/${srcSlide}`);
      }
      slides[slideIndex - 1].style.display = "block";

      timer = setTimeout(function () {
        slideIndex++;
        showSlides(slideIndex);
      }, 4000);
    }

  }
}());
