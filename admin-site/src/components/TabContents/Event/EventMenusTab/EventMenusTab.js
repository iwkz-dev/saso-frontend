import { Space, Typography, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import AddItemButton from "../../../common/Button/AddItemButton/AddItemButton";
import MenuEventFilterForm from "../../../Form/Menu/MenuEventFilterForm/MenuEventFilterForm";
import RelatedMenuTable from "../../../Table/Event/RelatedMenuTable/RelatedMenuTable";

const EventMenusTab = ({
    event,
    menus,
    setFilterMenuValues,
    filterMenuValues,
}) => {
    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <Typography.Title level={4}>Related Menu</Typography.Title>
            <Space.Compact block>
                <AddItemButton
                    hrefLink={`/database/menu/add?event=${event?._id || ""}`}
                    text="Add Menu for this Event"
                />
                <Button type="default" icon={<DownloadOutlined />}>
                    Export from xlsx file
                </Button>
            </Space.Compact>

            <MenuEventFilterForm
                setFilterValues={setFilterMenuValues}
                menus={menus}
            />
            <RelatedMenuTable
                filterName="event"
                itemFilter={event}
                filterValues={filterMenuValues}
            />
        </Space>
    );
};

export default EventMenusTab;
