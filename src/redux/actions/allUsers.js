import { apiUrl } from '../../constants/fetchUrls'

export function fetchedUsers(users){
  return { type: "FETCHED_ALL_USERS", users }
}

export function loadingUsers() {
  return { type: "LOADING_ALL_USERS" }
}

export function fetchingUsers() {
  return ( dispatch ) => {
    dispatch(loadingUsers())
    fetch(apiUrl + 'users')
    .then(res => res.json())
    .then(users => {
      dispatch(fetchedUsers(users))
    })
  }
}
