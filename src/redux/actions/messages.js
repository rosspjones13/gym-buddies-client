export function postNewMessage(newMessage) {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newMessage)
    })
  }
}

export function updateBuddyMessages(buddy_id, message) {
  return { type: "UPDATE_BUDDY_MESSAGES", buddy_id, message}
}

export function receiveBuddyMessages(message) {
  return { type: "UPDATE_BUDDY_MESSAGES", message }
}