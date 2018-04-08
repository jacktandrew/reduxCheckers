const R = require('ramda')
import { deepFilter, getMoves } from './utils'
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
    return jump.finishHim(state, truePath)

  if (unoccupied)
    return finish(state, key)
}

const finish = (state, dst) => {
  const src = state.active.key,
    man = shouldHeBeKing(state, dst),
    board = R.compose(
      R.assocPath([dst, 'man'], man),
      R.dissocPath([src, 'man']),
      R.dissocPath([src, 'selected'])
    )(state.board),
    color = (state.color === 'black') ? 'white' : 'black'

  return { board, color }
}

const shouldHeBeKing = (state, dst) => {
  const size = Math.sqrt(Object.keys(state.board).length),
    kingRow = (state.active.man.color === 'black') ? size - 1 : 0,
    targetRow = state.board[dst].row,
    allMoves = [[-1, -1], [1, -1], [1, 1], [-1, 1]],
    allJumps = [
      [[-1,-1],[-2,-2]], [[1,-1],[2,-2]], [[-1,1],[-2,2]], [[1,1],[2,2]]
    ],
    makeKing = R.compose(R.assoc('moves', allMoves), R.assoc('jumps', allJumps))

  return (targetRow === kingRow)
    ? makeKing(state.active.man)
    : state.active.man
}

export default {
  handle,
  finish
}