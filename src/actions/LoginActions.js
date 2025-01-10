import axios from "axios";
import * as types from "../actionTypes/LoginActionTypes";

export const loginUser = (userData, callback) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });

    try {
        const response = await axios.get("http://localhost:3000/users");

        const user = response.data.find(
            (user) =>
                (user.email === userData.emailOrUsername ||
                    user.username === userData.emailOrUsername) &&
                user.password === userData.password
        );

        if (user) {
          
            localStorage.setItem("id", user.id);
            localStorage.setItem("username", user.username);

            dispatch({ type: types.LOGIN_SUCCESS, payload: user });
            callback({
                success: true,
                message: "Login successful!",
                userId: user.id,
                username: user.username,
            });
        } else {
            throw new Error("Invalid email/username or password");
        }
    } catch (error) {
        dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
        callback({ success: false, message: error.message });
    }
};
