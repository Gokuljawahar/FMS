import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const ToasterComponent = ({ message, type = "success", open, onClose }) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setIsOpen(false);
        onClose();
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ToasterComponent;
