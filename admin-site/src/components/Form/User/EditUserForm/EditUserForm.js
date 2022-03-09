import React, { useRef } from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";

const EditUserForm = () => {
    const form = useRef();
    const user = useSelector((state) => state.user.detailUser);

    const reset = () => {
        window.location.reload();
    };

    return (
        <div>
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
                    <SubmitButton />
                    <ResetButton onClick={reset} />
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
