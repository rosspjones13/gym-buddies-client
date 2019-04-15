import { apiUrl } from '../../constants/fetchUrls'

export function postNewWorkout(newWorkout) {
  return (dispatch) => {
    fetch(apiUrl + 'workouts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newWorkout)
    })
    updateUserWorkouts(newWorkout)
  }
}

export function updateUserWorkouts(newWorkout, exercise) {
  return { type: "UPDATE_USER_WORKOUTS", newWorkout, exercise }
}