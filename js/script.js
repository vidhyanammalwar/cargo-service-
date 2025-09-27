/*
|--------------------------------------------------------------------------
| Template Name: BizPeak
| Author: Amin
| Version: 1.0.0
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| TABLE OF CONTENTS:
|--------------------------------------------------------------------------
|
| 1. Preloader
| 2. Popup Modal Box
| 3. Header
 | 3.1 Sticky Header : make header sticky and lighter background
 | 3.2 Scroll Up And Down event For Header And GoToTopButton
 | 3.3 Mobile Menu : Toggle Dropdown For Mobile Device On Navigation
| 4. Swiper Slider
  | 4.1 home-business-consultancy
  | 4.2 home-digital-agency
  | 4.3 Review 1
  | 4.4 Review 2
  | 4.5 insights
| 5. Portfolio isotope and filter
| 6. Jarallax Parallax Effect
| 7. Initiate AOS
| 8. Initiate GLightbox
| 8. PureCounter
*/

/*--------------------------------------------------------------
  Scripts initialization
--------------------------------------------------------------*/


/*--------------------------------------------------------------
1. Preloader
--------------------------------------------------------------*/

window.addEventListener("load", () => {
  // You can Use your preloader code here
})

/*--------------------------------------------------------------
2. Popup Modal
--------------------------------------------------------------*/
// Open Popup With Animation.css
function popup(id) {
  document.querySelector(id).classList.add("animate__bounceInUp", "open")
}
function popupclose(id) {
  document.querySelector(id).classList.remove("animate__bounceInUp")
  document.querySelector(id).classList.add("animate__bounceOutUp")
  setTimeout(() => {
    document.querySelector(id).classList.remove("open")
    document.querySelector(id).classList.remove("animate__bounceOutUp")
  }, 1000);
}

/*--------------------------------------------------------------
3. Header
--------------------------------------------------------------*/
/*--------------------------------------------------------------
3.1. Sticky Header : make header sticky and lighter background
--------------------------------------------------------------*/
var scrtop;
window.addEventListener("scroll", function () {
  scrtop = document.documentElement.scrollTop;
  let move = Math.floor(scrtop)
  if (scrtop > 100) {
    document.querySelector(".scroll-header").classList.add("light")
  } else {
    document.querySelector(".scroll-header").classList.remove("light")
  }
  if (move < 450) {
    document.querySelector(".move").style.setProperty("--no", move)
  } else {
    document.querySelector(".move").style.setProperty("--no", 450)
  }
});
/*--------------------------------------------------------------
3.2. Scroll Up And Down event For Header And GoToTopButton
--------------------------------------------------------------*/
var scrollBefore = 0;
window.addEventListener('scroll', function (e) {
  const scrolled = window.scrollY;

  if (scrollBefore > scrolled) {
    if (scrolled > 100) {
      scrollBefore = scrolled;
      document.querySelector('.scroll-header').classList.add("show")
      document.querySelector("#gotop").classList.add("show")
    } else {
      document.querySelector("#gotop").classList.remove("show")
      document.querySelector('.scroll-header').classList.remove("show")
    }
  } else {
    scrollBefore = scrolled;
    document.querySelector("#gotop").classList.remove("show")
    document.querySelector('.scroll-header').classList.remove("show")
  }
});

/*--------------------------------------------------------------
3.3. Mobile Menu : Toggle Dropdown For Mobile Device On Navigation
--------------------------------------------------------------*/
document.querySelectorAll(".dropdown-toggle-btns").forEach(innerdropdown => {
  innerdropdown.addEventListener("click", () => {
    innerdropdown.classList.toggle("active")
  })
});

var element = document.querySelector('.navbar-toggler');
var observer = new MutationObserver(function () {
  document.body.classList.toggle("scroll-off")
});
observer.observe(element, {
  attributes: true //configure it to listen to attribute changes
});
/*--------------------------------------------------------------
4. Slider Swiper
--------------------------------------------------------------*/
/*--------------------------------------------------------------
4.1 home-business-consultancy
--------------------------------------------------------------*/
var mySwiper = new Swiper(".home-business-consultancy", {
  loop: true,
  speed: 800,
  parallax: true,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-100%", 0, -1],
    },
    next: {
      translate: ["100%", 0, 1],
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/*--------------------------------------------------------------
4.2 home-digital-agency
--------------------------------------------------------------*/
var mySwiper2 = new Swiper(".home-digital-agency", {
  loop: true,
  speed: 1000,

  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: false,
      origin: "left center",
      translate: ["-100%", "0%", 1],
      rotate: [0, -50, 0],
    },
    next: {
      shadow: false,
      origin: "left center",
      translate: ["0%", "0%", -1],
      rotate: [0, 50, 0],
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      let img = document.querySelector('[data-slider-pos="' + (index + 1) + '"]');

      let bg = img.src;
      return '<span style="--bg:url(' + bg + ');" class="' + className + ' slider-points"></span>';
    },
  },
});
/*--------------------------------------------------------------
4.3 Review 1
--------------------------------------------------------------*/
var swiper = new Swiper(".review", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },

});
/*--------------------------------------------------------------
4.4 Review 2
--------------------------------------------------------------*/
var swiper = new Swiper(".review2", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});
/*--------------------------------------------------------------
4.5 insights
--------------------------------------------------------------*/
var insights = new Swiper(".insights", {
  centeredSlides: true,
  loop: true,
  speed: 800,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

/*--------------------------------------------------------------
5. Portfolio isotope and filter
--------------------------------------------------------------*/
let portfolionIsotope = document.querySelector('.portfolio-isotope');

if (portfolionIsotope) {

  let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
  let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
  let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

  window.addEventListener('load', () => {
    let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
      itemSelector: '.portfolio-item',
      layoutMode: portfolioLayout,
      filter: portfolioFilter,
      sortBy: portfolioSort
    });

    let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
    menuFilters.forEach(function (el) {
      el.addEventListener('click', function () {
        document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aos_init === 'function') {
          aos_init();
        }
      }, false);
    });

  });

}

/*--------------------------------------------------------------
6. Jarallax Parallax Effect
--------------------------------------------------------------*/
// jarallax(document.querySelectorAll('.jarallax'), {

// });

/*--------------------------------------------------------------
7. Initiate AOS
--------------------------------------------------------------*/
AOS.init({
  once: true,
  duration: 600,
});

/*--------------------------------------------------------------
8. Initiate GLightbox
--------------------------------------------------------------*/
const glightbox = GLightbox({
  selector: '.glightbox'
});

/*--------------------------------------------------------------
8. PureCounter
--------------------------------------------------------------*/
new PureCounter();


// dark mode toggler
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
  const body = document.body;
  if (darkModeToggle.checked) {
    body.classList.add('dark');
    window.localStorage.setItem("theme-mode", "dark")
  } else {
    body.classList.remove('dark');
    window.localStorage.setItem("theme-mode", "light")
  }
});
function refresh() {
  if (window.localStorage.getItem("theme-mode")) {
    if (window.localStorage.getItem("theme-mode") == "dark") {
      const body = document.body;
      body.classList.add('dark');
      darkModeToggle.checked == true
    }
  }
}
refresh()