import {
  expectedExitDate,
  momentDayOnly,
  nextStartDate,
} from '@learnersguild/guild-dates'

import {
  LIVING_FUND_STIPEND_AMOUNT,
} from '../isacalc'

const defaultStartDate = nextStartDate()

export const defaultFormInputs = {
  startDate: defaultStartDate.toISOString(),
  exitDate: expectedExitDate(defaultStartDate).toISOString(),
  stipendAmount: LIVING_FUND_STIPEND_AMOUNT,
  isTakingLaptopStipend: true,
  expectedAnnualSalary: 90000,
}

const initialState = {
  ...defaultFormInputs,
  recalculateTimer: null,
}

export const actionTypes = {
  UPDATE_FORM: 'UPDATE_FORM',
  STOP_EDITING: 'STOP_EDITING',
  RECALCULATE: 'RECALCULATE',
}

export const reducer = (state = initialState, action) => {
  const {
    startDate,
    exitDate,
    stipendAmount,
    isTakingLaptopStipend,
    expectedAnnualSalary,
    recalculateTimer,
  } = action
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return {
        ...state,
        startDate: momentDayOnly(startDate).toISOString(),
        exitDate: momentDayOnly(exitDate).toISOString(),
        stipendAmount: Number(stipendAmount),
        isTakingLaptopStipend,
        expectedAnnualSalary: Number(expectedAnnualSalary),
        recalculateTimer,
      }
    case actionTypes.RECALCULATE:
      return {
        ...state,
        recalculateTimer,
      }
    default: return state
  }
}

export const updateForm = formData => (dispatch, getState) => {
  const {form} = getState()
  // since this is a "real time" form (no submit button), we only want to
  // recalculate once the user is completely done editing the values, so we wait
  // half a second before dispatching the RECALCULATE action
  clearTimeout(form.recalculateTimer)
  const recalculateTimer = setTimeout(() => {
    dispatch({...formData, recalculateTimer: null, type: actionTypes.RECALCULATE})
  }, 500)

  // update the form values immediately
  dispatch({
    ...formData,
    recalculateTimer,
    type: actionTypes.UPDATE_FORM,
  })
}
