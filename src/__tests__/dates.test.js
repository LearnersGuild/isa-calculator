import test from 'tape'
import moment from 'moment'

import {
  expectedExitDate,
  isaCancellationDate,
  findNextStartDate,
} from '../dates'

test('src/dates', t => {
  t.test('expectedExitDate', tt => {
    tt.test('throws if the provided start date is not a date', ttt => {
      ttt.plan(1)
      ttt.throws(() => expectedExitDate('xyz'))
    })

    tt.test('returns Friday of (startDate + 41 weeks) if 1 break week is encountered', ttt => {
      ttt.plan(1)
      const exit = expectedExitDate(new Date('2016-07-11'))
      ttt.true(moment(exit).isSame('2017-04-28', 'day'), 'should be Friday of 41st week')
    })

    tt.test('returns Friday of (startDate + 42 weeks) if both break weeks are encountered', ttt => {
      ttt.plan(1)
      const exit = expectedExitDate(new Date('2017-05-08'))
      ttt.true(moment(exit).isSame('2018-03-02', 'day'), 'should be Friday of 42nd week')
    })
  })

  t.test('isaCancellationDate', tt => {
    tt.test('throws if the provided start date is not a date', ttt => {
      ttt.plan(1)
      ttt.throws(() => isaCancellationDate('xyz'))
    })

    tt.test('returns Monday of (startDate + 6) weeks if no break weeks are encountered', ttt => {
      ttt.plan(1)
      const cancel = isaCancellationDate(new Date('2017-02-06'))
      ttt.true(moment(cancel).isSame('2017-03-13'), 'should be Monday of 6th week')
    })

    tt.test('returns Monday of (startDate + 7) weeks if a break week is encountered', ttt => {
      ttt.plan(1)
      const cancel = isaCancellationDate(new Date('2017-12-04'))
      ttt.true(moment(cancel).isSame('2018-01-15'), 'should be Monday of 6th week')
    })
  })

  t.test('findNextStartDate', tt => {
    tt.test('throws if the provided start date is not a date', ttt => {
      ttt.plan(1)
      ttt.throws(() => findNextStartDate('xyz'))
    })

    tt.test('returns the next start date after the given date', ttt => {
      ttt.plan(1)
      const start = findNextStartDate(new Date('2017-06-01'))
      ttt.true(moment(start).isSame('2017-08-07'), 'should be 2017-Aug-07')
    })
  })

  t.end()
})
