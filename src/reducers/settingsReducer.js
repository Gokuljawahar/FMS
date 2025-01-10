import * as types from "../actionTypes/SettingsActionTypes";

const initialState = {
    username: "",
    password: "",
    phoneNumber: "",
    error: null,
    loading: false,
    fileLoader: false,
    files: [],
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_USERNAME_REQUEST:
        case types.UPDATE_PASSWORD_REQUEST:
        case types.UPDATE_PHONE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.UPDATE_USERNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                username: action.payload,
            };
        case types.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.UPDATE_PHONE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.UPDATE_USERNAME_FAILURE:
        case types.UPDATE_PASSWORD_FAILURE:
        case types.UPDATE_PHONE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case types.DELETE_FILES_LOADER:
            return {
                ...state,
                fileLoader: true,
                error: null,
            };
        case types.DELETE_FILES_SUCCESS:
            return {
                ...state,
                fileLoader: false,
                files: [],
                error: null,
            };
        case types.DELETE_FILES_FAILURE:
            return {
                ...state,
                fileLoader: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
