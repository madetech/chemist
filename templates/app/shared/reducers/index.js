import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'

export default combineReducers({
  routing,
  reduxAsyncConnect
})
