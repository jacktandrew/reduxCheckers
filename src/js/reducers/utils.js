const R = require('ramda')
import { shouldHeBeKing } from './king'

export const deepMap = R.curry((fn, data) => R.map(R.map(fn), data))

const findPaths = R.curry((kind, sq) => {
  const mapper = c => R.zipWith(R.add, sq.coords, c),
    nested = deepMap(mapper, sq.man[kind])

  return R.map(R.prepend(sq.coords), nested)
})

const pathToSquares = R.curry((board, paths) => {
  const fn = R.compose(R.prop(R.__, board), R.join(':'))

  return deepMap(fn, paths)
})

export const getJumps = R.curry((board, sq) => R.compose(
  pathToSquares(board),
  findPaths('jumps')
)(sq))

export const getMoves = R.curry((board, sq) => R.compose(
  R.filter(R.compose(R.is(Object), R.last)),
  pathToSquares(board),
  findPaths('moves')
)(sq))

export const getNeighbors = R.curry((board, sq) => R.compose(
  R.map(R.compose(R.prop('id'), R.last)),
  getMoves(board)
)(sq))

export const finish = (state, dst) => {
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
