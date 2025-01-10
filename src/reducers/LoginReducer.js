// reducers/LoginReducer.js
import * as types from "../actionTypes/LoginActionTypes";

const initialState = {
    loading: false,
    user: null,
    error: null,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
