import React, { useState, useEffect } from "react";
import { Box, Typography, Alert, LinearProgress } from "@mui/material";
import FileTypeSelector from "../../components/FileUploadComponents/FileTypeSelector.js";
import DropZone from "../../components/FileUploadComponents/FileDropZone.js";
import UploadActions from "../../components/FileUploadComponents/UploadActions.js";
import SharedLayout from "../../layouts/SharedLayout.js";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFile,
    uploadFile,
    clearFile,
    clearMessages,
} from "../../actions/FileUploadActions.js";
import { fileTypes } from "../../constants/fileTypes.js";

const FileUploadPage = () => {
    const [selectedType, setSelectedType] = useState(null);
    const dispatch = useDispatch();
    const { file, error, success, isUploading, uploadProgress } = useSelector(
        (state) => state.fileUpload
    );

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                dispatch(clearMessages());
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [error, success, dispatch]);

    const validateFile = (file, type) => {
        const config = fileTypes[type];
        if (!file) throw new Error("No file selected.");
        if (
            !config.allowedTypes.some((ext) =>
                file.name.toLowerCase().endsWith(ext)
            )
        ) {
            throw new Error(
                `Invalid file type. Allowed: ${config.allowedTypes.join(", ")}`
            );
        }
        if (file.size > config.maxSize) {
            throw new Error(
                `File size exceeds ${config.maxSize / (1024 * 1024)} MB.`
            );
        }
    };

    const handleFileSelect = (selectedFile) => {
        try {
            if (!selectedType)
                throw new Error("Please select a file type first.");
            validateFile(selectedFile, selectedType);
            dispatch(selectFile(selectedFile));
        } catch (err) {
            dispatch(selectFile(null));
            dispatch({ type: "FILE_UPLOAD_FAILURE", payload: err.message });
        }
    };

    const handleUpload = () => {
        if (!file) return;
        dispatch(uploadFile(file, selectedType));
    };

    const handleClear = () => {
        dispatch(clearFile());
    };

    return (
        <SharedLayout initialPage="/fileupload">
            <Box sx={{ maxWidth: "600px", mx: "auto", p: 2 }}>
                <FileTypeSelector
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    fileTypes={fileTypes}
                />
                <DropZone
                    selectedType={selectedType}
                    file={file}
                    setFile={handleFileSelect}
                    error={error}
                    setError={(err) =>
                        dispatch({ type: "FILE_UPLOAD_FAILURE", payload: err })
                    }
                    fileTypes={fileTypes}
                />
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {success}
                    </Alert>
                )}
                {isUploading && (
                    <Box sx={{ mt: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={uploadProgress}
                        />
                        <Typography
                            align="center"
                            variant="body2"
                            sx={{ mt: 1 }}
                        >
                            Uploading... {uploadProgress}%
                        </Typography>
                    </Box>
                )}
                <UploadActions
                    file={file}
                    handleUpload={handleUpload}
                    handleClear={handleClear}
                />
            </Box>
        </SharedLayout>
    );
};

export default FileUploadPage;
