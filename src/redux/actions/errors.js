export function errorMessage(message) {
  return { type: "ERROR_LOADING", message: message };
}

export function clearError() {
  return { type: "CLEAR_ERROR" };
}
