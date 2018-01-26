import $ from 'jquery'
import ScrollTrigger from 'scrolltrigger-classes'

$(() => {
  if ($('.logowall[data-scroll]')) {
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
})
