import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { formatDate } from "../../../../helpers/dateHelper";

function EventTable({ onDelete }) {
    const events = useSelector((state) => state.event.events);

    const tableHead = {
        name: "Name",
        description: "Description",
        started_at: "Started at",
        startedYear: "Started Year",
        images: "Image",
    };

    const imageColumnHandler = (data) => {
        if (data.length > 0) {
            return (
                <img
                    className="h-10 w-10 rounded-full"
                    src={data[0].imageUrl}
                    alt="event"
                />
            );
        }
    };

    const rowHandler = (event, key) => {
        const maxLengthDescription = 30;
        const maxLengthName = 20;
        if (key === "images") {
            return imageColumnHandler(event[key]);
        } else if (
            key === "description" &&
            event[key].length > maxLengthDescription
        ) {
            const shortenerStr = `${event[key].substring(
                0,
                maxLengthDescription,
            )}...`;
            return <div className="text-sm text-gray-900">{shortenerStr}</div>;
        } else if (key === "name" && event[key].length > maxLengthName) {
            const shortenerStr = `${event[key].substring(0, maxLengthName)}...`;
            return <div className="text-sm text-gray-900">{shortenerStr}</div>;
        } else if (key === "started_at") {
            return (
                <div className="text-sm text-gray-900">
                    {formatDate(event[key], "germany")}
                </div>
            );
        } else {
            return <div className="text-sm text-gray-900">{event[key]}</div>;
        }
    };

    const tableRow = (event, index) => {
        return (
            <tr key={index}>
                <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium ">
                    <div className="flex items-center">
                        <Link href={`event/edit/${event._id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900 px-1">
                                <BiEdit />
                            </a>
                        </Link>
                        <div
                            onClick={() =>
                                onDelete(event["_id"], event["name"])
                            }
                            className="text-red-600 hover:text-red-900 px-2 cursor-pointer">
                            <MdDeleteOutline />
                        </div>
                    </div>
                </td>
                {Object.keys(tableHead).map((k) => (
                    <td
                        key={k}
                        className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                        {rowHandler(event, k)}
                    </td>
                ))}
            </tr>
        );
    };

    if (events.length > 0) {
        return (
            <div className="w-10/12 overflow-x-scroll shadow border-b border-gray-200 sm:rounded-lg">
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
                                    {tableHead[k]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((m, index) => tableRow(m, index))}
                    </tbody>
                </table>
            </div>
        );
    }
    return <p>Event is empty</p>;
}

export default EventTable;
