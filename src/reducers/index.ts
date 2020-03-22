import { combineReducers } from 'redux'
import measures from './measures'
import world from './world'

export default combineReducers({
    measures,
    world,
})