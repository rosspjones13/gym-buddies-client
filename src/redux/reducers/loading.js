export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "LOADING_USER":
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

export const loadingSearchReducer = (state = false, action) => {
  switch (action.type) {
    case "LOADING_ALL_USERS":
      return true
    case "FETCHED_ALL_USERS":
      return false
    default:
      return state
  }
}