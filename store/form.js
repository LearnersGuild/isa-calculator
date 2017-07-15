import {
  expectedExitDate,
  defaultStartDate,
  defaultExpectedExitDate,
} from '../src/programDates'

const initialState = {
  startDate: defaultStartDate.toISOString(),
  exitDate: defaultExpectedExitDate.toISOString(),
  stipendAmount: 0,
  isTakingLaptopStipend: false,
  expectedAnnualSalary: 90000,
}

export const actionTypes = {
  UPDATE_FORM: 'UPDATE_FORM',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return {
        ...state,
        startDate: action.startDate,
        exitDate: action.exitDate,
        stipendAmount: action.stipendAmount,
        isTakingLaptopStipend: action.isTakingLaptopStipend,
        expectedAnnualSalary: action.expectedAnnualSalary,
      }
    default: return state
  }
}

export const updateForm = ({
  startDate,
  exitDate,
  stipendAmount,
  isTakingLaptopStipend,
  expectedAnnualSalary,
}) => dispatch => {
  return dispatch({
    type: actionTypes.UPDATE_FORM,
    startDate,
    exitDate,
    stipendAmount,
    isTakingLaptopStipend,
    expectedAnnualSalary,
  })
}
