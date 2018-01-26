import $ from 'jquery'

class Brochure {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }
  }
}

const brochure = new Brochure('.brochure')

brochure.init()
