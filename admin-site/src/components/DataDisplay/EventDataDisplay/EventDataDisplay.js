import React from "react";
import DataDisplay from "../DataDisplay";

const EventDataDisplay = ({ event }) => {
    const dataForm = {
        _id: "ID",
        name: "Name",
        description: "Description",
        status: "Status",
        started_at: "Started at",
        startYear: "Start Year",
        bankName: "Bank Name",
        iban: "IBAN",
        bic: "BIC",
        usageNote: "VZW",
        paypal: "Paypal",
        images: "Images",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return <DataDisplay item={event} dataForm={dataForm} />;
};

export default EventDataDisplay;
