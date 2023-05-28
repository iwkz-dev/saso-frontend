import React, { useEffect } from "react";
import { getEvent } from "../stores/reducers/event";
import { useDispatch, useSelector } from "react-redux";
import TokoContent from "../components/organisms/TokoContent/TokoContent";
import SasoContent from "../components/organisms/SasoContent/SasoContent";
import ZakatContent from "../components/organisms/ZakatContent/ZakatContent";
import MainLayout from "../components/organisms/MainLayout/MainLayout";

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
        </MainLayout>
    );
}
