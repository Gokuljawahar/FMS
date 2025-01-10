import React from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function DataTable({ data, handlePreview }) {
    return (
        <Box
            sx={{
                borderRadius: 2,
                padding: 2,
                marginBottom: 2,
                marginX: 4,
            }}
        >
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Uploaded Time</TableCell>
                            <TableCell>Preview</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.index}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.uploadedTime}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handlePreview(row)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default DataTable;
