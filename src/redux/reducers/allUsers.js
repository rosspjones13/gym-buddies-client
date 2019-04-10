export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_USERS":
      return action.user
    default:
      return state
  }
}