const R = require('ramda')
import { getMoves, getJumps } from './utils'
import { shouldHeBeKing } from './king'

const get = state => {
  const list = Object.keys(state.board).map(k => state.board[k])

  return R.compose(
    R.filter(groom),
    R.unnest,
    R.map(getJumps(state.board)),
    R.filter(R.pathEq(['man', 'color'], state.color))
  )(list)
}

const groom = list => {
  const colors = R.compose(
    R.dropRepeats,
    R.map(R.prop('color')),
    R.pluck('man')
  )(list.filter(sq => sq))

  return (colors.length === 3 && !colors[2])
}

const kill = (state, path) => {
  const src = path[0].key,
    kill = path[1].key,
    dst = path[2].key,
    man = shouldHeBeKing(state, dst),
    board = R.compose(
      R.assocPath([dst, 'man'], man),
      R.dissocPath([kill, 'man']),
      R.dissocPath([src, 'man']),
      R.dissocPath([src, 'selected'])
    )(state.board),
    color = (state.color === 'black') ? 'white' : 'black'

  return { board, color }
}

export default {
  get,
  kill
}