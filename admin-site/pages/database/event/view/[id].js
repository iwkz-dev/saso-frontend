import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import EventDataDisplay from "../../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { Space, Spin, Tabs, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";
import EventSummary from "../../../../src/components/Card/Event/EventSummary/EventSummary";
import RelatedOrdersTable from "../../../../src/components/Table/Event/RelatedOrders/RelatedOrdersTable";
import OrderFilterForm from "../../../../src/components/Form/Order/OrderFilterForm/OrderFilterForm";
import * as XLSX from "xlsx";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Event";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [filterValues, setFilterValues] = useState([]);
    const event = useSelector((state) => state.event.detailEvent);
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowLoading(true);
                const response = await dispatch(getDetailEvent(id));

                if (response.status === "success") {
                    setShowDataDisplay(true);
                } else {
                    message.error(response.message);
                    isAuth(response);
                }
            } catch (error) {
                // Handle any unexpected errors
                console.error("Error fetching data:", error);
            } finally {
                setShowLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, dispatch]);

    const getStatusDescription = (status) => {
        switch (status) {
            case 0:
                return "Waiting for Confirmation";
            case 1:
                return "Paid";
            case 2:
                return "Cancel / Refund";
            case 3:
                return "Done";
            default:
                return "Unknown Status";
        }
    };

    const exportToXlsx = () => {
        // Extract all unique menu names from the data
        const allMenuNames = new Set();
        orders.forEach((order) => {
            order.menus.forEach((menu) => {
                allMenuNames.add(menu.name);
            });
        });

        // Convert Set to Array
        const menuNamesArray = Array.from(allMenuNames);

        // Prepare the main order data
        const orderSheetData = orders.map((order) => {
            // Create an object with the order details
            const orderDetails = {
                OrderID: order._id,
                InvoiceNumber: order.invoiceNumber,
                Status: getStatusDescription(order.status),
                CustomerName: order.customerFullname,
                CustomerEmail: order.customerEmail,
                CustomerPhone: order.customerPhone,
                PaymentType: order.paymentType,
                TotalPrice: order.totalPrice,
                Event: event.name,
                Note: order.note,
                CreatedAt: order.created_at,
                UpdatedAt: order.updated_at,
            };

            // Add menu total portions to the order details
            menuNamesArray.forEach((menuName) => {
                const menu = order.menus.find((m) => m.name === menuName);
                orderDetails[menuName] =
                    menu && menu.totalPortion !== 0 ? menu.totalPortion : ""; // Use empty string if totalPortion is 0 or menu is not found
            });

            return orderDetails;
        });

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert the data to a worksheet object
        const orderSheet = XLSX.utils.json_to_sheet(orderSheetData);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, orderSheet, "Orders");

        // Export the workbook
        XLSX.writeFile(workbook, `${event.name}-order.xlsx`);
    };

    const items = [
        {
            key: "1",
            label: "Event Details",
            children: (
                <>
                    <EventSummary event={event} />
                    <EventDataDisplay event={event} />
                </>
            ),
        },
        {
            key: "2",
            label: "Menu",
            children: (
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Typography.Title level={4}>Related Menu</Typography.Title>
                    <AddItemButton
                        hrefLink={`/database/menu/add?event=${event._id}`}
                        text="Add Menu for this Event"
                    />
                    <RelatedMenuTable filterName="event" itemFilter={event} />
                </Space>
            ),
        },
        {
            key: "3",
            label: "Orders",
            children: (
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Typography.Title level={4}>
                        Related Orders
                    </Typography.Title>
                    <OrderFilterForm
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        exportToXlsx={exportToXlsx}
                    />
                    <RelatedOrdersTable
                        filterName="event"
                        itemFilter={event}
                        filterValues={filterValues}
                    />
                </Space>
            ),
        },
    ];

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>{event.name}</Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                destroyInactiveTabPane={true}
                            />
                        </Space>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
