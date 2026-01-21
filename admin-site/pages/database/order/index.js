import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Space, Typography, message } from "antd";

import Protected from "../../../src/components/Layout/Protected/Protected";
import {
    changeOrderStatus,
    deleteOrder,
    getAllOrders,
} from "../../../src/store/reducers/orderReducer";
import OrderTable from "../../../src/components/Table/Order/OrderTable/OrderTable";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import OrderFilterForm from "../../../src/components/Form/Order/OrderFilterForm/OrderFilterForm";
import Content from "../../../src/components/Layout/Content/Content";
import { getAllPaymentTypes } from "../../../src/store/reducers/paymentTypeReducer";

const OrderIndexPage = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Order";

    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);
    const [filterValues, setFilterValues] = useState([]);

    const buildQueryString = useCallback((filters = []) => {
        const params = new URLSearchParams();
        filters.forEach((f) => {
            if (f?.name && (f.id || f.id === 0)) {
                params.append(f.name, String(f.id));
            }
        });
        const qs = params.toString();
        return qs ? `?${qs}` : "";
    }, []);

    const fetchOrders = useCallback(async () => {
        setShowLoadingData(true);
        try {
            const filters = buildQueryString(filterValues);
            const results = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllPaymentTypes()),
                dispatch(getAllOrders(filters)),
            ]);

            const failed = results.find((r) => r?.status !== "success");
            if (failed) {
                setShowTable(false);
                message.error(failed?.message || "Failed to load orders");
            } else {
                setShowTable(true);
            }
        } catch (err) {
            setShowTable(false);
            message.error(err?.message || "Failed to load data");
        } finally {
            setShowLoadingData(false);
        }
    }, [dispatch, filterValues, buildQueryString]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const onChangeStatus = async (value) => {
        // value is a JSON string: { id, value }
        let parsed;
        try {
            parsed = JSON.parse(value);
        } catch {
            message.error("Invalid status payload");
            return;
        }

        const ok = window.confirm(
            `Please confirm this if you want to change status to ${parsed.value}`,
        );
        if (!ok) return;

        setShowLoadingData(true);
        try {
            const res = await dispatch(
                changeOrderStatus(parsed.id, parsed.value),
            );
            if (res?.status !== "failed") {
                message.success(res?.message || "Order status updated");
                await fetchOrders();
            } else {
                message.error(res?.message || "Failed to update status");
            }
        } catch (err) {
            message.error(err?.message || "Failed to update status");
        } finally {
            setShowLoadingData(false);
        }
    };

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm this if you want to delete "${item.invoiceNumber}"`,
        );
        if (!ok) return;

        setShowLoadingData(true);
        try {
            const res = await dispatch(deleteOrder(item["_id"]));
            if (res?.status !== "failed") {
                message.success(res?.message || "Order deleted");
                await fetchOrders();
            } else {
                message.error(res?.message || "Failed to delete order");
            }
        } catch (err) {
            message.error(err?.message || "Failed to delete order");
        } finally {
            setShowLoadingData(false);
        }
    };

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Order</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <OrderFilterForm
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                    />

                    <OrderTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </Protected>
    );
};

export default OrderIndexPage;
