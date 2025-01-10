import React from "react";
import { Box, Button } from "@mui/material";

const FileTypeSelector = ({ selectedType, setSelectedType, fileTypes }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      {Object.entries(fileTypes).map(([type, config]) => (
        <Button
          key={type}
          variant={selectedType === type ? "contained" : "outlined"}
          onClick={() => setSelectedType(type)}
        >
          {config.icon} {config.label}
        </Button>
      ))}
    </Box>
  );
};

export default FileTypeSelector;