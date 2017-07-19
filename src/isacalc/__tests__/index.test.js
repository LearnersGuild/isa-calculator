import test from 'tape'

import {
  expectedExitDate,
  momentDayOnly,
  numDaysInISASession,
  throwsIfInvalidDates,
} from '@learnersguild/guild-dates'

import {
  PROGRAM_ISA_MAX_PERCENTAGE,
  SESSION_ISA_MAX_PERCENTAGE,
  isaSessionISAPercentage,
  isaProgramISAPercentage,
} from '../index'

test('isacalc/index', t => {
  t.test('isaSessionISAPercentage', tt => {
    tt.test('throws if the given dates are not dates', throwsIfInvalidDates(isaSessionISAPercentage))

    tt.test('returns SESSION_ISA_MAX_PERCENTAGE if session > 60% completed', ttt => {
      ttt.plan(1)
      const sessionPct = isaSessionISAPercentage(new Date('2016-11-28'), new Date('2017-07-07'), 2)
      ttt.equal(sessionPct, SESSION_ISA_MAX_PERCENTAGE, 'should be SESSION_ISA_MAX_PERCENTAGE')
    })

    tt.test('returns pro-rated amount of SESSION_ISA_MAX_PERCENTAGE if session < 60% completed', ttt => {
      ttt.plan(1)
      const sessionPct = isaSessionISAPercentage(new Date('2016-11-28'), new Date('2017-04-28'), 2)
      const expectedPct = (23 / 39) * SESSION_ISA_MAX_PERCENTAGE
      ttt.equal(sessionPct, expectedPct, 'should be pro-rated amount of SESSION_ISA_MAX_PERCENTAGE')
    })
  })

  t.test('isaProgramISAPercentage', tt => {
    tt.test('throws if the given dates are not dates', throwsIfInvalidDates(isaProgramISAPercentage))

    tt.test('returns PROGRAM_ISA_MAX_PERCENTAGE if stayed for close-to full program', ttt => {
      ttt.plan(1)
      const startDate = new Date('2016-11-28')
      const exitDate = momentDayOnly(expectedExitDate(startDate)).subtract(2, 'weeks').toDate()
      const programPct = isaProgramISAPercentage(startDate, exitDate)
      ttt.equal(programPct, PROGRAM_ISA_MAX_PERCENTAGE, 'should be PROGRAM_ISA_MAX_PERCENTAGE')
    })

    tt.test('returns < PROGRAM_ISA_MAX_PERCENTAGE if left early', ttt => {
      ttt.plan(1)
      const startDate = new Date('2016-11-28')
      const exitDate = new Date('2017-06-19')
      const programPct = isaProgramISAPercentage(startDate, exitDate)
      const expectedPct = (3 * SESSION_ISA_MAX_PERCENTAGE) + (15 / 34 * SESSION_ISA_MAX_PERCENTAGE)
      ttt.equal(programPct, expectedPct, 'should be 3 sessions plus ([completed days in 4th session] / [num days in 4th session] * 100)% of a 4th')
    })
  })
})
