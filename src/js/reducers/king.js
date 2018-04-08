const R = require('ramda')

export const makeKing = man => {
  const moves = [[[1,1]],[[-1,1]],[[-1,-1]],[[1,-1]]],
    jumps = [
      [[-1,-1],[-2,-2]], [[1,-1],[2,-2]],
      [[-1,1],[-2,2]], [[1,1],[2,2]]
    ]
  return { ...man, moves, jumps, isKing: true }
}

export const shouldHeBeKing = (state, dst) => {
  const size = Math.sqrt(Object.keys(state.board).length),
    kingRow = (state.active.man.color === 'black') ? size - 1 : 0,
    targetRow = state.board[dst].row

  return (targetRow === kingRow)
    ? makeKing(state.active.man)
    : state.active.man
}