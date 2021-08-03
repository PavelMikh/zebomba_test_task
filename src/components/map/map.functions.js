import {$} from 'core/dom'

export function isArrow(event) {
  return $(event.target).data.type === 'arrow'
}

function isLeftArrow(target) {
  return $(target).data.side === 'left'
}

export function arrowClickHandler(event) {
  const target = event.target
  const $friendsBlock = $(target).closest('[data-type="friends-block"]')
  const $friendsListScrollableWrapper = $friendsBlock.find('[data-type="friends-list-wrapper"]')
  const scrollStep = 60
  $friendsListScrollableWrapper.scrollLeft(isLeftArrow(target) ? -scrollStep : scrollStep)
}

export function isToUniversityButton(event) {
  return $(event.target).data.type === 'to-university'
}

function next() {
  const step = 1
  const nextId = parseInt(localStorage.getItem('pointId')) + step
  localStorage.setItem('pointId', nextId)
  return nextId
}

function moveToNextPoint(player, nextPoint) {
  const {width: pointWidth, height: pointHeight} = nextPoint.dimensions()
  const {width: playerWidth, height: playerHeight} = player.dimensions()
  player.coords({
    top: (parseInt(nextPoint.data.top) + pointHeight / 2) - playerHeight,
    left: (parseInt(nextPoint.data.left) + pointWidth / 2) - playerWidth / 2
  })
}

function moveToStart(root, startPointId) {
  localStorage.setItem('pointId', startPointId - 1)
  toUniversityButtonClickHandler(root, startPointId)
}

export function toUniversityButtonClickHandler($root, startPointId) {
  const $player = $root.find('[data-type="player"]')
  $player.addClass('hide')
  $player.removeClass('hide')
  $player.addClass('show')
  
  const nextId = next()
  const $nextPoint = $root.find(`[data-point-id="${nextId}"]`)
  if ($nextPoint.data) {
    moveToNextPoint($player, $nextPoint)
  } else {
    moveToStart($root, startPointId)
  }

  const delay = 500
  setTimeout(() => {
    $player.removeClass('show')
  }, delay) 
}

export function isRatingButton(event) {
  return $(event.target).data.type === "rating"
}

export function ratingButtonClickHandler(event) {
  const target = event.target
  console.log('target: ', target)
}