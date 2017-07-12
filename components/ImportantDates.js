import React, {Component} from 'react'
import {connect} from 'react-redux'

import Card from 'react-toolbox/lib/card/Card'
// import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'

import {updateImportantDates} from '../store'

class ImportantDates extends Component {
  render () {
    return (
      <Card style={{maxWidth: '32%', display: 'inline-block', marginRight: '1%'}}>
        <CardTitle title="Important Dates"/>
      </Card>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(ImportantDates)
