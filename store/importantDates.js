import {actionTypes} from './form'
import {
  allDaysOff,
  findDatesInArrayBetween,
  defaultStartDate,
  defaultExpectedExitDate,
  defaultISACancellationDate,
} from '../src/dates'

const _dateTypeTagger = type => {
  return (acc, date) => {
    const datesWithTypes = {...acc, [date.toISOString()]: type}
    return datesWithTypes
  }
}

const encounteredHolidays = findDatesInArrayBetween(allDaysOff, defaultStartDate, defaultExpectedExitDate)
  .reduce(_dateTypeTagger('holiday'), {})

const initialState = encounteredHolidays

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return findDatesInArrayBetween(allDaysOff, action.startDate, action.exitDate)
        .reduce(_dateTypeTagger('holiday'), {})
    default: return state
  }
}
