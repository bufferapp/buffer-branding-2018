import $ from 'jquery'

class ListCard {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }
  }
}

const listCard = new ListCard('.listCard')

listCard.init()
