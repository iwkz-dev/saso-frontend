import React, { useCallback } from "react";

const OrderFilterForm = ({ filters, setFilters }) => {
    const handleChange = (e, name) => {
        const value = e.target.value;
        const data = {
            id: value,
            name: name,
        };

        const filterIndex = filters.findIndex((f) => f.name === data.name);
        if (!(filterIndex > -1)) {
            setFilters([...filters, data]);
        } else {
            const tempFilters = [...filters];
            tempFilters[filterIndex].id = data.id;
            setFilters([...tempFilters]);
        }
    };

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const optimizedFn = useCallback(debounce(handleChange), []);

    return (
        <div>
            <div>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                    Search
                </label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block p-2 pl-10 mb-4 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Invoice Number"
                        onChange={(e) => optimizedFn(e, "invoiceNumber")}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderFilterForm;
