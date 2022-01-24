export function errorFetching() {
  return { type: "ERROR_LOADING" }
}

export function clearError() {
  return { type: "CLEAR_ERROR" }
}