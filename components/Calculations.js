import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import Input from 'react-toolbox/lib/input/Input'

class Calculations extends Component {
  render () {
    const {
      expectedExitDate: expectedExitDateStr,
      isaCancellationDate: isaCancellationDateStr,
    } = this.props

    const exitDate = expectedExitDateStr ?
      moment(expectedExitDateStr).format('D MMM YYYY') :
      ''
    const cancellationDate = isaCancellationDateStr ?
      moment(isaCancellationDateStr).format('D MMM YYYY') :
      ''

    return (
      <Card style={{maxWidth: '32%', display: 'inline-block', marginRight: '1%'}}>
        <CardTitle title="ISA Details"/>
        <CardText>
          <Input
            style={{color: 'black'}}
            icon="event"
            label="Expected Exit Date"
            value={exitDate}
            disabled/>
          <Input
            style={{color: 'black'}}
            icon="event"
            label="ISA Cancellation Date"
            value={cancellationDate}
            disabled/>
        </CardText>
      </Card>
    )
  }
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
