const R = require('ramda')

const deepMap = R.curry((fn, data) => R.map(R.map(fn), data))

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
  R.map(R.last),
  pathToSquares(board),
  findPaths('moves')
)(sq))
