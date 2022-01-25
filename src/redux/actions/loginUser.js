import { apiUrl } from "../../constants/keys";
import axios from "axios";

export function currentUser(user) {
  return { type: "FETCHED_LOGGED_USER", user };
}

export function loadingUser() {
  return { type: "LOADING_USER" };
}

export function logoutUser() {
  return { type: "LOGOUT_USER" };
}

export function currentUserOffline(user) {
  return async (dispatch) => {
    axios.put(apiUrl + `users/${user.id}`, JSON.stringify(user));
    // fetch(apiUrl + `users/${user.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(user),
    // })
  };
}

export function fetchedLoginUser(user) {
  return { type: "FETCHED_LOGIN_USER", user };
}

export function fetchingLoginUser(username, password) {
  return async (dispatch) => {
    dispatch(loadingUser());
    return axios.post(
      apiUrl + "login",
      JSON.stringify({
        username: username,
        password: password,
      })
    );
    // .then((res) => {
    //   if (res.data.authenticated) {
    //     // dispatch(push('/profile'))
    //     localStorage.setItem('token', res.data.token)
    //     document.cookie = `token=${res.data.token}`
    //     dispatch(fetchedLoginUser(res.data.user))
    //   }
    // })
    // .catch(
    //   alert('Incorrect username or password')
    // )
  };
}

export function fetchingLoggedUser(token) {
  // let token = localStorage.getItem("token");
  // if (token) {
  return async (dispatch) => {
    dispatch(loadingUser());
    // fetch(apiUrl + "profile", {
    //   headers: {
    //     Authentication: `Bearer ${token}`,
    //   },
    // })
    // .then((res) => res.json())
    return axios.get(apiUrl + "profile", {
      headers: {
        Authentication: `Bearer ${token}`,
      },
    });
    // .then((res) => {
    //   document.cookie = `token=${token}`;
    //   dispatch(currentUser(res.data));
    //     dispatch(push('/profile'))
    // });
  };
  // } else {
  //   return (dispatch) => {};
  // }
}
