const R = require('ramda')
import createBoard from './createBoard'
import ai from './ai'

const board = createBoard(8),
  state = { board, color: 'white' }

test('getAllMoves should return all valid moves', () => {
  const sorted = R.compose(
      R.sort((a,b) => a > b),
      R.dropRepeats,
      R.map(sq => sq.id),
      R.map(R.last),
      ai.getAllMoves
    )(state)

  expect(sorted).toEqual([17, 18, 19, 20])
})

