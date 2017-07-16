import moment from 'moment'

export const momentDayOnly = date => {
  const dayOnly = moment(date)
  if (!dayOnly.isValid()) {
    throw new Error(`${date} is not a valid date`)
  }
  return dayOnly
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
}

export const throwsIfInvalidDate = func => {
  return ttt => {
    ttt.plan(1)
    ttt.throws(() => func('xyz'))
  }
}

export const formatDate = date => {
  return moment(date).format('ddd DD MMM YYYY')
}
