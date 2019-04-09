function Url(){
  return 'http://localhost:3000/api/v1/'
}

export function currentUser(user){
  return { type: "FETCHED_LOGGED_USER", user }
}

export function currentBuddyMessages(buddy_id, messages){
  return { type: "CURRENT_BUDDY_MESSAGES", buddy_id, messages }
}

export function currentUserBuddies(buddies){
  return { type: "FETCHED_USER_BUDDIES", buddies }
}

export function fetchedUsers(users){
  return { type: "FETCHED_USERS", users }
}

export function fetchedLoginUser(user){
  return { type: "FETCHED_LOGIN_USER", user }
}

export function toggleMenu() {
  return { type: "TOGGLE_MENU" }
}

export function loadingUsers(){
  return { type: "LOADING_USERS" }
}

export function loadingLoggedUser(){
  return { type: "LOADING_LOGGED_USER" }
}

export function initializeUserCable(cable) {
  return { type: "CREATED_USER_ACTION_CABLE", cable}
}

export function currentUserSubscription(subscription) {
  return { type: "CREATED_USER_ACTION_SUBSCRIPTION", subscription}
}

export function fetchingLoginUser(username, password) {
  return ( dispatch ) => {
    dispatch(loadingUsers())
    fetch(Url() + 'login', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) {
        dispatch(fetchedLoginUser(data.user))
        localStorage.setItem('token', data.token)
        document.cookie = `token=${data.token}`
      } else {
        alert('Incorrect username or password')
      }
    })
  }
}

export function fetchingLoggedUser() {
  let token = localStorage.getItem('token')
  if (token) {
    return ( dispatch ) => {
      dispatch(loadingLoggedUser())
      fetch(Url() + 'profile', {
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(user => {
        document.cookie = `token=${token}`
        dispatch(currentUser(user))
      })
    }
  }
  else {
    return (dispatch) => {}
  }
}

// export function fetchingBuddyMessages(buddy) {
//   let token = localStorage.getItem('token')
//   if (token) {
//     return ( dispatch ) => {
//       dispatch(loadingLoggedUser())
//       fetch(Url() + `buddies/${buddy.id}/messages`, {
//         headers: {
//           "Authentication": `Bearer ${token}`
//         }
//       })
//       .then(res => res.json())
//       .then(messages => {
//         debugger
//         dispatch(currentBuddyMessages(messages))
//       })
//     }
//   }
//   else {
//     return (dispatch) => {}
//   }
// }

export function fetchingUserBuddies() {
  let token = localStorage.getItem('token')
  if (token) {
    return ( dispatch ) => {
      dispatch(loadingLoggedUser())
      fetch(Url() + 'buddies', {
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(buddies => {
        dispatch(currentUserBuddies(buddies))
      })
    }
  }
  else {
    return (dispatch) => {}
  }
}

export function postNewMessage(newMessage) {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newMessage)
    })
    // .then(res => res.json())
    // .then(retur => {debugger})
    // .then(message => dispatch())
  }
}


// export function fetchingUsers() {
//   return ( dispatch ) => {
//     dispatch(loadingUsers())
//     fetch(usersUrl())
//     .then(res => res.json())
//     .then(users => {
//       dispatch(fetchedUsers(users))
//     })
//   }
// }
