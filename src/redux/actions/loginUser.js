export function loadingUsers() {
  return { type: "LOADING_USERS" }
}

export function fetchingLoginUser(username, password) {
  return (dispatch) => {
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
          document.cookie = `token=${data.token}`
        } else {
          alert('Incorrect username or password')
        }
      })
  }
}