import {
  expectedExitDate,
  isaCancellationDate,
} from '@learnersguild/guild-dates'

import {
  isaLivingFundISAPercentage,
  isaLivingFundPaymentCap,
  isaProgramISAPercentage,
  isaProgramPaymentCap,
  LAPTOP_STIPEND_AMOUNT,
  LIVING_FUND_STIPEND_AMOUNT,
} from '../isacalc'

import {
  actionTypes,
  defaultFormInputs,
} from './form'

const totalStipendReceived = (stipendAmount, isTakingLaptopStipend) => {
  const laptopStipendReceived = isTakingLaptopStipend ? LAPTOP_STIPEND_AMOUNT : 0
  const received = stipendAmount + laptopStipendReceived
  return received
}

const programISAMonthlyPayment = (expectedAnnualSalary, programISAPercentage) => {
  return expectedAnnualSalary * programISAPercentage / 12
}

const livingFundISAMonthlyPayment = (expectedAnnualSalary, livingFundISAPercentage) => {
  return expectedAnnualSalary * livingFundISAPercentage / 12
}

const programISAPercentage = isaProgramISAPercentage(defaultFormInputs.startDate, defaultFormInputs.exitDate)
const stipendReceived = totalStipendReceived(LIVING_FUND_STIPEND_AMOUNT, defaultFormInputs.isTakingLaptopStipend)
const livingFundISAPercentage = isaLivingFundISAPercentage(stipendReceived)

const initialState = {
  expectedExitDate: expectedExitDate(defaultFormInputs.startDate).toISOString(),
  isaCancellationDate: isaCancellationDate(defaultFormInputs.startDate, defaultFormInputs.exitDate),
  programISAPercentage,
  programISAMonthlyPayment: programISAMonthlyPayment(defaultFormInputs.expectedAnnualSalary, programISAPercentage),
  programISAPaymentCap: isaProgramPaymentCap(defaultFormInputs.startDate, defaultFormInputs.exitDate),
  stipendReceived,
  livingFundISAPercentage,
  livingFundISAMonthlyPayment: livingFundISAMonthlyPayment(defaultFormInputs.expectedAnnualSalary, livingFundISAPercentage),
  livingFundISAPaymentCap: isaLivingFundPaymentCap(stipendReceived),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECALCULATE: {
      const {
        startDate,
        exitDate,
        stipendAmount,
        isTakingLaptopStipend,
        expectedAnnualSalary,
      } = action
      const programISAPercentage = isaProgramISAPercentage(startDate, exitDate)
      const stipendReceived = totalStipendReceived(stipendAmount, isTakingLaptopStipend)
      const livingFundISAPercentage = isaLivingFundISAPercentage(stipendReceived)

      const newState = {
        ...state,
        expectedExitDate: expectedExitDate(startDate).toISOString(),
        isaCancellationDate: isaCancellationDate(startDate).toISOString(),
        programISAPercentage,
        programISAMonthlyPayment: programISAMonthlyPayment(expectedAnnualSalary, programISAPercentage),
        programISAPaymentCap: isaProgramPaymentCap(startDate, exitDate),
        stipendReceived,
        livingFundISAPercentage,
        livingFundISAMonthlyPayment: livingFundISAMonthlyPayment(expectedAnnualSalary, livingFundISAPercentage),
        livingFundISAPaymentCap: isaLivingFundPaymentCap(stipendReceived),
      }
      return newState
    }
    default: return state
  }
}
