function usersUrl(){
  return 'http://localhost:3000/api/v1/users'
}

export function currentUser(user){
  return { type: "LOGIN_USER", user }
}

export function fetchedUsers(users){
  return { type: "FETCHED_USERS", users }
}

export function loadingUsers(){
  return { type: "LOADING_USERS" }
}

export function fetchingUsers() {
  return ( dispatch ) => {
    dispatch(loadingUsers())
    fetch(usersUrl())
    .then(res => res.json())
    .then(users => {
      dispatch(fetchedUsers(users))
    })
  }
}
