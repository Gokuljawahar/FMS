import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";

const FileUploadModal = ({ open, handleClose, file, handleEdit }) => {
    const [newFile, setNewFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setNewFile(selectedFile);
        setError("");
    };

    const handleSubmit = () => {
        if (!newFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", newFile);

        const updatedMetadata = {
            fileName: file.fileName,
            uploadedTime: file.uploadedTime,
            fileLocation: file.fileLocation,
        };

        formData.append("metadata", JSON.stringify(updatedMetadata));

        axios
            .put(`http://localhost:3000/uploads/${file.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("File edited successfully:", response.data);
            })
            .catch((error) => {
                console.error(
                    "Error editing file:",
                    error.response ? error.response.data : error.message
                );
            });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Edit File
                </Typography>
                <input type="file" onChange={handleFileChange} />
                {error && <Typography color="error">{error}</Typography>}
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                    <Button onClick={handleClose} sx={{ marginRight: 1 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FileUploadModal;
