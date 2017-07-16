import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import Input from 'react-toolbox/lib/input/Input'

import {formatDate} from '../src/util'
import cardStyle from './cardStyle'

class Calculations extends Component {
  render() {
    const {
      expectedExitDate: expectedExitDateStr,
      isaCancellationDate: isaCancellationDateStr,
    } = this.props

    const exitDate = expectedExitDateStr ? formatDate(expectedExitDateStr) : ''
    const cancellationDate = isaCancellationDateStr ? formatDate(isaCancellationDateStr) : ''

    return (
      <Card style={cardStyle}>
        <CardTitle title="ISA Details"/>
        <CardText>
          <Input
            style={{color: 'black'}}
            icon="event"
            label="Expected Exit Date"
            value={exitDate}
            disabled
          />
          <Input
            style={{color: 'black'}}
            icon="event"
            label="ISA Cancellation Date"
            value={cancellationDate}
            disabled
          />
        </CardText>
      </Card>
    )
  }
}

Calculations.propTypes = {
  expectedExitDate: PropTypes.string.isRequired,
  isaCancellationDate: PropTypes.string.isRequired,
}

const mapStateToProps = ({
  calculations: {
    expectedExitDate,
    isaCancellationDate,
  },
}) => ({
  expectedExitDate,
  isaCancellationDate,
})

export default connect(mapStateToProps)(Calculations)
