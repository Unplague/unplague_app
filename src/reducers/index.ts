import { combineReducers } from 'redux'
import measures from './measures'
import events from './events'

export default combineReducers({
    measures,
    events
})