import $ from 'jquery'

class Faq {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }
    this.onItemClick()
  }

  onItemClick() {
    $('.faq__item').on('click', function() {
      $(this)
        .find('.faq__answer')
        .slideToggle('fast')
      $(this).toggleClass('isActive')
    })
  }
}

const faq = new Faq('.faq')

faq.init()
