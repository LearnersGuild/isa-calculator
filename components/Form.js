import moment from 'moment'

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

import {updateForm} from '../store/form'
import {formatDate} from '../src/util'

import cardStyle from './cardStyle'

class Form extends Component {
  update(newProps) {
    this.props.onUpdate(newProps)
  }

  handleChange(name, value) {
    this.update({...this.props, [name]: value})
  }

  render() {
    const {
      startDate: startDateStr,
      stipendAmount,
      isTakingLaptopStipend,
      expectedAnnualSalary,
      exitDate: exitDateStr,
    } = this.props

    const startDate = new Date(startDateStr)
    const exitDate = new Date(exitDateStr)
    const handleChange = name => value => this.handleChange(name, value)

    return (
      <Card style={cardStyle}>
        <CardTitle title="Learner Details"/>
        <CardText>
          <DatePicker
            icon="event"
            label="Start Date"
            onChange={handleChange('startDate')}
            inputFormat={formatDate}
            value={startDate}
            required
          />
          <DatePicker
            icon="event"
            label="Exit Date"
            onChange={handleChange('exitDate')}
            inputFormat={formatDate}
            value={exitDate}
            required
          />
          <Input
            icon="attach_money"
            type="tel"
            label="Living Fund Stipend Amount"
            onChange={handleChange('stipendAmount')}
            value={stipendAmount}
            required
          />
          <Switch
            checked={isTakingLaptopStipend}
            label="Taking laptop stipend?"
            onChange={handleChange('isTakingLaptopStipend')}
          />
          <Input
            icon="attach_money"
            type="tel"
            label="Expected Annual Salary"
            onChange={handleChange('expectedAnnualSalary')}
            value={expectedAnnualSalary}
            required
          />
        </CardText>
      </Card>
    )
  }
}

Form.propTypes = {
  onUpdate: PropTypes.func.isRequired,
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
    onUpdate: bindActionCreators(updateForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
