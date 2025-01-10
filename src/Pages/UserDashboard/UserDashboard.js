import React, { useEffect } from "react";
import FileTypeTabs from "../../components/DashboardComponents/FileTypeTabs";
import DataTable from "../../components/DashboardComponents/DataTable";
import SharedLayout from "../../layouts/SharedLayout";
import SearchAndDownload from "../../components/DashboardComponents/SearchandDownload";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchData,
    setActiveTab,
    setSearchQuery,
    fetchFile,
} from "../../actions/DashboardActions";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { activeTab, searchQuery, filteredData, error, loading } =
        useSelector((state) => state.dashboard);

    useEffect(() => {
        const userId = localStorage.getItem("id");
        if (userId) {
            dispatch(fetchData(userId, activeTab, searchQuery));
        }
    }, [activeTab, searchQuery, dispatch]);

    const handleTabChange = (newTab) => {
        dispatch(setActiveTab(newTab));
    };

    const handleSearch = (event) => {
        dispatch(setSearchQuery(event.target.value));
    };

    const handleDownload = () => {
        const blob = new Blob(["Download function coming soon"], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Download.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePreview = (row) => {
        dispatch(fetchFile(row.id));
        navigate("/filepreview");
    };

    return (
        <SharedLayout initialPage="/home">
            <SearchAndDownload
                handleSearch={handleSearch}
                handleDownload={handleDownload}
            />
            <FileTypeTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
            />
            {loading ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    Loading...
                </div>
            ) : filteredData.length > 0 ? (
                <DataTable data={filteredData} handlePreview={handlePreview} />
            ) : (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    {error ? <p>{error}</p> : <p>No Results Found</p>}
                </div>
            )}
        </SharedLayout>
    );
}
