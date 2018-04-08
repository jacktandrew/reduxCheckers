const R = require('ramda')
import createBoard from './createBoard'
import jump from './jump'
import { deepMap } from './utils'

const board = createBoard(8),
  state = { board, color: 'black' },
  sq10 = board['3:2'],
  stateWithJump = {
    board: R.assocPath(['5:4', 'man'], sq10.man, board),
    color: 'white'
  }

test('jump.get should return an empty array when no jumps are found', () => {
  expect(jump.get(state)).toEqual([])
})

test('jump.get should return results when jumps are found', () => {
  const jumps = jump.get(stateWithJump),
    answer = [
      [23, 19, 16],
      [24, 19, 15]
    ]
  expect(deepMap(x => x.id, jumps)).toEqual(answer)
})