import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import DatePicker from 'react-toolbox/lib/date_picker/DatePicker'
import Input from 'react-toolbox/lib/input/Input'
import Switch from 'react-toolbox/lib/switch/Switch'

import {updateISAVariables} from '../store'

class ISAVariables extends Component {
  update = newProps => {
    this.props.onUpdate(newProps)
  }

  handleChange = (name, value) => {
    this.update({...this.props, [name]: value})
  }

  render () {
    const {
      startDate: startDateStr,
      stipendAmount,
      isTakingLaptopStipend,
      expectedAnnualSalary,
      exitDate: exitDateStr,
    } = this.props

    const startDate = new Date(startDateStr)
    const exitDate = new Date(exitDateStr)

    return (
      <div>
        <DatePicker
          icon="event"
          label="Start Date"
          onChange={this.handleChange.bind(this, 'startDate')}
          value={startDate}
          required/>
        <Input
          icon="attach_money"
          type="tel"
          label="Living Fund Stipend Amount"
          onChange={this.handleChange.bind(this, 'stipendAmount')}
          value={stipendAmount}
          required/>
        <Switch
          checked={isTakingLaptopStipend}
          label="Taking laptop stipend?"
          onChange={this.handleChange.bind(this, 'isTakingLaptopStipend')}/>
        <Input
          icon="attach_money"
          type="tel"
          label="Expected Annual Salary"
          onChange={this.handleChange.bind(this, 'expectedAnnualSalary')}
          value={expectedAnnualSalary}
          required/>
        <DatePicker
          icon="event"
          label="Exit Date"
          onChange={this.handleChange.bind(this, 'exitDate')}
          value={exitDate}
          required/>
      </div>
    )
  }
}

const mapStateToProps = ({
  startDate,
  exitDate,
  stipendAmount,
  isTakingLaptopStipend,
  expectedAnnualSalary,
}) => ({
  startDate,
  exitDate,
  stipendAmount,
  isTakingLaptopStipend,
  expectedAnnualSalary,
})

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: bindActionCreators(updateISAVariables, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ISAVariables)
