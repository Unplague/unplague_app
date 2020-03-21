import { combineReducers } from 'redux'
import measures from './measures'
import events from './events'
import actions from './actions'
import world from './world'

export default combineReducers({
    measures,
    events,
    actions,
    world,
})