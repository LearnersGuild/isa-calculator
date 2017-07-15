import moment from 'moment'

import {momentDayOnly} from './util'
import {isHoliday} from './holidays'
import {isDuringBreakWeek} from './breakWeeks'

const _legacyStartDates = [
  momentDayOnly('2016-07-11'),
  momentDayOnly('2016-09-19'),
  momentDayOnly('2016-11-28'),
  momentDayOnly('2017-02-06'),
  momentDayOnly('2017-02-13'),
  momentDayOnly('2017-02-21'),
  momentDayOnly('2017-02-27'),
  momentDayOnly('2017-03-06'),
  momentDayOnly('2017-03-20'),
  momentDayOnly('2017-03-27'),
  momentDayOnly('2017-04-10'),
  momentDayOnly('2017-04-17'),
  momentDayOnly('2017-04-24'),
  momentDayOnly('2017-05-01'),
  momentDayOnly('2017-05-08'),
]

const _legacyStartDate = date => {
  const input = momentDayOnly(date)
  for (let i in _legacyStartDates) {
    if (input.isBefore(_legacyStartDates[i])) {
      return _legacyStartDates[i]
    }
  }
  return null
}

export const startDate = (date = new Date()) => {
  const input = momentDayOnly(date)
  if (input.isBefore(_legacyStartDates[_legacyStartDates.length - 1])) {
    return _legacyStartDate(date)
  }

  const firstMondayNextMonth = input
    .clone()
    .endOf('month')
    .endOf('isoWeek')
    .add(1, 'day')
  const output = momentDayOnly(firstMondayNextMonth)

  while (
    isHoliday(output) ||
    isDuringBreakWeek(output) ||
    output.day() === 0 ||
    output.day() === 6) {
    output.add(1, 'day')
  }

  return output
}
