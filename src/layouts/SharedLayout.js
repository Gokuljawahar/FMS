import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBarComponents/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const SharedLayout = ({ children, initialPage }) => {
    const [activePage, setActivePage] = useState(initialPage);
    const [pageTitle, setPageTitle] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathSegments = location.pathname
            .split("/")
            .filter((segment) => segment);
        const title = pathSegments
            .map(
                (segment) => segment.charAt(0).toUpperCase() + segment.slice(1)
            )
            .join(" ");
        setPageTitle(title || "Home");
    }, [location.pathname]);

    const handleSidebarChange = (selectedOption) => {
        setActivePage(selectedOption.href);
        navigate(selectedOption.href);
    };

    return (
        <div
            style={{ display: "flex", height: "100vh", background: "#f4f4f9" }}
        >
            <Sidebar activePage={activePage} onChange={handleSidebarChange} />

            <Box sx={{ flex: 1, marginLeft: "100px", padding: "16px" }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        marginY: "16px",
                        padding: "8px 16px",
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                        fontWeight: 600,
                    }}
                >
                    {pageTitle}
                </Typography>

                <Box
                    sx={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </div>
    );
};

export default SharedLayout;
