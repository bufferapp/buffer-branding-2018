import $ from 'jquery'

class Newsletter {
  constructor(element, options) {
    this.element = $(element)
    this.message = $(options.message)
  }

  init() {
    if (!this.element.length) {
      return
    }
    this.onClickSubmit()
  }

  // handle submit event
  onClickSubmit() {
    this.element.on('submit', e => {
      e.preventDefault()
      let email = e.target.EMAIL.value
      // POST to mailchimp
      $.ajax({
        url:
          '//digitalsurgeons.us1.list-manage.com/subscribe/post-JSON?u=6a140f08bdc3761f4eea1d618&id=1b02667153&c=?',
        dataType: 'jsonp',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: {
          EMAIL: email
        }
      })
        .done(response => {
          const msg = 'Thank you for subscribing!'
          this.message.text(msg)
          this.message.fadeIn('slow', function() {
            $(this)
              .delay(5000)
              .fadeOut('slow')
          })
        })
        .fail(err => {
          console.log(err)
        })
    })
  }
}

const newsletter = new Newsletter('.newsletter', {
  message: '.newsletter__message'
})

newsletter.init()
