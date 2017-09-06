import {
  closedDaysBetween,
  stipendPaymentDatesBetween,
  isaSessionStartDates as isaSessionStartDatesFrom,
} from '@learnersguild/guild-dates'

import {
  actionTypes,
  defaultFormInputs,
} from './form'

const _dateTypeTagger = type => {
  return (acc, date) => {
    const datesWithTypes = {...acc, [date.toISOString()]: type}
    return datesWithTypes
  }
}

const _stateFromStartAndEndDates = (startDate, exitDate) => {
  const closedDays = closedDaysBetween(startDate, exitDate)
    .reduce(_dateTypeTagger('holiday'), {})
  const stipendPaymentDates = stipendPaymentDatesBetween(startDate, exitDate)
    .reduce(_dateTypeTagger('stipendPayment'), {})
  const isaSessionStartDates = isaSessionStartDatesFrom(startDate)
    .reduce(_dateTypeTagger('isaSessionStart'), {})

  const merged = {
    ...closedDays,
    ...stipendPaymentDates,
    ...isaSessionStartDates,
  }

  return merged
}

const initialState = _stateFromStartAndEndDates(defaultFormInputs.startDate, defaultFormInputs.exitDate)

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EXIT_DATE:
      return _stateFromStartAndEndDates(action.startDate, action.exitDate)
    default: return state
  }
}
