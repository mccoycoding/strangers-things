const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_REGISTER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'USER_AUTH_ERROR':
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        isError: true,
      };

    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'USER_LOGOUT':
      return {
        user: null,
        isLoading: false,
        isError: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
