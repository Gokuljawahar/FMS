import React from "react";
import { Button, CircularProgress } from "@mui/material";

const ButtonComponent = ({ loading, children, ...props }) => {
    return (
        <Button type="submit" variant="contained" disabled={loading} {...props}>
            {loading ? <CircularProgress size={24} /> : children}
        </Button>
    );
};

export default ButtonComponent;
