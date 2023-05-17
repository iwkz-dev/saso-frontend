export const formatDate = (dateStr, withClock = false, withDay = false) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    let formatedDate = date.toLocaleDateString("id-Id", options);
    if (withDay) {
        const dayOpt = { weekday: "long" };
        const day = date.toLocaleString("id-Id", dayOpt);
        formatedDate = `${day}, ${formatedDate}`;
    }
    if (withClock) {
        const clockOpt = { hour: "numeric", minute: "numeric" };
        const clock = date.toLocaleString("id-Id", clockOpt);
        formatedDate = `${formatedDate}, ${clock} `;
    }
    return formatedDate;
};

/*
const makeTwoDigit = (number) => {
    number = number < 10 && number > 0 ? "0" + number : number;
    number = number <= 0 ? "00" : number;
    return number;
};
*/

export const getDateValue = (dateStr) => {
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
    return `${year}-${month}-${day}`;
};
