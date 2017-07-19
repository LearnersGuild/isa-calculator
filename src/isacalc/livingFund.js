import {
  isaSessionEndDate,
  isaSessionStartDate,
  momentDayOnly,
  numDaysInISASession,
  openDaysBetween,
} from '@learnersguild/guild-dates'

// --- living fund

export const LIVING_FUND_STIPEND_AMOUNT = 13846
export const LIVING_FUND_ISA_MAX_PERCENTAGE = 0.085 // 8.5%
export const LAPTOP_STIPEND_AMOUNT = 1846
export const LIVING_FUND_TOTAL_STIPEND_AMOUNT = LIVING_FUND_STIPEND_AMOUNT + LAPTOP_STIPEND_AMOUNT

export const isaLivingFundISAPercentage = stipendReceived => {
  _assertNumber(stipendReceived)
  return Math.min(stipendReceived / LIVING_FUND_TOTAL_STIPEND_AMOUNT, 1.0) * LIVING_FUND_ISA_MAX_PERCENTAGE
}

export const isaLivingFundPaymentCap = stipendReceived => {
  _assertNumber(stipendReceived)
  return 2 * stipendReceived
}

const _assertNumber = num => {
  if (!isFinite(num)) {
    throw new Error(`expected number but received ${typeof num}`)
  }
  return true
}
