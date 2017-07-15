import {actionTypes} from './form'
import {
  expectedExitDate,
  isaCancellationDate,
  defaultStartDate,
  defaultExpectedExitDate,
  defaultISACancellationDate,
} from '../src/programDates'

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
