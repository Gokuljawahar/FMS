import axios from "axios";
import * as types from "../actionTypes/SignUpActionTypes";

export const signupUser = (userData, callback) => async (dispatch) => {
    dispatch({ type: types.SIGNUP_LOADER });

    try {
        const response = await axios.post(
            "http://localhost:3000/users",
            userData
        );
        dispatch({ type: types.SIGNUP_SUCCESS, payload: response.data });
        callback({ success: true, message: "Sign-up successful!" });
    } catch (error) {
        dispatch({ type: types.SIGNUP_FAILURE, payload: error.message });
        callback({ success: false, message: "Sign-up failed. Try again!" });
    }
};

export const checkEmailExists = (email) => async () => {
    try {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;
        return users.some(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );
    } catch (error) {
        console.error("Error checking email:", error);
        return false;
    }
};
