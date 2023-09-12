import React, { useEffect } from "react";
import { getEvent } from "../stores/reducers/event";
import { useDispatch, useSelector } from "react-redux";
import TokoContent from "../components/organismus/TokoContent/TokoContent";
import SasoContent from "../components/organismus/SasoContent/SasoContent";
import ZakatContent from "../components/organismus/ZakatContent/ZakatContent";
import MainLayout from "../components/organismus/MainLayout/MainLayout";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Home() {
    const dispatch = useDispatch();
    // Fetch current event
    const events = useSelector((state) => state.event.data);

    useEffect(() => {
        const status = "approved";
        dispatch(getEvent(status));
    }, []);

    const ContentComponent = (event) => {
        if (process.env.EVENT_TYPE === "toko")
            return <TokoContent event={event} />;
        if (process.env.EVENT_TYPE === "saso")
            return <SasoContent event={event} />;
        if (process.env.EVENT_TYPE === "zakat")
            return <ZakatContent event={event} />;
    };

    return (
        <MainLayout>
            {events[0] ? ContentComponent(events[0]) : null}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                }}>
                <Button
                    type="link"
                    href="https://wa.me/+491783588811"
                    target="_blank"
                    icon={<WhatsAppOutlined />}>
                    Need help? Ask Almira
                </Button>
            </div>
        </MainLayout>
    );
}
