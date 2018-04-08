const R = require('ramda')
import { getMoves, getJumps } from './utils'

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
  )(list)

  return (colors.length === 3 && !colors[2])
}

const kill = (state, jumps, dst) => {
  const src = state.active.key,
    match = R.filter(R.both(
      R.compose(R.propEq('key', src), R.head),
      R.compose(R.propEq('key', dst), R.last)
    ), jumps)

  return (R.not(R.isEmpty(match)))
    ? finishHim(state, R.head(match))
    : state
}

const finishHim = (state, path) => {
  const src = path[0].key,
    kill = path[1].key,
    dst = path[2].key,
    board = R.compose(
      R.assocPath([dst, 'man'], state.active.man),
      R.dissocPath([kill, 'man']),
      R.dissocPath([src, 'man']),
      R.dissocPath([src, 'selected'])
    )(state.board),
    color = (state.color === 'black') ? 'white' : 'black'

  return { board, color }
}

export default {
  get,
  kill,
  finishHim
}