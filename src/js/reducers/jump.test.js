const R = require('ramda')
import createBoard from './createBoard'
import jump from './jump'

const board = createBoard(8),
  state = { board, color: 'black' },
  sq10 = board['3:2']

test('jump.get should return an empty array when no jumps are found', () => {
  expect(jump.get(state, sq10)).toEqual([])
})

test('jump.get should return results when jumps are found', () => {
  expect(jump.get(state, sq10)).toEqual([])
})