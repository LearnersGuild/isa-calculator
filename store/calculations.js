import {
  expectedExitDate,
  isaCancellationDate,
  defaultExpectedExitDate,
  defaultISACancellationDate,
} from '../src/programDates'
import {actionTypes} from './form'

const initialState = {
  expectedExitDate: defaultExpectedExitDate.toISOString(),
  isaCancellationDate: defaultISACancellationDate.toISOString(),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return {
        ...state,
        expectedExitDate: expectedExitDate(action.startDate).toISOString(),
        isaCancellationDate: isaCancellationDate(action.startDate).toISOString(),
      }
    default: return state
  }
}
