import React from "react";
import Link from "next/link";
import { formatDate } from "../../helpers/dateHelper";
import { Table, Select, Space, Badge } from "antd";
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

    const renderDateColumn = (title, dataIndex, key, formatFunc) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            render={(dates) => <>{formatFunc(dates)}</>}
        />
    );

    const renderFilterableColumn = (title, dataIndex, key, tH, renderFunc) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            filterSearch={tH.filterSearch}
            filters={tH.filters}
            onFilter={tH.onFilter}
            filterMode={tH.filterMode}
            defaultFilteredValue={tH.defaultFilteredValue}
            render={renderFunc}
        />
    );

    const renderDescriptionColumn = (title, dataIndex, key) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            render={(desc) => (
                <Typography.Paragraph
                    ellipsis={{
                        rows: 1,
                        expandable: true,
                    }}
                    title={desc}>
                    {desc}
                </Typography.Paragraph>
            )}
        />
    );

    const renderPaymentTypeColumn = (title, dataIndex, key, paymentTypes) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            render={(record) => {
                let paymentType =
                    paymentTypes.find((e) => e.type === record) ||
                    paymentTypes.find((e) => e._id === record);
                return <>{paymentType?.type}</>;
            }}
        />
    );

    const renderColoredTextColumn = (title, dataIndex, key, tH) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            filterSearch={tH.filterSearch}
            onFilter={tH.onFilter}
            filters={tH.filters}
            defaultFilteredValue={tH.defaultFilteredValue}
            render={(el, record) => {
                if (!tH.coloredText) {
                    return <>{el?.toString() || ""}</>;
                }

                const colorTextType = tH.coloredText(record);
                switch (colorTextType) {
                    case "danger":
                        return (
                            <Typography.Text type={colorTextType}>
                                <Badge status="error" /> {el?.toString() || ""}
                            </Typography.Text>
                        );
                    case "success":
                        return (
                            <Typography.Text type={colorTextType}>
                                <Badge status="success" />{" "}
                                {el?.toString() || ""}
                            </Typography.Text>
                        );
                    default:
                        return (
                            <Typography.Text type={colorTextType}>
                                {el?.toString() || ""}
                            </Typography.Text>
                        );
                }
            }}
        />
    );

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
                        defaultFilteredValue={[tH.defaultFilteredValue]}
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
                                    onChange={tH.onChange}
                                    disabled={
                                        tH.disabled
                                            ? tH.disabled(record, events)
                                            : false
                                    }>
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
                const { title, dataIndex, key, editable } = tH;

                if (editable) {
                    return editableRow(tH);
                } else if (key === "created_at" || key === "updated_at") {
                    return renderDateColumn(title, dataIndex, key, (dates) =>
                        formatDate(dates, true),
                    );
                } else if (key === "started_at") {
                    return renderDateColumn(
                        title,
                        dataIndex,
                        key,
                        (startedAt) => formatDate(startedAt, false, true),
                    );
                } else if (key === "category") {
                    return renderFilterableColumn(
                        title,
                        dataIndex,
                        key,
                        tH,
                        (categoryId) => {
                            const category = categories.find(
                                (c) => c._id === categoryId,
                            );
                            return <>{category?.name}</>;
                        },
                    );
                } else if (key === "event") {
                    return renderFilterableColumn(
                        title,
                        dataIndex,
                        key,
                        tH,
                        (eventId) => {
                            const event = events.find((e) => e._id === eventId);
                            return <>{event?.name}</>;
                        },
                    );
                } else if (key === "description") {
                    return renderDescriptionColumn(title, dataIndex, key);
                } else if (key === "paymentType") {
                    return renderPaymentTypeColumn(
                        title,
                        dataIndex,
                        key,
                        paymentTypes,
                    );
                } else {
                    return renderColoredTextColumn(title, dataIndex, key, tH);
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
