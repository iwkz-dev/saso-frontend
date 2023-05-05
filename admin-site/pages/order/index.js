import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import {
    changeOrderStatus,
    deleteOrder,
    getAllOrders,
} from "../../src/store/reducers/orderReducer";
import OrderTable from "../../src/components/Table/Order/OrderTable/OrderTable";
import { getAllEvents } from "../../src/store/reducers/eventReducer";
import OrderFilterForm from "../../src/components/Form/Order/OrderFilterForm/OrderFilterForm";
import Content from "../../src/components/Layout/Content/Content";
import { Space, Typography, message } from "antd";
import { isAuth } from "../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Order";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        getEventsOrders();
    }, [filters]);

    const filtersQueryBuilder = () => {
        const queries = [];
        if (filters.length > 0) {
            filters.map((f) => {
                const filtersQuery = `${f.name}=${f.id}`;
                queries.push(filtersQuery);
            });
            return `?${queries.join("&")}`;
        }
        return "";
    };

    const getEventsOrders = () => {
        setShowLoadingData(true);
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllOrders(filtersQueryBuilder())),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (!failed) {
                setShowTable(true);
                setShowLoadingData(false);
            } else {
                setShowTable(false);
                setShowLoadingData(false);
                message.error(failed.message);
                isAuth(failed);
            }
        });
    };

    const onChangeStatus = async (value) => {
        setShowLoadingData(true);
        try {
            const onChangeStatus = await dispatch(
                changeOrderStatus(
                    JSON.parse(value).id,
                    JSON.parse(value).value,
                ),
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
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.invoiceNumber}"`,
        );
        if (isConfirm) {
            setShowLoadingData(true);
            try {
                const onDelete = await dispatch(deleteOrder(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(onDelete.message);
                    getEventsOrders();
                } else {
                    setShowLoadingData(false);
                    message.error(onChangeStatus.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowLoadingData(false);
                message.error(e);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Order</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <OrderFilterForm
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <OrderTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default index;
