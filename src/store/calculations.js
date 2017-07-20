import {
  expectedExitDate,
  isaCancellationDate,
  defaultExpectedExitDate,
  defaultISACancellationDate,
  defaultStartDate,
} from '@learnersguild/guild-dates'

import {
  isaLivingFundISAPercentage,
  isaLivingFundPaymentCap,
  isaProgramISAPercentage,
  isaProgramPaymentCap,
  LAPTOP_STIPEND_AMOUNT,
  LIVING_FUND_STIPEND_AMOUNT,
} from '../isacalc'

import {actionTypes} from './form'

const totalStipendReceived = (stipendAmount, isTakingLaptopStipend) => {
  const laptopStipendReceived = isTakingLaptopStipend ? LAPTOP_STIPEND_AMOUNT : 0
  return stipendAmount + laptopStipendReceived
}

const programISAMonthlyPayment = (expectedAnnualSalary, programISAPercentage) => {
  return expectedAnnualSalary * programISAPercentage / 12
}

const livingFundISAMonthlyPayment = (expectedAnnualSalary, livingFundISAPercentage) => {
  return expectedAnnualSalary * livingFundISAPercentage / 12
}

const programISAPercentage = isaProgramISAPercentage(defaultStartDate, defaultExpectedExitDate)
const stipendReceived = totalStipendReceived(LIVING_FUND_STIPEND_AMOUNT, true)
const livingFundISAPercentage = isaLivingFundISAPercentage(defaultStartDate, defaultExpectedExitDate)

const initialState = {
  expectedExitDate: defaultExpectedExitDate.toISOString(),
  isaCancellationDate: defaultISACancellationDate.toISOString(),
  programISAPercentage,
  programISAMonthlyPayment: programISAMonthlyPayment(90000, programISAPercentage),
  programISAPaymentCap: isaProgramPaymentCap(defaultStartDate, defaultExpectedExitDate),
  stipendReceived,
  livingFundISAPercentage,
  livingFundISAMonthlyPayment: livingFundISAMonthlyPayment(90000, livingFundISAPercentage),
  livingFundISAPaymentCap: isaLivingFundPaymentCap(stipendReceived),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_START_DATE:
    case actionTypes.UPDATE_EXIT_DATE:
    case actionTypes.UPDATE_STIPEND_AMOUNT:
    case actionTypes.UPDATE_IS_TAKING_LAPTOP_STIPEND:
    case actionTypes.UPDATE_EXPECTED_ANNUAL_SALARY: {
      const programISAPercentage = isaProgramISAPercentage(action.startDate, action.exitDate)
      const stipendReceived = totalStipendReceived(action.stipendAmount, action.isTakingLaptopStipend)
      const livingFundISAPercentage = isaLivingFundISAPercentage(stipendReceived)

      const newState = {
        ...state,
        expectedExitDate: expectedExitDate(action.startDate).toISOString(),
        isaCancellationDate: isaCancellationDate(action.startDate).toISOString(),
        programISAPercentage,
        programISAMonthlyPayment: programISAMonthlyPayment(action.expectedAnnualSalary, programISAPercentage),
        programISAPaymentCap: isaProgramPaymentCap(action.startDate, action.exitDate),
        stipendReceived,
        livingFundISAPercentage,
        livingFundISAMonthlyPayment: livingFundISAMonthlyPayment(action.expectedAnnualSalary, livingFundISAPercentage),
        livingFundISAPaymentCap: isaLivingFundPaymentCap(stipendReceived),
      }
      return newState
    }
    default: return state
  }
}
