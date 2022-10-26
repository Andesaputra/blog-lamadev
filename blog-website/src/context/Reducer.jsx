const Reducer = (state, action) => {
  switch (action.type) {
    //login
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    //update
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    //logout
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    default:
      break;
  }
};

export default Reducer;
