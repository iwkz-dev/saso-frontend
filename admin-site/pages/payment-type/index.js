import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    deletePaymentType,
    getAllPaymentTypes,
} from "../../src/store/reducers/paymentTypeReducer";
import { Space, Typography, message } from "antd";
import { isAuth } from "../../src/helpers/authHelper";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import PaymentTypeTable from "../../src/components/Table/PaymentType/PaymentTypeTable/PaymentTypeTable";
import Content from "../../src/components/Layout/Content/Content";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Payment Type";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        getPaymentTypes();
    }, []);

    const getPaymentTypes = async () => {
        setShowLoadingData(true);
        try {
            const response = await dispatch(getAllPaymentTypes());
            if (response.status === "success") {
                setShowTable(true);
            } else {
                message.error(response.message);
                isAuth(response);
                setShowTable(false);
            }
        } finally {
            setShowLoadingData(false);
        }
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );

        if (isConfirm) {
            setShowLoadingData(true);
            try {
                const onDeleteResponse = await dispatch(
                    deletePaymentType(item["_id"]),
                );

                if (onDeleteResponse.status !== "failed") {
                    message.success(onDeleteResponse.message);
                    await getPaymentTypes();
                } else {
                    message.error(onDeleteResponse.message);
                }
            } catch (e) {
                // TODO: handle error here
                message.error(e);
            } finally {
                setShowLoadingData(false);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Payment Type</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/payment-type/add"
                        text="Add Payment Type"
                    />
                    <PaymentTypeTable
                        isLoading={showLoadingData}
                        showTable={showTable}
                        onDelete={onDelete}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default index;
