import { combineReducers } from 'redux'
import measures from './measures'
import news from './news'
import world from './world'

export default combineReducers({
    measures,
    news,
    world,
})