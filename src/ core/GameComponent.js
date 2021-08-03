import {DomListener} from '@core/DomListener'

export class GameComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name,
    // this.emitter = options.emitter
    // this.store = options.store
    // this.unsubscribers = []
    // this.subscriptions = options.subscriptions || []
    this.prepare()
  }

  // Возвращаем шаблон компонента
  toHTML() {
    return ''
  }

  // Подготавливаем компонент перед инициализацией
  prepare() {}

  // // Уведомляем слушателей про событие event
  // $emit(eventName, ...args) {
  //   this.emitter.emit(eventName, ...args)
  // }

  // // Подписываемся на событие event
  // $on(eventName, fn) {
  //   const unsub = this.emitter.subscribe(eventName, fn)
  //   this.unsubscribers.push(unsub)
  // }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Удаляем DOM слушателей
  destroy() {
    this.unsubscribers.forEach(unsub => unsub())
    this.removeDOMListeners()
  }
}