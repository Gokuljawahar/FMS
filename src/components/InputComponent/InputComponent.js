import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputComponent = ({
    name,
    label,
    type,
    value,
    onChange,
    error,
    helperText,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    ...props
}) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            name={name}
            label={label}
            type={type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: type === "password" && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default InputComponent;
