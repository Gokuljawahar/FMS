import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";

const DropZone = ({
  selectedType,
  file,
  setFile,
  error,
  setError,
  fileTypes,
}) => {
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setError("");

    if (!selectedType) {
      setError("Please select a file type first.");
      return;
    }

    const droppedFile = event.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const validateAndSetFile = (file) => {
    if (!selectedType) {
      setError("Please select a file type first.");
      return;
    }

    const config = fileTypes[selectedType];
    if (
      !config.allowedTypes.some((ext) => file.name.toLowerCase().endsWith(ext))
    ) {
      setError(`Invalid file type. Allowed: ${config.allowedTypes.join(", ")}`);
      return;
    }

    if (file.size > config.maxSize) {
      setError(`File size exceeds ${config.maxSize / (1024 * 1024)}MB.`);
      return;
    }

    setFile(file);
    setError("");
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        border: `2px dashed ${error ? "red" : selectedType ? "blue" : "gray"}`,
        borderRadius: "8px",
        p: 4,
        textAlign: "center",
        cursor: selectedType ? "pointer" : "not-allowed",
      }}
      onClick={handleClick} 
    >
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
        disabled={!selectedType}
      />

      {file ? (
        <Typography variant="body1">{file.name}</Typography>
      ) : (
        <Typography variant="body1">
          {selectedType
            ? ` Click or Drag and drop your ${fileTypes[selectedType].label} to upload.`
            : "Select a file type first"}
        </Typography>
      )}
    </Box>
  );
};

export default DropZone;
