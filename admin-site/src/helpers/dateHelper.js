const ID_LOCALE = "id-ID";

const toValidDate = (input) => {
    const d = input instanceof Date ? input : new Date(input);
    return isNaN(d.getTime()) ? null : d;
};

export const formatDate = (dateStr, withClock = false, withDay = false) => {
    const date = toValidDate(dateStr);
    if (!date) return "";

    const baseOpts = { year: "numeric", month: "long", day: "numeric" };

    let formatted = new Intl.DateTimeFormat(ID_LOCALE, baseOpts).format(date);

    if (withDay) {
        const day = new Intl.DateTimeFormat(ID_LOCALE, {
            weekday: "long",
        }).format(date);
        formatted = `${day}, ${formatted}`;
    }

    if (withClock) {
        const clock = new Intl.DateTimeFormat(ID_LOCALE, {
            hour: "numeric",
            minute: "numeric",
        }).format(date);
        formatted = `${formatted}, ${clock}`;
    }

    return formatted;
};

export const getDateValue = (dateStr) => {
    const date = toValidDate(dateStr);
    if (!date) return ""; // gracefully handle invalid inputs

    const pad2 = (n) => String(n).padStart(2, "0");
    const y = date.getFullYear();
    const m = pad2(date.getMonth() + 1);
    const d = pad2(date.getDate());

    return `${y}-${m}-${d}`;
};
