import $ from 'jquery'

class ImageTextPanel {
  constructor(element, options) {
    this.element = $(element)
  }

  init() {
    if (!this.element.length) {
      return
    }
  }
}

const imageTextPanel = new ImageTextPanel('.imageTextPanel')

imageTextPanel.init()
