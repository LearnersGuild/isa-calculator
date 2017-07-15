import test from 'tape'

import {momentDayOnly, throwsIfInvalidDate} from '../util'

import {startDate} from '../startDates'

test('src/startDates', t => {
  t.test('startDate', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(startDate))

    tt.test('returns the legacy start date if before 2017-05-08', ttt => {
      ttt.plan(1)
      const sd = startDate('2017-04-12')
      const expected = momentDayOnly('2017-04-17')
      ttt.true(sd.isSame(expected), 'should be 2017-04-17')
    })

    tt.test('returns first Monday of next month if not a holiday', ttt => {
      ttt.plan(1)
      const sd = startDate('2017-09-15')
      const expected = momentDayOnly('2017-10-02')
      ttt.true(sd.isSame(expected), 'should be first Monday of next month')
    })

    tt.test('returns first Tuesday of next month if first Monday falls on a holiday', ttt => {
      ttt.plan(1)
      const sd = startDate('2017-08-15')
      const expected = momentDayOnly('2017-09-05')
      ttt.true(sd.isSame(expected), 'should be first Tuesday of next month')
    })
  })
})
