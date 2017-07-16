import moment from 'moment'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'

import cardStyle from './cardStyle'

const iconForType = type => {
  if (type === 'holiday') {
    return 'tag_faces'
  }
  if (type === 'stipendPayment') {
    return 'attach_money'
  }
  return 'event'
}

class ImportantDates extends Component {
  render() {
    const {importantDates} = this.props

    const listItems = Object.keys(importantDates)
      .sort()
      .map((date, i) => {
        const type = importantDates[date]
        const caption = moment(date).format('D MMM YYYY')
        return (
          <ListItem key={i} leftIcon={iconForType(type)} caption={caption}/>
        )
      })

    return (
      <Card style={cardStyle}>
        <CardTitle title="Important Dates"/>
        <List>
          {listItems}
        </List>
      </Card>
    )
  }
}

ImportantDates.propTypes = {
  importantDates: PropTypes.object.isRequired,
}

const mapStateToProps = ({importantDates}) => ({importantDates})

export default connect(mapStateToProps)(ImportantDates)
