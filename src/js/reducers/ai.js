const R = require('ramda')
import move from './move'
import jump from './jump'
import { getMoves, getJumps } from './utils'

const play = state => {
  const jumps = jump.get(state),
    paths = (jumps.length) ? jumps : getAllMoves(state),
    rand = Math.floor(Math.random() * paths.length),
    src = R.head(paths[rand]).key,
    dst = R.last(paths[rand]).key,
    active = state.board[src],
    newState = { ...state, color: 'white', active }

  console.log('paths', paths)

  return (jumps.length)
    ? jump.kill(newState, jumps, dst)
    : finish(state, src, dst)
}

const finish = (state, src, dst) => {
  const board = R.compose(
      R.assocPath([dst, 'man'], state.board[src].man),
      R.dissocPath([src, 'man']),
    )(state.board),
    color = (state.color === 'black') ? 'white' : 'black'

  return { board, color }
}

const getAllMoves = state => {
  const list = Object.keys(state.board).map(k => state.board[k]),
    hasNoMan = R.compose(R.isNil, R.prop('man'))
    return R.compose(
      R.filter(R.compose(hasNoMan, R.last)),
      R.unnest,
      R.map(getMoves(state.board)),
      R.filter(R.pathEq(['man', 'color'], state.color))
    )(list)
}

export default {
  play,
  getAllMoves
}