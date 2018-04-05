const R = require('ramda')
import createBoard from './createBoard'
import { getMoves, getJumps } from './utils'

const board = createBoard(8),
  sq2 = board['3:0'],
  sq3 = board['5:0'],
  sq7 = board['4:1'],
  sq10 = board['3:2'],
  sq11 = board['5:2'],
  sq14 = board['2:3'],
  sq16 = board['6:3']

const kingDirections = [
  [-1,-1],
  [ 1,-1],
  [ 1, 1],
  [-1, 1]
]

test('getMoves should give us move paths from a starting coordinate', () => {
  const answer = [
    [sq7, sq11],
    [sq7, sq10]
  ]

  expect(getMoves(board, sq7)).toEqual(answer)
})

test('getJumps should give jumps squares from a starting square', () => {
  const answer = [
    [sq7, sq11, sq16],
    [sq7, sq10, sq14]
  ]

  expect(getJumps(board, sq7)).toEqual(answer)
})

// test('seek should find nearby squares', () => {
//   const king = R.assocPath(['man', 'directions'], kingDirections, sq7)

//   expect(seek([1], board, sq7)).toEqual([
//     [sq7, sq2],
//     [sq7, sq3],
//     [sq7, sq11],
//     [sq7, sq10]
//   ]);
// });

// test('seek should find jump paths', () => {
//   expect(seek([1, 2], board, sq7)).toEqual([[sq7, sq10, sq14], [sq7, sq11, sq16]]);
// });

