import {combineReducers, createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import {reducer as form} from './form'
import {reducer as calculations} from './calculations'

const reducer = combineReducers({
  form,
  calculations,
})

export const initStore = (state) => {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
