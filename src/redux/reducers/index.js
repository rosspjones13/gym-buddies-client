import { combineReducers } from 'redux'
import { loadingReducer } from './loading'
import { menuCollapseReducer } from './menuCollapse'
import { currentUserReducer, currentBuddyReducer, userBuddiesReducer, userGoalsReducer,  userWorkoutsReducer } from './currentUser'
import { usersReducer } from './allUsers'
import { allExercisesReducer } from './exercisesReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  loading: loadingReducer,
  currentUser: currentUserReducer,
  userGoals: userGoalsReducer,
  userWorkouts: userWorkoutsReducer,
  userBuddies: userBuddiesReducer,
  currentBuddy: currentBuddyReducer,
  menuCollapse: menuCollapseReducer,
  allExercises: allExercisesReducer,
})

export default rootReducer