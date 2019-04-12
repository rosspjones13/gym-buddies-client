export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.user
    case "FETCHED_LOGGED_USER":
      return action.user.user
    case "LOGOUT_USER":
      return {}
    default:
      return state
  }
}

export const userGoalsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.goals
    case "FETCHED_LOGGED_USER":
      return action.user.goals
    default:
      return state
  }
}

export const userWorkoutsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.workouts
    case "FETCHED_LOGGED_USER":
      return action.user.workouts
    default:
      return state
  }
}

export const userBuddiesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.buddies
    case "FETCHED_LOGGED_USER":
      return action.user.buddies
    case "FETCHED_USER_BUDDIES":
      return action.buddies
    case "UPDATE_BUDDY_MESSAGES":
      return state.map(b => {
        if (b.id === action.buddy_id) {
          return {
            ...b,
            messages: [...b.messages, action.message]
          }
        }
        return b
      })
    default:
      return state
  }
}

export const currentBuddyReducer = (state = {}, action) => {
  switch (action.type) {
    case "CURRENT_BUDDY_MESSAGES":
      return action.buddy
    case "UPDATE_BUDDY_MESSAGES":
      return { ...state, messages: [...state.messages, action.message] }
    default:
      return state
  }
}