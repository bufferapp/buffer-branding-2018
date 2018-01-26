import $ from 'jquery'

class Menu {
  constructor(element, options) {
    this.element = $(element)
    this.closeButton = $(options.closeButton)
    this.listItem = $(options.listItem)
    this.body = $(options.body)
  }

  init() {
    if (!this.element.length) {
      return
    }
    this.onClickCloseButton()
    this.onClickListItem()
  }

  onClickCloseButton() {
    this.closeButton.on('click', () => {
      this.element.removeClass('isActive')
      this.body.css({ overflow: '' })
    })
  }

  onClickListItem() {
    this.listItem.on('click', function() {
      if ($(this).next().length) {
        $(this).toggleClass('isActive')
        $(this)
          .next()
          .slideToggle('fast')
      }
    })
  }
}

const menu = new Menu('.menu', {
  closeButton: '.menu__closeButton',
  listItem: '.menu__listItemHeading',
  body: 'body'
})

menu.init()
