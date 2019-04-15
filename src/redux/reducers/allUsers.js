export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_ALL_USERS":
      return action.users
    default:
      return state
  }
}