import React, {Component} from 'react'
import {connect} from 'react-redux'

import Card from 'react-toolbox/lib/card/Card'
// import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'

import {updateISAVariables} from '../store'

class Calculations extends Component {
  render () {
    return (
      <Card style={{maxWidth: '32%', display: 'inline-block', marginRight: '1%'}}>
        <CardTitle title="ISA Details"/>
      </Card>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(Calculations)
