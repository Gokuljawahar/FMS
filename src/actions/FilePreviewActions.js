import * as types from "../actionTypes/FilePreviewActionTypes";
import axios from "axios";

export const deleteFile = (id) => async (dispatch) => {
    dispatch({ type: types.DELETE_FILE_REQUEST });

    try {
        const response = await axios.delete(
            `http://localhost:3000/uploads/${id}`
        );
        dispatch({ type: types.DELETE_FILE_SUCCESS, payload: id });
    } catch (error) {
        console.error("Error deleting file:", error);
        dispatch({
            type: types.DELETE_FILE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const editFile = (id, formData) => async (dispatch) => {
    dispatch({ type: types.EDIT_FILE_REQUEST });

    try {
        const response = await axios.put(
            `http://localhost:3000/uploads/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch({ type: types.EDIT_FILE_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error editing file:", error);
        dispatch({
            type: types.EDIT_FILE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
