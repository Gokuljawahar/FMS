import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";


const FormatDataAlert = ({ open, onClose, onConfirm }) => {
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
          Are you sure you want to delete all data?
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 1 }}>
            No
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormatDataAlert;