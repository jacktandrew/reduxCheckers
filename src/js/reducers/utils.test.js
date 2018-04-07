const R = require('ramda')
import createBoard from './createBoard'
import { getMoves, getJumps, getNeighbors } from './utils'

const board = createBoard(8),
  sq2 = board['3:0'],
  sq3 = board['5:0'],
  sq7 = board['4:1'],
  sq10 = board['3:2'],
  sq11 = board['5:2'],
  sq14 = board['2:3'],
  sq16 = board['6:3'],
  sq12 = board['7:2']

const kingDirections = [
  [-1,-1],
  [ 1,-1],
  [ 1, 1],
  [-1, 1]
]

test('getNeighbors should return nearby squares', () => {
  const answer = [ sq11, sq10 ]

  expect(getNeighbors(board, sq7)).toEqual(answer)
})

test('getMoves should return move paths from a starting coordinate', () => {
  const answer = [
    [sq7, sq11],
    [sq7, sq10]
  ]

  expect(getMoves(board, sq7)).toEqual(answer)
})

test('getMoves should return move paths for the white team', () => {
  const sq23 = board['4:5'],
    sq18 = board['3:4'],
    sq19 = board['5:4'],
    answer = [
      [sq23, sq18],
      [sq23, sq19]
    ]

  expect(getMoves(board, sq23)).toEqual(answer)
})

test('getMoves should return one move path when only one exists', () => {
  const answer = [
    [sq12, sq16]
  ]

  expect(getMoves(board, sq12)).toEqual(answer)
})

// test('getJumps should return jumps squares from a starting square', () => {
//   const answer = [
//     [sq7, sq11, sq16],
//     [sq7, sq10, sq14]
//   ]

//   expect(getJumps(board, sq7)).toEqual(answer)
// })

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

