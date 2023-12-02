import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "../../helpers/dateHelper";
import { Table, Select, Space, message } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import Router from "next/router";
import styles from "./Table.module.scss";
import { Typography } from "antd";

const TableComponent = ({
    onDelete,
    data,
    dataHead,
    linkToEdit,
    categories,
    events,
    paymentTypes,
    linkToView,
    actionsOff,
    deleteOff,
    isLoading,
}) => {
    const [tableHead, setTableHead] = useState([]);
    const { Column } = Table;
    const updatedData = data.map((item) => {
        const newItem = { ...item, key: item._id };
        return newItem;
    });

    useEffect(() => {
        setTableHead(dataHead);
    }, []);

    const getDefaultValue = (options, statuses, id) => {
        return JSON.stringify({
            id: id,
            value: options.find((option) => option.code === statuses)?.value,
        });
    };

    const editableRow = (columnData, dataKey) => {
        const type = columnData.type;
        switch (type) {
            case "select":
                return (
                    <Column
                        title={columnData.name}
                        dataIndex={dataKey}
                        key={dataKey}
                        render={(statuses, record) => {
                            return (
                                <Select
                                    key={record._id}
                                    style={{
                                        width: "95%",
                                    }}
                                    defaultValue={getDefaultValue(
                                        columnData.options,
                                        statuses,
                                        record._id,
                                    )}
                                    onChange={columnData.onChange}>
                                    {columnData.options.map((statusOption) => (
                                        <Select.Option
                                            key={statusOption.title}
                                            value={JSON.stringify({
                                                id: record._id,
                                                value: statusOption.value,
                                            })}>
                                            {statusOption.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            );
                        }}
                    />
                );

            default:
                break;
        }
    };

    return (
        <Table
            className={styles.table}
            loading={isLoading}
            dataSource={updatedData}
            scroll={{
                x: 1500,
                y: 800,
            }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => {
                        if (linkToView && !actionsOff) {
                            const link = linkToView + record._id;
                            Router.push(link);
                        } else {
                            message.error("Cannot open the detail");
                        }
                    },
                };
            }}>
            {Object.keys(tableHead).map((dataKey) => {
                if (typeof tableHead[dataKey] !== "string") {
                    return editableRow(tableHead[dataKey], dataKey);
                } else if (
                    dataKey === "created_at" ||
                    dataKey === "updated_at"
                ) {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(dates) => {
                                return <>{formatDate(dates, true)}</>;
                            }}
                        />
                    );
                } else if (dataKey === "started_at") {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(startedAt) => {
                                return (
                                    <>{formatDate(startedAt, false, true)}</>
                                );
                            }}
                        />
                    );
                } else if (dataKey === "category") {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(categoryId) => {
                                const category = categories.find(
                                    (c) => c._id === categoryId,
                                );
                                return <>{category?.name}</>;
                            }}
                        />
                    );
                } else if (dataKey === "event") {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(eventId) => {
                                const event = events.find(
                                    (e) => e._id === eventId,
                                );
                                return <>{event?.name}</>;
                            }}
                        />
                    );
                } else if (dataKey === "description") {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(desc) => {
                                return (
                                    <Typography.Paragraph
                                        ellipsis={{
                                            rows: 1,
                                            expandable: true,
                                            onEllipsis: (ellipsis) => {
                                                console.log(
                                                    "Ellipsis changed:",
                                                    ellipsis,
                                                );
                                            },
                                        }}
                                        title={desc}>
                                        {desc}
                                    </Typography.Paragraph>
                                );
                            }}
                        />
                    );
                } else if (dataKey === "paymentType") {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(eventId) => {
                                const paymentType = paymentTypes.find(
                                    (e) => e._id === eventId,
                                );
                                return <>{paymentType?.type}</>;
                            }}
                        />
                    );
                } else {
                    return (
                        <Column
                            title={tableHead[dataKey]}
                            dataIndex={dataKey}
                            key={dataKey}
                            render={(el) => {
                                return <>{el?.toString() || ""}</>;
                            }}
                        />
                    );
                }
            })}
            {actionsOff || (!linkToEdit && deleteOff) ? null : (
                <Column
                    title="Actions"
                    key="action"
                    fixed="right"
                    render={(_, record) => {
                        return (
                            <Space size={24}>
                                {linkToEdit ? (
                                    <Link href={linkToEdit + record._id}>
                                        <EditTwoTone />
                                    </Link>
                                ) : null}

                                {deleteOff ? null : (
                                    <DeleteTwoTone
                                        twoToneColor="#eb2f96"
                                        onClick={() => onDelete(record)}
                                    />
                                )}
                            </Space>
                        );
                    }}
                />
            )}
        </Table>
    );
};

export default TableComponent;
