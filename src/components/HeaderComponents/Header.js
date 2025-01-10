import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../../actions/SettingsActions";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const loginState = useSelector((state) => state.login);
    const settingsState = useSelector((state) => state.settings);
    const username =
        loginState.user?.username ||
        settingsState.username ||
        localStorage.getItem("username");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername !== username) {
            dispatch(updateUsername(storedUsername));
        }
    }, [dispatch, username]);

    const hideIcons = ["/", "/signup"].includes(location.pathname);

    const handleLogout = () => {
        localStorage.removeItem("userId"); 
        localStorage.removeItem("username"); 
        setLogoutModalOpen(false);
        navigate("/");
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenLogoutModal = () => {
        handleMenuClose();
        setLogoutModalOpen(true);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#1976d2",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    paddingX: 2,
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            color: "#fff",
                        }}
                    >
                        File Management System
                    </Typography>

                    {!hideIcons && (
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="subtitle1"
                                sx={{ marginRight: 2, color: "#fff" }}
                            >
                                {username}
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                                sx={{ marginRight: 1 }}
                                onClick={handleMenuOpen}
                            >
                                <AccountCircle />
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="settings"
                                color="inherit"
                                sx={{ marginRight: 1 }}
                                onClick={() => navigate("/settings")}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleOpenLogoutModal}>Logout</MenuItem>
            </Menu>

            <Dialog
                open={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">{"Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setLogoutModalOpen(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
