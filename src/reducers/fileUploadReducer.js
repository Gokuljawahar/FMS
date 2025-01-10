import * as types from "../actionTypes/FileUploadActionTypes";

const initialState = {
    file: null,
    error: "",
    success: "",
    isUploading: false,
    uploadProgress: 0,
};

export const fileUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILE_SELECT:
            return {
                ...state,
                file: action.payload,
                error: "",
                success: "",
            };
        case types.FILE_UPLOAD_REQUEST:
            return {
                ...state,
                isUploading: true,
                uploadProgress: 0,
                error: "",
                success: "",
            };
        case types.FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                isUploading: false,
                success: action.payload,
                file: null,
            };
        case types.FILE_UPLOAD_FAILURE:
            return {
                ...state,
                isUploading: false,
                error: action.payload,
            };
        case types.FILE_CLEAR:
            return {
                ...state,
                file: null,
                error: "",
                success: "",
                uploadProgress: 0,
            };
        case "CLEAR_MESSAGES":
            return {
                ...state,
                error: "",
                success: "",
            };
        default:
            return state;
    }
};
