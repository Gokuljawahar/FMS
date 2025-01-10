import * as types from "../actionTypes/DashboardActionTypes";
const initialState = {
    activeTab: "image",
    searchQuery: "",
    filteredData: [],
    error: null,
    loading: false,
    file: null,
    fileLoader: false,
    fileError: null,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload,
                searchQuery: "",
            };
        case types.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        case types.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                filteredData: action.payload,
            };
        case types.FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.FETCH_FILE_LOADER:
            return {
                ...state,
                fileLoader: true,
                fileError: null,
            };
        case types.FETCH_FILE_SUCCESS:
            return {
                ...state,
                fileLoader: false,
                file: action.payload,
            };
        case types.FETCH_FILE_FAILURE:
            return {
                ...state,
                fileLoader: false,
                fileError: action.payload,
            };
        default:
            return state;
    }
};

