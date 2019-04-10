import { Url } from '../../constants/fetchUrls'

export function currentUser(user) {
  return { type: "FETCHED_LOGGED_USER", user }
}

export function currentBuddyMessages(buddy) {
  return { type: "CURRENT_BUDDY_MESSAGES", buddy }
}

export function currentUserBuddies(buddies) {
  return { type: "FETCHED_USER_BUDDIES", buddies }
}

export function fetchedLoginUser(user) {
  return { type: "FETCHED_LOGIN_USER", user }
}

export function fetchingLoggedUser() {
  let token = localStorage.getItem('token')
  if (token) {
    return (dispatch) => {
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
    return (dispatch) => { }
  }
}

export function loadingLoggedUser() {  
  return { type: "LOADING_LOGGED_USER" }
}

export function loadingUsers(){
  return { type: "LOADING_USERS" }
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

export function fetchingUserBuddies() {
  let token = localStorage.getItem('token')
  if (token) {
    return (dispatch) => {
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
    return (dispatch) => { }
  }
}
