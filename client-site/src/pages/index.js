import { useSelector } from "react-redux";
import { Alert, Empty, Skeleton, Card, Col, Row, Typography } from "antd";

import {
    selectEventStatus,
    selectEventError,
    selectEvents,
} from "../stores/reducers/event";
import MainLayout from "../components/organismus/MainLayout/MainLayout";
import EventCards from "../components/molecules/EventCards/EventCards";

const { Title, Paragraph } = Typography;

export default function Home() {
    const status = useSelector(selectEventStatus);
    const error = useSelector(selectEventError);
    const events = useSelector(selectEvents);

    return (
        <MainLayout>
            <div
                style={{
                    width: "100%",
                    maxWidth: "1024px",
                    margin: "0 auto",
                    padding: "24px 16px",
                }}>
                <div
                    style={{
                        marginBottom: 32,
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                    <Title level={2} style={{ marginBottom: 8 }}>
                        Available Events
                    </Title>
                    <Paragraph type="secondary">
                        Select an event to continue
                    </Paragraph>
                </div>

                {status === "loading" && (
                    <Row gutter={[24, 24]}>
                        {[...Array(4)].map((_, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card>
                                    <Skeleton.Image
                                        active
                                        style={{
                                            width: "100%",
                                            height: 180,
                                            marginBottom: 16,
                                        }}
                                    />
                                    <Skeleton
                                        active
                                        title={false}
                                        paragraph={{ rows: 2 }}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {status === "failed" && (
                    <Alert
                        type="error"
                        showIcon
                        message="Unable to load events"
                        description={
                            error ||
                            "Something went wrong. Please try again later."
                        }
                    />
                )}

                {status === "succeeded" && events.length === 0 && (
                    <Empty
                        description="No events available at the moment"
                        style={{ marginTop: 48 }}
                    />
                )}

                {status === "succeeded" && events.length > 0 && (
                    <div style={{ marginTop: 24 }}>
                        <EventCards events={events} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
