import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername, clearError } from "../../actions/SettingsActions";
import { usernameRegex } from "../../constants/Validations";
import InputComponent from "../InputComponent/InputComponent";

const UpdateUsernameModal = ({ open, onClose }) => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.settings);

    useEffect(() => {
        if (!open) {
            setUsername("");
            dispatch(clearError());
        }
    }, [open, dispatch]);

    const handleSave = () => {
        if (
            !username.trim() ||
            !usernameRegex.test(username) ||
            username.length < 8 ||
            username.length > 15
        ) {
            dispatch({
                type: "UPDATE_USERNAME_FAILURE",
                payload:
                    "Username must be 8-15 characters long and contain only letters, numbers, and underscores.",
            });
            return;
        }
        dispatch(updateUsername(username));
        if (!error) {
            onClose();
        }
    };

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
                    Update Username
                </Typography>
                <InputComponent
                    name="username"
                    label="New Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!error}
                    helperText={error}
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

export default UpdateUsernameModal;
