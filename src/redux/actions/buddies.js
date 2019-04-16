import { apiUrl } from '../../constants/fetchUrls'

export function sendBuddyRequest(user, currentUser) {
  return (dispatch) => {
    fetch(apiUrl + 'buddies', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        requester_id: currentUser.id,
        requestee_id: user.id,
        buddy_type: "pending"
      })
    })
  }
}

export function updateUserBuddies(buddy) {
  return { type: "UPDATE_USER_BUDDIES", buddy}
}