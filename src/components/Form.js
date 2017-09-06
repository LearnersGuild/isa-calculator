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

import {
  formatDate,
} from '@learnersguild/guild-dates'

import {updateForm} from '../store/form'

import cardStyle from './cardStyle'

// react-toolbox's DatePicker assumes _local_ timezone, but guild-dates assumes
// UTC, so we need to do this conversion to make things behave properly
const dayOnlyDate = str => {
  const d = new Date(str)
  d.setMinutes(d.getTimezoneOffset())
  return d
}

class Form extends Component {
  render() {
    const {
      startDate: startDateStr,
      exitDate: exitDateStr,
      stipendAmount,
      isTakingLaptopStipend,
      expectedAnnualSalary,
      onUpdate,
    } = this.props

    const startDate = dayOnlyDate(startDateStr)
    const exitDate = dayOnlyDate(exitDateStr)

    const handleUpdate = name => value => {
      onUpdate({
        startDate,
        exitDate,
        stipendAmount,
        isTakingLaptopStipend,
        expectedAnnualSalary,
        [name]: value,
      })
    }

    return (
      <Card style={cardStyle()}>
        <CardTitle title="Learner Details"/>
        <CardText>
          <DatePicker
            icon="event"
            label="Start Date"
            onChange={handleUpdate('startDate')}
            inputFormat={formatDate}
            value={startDate}
            required
          />
          <DatePicker
            icon="event"
            label="Exit Date"
            onChange={handleUpdate('exitDate')}
            inputFormat={formatDate}
            value={exitDate}
            required
          />
          <Input
            icon="attach_money"
            type="tel"
            label="Living Fund Stipend Amount"
            onChange={handleUpdate('stipendAmount')}
            value={stipendAmount}
            required
          />
          <Switch
            label="Taking laptop stipend?"
            onChange={handleUpdate('isTakingLaptopStipend')}
            checked={isTakingLaptopStipend}
          />
          <Input
            icon="attach_money"
            type="tel"
            label="Expected Annual Salary"
            onChange={handleUpdate('expectedAnnualSalary')}
            value={expectedAnnualSalary}
            required
          />
        </CardText>
      </Card>
    )
  }
}

Form.propTypes = {
  startDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
  stipendAmount: PropTypes.number.isRequired,
  isTakingLaptopStipend: PropTypes.bool.isRequired,
  expectedAnnualSalary: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
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
    onUpdate: bindActionCreators(updateForm, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
