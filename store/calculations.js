import {actionTypes} from './form'
import {startDates} from '../config/dates'
import {
  expectedExitDate,
  isaCancellationDate,
  findNextDateInArrayAfter,
} from '../src/dates'

const startDate = findNextDateInArrayAfter(startDates)
const exitDate = expectedExitDate(startDate)
const cancelDate = isaCancellationDate(startDate)

const initialState = {
  expectedExitDate: exitDate.toISOString(),
  isaCancellationDate: cancelDate.toISOString(),
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return {
        ...state,
        expectedExitDate: expectedExitDate(action.startDate),
        isaCancellationDate: isaCancellationDate(action.startDate),
      }
    default: return state
  }
}
