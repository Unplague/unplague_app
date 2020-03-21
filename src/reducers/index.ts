import { combineReducers } from 'redux'
import measures from './measures'
import events from './events'
import actions from './actions'

export default combineReducers({
    measures,
    events,
    actions
})