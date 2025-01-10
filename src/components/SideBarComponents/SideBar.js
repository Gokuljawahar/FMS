import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Sidebar = ({ activePage, onChange }) => {
    const sidebarOptions = [
        { label: "Home", href: "/home", icon: <HomeIcon /> },
        { label: "File Upload", href: "/fileupload", icon: <UploadFileIcon /> },
    ];

    return (
        <div
            style={{
                width: "100px",
                background: "#f5f5f5",
                height: "100%",
                position: "fixed",
            }}
        >
            <List>
                {sidebarOptions.map((option) => (
                    <Tooltip
                        key={option.label}
                        title={option.label}
                        placement="right"
                    >
                        <ListItem
                            button
                            selected={activePage === option.href}
                            onClick={() => onChange(option)}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "8px 0",
                            }}
                        >
                            <ListItemIcon style={{ justifyContent: "center" }}>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={option.label}
                                style={{
                                    fontSize: "12px",
                                    textAlign: "center",
                                    whiteSpace: "normal",
                                    wordWrap: "break-word",
                                }}
                            />
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
