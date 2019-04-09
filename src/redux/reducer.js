import { combineReducers } from 'redux'

const currentUserReducer = ( state={}, action ) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user
    case "FETCHED_LOGGED_USER":
      return action.user
    case "LOGOUT_USER":
      return {}
    default:
      return state
  }
}

const loadingReducer = ( state=false, action ) => {
  switch (action.type) {
    case "LOADING_USERS":
      return true
    case "LOADING_LOGGED_USER":
      return true
    case "FETCHED_LOGIN_USER":
      return false
    case "FETCHED_LOGGED_USER":
      return false
    case "FETCHED_USER_BUDDIES":
      return false
    default:
      return state
  }
}

const usersReducer = ( state = [], action ) => {
  switch (action.type) {
    case "FETCHED_USERS":
      return action.user
    default:
      return state
  }
}

const userBuddiesReducer = ( state = [], action ) => {
  switch (action.type) {
    case "FETCHED_USER_BUDDIES":
      return action.buddies
    default:
      return state
  }
}

const buddyMessagesReducer = ( state = [], action ) => {
  switch (action.type) {
    case "CURRENT_BUDDY_MESSAGES":
      return {buddy_id: action.buddy_id, messages: action.messages}
    default:
      return state
  }
}

const menuCollapseReducer = ( state = true, action ) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return !state
    default:
      return state
  }
}

const initializeCableReducer = ( state = {}, action ) => {
  switch (action.type) {
    case "CREATED_USER_ACTION_CABLE":
      return action.cable
    default:
      return state
  }
}

const currentUserSubReducer = ( state = {}, action ) => {
  switch (action.type) {
    case "CREATED_USER_ACTION_SUBSCRIPTION":
      return action.subscription
    default:
      return state
  }
}

const rootReducer = combineReducers({
  users: usersReducer,
  loading: loadingReducer,
  currentUser: currentUserReducer,
  menuCollapse: menuCollapseReducer,
  userBuddies: userBuddiesReducer,
  buddyMessages: buddyMessagesReducer,
  // userSubscription: currentUserSubReducer
  cable: initializeCableReducer
})

export default rootReducer