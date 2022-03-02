import React, { useRef } from "react";
import { useSelector } from "react-redux";

const EditUserForm = () => {
    const form = useRef();
    const user = useSelector((state) => state.user.detailUser);

    const reset = () => {
        window.location.reload();
    };

    return (
        <div className="w-10/12">
            <form ref={form}>
                <div className="max-w">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="name"
                                defaultValue={user.fullname}
                                disabled
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                defaultValue={user.email}
                                name="email"
                                disabled
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Phone</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                defaultValue={user.phone}
                                name="phone"
                                disabled
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Is Active</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="event">
                                <option value="" disabled>
                                    Is Active
                                </option>
                                <option
                                    value={true}
                                    selected={true === user.isActive}>
                                    true
                                </option>
                                <option
                                    value={false}
                                    selected={false === user.isActive}>
                                    false
                                </option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Role</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="event">
                                <option value="" disabled>
                                    Role
                                </option>
                                <option value={1} selected={1 === user.role}>
                                    Super Admin
                                </option>
                                <option value={2} selected={2 === user.role}>
                                    Admin
                                </option>
                                <option value={3} selected={3 === user.role}>
                                    Customer
                                </option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="flex my-4">
                    <button
                        type="submit"
                        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                    <button
                        type="reset"
                        className="group relative flex justify-center mx-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        onClick={() => reset()}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
