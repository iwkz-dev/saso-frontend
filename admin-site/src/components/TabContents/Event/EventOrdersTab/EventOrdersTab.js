import { Space, Typography } from "antd";
import OrderFilterForm from "../../../Form/Order/OrderFilterForm/OrderFilterForm";
import RelatedOrdersTable from "../../../Table/Event/RelatedOrders/RelatedOrdersTable";

const EventOrdersTab = ({
    event,
    orders,
    setFilterInvoiceOrderValues,
    filterInvoiceOrderValues,
}) => {
    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <Typography.Title level={4}>Related Orders</Typography.Title>
            <OrderFilterForm
                setFilterValues={setFilterInvoiceOrderValues}
                orders={orders}
            />
            <RelatedOrdersTable
                filterName="event"
                itemFilter={event}
                filterValues={filterInvoiceOrderValues}
            />
        </Space>
    );
};

export default EventOrdersTab;
