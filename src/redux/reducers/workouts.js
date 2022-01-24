export const userWorkoutsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.workouts;
    case "FETCHED_LOGGED_USER":
      return action.user.workouts;
    default:
      return state;
  }
};
