import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMenu, getAllMenus } from "../../src/store/reducers/menuReducer";
import { getAllCategories } from "../../src/store/reducers/categoryReducer";
import { getAllEvents } from "../../src/store/reducers/eventReducer";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import MenuTable from "../../src/components/Table/Menu/MenuTable/MenuTable";
import MenusFilterForm from "../../src/components/Form/Menu/MenusFilterForm/MenusFilterForm";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../src/components/Layout/Content/Content";
import { Button, message, Modal, Space, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Menu";
    const [filters, setFilters] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getEventsCategoriesMenus();
    }, []);

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

    const getEventsCategoriesMenus = () => {
        setShowLoading(true);
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
            dispatch(getAllMenus(filtersQueryBuilder())),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (!failed) {
                setShowTable(true);
                setShowLoading(false);
            } else {
                setShowTable(false);
                setShowLoading(false);
                message.error(failed.message);
            }
        });
    };

    const handleChange = (value) => {
        const data = JSON.parse(value);
        const filterIndex = filters.findIndex((f) => f.name === data.name);
        if (!(filterIndex > -1)) {
            setFilters([...filters, data]);
        } else {
            const tempFilters = [...filters];
            tempFilters[filterIndex].id = data.id;
            setFilters([...tempFilters]);
        }
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );
        if (isConfirm) {
            setShowLoading(true);
            try {
                const onDelete = await dispatch(deleteMenu(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowLoading(false);
                    message.success(onDelete.message);
                    getEventsCategoriesMenus();
                } else {
                    setShowLoading(false);
                    message.error(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowLoading(false);
                message.error(e.message);
            }
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        getEventsCategoriesMenus();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setFilters([]);
        setIsModalOpen(false);
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={2}>Menu</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <AddItemButton hrefLink="/menu/add" text="Add Menu" />
                        <Button icon={<FilterOutlined />} onClick={showModal}>
                            Filter
                        </Button>
                    </Space>
                    <Modal
                        title="Filter Menu"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        closable={false}>
                        <MenusFilterForm handleChange={handleChange} />
                    </Modal>
                    <MenuTable
                        onDelete={onDelete}
                        isLoading={showLoading}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default index;
