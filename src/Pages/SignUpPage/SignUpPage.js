import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, checkEmailExists } from "../../actions/SignupActions";
import { Box, Typography, Container, Link } from "@mui/material";
import { emailRegex, passwordRegex } from "../../constants/Validations";
import InputComponent from "../../components/InputComponent/InputComponent";
import Button from "../../components/ButtonComponent/ButtonComponent";
import ToasterComponent from "../../components/ToasterComponent/ToasterComponent";

function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterType, setToasterType] = useState("success");
    const [toasterOpen, setToasterOpen] = useState(false);

    useEffect(() => {
        if (formData.email) {
            const extractedUsername = formData.email.split("@")[0];
            setFormData((prev) => ({
                ...prev,
                username: extractedUsername,
            }));
        }
    }, [formData.email]);

    const validateForm = async () => {
        const newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        } else {
            const emailExists = await dispatch(
                checkEmailExists(formData.email)
            );
            if (emailExists) {
                newErrors.email = "This email is already registered.";
            }
        }

        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be 8-14 characters long, include 1 uppercase letter, 1 special character.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (await validateForm()) {
            const { confirmPassword, ...userData } = formData;
            dispatch(
                signupUser(userData, (response) => {
                    if (response.success) {
                        setToasterMessage(
                            "Registration successful! Redirecting to login page..."
                        );
                        setToasterType("success");
                        setToasterOpen(true);
                        setTimeout(() => {
                            navigate("/");
                        }, 4000);
                    } else {
                        setToasterMessage(
                            response.message ||
                                "Registration failed. Please try again."
                        );
                        setToasterType("error");
                        setToasterOpen(true);
                    }
                })
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(
            (prevShowConfirmPassword) => !prevShowConfirmPassword
        );
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleToasterClose = () => {
        setToasterOpen(false);
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
                    Sign Up
                </Typography>
                <Box sx={{ mt: 1 }} component="form" onSubmit={handleSubmit}>
                    <InputComponent
                        name="email"
                        label="Email Address"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
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
                    <InputComponent
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        showPassword={showConfirmPassword}
                        handleClickShowPassword={handleClickShowConfirmPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        <Button sx={{ flexGrow: 1, mr: 1 }}>Sign Up</Button>
                    </Box>
                    <Link href="/" variant="body2">
                        {"Already have an account? Log In"}
                    </Link>
                </Box>
            </Box>
            <ToasterComponent
                message={toasterMessage}
                type={toasterType}
                open={toasterOpen}
                onClose={handleToasterClose}
            />
        </Container>
    );
}

export default SignupPage;
