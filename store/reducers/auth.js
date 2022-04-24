import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  isSignedIn: false,
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case AUTHENTICATE: {
      const { token, userId } = action;

      return {
        token,
        userId,
        isSignedIn: true,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
