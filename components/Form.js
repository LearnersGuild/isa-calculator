import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker'
import Input from 'react-toolbox/lib/input/Input'
import Switch from 'react-toolbox/lib/switch/Switch'

import {formatDate} from '@learnersguild/guild-dates'

import {
  updateStartDate,
  updateExitDate,
  updateStipendAmount,
  updateIsTakingLaptopStipend,
  updateExpectedAnnualSalary,
} from '../store/form'

import cardStyle from './cardStyle'

class Form extends Component {
  render() {
    const {
      startDate: startDateStr,
      exitDate: exitDateStr,
      stipendAmount,
      isTakingLaptopStipend,
      expectedAnnualSalary,
      onUpdateStartDate,
      onUpdateExitDate,
      onUpdateStipendAmount,
      onUpdateIsTakingLaptopStipend,
      onUpdateExpectedAnnualSalary,
    } = this.props

    const startDate = new Date(startDateStr)
    const exitDate = new Date(exitDateStr)

    return (
      <Card style={cardStyle}>
        <CardTitle title="Learner Details"/>
        <CardText>
          <DatePicker
            icon="event"
            label="Start Date"
            onChange={onUpdateStartDate}
            inputFormat={formatDate}
            value={startDate}
            required
          />
          <DatePicker
            icon="event"
            label="Exit Date"
            onChange={onUpdateExitDate}
            inputFormat={formatDate}
            value={exitDate}
            required
          />
          <Input
            icon="attach_money"
            type="tel"
            label="Living Fund Stipend Amount"
            onChange={onUpdateStipendAmount}
            value={stipendAmount}
            required
          />
          <Switch
            checked={isTakingLaptopStipend}
            label="Taking laptop stipend?"
            onChange={onUpdateIsTakingLaptopStipend}
          />
          <Input
            icon="attach_money"
            type="tel"
            label="Expected Annual Salary"
            onChange={onUpdateExpectedAnnualSalary}
            value={expectedAnnualSalary}
            required
          />
        </CardText>
      </Card>
    )
  }
}

Form.propTypes = {
  onUpdateStartDate: PropTypes.func.isRequired,
  onUpdateExitDate: PropTypes.func.isRequired,
  onUpdateStipendAmount: PropTypes.func.isRequired,
  onUpdateIsTakingLaptopStipend: PropTypes.func.isRequired,
  onUpdateExpectedAnnualSalary: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
  stipendAmount: PropTypes.number.isRequired,
  isTakingLaptopStipend: PropTypes.bool.isRequired,
  expectedAnnualSalary: PropTypes.number.isRequired,
}

const mapStateToProps = ({
  form: {
    startDate,
    exitDate,
    stipendAmount,
    isTakingLaptopStipend,
    expectedAnnualSalary,
  },
}) => ({
  startDate,
  exitDate,
  stipendAmount,
  isTakingLaptopStipend,
  expectedAnnualSalary,
})

const mapDispatchToProps = dispatch => {
  return {
    onUpdateStartDate: bindActionCreators(updateStartDate, dispatch),
    onUpdateExitDate: bindActionCreators(updateExitDate, dispatch),
    onUpdateStipendAmount: bindActionCreators(updateStipendAmount, dispatch),
    onUpdateIsTakingLaptopStipend: bindActionCreators(updateIsTakingLaptopStipend, dispatch),
    onUpdateExpectedAnnualSalary: bindActionCreators(updateExpectedAnnualSalary, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
