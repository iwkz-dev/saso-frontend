const getStatusDescription = (status) => {
    switch (status) {
        case 0:
            return "Waiting for Confirmation";
        case 1:
            return "Paid";
        case 2:
            return "Cancel / Refund";
        case 3:
            return "Done";
        default:
            return "Unknown Status";
    }
};

export default getStatusDescription;
