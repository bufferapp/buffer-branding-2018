import $ from 'jquery'
import 'rangeslider.js'

class Plans {
  constructor(element, options) {
    this.element = $(element)
    this.rangeDeltaUsers = 0
    this.rangeDeltaProfiles = 0
  }

  init() {
    if (!this.element.length) {
      return
    }

    if ($('.plans__rangeGroup').length) {
      this.initRangeSlider()
    }
  }

  initRangeSlider() {
    let currentValue = 1
    let self = this
    let multiplier
    let delta
    let type

    this.businessPriceEl = this.element.find('.js-business')
    this.professionalPriceEl = this.element.find('.js-professional')
    this.professionalStartingPrice = parseInt(
      this.professionalPriceEl.text().match(/\d+/)[0]
    )
    this.businessStartingPrice = parseInt(
      this.businessPriceEl.text().match(/\d+/)[0]
    )
    $('input[type="range"]').rangeslider({
      polyfill: false,
      rangeClass: 'plans__rangeslider',
      disabledClass: 'plans__rangeslider--disabled',
      horizontalClass: 'plans__rangeslider--horizontal',
      verticalClass: 'plans__rangeslider--vertical',
      fillClass: 'plans__rangesliderFill',
      handleClass: 'plans__rangesliderHandle',
      onInit: function() {
        let $rangeEl = this.$range
        let ticks = ''
        let i
        let totalTicks = $($rangeEl)
          .prev()
          .attr('max')

        for (i = 0; i < totalTicks; i++) {
          ticks += `
              <div class="plans__rangeTick"></div>
            `
        }

        $($rangeEl)
          .next()
          .append(ticks)
      },
      onSlide: function(pos, value) {
        if (value === currentValue) {
          return false
        }

        multiplier = $(this.$range)
          .prev()
          .data('multiplier')

        type = $(this.$range)
          .prev()
          .data('type')

        if (type === 'users') {
          self.rangeDeltaUsers = multiplier * (value - 1)
        } else {
          self.rangeDeltaProfiles = multiplier * (value - 1)
        }

        delta = self.rangeDeltaUsers + self.rangeDeltaProfiles

        self.professionalPriceEl.text(
          `$${self.professionalStartingPrice + delta}/mo`
        )
        self.businessPriceEl.text(`$${self.businessStartingPrice + delta}/mo`)

        currentValue = value
      }
    })
  }
}

const plans = new Plans('.plans')

plans.init()
