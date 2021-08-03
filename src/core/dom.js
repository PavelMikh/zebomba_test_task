class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value
    }

    return this.$el.textContent
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  scrollLeft(step) {
    this.$el.scrollLeft += step
  }

  get data() {
    if (this.$el) {
      return this.$el.dataset
    }
    return null
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })
  }

  coords(newCoords = {}) {
    if (newCoords !== {}) {
      const {left, top} = newCoords
      $(this.$el).css({
        "left":left + 'px',
        "top":top + 'px'
      })

      return
    }
    
    return {
      left: this.$el.offsetLeft,
      top: this.$el.offsetTop
    }
  }

  getStyles(styles = []) {
    return styles.reduce((result, s) => {
      result[s] = this.$el.style[s]
      return result
    }, {})
  }

  dimensions() {
    return this.$el.getBoundingClientRect()
  }
 
  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}