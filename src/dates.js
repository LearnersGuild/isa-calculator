import moment from 'moment'

import x from '../config/dates'
import {
  startDates,
  weekBreakStarts,
  holidays,
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

const _numBreakWeeks = (startDate, weeks) => {
  const start = moment(startDate).clone()
  const end = start.clone().add(weeks, 'weeks')
  let breaks = 0

  for (let i in weekBreakStarts) {
    const breakStart = moment(weekBreakStarts[i]).clone()
    if (breakStart.isBetween(start, end)) {
      breaks++
    }
  }

  return breaks
}

const _addProgramWeeks = (startDate, weeks) => {
  return _normalizeDate(startDate)
    .clone()
    .add(weeks + _numBreakWeeks(startDate, weeks), 'weeks')
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

export const findNextDateInArrayAfter = (array, date = new Date) => {
  const d = _normalizeDate(date)
  for (let i in array) {
    const currDate = moment(array[i])
    if (currDate.isAfter(d)) {
      return currDate.toDate()
    }
  }

  return null
}
