import { Card, Row, Col, Typography, Tag } from "antd";
import { useRouter } from "next/router";

const { Title, Paragraph } = Typography;

const EventCards = ({ events }) => {
    const router = useRouter();
    const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

    const toSlug = (name) =>
        name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

    return (
        <Row gutter={[24, 24]}>
            {events.map((event) => {
                const imageUrl = event.images?.[0]?.imageUrl || DEFAULT_IMAGE;

                return (
                    <Col key={event._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            onClick={() =>
                                router.push(`/${toSlug(event.name)}`)
                            }
                            cover={
                                <img
                                    src={imageUrl}
                                    alt={event.name}
                                    onError={(e) => {
                                        e.target.src = DEFAULT_IMAGE;
                                    }}
                                    style={{
                                        height: 180,
                                        objectFit: "cover",
                                    }}
                                />
                            }
                            style={{
                                height: "100%",
                                borderRadius: 12,
                                overflow: "hidden",
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                            bodyStyle={{
                                padding: 16,
                            }}>
                            {/* Event year / date */}
                            {event.startYear && (
                                <Tag color="blue" style={{ marginBottom: 8 }}>
                                    {event.startYear}
                                </Tag>
                            )}

                            <Title
                                level={5}
                                style={{
                                    marginBottom: 8,
                                    lineHeight: 1.3,
                                }}>
                                {event.name}
                            </Title>

                            <Paragraph
                                type="secondary"
                                ellipsis={{ rows: 3 }}
                                style={{ marginBottom: 0 }}>
                                {event.description}
                            </Paragraph>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default EventCards;
