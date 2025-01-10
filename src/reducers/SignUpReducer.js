import * as types from "../actionTypes/SignUpActionTypes"; 
const initialState = {
  loader: false,
  error: null,
  user: null,
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_LOADER:
      return { ...state, loader: true, error: null };
    case types.SIGNUP_SUCCESS:
      return { ...state, loader: false, user: action.payload, error: null };
    case types.SIGNUP_FAILURE:
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};
