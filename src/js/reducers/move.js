const R = require('ramda')
import { getMoves, getJumps } from './utils'

const handle = (state, key) => {
  const board = state.board,
    src = state.active,
    dst = board[key],
    moves = getMoves(board, src),
    notOccupied = R.propEq('man', undefined),
    inRange = R.contains(R.__, moves),
    isValid = R.both(notOccupied, inRange)

  return isValid(dst)
    ? finish(state, key)
    : state
}

const finish = (state, dst) => {
  const src = state.active.key,
    man = shouldHeBeKing(state, dst)

  const board = R.compose(
      R.assocPath([dst, 'man'], man),
      R.dissocPath([src, 'man']),
      R.dissocPath([src, 'selected'])
    )(state.board)

  const color = (state.color === 'black') ? 'white' : 'black',

    newState = { board, color }

  return newState
}

const shouldHeBeKing = (state, dst) => {
  const size = Math.sqrt(Object.keys(state.board).length),
    kingRow = (state.active.man.color === 'black') ? size - 1 : 0,
    targetRow = state.board[dst].row,
    allDirections = [[1, 1], [-1, 1], [1, -1], [-1, -1]]

  return (targetRow === kingRow)
    ? R.assoc('directions', allDirections, state.active.man)
    : state.active.man
}

export default {
  handle,
  finish
}