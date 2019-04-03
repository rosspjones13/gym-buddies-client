function Url(){
  return 'http://localhost:3000/api/v1/'
}

export function currentUser(user){
  return { type: "FETCHED_LOGGED_USER", user }
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
        dispatch(currentUser(user))
      })
    }
  }
  else {
    return (dispatch) => {}
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
