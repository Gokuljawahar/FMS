import React from "react";
import { Tabs, Tab } from "@mui/material";

export default function FileTypeTabs({ activeTab, handleTabChange }) {
    return (
        <Tabs
            value={activeTab}
            onChange={(event, newValue) => handleTabChange(newValue)} 
            aria-label="File type tabs"
        >
            <Tab label="Images" value="image" />
            <Tab label="PDFs" value="pdf" />
            <Tab label="Excel" value="excel" />
        </Tabs>
    );
}
