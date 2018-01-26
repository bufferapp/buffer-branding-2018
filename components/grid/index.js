import $ from 'jquery'

class Grid {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }
  }
}

const grid = new Grid('.grid')

grid.init()
