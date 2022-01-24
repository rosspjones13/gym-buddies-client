import { apiUrl } from "../../constants/keys";

export function postNewMessage(newMessage) {
  return (dispatch) => {
    fetch(apiUrl + "messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((status) =>
        dispatch(updateBuddyMessages(status.object.buddy_id, status.object))
      );
  };
}

export function updateReadMessage(message) {
  return (dispatch) => {
    dispatch(readMessage(message.buddy_id, message));
    fetch(apiUrl + `messages/${message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
    }).then((res) => res.json());
  };
}

export function updateBuddyMessages(buddy_id, message) {
  return { type: "UPDATE_BUDDY_MESSAGES", buddy_id, message };
}

export function receiveBuddyMessages(buddy_id, message) {
  return { type: "UPDATE_BUDDY_MESSAGES", buddy_id, message };
}

export function readMessage(buddy_id, message) {
  return { type: "READ_BUDDY_MESSAGE", buddy_id, message };
}
