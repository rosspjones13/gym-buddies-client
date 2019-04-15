import { apiUrl } from '../../constants/fetchUrls'

export function currentUser(user) {
  return { type: "FETCHED_LOGGED_USER", user }
}

export function loadingUser() {
  return { type: "LOADING_USER" }
}

export function logoutUser() {
  return { type: "LOGOUT_USER"}
}

export function fetchedLoginUser(user, goals) {
  return { type: "FETCHED_LOGIN_USER", user, goals }
}

export function fetchingLoginUser(username, password) {
  return (dispatch) => {
    dispatch(loadingUser())
    fetch(apiUrl + 'login', {
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
    return (dispatch) => {
      dispatch(loadingUser())
      fetch(apiUrl + 'profile', {
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

