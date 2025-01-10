import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SharedLayout from "../../layouts/SharedLayout";
import FileUploadModal from "../../components/FilePreviewComponents/FileUploadModel";
import { deleteFile, editFile } from "../../actions/FilePreviewActions";

const FilePreviewPage = () => {
    const { file, fileLoader, fileError } = useSelector(
        (state) => state.dashboard
    );
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDelete = () => {
        dispatch(deleteFile(file.id));
    };

    const handleEdit = (formData) => {
        dispatch(editFile(file.id, formData));
        handleCloseModal();
    };

    const renderFilePreview = () => {
        if (fileLoader) {
            return <Typography>Loading...</Typography>;
        }

        if (fileError) {
            return <Typography color="error">{fileError}</Typography>;
        }

        if (!file) {
            return <Typography>No file selected for preview.</Typography>;
        }

        return (
            <div>
                <Typography>
                    <strong>File Name:</strong> {file.fileName}
                </Typography>
                <Typography>
                    <strong>File Type:</strong> {file.fileType}
                </Typography>
                <Typography>
                    <strong>Uploaded Time:</strong> {file.uploadedTime}
                </Typography>
                <Typography>
                    <strong>File Location:</strong> {file.fileLocation}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 2,
                    }}
                >
                    <Button onClick={handleOpenModal} sx={{ marginRight: 1 }}>
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </div>
        );
    };

    return (
        <SharedLayout initialPage="/filepreview">
            <Box
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper elevation={2} sx={{ padding: 2, width: "80%" }}>
                    {renderFilePreview()}
                </Paper>
            </Box>
            <FileUploadModal
                open={openModal}
                handleClose={handleCloseModal}
                file={file}
                handleEdit={handleEdit}
            />
        </SharedLayout>
    );
};

export default FilePreviewPage;
