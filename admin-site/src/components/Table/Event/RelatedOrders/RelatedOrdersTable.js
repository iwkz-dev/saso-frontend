import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table";
import { Typography, message } from "antd";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import {
    changeOrderStatus,
    getAllOrders,
} from "../../../../store/reducers/orderReducer";
import { getAllPaymentTypes } from "../../../../store/reducers/paymentTypeReducer";
import { isAuth } from "../../../../helpers/authHelper";
import dayjs from "dayjs";

const RelatedOrdersTable = ({
    filterName,
    itemFilter,
    onDelete,
    filterValues,
}) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const events = useSelector((state) => state.event.events);
    const [showTable, setShowTable] = useState(false);
    const [tableHead, setTableHead] = useState([]);
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        getAllData();
    }, [filterValues]);

    const getEventsOrders = async () => {
        setShowLoadingData(true);

        try {
            const filter = `?${filterName}=${itemFilter._id}`;
            await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllPaymentTypes()),
                dispatch(getAllOrders(filter)),
            ]);

            setShowTable(true);
            setShowLoadingData(false);
        } catch (error) {
            setShowTable(false);
            setShowLoadingData(false);
            message.error(error.message);
            isAuth(error);
        }
    };

    const onChangeStatus = async (value) => {
        value = JSON.parse(value);
        const isConfirm = confirm(
            `Please confirm this if you want to change status to ${value.value}`,
        );

        if (isConfirm) {
            setShowLoadingData(true);
            try {
                const onChangeStatus = await dispatch(
                    changeOrderStatus(value.id, value.value),
                );
                if (onChangeStatus.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(onChangeStatus.message);
                    getEventsOrders();
                } else {
                    setShowLoadingData(false);
                    message.error(onChangeStatus.message);
                }
            } catch (error) {
                setShowLoadingData(false);
                message.error(error);
            }
        }
    };

    const filtersQueryBuilder = (filterValues) => {
        const queries = [];
        if (filterValues.length > 0) {
            filterValues.map((f) => {
                const filtersQuery = `${f.name}=${f.id}`;
                queries.push(filtersQuery);
            });
            return `${queries.join("&")}`;
        }
        return "";
    };

    const getAllData = async () => {
        setShowLoadingData(true);
        const filterByInvoiceNumber = filtersQueryBuilder(filterValues);

        try {
            const filter = `?${filterByInvoiceNumber}&${filterName}=${itemFilter._id}`;
            const responses = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllOrders(filter)),
                dispatch(getAllPaymentTypes()),
            ]);

            if (!responses.some((r) => r?.status === "failed")) {
                setShowTable(true);
            } else {
                setShowTable(false);
                const failedResponse = responses.find(
                    (r) => r?.status === "failed",
                );
                message.error(failedResponse?.message);
            }
            setShowLoadingData(false);
        } catch (error) {
            // Handle unexpected errors here
            setShowLoadingData(false);
            console.error("Unexpected error:", error);
        }
    };

    useEffect(() => {
        setTableHead([
            {
                key: "invoiceNumber",
                dataIndex: "invoiceNumber",
                title: "Invoice Number",
                filterSearch: true,
                filters: orders.map((order) => {
                    return {
                        text: order.invoiceNumber,
                        value: order.invoiceNumber,
                    };
                }),
                onFilter: (value, record) => {
                    return record.invoiceNumber.includes(value);
                },
                coloredText: (record) => {
                    if (
                        record.status === 0 &&
                        dayjs().diff(dayjs(record.created_at), "d") >= 2
                    ) {
                        return "danger";
                    }

                    return "";
                },
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterSearch: true,
                filters: events.map((event) => {
                    return {
                        text: event.name,
                        value: event._id,
                    };
                }),
                onFilter: (value, record) => {
                    return record.event.includes(value);
                },
            },
            {
                key: "status",
                dataIndex: "status",
                title: "Status",
                editable: true,
                type: "select",
                onChange: onChangeStatus,
                filterSearch: true,
                onFilter: (value, record) => {
                    return record.status === value;
                },
                disabled: (record, events) => {
                    const getEvent = events.find(
                        (event) => event._id === record.event,
                    );

                    if (getEvent && getEvent.status !== 1) {
                        return true;
                    }

                    return false;
                },
                options: [
                    {
                        title: "Wait For Confirmation",
                        value: "wait",
                        code: 0,
                    },
                    {
                        title: "Paid",
                        value: "paid",
                        code: 1,
                    },
                    {
                        title: "Cancel / Refund",
                        value: "cancel",
                        code: 2,
                    },
                    {
                        title: "Done",
                        value: "done",
                        code: 3,
                    },
                ],
            },
            {
                key: "customerFullname",
                dataIndex: "customerFullname",
                title: "Customer Fullname",
            },
            {
                key: "customerEmail",
                dataIndex: "customerEmail",
                title: "Customer Email",
            },
            {
                key: "totalPrice",
                dataIndex: "totalPrice",
                title: "Total Price",
            },
            {
                key: "paymentType",
                dataIndex: "paymentType",
                title: "Payment Type",
            },
            {
                key: "arrived_at",
                dataIndex: "arrived_at",
                title: "Arrived At",
            },
            {
                key: "created_at",
                dataIndex: "created_at",
                title: "Created At",
            },
            {
                key: "updated_at",
                dataIndex: "updated_at",
                title: "Updated At",
            },
        ]);
    }, [events, orders]);

    const expandOrderedMenu = (record) => (
        <div>
            <Typography.Text style={{ margin: 0, whiteSpace: "pre-line" }}>
                Ordered Menu:
            </Typography.Text>
            <ol>{listItemElement(record.menus)}</ol>
        </div>
    );

    const listItemElement = (items) => {
        return items.map((item) => {
            return (
                <li key={item.key}>
                    {item.name} ({item.totalPortion})
                    {item.note ? ", note: " + item.note : ""}
                </li>
            );
        });
    };

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? orders : []}
            events={events}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            linkToView="/database/order/view/"
            paymentTypes={paymentTypes}
            isLoading={showLoadingData}
            deleteOff={true}
            expandable={expandOrderedMenu}
        />
    );
};

export default RelatedOrdersTable;
