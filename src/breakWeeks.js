import {momentDayOnly} from './util'

const _lastFullWeekOfMonthMonday = (month, date = new Date()) => {
  const input = momentDayOnly(date)
  const output = input
    .clone()
    .startOf('year')
    .month(month)
    .startOf('isoWeek')
  const firstOfNextMonth = output
    .clone()
    .month(month + 1)
    .startOf('month')

  while (output.clone().add(13, 'days').isSameOrBefore(firstOfNextMonth)) {
    output.add(1, 'week')
  }

  // ensure that we get the _next_ one
  output.add(output > input ? 0 : 52, 'weeks')

  return output
}

const _weekdaysForMonday = mon => {
  return [
    mon,
    mon.clone().add(1, 'days'),
    mon.clone().add(2, 'days'),
    mon.clone().add(3, 'days'),
    mon.clone().add(4, 'days'),
  ]
}

export const summerBreakWeekMonday = date => {
  const input = momentDayOnly(date)
  const summer2017BreakWeekMonday = momentDayOnly('2017-06-12')
  return input.isBefore(summer2017BreakWeekMonday) ?
    summer2017BreakWeekMonday :
    _lastFullWeekOfMonthMonday(5, date)
}

export const winterBreakWeekMonday = date => _lastFullWeekOfMonthMonday(11, date)

export const summerBreakWeekDays = date => {
  const mon = summerBreakWeekMonday(date)
  return _weekdaysForMonday(mon)
}

export const winterBreakWeekDays = date => {
  const mon = winterBreakWeekMonday(date)
  return _weekdaysForMonday(mon)
}

const _breakWeekDaysAfter = date => {
  return summerBreakWeekDays(date).concat(winterBreakWeekDays(date))
}

export const breakWeekDaysBetween = (startDate, endDate) => {
  const start = momentDayOnly(startDate)
  const end = momentDayOnly(endDate)
  return _breakWeekDaysAfter(start)
    .filter(day => day.isSameOrAfter(start) && day.isSameOrBefore(end))
    .map(day => day.toDate())
}

export const isDuringBreakWeek = (date = new Date()) => {
  const input = momentDayOnly(date)
  const lastWeek = input.clone().subtract(1, 'week')
  const breakWeekDays = _breakWeekDaysAfter(lastWeek)
  const foundBreakWeekDay = breakWeekDays.find(d => d.isSame(input))
  return Boolean(foundBreakWeekDay)
}
