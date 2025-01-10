import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePhoneNumber, clearError } from "../../actions/SettingsActions";
import { phoneRegex } from "../../constants/Validations";
import InputComponent from "../InputComponent/InputComponent";

const UpdatePhoneNumberModal = ({ open, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.settings);

    useEffect(() => {
        if (!open) {
            setPhoneNumber("");
            dispatch(clearError());
        }
    }, [open, dispatch]);

    const handleSave = () => {
        if (!phoneRegex.test(phoneNumber)) {
            dispatch({
                type: "UPDATE_PHONE_FAILURE",
                payload: "Enter a valid Indian phone number (10 digits).",
            });
            return;
        }
        dispatch(updatePhoneNumber(phoneNumber));
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
                    Update Phone Number
                </Typography>
                <InputComponent
                    name="phoneNumber"
                    label="New Phone Number"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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

export default UpdatePhoneNumberModal;
