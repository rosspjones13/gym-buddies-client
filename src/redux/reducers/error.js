export const errorReducer = (state = false, action) => {
  switch (action.type) {
    case "CLEAR_ERROR":
      return false;
    case "ERROR_LOADING":
      return true;
    default:
      return state;
  }
};
