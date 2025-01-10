import * as types from "../actionTypes/FileUploadActionTypes";
import axios from "axios";
import getFileGroup from "../utils/getFileGroup";

export const selectFile = (file) => ({
    type: types.FILE_SELECT,
    payload: file,
});

export const uploadFile = (file, selectedType) => async (dispatch) => {
    dispatch({ type: types.FILE_UPLOAD_REQUEST });

    try {
        const userId = localStorage.getItem("id");
        if (!userId) {
            throw new Error(
                "User not logged in. Please log in to upload files."
            );
        }

        const uploadedTime = new Date().toLocaleTimeString("en-IN");

        const fileName = file.name;
        const fileLocation = `public/uploads/${userId}/${fileName}`;
        const fileTypeGroup = getFileGroup(file.type);

        if (!fileTypeGroup) {
            throw new Error(
                "Unsupported file type. Please upload images, PDFs, or Excel files."
            );
        }

        const response = await axios.post("http://localhost:3000/uploads", {
            userId,
            uploadedTime,
            fileName,
            fileType: file.type,
            fileTypeGroup,
            fileLocation,
        });

        if (response.status === 201) {
            dispatch({
                type: types.FILE_UPLOAD_SUCCESS,
                payload: "File uploaded successfully!",
            });
        } else {
            throw new Error("Failed to upload file.");
        }
    } catch (err) {
        dispatch({
            type: types.FILE_UPLOAD_FAILURE,
            payload: err.message || "An unexpected error occurred.",
        });
    }
};

export const clearFile = () => ({
    type: types.FILE_CLEAR,
});

export const clearMessages = () => ({
    type: types.CLEAR_MESSAGE,
});
