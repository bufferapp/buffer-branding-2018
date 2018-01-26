import $ from 'jquery'
import YouTubePlayer from 'youtube-player'
import ScrollTrigger from 'scrolltrigger-classes'

class Board {
  constructor(element, options) {
    this.element = $(element)
    this.videoCloseButton = $(options.videoCloseButton)
    this.videoPlayButton = $(options.videoPlayButton)

    if (this.element.hasClass('board-animate')) {
      const trigger = new ScrollTrigger(
        {
          toggle: {
            visible: 'is-visible',
            hidden: 'is-hidden'
          },
          addHeight: true,
          once: true
        },
        document.body,
        window
      )
    }
  }

  init() {
    if (!this.element.length) {
      return
    }

    if (this.element.data('youtubeUrl')) {
      this.youtubeUrl = this.element.data('youtubeUrl')
      this.youtubeId = this.getYoutubeId(this.youtubeUrl)
      this.player = YouTubePlayer('player1', {
        videoId: this.youtubeId
      })
      this.onCloseVideo()
      this.onOpenVideo()
    }
  }

  getYoutubeId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = url.match(regExp)
    if (match && match[2].length == 11) {
      return match[2]
    } else {
      return false
    }
  }

  onCloseVideo() {
    this.videoCloseButton.on('click', () => {
      $('body').css({ overflow: '' })
      this.element.removeClass('isPlaying')
      this.player.stopVideo()
    })

    $(document).on('click', e => {
      $('body').css({ overflow: '' })
      if (this.element.hasClass('isPlaying')) {
        this.element.removeClass('isPlaying')
        this.player.stopVideo()
      }
    })
  }

  onOpenVideo() {
    this.videoPlayButton.on('click', () => {
      $('body').css({ overflow: 'hidden' })
      this.element.addClass('isPlaying')
      this.player.playVideo()
      return false
    })
  }
}

$(() => {
  $('.board').map((index, el) => {
    let board = new Board(el, {
      videoPlayButton: '.board__videoPlayButton',
      videoCloseButton: '.board__videoCloseButton'
    })
    board.init()
  })
})
