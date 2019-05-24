import { apiUrl } from '../../constants/fetchUrls'

export function currentBuddyMessages(buddy) {
  return { type: "CURRENT_BUDDY", buddy }
}

export function currentUserBuddies(buddies) {
  return { type: "FETCHED_USER_BUDDIES", buddies }
}

export function currentUserOnline(user) {
  return (dispatch) => {
    fetch(apiUrl + `users/${user.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(user => { dispatch(currentUserStatus(user)) })
  }
}

export function patchUserCheckin(user) {
  return (dispatch) => {
    fetch(apiUrl + `users/${user.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(user => { dispatch(updateUserCheckin(user)) })
  }
}

export function updateUserCheckin(user) {
  return { type: "UPDATE_USER_CHECKIN", user }
}

export function currentUserStatus(user) {
  return { type: "UPDATE_USER_STATUS", user }
}

export function loadingLoggedUser() {  
  return { type: "LOADING_LOGGED_USER" }
}

export function fetchingUserBuddies() {
  let token = localStorage.getItem('token')
  if (token) {
    return (dispatch) => {
      dispatch(loadingLoggedUser())
      fetch(apiUrl + 'buddies', {
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
    return (dispatch) => { }
  }
}
