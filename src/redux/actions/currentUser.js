import { apiUrl } from '../../constants/fetchUrls'

export function currentBuddyMessages(buddy) {
  return { type: "CURRENT_BUDDY_MESSAGES", buddy }
}

export function currentUserBuddies(buddies) {
  return { type: "FETCHED_USER_BUDDIES", buddies }
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
