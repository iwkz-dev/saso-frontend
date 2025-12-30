import { Space, Typography, message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";

import MenuEventFilterForm from "../../../Form/Menu/MenuEventFilterForm/MenuEventFilterForm";
import RelatedMenuTable from "../../../Table/Event/RelatedMenuTable/RelatedMenuTable";
import { deleteMenu } from "../../../../store/reducers/menuReducer";
import EventAddMenuModal from "../../../Modal/EventAddMenuModal/EventAddMenuModal";

const EventMenusTab = ({
    event,
    menus,
    setFilterMenuValues,
    filterMenuValues,
}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm if you want to delete "${
                item?.name ?? "this category"
            }".`,
        );
        if (!ok) return;

        setLoading(true);
        try {
            const res = await dispatch(deleteMenu(item?._id));
            if (res?.status !== "success") {
                message.error(res?.message || "Failed to delete category");
            } else {
                message.success(res?.message || "Category deleted");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
                Related Menu
            </Typography.Title>

            <EventAddMenuModal event={event} />

            <MenuEventFilterForm
                setFilterValues={setFilterMenuValues}
                menus={menus}
                visible={visible}
                setVisible={setVisible}
            />

            <Spin spinning={loading}>
                <RelatedMenuTable
                    filterName="event"
                    itemFilter={event}
                    filterValues={filterMenuValues}
                    onDelete={onDelete}
                />
            </Spin>
        </Space>
    );
};

export default EventMenusTab;
