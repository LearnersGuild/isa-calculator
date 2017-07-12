import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  startDate: (new Date()).toISOString(),
  exitDate: (new Date()).toISOString(),
  stipendAmount: 0,
  isTakingLaptopStipend: false,
  expectedAnnualSalary: 90000,
}

export const actionTypes = {
  UPDATE_FORM: 'UPDATE_FORM',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return Object.assign({}, state, {
        startDate: action.startDate,
        exitDate: action.exitDate,
        stipendAmount: action.stipendAmount,
        isTakingLaptopStipend: action.isTakingLaptopStipend,
        expectedAnnualSalary: action.expectedAnnualSalary,
      })
    default: return state
  }
}

// ACTIONS
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

export const initStore = (state = initialState) => {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
