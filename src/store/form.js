import {
  expectedExitDate,
  defaultStartDate,
  defaultExpectedExitDate,
} from '@learnersguild/guild-dates'

import {
  LIVING_FUND_STIPEND_AMOUNT,
} from '../isacalc'

const initialState = {
  startDate: defaultStartDate.toISOString(),
  exitDate: defaultExpectedExitDate.toISOString(),
  stipendAmount: LIVING_FUND_STIPEND_AMOUNT,
  isTakingLaptopStipend: true,
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
      return {...state, startDate: new Date(action.startDate).toISOString()}
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

export const updateStartDate = startDate => (dispatch, getState) => {
  dispatch({type: actionTypes.UPDATE_START_DATE, startDate})
  const exitDate = expectedExitDate(startDate).toISOString()
  dispatch({type: actionTypes.UPDATE_EXIT_DATE, ...getState().form, startDate, exitDate})
}
export const updateExitDate = exitDate => (dispatch, getState) => dispatch({
  type: actionTypes.UPDATE_EXIT_DATE,
  ...getState().form,
  exitDate,
})
export const updateStipendAmount = stipendAmount => (dispatch, getState) => dispatch({
  type: actionTypes.UPDATE_STIPEND_AMOUNT,
  ...getState().form,
  stipendAmount: Number(stipendAmount),
})
export const updateIsTakingLaptopStipend = isTakingLaptopStipend => (dispatch, getState) => dispatch({
  type: actionTypes.UPDATE_IS_TAKING_LAPTOP_STIPEND,
  ...getState().form,
  isTakingLaptopStipend,
})
export const updateExpectedAnnualSalary = expectedAnnualSalary => (dispatch, getState) => dispatch({
  type: actionTypes.UPDATE_EXPECTED_ANNUAL_SALARY,
  ...getState().form,
  expectedAnnualSalary: Number(expectedAnnualSalary),
})
