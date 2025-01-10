export default function getFileGroup(fileType) {
    const imageMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
    ];
    const pdfMimeType = "application/pdf";
    const excelMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ];

    if (imageMimeTypes.includes(fileType)) {
        return "image";
    } else if (fileType === pdfMimeType) {
        return "pdf";
    } else if (excelMimeTypes.includes(fileType)) {
        return "excel";
    } else {
        return null; // unsupported type
    }
}
