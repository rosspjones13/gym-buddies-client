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

const menuCollapseReducer = ( state = true, action ) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return !state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  users: usersReducer,
  loading: loadingReducer,
  currentUser: currentUserReducer,
  menuCollapse: menuCollapseReducer
})

export default rootReducer