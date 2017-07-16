import {holidaysBetween} from '../src/holidays'
import {breakWeekDaysBetween} from '../src/breakWeeks'
import {
  stipendPaymentDatesBetween,
  defaultStartDate,
  defaultExpectedExitDate,
} from '../src/programDates'
import {actionTypes} from './form'

const _dateTypeTagger = type => {
  return (acc, date) => {
    const datesWithTypes = {...acc, [date.toISOString()]: type}
    return datesWithTypes
  }
}

const _stateFromStartAndEndDates = (startDate, exitDate) => {
  const encounteredHolidays = holidaysBetween(startDate, exitDate)
    .reduce(_dateTypeTagger('holiday'), {})
  const encounteredBreakWeekDays = breakWeekDaysBetween(startDate, exitDate)
    .reduce(_dateTypeTagger('holiday'), {})
  const stipendPaymentDates = stipendPaymentDatesBetween(startDate, exitDate)
    .reduce(_dateTypeTagger('stipendPayment'), {})

  return {
    ...encounteredHolidays,
    ...encounteredBreakWeekDays,
    ...stipendPaymentDates,
  }
}

const initialState = _stateFromStartAndEndDates(defaultStartDate, defaultExpectedExitDate)

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return _stateFromStartAndEndDates(action.startDate, action.exitDate)
    default: return state
  }
}
