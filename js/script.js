// Navigation within page
$('.hero').on('click','a',function(e){
    e.preventDefault();
    var id = $(this).attr("href"),
        topSpace = 30;
    $('html, body').animate({
      scrollTop: $(id).offset().top - topSpace
    }, 800);
});

// Menu items (active toggling)
$(".menu-items a").click(function() {
    $(".menu-items a").each((index ,item) => {
        $(item).removeClass("active");
    });
    $(this).addClass("active");
});

// Menu bar toggle
$('#menu-bar').click( function(e) {
	e.preventDefault();
	$('.sm-menu').toggleClass('show');
})

// Frequently asked questions
$('.faq-list .questions-holder .question').click( function() {
    $(this).parent().find('.answer').slideToggle('fast');
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        $(this).find('.sign').removeClass('fa-plus').addClass('fa-minus');
        $(this).find('a').addClass('active');
    } else {
        $(this).find('.sign').removeClass('fa-minus').addClass('fa-plus');
        $(this).find('a').removeClass('active');
    }
    // return false;
});

// Tools panel
const tabPanel = () => {
    $(".tab-panel").hide();
    $(".tab-panel:first").show();
    $(".tabs a").click(function() {
        $(".tab-panel").hide();
        var activeTab = $(this).attr("aria-controls");
        $("#"+activeTab).fadeIn();
          if($(this).attr("aria-controls") == "development-panel"){
              $('.tabs').addClass('slide');
          }else{
              $('.tabs').removeClass('slide');
          }
        $(".tabs a").removeClass("active");
        $(this).addClass("active");
    });
}
  
// Slider
const slider = () => {

    // Properties

    const slides = document.querySelectorAll('.slide-items');
    const btnLeft = document.querySelector('.left-btn');
    const btnRight = document.querySelector('.right-btn');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions (methods)

    const createDots = () => {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide="${i}"></button>`
        );
    });
    };

    const activateDot = (slide) => {
    document
        .querySelectorAll('.dots-dot')
        .forEach(dot => dot.classList.remove('dots-dot--active'));

    document
        .querySelector(`.dots-dot[data-slide="${slide}"]`)
        .classList.add('dots-dot--active');
    };

    const goToSlide = (slide) => {
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    };

    const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
    };

    const prevSlide = () => {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    };

    const init = () => {
    goToSlide(0);
    createDots();

    activateDot(0);
    };

    init();

    // Event handlers

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots-dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
    });
};

// Modal
const modal = () => {
    
    // Get the modal
  let modal = document.getElementById('modal');
  // Get the image and insert it inside the modal
  let imgs = document.querySelectorAll('.work-img');
  let modalImg = document.getElementById("modal-img");
  let caption = document.getElementById("caption");
  
  imgs.forEach((img) => {
      img.onclick = function(){
          modal.style.display = "block";
          modalImg.src = this.src;
          modalImg.alt = this.alt;
          caption.innerText = this.alt;
      }
  })
  
  
  // When the user clicks anywhere on the page, close the modal
  modal.onclick = () => {
      modalImg.className += ' zoom-out';
      setTimeout(function() {
         modal.style.display = "none";
         modalImg.className = "modal-content";
       }, 300);
  }

}

const init = () => {
    slider();
    modal();
    tabPanel();
};

init();


// Preloader
$(document).ready( function() {
    setTimeout(() => {
        $('#preloader').css("display", "none");
    }, 1000);
})