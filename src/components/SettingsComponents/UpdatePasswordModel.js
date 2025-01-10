import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { passwordRegex } from "../../constants/Validations";
import { updatePassword, clearError } from "../../actions/SettingsActions";
import InputComponent from "../InputComponent/InputComponent";

const UpdatePasswordModal = ({ open, onClose }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.settings);

    useEffect(() => {
        if (!open) {
            setPassword("");
            setShowPassword(false);
            dispatch(clearError());
        }
    }, [open, dispatch]);

    const handleSave = () => {
        if (!passwordRegex.test(password)) {
            dispatch({
                type: "UPDATE_PASSWORD_FAILURE",
                payload:
                    "Password must be 8-14 characters long, include 1 uppercase letter, 1 number, and 1 special character.",
            });
            return;
        }
        dispatch(updatePassword(password));
        if (!error) {
            onClose();
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2,
                    mx: "auto",
                    my: "20%",
                }}
            >
                <Typography variant="h6" mb={2}>
                    Update Password
                </Typography>
                <InputComponent
                    name="password"
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                    showPassword={showPassword}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdatePasswordModal;
