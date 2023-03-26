import { Descriptions } from "antd";
import React from "react";
import { formatDate } from "../../helpers/dateHelper";

const DataDisplay = ({ item, dataForm, events, categories }) => {
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
            imageColumnHandler(item[key]);
        } else {
            value = item[key];
        }
        return (
            <Descriptions.Item key={key + i} label={dataForm[key]}>
                {value}
            </Descriptions.Item>
        );
        /*
        if (key === "started_at") {
            return (
                <div
                    key={key + i}
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
        } else if (key === "category") {
            const category = categories.find((e) => e._id === item[key]);
            return (
                <div
                    key={key + i}
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {category?.name}
                    </dd>
                </div>
            );
        } else if (key === "event") {
            const event = events.find((e) => e._id === item[key]);
            return (
                <div
                    key={key + i}
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event?.name}
                    </dd>
                </div>
            );
        } else if (key === "created_at" || key === "updated_at") {
            return (
                <div
                    key={key + i}
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
        } else if (key === "status") {
            return (
                <div
                    key={key + i}
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {dataForm[key]}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-2">
                        {getStatusTitle(item[key])}
                    </dd>
                </div>
            );
        } else if (key === "images") {
            return (
                <div
                    key={key + i}
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
                    key={key + i}
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
        */
    };

    return (
        <Descriptions title="Detail Information" layout="vertical" bordered>
            {Object.keys(dataForm).map((key, i) => columnHandler(key, i))}
        </Descriptions>
    );
};

export default DataDisplay;
