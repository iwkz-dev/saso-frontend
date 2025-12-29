import { Space } from "antd";

import EventSummary from "../../../Card/Event/EventSummary/EventSummary";
import EventDataDisplay from "../../../DataDisplay/EventDataDisplay/EventDataDisplay";

const EventDetailTab = ({ event }) => {
    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <EventSummary event={event} />
            <EventDataDisplay event={event} />
        </Space>
    );
};

export default EventDetailTab;
