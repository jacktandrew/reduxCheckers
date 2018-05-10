const R = require('ramda')
import { getAllMoves } from './utils'

const checkForStalemate = state => {
  const allMoves = getAllMoves(state),
    newState = {
      ...state,
      gameOver: 'Game over, stalemate...'
    }
  console.log('allMoves', allMoves)
  return (allMoves.length) ? false : newState
}

const checkForVictory = state => {
  const color = state.color === 'black' ? 'white' : 'black',
    men = R.compose(
      R.filter(R.is(String)),
      R.values,
      R.map(R.path(['man', 'color']))
    )(state.board),
    newState = {
      ...state,
      gameOver: `Game over, ${color} wins!`
    },
    isOver = R.not(R.contains(state.color, men))

  return (isOver) ? newState : false
}

export const checkEndGame = state => {
  const isVictory = checkForVictory(state),
    isStalemate = checkForStalemate(state)

  if (isVictory) return isVictory
  if (isStalemate) return isStalemate
}
