import {GameComponent} from 'core/GameComponent'
import {createMap} from './map.template'
import {
  isArrow,
  arrowClickHandler,
  isToUniversityButton,
  toUniversityButtonClickHandler,
  isRatingButton,
  ratingButtonClickHandler,
  isRatingCloseButton,
  ratingCloseButtonHandler
} from './map.functions'

export class Map extends GameComponent {
  static className = 'map'

  constructor($root, options) {
    super($root, {
      name: 'Map',
      listeners: ['click'],
      ...options
    })

    this.prepare()
  }

  toHTML() {
    return createMap()
  }

  prepare() {
    this.startPointId = 0
  }

  init() {
    super.init()

    localStorage.setItem('pointId', this.startPointId)
  }

  onClick(event) {
    if (isArrow(event)) {
      arrowClickHandler(event)
    }

    if (isToUniversityButton(event)) {
      toUniversityButtonClickHandler(this.$root, this.startPointId)
    }

    if (isRatingButton(event)) {
      ratingButtonClickHandler(this.$root)
    }

    if (isRatingCloseButton(event)) {
      ratingCloseButtonHandler(this.$root)
    }
  }
}