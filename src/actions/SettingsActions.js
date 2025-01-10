import * as types from "../actionTypes/SettingsActionTypes";
import axios from "axios";
import {
    passwordRegex,
    usernameRegex,
    phoneRegex,
} from "../constants/Validations";

export const updateUsername = (username) => async (dispatch) => {
    dispatch({ type: types.UPDATE_USERNAME_REQUEST });

    try {
        const userId = localStorage.getItem("id");

        if (!username.trim() || !usernameRegex.test(username)) {
            throw new Error(
                "Username must be 8-15 characters long and contain only letters, numbers, and underscores."
            );
        }

        const response = await axios.get(
            `http://localhost:3000/users/${userId}`
        );
        const user = response.data;

        const updatedUser = {
            ...user,
            username,
        };

        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);

        // Update local storage
        localStorage.setItem("username", username);

        dispatch({ type: types.UPDATE_USERNAME_SUCCESS, payload: username });
        alert("Username updated successfully.");
    } catch (error) {
        dispatch({
            type: types.UPDATE_USERNAME_FAILURE,
            payload: error.message,
        });
    }
};

export const updatePassword = (password) => async (dispatch) => {
    dispatch({ type: types.UPDATE_PASSWORD_REQUEST });

    try {
        const userId = localStorage.getItem("id");

        if (!passwordRegex.test(password)) {
            throw new Error(
                "Password must be 8-14 characters long, include 1 uppercase letter, 1 number, and 1 special character."
            );
        }

        const response = await axios.get(
            `http://localhost:3000/users/${userId}`
        );
        const user = response.data;

        const updatedUser = {
            ...user,
            password,
        };

        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);

        dispatch({ type: types.UPDATE_PASSWORD_SUCCESS });
        alert("Password updated successfully.");
    } catch (error) {
        dispatch({
            type: types.UPDATE_PASSWORD_FAILURE,
            payload: error.message,
        });
    }
};

export const updatePhoneNumber = (phoneNumber) => async (dispatch) => {
    dispatch({ type: types.UPDATE_PHONE_REQUEST });

    try {
        const userId = localStorage.getItem("id");

        if (!phoneRegex.test(phoneNumber)) {
            throw new Error("Enter a valid Indian phone number (10 digits).");
        }

        const response = await axios.get(
            `http://localhost:3000/users/${userId}`
        );
        const user = response.data;

        const updatedUser = {
            ...user,
            phoneNumber,
        };

        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);

        dispatch({ type: types.UPDATE_PHONE_SUCCESS });
        alert("Phone number updated successfully.");
    } catch (error) {
        dispatch({ type: types.UPDATE_PHONE_FAILURE, payload: error.message });
    }
};

export const clearError = () => ({
    type: types.CLEAR_ERROR,
});

export const deleteFiles = (userId) => async (dispatch) => {
    dispatch({ type: types.DELETE_FILES_LOADER });

    try {
        const response = await axios.get(
            `http://localhost:3000/uploads?userId=${userId}`
        );
        const uploads = response.data;

        const deletePromises = uploads.map((upload) =>
            axios.delete(`http://localhost:3000/uploads/${upload.id}`)
        );

        await Promise.all(deletePromises);

        dispatch({ type: types.DELETE_FILES_SUCCESS, payload: uploads });
        return Promise.resolve(uploads);
    } catch (error) {
        dispatch({ type: types.DELETE_FILES_FAILURE, payload: error.message });
        return Promise.reject(error.message);
    }
};
