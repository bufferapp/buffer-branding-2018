import $ from 'jquery'

class Testimonials {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }
    this.element.map((index, el) => {
      this.initCarousel(el)
    })
  }

  initCarousel(element) {
    let testimonials = $(element).find('.testimonials__cardsContainer')
    let centerSlide

    testimonials.slick({
      slidesToShow: 3,
      infinite: true,
      prevArrow: $(element).find('.testimonials__previousButton'),
      nextArrow: $(element).find('.testimonials__nextButton'),
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            infinite: true,
            prevArrow: $(element).find('.testimonials__previousButton'),
            nextArrow: $(element).find('.testimonials__nextButton')
          }
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            infinite: true,
            prevArrow: $(element).find('.testimonials__previousButton'),
            nextArrow: $(element).find('.testimonials__nextButton')
          }
        },
        {
          breakpoint: 614,
          settings: {
            slidesToShow: 1,
            infinite: true,
            prevArrow: $(element).find('.testimonials__previousButton'),
            nextArrow: $(element).find('.testimonials__nextButton')
          }
        }
      ]
    })
  }
}

const testimonials = new Testimonials('.testimonials')

testimonials.init()
