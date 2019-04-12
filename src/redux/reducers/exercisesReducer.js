export const allExercisesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.exercises
    case "FETCHED_LOGGED_USER":
      return action.user.exercises
    default:
      return state
  }
}