import { combineReducers } from 'redux'
import measures from './measures'
import news from './news'
import regions from './regions'

export default combineReducers({
    measures,
    news,
    regions,
})