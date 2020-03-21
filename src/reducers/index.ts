import { combineReducers } from 'redux'
import measures from './measures'
import news from './news'

export default combineReducers({
    measures,
    news
})