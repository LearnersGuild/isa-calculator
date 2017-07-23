import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import Input from 'react-toolbox/lib/input/Input'

import {formatDate} from '@learnersguild/guild-dates'

import cardStyle from './cardStyle'

const formatMoney = num => `$ ${Number(num.toFixed(2)).toLocaleString()}`
const formatPercent = num => `${(num * 100).toFixed(2)} %`

class Calculations extends Component {
  render() {
    const {
      expectedExitDate: expectedExitDateStr,
      isaCancellationDate: isaCancellationDateStr,
      programISAPercentage,
      programISAMonthlyPayment,
      programISAPaymentCap,
      programISARebateAmount,
      stipendReceived,
      livingFundISAPercentage,
      livingFundISAMonthlyPayment,
      livingFundISAPaymentCap,
    } = this.props

    const exitDate = expectedExitDateStr ? formatDate(expectedExitDateStr) : ''
    const cancellationDate = isaCancellationDateStr ? formatDate(isaCancellationDateStr) : ''
    const inputTheme = {inputElement: 'inputBlack'}

    return (
      <Card style={cardStyle()}>
        <CardTitle title="ISA Details"/>
        <CardText>
          <Input
            theme={inputTheme}
            icon="event"
            label="Expected Exit Date"
            value={exitDate}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="event"
            label="ISA Cancellation Date"
            value={cancellationDate}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="navigate_next"
            label="Pay it Forward ISA %"
            value={formatPercent(programISAPercentage)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="attach_money"
            label="Pay it Forward ISA Monthly Payment"
            value={formatMoney(programISAMonthlyPayment)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="attach_money"
            label="Pay it Forward ISA Payment Cap"
            value={formatMoney(programISAPaymentCap)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="attach_money"
            label="Pay it Forward ISA Rebate Amount"
            value={formatMoney(programISARebateAmount)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="attach_money"
            label="Total Stipend Received"
            value={formatMoney(stipendReceived)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="navigate_next"
            label="Living Fund ISA %"
            value={formatPercent(livingFundISAPercentage)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="attach_money"
            label="Living Fund ISA Monthly Payment"
            value={formatMoney(livingFundISAMonthlyPayment)}
            disabled
          />
          <Input
            theme={inputTheme}
            icon="attach_money"
            label="Living Fund ISA Payment Cap"
            value={formatMoney(livingFundISAPaymentCap)}
            disabled
          />
        </CardText>
        <style jsx global>{`
          .inputBlack {
            color: black !important;
            opacity: 1
          }
        `}</style>
      </Card>
    )
  }
}

Calculations.propTypes = {
  expectedExitDate: PropTypes.string.isRequired,
  isaCancellationDate: PropTypes.string.isRequired,
  programISAPercentage: PropTypes.number.isRequired,
  programISAMonthlyPayment: PropTypes.number.isRequired,
  programISAPaymentCap: PropTypes.number.isRequired,
  programISARebateAmount: PropTypes.number.isRequired,
  stipendReceived: PropTypes.number.isRequired,
  livingFundISAPercentage: PropTypes.number.isRequired,
  livingFundISAMonthlyPayment: PropTypes.number.isRequired,
  livingFundISAPaymentCap: PropTypes.number.isRequired,
}

const mapStateToProps = ({
  calculations: {
    expectedExitDate,
    isaCancellationDate,
    programISAPercentage,
    programISAMonthlyPayment,
    programISAPaymentCap,
    programISARebateAmount,
    stipendReceived,
    livingFundISAPercentage,
    livingFundISAMonthlyPayment,
    livingFundISAPaymentCap,
  },
}) => ({
  expectedExitDate,
  isaCancellationDate,
  programISAPercentage,
  programISAMonthlyPayment,
  programISAPaymentCap,
  programISARebateAmount,
  stipendReceived,
  livingFundISAPercentage,
  livingFundISAMonthlyPayment,
  livingFundISAPaymentCap,
})

export default connect(mapStateToProps)(Calculations)
