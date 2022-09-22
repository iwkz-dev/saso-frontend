import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "../../../common/Message/Alert/Alert";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";
import { createUser } from "../../../../store/reducers/userReducer";

const AddUserForm = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const [showUploading, setShowUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);

    const submitForm = (e) => {
        setShowSuccess(false);
        setShowFailed(false);
        e.preventDefault();
        const text = confirm("Please confirm to add user");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                const data = new FormData(form.current);
                const requestedData = {
                    fullname: data.get("fullname"),
                    email: data.get("email"),
                    password: data.get("password"),
                    role: data.get("role"),
                    isActive: data.get("isActive"),
                    phone: data.get("phone"),
                };
                return await dispatch(createUser(requestedData));
            };
            createData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        setShowFailed(r.message);
                    } else {
                        setShowUploading(false);
                        setShowSuccess(r.message);
                    }
                })
                .catch((e) => {
                    setShowUploading(false);
                    setShowFailed(e.message);
                });
        }
    };

    const reset = () => {
        window.location.reload();
    };

    return (
        <div className="w-10/12">
            <form ref={form} onSubmit={(e) => submitForm(e)}>
                <div className="max-w">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Full Name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="fullname"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="email"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Password</span>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="password"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Role</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="role"
                                required>
                                <option value="" disabled selected hidden>
                                    Please Choose...
                                </option>
                                <option value="1">Super Admin</option>
                                <option value="2">Admin</option>
                                <option value="3">Customer</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Is Active</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="isActive"
                                required>
                                <option value="" disabled selected hidden>
                                    Please Choose...
                                </option>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Phone</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="phone"
                                required
                            />
                        </label>
                    </div>
                </div>
                <div className="flex my-4">
                    <SubmitButton />
                    <ResetButton onClick={reset} />
                </div>
            </form>
            <Alert
                showFailed={showFailed}
                showSuccess={showSuccess}
                setShowFailed={setShowFailed}
                setShowSuccess={setShowSuccess}
                successMessage={showSuccess}
                failedMessage={showFailed}
                showUploading={showUploading}
            />
        </div>
    );
};

export default AddUserForm;
