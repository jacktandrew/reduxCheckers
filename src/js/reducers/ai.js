const R = require('ramda')
import move from './move'
import jump from './jump'
import { getAllMoves, finish } from './utils'

const play = state => {
  const jumps = jump.get(state),
    paths = (jumps.length) ? jumps : getAllMoves(state),
    rand = Math.floor(Math.random() * paths.length)

  return (paths.length)
    ? proceed(state, paths[rand])
    : state
}

const proceed = (state, path) => {
  const key = R.last(path).key,
    newState = {
      ...state,
      color: 'white',
      active: R.head(path)
    }

  return (path.length === 3)
    ? jump.kill(newState, path)
    : finish(newState, key)
}

export default { play }