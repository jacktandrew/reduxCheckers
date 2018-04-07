const R = require('ramda')
import { getNeighbors, getJumps } from './utils'

const handle = (state, key) => {
  const board = state.board,
    src = state.active,
    dst = board[key],
    neighbors = getNeighbors(board, src),
    notOccupied = R.propEq('man', undefined),
    inRange = R.contains(R.__, neighbors),
    isValid = R.both(notOccupied, inRange)

  console.log('isValid', neighbors, key)

  return isValid(dst)
    ? finish(state, key)
    : state
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