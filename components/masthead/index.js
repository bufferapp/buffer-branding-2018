import $ from 'jquery'
import raf from 'raf'

class Masthead {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }

    if (this.element.hasClass('masthead--animate')) {
      setTimeout(() => {
        raf(() => {
          this.element.removeClass('masthead--animate')
        })
      }, 300)
    }
  }
}

$(() => {
  const masthead = new Masthead('.masthead')
  masthead.init()
})
