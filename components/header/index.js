import $ from 'jquery'
import Headroom from 'headroom.js'
import raf from 'raf'

class Header {
  constructor(element, options) {
    this.element = $(element)
    this.hamburger = $(options.hamburger)
    this.navItem = $(options.navItem)
    this.menu = $(options.menu)
    this.body = $(options.body)
  }

  init() {
    if (!this.element.length) {
      return
    }
    this.initHeadroom()
    this.onClickHamburger()
    this.onClickNavItem()

    if (this.element.hasClass('header--animate')) {
      setTimeout(() => {
        raf(() => {
          this.element.removeClass('header--animate')
        })
      }, 200)
    }
  }

  onClickHamburger() {
    this.hamburger.on('click', () => {
      this.menu.addClass('isActive')
      this.body.css('overflow', 'hidden')
    })
  }

  onClickNavItem() {
    let self = this
    this.navItem.on('click', function(e) {
      e.preventDefault()
      e.stopPropagation()
      if ($(this).hasClass('isActive')) {
        $(this).removeClass('isActive')
      } else {
        self.navItem.removeClass('isActive')
        $(this).addClass('isActive')
      }
    })

    $(document).on('click', e => {
      this.navItem.removeClass('isActive')
    })
  }

  initHeadroom() {
    const headroom = new Headroom(this.element[0], {
      classes: {
        // when element is initialised
        initial: 'header',
        // when scrolling up
        pinned: 'header--pinned',
        // when scrolling down
        unpinned: 'header--unpinned',
        // when above offset
        top: 'header--top',
        // when below offset
        notTop: 'header--notTop',
        // when at bottom of scoll area
        bottom: 'header--bottom',
        // when not at bottom of scroll area
        notBottom: 'header--notBottom'
      },
      tolerance: {
        down: 10,
        up: 20
      }
    })

    headroom.init()
  }
}

$(() => {
  const header = new Header('.header', {
    menu: '.menu',
    hamburger: '.header__hamburger',
    navItem: '.header__primaryNavItem',
    body: 'body'
  })

  header.init()
})
