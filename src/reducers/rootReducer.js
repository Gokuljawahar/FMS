import { combineReducers } from "redux";
import { signupReducer } from "./SignUpReducer";
import { loginReducer } from "./LoginReducer";
import { settingsReducer } from "./settingsReducer";
import { fileUploadReducer } from "./fileUploadReducer";
import { dashboardReducer } from "./dashboardReducer";

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    settings: settingsReducer,
    fileUpload: fileUploadReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;
