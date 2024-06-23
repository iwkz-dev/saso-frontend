import React from "react";
import Link from "next/link";
import { formatDate } from "../../helpers/dateHelper";
import { Table, Select, Space } from "antd";
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
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
    expandable,
}) => {
    const { Column } = Table;
    const updatedData = data.map((item) => {
        const newItem = { ...item, key: item._id };
        return newItem;
    });

    const getDefaultValue = (options, statuses, id) => {
        return JSON.stringify({
            id: id,
            value: options.find((option) => option.code === statuses)?.value,
        });
    };

    const getActionColumnWidth = (linkToEdit, deleteOff, linkToView) => {
        return (
            75 +
            (linkToEdit ? 30 : 0) +
            (!deleteOff ? 30 : 0) +
            (linkToView ? 30 : 0)
        );
    };

    const editableRow = (tH) => {
        const type = tH.type;
        switch (type) {
            case "select":
                return (
                    <Column
                        title={tH.title}
                        dataIndex={tH.dataIndex}
                        key={tH.key}
                        filterSearch={tH.filterSearch}
                        onFilter={tH.onFilter}
                        filters={tH.options.map((option) => {
                            return {
                                text: option.title,
                                value: option.code,
                            };
                        })}
                        render={(statuses, record) => {
                            return (
                                <Select
                                    key={record._id}
                                    style={{
                                        width: "95%",
                                    }}
                                    defaultValue={getDefaultValue(
                                        tH.options,
                                        statuses,
                                        record._id,
                                    )}
                                    onChange={tH.onChange}>
                                    {tH.options.map((statusOption) => (
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
            expandable={
                expandable
                    ? {
                          expandedRowRender: expandable,
                      }
                    : null
            }>
            {dataHead.map((tH) => {
                const {
                    title,
                    dataIndex,
                    key,
                    filterMode,
                    filterSearch,
                    onFilter,
                    filters,
                    editable,
                } = tH;
                if (editable) {
                    return editableRow(tH);
                } else if (key === "created_at" || key === "updated_at") {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
                            render={(dates) => {
                                return <>{formatDate(dates, true)}</>;
                            }}
                        />
                    );
                } else if (tH.key === "started_at") {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
                            render={(startedAt) => {
                                return (
                                    <>{formatDate(startedAt, false, true)}</>
                                );
                            }}
                        />
                    );
                } else if (tH.key === "category") {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
                            filterSearch={filterSearch}
                            filters={filters}
                            onFilter={onFilter}
                            filterMode={filterMode}
                            render={(categoryId) => {
                                const category = categories.find(
                                    (c) => c._id === categoryId,
                                );
                                return <>{category?.name}</>;
                            }}
                        />
                    );
                } else if (tH.key === "event") {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
                            filterSearch={filterSearch}
                            filters={filters}
                            onFilter={onFilter}
                            filterMode={filterMode}
                            render={(eventId) => {
                                const event = events.find(
                                    (e) => e._id === eventId,
                                );
                                return <>{event?.name}</>;
                            }}
                        />
                    );
                } else if (tH.key === "description") {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
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
                } else if (tH.key === "paymentType") {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
                            render={(record) => {
                                let paymentType = paymentTypes.find(
                                    (e) => e.type === record,
                                );

                                if (!paymentType) {
                                    paymentType = paymentTypes.find(
                                        (e) => e._id === record,
                                    );
                                }
                                return <>{paymentType?.type}</>;
                            }}
                        />
                    );
                } else {
                    return (
                        <Column
                            title={title}
                            dataIndex={dataIndex}
                            key={key}
                            filterSearch={filterSearch}
                            onFilter={onFilter}
                            filters={filters}
                            render={(el) => {
                                return <>{el?.toString() || ""}</>;
                            }}
                        />
                    );
                }
            })}
            {actionsOff || (!linkToEdit && deleteOff && !linkToView) ? null : (
                <Column
                    title="Actions"
                    key="action"
                    fixed="right"
                    width={getActionColumnWidth(
                        linkToEdit,
                        deleteOff,
                        linkToView,
                    )}
                    render={(_, record) => {
                        return (
                            <div className={styles.actionCell}>
                                <Space size={16} align="center" split={true}>
                                    {linkToView ? (
                                        <Link href={linkToView + record._id}>
                                            <SearchOutlined />
                                        </Link>
                                    ) : null}
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
                            </div>
                        );
                    }}
                />
            )}
        </Table>
    );
};

export default TableComponent;
