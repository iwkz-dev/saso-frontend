import React, { useEffect, useState } from "react";
import Content from "../../../src/components/Layout/Content/Content";
import { useDispatch } from "react-redux";
import {
    deleteContactPerson,
    getAllContactPerson,
} from "../../../src/store/reducers/contactPersonReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import ContactPersonTable from "../../../src/components/Table/ContactPerson/ContactPersonTable/ContactPersonTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import { Space, message, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Contact Person";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        fetchContactPerson();
    }, []);

    const fetchContactPerson = async () => {
        try {
            setShowLoadingData(true);
            const [eventsResponse, categoriesResponse, menusResponse] =
                await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllContactPerson()),
                ]);

            // Check for failed responses
            if (
                [eventsResponse, categoriesResponse, menusResponse].some(
                    (r) => r?.status === "failed",
                )
            ) {
                throw new Error("One or more requests failed");
            }

            // If all responses are successful
            setShowTable(true);
        } catch (error) {
            handleFetchError(error);
        } finally {
            setShowLoadingData(false);
        }
    };

    const handleFailedRequest = (response) => {
        message.error(response.message);
        setShowTable(false);
        isAuth(response);
    };

    const handleFetchError = (error) => {
        message.error(error.message);
    };

    const onDelete = async (item) => {
        const isConfirm = window.confirm(
            `Please confirm if you want to delete "${item.name}"`,
        );

        if (isConfirm) {
            try {
                setShowLoadingData(true);
                const deleteResponse = await dispatch(
                    deleteContactPerson(item["_id"]),
                );

                if (deleteResponse.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(deleteResponse.message);
                    fetchContactPerson();
                } else {
                    handleFailedRequest(deleteResponse);
                }
            } catch (error) {
                handleFetchError(error);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Contact Person</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/database/contact-person/add"
                        text="Add Contact Person"
                    />
                    <ContactPersonTable
                        onDelete={onDelete}
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default index;
