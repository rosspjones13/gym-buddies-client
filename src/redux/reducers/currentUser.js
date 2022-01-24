function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.user;
    case "FETCHED_LOGGED_USER":
      return action.user.user;
    case "UPDATE_USER_STATUS":
      return action.user;
    case "UPDATE_USER_CHECKIN":
      return action.user;
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
};

// export const userGoalsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "FETCHED_LOGIN_USER":
//       return action.user.goals
//     case "FETCHED_LOGGED_USER":
//       return action.user.goals
//     default:
//       return state
//   }
// }

export const userWorkoutsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.workouts;
    case "FETCHED_LOGGED_USER":
      return action.user.workouts;
    case "UPDATE_USER_WORKOUTS":
      action.newWorkout.id = state.length;
      return [
        ...state,
        { workout: action.newWorkout, exercise: action.exercise },
      ];
    default:
      return state;
  }
};

export const userBuddiesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_LOGIN_USER":
      return action.user.buddies;
    case "FETCHED_LOGGED_USER":
      return action.user.buddies;
    case "FETCHED_USER_BUDDIES":
      return action.buddies;
    case "UPDATE_USER_BUDDIES":
      return [
        ...state.filter((b) => b.buddy.id !== action.buddy.buddy.id),
        action.buddy,
      ];
    case "REMOVE_BUDDY":
      return state.filter((b) => b.buddy.id !== action.buddy.buddy.id);
    case "UPDATE_BUDDY_MESSAGES":
      return state.map((b) => {
        if (b.buddy.id === action.buddy_id) {
          return { ...b, messages: [...b.messages, action.message] };
        } else {
          return b;
        }
      });
    // let found = state.find(b => b.buddy.id === action.buddy_id)
    // let newState = state.filter(b => b.buddy.id !== action.buddy_id)
    // found.messages.push(action.message)
    // return [...newState, found]
    case "READ_BUDDY_MESSAGE":
      let oldState = state.filter(
        (b) => b.buddy.id !== action.message.buddy_id
      );
      let foundConvo = state.find(
        (b) => b.buddy.id === action.message.buddy_id
      );
      let updatedBuddy = {
        ...foundConvo,
        messages: foundConvo.messages.map((message) =>
          message.id === action.message.id ? action.message : message
        ),
      };
      return [...oldState, updatedBuddy];
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
};

export const currentBuddyReducer = (state = {}, action) => {
  switch (action.type) {
    case "CURRENT_BUDDY":
      return action.buddy;
    case "UPDATE_BUDDY_MESSAGES":
      if (!isEmpty(state)) {
        if (state.buddy.id === action.buddy_id) {
          return { ...state, messages: [...state.messages, action.message] };
        }
      }
      return state;
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
};
