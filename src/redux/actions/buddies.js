import { apiUrl } from '../../constants/keys'

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

export function updateBuddyStatus(buddy) {
  return (dispatch) => {
    fetch(apiUrl + `buddies/${buddy.buddy.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(buddy.buddy)
    })
      .then(res => res.json())
      .then(user => { dispatch(updateUserBuddies(buddy)) })
  }
}

export function deleteBuddy(buddy) {
  return (dispatch) => {
    dispatch(removeBuddy(buddy))
    fetch(apiUrl + `buddies/${buddy.buddy.id}`, {
      method: "DELETE"
    })
  }
}

export function updateUserBuddies(buddy) {
  return { type: "UPDATE_USER_BUDDIES", buddy}
}

export function removeBuddy(buddy) {
  return { type: "REMOVE_BUDDY", buddy}
}