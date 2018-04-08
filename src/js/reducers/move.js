const R = require('ramda')
import { getMoves, finish } from './utils'
import jump from './jump'

const getTruePath = (moves, dst) => {
  return R.compose(
    R.unnest,
    R.filter(R.compose(R.eqProps('id', dst), R.last))
  )(moves)
}

const handle = (state, key) => {
  const dst = state.board[key],
    jumps = jump.get(state),
    moves = (jumps.length) ? jumps : getMoves(state.board, state.active),
    unoccupied = R.propEq('man', undefined, dst),
    truePath = getTruePath(moves, dst)

  if (R.not(truePath.length))
    return state

  if (jumps.length)
    return jump.kill(state, truePath)

  if (unoccupied)
    return finish(state, key)
}

export default {
  handle,
  finish
}