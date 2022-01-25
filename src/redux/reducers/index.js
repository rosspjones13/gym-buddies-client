import { combineReducers } from "redux";
import { loadingReducer } from "./loading";
import {
  currentUserReducer,
  currentBuddyReducer,
  userBuddiesReducer,
  userWorkoutsReducer,
} from "./currentUser";
import { usersReducer } from "./allUsers";
import { allExercisesReducer } from "./exercisesReducer";
import { errorReducer } from "./errors";
// import { connectRouter } from 'connected-react-router'
import { createRouterReducer } from "@lagunovsky/redux-react-router";
import { createBrowserHistory } from "history";

export const browserHistory = createBrowserHistory();

const createRootReducer = combineReducers({
  router: createRouterReducer(browserHistory),
  allUsers: usersReducer,
  loading: loadingReducer,
  currentUser: currentUserReducer,
  // userGoals: userGoalsReducer,
  userWorkouts: userWorkoutsReducer,
  userBuddies: userBuddiesReducer,
  currentBuddy: currentBuddyReducer,
  allExercises: allExercisesReducer,
  error: errorReducer,
});

export default createRootReducer;
