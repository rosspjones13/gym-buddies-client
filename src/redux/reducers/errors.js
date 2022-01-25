export const errorReducer = (state = { show: false, message: "" }, action) => {
  switch (action.type) {
    case "CLEAR_ERROR":
      return { show: false, message: "" };
    case "ERROR_LOADING":
      return { show: true, message: action.message };
    default:
      return state;
  }
};
