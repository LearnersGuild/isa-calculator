import moment from 'moment'

import {
  startDates,
  weekBreakStarts,
  holidays,
  stipendConfig,
  MAX_PROGRAM_WEEKS,
  CANCELLATION_WEEKS,
} from '../config/dates'

const _normalizeDate = date => {
  const normalized = moment(date)
  if (!normalized.isValid()) {
    throw new Error(`invalid date: ${date}`)
  }

  return normalized
    .clone()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
}

const _weekBreaks = weekBreakStarts.reduce((breakDays, breakStart) => {
  const start = moment(breakStart)
  const thisBreakDays = [
    start.clone(),
    start.add(1, 'day').clone(),
    start.add(1, 'day').clone(),
    start.add(1, 'day').clone(),
    start.add(1, 'day').clone(),
  ].map(m => m.format('YYYY-MM-DD'))
  return breakDays.concat(thisBreakDays)
}, [])
export const allDaysOff = [...new Set(holidays.concat(_weekBreaks).sort())]

const _numBreakWeeks = (startDate, weeks) => {
  const start = moment(startDate).clone()
  const end = start.clone().add(weeks, 'weeks')

  return weekBreakStarts
    .map(d => moment(d))
    .reduce((numBreaks, breakStart) => {
      if (breakStart.isBetween(start, end)) {
        return numBreaks + 1
      }
      return numBreaks
    }, 0)
}

const _addProgramWeeks = (startDate, weeks) => {
  return _normalizeDate(startDate)
    .clone()
    .add(weeks + _numBreakWeeks(startDate, weeks), 'weeks')
}

export const findDatesInArrayBetween = (array, start = new Date(), end = new Date()) => {
  const d1 = _normalizeDate(start)
  const d2 = _normalizeDate(end)

  return array
    .map(d => moment(d))
    .filter(currDate => {
      return currDate.isAfter(d1) && currDate.isBefore(d2)
    })
    .map(filteredDate => filteredDate.toDate())
}

export const findNextDateInArrayAfter = (array, date = new Date()) => {
  return findDatesInArrayBetween(array, date, array[array.length - 1])[0]
}

export const expectedExitDate = startDate => {
  return _addProgramWeeks(_normalizeDate(startDate), MAX_PROGRAM_WEEKS)
    .clone()
    .day('Friday')
    .toDate()
}

export const isaCancellationDate = startDate => {
  return _addProgramWeeks(_normalizeDate(startDate), CANCELLATION_WEEKS)
    .clone()
    .day('Monday')
    .toDate()
}

export const stipendPaymentDatesBetween = (startDate, endDate) => {
  const stipendPaymentDate = _normalizeDate(stipendConfig.firstDisbursementDate)
  const start = _normalizeDate(startDate)
  const end = _normalizeDate(endDate)
  const paymentDates = []
  while (stipendPaymentDate < start) {
    stipendPaymentDate.add(2, 'weeks')
  }
  while (stipendPaymentDate.isAfter(start) && stipendPaymentDate.isBefore(end)) {
    paymentDates.push(stipendPaymentDate.clone())
    stipendPaymentDate.add(2, 'weeks')
  }
  return paymentDates.map(m => m.toDate())
}

export const defaultStartDate = findNextDateInArrayAfter(startDates)
export const defaultExpectedExitDate = expectedExitDate(defaultStartDate)
export const defaultISACancellationDate = isaCancellationDate(defaultStartDate)
