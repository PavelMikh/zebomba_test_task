import {
  pointsCoord,
  firstLineElementsCoords,
  spacingBetweenLines,
  data
} from '../../data/data'

const toPoint = (pointCoord, id) => {
  const {type, left, top} = pointCoord
  switch(type) {
    case 'start':
    case 'final':
      return `
      <div 
        class="university-location__extreme-point_${type} extreme-point" 
        style="left:${left}px;top:${top}px;"
        data-point-id=${id}
        data-top="${top}"
        data-left="${left}"
        data-type="${type}"
      >
      </div>
      `
    case 'black':
    case 'gray':
      return `
      <div 
        class="university-location__point point" 
        style="left:${left}px;top:${top}px;"
        data-point-id=${id}
        data-top="${top}"
        data-left="${left}"
        data-type="${type}"
      >
        <div class="university-location__point_${type}"></div>
      </div>
      `
    case 'red':
      return `
      <div 
        class="university-location__point-delimeter point-delimeter" 
        style="left:${left}px;top:${top}px;"
        data-point-id=${id}
        data-top="${top}"
        data-left="${left}"
        data-type="${type}"
      >
        <div class="university-location__point-delimeter_${type}"></div>
      </div>
      `
    default: return ``
  }
}

const createPoints = () => {
  const points = []
  pointsCoord.forEach((coord, index) => points.push(toPoint(coord, index)))
  return points.join('')
}

const toRatingLine = (lineCoords, playerRating, isFriend, index) => {
  const {lineBgTop, placeLeft, placeTop, iconBgLeft, iconBgTop, fullNameLeft, 
    fullNameTop, experienceLeft, experienceTop} = lineCoords

  const {name, lastName, points, img} = playerRating
  
  return `
    <div
      class="rating-modal__table-line-bg" 
      style="top:${lineBgTop}px;${isFriend ? 'background:#8cce13;border-radius:8px' : ''}"
    >
    </div>
    <div
      class="rating-modal__table-line-place"
      style="left:${placeLeft}px;top:${placeTop}px;"
    >
      <span data-type="number">${index + 1}</span>
    </div>
    <div
      class="rating-modal__table-line-icon-bg"
      style="left:${iconBgLeft}px;top:${iconBgTop}px;"
    >
    </div>
    <div
      class="rating-modal__table-line-full-name"
      style="left:${fullNameLeft}px;top:${fullNameTop}px;"
    >
      <span data-type="full-name">${name} ${lastName}</span>
    </div>
    <div
      class="rating-modal__table-line-experience"
      style="left:${experienceLeft}px;top:${experienceTop}px;"
    >
      <span data-type="experience">${points}</span>
    </div>
  `
}

const isFriend = (friendsId, id) => {
  return friendsId.includes(id)
}

const calculateCoordinates = (firstLineElementsCoords, spacingBetweenLines, index) => {
  const keys = Object.keys(firstLineElementsCoords)
  let result = {}
  keys.forEach(key => {
    if(firstLineElementsCoords[key] && spacingBetweenLines[key]) {
      result[key] = parseInt(firstLineElementsCoords[key]) + (parseInt(spacingBetweenLines[key]) * index)
    } else {
      result[key] = firstLineElementsCoords[key]
    }
  })

  return result
}

function sortByRating(ratingData) {
  ratingData.sort((a, b) => parseInt(a.points) < parseInt(b.points) ? 1 : -1);
}

const createRatingList = () => {
  const ratingData = data.rating
  sortByRating(ratingData)
  const friendsList = data.friends
  const friendsId = friendsList.map(friend => friend.id)

  const ratingList = []
  ratingData.forEach((playerRating, index) => {
    if (index === 0) {
      ratingList.push(toRatingLine(firstLineElementsCoords, playerRating, isFriend(friendsId, playerRating.id), index))
    }
    const lineCoords = calculateCoordinates(firstLineElementsCoords, spacingBetweenLines, index)
    ratingList.push(toRatingLine(lineCoords, playerRating, isFriend(friendsId, playerRating.id), index))
  })
  
  return ratingList.join('')
}

export function createMap() {
  return `
  <div class="university-location">
    <div class="university-location__furniture furniture">
      <div class="furniture__bush bush"></div>
    </div>
    <div class="university-location__way way"></div>
    <div class="university-location__first-course-label first-course-label"></div>
    <div class="university-location__graduation graduation"></div>
    <div class="university-location__player player" data-type="player">
      <div class="player__figurine_girl figurine"></div>
    </div>
    ${createPoints()}
    <div class="university-location__friends-block friends-block" data-type="friends-block">
      <div class="friends-block__arrow_left arrow" data-type="arrow" data-side="left"></div>
      <div class="friends-block__friends-list-wrapper" data-type="friends-list-wrapper">
        <div class="friends-block__friends-list friends-list">
          <div class="friends-list__friend friend">
            <div class="friend__icon"></div>
            <div class="friend__plus-btn"></div>
          </div>
          <div class="friends-list__friend friend">
            <div class="friend__icon"></div>
          </div>
          <div class="friends-list__friend friend">
            <div class="friend__icon"></div>
          </div>
          <div class="friends-list__friend friend">
            <div class="friend__icon"></div>
          </div>
          <div class="friends-list__friend friend">
            <div class="friend__icon"></div>
          </div>
          <div class="friends-list__friend friend">
            <div class="friend__icon"></div>
          </div>
          <div class="friends-list__friend friend"></div>
          <div class="friends-list__friend friend"></div>
          <div class="friends-list__friend friend"></div>
          <div class="friends-list__friend friend"></div>
          <div class="friends-list__friend friend"></div>
          <div class="friends-list__friend friend"></div>
        </div>
      </div>
      <div class="friends-block__arrow_right arrow" data-type="arrow" data-side="right"></div>
    </div>
    <div class="university-location__chat-btn chat-btn"></div>
    <div class="university-location__to-univ-btn to-univ-btn" data-type="to-university">
      <div class="to-univ-btn__content" data-type="to-university"></div>
    </div>
    <div class="university-location__mail-btn mail-btn"></div>
    <div class="university-location__rating-btn rating-btn" data-type="rating">
      <div class="rating-btn__content" data-type="rating"></div>
    </div>
  </div>
  <div class="rating-modal">
    <div class="rating-modal__overlay">
      <div class="rating-modal__rating-window">
        <div class="rating-modal__bg"></div>
        <div class="rating-modal__header-bg"></div>
        <div class="rating-modal__header-content"></div>
        <div class="rating-modal__close"></div>
        <div class="rating-modal__body-bg"></div>
        <div class="rating-modal__table-wraper">
          <div class="rating-modal__table-header-bg"></div>
          <div class="rating-modal__table-header-place"></div>
          <div class="rating-modal__table-header-full-name"></div>
          <div class="rating-modal__table-header-experience"></div>
          ${createRatingList()}
        
        </div>
      </div>
    </div>
  </div>
  `
}
