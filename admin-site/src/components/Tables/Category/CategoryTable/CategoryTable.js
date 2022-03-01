import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { formatDate } from "../../../../helpers/dateHelper";

const CategoryTable = ({ onDelete }) => {
    const categories = useSelector((state) => state.category.categories);

    const tableHead = {
        name: "Name",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    const rowHandler = (category, key) => {
        const maxLengthDescription = 30;
        const maxLengthName = 20;
        if (
            key === "description" &&
            category[key].length > maxLengthDescription
        ) {
            const shortenerStr = `${category[key].substring(
                0,
                maxLengthDescription,
            )}...`;
            return <div className="text-sm text-gray-900">{shortenerStr}</div>;
        } else if (key === "name" && category[key].length > maxLengthName) {
            const shortenerStr = `${category[key].substring(
                0,
                maxLengthName,
            )}...`;
            return <div className="text-sm text-gray-900">{shortenerStr}</div>;
        } else if (key === "started_at") {
            return (
                <div className="text-sm text-gray-900">
                    {formatDate(category[key], "germany")}
                </div>
            );
        } else {
            return <div className="text-sm text-gray-900">{category[key]}</div>;
        }
    };

    const tableRow = (category, index) => {
        return (
            <tr key={index}>
                <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium ">
                    <div className="flex items-center">
                        <Link href={`category/edit/${category._id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900 px-1">
                                <BiEdit />
                            </a>
                        </Link>
                        <div
                            onClick={() =>
                                onDelete(category["_id"], category["name"])
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
                        {rowHandler(category, k)}
                    </td>
                ))}
            </tr>
        );
    };

    if (categories.length > 0) {
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
                        {categories.map((m, index) => tableRow(m, index))}
                    </tbody>
                </table>
            </div>
        );
    }
    return <p>categories is empty</p>;
};

export default CategoryTable;
