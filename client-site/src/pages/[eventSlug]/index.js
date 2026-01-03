import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Spin } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

import SasoContent from "../../components/organismus/SasoContent/SasoContent";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";

export default function EventDetail() {
    const router = useRouter();
    const { data: selectedEvent, status } = useSelector((state) => state.event);

    if (!router.isReady || status === "loading") {
        return (
            <MainLayout>
                <div style={{ textAlign: "center", padding: 48 }}>
                    <Spin />
                </div>
            </MainLayout>
        );
    }

    if (!selectedEvent) return null;

    const contact = selectedEvent.contactPersons?.[0];
    const waHref = contact?.phoneNumber
        ? `https://wa.me/${contact.phoneNumber.replace(/\D/g, "")}`
        : null;

    return (
        <MainLayout>
            <SasoContent event={selectedEvent} />

            {waHref && (
                <Button
                    type="primary"
                    href={waHref}
                    target="_blank"
                    size="large"
                    icon={<WhatsAppOutlined />}
                    style={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        borderRadius: 999,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                    }}>
                    Ask {contact?.name ?? "us"}
                </Button>
            )}
        </MainLayout>
    );
}
