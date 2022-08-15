import React from "react";
import Link from "next/link";
import { BiEdit, BiSearchAlt2 } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { formatDate } from "../../helpers/dateHelper";

const Table = ({
    onDelete,
    items,
    tableHead,
    emptyMessage,
    linkToEdit,
    categories,
    events,
    linkToView,
}) => {
    const imageColumnHandler = (data) => {
        if (data.length > 0) {
            return (
                <img
                    className="h-10 w-10 rounded-full"
                    src={data[0].imageUrl}
                    alt="item"
                />
            );
        }
    };

    const editableRow = (th, item, id) => {
        switch (th.type) {
            case "select":
                return (
                    <select
                        className="rounded-md"
                        onChange={(e) => th.onChange(e, id)}>
                        {th.options.map((opt) => (
                            <option
                                key={opt.title + " " + id}
                                value={opt.value}
                                selected={item == opt.code}>
                                {opt.title}
                            </option>
                        ))}
                    </select>
                );
            default:
                break;
        }
    };

    const rowHandler = (item, key) => {
        const maxLengthDescription = 40;
        const maxLengthName = 25;
        if (key === "images") {
            return imageColumnHandler(item[key]);
        } else if (key === "category") {
            const category = categories.find((c) => c._id === item[key]);
            return (
                <div className="text-sm text-gray-900">{category?.name}</div>
            );
        } else if (key === "event") {
            const event = events.find((e) => e._id === item[key]);
            return <div className="text-sm text-gray-900">{event?.name}</div>;
        } else if (
            key === "description" &&
            item[key].length > maxLengthDescription
        ) {
            const shortenerStr = `${item[key].substring(
                0,
                maxLengthDescription,
            )}...`;
            return <div className="text-sm text-gray-900">{shortenerStr}</div>;
        } else if (key === "name" && item[key].length > maxLengthName) {
            const shortenerStr = `${item[key].substring(0, maxLengthName)}...`;
            return <div className="text-sm text-gray-900">{shortenerStr}</div>;
        } else if (key === "started_at") {
            return (
                <div className="text-sm text-gray-900">
                    {formatDate(item[key], false, true)}
                </div>
            );
        } else if (key === "created_at" || key === "updated_at") {
            return (
                <div className="text-sm text-gray-900">
                    {formatDate(item[key], true)}
                </div>
            );
        } else if (key === "status") {
            return (
                <div className="text-sm text-gray-900">
                    {tableHead[key].editable
                        ? editableRow(tableHead[key], item[key], item._id)
                        : "Draft"}
                </div>
            );
        } else {
            return (
                <div className="text-sm text-gray-900">
                    {item[key]?.toString()}
                </div>
            );
        }
    };

    const tableRow = (item, index) => {
        return (
            <tr key={index}>
                <td
                    key="number"
                    className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td
                    key="actions"
                    className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium ">
                    <div className="flex items-center">
                        {linkToView ? (
                            <Link href={linkToView + item._id}>
                                <a className="text-zinc-600 hover:text-zinc-900 px-1">
                                    <BiSearchAlt2 />
                                </a>
                            </Link>
                        ) : (
                            ""
                        )}
                        <Link href={linkToEdit + item._id}>
                            <a className="text-indigo-600 hover:text-indigo-900 px-1">
                                <BiEdit />
                            </a>
                        </Link>
                        <div
                            onClick={() => onDelete(item)}
                            className="text-red-600 hover:text-red-900 px-1 cursor-pointer">
                            <MdDeleteOutline />
                        </div>
                    </div>
                </td>
                {Object.keys(tableHead).map((k) => (
                    <td
                        key={k + " " + index}
                        className="px-6 py-3 whitespace-nowrap text-sm font-medium ">
                        {rowHandler(item, k)}
                    </td>
                ))}
            </tr>
        );
    };

    if (items.length > 0) {
        return (
            <div className="overflow-x-scroll shadow border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nr.
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                            {Object.keys(tableHead).map((k, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap	">
                                    {typeof tableHead[k] === "string"
                                        ? tableHead[k]
                                        : tableHead[k].name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((m, index) => tableRow(m, index))}
                    </tbody>
                </table>
            </div>
        );
    }
    return (
        <p>
            <i>{emptyMessage}</i>
        </p>
    );
};

export default Table;
