import { combineReducers } from 'redux'

const currentUserReducer = ( state={}, action ) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.user
    case "LOGOUT_USER":
      return null
    default:
      return state
  }
}

const loadingReducer = ( state=false, action ) => {
  switch (action.type) {
    case "LOADING_USERS":
      return true
    case "FETCHED_USERS":
      return false
    default:
      return state
  }
}

const usersReducer = ( state = [], action ) => {
  switch (action.type) {
    case "FETCHED_USERS":
      return action.users
    default:
      return state
  }
}

const rootReducer = combineReducers({
  users: usersReducer,
  loading: loadingReducer,
  currentUser: currentUserReducer
})

export default rootReducer