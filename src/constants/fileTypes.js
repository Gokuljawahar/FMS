export const fileTypes = {
    image: {
        label: "Image",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        maxSize: 10 * 1024 * 1024,
        icon: "🖼️",
    },
    pdf: {
        label: "PDF",
        allowedTypes: [".pdf"],
        maxSize: 10 * 1024 * 1024,
        icon: "📄",
    },
    excel: {
        label: "Excel",
        allowedTypes: [".xlsx", ".xls", ".csv"],
        maxSize: 10 * 1024 * 1024,
        icon: "📊",
    },
};
