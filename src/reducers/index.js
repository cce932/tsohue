import { combineReducers } from 'redux'
import auth from './auth'
import messages from './messages'
import recipes from './recipes'
import orderOverview from './orderOverview'
import favorite from './favorite'

export default combineReducers({
  auth,
  messages,
  recipes,
  orderOverview,
  favorite,
})
