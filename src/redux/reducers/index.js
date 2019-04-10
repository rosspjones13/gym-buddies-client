import { combineReducers } from 'redux'
import { loadingReducer } from './loading'
import { menuCollapseReducer } from './menuCollapse'
import { currentUserReducer, currentBuddyReducer, userBuddiesReducer } from './currentUser'
import { usersReducer } from './allUsers'

const rootReducer = combineReducers({
  users: usersReducer,
  loading: loadingReducer,
  currentUser: currentUserReducer,
  menuCollapse: menuCollapseReducer,
  userBuddies: userBuddiesReducer,
  currentBuddy: currentBuddyReducer
})

export default rootReducer