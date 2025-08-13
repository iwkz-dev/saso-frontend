import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchEvents,
    selectFirstEvent,
    selectEventStatus,
    selectEventError,
} from "../stores/reducers/event";

import TokoContent from "../components/organismus/TokoContent/TokoContent";
import SasoContent from "../components/organismus/SasoContent/SasoContent";
import ZakatContent from "../components/organismus/ZakatContent/ZakatContent";
import MainLayout from "../components/organismus/MainLayout/MainLayout";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Button, Spin, Alert } from "antd";

function ContentByType({ event }) {
    if (!event) return null;
    if (process.env.EVENT_TYPE === "toko") return <TokoContent event={event} />;
    if (process.env.EVENT_TYPE === "saso") return <SasoContent event={event} />;
    if (process.env.EVENT_TYPE === "zakat")
        return <ZakatContent event={event} />;
    return null;
}

export default function Home() {
    const dispatch = useDispatch();
    const firstEvent = useSelector(selectFirstEvent);
    const status = useSelector(selectEventStatus);
    const error = useSelector(selectEventError);

    useEffect(() => {
        dispatch(fetchEvents("approved"));
    }, [dispatch]);

    const contact = firstEvent?.contactPersons?.[0];
    const waHref = contact?.phoneNumber
        ? `https://wa.me/${contact.phoneNumber}`
        : null;

    return (
        <MainLayout>
            {status === "loading" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 24,
                    }}
                >
                    <Spin />
                </div>
            )}

            {status === "failed" && (
                <Alert
                    type="error"
                    message="Failed to load event"
                    description={error}
                />
            )}

            {status === "succeeded" && <ContentByType event={firstEvent} />}

            {status === "succeeded" && waHref && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1rem",
                    }}
                >
                    <Button
                        type="link"
                        href={waHref}
                        target="_blank"
                        size="large"
                        style={{
                            position: "fixed",
                            bottom: "5%",
                            right: "10%",
                            backgroundColor: "#fff",
                            padding: "0.5rem 0.5rem",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        icon={<WhatsAppOutlined />}
                    >
                        Ask {contact?.name ?? "us"}
                    </Button>
                </div>
            )}
        </MainLayout>
    );
}
