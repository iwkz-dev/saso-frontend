import { useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import {
    Table,
    Select,
    Badge,
    Dropdown,
    Button,
    Typography,
    message,
} from "antd";
import {
    DeleteTwoTone,
    EditTwoTone,
    SearchOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";

import { formatDate } from "../../helpers/dateHelper";
import {
    defaultRefKeyMap,
    buildRefRender,
    getList as getRefList,
    resolveId,
    resolveLabel,
    serializeSelectValue,
    getDefaultValue,
    getHasActions,
} from "../../helpers/tableHelper";

const { Column } = Table;

const ActionCell = ({ items, onClick }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown menu={{ items, onClick }}>
            <Button icon={<EllipsisOutlined />} />
        </Dropdown>
    </div>
);

const TableComponent = ({
    onDelete,
    data = [],
    dataHead = [],
    linkToEdit,
    linkToView,
    actionsOff,
    deleteOff,
    isLoading,
    expandable,
    refMap,
}) => {
    const router = useRouter();

    // ---- Actions
    const actionItems = useMemo(() => {
        const items = [];
        if (linkToView)
            items.push({
                label: "View",
                key: "view",
                icon: <SearchOutlined />,
            });
        if (linkToEdit)
            items.push({ label: "Edit", key: "edit", icon: <EditTwoTone /> });
        if (!deleteOff)
            items.push({
                label: "Delete",
                key: "delete",
                icon: <DeleteTwoTone twoToneColor="#eb2f96" />,
            });
        return items;
    }, [linkToView, linkToEdit, deleteOff]);

    const handleActionClick = useCallback(
        (e, record) => {
            switch (e.key) {
                case "view":
                    if (linkToView) router.push(linkToView + record._id);
                    break;
                case "edit":
                    if (linkToEdit) router.push(linkToEdit + record._id);
                    break;
                case "delete":
                    onDelete?.(record);
                    break;
                default:
                    message.error("Unknown action");
            }
        },
        [router, linkToView, linkToEdit, onDelete],
    );

    // ---- Column builders
    const renderDateColumn = (title, dataIndex, key, fmt) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={`col-${key}`}
            render={(value) => <>{fmt(value)}</>}
        />
    );

    const renderFilterableColumn = (title, dataIndex, key, tH, renderFunc) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={`col-${key}`}
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
            key={`col-${key}`}
            render={(desc) => (
                <Typography.Paragraph
                    ellipsis={{ rows: 1, expandable: true }}
                    title={desc}
                    style={{ marginBottom: 0 }}>
                    {desc}
                </Typography.Paragraph>
            )}
        />
    );

    const renderColoredTextColumn = (title, dataIndex, key, tH) => (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={`col-${key}`}
            filterSearch={tH.filterSearch}
            onFilter={tH.onFilter}
            filters={tH.filters}
            defaultFilteredValue={tH.defaultFilteredValue}
            render={(el, record) => {
                if (!tH.coloredText) return <>{el?.toString?.() || ""}</>;
                const kind = tH.coloredText(record);
                if (kind === "danger") {
                    return (
                        <Typography.Text type="danger">
                            <Badge status="error" /> {el?.toString?.() || ""}
                        </Typography.Text>
                    );
                }
                if (kind === "success") {
                    return (
                        <Typography.Text type="success">
                            <Badge status="success" /> {el?.toString?.() || ""}
                        </Typography.Text>
                    );
                }
                return (
                    <Typography.Text>{el?.toString?.() || ""}</Typography.Text>
                );
            }}
        />
    );

    // moved to tableHelper: serializeSelectValue, getDefaultValue

    const editableSelectColumn = (tH) => {
        if (tH.type !== "select") return null;

        const {
            title,
            dataIndex,
            key,
            options = [],
            filterSearch,
            onFilter,
            filterMode,
            defaultFilteredValue,
            onChange,
            disabled,
        } = tH;

        const filters = (options || []).map((opt) => ({
            text: opt.title,
            value: opt.code,
        }));

        return (
            <Column
                title={title}
                dataIndex={dataIndex}
                key={key}
                filterSearch={filterSearch}
                onFilter={onFilter}
                filterMode={filterMode}
                filters={filters}
                defaultFilteredValue={
                    typeof defaultFilteredValue !== "undefined"
                        ? [defaultFilteredValue]
                        : undefined
                }
                render={(currentCode, record) => (
                    <Select
                        key={record._id}
                        style={{ width: "95%" }}
                        defaultValue={getDefaultValue(
                            options,
                            currentCode,
                            record._id,
                        )}
                        onChange={onChange}
                        disabled={
                            disabled
                                ? disabled(record, getRefList(refMap, "events"))
                                : false
                        }>
                        {(options || []).map((opt) => (
                            <Select.Option
                                key={`${record._id}-${String(opt.code)}`}
                                value={serializeSelectValue(
                                    record._id,
                                    opt.value,
                                )}>
                                {opt.title}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            />
        );
    };

    const renderRefColumn = (
        title,
        dataIndex,
        key,
        tH,
        refKey,
        labelFields = ["name"],
    ) => {
        const list = getRefList(refMap, refKey);
        const defaultFilters = list.map((item) => ({
            text: resolveLabel(item, list, labelFields),
            value: item?._id,
        }));
        const defaultOnFilter = (value, record) =>
            String(resolveId(record?.[dataIndex]) ?? "").includes(
                String(value),
            );

        const tHCombined = {
            ...tH,
            filterSearch: tH.filterSearch ?? true,
            filters: tH.filters ?? defaultFilters,
            onFilter: tH.onFilter ?? defaultOnFilter,
        };

        return renderFilterableColumn(
            title,
            dataIndex,
            key,
            tHCombined,
            (val) => <>{buildRefRender(refMap, refKey, labelFields)(val)}</>,
        );
    };

    const hasActions = getHasActions({
        actionsOff,
        linkToEdit,
        deleteOff,
        linkToView,
    });

    return (
        <Table
            rowKey="_id"
            loading={isLoading}
            dataSource={data}
            scroll={{ x: (dataHead?.length || 0) * 150 }}
            size="small"
            expandable={
                expandable ? { expandedRowRender: expandable } : undefined
            }
            style={{ width: "100%" }}>
            {(dataHead || []).map((tH) => {
                const { title, dataIndex, key, editable, type } = tH;

                if (editable && type === "select")
                    return editableSelectColumn(tH);

                if (key === "created_at" || key === "updated_at")
                    return renderDateColumn(title, dataIndex, key, (d) =>
                        formatDate(d, true),
                    );

                if (key === "started_at")
                    return renderDateColumn(title, dataIndex, key, (d) =>
                        formatDate(d, false, true),
                    );

                if (key === "description")
                    return renderDescriptionColumn(title, dataIndex, key);

                if (defaultRefKeyMap[key])
                    return renderRefColumn(
                        title,
                        dataIndex,
                        key,
                        tH,
                        defaultRefKeyMap[key],
                        tH.labelFields,
                    );

                return renderColoredTextColumn(title, dataIndex, key, tH);
            })}

            {hasActions && (
                <Column
                    title="Actions"
                    key="action"
                    fixed="right"
                    width={80}
                    render={(_, record) => (
                        <ActionCell
                            items={actionItems}
                            onClick={(e) => handleActionClick(e, record)}
                        />
                    )}
                />
            )}
        </Table>
    );
};

export default TableComponent;
