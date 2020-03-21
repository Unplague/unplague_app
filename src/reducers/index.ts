import { combineReducers } from 'redux'
import measures from './measures'
import events from './events'
import world from './world'

export default combineReducers({
    measures,
    events,
    world,
})