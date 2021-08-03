import {Game} from './components/game/Game'
import {Map} from './components/map/Map'
import './styles/index.css'

const game = new Game('#app', {
  components: [Map]
})

game.render()
