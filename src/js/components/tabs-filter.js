$(function () {
  $('.tab-filter').slick({
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    infinite: false,
    variableWidth: true,
    focusOnSelect: true,
    prevArrow: "<img class='a-left control-c prev slick-prev prev-tabs' src='./assets/img/icons/Previous.svg'>",
    nextArrow: "<img class='a-right control-c next slick-next next-tabs' src='./assets/img/icons/Next.svg'>",
    // afterChange: function (slider, index) {
    //   if (index == 0) {
    //     $('.slick-prev').css('display', 'none')
    //   }
    //   else {
    //     $('.slick-prev').css('display', 'block')
    //   }
    // },
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows:false
        }
      }
    ],
  });
});
/*
var tabfilter = (function($) {

  var context = {
    posts: [],
    $el: null
  }

  var buildComponent = function() {
  }

  $(function() {

    context.$el = $(".tab-filder")
    // initalize
    $.ajax({}).done(function() {
      context.posts = posts;

    })
  })

  return {
    posts: context.posts
  }
})(jQuery);

(function() {

})(jQuery);

tabFiler = a()
a().a
tabFiler.a

function a ($) {
  var a = 2;
}

a(jQuery)

a // undefined

var a = function() {

}

function a () {
  return {
    a: hello
  }
}

a().a
*/