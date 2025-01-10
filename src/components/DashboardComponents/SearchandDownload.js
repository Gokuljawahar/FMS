import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

const SearchAndDownload = ({ handleSearch, handleDownload }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          px: 1,
          mr: 2,
        }}
      >
        <SearchIcon />
        <InputBase
          placeholder="Search and Download"
          onChange={handleSearch}
          sx={{ ml: 1 }}
        />
      </Box>

      <IconButton onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
    </Box>
  );
};

export default SearchAndDownload;
