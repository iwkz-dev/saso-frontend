import { Button, Descriptions, Image, Space } from "antd";
import React from "react";
import { formatDate } from "../../helpers/dateHelper";

const DataDisplay = ({ item, dataForm, events, categories, linkToEdit }) => {
    const imageColumnHandler = (data) => {
        if (data.length > 0) {
            return data.map((d) => (
                <Image key={d.eTag} width={75} src={d.imageUrl} />
            ));
        }
    };

    const getStatusTitle = (statusValue) => {
        switch (statusValue) {
            case 0:
                return "Draft";
            case 1:
                return "Approved";
            case 2:
                return "Done";
            default:
                return "No Status";
        }
    };

    const columnHandler = (key, i) => {
        let value = "No data";
        if (key === "created_at" || key === "updated_at") {
            value = formatDate(item[key], true, true);
        } else if (key === "category") {
            const category = categories.find((e) => e._id === item[key]);
            value = category?.name;
        } else if (key === "event") {
            const event = events.find((e) => e._id === item[key]);
            value = event?.name;
        } else if (key === "status") {
            value = getStatusTitle(item[key]);
        } else if (key === "started_at") {
            value = formatDate(item[key], false, true);
        } else if (key === "images") {
            value = <Space>{imageColumnHandler(item[key])}</Space>;
        } else {
            value = item[key];
        }
        return (
            <Descriptions.Item key={key + i} label={dataForm[key]}>
                {value ?? ""}
            </Descriptions.Item>
        );
    };

    return (
        <Descriptions
            title="Detail Information"
            layout="vertical"
            bordered
            extra={
                linkToEdit ? (
                    <Button type="link" href={linkToEdit}>
                        Edit
                    </Button>
                ) : (
                    ""
                )
            }>
            {Object.keys(dataForm).map((key, i) => columnHandler(key, i))}
        </Descriptions>
    );
};

export default DataDisplay;
