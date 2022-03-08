import React from "react";
import { formatDate } from "../../helpers/dateHelper";

const DataDisplay = ({ item, dataForm }) => {
    const imageColumnHandler = (data) => {
        if (data.length > 0) {
            return data.map((d) => {
                return (
                    <img
                        key={d.eTag}
                        className="h-20 w-20 rounded-full"
                        src={d.imageUrl}
                        alt="item"
                    />
                );
            });
        }
    };

    const columnHandler = (key, i) => {
        if (key === "started_at") {
            return (
                <div
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formatDate(item[key], false, true)}
                    </dd>
                </div>
            );
        } else if (key === "created_at" || key === "updated_at") {
            return (
                <div
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formatDate(item[key], true, true)}
                    </dd>
                </div>
            );
        } else if (key === "images") {
            return (
                <div
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-2">
                        {imageColumnHandler(item[key])}
                    </dd>
                </div>
            );
        } else {
            return (
                <div
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {item[key]}
                    </dd>
                </div>
            );
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Detail Information
                </h3>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {Object.keys(dataForm).map((key, i) =>
                        columnHandler(key, i),
                    )}
                </dl>
            </div>
        </div>
    );
};

export default DataDisplay;
