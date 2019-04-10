import { Url } from '../../constants/fetchUrls'

export function fetchedUsers(users){
  return { type: "FETCHED_USERS", users }
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
