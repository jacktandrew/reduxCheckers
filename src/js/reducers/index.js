import { PICK_UP, PUT_DOWN } from '../constants/action-types'
import createBoard from './createBoard'
import move from './move'
import jump from './jump'
import ai from './ai'
import { getMoves, getJumps } from './utils'
import { checkEndGame } from './endGame'
const R = require('ramda')
window.R = R

const initialState = {
  color: 'black',
  board: createBoard(8)
}

const handlePickUp = (state, key) => {
  const prev = (state.active) ? state.active.key : '',
    board = R.compose(
      R.assocPath([key, 'selected'], true),
      R.dissocPath([prev, 'selected'])
    )(state.board),
    active = state.board[key]

  return (state.color === active.man.color)
    ? { ...state, board, active }
    : state
}

const handlePutDown = (state, key) => {
  if (!state.active) return state

  const newState = move.handle(state, key),
    gameOver = checkEndGame(newState)

  if (gameOver) return gameOver

  return (newState.color === 'white')
    ? ai.play(newState)
    : newState
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICK_UP:
      return handlePickUp(state, action.payload)

    case PUT_DOWN:
      return handlePutDown(state, action.payload)

    default:
      return state
  }
}

export default rootReducer