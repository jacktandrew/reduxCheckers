const R = require('ramda')

export const endGame = state => {
  const color = state.color === 'black' ? 'white' : 'black'
  return {
    ...state,
    gameOver: `Game over, ${color} wins!`
  }
}

export const checkForVictory = state => {
  const colors = R.compose(
    R.filter(R.is(String)),
    R.values,
    R.map(R.path(['man', 'color']))
  )(state.board)

  return R.not(R.contains(state.color, colors))
}