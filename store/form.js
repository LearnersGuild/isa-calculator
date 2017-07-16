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
  UPDATE_START_DATE: 'UPDATE_START_DATE',
  UPDATE_EXIT_DATE: 'UPDATE_EXIT_DATE',
  UPDATE_STIPEND_AMOUNT: 'UPDATE_STIPEND_AMOUNT',
  UPDATE_IS_TAKING_LAPTOP_STIPEND: 'UPDATE_IS_TAKING_LAPTOP_STIPEND',
  UPDATE_EXPECTED_ANNUAL_SALARY: 'UPDATE_EXPECTED_ANNUAL_SALARY',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_START_DATE:
      return {
        ...state,
        startDate: new Date(action.startDate).toISOString(),
        exitDate: expectedExitDate(action.startDate).toISOString(),
      }
    case actionTypes.UPDATE_EXIT_DATE:
      return {...state, exitDate: new Date(action.exitDate).toISOString()}
    case actionTypes.UPDATE_STIPEND_AMOUNT:
      return {...state, stipendAmount: action.stipendAmount}
    case actionTypes.UPDATE_IS_TAKING_LAPTOP_STIPEND:
      return {...state, isTakingLaptopStipend: action.isTakingLaptopStipend}
    case actionTypes.UPDATE_EXPECTED_ANNUAL_SALARY:
      return {...state, expectedAnnualSalary: action.expectedAnnualSalary}
    default: return state
  }
}

export const updateStartDate = startDate => dispatch => dispatch({
  type: actionTypes.UPDATE_START_DATE,
  startDate,
})
export const updateExitDate = exitDate => dispatch => dispatch({
  type: actionTypes.UPDATE_EXIT_DATE,
  exitDate,
})
export const updateStipendAmount = stipendAmount => dispatch => dispatch({
  type: actionTypes.UPDATE_STIPEND_AMOUNT,
  stipendAmount,
})
export const updateIsTakingLaptopStipend = isTakingLaptopStipend => dispatch => dispatch({
  type: actionTypes.UPDATE_IS_TAKING_LAPTOP_STIPEND,
  isTakingLaptopStipend,
})
export const updateExpectedAnnualSalary = expectedAnnualSalary => dispatch => dispatch({
  type: actionTypes.UPDATE_EXPECTED_ANNUAL_SALARY,
  expectedAnnualSalary,
})
