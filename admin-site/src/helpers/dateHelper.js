export const formatDate = (dateStr, format = "") => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (format === "germany") {
        return `${day}.${month}.${year}`;
    }
    return `${year}-${month}-${day}`;
};
