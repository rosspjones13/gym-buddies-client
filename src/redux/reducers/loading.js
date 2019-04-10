export const loadingReducer = (state = false, action) => {
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