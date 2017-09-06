import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'

import {
  formatDate,
  momentDayOnly,
} from '@learnersguild/guild-dates'

import cardStyle from './cardStyle'

const iconForType = type => {
  if (type === 'holiday') {
    return 'tag_faces'
  }
  if (type === 'stipendPayment') {
    return 'attach_money'
  }
  if (type === 'isaSessionStart') {
    return 'today'
  }
  return 'event'
}

const DAY_MILLIS = 60 * 60 * 24 * 1000

class ImportantDates extends Component {
  renderDates() {
    const {importantDates} = this.props

    const sortedDates = Object.keys(importantDates).sort()

    return sortedDates
      .reduce((keys, currDateStr, i) => {
        const prevDateStr = sortedDates[i - 1]
        const prevType = i === 0 ? null : importantDates[prevDateStr]
        const prevDate = i === 0 ? momentDayOnly('1970-01-01') : momentDayOnly(prevDateStr)
        const currType = importantDates[currDateStr]
        const currDate = momentDayOnly(currDateStr)
        const diffMillis = currDate.valueOf() - prevDate.valueOf()
        if (diffMillis <= DAY_MILLIS && prevType === currType) {
          keys[keys.length - 1].end = currDateStr
        } else {
          keys.push({start: currDateStr, end: currDateStr, type: currType})
        }
        return keys
      }, [])
      .map((dateInfo, i) => {
        const {start, end, type} = dateInfo
        const formatted = start === end ?
          formatDate(start) :
          `${formatDate(start)} — ${formatDate(end)}`
        const caption = <span style={{color: 'black'}}>{formatted}</span>
        return (
          <ListItem key={i} leftIcon={iconForType(type)} ripple={false}>{caption}</ListItem>
        )
      })
  }

  render() {
    return (
      <Card style={cardStyle()}>
        <CardTitle title="Important Dates"/>
        <List>
          {this.renderDates()}
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
