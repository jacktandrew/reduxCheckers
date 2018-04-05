import { PICK_UP, PUT_DOWN } from '../constants/action-types'

export const pickUp = man => ({
  type: PICK_UP,
  payload: man
})

export const putDown = square => ({
  type: PUT_DOWN,
  payload: square
})
