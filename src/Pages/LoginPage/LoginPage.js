import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/LoginActions";
import { Box, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.login);
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.emailOrUsername)
            newErrors.emailOrUsername = "Email or Username is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(
                loginUser(formData, (response) => {
                    if (response.success) {
                        localStorage.setItem("id", response.userId);
                        localStorage.setItem("username", response.username);
                        navigate("/home");
                    } else {
                        setErrors({ emailOrUsername: response.message });
                    }
                })
            );
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{ mt: 1 }} component="form" onSubmit={handleSubmit}>
                    <InputComponent
                        name="emailOrUsername"
                        label="Email or Username"
                        type="text"
                        value={formData.emailOrUsername}
                        onChange={handleChange}
                        error={!!errors.emailOrUsername}
                        helperText={errors.emailOrUsername}
                    />
                    <InputComponent
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                    <Button
                        loading={loginState.loading}
                        sx={{ mt: 3, mb: 2 }}
                        fullWidth
                    >
                        Sign In
                    </Button>
                    <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
