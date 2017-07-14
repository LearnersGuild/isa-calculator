import {actionTypes} from './form'
import {startDates} from '../config/dates'
import {
  expectedExitDate,
  isaCancellationDate,
  findNextDateInArrayAfter,
  defaultStartDate,
  defaultExpectedExitDate,
  defaultISACancellationDate,
} from '../src/dates'

const initialState = {
  expectedExitDate: defaultExpectedExitDate.toISOString(),
  isaCancellationDate: defaultISACancellationDate.toISOString(),
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
