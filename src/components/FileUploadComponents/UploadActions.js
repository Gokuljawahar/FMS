import React from "react";
import { Box, Button } from "@mui/material";

const UploadActions = ({ file, isUploaded, handleUpload, handleClear }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
      {file && (
        <>
          {!isUploaded && (
            <Button variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          )}
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </>
      )}
    </Box>
  );
};

export default UploadActions;
