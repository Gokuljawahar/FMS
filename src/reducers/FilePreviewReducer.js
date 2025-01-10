import * as types from "../actionTypes/FilePreviewActionTypes";

const initialState = {
    activeTab: "image",
    searchQuery: "",
    filteredData: [],
    error: null,
    loading: false,
    file: null,
    fileLoader: false,
    fileError: null,
    deleteLoading: false,
    editLoading: false,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DELETE_FILE_REQUEST:
            return {
                ...state,
                deleteLoading: true,
                error: null,
            };
        case types.EDIT_FILE_SUCCESS:
            return {
                ...state,
                editLoading: false,
                filteredData: state.filteredData.map((file) =>
                    file.id === action.payload.id ? action.payload : file
                ),
            };
       
        case types.DELETE_FILE_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                filteredData: state.filteredData.filter(
                    (file) => file.id !== action.payload
                ),
            };

        case types.DELETE_FILE_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.payload,
            };
        case types.EDIT_FILE_REQUEST:
            return {
                ...state,
                editLoading: true,
                error: null,
            };

        case types.EDIT_FILE_FAILURE:
            return {
                ...state,
                editLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
