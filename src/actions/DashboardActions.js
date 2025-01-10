import * as types from "../actionTypes/DashboardActionTypes";
import axios from "axios";

export const setActiveTab = (tab) => ({
    type: types.SET_ACTIVE_TAB,
    payload: tab,
});

export const setSearchQuery = (query) => ({
    type: types.SET_SEARCH_QUERY,
    payload: query,
});

export const fetchData =
    (userId, activeTab, searchQuery) => async (dispatch) => {
        dispatch({ type: types.FETCH_DATA_REQUEST });

        try {
            const response = await axios.get(
                `http://localhost:3000/uploads?userId=${userId}&fileTypeGroup=${activeTab}`
            );

            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = response.data.filter((file) =>
                file.fileName.toLowerCase().includes(lowerCaseQuery)
            );

            // Map data to include index and format columns
            const mappedData = filtered.map((item, index) => ({
                index: index + 1,
                name: item.fileName,
                uploadedTime: item.uploadedTime,
                type: item.fileTypeGroup,
                id: item.id,
            }));

            dispatch({ type: types.FETCH_DATA_SUCCESS, payload: mappedData });
        } catch (err) {
            console.error("Error fetching data:", err);
            dispatch({ type: types.FETCH_DATA_FAILURE, payload: err.message });
        }
    };

export const fetchFile = (fileId) => async (dispatch) => {
    dispatch({ type: types.FETCH_FILE_LOADER });

    try {
        const response = await axios.get(
            `http://localhost:3000/uploads/${fileId}`
        );
        dispatch({ type: types.FETCH_FILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.FETCH_FILE_FAILURE, payload: error.message });
    }
};
