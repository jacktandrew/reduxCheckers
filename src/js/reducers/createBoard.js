const R = require('ramda')

const createMan = (size, i) => {
  const half = size / 2;

  if (i < (half - 1) * size)
    return {
      color: 'black',
      moves: [[[1,1]],[[-1,1]]],
      jumps: [
        [[1,1],[2,2]],
        [[-1,1],[-2,2]]
      ]
    }

  if (i >= (half + 1) * size)
    return {
      color: 'white',
      moves: [[[-1,-1]],[[1,-1]]],
      jumps: [
        [[1,-1],[2,-2]],
        [[-1,-1],[-2,-2]]
      ]
    }
}

const createGreenSquare = (size, i) => ({
  color: 'forestgreen',
  man: createMan(size, i),
  id: Math.ceil((i + 1) / 2)
})

const createBoard = (size = 8) => {
  return Array(size * size).fill('').reduce((acc, _, i) => {
    const column = i % size,
      row = Math.floor(i / size),
      key = `${column}:${row}`,
      coords = [column, row],
      sq = { column, row, key, coords }

    return (column % 2 === row % 2)
      ? { ...acc, [key]: { ...sq, color: 'cornsilk' } }
      : { ...acc, [key]: { ...sq, ...createGreenSquare(size, i) } }
  }, {})
}

window.createBoard = createBoard

export default createBoard