import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "antd";

import Protected from "../../../../src/components/Layout/Protected/Protected";
import AddEventForm from "../../../../src/components/Form/Event/AddEventForm/AddEventForm";
import Content from "../../../../src/components/Layout/Content/Content";
import { getAllPaymentTypes } from "../../../../src/store/reducers/paymentTypeReducer";

export default function AddEventPage() {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Event";

    useEffect(() => {
        dispatch(getAllPaymentTypes());
    });

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    };

    return (
        <Protected title={pageTitle}>
            <Content>
                <div style={{ display: "grid", gap: 16 }}>
                    <div style={headerStyle}>
                        <Typography.Title level={3}>Add Event</Typography.Title>
                    </div>
                    <AddEventForm />
                </div>
            </Content>
        </Protected>
    );
}
