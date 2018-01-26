import $ from 'jquery'

class Carousel {
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
    let carousel = $(element).find('.carousel__cardsContainer')
    let centerSlide

    carousel.slick({
      slidesToShow: 3,
      infinite: true,
      prevArrow: $(element).find('.carousel__previousButton'),
      nextArrow: $(element).find('.carousel__nextButton'),
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            infinite: true,
            prevArrow: $(element).find('.carousel__previousButton'),
            nextArrow: $(element).find('.carousel__nextButton')
          }
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            infinite: true,
            prevArrow: $(element).find('.carousel__previousButton'),
            nextArrow: $(element).find('.carousel__nextButton')
          }
        },
        {
          breakpoint: 614,
          settings: {
            slidesToShow: 1,
            infinite: true,
            prevArrow: $(element).find('.carousel__previousButton'),
            nextArrow: $(element).find('.carousel__nextButton')
          }
        }
      ]
    })
  }
}

const carousel = new Carousel('.carousel')

carousel.init()
