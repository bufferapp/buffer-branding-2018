import $ from 'jquery'

class Team {
  constructor(element, options) {
    this.element = $(element)
    this.openedRows = 1
  }

  init() {
    if (!this.element.length) {
      return
    }
    this.onClickMore()
  }

  onClickMore() {
    this.element.find('.team__button').on('click', () => {
      this.element
        .find('.team__row')
        .eq(this.openedRows)
        .slideDown()
      this.openedRows++
      if (this.openedRows === this.element.find('.team__row').length) {
        this.element.find('.team__button').fadeOut()
      }
    })
  }
}

const team = new Team('.team')

team.init()
