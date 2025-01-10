import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SharedLayout from "../../layouts/SharedLayout";
import UpdateUsernameModal from "../../components/SettingsComponents/UpdateUserNameModel";
import UpdatePhoneNumberModal from "../../components/SettingsComponents/UpdatePhoneNumberModel";
import UpdatePasswordModal from "../../components/SettingsComponents/UpdatePasswordModel";
import FormatDataAlert from "../../components/SettingsComponents/FormatDataAlert";
import { deleteFiles } from "../../actions/SettingsActions";
import ToasterComponent from "../../components/ToasterComponent/ToasterComponent";

const SettingsPage = () => {
    const dispatch = useDispatch();
    const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
    const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isFormatAlertOpen, setFormatAlertOpen] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterType, setToasterType] = useState("success");
    const [toasterOpen, setToasterOpen] = useState(false);

    const handleConfirmDelete = async () => {
        const userId = localStorage.getItem("id");
        try {
            await dispatch(deleteFiles(userId));
            setToasterMessage("Data Formatted Successfully");
            setToasterType("success");
        } catch (err) {
            setToasterMessage("Failed to format data: " + err.message);
            setToasterType("error");
        } finally {
            setToasterOpen(true);
        }
    };

    const handleToasterClose = () => {
        setToasterOpen(false);
    };

    return (
        <SharedLayout initialPage="/settings">
            <Container component="main" maxWidth="sm">
                <Card
                    sx={{
                        borderRadius: "8px",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => setUsernameModalOpen(true)}
                            >
                                Update Username
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => setPhoneModalOpen(true)}
                            >
                                Update Phone Number
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => setPasswordModalOpen(true)}
                            >
                                Update Password
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                color="error"
                                onClick={() => setFormatAlertOpen(true)}
                            >
                                Format Data
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            <UpdateUsernameModal
                open={isUsernameModalOpen}
                onClose={() => setUsernameModalOpen(false)}
            />
            <UpdatePhoneNumberModal
                open={isPhoneModalOpen}
                onClose={() => setPhoneModalOpen(false)}
            />
            <UpdatePasswordModal
                open={isPasswordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
            />
            <FormatDataAlert
                open={isFormatAlertOpen}
                onClose={() => setFormatAlertOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <ToasterComponent
                message={toasterMessage}
                type={toasterType}
                open={toasterOpen}
                onClose={handleToasterClose}
            />
        </SharedLayout>
    );
};

export default SettingsPage;
