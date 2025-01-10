import React from "react";
import SignupPage from "./Pages/SignUpPage/SignUpPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import Header from "./components/HeaderComponents/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import FileUploadPage from "./Pages/FileUploadPage/FileUploadPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import store from "./store/store";
import FilePreviewPage from "./Pages/FilePreviewPage/FilePreviewPage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<UserDashboard />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/fileupload" element={<FileUploadPage />} />
                    <Route path="/filepreview" element={<FilePreviewPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
